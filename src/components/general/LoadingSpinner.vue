<template>
  <div class="loading--wrapper">
    <div class="loader" :class="{ [`loader--${size}`]: size }" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

/**
 * A general loading spinner component
 * @module components/general/LoadingSpinner
 * @displayName LoadingSpinner
 */

export default {
  name: 'LoadingSpinner',
  props: {
    /**
     * Size of the spinner
     */
    size: {
      type: String as PropType<'small' | 'normal' | 'large'>,
      default: 'normal',
    },
  },
};
</script>

<style lang="scss" scoped>
.loading--wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loader {
  width: $m;
  height: $m;
  border: 2px solid $dark-purple;
  border-right-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotate 1.5s ease-in-out infinite;
  margin: auto;

  &--small {
    width: $s;
    height: $s;
  }

  &--large {
    width: $xxl;
    height: $xxl;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(-45deg);
    border-color: $dark-purple;
    border-right-color: transparent;
  }
  50% {
    border-color: $light-purple;
    border-right-color: transparent;
  }
  100% {
    transform: rotate(315deg);
    border-color: $dark-purple;
    border-right-color: transparent;
  }
}
</style>
