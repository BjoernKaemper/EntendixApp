<template>
  <div>
    <div class="google-map-card">
      <div ref="map" id="map" data-js-google-maps />
    </div>
  </div>
</template>

<script lang="ts">
import mapStyles from '@/styles/mapStyles';
import { type PropType } from 'vue';

import { Loader } from '@googlemaps/js-api-loader';
import type { Site } from '@/types/Site';

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
      type: Array as PropType<Site[]>,
      required: true,
    },
  },
  data() {
    return {
      /*
       * The Google Maps instance
       * @type {google.maps.Map | null}
       */
      map: null as google.maps.Map | null,
    };
  },
  computed: {
    // extract long and lat from site object which is passed as prop
    siteCoordinates(): Array<{ lat: number; lng: number }> {
      return this.sites.map((site) => ({
        lat: parseFloat(site.data.Address.Lattitude),
        lng: parseFloat(site.data.Address.Longitude),
      }));
    },
  },
  watch: {
    siteCoordinates: {
      handler() {
        this.loadMapCoordinates();
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * Load the map coordinates and add markers for each site
     */
    async loadMapCoordinates(): Promise<void> {
      if (!this.map || !this.siteCoordinates.length) {
        return;
      }

      try {
        // Add markers for all sites
        this.siteCoordinates.forEach((coordinates) => {
          // TODO: Add color to the markers depending on the state of the site
          // TODO: Add links to the markers
          // We have to use the google object from the window because the google object is not
          // available so a new instance of google object is created and the linter ignored for this
          // eslint-disable-next-line no-new
          new google.maps.Marker({
            position: coordinates,
            map: this.map,
          });

          this.map?.setCenter(coordinates);
        });
      } catch (error) {
        // @TODO: Implement global error handler
        // eslint-disable-next-line no-console
        console.error('Error loading Google Maps API:', error);
      }
    },

    /**
     * Initialize the map element
     */
    async initMapElement(googleInstance: typeof google): Promise<void> {
      this.map = new googleInstance.maps.Map(this.$refs.map as HTMLElement, {
        zoom: 10,
        center: { lat: 0, lng: 0 },
        styles: mapStyles,
      });
      this.loadMapCoordinates();
    },
  },

  async mounted() {
    const google = await new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    }).load();

    this.initMapElement(google);
  },
};

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
