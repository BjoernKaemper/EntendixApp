<template>
  <div>
    <div class="google-map-card">
      <div ref="map" id="map"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import mapStyles from '@/styles/mapStyles';
import { type PropType } from 'vue'

export default {
  name: 'GoogleMapsCardHome',
  props: {
    siteCoordinates: {
      type: Array as PropType<{ lat: string; lng: string }[]>,
      required: true
    }
  },
  data() {
    return {
      map: null,
      transformedCoordinates: [] as { lat: number; lng: number }[],
    }
  },
  watch: {
    // Watch for changes to siteCoordinates and transform them
    siteCoordinates: {
      immediate: true,
      handler(newCoords) {
        this.transformedCoordinates = newCoords.map((coord: { lat: string; lng: string }) => ({
          lat: parseFloat(coord.lat),
          lng: parseFloat(coord.lng),
        }));
        // Initialize the map once the coordinates are transformed
        if (this.transformedCoordinates.length > 0) {
          this.initMap();
        }
      },
    },
  },
  mounted() {
    this.initMap()
  },
  methods: {
      async initMap() {
        // Load Google Maps API
        const loader = new Loader({
          apiKey: 'AIzaSyDrSZaSw1y8mnFuNa_ZYHTd-0kFxd4eCnQ',
          version: 'weekly',
          libraries: ['places']
        })
  
        try {
          await loader.load()

          // Create a new map centered at the first site
          this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: this.transformedCoordinates[0],
            styles: mapStyles
          })

          // Add markers for all sites
          this.transformedCoordinates.forEach((coordinates) => {
            // TODO: Add color to the markers depending on the state of the site
            new google.maps.Marker({
              position: coordinates,
              map: this.map
            })
          })
  
          return this.map
        } catch (error) {
          console.error('Error loading Google Maps API:', error)
        }
      }
    }
}

</script>

<style scoped lang="scss">
.google-map-card {
  height: 80vh;
  > #map {
    width: 100%;
    height: 100%;
  }
}
</style>
