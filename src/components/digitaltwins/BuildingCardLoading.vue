<template>
  <div class="build-card-loading">
    <LoadingSpinner />
  </div>
</template>

<script lang="ts">
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner,
  },
};
</script>

<style lang="scss" scoped>
.build-card-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: $xxl * 4;
  padding: $m;
  border-radius: $border-radius;
  background-color: $lightest;
}
</style>
