<template>
    <div>
      <v-container>
        <div v-if="generalStore.homeLoading === true">
          <v-progress-linear
            indeterminate
            color="success"
          ></v-progress-linear>
        </div>
        <v-row v-else>
            <v-col cols="4">
              <GoogleMapsCardHome />
            </v-col>
            <v-col cols="8">
              <HomeCard />
            </v-col>
          </v-row>
        </v-container>
    </div> 
</template>

<script>
import GoogleMapsCardHome from "@/components/general/GoogleMapsCardHome.vue"
import HomeCard from "@/components/general/HomeCard.vue"
import { useGeneralStore } from "@/store/general"

export default{
    components: {
        GoogleMapsCardHome, HomeCard
    },
    computed: {
        generalStore () {
          return useGeneralStore()
        }
    },
}
</script>

