<template>
  <div>
    <div v-for="site in generalStore.loadedSiteInformation" :key="site">
      <ShowSiteInformation :site="site" />
    </div>
    <v-divider :thickness="3" />
    <v-container :style="{ width: '90%' }">
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn
          rounded="xl"
          variant="text"
          color="rgba(255, 74, 28, 1.0)"
          text
          @click="show = !show"
        >
          Hinzufügen Liegenschaft
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-text-field v-model="siteName" label="Name der Liegenschaft" required />
          <v-text-field
            id="map"
            v-model="currentPlace"
            label="Standort der Liegenschaft"
            required
          />
          <vue-google-autocomplete
            class="autocomplete-container"
            id="map"
            v-model="place"
            v-on:placechanged="setPlace"
          />
          <v-container class="d-flex justify-center align-center">
            <v-btn
              class="max-3"
              type="reset"
              rounded="xl"
              variant="text"
              color="rgba(255, 74, 28, 1.0)"
              @click="setPlaceInformationToStore()"
            >Submit
            </v-btn>
          </v-container>
        </div>
      </v-expand-transition>
    </v-container>
  </div>
</template>

<script>
import ShowSiteInformation from '@/components/general/ShowSiteInformation.vue';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
// import { GMapAutocomplete } from 'vue3-google-maps'

import { useGeneralStore } from '@/store/general';

export default {
  data() {
    return {
      show: false,
      siteName: '',
      currentPlace: '',
      country: '',
      city: '',
      street: '',
      streetNumber: '',
      lat: '',
      lng: '',
      zipCode: '',
    };
  },
  components: { ShowSiteInformation, VueGoogleAutocomplete },
  computed: {
    generalStore() {
      return useGeneralStore();
    },
  },
  methods: {
    setPlace(place) {
      this.currentPlace = `${place.route}, ${place.locality}, ${place.country}`;
      // console.log(place)
      // this.currentPlace = place
      // const location = place
      for (const key in place) {
        // console.log(key, place[key])
        if (key === 'country') {
          this.country = place[key];
        } else if (key === 'locality') {
          this.city = place[key];
        } else if (key === 'street_number') {
          this.streetNumber = place[key];
        } else if (key === 'route') {
          this.street = `${place[key]} ${this.streetNumber}`;
        } else if (key === 'latitude') {
          this.lat = place[key];
        } else if (key === 'longitude') {
          this.lng = place[key];
        } else if (key === 'postal_code') {
          this.zipCode = place[key];
        }
      }
    },

    setPlaceInformationToStore() {
      this.currentPlace = '';
      generalStore.addSiteInformation(
        this.country,
        this.city,
        this.street,
        this.streetNumber,
        this.lat,
        this.lng,
        this.zipCode,
        this.siteName,
      );
      this.siteName = '';
    },
  },
};
</script>
<style scoped>
.card {
  margin-inline: 20%;
  margin-bottom: 30px;
  margin-top: 20px;
}
.form-group {
  text-align: left;
  margin-bottom: 20px;
  margin-right: 10%;
  margin-left: 10%;
}
.btn {
  margin-left: 20px;
  margin-right: 20px;
}
#header {
  color: #0a322b;
  font-size: 1em;
}
#body {
  font-size: 18px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.autocomplete-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 300px; /* Set the desired width */
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.autocomplete-container {
  width: 0%;
  height: 0%;
  border-style: none;
}
#addSiteTitle {
  color: #3b5249;
  font-weight: 300;
  margin-top: 8px;
  margin-bottom: 12px;
}
</style>
