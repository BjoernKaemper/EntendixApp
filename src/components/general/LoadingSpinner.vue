<template>
  <div class="loading--wrapper">
    <MaterialSymbol :symbol="IconTypes.LOADING" />
  </div>
</template>

<script lang="ts">
/**
 * A general loading spinner component
 * @module components/general/LoadingSpinner
 * @displayName LoadingSpinner
 */
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

import { IconTypes } from '@/types/enums/IconTypes';

export default {
  name: 'LoadingSpinner',
  components: {
    MaterialSymbol,
  },
  setup() {
    return {
      IconTypes,
    };
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
.loading--wrapper span {
  margin: auto;
  transform: rotate(-45deg);
  animation: rotate 1.5s ease-in-out infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(-45deg);
    color: $dark-purple;
  }
  50% {
    color: $light-purple;
  }
  100% {
    transform: rotate(315deg);
    color: $dark-purple;
  }
}
</style>
