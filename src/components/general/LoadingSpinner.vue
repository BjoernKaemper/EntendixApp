<template>
  <div class="loading--wrapper">
    <LoadingIcon />
    <!-- Loading........ -->
  </div>
</template>

<script lang="ts">
/**
 * A general loading spinner component
 * @module components/general/LoadingSpinner
 * @displayName LoadingSpinner
 */
import LoadingIcon from '@/components/icons/LoadingIcon.vue';

export default {
  name: 'LoadingSpinner',
  components: {
    LoadingIcon,
  },
};
</script>

<style lang="scss" scoped>
.loading--wrapper {
  transform: rotate(-45deg);
  font-size: 1.5rem;
  animation: rotate 1.5s ease-in-out infinite;
}

.loading--wrapper svg {
  margin: auto;
  display: block;
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
