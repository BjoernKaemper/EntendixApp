<template>
  <div class="header-bar">
    <EntendixLogo />
    <nav>
      <ul>
        <li v-for="(navItem, idx) in navItems" :key="idx">
          <router-link
            :to="navItem.href"
            :class="{ active: isActive(navItem.href), isHomePage }"
          >
            <component :is="navItem.icon" />
            {{ navItem.name }}
          </router-link>
        </li>
        <li>
          <!-- TODO: click logs out, propably a dropdown opens in the future -->
          <button
            type="button"
            @click="auth.signOut"
            @keydown.enter="auth.signOut"
          >
            <ProfileIcon />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import ProfileIcon from '@/components/icons/ProfileIcon.vue';
import EntendixLogo from '@/components/icons/EntendixLogo.vue';
import HomeIcon from '@/components/icons/HomeIcon.vue';
import MonitoringIcon from '@/components/icons/MonitoringIcon.vue';

import { useAuthenticator } from '@aws-amplify/ui-vue';

export default {
  components: {
    ProfileIcon,
    EntendixLogo,
    HomeIcon,
    MonitoringIcon,
  },
  props: {
    navItems: {
      type: Array<{ icon: string, href: string; name: string }>,
      default: () => [],
    },
  },
  methods: {
    isActive(route: string): boolean {
      return this.$route.path.includes(route);
    },
  },
  computed: {
    isHomePage(): boolean {
      // @TODO: fix homepage path when level 0 is ready
      return this.$route.path === '/monitoring';
    },
  },
  setup() {
    const auth = useAuthenticator();

    return {
      auth,
    };
  },
};
</script>

<style scoped lang="scss">
.header-bar {
  background-color: $dark-green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $xxs $m;

  > h1 {
    @include title;
    color: white;
  }

  > nav> ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: $xs;

    > li {
      color: white;
      display: flex;

      > .isHomePage {
        // disable and hide the links
        pointer-events: none;
        opacity: 0;
      }

      > a {
        @include subtitle;
        color: white;
        text-decoration: none;
        padding: $xxs;
        border-radius: $border-radius;
        display: flex;
        gap: $xxs;

        &.active {
          color: $dark-green;
          font-weight: 700;
          background-color: $lightest;
        }
      }

      &:last-child {
        margin-left: $base-size;

        > button > svg {
          width: $xxl;
          height: $xxl;
        }
      }
    }
  }
}
</style>
