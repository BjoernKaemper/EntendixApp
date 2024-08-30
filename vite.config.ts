// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
    vue({ 
      template: { transformAssetUrls
    }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      find: './runtimeConfig',
      replacement: './runtimeConfig.browser',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
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
        //target: 'http://139.6.140.196:8003/',
        // Zu Hause
        target: 'http://192.168.178.49:8003/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nlpEndpoints/, ''),
      },
      '/startNlp': {
        target: 'http://localhost:8003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/startNlp/, ''),
      }
    }
  },
})
