<template>
  <div class="app">
    <!-- @TODO: Move authentication to seperate route and check for auth in router -->
    <Authenticator>
      <template v-slot:header>
        <div style="padding: var(--amplify-space-large); text-align: center">
          <EntendixLogo id="auth-logo" />
        </div>
      </template>
    </Authenticator>
    <template v-if="auth.authStatus === 'authenticated'">
      <header ref="header">
        <NavBar />
        <Breadcrumbs />
      </header>
      <main>
        <router-view />
      </main>
      <Alerts />
    </template>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/general/NavBar.vue';
import Breadcrumbs from '@/components/general/BreadCrumbs.vue';
import Alerts from '@/components/general/Alerts.vue';
import EntendixLogo from '@/components/icons/EntendixLogo.vue';
import 'floating-vue/dist/style.css';

import { Authenticator, useAuthenticator, translations } from '@aws-amplify/ui-vue';
// @TODO: Remove this import when the new styles are ready
import '@aws-amplify/ui-vue/styles.css';

import { I18n } from 'aws-amplify';
import { useGeneralStore } from './store/general';

I18n.putVocabularies(translations);
I18n.setLanguage('de');

I18n.putVocabularies({
  de: {
    'Enter your Username': 'Geben Sie Ihren Benutzernamen an',
    'Enter your Password': 'Geben Sie ihr Passwort an',
    'Please confirm your Password': 'Bitte bestätigen Sie ihr Passwort',
    'Enter your Email': 'Geben Sie Ihre E-Mail Adresse an',
    'Reset Password': 'Passwort zurücksetzen',
    'Password must have at least 8 characters': 'Ihr Passwort muss mindestens 8 Zeichen haben',
    'Your passwords must match': 'Die Passwörter müssen übereinstimmen',
  },
});

const auth = useAuthenticator();
const generalStore = useGeneralStore();

// Attaching the window event listener for size change
window.addEventListener('resize', () => generalStore.setWindowDimensions());

// Starting the global clock
generalStore.updateGlobalTime();
</script>

<style lang="scss">
[data-amplify-authenticator] {
  --amplify-components-tabs-item-active-border-color: var(--amplify-colors-green-90);
  --amplify-components-tabs-item-active-color: var(--amplify-colors-green-90);
  --amplify-components-button-primary-background-color: var(--amplify-colors-green-90);
  --amplify-components-button-primary-hover-background-color: var(--amplify-colors-green-60);
  --amplify-components-button-primary-focus-background-color: var(--amplify-colors-green-90);
  --amplify-components-button-primary-active-background-color: var(--amplify-colors-green-90);
  --amplify-components-button-link-color: var(--amplify-colors-green-90);
  --amplify-components-button-link-hover-color: var(--amplify-colors-green-90);
  --amplify-components-button-link-focus-color: var(--amplify-colors-green-90);
  --amplify-components-button-link-active-color: var(--amplify-colors-green-90);
  --amplify-components-button-link-active-background-color: transparent;
  --amplify-components-button-link-focus-background-color: transparent;
  --amplify-components-button-link-hover-background-color: transparent;
}
#auth-logo {
  margin-top: 50px;
  max-width: 50%;
  height: auto;

  & path {
    fill: $darkest;
  }
}
header {
  width: 100vw;
}
main {
  background-color: $background;
  width: 100vw;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: $xxl $m; // TODO: used $xxl instead of 45px
  flex: 1;
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
