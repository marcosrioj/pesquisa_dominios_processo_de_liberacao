import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/pesquisa_dominios_processo_de_liberacao/',
  server: {
    host: true,
    port: 5173
  }
});
