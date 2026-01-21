import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { filterDomains, sanitizeList } from '../utils/domainFilters';

export function useDomainFilters(sourceText) {
  const [rawList, setRawList] = useState([]);
  const [loading, setLoading] = useState(false);
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
    if (!sourceText) {
      setRawList([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      setRawList(sanitizeList(sourceText));
      setError(null);
    } catch (err) {
      setError('Falha ao processar o arquivo enviado');
      setRawList([]);
    } finally {
      setLoading(false);
    }
  }, [sourceText]);

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
