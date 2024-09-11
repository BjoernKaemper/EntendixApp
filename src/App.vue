<template>
  <div>
    <!-- @TODO: Move authentication to seperate route and check for auth in router -->
    <Authenticator>
      <template v-slot:header>
        <div style="padding: var(--amplify-space-large); text-align: center">
          <img id="auth-logo" src="@/assets/plyteq_schriftzug.svg" />
        </div>
      </template>
    </Authenticator>
    <template v-if="auth.authStatus === 'authenticated'">
      <header ref="header">
        <NavBar :navItems="navItems" />
        <Breadcrumbs />
      </header>
      <main :style="mainHeight">
        <router-view />
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NavBar from '@/components/general/NavBar.vue'
import Breadcrumbs from '@/components/general/BreadCrumbs.vue'

import { watchEffect } from 'vue'
import { useGeneralStore } from '@/store/general'
import { useGeneralStore_v2 } from './store/general_v2'
import { Authenticator } from '@aws-amplify/ui-vue'
import { useAuthenticator } from '@aws-amplify/ui-vue'
// @TODO: Remove this import when the new styles are ready
import '@aws-amplify/ui-vue/styles.css'

import { I18n } from 'aws-amplify'
import { translations } from '@aws-amplify/ui-vue'

I18n.putVocabularies(translations)
I18n.setLanguage('de')

I18n.putVocabularies({
  de: {
    'Enter your Username': 'Geben Sie Ihren Benutzernamen an',
    'Enter your Password': 'Geben Sie ihr Passwort an',
    'Please confirm your Password': 'Bitte bestätigen Sie ihr Passwort',
    'Enter your Email': 'Geben Sie Ihre E-Mail Adresse an',
    'Reset Password': 'Passwort zurücksetzen',
    'Password must have at least 8 characters': 'Ihr Passwort muss mindestens 8 Zeichen haben',
    'Your passwords must match': 'Die Passwörter müssen übereinstimmen'
  }
})
const auth = useAuthenticator()
const store = useGeneralStore()
const generalStore = useGeneralStore_v2()

const navItems = [
  { icon: '', name: 'Digitale Zwillinge', href: '/digitaltwins' },
  { icon: '', name: 'Monitoring', href: '/monitoring' }
]

const header = ref(null)

const mainHeight = computed(() => {
  const headerHeight = header.value ? header.value.clientHeight + 1 : 100
  return `height: calc(100vh - ${headerHeight}px);`
})

watchEffect(() => {
  // Check if auth.user is available and contains the necessary properties.
  if (auth.user && auth.user.signInUserSession) {
    // const userId = auth.user.signInUserSession.idToken.payload.sub
    // store.fetchGeneralInfos(userId)
    generalStore.loadBaseInformations();
  }
})
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
}
header {
  width: 100vw;
}
main {
  background-color: $background;
  width: 100vw;
  overflow-y: scroll;
  padding: $xxl $m; // TODO: used $xxl instead of 45px
}
</style>
