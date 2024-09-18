<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="5">
          <GoogleMapsCardHome />
        </v-col>
        <v-col cols="7">
          <v-card
            style="border-radius: 20px; background-color: whitesmoke"
            variant="outlined"
            class="anlagen-card mb-12 mx-10"
          >
            <v-card-title align="center">Meine Liegenschaften - Monitoring</v-card-title>
            <v-divider
              class="border-opacity-75 mx-4 mb-2"
              :thickness="2"
              color="success"
            ></v-divider>
            <v-card-text>
              <v-row
                align="center"
                v-for="(site) in this.generalStore.loadedSiteInformationWithBuildings"
                :key="site"
              >
                <v-col cols="4">
                  <!--<v-badge color="info">-->
                  <v-btn
                    class="button-span px-2"
                    rounded="xl"
                    style="background-color: whitesmoke; min-width: 180px"
                    variant="text"
                    color="highlight"
                    @click="
                      $router.push({ name: 'Monitoring_Site', params: { siteid: site.siteName } })
                    "
                  >
                    <span class="mr-2">{{ site.siteName }}</span>
                  </v-btn>
                  <!--</v-badge>-->
                </v-col>
                <!--
                            <v-col cols="4">
                                <v-chip color="monitoring">
                                    Test
                                </v-chip>
                            </v-col>
                        -->
                <v-col cols="8"></v-col>
              </v-row>
              <!--
                        <v-row align="center" >
                            <v-col cols="3" class="text-center">
                                <v-btn 
                                    variant="outlined" 
                                    color="#455A64"
                                    icon="mdi-map-plus" class="mx-auto"
                                    @click="$router.push({name:'Register'})">
                                </v-btn>
                            </v-col>
                            <v-col cols="2">
                                <v-row>
                                    <v-col cols="1" class="ma-0 pa-0"></v-col>
                                    <v-col cols="10" class="ma-0 pa-0 text-center">
                                        Neue Liegenschaft
                                    </v-col>
                                    <v-col cols="1" class="ma-0 pa-0"></v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="7"></v-col>
                        </v-row>
                    -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!--
        <v-container>
            <v-row>
                <v-col cols="6" v-for="site in generalStore.loadedSiteInformationWithBuildings" :key="Object.keys(site)[0]">
                    <MonitoringOverview :site="site"/>
                </v-col>
            </v-row>
        </v-container>
    -->
    <!--
        <AmCharts />
        <PieChart />
        -->
  </div>
</template>

<script>
import { useGeneralStore } from '@/store/general'

//import AmCharts from "@/components/general/AmCharts.vue"
//import PieChart from "@/components/general/charts/PieChart.vue"

import GoogleMapsCardHome from '@/components/general/GoogleMapsCardHome.vue'

export default {
  components: {
    GoogleMapsCardHome,
    //AmCharts, PieChart
  },
  computed: {
    generalStore() {
      return useGeneralStore()
    }
  },
  created() {
    const site_id = this.$route.params.siteid
    for (const site in this.generalStore.loadedSiteInformationWithBuildings) {
      if (site_id === this.generalStore.loadedSiteInformationWithBuildings[site]['siteName']) {
        console.log(this.generalStore.loadedSiteInformationWithBuildings[site])
        this.buildings = this.generalStore.loadedSiteInformationWithBuildings[site].buildings
      }
    }
  }
}
</script>
