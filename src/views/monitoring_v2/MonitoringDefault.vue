<template>
  <div class="grid-wrapper">
    <GoogleMaps/>
    <div>
      <div class="site-header">
        <h2>Meine Liegenschaften</h2>
        <p class="subtitle">Ist alles im grünen Bereich? Werden die Betriebsfunktionen erfüllt?</p>
      </div>
      <!-- TODO: its not possible to get the location -->
      <LiegenschaftCard
        v-for="site in sites"
        :key="site.id"
        :location="site.data.SiteName"
        :name="site.data.Address.CityTown"
        :action="goToSite"
      >
      </LiegenschaftCard>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { useGeneralStore_v2 } from '@/store/general_v2'

import GoogleMaps from '@/components/general/GoogleMaps.vue'
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue'
import type Site from '@/types/Site';

export default {
  components: {
    GoogleMaps,
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
     * @param {string} site The site to navigate to
     */
    goToSite(site: string): void {
      this.$router.push({ name: 'Monitoring_Site', params: { siteid: site } })
    }
  }
}
</script>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
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
