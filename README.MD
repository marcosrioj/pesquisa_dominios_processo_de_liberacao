# Pesquisa de domínios no Processo de Liberação

Aplicação React para explorar rapidamente a lista oficial de domínios do registro.br em processo de liberação. O app remove comentários da fonte, calcula métricas de legibilidade e oferece filtros avançados e ordenação ranqueada.

## Funcionalidades
- Fonte de dados embutida em `public/lista-processo-liberacao.txt` (cópia oficial) com limpeza automática de comentários, sem depender de requisições ao registro.br.
- Filtros por texto, prefixo/sufixo, regex adicional, tamanho mínimo/máximo, hífens, presença de números e apenas letras.
- Heurística de pontuação que prioriza legibilidade (relação vogais/consoantes), comprimento reduzido e poucos hífens.
- Paginação incremental para renderizar rapidamente milhares de resultados.
- Exportação CSV dos resultados filtrados.

## Rodando localmente
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. A aplicação ficará disponível em `http://localhost:5173`.

Para gerar a versão otimizada:
```bash
npm run build
npm run preview
```
