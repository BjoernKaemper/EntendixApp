<template>
  <div
    :class="[
      'digital-twin-layout',
      {
        'digital-twin-layout--sidebar-open': isSidebarOpen,
        [`digital-twin-layout--${layout}`]: layout,
      },
    ]"
  >
    <div class="digital-twin-layout--left">
      <slot name="left" />
    </div>
    <div class="digital-twin-layout--right">
      <slot name="right" />
    </div>
    <SideBar @toggle-sidebar="toggleSidebar" :topic="sideBarTopic" />
  </div>
</template>

<script lang="ts">
import SideBar from '@/components/general/SideBar.vue';
import type { PropType } from 'vue';

export default {
  components: {
    SideBar,
  },
  props: {
    sideBarTopic: {
      type: String,
      default: 'Wäremversorgung',
    },
    layout: {
      type: String as PropType<'default' | 'large'>,
      default: 'default',
    },
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar(state: boolean) {
      this.isSidebarOpen = state;
    },
  },
};
</script>

<style scoped lang="scss">
.digital-twin-layout {
  display: grid;
  grid-template-columns: 1fr 2fr 80px; // Sidebar closed, width 0
  transition: grid-template-columns 0.3s ease; // Smooth transition on layout change
  gap: 2rem;
  min-height: 100%;

  &--large {
    grid-template-columns: repeat(3, 1fr) repeat(8, 1fr) 80px;
  }

  &--large &--left {
    grid-column: span 3;
  }

  &--large &--right {
    grid-column: span 8;
  }

  &--sidebar-open {
    grid-template-columns: 1fr 2fr 355px; // Sidebar open, width 355px
  }

  &--left {
    display: flex;
    flex-direction: column;
    gap: $s;
    align-self: start;
    position: sticky;
    top: 0;
  }

  &--right {
    display: flex;
    flex-direction: column;
    gap: $s;
  }
}

p,
label {
  @include content;
}
</style>
