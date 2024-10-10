<template>
  <div class="grid-wrapper">
    <GoogleMaps :sites="sites" />
    <div>
      <div class="site-header">
        <h2>Meine Liegenschaften</h2>
      </div>
      <template v-if="sitesAreLoading">
        <div class="loading">
          <LiegenschaftCard
            v-for="(site, index) in (sites && sites.length > 0 ? sites : 3)"
            :key="index"
            :isLoading="true"
          />
        </div>
      </template>
      <template v-else>
        <LiegenschaftCard
          v-for="site in sites"
          :key="site.id"
          :name="site.data.siteName"
          imgsrc="/src/assets/placeholder-campus-deutz.png"
          :status="ChipStatusTypes.SUCCESS"
          :location="site.data.address.cityTown"
          @digitalTwinClicked="loadTwin(site)"
          @monitoringClicked="loadSite(site)"
          :isLoading="sitesAreLoading"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia';
import { useGeneralStore } from '@/store/general';

import GoogleMaps from '@/components/general/GoogleMaps.vue';
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue';
import type { Site } from '@/types/global/site/Site';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
// import { load } from 'webfontloader';

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
     * Navigates to the digital twin page
     * @param {Site} site Object of the site to navigate to
     */
    loadTwin(site: Site): void {
      this.$router.push({
        name: 'DigitalTwins_Site',
        params: {
          siteparams: JSON.stringify({
            siteid: encodeURIComponent(site.id),
            siteName: site.data.siteName,
          }),
        },
      });
    },
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
            siteName: site.data.siteName,
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

.loading {
  @for $i from 1 through 3 {
    & > div:nth-child(#{$i}) {
      // from 99% to 66% to 33% opacity
      opacity: 1 - (($i - 1) * 0.33);
    }
  }
}

  .site-header {
  margin-bottom: $xl;
  > h2 {
    @include content-headline;
    color: $dark-green;
  }
  > .subtitle {
    @include content-subtitle;
  }
}
</style>
