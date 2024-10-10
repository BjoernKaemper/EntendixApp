<template>
  <span class="material-symbols-outlined">{{ symbol }}</span>
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
  },
};
</script>
