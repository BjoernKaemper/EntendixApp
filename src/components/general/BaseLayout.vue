<template>
  <div
    :class="[
      'base-layout',
      {
        [`base-layout--${layout}`]: layout,
        'base-layout--sidebar-open': isSidebarOpen,
        'base-layout--no-sidebar': !showSidebar,
      },
    ]"
  >
    <div class="base-layout--left">
      <slot name="left" />
    </div>
    <div class="base-layout--right">
      <slot name="right" />
    </div>
    <SideBar v-if="showSidebar" @toggle-sidebar="toggleSidebar" :topic="sideBarTopic" />
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
      default: '',
    },
    layout: {
      type: String as PropType<'default' | 'large'>,
      default: 'default',
    },
    showSidebar: {
      type: Boolean,
      default: true,
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
.base-layout {
  $self: &;
  display: grid;
  grid-template-columns: 1fr 2fr 80px; // Sidebar closed, width 0
  transition: grid-template-columns 0.3s ease; // Smooth transition on layout change
  gap: 2rem;
  min-height: 100%;

  &--no-sidebar {
    grid-template-columns: 1fr 2fr;
  }

  &--large {
    grid-template-columns: repeat(3, 1fr) repeat(8, 1fr) 80px;
  }

  &--large &--no-sidebar {
    grid-template-columns: repeat(3, 1fr) repeat(8, 1fr);
  }

  &--large &--left {
    grid-column: span 3;
  }

  &--large &--right {
    grid-column: span 8;
  }

  &--large#{$self}--sidebar-open {
    grid-template-columns: repeat(3, 1fr) repeat(8, 1fr) 355px;
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
