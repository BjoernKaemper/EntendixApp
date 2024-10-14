<template>
  <span class="material-symbols-outlined icon" :class="size">{{ symbol }}</span>
</template>

<script lang="ts">
export default {
  name: 'MaterialSymbol',
  props: {
    /**
     * The symbol to display.
     * @type {string}
     * @required
     */
    symbol: {
      type: String,
      required: true,
    },
    size: {
      type: String as () => 'small' | 'normal' | 'large',
      default: 'normal',
    },
  },
};
</script>
<style lang="scss" scoped>
.normal {
  font-size: $m;
}
.small {
  font-size: $s;
}
.large {
  font-size: $l;
}
</style>
