<template>
  <div>
    <pre>{{ plant }}</pre>
  </div>
</template>

<script lang="ts">
// Library imports
import { mapStores } from 'pinia';

// Store imports
import { usePlantStore } from '@/store/plant';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapStores(usePlantStore),
    plant() {
      return this.plantStore.plant;
    },
  },
};
</script>
