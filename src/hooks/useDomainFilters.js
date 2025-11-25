import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { filterDomains, sanitizeList } from '../utils/domainFilters';

const SOURCE_URL = `${import.meta.env.BASE_URL}lista-processo-liberacao.txt`;

export function useDomainFilters() {
  const [rawList, setRawList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    query: '',
    mode: 'contains',
    regex: '',
    startsWith: '',
    endsWith: '',
    minLength: 3,
    maxLength: 30,
    maxHyphens: 2,
    minReadable: 0,
    allowNumbers: true,
    onlyNoHyphen: false,
    onlyLetters: false,
    sortBy: 'score'
  });

  const deferredQuery = useDeferredValue(filters.query);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDomainList(signal) {
      try {
        const response = await fetch(SOURCE_URL, { signal });

        if (!response.ok) {
          throw new Error(`Falha ao carregar a lista local (${response.status})`);
        }

        return response.text();
      } catch (err) {
        if (err.name === 'AbortError') throw err;
        throw err;
      }
    }

    async function load() {
      try {
        setLoading(true);
        const text = await fetchDomainList(controller.signal);
        setRawList(sanitizeList(text));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  const result = useMemo(() => {
    return filterDomains(rawList, { ...filters, query: deferredQuery });
  }, [rawList, filters, deferredQuery]);

  const updateFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters((prev) => ({ ...prev, query: '', regex: '', startsWith: '', endsWith: '' }));
  };

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    domains: result,
    total: rawList.length,
    loading,
    error
  };
}
