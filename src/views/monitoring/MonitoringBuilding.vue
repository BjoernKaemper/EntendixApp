<template>
  <div class="grid-wrapper">
    <!-- left side of grid -->
    <div class="grid-wrapper--left">
      <h2>{{ building?.data.buildingName || buildingName }}</h2>
      <LoadingCards v-if="isLoading" :card-count="1" card-class="image-loading" />
      <SymbolImage
        v-else
        :src="BuildingPreviewImage"
        :alt="building?.data.buildingName || 'Site Name'"
        :use-aspect-ratio="false"
      />
      <div class="status-container">
        <h3>Funktionserfüllung Anlagentechnik</h3>
        <LoadingCards v-if="isLoading" :card-count="3" card-class="" />
        <!-- @TODO: Get the rest of the data in the response an map it -->
        <!-- @TODO: remove placeholders -->
        <div v-else-if="!functionLoadingError" class="status-container--cards">
          <StatusCard
            v-for="(subsection, idx) in subsections"
            @click="openSubsection(subsection.data.tradeName, subsection.id)"
            :key="idx"
            :title="subsection.data.tradeName"
            :isBordered="false"
            :status="getSubsectionChipStatusByCondition(subsection.data.condition)"
            :kpiType="getSubsectionTypeIcon(subsection.data.tradeType)"
            :actionType="ActionTypes.ARROW"
            :isLoading="isLoading"
          />
        </div>
        <AlertElement v-else :alert="AlertMessages.CANNOT_LOAD" :is-toast="false" />
      </div>
      <div class="issues-container">
        <h3>Probleme in den Komponenten</h3>
        <LoadingCards v-if="isLoading" :card-count="1" card-class="problems-loading" />
        <AlertElement
          v-else-if="issueLoadingError"
          :alert="AlertMessages.CANNOT_LOAD"
          :is-toast="false"
        />
        <div v-else-if="issues" class="issues">
          <!-- TODO: Replace with real issues -->
          <p>Hier finden Sie in Zukunft die aktuellen Probleme in den Komponenten.</p>
        </div>
        <div v-else class="no-issues">
          <p>Aktuell sind alle Komponenten im Zielbereich.</p>
          <p>Es gibt keine kritischen Abweichungen oder Warnungen.</p>
        </div>
      </div>
    </div>

    <!-- right side of grid -->
    <div class="grid-wrapper--right">
      <div class="performance-header">
        <h3>Performance des Gebäudes</h3>
        <TimeRangeDropdown />
      </div>
      <LoadingCards v-if="kpiIsLoading" :card-count="3" :grow-cards="true" />
      <AlertElement
        v-else-if="kpiLoadingError"
        :alert="AlertMessages.CANNOT_LOAD"
        :is-toast="false"
      />
      <div v-else class="performance-grid">
        <!-- @TODO update status with data / remove hard coded value -->
        <div class="performance-grid">
          <ChartContainer
            v-for="(kpi, index) in kpis"
            :key="index"
            :kpi="kpi"
            :lastUpdateTimestamp="lastBuildingRequestTimestamp"
            :isLoading="kpiIsLoading"
            :status="getSubsectionChipStatusByCondition(kpi.data.condition!)"
            :moduleType="ModuleTypes.BUILDING"
            :moduleName="buildingName"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Library imports
import type { DateTime } from 'luxon';
import { mapStores } from 'pinia';

// Helpers
import Base64Helper from '@/helpers/Base64Helper';

// Store imports
import { useGeneralStore } from '@/store/general';
import { useBuildingStore } from '@/store/building';

// Type Imports
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { SubsectionTypes } from '@/types/enums/SubsectionTypes';
import { SemanticSubmoduleTypes } from '@/types/global/enums/SemanticSubmoduleTypes';
import { ModuleTypes } from '@/types/enums/ModuleTypes';
import type { TimelineLookbackOptions } from '@/configs/timeRangeDropdown';

// component imports
import ChartContainer from '@/components/monitoring/ChartContainer.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import { ConditionTypes } from '@/types/global/enums/ConditionTypes';
import LoadingCards from '@/components/general/LoadingCards.vue';
import TimeRangeDropdown from '@/components/general/inputs/TimeRangeDropdown.vue';
import AlertElement from '@/components/general/AlertElement.vue';
import SymbolImage from '@/components/general/SymbolImage.vue';

import { AlertMessages } from '@/assets/json/AlertMessages';
import BuildingPreviewImage from '@/assets/AutomationKlima.svg';

export default {
  components: {
    ChartContainer,
    StatusCard,
    LoadingCards,
    TimeRangeDropdown,
    AlertElement,
    SymbolImage,
  },

  data() {
    return {
      issues: true,
      buildingName: '',
      buildingId: '',
      siteName: '',
      siteId: '',
    };
  },

  setup() {
    return {
      ChipStatusTypes,
      ComponentStatusTypes,
      ActionTypes,
      SubsectionTypes,
      ModuleTypes,
      AlertMessages,
      BuildingPreviewImage,
    };
  },

  computed: {
    ...mapStores(useGeneralStore, useBuildingStore),

    building() {
      return this.buildingStore.building;
    },

    subsections(): any {
      return this.buildingStore.subsectionState.subsections;
    },

    kpis() {
      return this.buildingStore.kpiState.kpis;
    },

    lastBuildingRequestTimestamp(): DateTime | undefined | null {
      return this.buildingStore.requestTimestamp;
    },

    statusCardAmount(): number {
      return this.building?.data?.subsections?.length || 3;
    },

    isLoading(): boolean {
      return this.buildingStore.isLoading === undefined ? true : this.buildingStore.isLoading;
    },

    kpiIsLoading(): boolean {
      return this.buildingStore.kpiState.isLoading === undefined
        ? true
        : this.buildingStore.isLoading;
    },

    kpiAmount(): number {
      return this.kpis?.length || 0;
    },

    kpiLookbackStartTimestamp(): TimelineLookbackOptions {
      return this.generalStore.kpiLookbackWindow.currentValue;
    },

    functionLoadingError(): boolean {
      return this.buildingStore.error === null && this.buildingStore.subsectionState.error === null
        ? false
        : this.buildingStore.error || this.buildingStore.subsectionState.error;
    },

    kpiLoadingError(): boolean {
      return this.buildingStore.kpiState.error;
    },

    issueLoadingError(): boolean {
      // TODO: OR Issue Loading Error
      return this.buildingStore.error === null ? false : this.buildingStore.error;
    },
  },

  watch: {
    kpiLookbackStartTimestamp() {
      this.buildingStore.fetchKpiChartData();
    },
  },

  methods: {
    getSubsectionTypeIcon(type: string): SubsectionTypes {
      switch (type) {
        case SemanticSubmoduleTypes.AIR_TECHNICAL_SYSTEMS:
          return SubsectionTypes.AIR;
        case SemanticSubmoduleTypes.HEAT_SUPPLY_SYSTEMS:
          return SubsectionTypes.HEAT;
        case SemanticSubmoduleTypes.WASTEWATER_WATER_GAS_SYSTEMS:
          return SubsectionTypes.NONE; // @TODO: Add icon for water
        case SemanticSubmoduleTypes.COLD_SYSTEMS:
          return SubsectionTypes.COLD;
        case SemanticSubmoduleTypes.HIGH_VOLTAGE_CURRENT:
          return SubsectionTypes.ELECTRICITY;
        case SemanticSubmoduleTypes.BUILDUNG_AUTOMATION_SYSTEM:
          return SubsectionTypes.SECURITY; // @TODO: Add icon for automation systems
        default:
          return SubsectionTypes.NONE;
      }
    },

    getSubsectionChipStatusByCondition(condition: ConditionTypes): ChipStatusTypes {
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

    openSubsection(subsectionName: string, subsectionid: string) {
      if (this.building) {
        this.$router.push({
          name: 'Monitoring_Site_Building_Subsection',
          params: {
            subsectionparams: JSON.stringify({
              siteid: Base64Helper.encode(this.siteId),
              siteName: this.siteName,
              buildingid: Base64Helper.encode(this.building!.id),
              buildingName: this.building!.data.buildingName,
              subsectionName,
              subsectionid: Base64Helper.encode(subsectionid),
            }),
          },
        });
      }
    },
  },

  async created() {
    const params = JSON.parse(this.$route.params.buildingparams as string);
    this.buildingName = params.buildingName;
    this.buildingId = Base64Helper.decode(params.buildingid);
    this.siteName = params.siteName;
    this.siteId = Base64Helper.decode(params.siteid);
  },
};
</script>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  grid-gap: $m;

  &--left,
  &--right {
    display: flex;
    flex-direction: column;
    gap: $s;
  }
}

:deep(.image-loading) {
  height: 300px;
}

.performance-grid {
  display: flex;
  flex-direction: column;
  gap: $m;
}

.status-container {
  display: flex;
  flex-direction: column;
  gap: $xxs;

  &--cards {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }

  & > h3 {
    @include content-subtitle;
    color: $darkest;
  }
}

.issues-container {
  background-color: $light-purple-40;
  padding: $xxs;
  border-radius: $border-radius;
  display: flex;
  flex-direction: column;
  gap: $xs;

  & > h3 {
    @include content-subtitle;
    color: $darkest;
  }

  .no-issues {
    & > p {
      @include meta-information;
      text-align: center;
    }
  }

  .issues {
    display: flex;
    flex-direction: column;
    gap: $xxs;
    & > p {
      @include content;
      color: $darkest;
    }
  }
}

.performance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2,
h3 {
  @include content-headline;
  color: $dark-green;
}

h4 {
  @include content-subtitle;
}

img {
  width: 100%;
  border-radius: $border-radius;
}
:deep(.problems-loading) {
  background-color: transparent;
}
</style>
