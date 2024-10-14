<template>
  <DigitalTwinLayout>
    <template #left>
      <h2>{{ subsectionName }}</h2>
      <div class="twin-subsection__schema-image">
        <AutomationHZG />
      </div>
    </template>
    <template #right>
      <h3>Verwaltung der Anlage</h3>
      <div class="twin-subsection__plants">
        <!--TODO loading state with general loading card component-->
        <div v-for="plantType in subsection?.data.plantsByType" :key="plantType.type" class="twin-subsection__plant-type-group">
          <h4>{{ plantType.name }}</h4>
          <!--TODO: Get proper data for subtitle/supplying area-->
          <ListElement
            v-for="plant in sortPlants(plantType.plants)"
            :key="plant.id"
            :title="plant.data.plantName"
            interactionIcon="chevron_forward"
            subtitle="Erdgeschoss"
            @click="console.log('clicked on plant', plant)"
          />
        </div>
      </div>
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
import AutomationHZG from '@/assets/AutomationHZG.vue';
import ListElement from '@/components/general/ListElement.vue';

// Type imports
import type { Plant } from '@/types/global/plant/Plant';

export default {
  name: 'DigitalTwinSubsection',
  components: {
    DigitalTwinLayout,
    AutomationHZG,
    ListElement,
  },
  data() {
    return {
      subsectionName: '',
    };
  },
  computed: {
    ...mapStores(useGeneralStore),

    subsection() {
      return this.generalStore.subsectionState.subsection;
    },
  },
  methods: {
    sortPlants(plants: Plant[]): Plant[] {
      return plants.sort((a, b) => a.data.plantName.localeCompare(b.data.plantName));
    },
  },
  created() {
    this.subsectionName = JSON.parse(this.$route.params.subsectionparams as string).subsectionName;
  },
};
</script>

<style scoped lang="scss">
.twin-subsection {
  &__schema-image {
    background-color: $lightest;
    border-radius: $border-radius;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $s;
  }

  &__plants {
    display: flex;
    flex-direction: column;
    gap: $l;
  }

  &__plant-type-group {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }
}

h1 {
  @include content-headline;
}

h2,
h3 {
  @include content-headline;
  color: $dark-green;
}

h4 {
  @include content-subtitle;
}

p,
label {
  @include content;
}
</style>
