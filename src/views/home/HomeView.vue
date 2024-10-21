<template>
  <div class="grid-wrapper">
    <GoogleMaps :sites="sites" />
    <div>
      <div class="site-header">
        <h2>Meine Liegenschaften</h2>
      </div>
      <LoadingCards v-if="sitesAreLoading" :card-count="3" :grow-cards="false" />
      <template v-else>
        <LiegenschaftCard
          v-for="site in sites"
          :key="site.id"
          :name="site.data.siteName"
          :imgsrc="placeholderCampusDeutz"
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
import placeholderCampusDeutz from '@/assets/placeholder-campus-deutz.png';

import GoogleMaps from '@/components/general/GoogleMaps.vue';
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue';
import type { Site } from '@/types/global/site/Site';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import LoadingCards from '@/components/general/LoadingCards.vue';
import Base64Helper from '@/helpers/Base64Helper';

export default {
  components: {
    GoogleMaps,
    LiegenschaftCard,
    LoadingCards,
  },

  data() {
    return {
      placeholderCampusDeutz,
    };
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
      console.log('loadTwin', site);
      this.$router.push({
        name: 'DigitalTwins',
        params: {
          siteparams: JSON.stringify({
            siteid: Base64Helper.encode(site.id),
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
      console.log('loadSite', site);
      this.$router.push({
        name: 'Monitoring_Site',
        params: {
          siteparams: JSON.stringify({
            siteid: Base64Helper.encode(site.id),
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
