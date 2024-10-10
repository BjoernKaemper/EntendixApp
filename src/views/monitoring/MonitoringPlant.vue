<template>
  <div>
    <pre>{{ plant }}</pre>
  </div>
</template>

<script lang="ts">
// Library imports
import { mapStores } from 'pinia';

// Store imports
import { useGeneralStore } from '@/store/general';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapStores(useGeneralStore),
    plant() {
      return this.generalStore.plantState.plant;
    },
  },
};
</script>
