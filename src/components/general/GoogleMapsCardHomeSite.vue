<template>
  <div>
    <v-card
          style="border-radius: 20px; background-color: whitesmoke"
          class="pa-2" variant="outlined">
      <div class="google-map-card">
        <div id="map"></div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
import { useGeneralStore } from "@/store/general"

export default {
  data () {
      return {
        //siteId: '',
        buildingCoordinates: []
      }
  },
  props: {
    buildings: Array
  },
  
  async mounted () {
    console.log(this.buildings)
    await this.initMap();
  },
    
  computed: {
      generalStore () {
        return useGeneralStore()
      }
  },
  methods: {
      async initMap() {
          /* eslint-disable no-undef */
          const buildingsCoordinates = [];

          for (let i in this.buildings) {
            let building = this.buildings[i]
            const lat = parseFloat(Object.values(building)[0].lat);
            const lng = parseFloat(Object.values(building)[0].lng);
            buildingsCoordinates.push({
              lat,
              lng
            });
          }

          // Load Google Maps API
          const loader = new Loader({
            apiKey: 'AIzaSyDrSZaSw1y8mnFuNa_ZYHTd-0kFxd4eCnQ',
            version: 'weekly',
            libraries: ['places']
          });

          try {
            await loader.load();

            // Create a new map centered at the first site
            const map = new google.maps.Map(document.getElementById("map"), {
              zoom: 10,
              center: buildingsCoordinates[0]
            });

            // Add markers for all sites
            buildingsCoordinates.forEach((coordinates) => {
              new google.maps.Marker({
                position: coordinates,
                map: map
              });
            });

            return map;
          } catch (error) {
            console.error('Error loading Google Maps API:', error);
          }
      }
    }
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
  height:100%;
}
</style>
