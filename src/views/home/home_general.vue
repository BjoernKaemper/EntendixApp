<template>
  <div>
    <v-container>
      <div v-if="generalStore.homeLoading === true">
        <v-progress-linear indeterminate color="success"></v-progress-linear>
      </div>
      <v-row v-else>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <HomeCard />
        </v-col>
        <v-col cols="2"></v-col>
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
import HomeCard from '@/components/general/HomeCard.vue'
import { useGeneralStorev2 } from '@/store/general_v2'

export default {
  name: 'HomeGeneral',

  components: {
    HomeCard
  },

  computed: {
    generalStore() {
      return useGeneralStorev2()
    }
  }
}
</script>
