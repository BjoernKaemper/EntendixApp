// Plugins
import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      checker({
        eslint: {
          lintCommand: 'eslint . --ext .ts,.js,.vue',
        },
        vueTsc: true,
      }),
      vue({}),
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
      port: process.env.VITE_PORT as unknown as number,
      proxy: {
        '/awsBackend': {
          target: process.env.VITE_AWS_BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/awsBackend/, ''),
        },
        '/awsNlpEndpoints': {
          target: process.env.VITE_AWS_NLP_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/awsNlpEndpoints/, ''),
        },
        '/nlpEndpoints': {
          // TH
          // target: 'http://139.6.140.196:8003/',
          // Zu Hause
          target: process.env.VITE_NLP_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/nlpEndpoints/, ''),
        },
        '/startNlp': {
          target: process.env.VITE_START_NLP_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/startNlp/, ''),
        },
        '/middleware': {
          target: process.env.VITE_MIDDLEWARE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/middleware/, ''),
        },
      },
    },
  });
};
