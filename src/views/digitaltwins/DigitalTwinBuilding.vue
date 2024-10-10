<template>
  <DigitalTwinLayout>
    <template #left>
      <h2>{{ buildingName }}</h2>
      <BuildingDetails v-if="building" :buildingName="buildingName" :building="building" />
    </template>
  </DigitalTwinLayout>
</template>

<script lang="ts">
// Library imports
import { mapStores } from 'pinia';

// Store imports
import { useGeneralStore } from '@/store/general';

// Component imports
import DigitalTwinLayout from '@/components/general/digitaltwins/DigitalTwinLayout.vue';
import BuildingDetails from '@/components/general/digitaltwins/BuildingDetails.vue';

export default {
  components: {
    DigitalTwinLayout,
    BuildingDetails,
  },
  data() {
    return {
      buildingName: '',
    };
  },
  computed: {
    ...mapStores(useGeneralStore),

    building() {
      return this.generalStore.buildingState.building;
    },
  },
  created() {
    this.buildingName = JSON.parse(this.$route.params.buildingparams as string).buildingName;
  },
};
</script>

<style scoped lang="scss">
h1 {
  @include content-headline;
}

h2, h3 {
  @include content-headline;
  color: $dark-green;
}
</style>
