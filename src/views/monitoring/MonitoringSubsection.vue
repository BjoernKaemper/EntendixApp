<template>
  <div>
    <div :class="['grid-wrapper', { 'grid-wrapper--sidebar-open': isSidebarOpen }]">
      <div class="grid-wrapper--left">
        <h2>{{ subsectionName }}</h2>
        <AutomationHZG />
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
          <template v-if="isLoading">
            <div class="status-container--loading">
              <StatusCard v-for="index in 3" :key="index" :isLoading="true" />
            </div>
          </template>
          <div v-else v-for="plantType in subsection!.data.plantsByType" :key="plantType.type">
            <h3>{{ plantType.name }}</h3>
            <div>
              <StatusCard
                v-for="plant in plantType.plants"
                @click="
                  if (site && building && subsection) {
                    openPlant(
                      site.id,
                      site.data.siteName,
                      building.id,
                      building.data.buildingName,
                      subsection.data.tradeName,
                      subsection.id,
                      plant.data.plantName,
                      plant.id,
                    );
                  }
                "
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

// component imports
import AutomationHZG from '@/assets/AutomationHZG.vue';
import SideBar from '@/components/general/SideBar.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';

// type imports
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';
import { ConditionTypes } from '@/types/global/enums/ConditionTypes';

export default {
  data() {
    return {
      isSidebarOpen: false,
      subsectionName: '',
    };
  },
  components: {
    AutomationHZG,
    SideBar,
    StatusCard,
    ChipComponent,
  },
  computed: {
    ...mapStores(useGeneralStore),
    site() {
      return this.generalStore.siteState.site;
    },
    building() {
      return this.generalStore.buildingState.building;
    },
    subsection() {
      return this.generalStore.subsectionState.subsection;
    },
    isLoading(): boolean {
      return this.generalStore.subsectionState.isLoading;
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
    openPlant(
      siteid: string,
      siteName: string,
      buildingid: string,
      buildingName: string,
      subsectionName: string,
      subsectionid: string,
      plantName: string,
      plantid: string,
    ) {
      this.$router.push({
        name: 'Monitoring_Site_Building_Subsection_Plant',
        params: {
          plantparams: JSON.stringify({
            siteid: encodeURIComponent(siteid),
            siteName,
            buildingid: encodeURIComponent(buildingid),
            buildingName,
            subsectionName,
            subsectionid: encodeURIComponent(subsectionid),
            plantName,
            plantid: encodeURIComponent(plantid),
          }),
        },
      });
    },
  },
  setup() {
    return {
      ChipStatusTypes,
      ComponentStatusTypes,
      ActionTypes,
    };
  },
  async created() {
    this.subsectionName = JSON.parse(this.$route.params.subsectionparams as string).subsectionName;
  },
};
</script>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 80px; // Sidebar closed, width 0
  grid-gap: $m;
  transition: grid-template-columns 0.3s ease; // Smooth transition on layout change

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
</style>
