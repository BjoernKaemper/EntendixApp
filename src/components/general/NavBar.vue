<template>
  <div class="header-bar">
    <EntendixLogo />
    <nav>
      <ul>
        <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
        <li v-if="!isHomePage" v-for="(navItem, idx) in navItems" :key="idx">
          <router-link
            :to="createNavHref(navItem.href)"
            :class="{ active: isActive(navItem.href), isHomePage }"
          >
            <MaterialSymbol :symbol="navItem.icon" />
            {{ navItem.name }}
          </router-link>
        </li>
        <li>
          <!-- TODO: click logs out, propably a dropdown opens in the future -->
          <button type="button" @click="auth.signOut" @keydown.enter="auth.signOut">
            <MaterialSymbol :symbol="IconTypes.PROFILE" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { IconTypes } from '@/types/enums/IconTypes';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';
import EntendixLogo from '@/components/icons/EntendixLogo.vue';

export default {
  components: {
    EntendixLogo,
    MaterialSymbol,
  },
  data() {
    return {
      navItems: [
        { icon: IconTypes.HOME, name: 'Digitale Zwillinge', href: '/digitaltwins' },
        { icon: IconTypes.MONITORING, name: 'Monitoring', href: '/monitoring' },
      ],
    };
  },
  methods: {
    isActive(route: string): boolean {
      return this.$route.path.includes(route);
    },
    createNavHref(href: string): string {
      const route = this.$route.path;
      if (route.includes(href)) {
        // Link will linking to the current page
        return route;
      }
      // Link will link to the other page type, so we replace the type-part of the route
      return route.replace(this.navItems.find((item) => item.href !== href)!.href, href);
    },
  },
  computed: {
    isHomePage(): boolean {
      return this.$route.path === '/';
    },
  },
  setup() {
    const auth = useAuthenticator();

    return {
      auth,
      IconTypes,
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

  > nav > ul {
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

        > button {
          padding: 0;

          > span {
            font-size: $xxl;
            color: $lightest;
            display: flex;
          }
        }
      }
    }
  }
}
</style>
