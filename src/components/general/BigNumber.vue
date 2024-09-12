<template>
  <div class="big-number">
    {{ number || '???' }}
    <p class="unit">{{ unit }}</p>
  </div>
</template>
<script langs="ts">
export default {
  props: {
    number: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: 'tbd.'
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/mixins.scss';

  .big-number {
    @include big-number;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: end
  }
  .unit {
    @include content;
    margin-left: $m
  }

</style>