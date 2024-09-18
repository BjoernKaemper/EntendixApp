<template>
  <div>
    <v-card
      style="border-radius: 20px; background-color: whitesmoke"
      class="pa-2 mb-12"
      variant="outlined"
    >
      <div class="google-map-card">
        <div id="map" />
      </div>
    </v-card>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
import { useGeneralStore } from '@/store/general';

export default {
  data() {
    return {
      // siteId: '',
      siteCoordinates: [],
    };
  },

  async mounted() {
    if (
      this.generalStore.loadedSiteInformation
      && Object.keys(this.generalStore.loadedSiteInformation).length > 0
    ) {
      await this.initMap();
    }
  },
  watch: {
    'generalStore.loadedSiteInformation': {
      handler: 'initMap',
      deep: true,
      immediate: true, // Call the handler immediately on component creation
    },
  },

  /*
  created() {
      this.initMap()
    },
    */

  computed: {
    generalStore() {
      return useGeneralStore();
    },
  },
  methods: {
    async initMap() {
      /* eslint-disable no-undef */
      const siteCoordinates = [];

      // Iterate through each site and add its coordinates to siteCoordinates
      for (const site in this.generalStore.loadedSiteInformation) {
        const lat = parseFloat(this.generalStore.loadedSiteInformation[site].lat);
        const lng = parseFloat(this.generalStore.loadedSiteInformation[site].lng);
        siteCoordinates.push({
          lat,
          lng,
        });
      }

      // Load Google Maps API
      const loader = new Loader({
        apiKey: 'AIzaSyDrSZaSw1y8mnFuNa_ZYHTd-0kFxd4eCnQ',
        version: 'weekly',
        libraries: ['places'],
      });

      try {
        await loader.load();

        // Create a new map centered at the first site
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: siteCoordinates[0],
        });

        // Add markers for all sites
        siteCoordinates.forEach((coordinates) => {
          new google.maps.Marker({
            position: coordinates,
            map,
          });
        });

        return map;
      } catch (error) {
        console.error('Error loading Google Maps API:', error);
      }
    },
  },
};
</script>

<style scoped>
.google-map-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
