<template>
  <BaseLayout>
    <template #left>
      <h2>{{ subsectionName }}</h2>
      <LoadingCards v-if="isLoading" :card-count="1" card-class="image-loading" />
      <SymbolImage
        v-else
        :src="SubsectionPreviewImage"
        :alt="subsection?.data.tradeName || 'Subsection Name'"
        :use-aspect-ratio="false"
      />
    </template>
    <template #right>
      <div class="plant-performance">
        <div class="plant-performance__header">
          <h2>Performance in den Funktionsbereichen</h2>
          <ChipComponent
            v-if="subsection"
            :status="getChipStatusByCondition(subsection.data.condition)"
          />
        </div>
        <div class="plant-performance__content">
          <LoadingCards v-if="isLoading" :card-count="3" />
          <div v-else v-for="plantType in subsection?.data.plantsByType" :key="plantType.type">
            <h3>{{ plantType.name }}</h3>
            <div>
              <StatusCard
                v-for="plant in plantType.plants"
                @click="openPlant(plant.data.plantName, plant.id)"
                :key="plant.id"
                :isLoading="false"
                :title="plant.data.plantName"
                subtitle=""
                :isBordered="false"
                :status="getModuleChipStatusByCondition(plant.data.condition)"
                :actionType="ActionTypes.ARROW"
                timestamp="2024-08-14T18:27:00"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
// Library imports
import { mapStores } from 'pinia';

// Store imports
import { useGeneralStore } from '@/store/general';
import { useSubsectionStore } from '@/store/subsection';

// Helper imports
import Base64Helper from '@/helpers/Base64Helper';

// component imports
import StatusCard from '@/components/general/StatusCard.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import SymbolImage from '@/components/general/SymbolImage.vue';
import BaseLayout from '@/components/general/BaseLayout.vue';

// type imports
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';
import { ConditionTypes } from '@/types/global/enums/ConditionTypes';

import SubsectionPreviewImage from '@/assets/AutomationHZG.svg';

export default {
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

  components: {
    StatusCard,
    ChipComponent,
    LoadingCards,
    SymbolImage,
    BaseLayout,
  },
  computed: {
    ...mapStores(useGeneralStore, useSubsectionStore),
    subsection() {
      return this.subsectionStore.subsection;
    },
    isLoading(): boolean {
      return this.subsectionStore.isLoading;
    },
  },

  methods: {
    getChipStatusByCondition(condition: ConditionTypes): ChipStatusTypes {
      switch (condition) {
        case ConditionTypes.HEALTHY:
          return ChipStatusTypes.SUCCESS;
        case ConditionTypes.WARNING:
          return ChipStatusTypes.WARNING;
        case ConditionTypes.ALERT:
          return ChipStatusTypes.ERROR;
        default:
          return ChipStatusTypes.INFO;
      }
    },
    getModuleChipStatusByCondition(condition: ConditionTypes | undefined): ComponentStatusTypes {
      switch (condition) {
        case ConditionTypes.HEALTHY:
          return ComponentStatusTypes.SUCCESS_COMPONENT;
        case ConditionTypes.WARNING:
          return ComponentStatusTypes.WARNING_COMPONENT;
        case ConditionTypes.ALERT:
          return ComponentStatusTypes.ERROR_COMPONENT;
        default:
          return ComponentStatusTypes.INFO_COMPONENT;
      }
    },
    openPlant(plantName: string, plantid: string) {
      if (this.subsection) {
        this.$router.push({
          name: 'Monitoring_Site_Building_Subsection_Plant',
          params: {
            plantparams: JSON.stringify({
              siteid: Base64Helper.encode(this.siteId),
              siteName: this.siteName,
              buildingid: Base64Helper.encode(this.buildingId),
              buildingName: this.buildingName,
              subsectionName: this.subsection.data.tradeName,
              subsectionid: Base64Helper.encode(this.subsection.id),
              plantName,
              plantid: Base64Helper.encode(plantid),
            }),
          },
        });
      }
    },
  },

  setup() {
    return {
      ChipStatusTypes,
      ComponentStatusTypes,
      ActionTypes,
      SubsectionPreviewImage,
    };
  },
  async created() {
    const params = JSON.parse(this.$route.params.subsectionparams as string);
    this.subsectionName = params.subsectionName;
    this.subsectionId = Base64Helper.decode(params.subsectionid);
    this.siteName = params.siteName;
    this.siteId = Base64Helper.decode(params.siteid);
    this.buildingName = params.buildingName;
    this.buildingId = Base64Helper.decode(params.buildingid);
  },
};
</script>

<style scoped lang="scss">
.plant-performance {
  display: flex;
  flex-direction: column;
  gap: $m;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $l;

    & > div {
      display: flex;
      flex-direction: column;
      gap: $xxs;
      & > div {
        display: flex;
        flex-direction: column;
        gap: $xxs;
      }
    }
  }
}

h2 {
  @include content-headline;
}
h3 {
  @include content-subtitle;
}
h4 {
  @include content;
}

:deep(.image-loading) {
  height: 300px;
}
</style>
