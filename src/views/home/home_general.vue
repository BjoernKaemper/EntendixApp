<template>
    <div>
      <v-container>
          <v-row>
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

export default{
    components: {
        GoogleMapsCardHome, HomeCard
    }
}
</script>

