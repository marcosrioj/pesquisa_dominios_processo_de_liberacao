import PropTypes from 'prop-types';

const modes = [
  { value: 'contains', label: 'Contém' },
  { value: 'starts', label: 'Começa com' },
  { value: 'ends', label: 'Termina com' },
  { value: 'regex', label: 'Regex' }
];

const sorts = [
  { value: 'score', label: 'Ranking' },
  { value: 'length-asc', label: 'Mais curtos' },
  { value: 'length-desc', label: 'Mais longos' },
  { value: 'hyphen', label: 'Menos hífens' },
  { value: 'readable', label: 'Melhor leitura' }
];

export function FilterPanel({ filters, onChange, onReset }) {
  return (
    <div className="card">
      <div className="header">
        <h2>Filtros</h2>
        <p>
          Combine filtros avançados para encontrar nomes memoráveis, curtos e com alta chance de
          aprovação.
        </p>
      </div>

      <div className="filters-grid">
        <div className="input-group">
          <label>Busca</label>
          <input
            type="text"
            placeholder="palavra, prefixo ou trecho"
            value={filters.query}
            onChange={(e) => onChange('query', e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Modo</label>
          <select value={filters.mode} onChange={(e) => onChange('mode', e.target.value)}>
            {modes.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Regex opcional</label>
          <input
            type="text"
            placeholder="ex: ^[a-z]{4,}$"
            value={filters.regex}
            onChange={(e) => onChange('regex', e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Ordenação</label>
          <select value={filters.sortBy} onChange={(e) => onChange('sortBy', e.target.value)}>
            {sorts.map((sort) => (
              <option key={sort.value} value={sort.value}>
                {sort.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filters-grid" style={{ marginTop: 14 }}>
        <div className="input-group">
          <label>Prefixo obrigatório</label>
          <input
            type="text"
            placeholder="ex: casa"
            value={filters.startsWith}
            onChange={(e) => onChange('startsWith', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Sufixo obrigatório</label>
          <input
            type="text"
            placeholder="ex: tech"
            value={filters.endsWith}
            onChange={(e) => onChange('endsWith', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Legibilidade mínima (vogais/consoantes)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={filters.minReadable}
            onChange={(e) => onChange('minReadable', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Hífens máximos</label>
          <input
            type="number"
            min="0"
            value={filters.maxHyphens}
            onChange={(e) => onChange('maxHyphens', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Apenas letras</label>
          <select
            value={filters.onlyLetters ? 'yes' : 'no'}
            onChange={(e) => onChange('onlyLetters', e.target.value === 'yes')}
          >
            <option value="no">Aceitar números</option>
            <option value="yes">Somente letras</option>
          </select>
        </div>
        <div className="input-group">
          <label>Evitar números</label>
          <select
            value={filters.allowNumbers ? 'yes' : 'no'}
            onChange={(e) => onChange('allowNumbers', e.target.value === 'yes')}
          >
            <option value="yes">Permitir</option>
            <option value="no">Bloquear</option>
          </select>
        </div>
        <div className="input-group">
          <label>Apenas domínios sem hífen</label>
          <select
            value={filters.onlyNoHyphen ? 'yes' : 'no'}
            onChange={(e) => onChange('onlyNoHyphen', e.target.value === 'yes')}
          >
            <option value="no">Aceitar hífens</option>
            <option value="yes">Sem hífens</option>
          </select>
        </div>
        <div className="input-group inline-inputs">
          <div>
            <label>Min letras</label>
            <input
              type="number"
              min="1"
              value={filters.minLength}
              onChange={(e) => onChange('minLength', e.target.value)}
            />
          </div>
          <div>
            <label>Máx letras</label>
            <input
              type="number"
              min="1"
              value={filters.maxLength}
              onChange={(e) => onChange('maxLength', e.target.value)}
            />
          </div>
          <div>
            <label>Extra regex</label>
            <input
              type="text"
              placeholder="(opcional)"
              value={filters.regex}
              onChange={(e) => onChange('regex', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="controls-row" style={{ marginTop: 12 }}>
        <button className="button" onClick={onReset} type="button">
          Limpar busca
        </button>
        <span className="badge">Filtros ativos rendem resultados instantâneos</span>
      </div>
    </div>
  );
}

FilterPanel.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};
