<template>
    <div>
        <v-card 
            style="border-radius: 20px; background-color: whitesmoke"
            variant="outlined" class="anlagen-card">
            <v-card-title>Meine Gebäude</v-card-title>
            <v-card-text>
                <v-row align="center" v-for="site,i  in this.generalStore.loadedSiteInformationWithBuildings" :key="site">
                    <v-col cols="3">
                        <v-img class="mx-auto" href="#" contain :src="images[[Object.keys(images)[i]]]"></v-img>
                    </v-col>
                    <v-col cols="2">
                        <v-row>
                            <v-col cols="2" class="ma-0 pa-0"></v-col>
                            <v-col cols="8" class="ma-0 pa-0">
                                <div class="text-center">{{ site.siteName }}</div>
                            </v-col>
                            <v-col cols="2" class="ma-0 pa-0"></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="ma-0 pa-0"></v-col>
                            <v-col cols="8" class="ma-0 pa-0 text-center">
                                <v-btn variant="flat" color="rgba(255, 74, 28, 0.7)" size="x-small"
                                    icon="mdi-home" class="ma-2"
                                    @click="$router.push({name:'Home_Site', params:{siteid:site.siteName}})">
                                </v-btn>
                            </v-col>
                            <v-col class="ma-0 pa-0" cols="2"></v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="3.5">
                        <v-badge color="info">
                            <v-btn
                                class="button-span px-2"
                                rounded="xl"
                                style="background-color: whitesmoke;"
                                variant="outlined" 
                                color="highlight"
                                size="small"
                                
                                @click="$router.push({name:'DigitalTwins_Site', 
                                params:{siteid: site.siteName}})">
                                <v-span v-html="zwillingText"></v-span>
                            </v-btn> 
                        </v-badge>                       
                    </v-col>
                    <v-col cols="3.5">
                        <v-badge color="info">
                            <v-btn
                                class="button-span px-8"
                                rounded="xl"
                                style="background-color: whitesmoke;"
                                variant="outlined" 
                                color="highlight"
                                size="small"
                                @click="$router.push({name:'Monitoring_Site', 
                                params:{siteid: site.siteName}})">
                                <v-span v-html="monitoringText"></v-span>
                            </v-btn>
                        </v-badge>
                    </v-col>
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
        images: {'deutz': Object.values(import.meta.glob('@/assets/gebäude_deutz.png', {as:'url', eager:true}))[0],
                    'südstadt': Object.values(import.meta.glob('@/assets/gebäude_südstadt.jpg', {as:'url', eager:true}))[0]}, 
      }
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

