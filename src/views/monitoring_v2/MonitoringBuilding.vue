<template>
  <div class="grid-wrapper">
    <div>
      <h2>TODO: Gebäudename</h2>
      <img src="@/assets/gebäude_deutz.png" />
    </div>
    <div>
      <h3>Performance der Liegenschaft</h3>
      <div class="three-col-grid">
        <div>
          <h4>Raumkomfort</h4>
        </div>
        <div>
          <h4>Effizienz</h4>
        </div>
      </div>
      <h4>Funktionserfüllung Anlagentechnik</h4>
      <div class="three-col-grid" />
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from '@/store/general';
import { useMonitoringStore } from '@/store/monitoring';
import { mapStores } from 'pinia';

export default {
  computed: {
    ...mapStores(useGeneralStore, useMonitoringStore),
  },
};
</script>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: $m;
}

.three-col-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: $m;
}

h2,
h3 {
  @include title;
  color: $dark-green;
  margin-bottom: $xl;
}

h4 {
  @include content-subtitle;
  margin-bottom: $xxs;
}
</style>
