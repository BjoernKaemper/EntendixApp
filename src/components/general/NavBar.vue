<template>
  <div class="header-bar">
    <h1>Entendix</h1>
    <nav>
      <ul>
        <li v-for="(navItem, idx) in navItems" :key="idx">
          <router-link :to="navItem.href" active-class="active">
            <template v-if="navItem.icon">
              <v-icon>{{ navItem.icon }}</v-icon>
            </template>
            {{ navItem.name }}
          </router-link>
        </li>
        <li>
          <!-- TODO: click logs out, propably a dropdown opens in the future -->
          <button @click="auth.signOut">
            <ProfileIcon />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import ProfileIcon from '@/components/icons/ProfileIcon.vue'

import { useAuthenticator } from '@aws-amplify/ui-vue'

const props = defineProps({
  navItems: {
    type: Array<{ icon: String; name: String; href: string }>,
    default: () => []
  }
})

const auth = useAuthenticator()
</script>

<style scoped lang="scss">
.header-bar {
  background-color: $dark-green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $s $m;
  > h1 {
    @include title;
    color: white;
  }
  > nav > ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: $xs;
    > li {
      color: white;
      display: flex;
      > a {
        @include subtitle;
        color: white;
        text-decoration: none;
        &.active {
          color: $light-green;
          font-weight: 700;
        }
      }
      &:last-child {
        margin-left: $base-size;
        > button > svg {
          width: $xl;
          height: $xl;
        }
      }
    }
  }
}
</style>
