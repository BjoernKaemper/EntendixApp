<template>
  <div>
    <div :class="['grid-wrapper', { 'grid-wrapper--sidebar-open': isSidebarOpen }]">
      <div class="grid-wrapper--left">
        <h2>{{ subsectionName }}</h2>
        <LoadingCards v-if="isLoading" :card-count="1" card-class="image-loading" />
        <SymbolImage
          v-else
          :src="SubsectionPreviewImage"
          :alt="subsection?.data.tradeName || 'Subsection Name'"
          :use-aspect-ratio="false"
        />
      </div>
      <div class="grid-wrapper--right">
        <div class="grid-wrapper--right--header">
          <h2>Performance in den Funktionsbereichen</h2>
          <ChipComponent
            v-if="subsection"
            :status="getChipStatusByCondition(subsection.data.condition)"
          />
        </div>
        <div class="grid-wrapper--right--content">
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
      <SideBar @toggle-sidebar="toggleSidebar" :topic="subsection?.data.tradeType" />
    </div>
  </div>
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
import SideBar from '@/components/general/SideBar.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import SymbolImage from '@/components/general/SymbolImage.vue';

// type imports
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';
import { ConditionTypes } from '@/types/global/enums/ConditionTypes';

import SubsectionPreviewImage from '@/assets/AutomationHZG.svg';

export default {
  data() {
    return {
      isSidebarOpen: false,
      subsectionName: '',
      subsectionId: '',
      siteName: '',
      siteId: '',
      buildingName: '',
      buildingId: '',
    };
  },

  components: {
    SideBar,
    StatusCard,
    ChipComponent,
    LoadingCards,
    SymbolImage,
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
    toggleSidebar(state: boolean) {
      this.isSidebarOpen = state;
    },
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
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 80px;
  grid-gap: $m;
  transition: grid-template-columns 0.3s ease;

  &--left {
    display: flex;
    flex-direction: column;
    gap: $xl;
  }

  &--right {
    display: flex;
    flex-direction: column;
    gap: $m;

    &--header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &--content {
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

  &--sidebar-open {
    grid-template-columns: 1fr 2fr 355px; // Sidebar open, width 355px
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
