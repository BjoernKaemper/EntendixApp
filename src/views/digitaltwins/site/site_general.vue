<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <SiteInformation :site="this.site" />
        </v-col>
        <v-col cols="8">
          <HomeCardSite :buildings="this.buildings" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SiteInformation from '@/components/digitalTwin/SiteInformation.vue';
import HomeCardSite from '@/components/general/HomeCardSite.vue';
import { useGeneralStore } from '@/store/general';

export default {
  data() {
    return {
      buildings: [],
      site: [],
    };
  },
  components: {
    SiteInformation,
    HomeCardSite,
  },
  computed: {
    generalStore() {
      return useGeneralStore();
    },
  },
  created() {
    const site_id = this.$route.params.siteid;
    for (const site in this.generalStore.loadedSiteInformationWithBuildings) {
      if (site_id === this.generalStore.loadedSiteInformationWithBuildings[site].siteName) {
        this.buildings = this.generalStore.loadedSiteInformationWithBuildings[site].buildings;
      }
    }

    for (const site in this.generalStore.loadedSiteInformation) {
      console.log(this.generalStore.loadedSiteInformation[site]);
      if (site_id === this.generalStore.loadedSiteInformation[site].siteName) {
        this.site = this.generalStore.loadedSiteInformation[site];
      }
    }
  },
};
</script>
