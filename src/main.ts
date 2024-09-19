/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components

// Composables
import { createApp } from 'vue';

// Plugins
import AmplifyVue from '@aws-amplify/ui-vue';
import { registerPlugins } from '@/plugins';

// AWS Amplify imports
import { Amplify } from 'aws-amplify';
import App from './App.vue';
import config from './amplifyconfiguration.json';

Amplify.configure(config);

const app = createApp(App);
app.use(AmplifyVue);

registerPlugins(app);

app.mount('#app');
