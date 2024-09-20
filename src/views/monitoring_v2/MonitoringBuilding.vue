<template>
  <div class="grid-wrapper">
    <div>
      <h2>{{ buildingName }}</h2>
      <img :alt="building?.data.BuildingName" src="@/assets/gebäude_deutz.png" />
    </div>
    <div>
      <h3>Performance des Gebäudes</h3>
      <div class="performance-grid">
        <LineChart_v2
          v-for="(kpi, idx) in building?.data.Kpis"
          :key="idx"
          :topic="kpi.data.Name.de"
          :value="kpi.data.Value.PresentValue"
          :unit="kpi.data.Value.PhysicalUnit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from '@/store/general';
import { useGeneralStoreV2 } from '@/store/general_v2';
import { useMonitoringStore } from '@/store/monitoring';
import { mapStores } from 'pinia';

import LineChart_v2 from '@/components/monitoring/LineChart_v2.vue';

export default {
  components: {
    LineChart_v2,
  },
  computed: {
    ...mapStores(useGeneralStore, useMonitoringStore, useGeneralStoreV2),
    building() {
      return this.general_v2Store.currentBuilding;
    },
  },
  data() {
    return {
      buildingName: '',
    };
  },

  created() {
    this.general_v2Store.loadBuildingInformation(
      JSON.parse(this.$route.params.buildingparams as string).buildingid,
    );
    this.buildingName = JSON.parse(this.$route.params.buildingparams as string).buildingName;
  },
};
</script>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: $m;
}

.performance-grid {
  display: flex;
  flex-direction: column;
  gap: $m;
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
