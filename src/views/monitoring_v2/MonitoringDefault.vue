<template>
  <div class="grid-wrapper">
    <GoogleMaps_v2 :sites="sites"/>
    <div>
      <div class="site-header">
        <h2>Meine Liegenschaften</h2>
        <p class="subtitle">Ist alles im grünen Bereich? Werden die Betriebsfunktionen erfüllt?</p>
      </div>
      <!-- TODO: its not possible to get the location -->
      <LiegenschaftCard
        v-for="site in sites"
        :key="site.id"
        :name="site.data.SiteName"
        :location="site.data.Address.CityTown"
        @clicked="loadSite(site)"
      >
      </LiegenschaftCard>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { useGeneralStore_v2 } from '@/store/general_v2'

import GoogleMaps_v2 from '@/components/general/GoogleMaps_v2.vue'
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue'
import type Site from '@/types/Site';

export default {
  components: {
    GoogleMaps_v2,
    LiegenschaftCard
  },
  computed: {
    ...mapStores(useGeneralStore_v2),
    sites(): Array<Site> {
      return this.general_v2Store.sites
    },
  },
  methods: {
    /**
     * Navigates to the site page
     * @param {Site} site Object of the site to navigate to
     */
    loadSite(site: Site): void {
      console.log('site', site)
      this.$router.push({ name: 'Monitoring_Site', params: { siteid: encodeURIComponent(site.id) } })
    }
  }
}
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
