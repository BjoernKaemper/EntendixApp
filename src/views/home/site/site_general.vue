<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <GoogleMapsCardHomeSite :buildings="this.buildings" />
        </v-col>
        <v-col cols="8">
          <HomeCardSite :buildings="this.buildings" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import GoogleMapsCardHomeSite from '@/components/general/GoogleMapsCardHomeSite.vue';
import HomeCardSite from '@/components/general/HomeCardSite.vue';
import { useGeneralStore } from '@/store/general';

export default {
  data() {
    return {
      buildings: [],
    };
  },
  components: {
    GoogleMapsCardHomeSite,
    HomeCardSite,
  },
  computed: {
    generalStore() {
      return useGeneralStore();
    },
  },
  created() {
    const siteId = this.$route.params.siteid;
    const site = Object.values(
      this.generalStore.loadedSiteInformationWithBuildings,
    ).find((siteData) => siteId === siteData.siteName);
    if (site) {
      this.buildings = site.buildings;
    }
  },
};
</script>
