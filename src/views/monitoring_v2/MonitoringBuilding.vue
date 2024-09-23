<template>
  <div class="grid-wrapper">
    <div class="grid-wrapper--left">
      <h2>{{ buildingName }}</h2>
      <AutomationKlima />
      <div class="status-container">
        <h3>Funktionserfüllung Anlagentechnik</h3>
        <!-- @TODO: Get the rest of the data in the response an map it -->
        <!-- @TODO remove placeholders -->
        <StatusCard
          v-for="(subsection, idx) in building?.data.Subsections"
          :key="idx"
          :title="subsection.type"
          :isBordered="false"
          :status="StatusTypes.SUCCESS"
          :kpiType="getSubsectionTypeIcon(subsection.type as SemanticSubmoduleTypes)"
          :actionType="ActionTypes.ARROW"
        />
      </div>
      <div class="issues-container">
        <h3>@TODO: Probleme in den Komponenten</h3>
        <div v-if="issues" class="issues">
          <!-- @TODO: remove placeholders after data is in place -->
          <p>Wäremversorgung</p>
          <StatusCard
            title="Wärmeerzeuger 1"
            subtitle="Ursache: Unter Sollwert"
            :isBordered="false"
            :status="StatusTypes.ERROR_COMPONENT"
            :actionType="ActionTypes.ARROW"
          />
          <StatusCard
            title="Heizkreis 1"
            subtitle="Ursache: Über Sollwert"
            :isBordered="false"
            :status="StatusTypes.ERROR_COMPONENT"
            :actionType="ActionTypes.ARROW"
          />
          <p>Stromversorgung</p>
          <StatusCard
            title="Stromkreislauf 1"
            subtitle="Ursache: Über Sollwert"
            :isBordered="false"
            :status="StatusTypes.WARNING_COMPONENT"
            :actionType="ActionTypes.ARROW"
          />
          <StatusCard
            v-for="(kpi, idx) in kpis"
            :key="idx"
            :title="kpi.data.Name.de"
            :isBordered="false"
            :status="StatusTypes.ERROR_COMPONENT"
            :actionType="ActionTypes.ARROW"
            :timestamp="kpi.data.Annotations[0]?.TimestampOfCreation"
          />
        </div>
        <div v-else class="no-issues">
          <p>Aktuell sind alle Komponenten im Zielbereich.</p>
          <p>Es gibt keine kritischen Abweichungen oder Warnungen.</p>
        </div>
      </div>
    </div>
    <div>
      <div class="performance-header">
        <h3>Performance des Gebäudes</h3>
        <!-- @TODO create dropdown component -->
        <div class="dropdown">
          Letzte 14 Tage
        </div>
      </div>
      <div class="performance-grid">
        <LineChart_v2
          v-for="(kpi, idx) in kpis"
          :key="idx"
          :kpi="kpi"
          :lastUpdateTimestamp="lastBuildingRequestTimestamp"
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
import { useGeneralStoreV2 } from '@/store/general_v2';
import { useMonitoringStore } from '@/store/monitoring';

// Type Imports
import { StatusTypes } from '@/types/enums/StatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { SubsectionTypes } from '@/types/enums/SubsectionTypes';
import { SemanticSubmoduleTypes } from '@/types/enums/SemanticSubmoduleTypes';

// component imports
import LineChart_v2 from '@/components/monitoring/LineChart_v2.vue';
import AutomationKlima from '@/assets/AutomationKlima.vue';
import StatusCard from '@/components/general/StatusCard.vue';

export default {
  components: {
    LineChart_v2,
    AutomationKlima,
    StatusCard,
  },

  data() {
    return {
      issues: true,
      buildingName: '',
    };
  },

  setup() {
    return {
      StatusTypes,
      ActionTypes,
    };
  },

  computed: {
    ...mapStores(useGeneralStore, useMonitoringStore, useGeneralStoreV2),

    building() {
      return this.general_v2Store.currentBuilding;
    },

    kpis() {
      return this.general_v2Store.currentKPIs;
    },

    lastBuildingRequestTimestamp(): DateTime | null {
      return this.general_v2Store.lastBuildingRequestTimestamp;
    },
  },

  methods: {
    getSubsectionTypeIcon(type: SemanticSubmoduleTypes): SubsectionTypes {
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
  },

  async created() {
    await this.general_v2Store.loadBuildingInformation(
      JSON.parse(this.$route.params.buildingparams as string).buildingid,
    );
    this.buildingName = JSON.parse(this.$route.params.buildingparams as string).buildingName;
    this.general_v2Store.loadKpiInformation(
      JSON.parse(this.$route.params.buildingparams as string).buildingid,
    );
  },
};
</script>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: $m;

  &--left {
    overflow-y: hidden;
  }
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
}

.issues-container {
  margin-top: $s;
  background-color: $light-purple-40;
  padding: $xxs;
  border-radius: $base-size;

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
    border-radius: $base-size;
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
  border-radius: $base-size;
}
</style>
