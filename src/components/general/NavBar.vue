<template>
  <div class="header-bar">
    <h1>Entendix</h1>
    <nav>
      <ul>
        <li v-for="(navItem, idx) in navItems" :key="idx">
          <router-link :to="navItem.href" :class="{ active: isActive(navItem.href) }">
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

<script lang="ts">
import ProfileIcon from '@/components/icons/ProfileIcon.vue'

import { useAuthenticator } from '@aws-amplify/ui-vue'

export default {
  components: {
    ProfileIcon
  },
  props: {
    navItems: {
      type: Array<{ href: string; name: string }>,
      default: () => []
    }
  },
  methods: {
    isActive(route: string): boolean {
      return this.$route.path.includes(route)
    }
  },
  setup() {
    const auth = useAuthenticator()

    return {
      auth
    }
  }
}
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
