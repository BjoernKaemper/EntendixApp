<template>
  <div class="grid-wrapper">
    <!-- left side of grid -->
    <div class="grid-wrapper--left">
      <h2>{{ buildingName || 'Loading' }}</h2>
      <template v-if="isLoading">
        <div class="image-loading">
          <LoadingSpinner />
        </div>
      </template>
      <AutomationKlima v-else />
      <div v-if="isLoading" class="status-container">
        <h3>Funktionserfüllung Anlagentechnik</h3>
        <div class="status-container--loading">
          <StatusCard v-for="index in statusCardAmount" :key="index" :is-bordered="false" />
        </div>
      </div>
      <div v-else class="status-container">
        <h3>Funktionserfüllung Anlagentechnik</h3>
        <!-- @TODO: Get the rest of the data in the response an map it -->
        <!-- @TODO: remove placeholders -->
        <div class="status-container--cards">
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
      </div>
      <div class="issues-container">
        <h3>Probleme in den Komponenten</h3>
        <template v-if="isLoading">
          <div class="loading">
            <LoadingSpinner />
          </div>
        </template>
        <div v-if="issues" class="issues">
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
        <!-- @TODO: create dropdown component -->
        <div class="dropdown">Letzte 14 Tage</div>
      </div>
      <div class="performance-grid">
        <!-- @TODO update status with data / remove hard coded value -->
        <div class="performance-grid" :class="{ 'performance-grid--loading': kpiIsLoading }">
          <ChartContainer
            v-for="(kpi, index) in kpis ? kpis : 3"
            :key="index"
            :kpi="typeof kpi === 'number' ? undefined : kpi"
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

// Type Imports
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { SubsectionTypes } from '@/types/enums/SubsectionTypes';
import { SemanticSubmoduleTypes } from '@/types/global/enums/SemanticSubmoduleTypes';
import { ModuleTypes } from '@/types/enums/ModuleTypes';

// component imports
import ChartContainer from '@/components/monitoring/ChartContainer.vue';
import AutomationKlima from '@/assets/AutomationKlima.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import { ConditionTypes } from '@/types/global/enums/ConditionTypes';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

export default {
  components: {
    ChartContainer,
    AutomationKlima,
    StatusCard,
    LoadingSpinner,
  },

  data() {
    return {
      issues: true,
      buildingName: '',
    };
  },

  setup() {
    return {
      ChipStatusTypes,
      ComponentStatusTypes,
      ActionTypes,
      SubsectionTypes,
      ModuleTypes,
    };
  },

  computed: {
    ...mapStores(useGeneralStore),

    building() {
      return this.generalStore.buildingState.building;
    },

    site() {
      return this.generalStore.siteState.site;
    },

    subsections(): any {
      return this.generalStore.buildingState.subsectionState.subsections;
    },

    kpis() {
      return this.generalStore.buildingState.kpiState.kpis;
    },

    lastBuildingRequestTimestamp(): DateTime | null {
      return this.generalStore.buildingState.requestTimestamp;
    },

    statusCardAmount(): number {
      return this.building?.data?.subsections?.length || 3;
    },

    isLoading(): boolean {
      return this.generalStore.buildingState.isLoading;
    },

    kpiIsLoading(): boolean {
      return this.generalStore.buildingState.kpiState.isLoading;
    },

    kpiAmount(): number {
      return this.kpis.length ? this.kpis.length : 3;
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
              siteid: encodeURIComponent(this.site!.id),
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

.image-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;
  background-color: $lightest;
  border-radius: $base-size;
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

  &--loading {
    display: grid;
    gap: $xxs;
    width: 100%;

    @for $i from 1 through 3 {
      & > div:nth-child(#{$i}) {
        // from 99% to 66% to 33% opacity
        opacity: 1 - (($i - 1) * 0.33);
      }
    }
  }
}

.issues-container {
  background-color: $light-purple-40;
  padding: $xxs;
  border-radius: $border-radius;
  display: flex;
  flex-direction: column;
  gap: $xs;

  & .loading > * > * {
    height: 20px;
  }

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

  .dropdown {
    @include content;
    cursor: pointer;
    border: 1px solid $light-purple;
    margin: 0;
    padding: 0 $xxs;
    border-radius: $border-radius;
  }
}

.performance-grid--loading {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: $m;
  @for $i from 1 through 3 {
    & > div:nth-child(#{$i}) {
      // from 99% to 66% to 33% opacity
      opacity: 1 - (($i - 1) * 0.33);
    }
  }
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
</style>
