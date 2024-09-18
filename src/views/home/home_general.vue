<template>
  <div>
    <v-container>
      <div v-if="generalStore.homeLoading === true || general_v2Store.globalLoadingOverlay === true ">
        <v-progress-linear indeterminate color="success" />
      </div>
      <v-row v-else>
        <v-col cols="2" />
        <v-col cols="8">
          <HomeCard />
        </v-col>
        <v-col cols="2" />
      </v-row>
      <!--
        <v-row v-else>
            <v-col cols="4">
              <GoogleMapsCardHome />
            </v-col>
            <v-col cols="8">
              <HomeCard />
            </v-col>
          </v-row>
        -->
    </v-container>
  </div>
</template>

<script>
import HomeCard from '@/components/general/HomeCard.vue';
import { useGeneralStore } from '@/store/general';
import { useGeneralStore_v2 } from '@/store/general_v2';
import { mapStores } from 'pinia';

export default {
  name: 'HomeGeneral',

  components: {
    HomeCard,
  },

  computed: {
    ...mapStores(useGeneralStore, useGeneralStore_v2),
  },
};
</script>
