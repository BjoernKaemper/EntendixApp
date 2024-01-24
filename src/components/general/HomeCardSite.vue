<template>
    <div>
        <v-card 
            style="border-radius: 20px; background-color: whitesmoke"
            variant="outlined" class="anlagen-card mb-12">
            <v-card-title>Gebäude - {{ $route.params.siteid }}</v-card-title>
            <v-card-text>
                <v-row align="center" v-for="building,i  in this.buildings" :key="i">
                    <v-col cols="3">
                        <v-img max-height="90" class="mx-auto" href="#" contain src="@/assets/no_image.svg"></v-img>
                    </v-col>
                    <v-col cols="2">
                        <v-row>
                            <v-col cols="2" class="ma-0 pa-0"></v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                                <div class="text-center">{{ Object.values(building)[0].buildingName }}</div>
                            </v-col>
                            <v-col cols="2" class="ma-0 pa-0"></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="ma-0 pa-0"></v-col>
                            <v-col cols="8" class="ma-0 pa-0 text-center">
                                
                            </v-col>
                            <v-col class="ma-0 pa-0" cols="2"></v-col>
                        </v-row>
                    </v-col>
                    <v-col v-if="$route.name === 'Home_Site'" cols="3.5">
                        <v-badge color="info">
                            <v-btn
                                class="button-span px-3"
                                rounded="xl"
                                style="background-color: whitesmoke;"
                                variant="outlined" 
                                color="highlight"
                                size="small"
                                
                                @click="$router.push({name:'DigitalTwins_Site_Building', 
                                params:{siteid: $route.params.siteid, buildingid: Object.values(building)[0].buildingName, buildingaasid: Object.keys(building)[0]}})">
                                <v-span v-html="zwillingText"></v-span>
                            </v-btn> 
                        </v-badge>                       
                    </v-col>
                    <v-col v-if="$route.name === 'Home_Site'" cols="3.5">
                        <v-badge color="info">
                            <v-btn
                                class="button-span px-9"
                                rounded="xl"
                                style="background-color: whitesmoke;"
                                variant="outlined" 
                                color="highlight"
                                size="small"
                                @click="$router.push({name:'Monitoring_Site_Building', 
                                params:{siteid: $route.params.siteid, buildingid: Object.values(building)[0].buildingName, buildingaasid: Object.keys(building)[0]}})">
                                <v-span v-html="monitoringText"></v-span>
                            </v-btn>
                        </v-badge>
                    </v-col>
                    <v-col v-else-if="$route.name === 'DigitalTwins_Site'" cols="7" class="text-center">
                        <v-badge color="info">
                            <v-btn
                                class="button-span px-3"
                                rounded="xl"
                                style="background-color: whitesmoke;"
                                variant="outlined" 
                                color="highlight"
                                size="small"
                                
                                @click="$router.push({name:'DigitalTwins_Site_Building', 
                                params:{siteid: $route.params.siteid, buildingid: Object.values(building)[0].buildingName, buildingaasid: Object.keys(building)[0]}})">
                                <v-span v-html="zwillingText"></v-span>
                            </v-btn> 
                        </v-badge>      
                    </v-col>
                    <v-col v-else-if="$route.name === 'Monitoring_Site'" cols="7" class="text-center">
                        <v-badge color="info">
                            <v-btn
                                class="button-span px-9"
                                rounded="xl"
                                style="background-color: whitesmoke;"
                                variant="outlined" 
                                color="highlight"
                                size="small"
                                
                                @click="$router.push({name:'Monitoring_Site_Building', 
                                params:{siteid: $route.params.siteid, buildingid: Object.values(building)[0].buildingName, buildingaasid: Object.keys(building)[0]}})">
                                <v-span v-html="monitoringText"></v-span>
                            </v-btn> 
                        </v-badge>      
                    </v-col>
                </v-row>
                <v-row v-if="$route.name === 'Home_Site'" align="center">
                    <v-col cols="3" class="text-center">
                        <v-btn 
                            variant="outlined" 
                            color="#455A64"
                            icon="mdi-office-building-plus" class="mx-auto"
                            @click="$router.push({name:'Register'})">
                        </v-btn>
                    </v-col>
                    <v-col cols="2">
                        <v-row>
                            <v-col cols="2" class="ma-0 pa-0"></v-col>
                            <v-col cols="8" class="ma-0 pa-0 text-center">
                                Neues Gebäude
                            </v-col>
                            <v-col cols="2" class="ma-0 pa-0"></v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="7"></v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { useGeneralStore } from "@/store/general"

export default {
    data () {
      return {
        monitoringText: 'Technisches<br>Monitoring',
        zwillingText: 'Verwaltung<br>Digitaler Zwilling',
      }
    },
    props: {
        buildings: Array
    },
    computed: {
        generalStore () {
            return useGeneralStore()
        }
    }
};
</script>

<style scoped>
.button-span {
    padding-top: 2px;
    padding-bottom: 2px;
    height: 100%;
}
</style>

