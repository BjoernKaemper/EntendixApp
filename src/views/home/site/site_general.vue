<template>
    <div>
      <v-container>
          <v-row>
            <v-col cols="4">
                <GoogleMapsCardHomeSite />
            </v-col>
            <v-col cols="8">
              <HomeCardSite />
            </v-col>
          </v-row>
        </v-container>
    </div> 
</template>

<script>
import GoogleMapsCardHomeSite from "@/components/general/GoogleMapsCardHomeSite.vue"
import HomeCardSite from "@/components/general/HomeCardSite.vue"

export default{
    components: {
        GoogleMapsCardHomeSite, HomeCardSite
    },
    created() {
        
        const site_id = this.$route.params.siteid
        console.log(site_id)
    }
}
</script>
