<template>
  <div class="big-number">
    {{ number || '???' }}
    <p class="unit">{{ unit }}</p>
  </div>
</template>

<script langs="ts">

export default {
  props: {
    /**
     * The number to display
     * @type {Number}
     */
    number: {
      type: Number,
    },
    /**
     * The unit of the number
     * @type {String}
     * @default 'tbd.'
     */
    unit: {
      type: String,
      default: 'tbd.',
    },
  },
};

</script>

<style lang="scss">
@import '@/styles/mixins.scss';

  .big-number {
    @include big-number;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
  }
  .unit {
    @include content;
    margin-left: $m;
  }

</style>
