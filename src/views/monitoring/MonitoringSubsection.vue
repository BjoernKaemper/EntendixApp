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
          <div v-else v-for="plant in plants" :key="plant.id">
            <h3>{{ plant.data.plantName }}</h3>
            <div>
              <StatusCard
                v-for="currentModule in plant.data.modules"
                :key="currentModule.id"
                :isLoading="false"
                :title="currentModule.data.moduleName"
                subtitle=""
                :isBordered="false"
                :status="getModuleChipStatusByCondition(currentModule.data.condition)"
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
import { SubsectionConditionTypes } from '@/types/enums/SubsectionConditionTypes';

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
    subsection() {
      return this.generalStore.subsectionState.subsection;
    },
    plants() {
      return this.generalStore.subsectionState.plantState?.plants;
    },
    isLoading(): boolean {
      return this.generalStore.subsectionState.isLoading;
    },
  },
  methods: {
    toggleSidebar(state: boolean) {
      this.isSidebarOpen = state;
    },
    getChipStatusByCondition(condition: string): ChipStatusTypes {
      switch (condition) {
        case SubsectionConditionTypes.HEALTHY:
          return ChipStatusTypes.SUCCESS;
        case SubsectionConditionTypes.WARNING:
          return ChipStatusTypes.WARNING;
        case SubsectionConditionTypes.ALERT:
          return ChipStatusTypes.ERROR;
        default:
          return ChipStatusTypes.INFO;
      }
    },
    getModuleChipStatusByCondition(condition: SubsectionConditionTypes): ComponentStatusTypes {
      switch (condition) {
        case SubsectionConditionTypes.HEALTHY:
          return ComponentStatusTypes.SUCCESS_COMPONENT;
        case SubsectionConditionTypes.WARNING:
          return ComponentStatusTypes.WARNING_COMPONENT;
        case SubsectionConditionTypes.ALERT:
          return ComponentStatusTypes.ERROR_COMPONENT;
        default:
          return ComponentStatusTypes.INFO_COMPONENT;
      }
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

    &--header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $l;
    }

    &--content {
      display: flex;
      flex-direction: column;
      gap: $l;

      & > div {
        display: flex;
        flex-direction: column;
        gap: $xxs;
        & > div > div {
          margin-bottom: $xxs;
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
  margin-bottom: $xxs;
}
</style>
