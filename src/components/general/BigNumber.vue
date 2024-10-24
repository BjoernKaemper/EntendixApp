<template>
  <div class="big-number">
    {{ number === null ? '???' : number }}
    <!-- TODO: Tooltip with textversion of the unit (e.g. Kilowattstunde pro Quadratmeter) -->
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
     * @default ''
     */
    unit: {
      type: String as PropType<string>,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
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
