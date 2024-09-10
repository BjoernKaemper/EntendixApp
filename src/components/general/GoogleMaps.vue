<template>
  <div>
    <div class="google-map-card">
      <div id="map"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { useGeneralStore } from '@/store/general'

import { mapStores } from 'pinia'

export default {
  async mounted() {
    if (
      this.generalStore.loadedSiteInformation &&
      Object.keys(this.generalStore.loadedSiteInformation).length > 0
    ) {
      await this.initMap()
    }
  },
  watch: {
    'generalStore.loadedSiteInformation': {
      handler: 'initMap',
      deep: true,
      immediate: true // Call the handler immediately on component creation
    }
  },

  computed: {
    ...mapStores(useGeneralStore),
    siteCoordinates(): Array<{ lat: number; lng: number }> {
      return this.generalStore.loadedSiteInformation.map((site) => {
        return {
          lat: parseFloat(site.lat),
          lng: parseFloat(site.lng)
        }
      })
    }
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
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: this.siteCoordinates[0]
        })

        // Add markers for all sites
        this.siteCoordinates.forEach((coordinates) => {
          new google.maps.Marker({
            position: coordinates,
            map: map
          })
        })

        return map
      } catch (error) {
        console.error('Error loading Google Maps API:', error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.google-map-card {
  height: 60vh;
  > #map {
    width: 100%;
    height: 100%;
  }
}
</style>
