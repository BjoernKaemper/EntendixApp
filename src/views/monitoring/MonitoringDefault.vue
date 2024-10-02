<template>
  <div class="grid-wrapper">
    <GoogleMaps :sites="sites" />
    <div>
      <div class="site-header">
        <h2>Meine Liegenschaften</h2>
        <p class="subtitle">Ist alles im grünen Bereich? Werden die Betriebsfunktionen erfüllt?</p>
      </div>
      <LiegenschaftCard
        v-for="site in sites"
        :key="site.id"
        :name="site.data.SiteName"
        imgsrc="/src/assets/placeholder-campus-deutz.png"
        :status="ChipStatusTypes.SUCCESS"
        :location="site.data.Address.CityTown"
        @clicked="loadSite(site)"
        :isLoading="sitesAreLoading"
      />

      <p>Demo Cards below</p>

      <LiegenschaftCard
        name="TH Köln, Camppus Deutz"
        location="Köln"
        :status="ChipStatusTypes.ERROR"
        :isLoading="sitesAreLoading"
        imgsrc="/src/assets/placeholder-campus-deutz.png"
      />
      <LiegenschaftCard
        name="TH Köln, Camppus Gummersbach"
        location="Gummersbach"
        :status="ChipStatusTypes.SUCCESS"
        :isLoading="sitesAreLoading"
        imgsrc="/src/assets/placeholder-campus-gummersbach.png"
      />
      <LiegenschaftCard
        name="TH Köln, Camppus Ubierring"
        location="Köln"
        :status="ChipStatusTypes.SUCCESS"
        :isLoading="sitesAreLoading"
        imgsrc="/src/assets/placeholder-campus-ubierring.png"
      />
      <LiegenschaftCard
        name="Kurt-Tucholsky-Schule"
        location="Hamburg"
        :status="ChipStatusTypes.WARNING"
        :isLoading="sitesAreLoading"
        imgsrc="/src/assets/placeholder-campus-hamburg.png"
      />
      <LiegenschaftCard
        name="Heinrich Schütz Schule"
        location="Kassel"
        :isLoading="sitesAreLoading"
        imgsrc="/src/assets/placeholder-campus-hamburg.png"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia';
import { useGeneralStore } from '@/store/general';

import GoogleMaps from '@/components/general/GoogleMaps.vue';
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue';
import type { Site } from '@/types/site/Site';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';

export default {
  components: {
    GoogleMaps,
    LiegenschaftCard,
  },

  computed: {
    ...mapStores(useGeneralStore),

    sites(): Array<Site> {
      return this.generalStore.baseInfoState.sites;
    },

    sitesAreLoading(): boolean {
      return this.generalStore.baseInfoState.isLoading;
    },
  },

  methods: {
    /**
     * Navigates to the site page
     * @param {Site} site Object of the site to navigate to
     */
    loadSite(site: Site): void {
      this.$router.push({
        name: 'Monitoring_Site',
        params: {
          siteparams: JSON.stringify({
            siteid: encodeURIComponent(site.id),
            siteName: site.data.SiteName,
          }),
        },
      });
    },
  },

  setup() {
    return {
      ChipStatusTypes,
    };
  },
};
</script>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $m;
}

.site-header {
  margin-bottom: $xl;
  > h2 {
    @include title;
    color: $dark-green;
  }
  > .subtitle {
    @include content-subtitle;
  }
}
</style>
