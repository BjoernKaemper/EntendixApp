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
.material-symbols-outlined {
  font-family: 'Material Symbols Outline';
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
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
