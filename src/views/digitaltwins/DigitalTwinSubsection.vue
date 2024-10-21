<template>
  <DigitalTwinLayout>
    <template #left>
      <h2>{{ subsectionName }}</h2>
      <div class="twin-subsection__schema-image">
        <LoadingSpinner class="twin-subsection__schema-loading" v-if="isLoading" size="large" />
        <AutomationHZG v-else />
      </div>
    </template>
    <template #right>
      <h3>Verwaltung der Anlage</h3>
      <LoadingCards v-if="isLoading" />
      <div v-else class="twin-subsection__plants">
        <div
          v-for="plantType in subsection?.data.plantsByType"
          :key="plantType.type"
          class="twin-subsection__plant-type-group"
        >
          <h4>{{ plantType.name }}</h4>
          <!--TODO: Get proper data for subtitle/supplying area-->
          <ListElement
            v-for="plant in sortPlants(plantType.plants)"
            :key="plant.id"
            :title="plant.data.plantName"
            interactionIcon="chevron_forward"
            subtitle="Erdgeschoss"
            @click="openPlant(plant.data.plantName, plant.id)"
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
import { useSubsectionStore } from '@/store/subsection';

// Component imports
import DigitalTwinLayout from '@/components/digitaltwins/DigitalTwinLayout.vue';
import AutomationHZG from '@/assets/AutomationHZG.vue';
import ListElement from '@/components/general/ListElement.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';

// Type imports
import type { Plant } from '@/types/global/plant/Plant';

export default {
  name: 'DigitalTwinSubsection',
  components: {
    DigitalTwinLayout,
    AutomationHZG,
    ListElement,
    LoadingSpinner,
    LoadingCards,
  },
  data() {
    return {
      subsectionName: '',
      subsectionId: '',
      siteName: '',
      siteId: '',
      buildingName: '',
      buildingId: '',
    };
  },
  computed: {
    ...mapStores(useSubsectionStore),

    subsection() {
      return this.subsectionStore.subsection;
    },

    isLoading() {
      return this.subsectionStore.isLoading;
    },
  },
  methods: {
    sortPlants(plants: Plant[]): Plant[] {
      return plants.sort((a, b) => a.data.plantName.localeCompare(b.data.plantName));
    },
    openPlant(plantName: string, plantid: string) {
      if (this.subsection) {
        this.$router.push({
          name: 'DigitalTwins_Site_Building_Subsection_Plant',
          params: {
            plantparams: JSON.stringify({
              siteid: encodeURIComponent(this.siteId),
              siteName: this.siteName,
              buildingid: encodeURIComponent(this.buildingId),
              buildingName: this.buildingName,
              subsectionName: this.subsection.data.tradeName,
              subsectionid: encodeURIComponent(this.subsection.id),
              plantName,
              plantid: encodeURIComponent(plantid),
            }),
          },
        });
      }
    },
  },
  created() {
    const params = JSON.parse(this.$route.params.subsectionparams as string);
    this.subsectionName = params.subsectionName;
    this.subsectionId = decodeURIComponent(params.subsectionid);
    this.siteName = params.siteName;
    this.siteId = decodeURIComponent(params.siteid);
    this.buildingName = params.buildingName;
    this.buildingId = decodeURIComponent(params.buildingid);
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

  &__schema-loading {
    aspect-ratio: 2 / 3; // aspect ratio to mimic size of later loaded image
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
