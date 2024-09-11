/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import AmplifyVue from '@aws-amplify/ui-vue'
import { registerPlugins } from '@/plugins'
import { Loader } from '@googlemaps/js-api-loader'

// AWS Amplify imports
import { Amplify } from 'aws-amplify'
import config from './amplifyconfiguration.json'
Amplify.configure(config)

const app = createApp(App)
app.use(AmplifyVue)

registerPlugins(app)

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places']
})

loader.load().then(() => {
  app.mount('#app')
})
