<template>
  <div class="header-bar">
    <EntendixLogo />
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
import EntendixLogo from '@/components/icons/EntendixLogo.vue'

import { useAuthenticator } from '@aws-amplify/ui-vue'

export default {
  components: {
    ProfileIcon,
    EntendixLogo
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
  padding: $xxs $m;

  >h1 {
    @include title;
    color: white;
  }

  >nav>ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: $xs;

    >li {
      color: white;
      display: flex;

      >a {
        @include subtitle;
        color: white;
        text-decoration: none;
        padding: $xxs;
        border-radius: $base-size;

        &.active {
          color: $dark-green;
          font-weight: 700;
          background-color: $lightest;
        }
      }

      &:last-child {
        margin-left: $base-size;

        >button>svg {
          width: $xxl;
          height: $xxl;
        }
      }
    }
  }
}
</style>
