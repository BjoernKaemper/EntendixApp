<template>
  <div class="grid-wrapper">
    <!-- left side of grid -->
    <div class="grid-wrapper--left">
      <h2>{{ building?.data.buildingName || buildingName }}</h2>
      <LoadingCards v-if="isLoading" :card-count="1" card-class="image-loading" />
      <AutomationKlima v-else />
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
          <!-- @TODO: remove placeholders after data is in place -->
          <p>Wäremversorgung</p>
          <StatusCard
            title="Wärmeerzeuger 1"
            subtitle="Ursache: Unter Sollwert"
            :isBordered="false"
            :status="ComponentStatusTypes.ERROR_COMPONENT"
            :actionType="ActionTypes.ARROW"
            :isLoading="isLoading"
          />
          <StatusCard
            title="Heizkreis 1"
            subtitle="Ursache: Über Sollwert"
            :isBordered="false"
            :status="ComponentStatusTypes.ERROR_COMPONENT"
            :actionType="ActionTypes.ARROW"
            :isLoading="isLoading"
          />
          <p>Stromversorgung</p>
          <StatusCard
            title="Stromkreislauf 1"
            subtitle="Ursache: Über Sollwert"
            :isBordered="false"
            :status="ComponentStatusTypes.WARNING_COMPONENT"
            :actionType="ActionTypes.ARROW"
            :isLoading="isLoading"
          />
          <StatusCard
            v-for="(kpi, idx) in kpis"
            :key="idx"
            :title="kpi.data.name.de"
            :isBordered="false"
            :status="ComponentStatusTypes.ERROR_COMPONENT"
            :actionType="ActionTypes.ARROW"
            :timestamp="kpi.data.annotations[0]?.timestampOfCreation"
            :isLoading="isLoading"
          />
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
            :status="ChipStatusTypes.SUCCESS"
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

// Store imports
import { useGeneralStore } from '@/store/general';
import { useBuildingStore } from '@/store/building';
import { useSiteStore } from '@/store/site';

// Type Imports
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { SubsectionTypes } from '@/types/enums/SubsectionTypes';
import { SemanticSubmoduleTypes } from '@/types/global/enums/SemanticSubmoduleTypes';
import { ModuleTypes } from '@/types/enums/ModuleTypes';
import type { TimelineLookbackOptions } from '@/types/enums/TimelineLookbackOptions';

// component imports
import ChartContainer from '@/components/monitoring/ChartContainer.vue';
import AutomationKlima from '@/assets/AutomationKlima.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import { ConditionTypes } from '@/types/global/enums/ConditionTypes';
import LoadingCards from '@/components/general/LoadingCards.vue';
import TimeRangeDropdown from '@/components/general/inputs/TimeRangeDropdown.vue';
import AlertElement from '@/components/general/AlertElement.vue';

import { AlertMessages } from '@/assets/json/AlertMessages';

export default {
  components: {
    ChartContainer,
    AutomationKlima,
    StatusCard,
    LoadingCards,
    TimeRangeDropdown,
    AlertElement,
  },

  data() {
    return {
      issues: true,
      buildingName: '',
      buildingId: '',
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
    };
  },

  computed: {
    ...mapStores(useGeneralStore, useBuildingStore, useSiteStore),

    building() {
      return this.buildingStore.building;
    },

    site() {
      return this.siteStore.site;
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

    kpiLookbackStartTimestamp(): keyof typeof TimelineLookbackOptions {
      return this.generalStore.kpiLookbackStartTimestamp;
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
      if (this.site && this.building) {
        this.$router.push({
          name: 'Monitoring_Site_Building_Subsection',
          params: {
            subsectionparams: JSON.stringify({
              // TODO: Should this come from the params? Then we dont need to load them
              siteid: encodeURIComponent(this.site!.id),
              // TODO: Should this come from the params? Then we dont need to load them
              siteName: this.site!.data.siteName,
              buildingid: encodeURIComponent(this.building!.id),
              buildingName: this.building!.data.buildingName,
              subsectionName,
              subsectionid: encodeURIComponent(subsectionid),
            }),
          },
        });
      }
    },
  },

  async created() {
    this.buildingName = JSON.parse(this.$route.params.buildingparams as string).buildingName;
    this.buildingId = decodeURIComponent(
      JSON.parse(this.$route.params.buildingparams as string).buildingid,
    );
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
