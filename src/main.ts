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

Amplify.configure({
  aws_project_region: import.meta.env.VITE_AMPLIFY_AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: import.meta.env.VITE_AMPLIFY_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: import.meta.env.VITE_AMPLIFY_AWS_PROJECT_REGION,
  aws_user_pools_id: import.meta.env.VITE_AMPLIFY_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: import.meta.env.VITE_AMPLIFY_USER_POOLS_WEB_CLIENT_ID,
  oauth: {},
  aws_cognito_username_attributes: [],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ['EMAIL'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: ['SMS'],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
});

const app = createApp(App);
app.use(AmplifyVue);

registerPlugins(app);

app.mount('#app');
