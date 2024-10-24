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
        '/middleware': {
          target: process.env.VITE_MIDDLEWARE_PROXY_TARGET_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/middleware/, ''),
        },
      },
    },
  });
};
