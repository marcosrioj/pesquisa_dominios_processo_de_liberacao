# Pesquisa de domínios no Processo de Liberação

Aplicação React para explorar rapidamente a lista oficial de domínios do registro.br em processo de liberação. O app remove comentários da fonte, calcula métricas de legibilidade e oferece filtros avançados e ordenação ranqueada.

## Funcionalidades
- Carregamento do `.txt` enviado pelo usuário (inteiramente no navegador), com limpeza automática de comentários.
- Filtros por texto, prefixo/sufixo, regex adicional, tamanho mínimo/máximo, hífens, presença de números e apenas letras.
- Heurística de pontuação que prioriza legibilidade (relação vogais/consoantes), comprimento reduzido e poucos hífens.
- Paginação incremental para renderizar rapidamente milhares de resultados.
- Exportação CSV dos resultados filtrados.

## Publicação no GitHub Pages
O repositório já inclui um workflow em `.github/workflows/deploy.yml` para publicar no GitHub Pages.

1. No GitHub, abra **Settings > Pages** e escolha **Source: GitHub Actions**.
2. Faça push para a branch `main`; o workflow vai executar `npm ci`, `npm run build` e publicar o conteúdo de `dist`.
3. A URL final será exibida no resumo do job `Deploy to GitHub Pages` (variável `page_url`).

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
