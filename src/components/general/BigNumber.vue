<template>
  <div class="big-number">
    {{ number || '???' }}
    <p class="unit">{{ unit }}</p>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

export default {
  props: {
    /**
     * The number to display
     * @type {Number}
     */
    number: {
      type: Number as PropType<number>,
      default: null,
    },
    /**
     * The unit of the number
     * @type {String}
     * @default 'tbd.'
     */
    unit: {
      type: String as PropType<string>,
      default: 'tbd.',
    },
  },
};

</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

  .big-number {
    @include big-number;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: end;
    opacity: 50%;
    transition: opacity 0.2s;
    padding: $m;

    &:hover {
      opacity: 100%;
    }
  }
  .unit {
    @include content;
    margin-left: $m;
  }

</style>
