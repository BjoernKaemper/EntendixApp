<template>
  <ul class="breadcrumb">
    <li>
      <router-link to="/" title="Home">
        <MaterialSymbol :symbol="IconTypes.HOME" />
      </router-link>
    </li>
    <li v-for="(item, idx) in breadcrumbs" :key="idx">
      <router-link :to="item.to">{{ item.title }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
/**
 * @name BreadCrumbs
 * @description
 * This component is used to display the breadcrumbs.
 */

// component imports
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

// type imports
import { IconTypes } from '@/types/enums/IconTypes';

export default {
  components: {
    MaterialSymbol,
  },
  computed: {
    breadcrumbs(): Array<{ to: string; title: string }> {
      if (!this.$route.meta.breadcrumb) {
        return [];
      }
      const { breadcrumb } = this.$route.meta;
      if (typeof breadcrumb === 'function') {
        return breadcrumb(this.$route).filter((item: any) => item.to !== '/') || [];
      }
      return [];
    },
  },
  setup() {
    return {
      IconTypes,
    };
  },
};
</script>

<style scoped lang="scss">
.breadcrumb {
  background-color: $dark-green-15;
  padding: $xxs $m; // TODO: used $xxs instead of 8px
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: calc($base-size * 2);
  list-style: none;

  > li {
    border-radius: calc($base-size * 3.5);
    background-color: $lightest;
    border: 2px solid $dark-green;
    height: calc($base-size * 7.5);
    padding: $base-size $s;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    ::before {
      content: '';
      display: block;
      position: absolute;
      width: $xxs;
      height: 0;
      border-top: 1.5px solid $dark-green;
      border-bottom: 1.5px solid $dark-green;
      top: calc(50% - 1.5px);
      left: -11px;
    }

    &:first-child {
      background-color: $dark-green;
      border-radius: 50%;
      width: calc($base-size * 7.5);
      height: calc($base-size * 7.5);
      padding: 0;

      > a {
        color: $lightest;

        > span {
          display: block;
          margin-bottom: 1px;
        }
      }

      ::before {
        display: none;
      }
    }

    > a {
      @include content;
      color: black;
      text-decoration: none;
    }
  }
}
</style>
