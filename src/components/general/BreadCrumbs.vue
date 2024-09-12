<template>
  <ul class="breadcrumb">
    <li>
      <router-link to="/" title="Home"><HomeIcon class="home-icon" /></router-link>
    </li>
    <li v-for="(item, idx) in breadcrumbs" :key="idx">
      <router-link :to="item.to">{{ item.title }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import HomeIcon from '@/components/icons/HomeIcon.vue'

export default {
  components: {
    HomeIcon
  },
  computed: {
    breadcrumbs(): Array<{ to: string; title: string }> {
      if (!this.$route.meta.breadcrumb) {
        return [];
      }
      return this.$route.meta.breadcrumb(this.$route).filter((item: any) => item.to !== '/') || []
    }
  }
}
</script>

<style scoped lang="scss">
.breadcrumb {
  background-color: $dark-green-20;
  padding: $s $m; // TODO: used $s instead of 8px
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  list-style: none;
  > li {
    border-radius: 14px;
    background-color: $lightest;
    border: 2px solid $dark-green;
    height: 28px;
    padding: $base-size $s;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    ::before {
      content: '';
      display: block;
      position: absolute;
      width: 10px;
      height: 0;
      border-top: 1.5px solid $dark-green;
      border-bottom: 1.5px solid $dark-green;
      top: calc(50% - 1.5px);
      left: -11px;
    }
    &:first-child {
      background-color: $dark-green;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      padding: 0;
      > a {
        color: $light-green;
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
home-icon {
  color: $light-green;
}
</style>
