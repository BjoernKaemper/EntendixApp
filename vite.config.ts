// Plugins
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import checker from 'vite-plugin-checker';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: {
        buildMode: true,
        tsconfigPath: 'tsconfig.json',
      },
      eslint: {
        lintCommand: 'eslint . --ext .ts,.js,.vue',
      },
      vueTsc: true,
    }),
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  define: {
    'process.env': {},
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/styles.scss";',
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/awsBackend': {
        target: 'https://svmiv1rcci.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/awsBackend/, ''),
      },
      '/awsNlpEndpoints': {
        target: 'http://3.95.230.131:8003/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/awsNlpEndpoints/, ''),
      },
      '/nlpEndpoints': {
        // TH
        // target: 'http://139.6.140.196:8003/',
        // Zu Hause
        target: 'http://192.168.178.49:8003/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nlpEndpoints/, ''),
      },
      '/startNlp': {
        target: 'http://localhost:8003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/startNlp/, ''),
      },
    },
  },
});
