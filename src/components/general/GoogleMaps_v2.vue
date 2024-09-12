<template>
  <div>
    <div class="google-map-card">
      <div ref="map" id="map" data-js-google-maps></div>
    </div>
  </div>
</template>

<script lang="ts">
import mapStyles from '@/styles/mapStyles';
import { type PropType } from 'vue'

import { Loader } from '@googlemaps/js-api-loader'


export default {
  /**
   * GoogleMapsCardHome component
   * @module components/general/GoogleMapsCardHome
   * @summary A card component that displays a Google Map with markers for sites
   * @displayName GoogleMapsCardHome
   */
  name: 'GoogleMapsCardHome',
  props: {
    /**
     * The coordinates of the sites to display on the map.
     * @default []
     * @required
     * @type {Array<{ lat: string; lng: string }>}
     */
    sites: {
      type: Array as PropType<Object[]>,
      required: true
    }
  },
  data() {
    return {
      /**
       * The Google Maps instance
       * @type {google.maps.Map}
       */
      map: null,
    }
  },
  computed: {
    // extract long and lat from site object which is passed as prop
    siteCoordinates(): Array<{ lat: number; lng: number }> {
      return this.sites.map(site => ({
        lat: parseFloat(site.data.Address.Lattitude),
        lng: parseFloat(site.data.Address.Longitude),
      }))
    },
  },
  watch: {
    siteCoordinates: {
      handler() {
        this.loadMap()
      },
      immediate: true
    }
  },
  methods: {
    async loadMap() {
      try {
        // Create a new map centered at the first site
        this.map = new google.maps.Map(this.$refs.map as HTMLElement, {
          zoom: 10,
          center: this.siteCoordinates[0],
          styles: mapStyles,
        })
        console.log(this.siteCoordinates)
        // Add markers for all sites
        this.siteCoordinates.forEach((coordinates) => {
          // TODO: Add color to the markers depending on the state of the site
          // TODO: Add links to the markers
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
  },

  async created() {
    await new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    }).load();
  },
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
