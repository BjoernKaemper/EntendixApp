<template>
  <div class="grid-wrapper">
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
          <StatusCard v-for="index in statusCardAmount" :key="index" />
        </div>
      </div>
      <div v-else class="status-container">
        <h3>Funktionserfüllung Anlagentechnik</h3>
        <!-- @TODO: Get the rest of the data in the response an map it -->
        <!-- @TODO: remove placeholders -->
        <StatusCard
          v-for="(subsection, idx) in subsections"
          :key="idx"
          :title="subsection.tradeName"
          :isBordered="false"
          :status="getSubsectionChipStatusByCondition(subsection.condition)"
          :kpiType="getSubsectionTypeIcon(subsection.tradeType)"
          :actionType="ActionTypes.ARROW"
          :isLoading="isLoading"
        />
      </div>
      <div v-if="isLoading" class="issues-container">
        <h3>@TODO: Probleme in den Komponenten</h3>
        <template v-if="isLoading">
          <div class="loading">
            <LoadingSpinner />
          </div>
        </template>
      </div>
      <div v-else class="issues-container">
        <h3>@TODO: Probleme in den Komponenten</h3>
        <div v-if="issues" class="issues">
          <!-- @TODO: remove placeholders after data is in place -->
          <p>Wäremversorgung</p>
          <StatusCard
            @click="openSubsectionDemoPage()"
            title="Wärmeerzeuger 1"
            subtitle="Ursache: Unter Sollwert"
            :isBordered="false"
            :status="ComponentStatusTypes.ERROR_COMPONENT"
            :actionType="ActionTypes.ARROW"
            :isLoading="isLoading"
          />
          <StatusCard
            @click="openSubsectionDemoPage()"
            title="Heizkreis 1"
            subtitle="Ursache: Über Sollwert"
            :isBordered="false"
            :status="ComponentStatusTypes.ERROR_COMPONENT"
            :actionType="ActionTypes.ARROW"
            :isLoading="isLoading"
          />
          <p>Stromversorgung</p>
          <StatusCard
            @click="openSubsectionDemoPage()"
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
    <div class="grid-wrapper--right">
      <div class="performance-header">
        <h3>Performance des Gebäudes</h3>
        <!-- @TODO: create dropdown component -->
        <div class="dropdown">Letzte 14 Tage</div>
      </div>
      <div class="performance-grid">
        <ChartContainer
          v-for="(kpi, idx) in kpis"
          :key="idx"
          :kpi="kpi"
          :lastUpdateTimestamp="lastBuildingRequestTimestamp"
          :isLoading="kpiIsLoading"
        />
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
import { SemanticSubmoduleTypes } from '@/types/enums/SemanticSubmoduleTypes';

// component imports
import ChartContainer from '@/components/monitoring/ChartContainer.vue';
import AutomationKlima from '@/assets/AutomationKlima.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import { SubsectionConditionTypes } from '@/types/enums/SubsectionConditionTypes';
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
    };
  },

  computed: {
    ...mapStores(useGeneralStore),

    building() {
      return this.generalStore.buildingState.building;
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

    getSubsectionChipStatusByCondition(condition: string): ChipStatusTypes {
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
    openSubsectionDemoPage() {
      this.$router.push({
        name: 'Monitoring_Site_Building_Subsection_Demo',
      });
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
  margin-top: $s;

  & > h3 {
    @include content-subtitle;
    color: $darkest;
  }

  &--loading {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    @for $i from 1 through 3 {
      & > div:nth-child(#{$i}) {
        // from 99% to 66% to 33% opacity
        opacity: 1 - (($i - 1) * 0.33);
      }
    }
  }
}

.issues-container {
  margin-top: $s;
  background-color: $light-purple-40;
  padding: $xxs;
  border-radius: $border-radius;

  & > h3 {
    @include content-subtitle;
    color: $darkest;
    margin-bottom: $xs;
  }

  .no-issues {
    & > p {
      @include meta-information;
      text-align: center;
    }
  }

  .issues {
    & > p {
      @include content;
      color: $darkest;
      margin-bottom: $xxs;
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
    padding: $base-size;
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
  @include title;
  color: $dark-green;
  margin-bottom: $s;
}

h4 {
  @include content-subtitle;
  margin-bottom: $xxs;
}

img {
  width: 100%;
  border-radius: $border-radius;
}
</style>
