<template>
  <span class="material-symbols-outlined icon" :class="size">{{ symbol }}</span>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { MaterialIconNames } from '@/types/local/MaterialIconNames';
import type { IconTypes } from '@/types/enums/IconTypes';

export default {
  name: 'MaterialSymbol',
  props: {
    /**
     * The symbol to display.
     * @type {string}
     * @required
     */
    symbol: {
      type: String as PropType<MaterialIconNames | IconTypes>,
      required: true,
    },
    size: {
      type: String as () => 'small' | 'normal' | 'large' | 'x-large',
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
.x-large {
  font-size: $xxl;
}
</style>
