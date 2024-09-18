<template>
  <div>
    <v-container>
      <!--<h2 style="color: #3B5249;">Monitoring - Gebäude {{ $route.params.buildingid  }}</h2> -->
      <div v-if="monitoringStore.loadingAasTree === true">
        <v-progress-linear indeterminate color="success" />
      </div>

      <v-row v-else-if="monitoringStore.loadingAasTree === false">
        <v-col cols="4">
          <v-card style="border-radius: 20px" variant="outlined" class="anlagen-card mb-8">
            <v-img src="@/assets/halle_west.jpeg" cover />
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card
            style="border-radius: 20px; background-color: whitesmoke"
            variant="outlined"
            class="anlagen-card mb-8"
          >
            <v-card-title align="center">Funktionserfüllung Anlagentechnik</v-card-title>
            <v-divider
              class="border-opacity-75 mx-4 mb-2"
              :thickness="2"
              color="success"
            />
            <v-card-text>
              <v-container :style="{ width: '100%' }">
                <v-row
                  align="center"
                  v-for="aasGrundfunktion in monitoringStore.aasTree"
                  :key="aasGrundfunktion"
                >
                  <v-col
                    cols="8"
                    v-if="
                      aasGrundfunktion.aasGrundfunktion.semanticId
                        === 'https://th-koeln.de/gart/BaseFunctionSupplyHeatAAS/1/0'
                    "
                  >
                    <v-btn
                      class="button-span px-2"
                      rounded="xl"
                      style="background-color: whitesmoke; min-width: 180px"
                      variant="text"
                      color="highlight"
                      @click="
                        $router.push({
                          name: 'Monitoring_Site_Building_Grundfunktion',
                          params: {
                            siteid: $route.params.siteid,
                            buildingid: $route.params.buildingid,
                            buildingaasid: $route.params.buildingaasid,
                            grundfunktion: 'Wärme versorgen',
                          },
                        }),
                        (monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene)
                      "
                    >
                      <span class="mr-2">Wärme versorgen</span>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="8"
                    v-else-if="
                      aasGrundfunktion.aasGrundfunktion.semanticId
                        === 'https://th-koeln.de/gart/BaseFunctionSupplyAirAAS/1/0'
                    "
                  >
                    <v-btn
                      class="button-span px-2"
                      rounded="xl"
                      style="background-color: whitesmoke; min-width: 180px"
                      variant="text"
                      color="highlight"
                      @click="
                        $router.push({
                          name: 'Monitoring_Site_Building_Grundfunktion',
                          params: {
                            siteid: $route.params.siteid,
                            buildingid: $route.params.buildingid,
                            buildingaasid: $route.params.buildingaasid,
                            grundfunktion: 'Luft versorgen',
                          },
                        }),
                        (monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene)
                      "
                    >
                      <span class="mr-2">Luft versorgen</span>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="8"
                    v-else-if="
                      aasGrundfunktion.aasGrundfunktion.semanticId
                        === 'https://th-koeln.de/gart/BaseFunctionSupplyColdAAS/1/0'
                    "
                  >
                    <v-btn
                      class="button-span px-2"
                      rounded="xl"
                      style="background-color: whitesmoke; min-width: 180px"
                      variant="text"
                      color="highlight"
                      @click="
                        $router.push({
                          name: 'Monitoring_Site_Building_Grundfunktion',
                          params: {
                            siteid: $route.params.siteid,
                            buildingid: $route.params.buildingid,
                            buildingaasid: $route.params.buildingaasid,
                            grundfunktion: 'Kälte versorgen',
                          },
                        }),
                        (monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene)
                      "
                    >
                      <span class="mr-2">Kälte versorgen</span>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="8"
                    v-else-if="
                      aasGrundfunktion.aasGrundfunktion.semanticId
                        === 'https://th-koeln.de/gart/BaseFunctionSupplyMediaAAS/1/0'
                    "
                  >
                    <v-btn
                      class="button-span px-2"
                      rounded="xl"
                      style="background-color: whitesmoke; min-width: 180px"
                      variant="text"
                      color="highlight"
                      @click="
                        $router.push({
                          name: 'Monitoring_Site_Building_Grundfunktion',
                          params: {
                            siteid: $route.params.siteid,
                            buildingid: $route.params.buildingid,
                            buildingaasid: $route.params.buildingaasid,
                            grundfunktion: 'Medien versorgen',
                          },
                        }),
                        (monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene)
                      "
                    >
                      <span class="mr-2">Medien versorgen</span>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="8"
                    v-else-if="
                      aasGrundfunktion.aasGrundfunktion.semanticId
                        === 'https://th-koeln.de/gart/BaseFunctionSecureAAS/1/0'
                    "
                  >
                    <v-btn
                      class="button-span px-2"
                      rounded="xl"
                      style="background-color: whitesmoke; min-width: 180px"
                      variant="text"
                      color="highlight"
                      @click="
                        $router.push({
                          name: 'Monitoring_Site_Building_Grundfunktion',
                          params: {
                            siteid: $route.params.siteid,
                            buildingid: $route.params.buildingid,
                            buildingaasid: $route.params.buildingaasid,
                            grundfunktion: 'Sichern',
                          },
                        }),
                        (monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene)
                      "
                    >
                      <span class="mr-2">Sichern</span>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="8"
                    v-else-if="
                      aasGrundfunktion.aasGrundfunktion.semanticId
                        === 'https://th-koeln.de/gart/BaseFunctionSupplyElectricityAAS/1/0'
                    "
                  >
                    <v-btn
                      class="button-span px-2"
                      rounded="xl"
                      style="background-color: whitesmoke; min-width: 180px"
                      variant="text"
                      color="highlight"
                      @click="
                        $router.push({
                          name: 'Monitoring_Site_Building_Grundfunktion',
                          params: {
                            siteid: $route.params.siteid,
                            buildingid: $route.params.buildingid,
                            buildingaasid: $route.params.buildingaasid,
                            grundfunktion: 'Strom versorgen',
                          },
                        }),
                        (monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene)
                      "
                    >
                      <span class="mr-2">Strom versorgen</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-card
            style="border-radius: 20px; background-color: whitesmoke"
            variant="outlined"
            class="anlagen-card mb-8"
          >
            <v-card-title align="center">Raumkomfort</v-card-title>
            <v-divider
              class="border-opacity-75 mx-4 mb-2"
              :thickness="2"
              color="success"
            />
            <v-card-text>
              <v-container :style="{ width: '100%' }">
                <v-row align="center" v-for="(element, i) in raumkomfort" :key="i">
                  <v-col cols="8">
                    <v-btn
                      class="button-span px-2"
                      rounded="xl"
                      style="background-color: whitesmoke; min-width: 180px"
                      variant="text"
                      color="highlight"
                    >
                      <span class="mr-2">{{ element.name }}</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-card
            style="border-radius: 20px; background-color: whitesmoke"
            variant="outlined"
            class="anlagen-card mb-8"
          >
            <v-card-title align="center">Effizienz</v-card-title>
            <v-divider
              class="border-opacity-75 mx-4 mb-2"
              :thickness="2"
              color="success"
            />
            <v-card-text>
              <v-container :style="{ width: '100%' }">
                <v-row align="center" v-for="(element, i) in effizienz" :key="i">
                  <v-col cols="8">
                    <v-btn
                      class="button-span px-2"
                      rounded="xl"
                      style="background-color: whitesmoke; min-width: 180px"
                      variant="text"
                      color="highlight"
                    >
                      <span class="mr-2">{{ element.name }}</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!--
                <v-row class="mb-8">
                    <v-col
                    v-for="aasGrundfunktion in monitoringStore.aasTree" :key="aasGrundfunktion"
                    cols = '4'>
                        <v-card
                        variant="outlined"
                        style="border-radius: 20px; background-color: whitesmoke"
                        max-width="80%" v-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSupplyHeatAAS/1/0'"
                        class="mx-auto my-8">
                            <v-card-title class="text-center" style="font-size: 18px">
                                <v-avatar size="72" rounded="0">
                                    <v-img class="mx-auto" max-width="54" href="#" contain :src="wärmePic[[Object.keys(wärmePic)[0]]]"></v-img>
                                </v-avatar></v-card-title>
                            <v-card-text class="custom-card-text">
                                <div class="text-center">
                                <v-btn
                                    class="my-5"
                                    variant="text"
                                    @click="$router.push({name:'Monitoring_Site_Building_Grundfunktion',
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Wärme versorgen'}}),
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Wärme versorgen
                                </v-btn>
                            </div>
                            </v-card-text>
                        </v-card>
                        <v-card
                        variant="outlined"
                        style="border-radius: 20px; background-color: whitesmoke"
                        max-width="80%" v-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSupplyAirAAS/1/0'"
                        class="mx-auto my-8">
                            <v-card-title class="text-center" style="font-size: 18px">
                                <v-avatar size="72" rounded="0">
                                    <v-img class="mx-auto" max-width="54" href="#" contain :src="luftPic[[Object.keys(luftPic)[0]]]"></v-img>
                                </v-avatar></v-card-title>
                            <v-card-text class="custom-card-text">
                                <div class="text-center">
                                <v-btn
                                    class="my-5"
                                    variant="text"
                                    @click="$router.push({name:'Monitoring_Site_Building_Grundfunktion',
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Luft versorgen'}}),
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Luft versorgen
                                </v-btn>
                            </div>
                            </v-card-text>
                        </v-card>
                        <v-card
                        variant="outlined"
                        style="border-radius: 20px; background-color: whitesmoke"
                        max-width="80%" v-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSupplyColdAAS/1/0'"
                        class="mx-auto my-8">
                            <v-card-title class="text-center" style="font-size: 18px">
                                <v-avatar size="72" rounded="0">
                                    <v-img class="mx-auto" max-width="54" href="#" contain :src="kältePic[[Object.keys(kältePic)[0]]]"></v-img>
                                </v-avatar></v-card-title>
                            <v-card-text class="custom-card-text">
                                <div class="text-center">
                                <v-btn
                                    class="my-5"
                                    variant="text"
                                    @click="$router.push({name:'Monitoring_Site_Building_Grundfunktion',
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Kälte versorgen'}}),
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Kälte versorgen
                                </v-btn>
                            </div>
                            </v-card-text>
                        </v-card>
                        <v-card
                        variant="outlined"
                        style="border-radius: 20px; background-color: whitesmoke"
                        max-width="80%" v-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSupplyMediaAAS/1/0'"
                        class="mx-auto my-8">
                            <v-card-title class="text-center" style="font-size: 18px">
                                <v-avatar size="72" rounded="0">
                                    <v-img class="mx-auto" max-width="54" href="#" contain :src="medienPic[[Object.keys(medienPic)[0]]]"></v-img>
                                </v-avatar></v-card-title>
                            <v-card-text class="custom-card-text">
                                <div class="text-center">
                                <v-btn
                                    class="my-5"
                                    variant="text"
                                    @click="$router.push({name:'Monitoring_Site_Building_Grundfunktion',
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Medien versorgen'}}),
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Medien versorgen
                                </v-btn>
                            </div>
                            </v-card-text>
                        </v-card>
                        <v-card
                        variant="outlined"
                        style="border-radius: 20px; background-color: whitesmoke"
                        max-width="80%" v-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSecureAAS/1/0'"
                        class="mx-auto my-8">
                            <v-card-title class="text-center" style="font-size: 18px">
                                <v-avatar size="72" rounded="0">
                                    <v-img class="mx-auto" max-width="54" href="#" contain :src="sichernPic[[Object.keys(sichernPic)[0]]]"></v-img>
                                </v-avatar></v-card-title>
                            <v-card-text class="custom-card-text">
                                <div class="text-center">
                                <v-btn
                                    class="my-5"
                                    variant="text"
                                    @click="$router.push({name:'Monitoring_Site_Building_Grundfunktion',
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Sichern'}}),
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Sichern
                                </v-btn>
                            </div>
                            </v-card-text>
                        </v-card>
                        <v-card
                        variant="outlined"
                        style="border-radius: 20px; background-color: whitesmoke"
                        max-width="80%" v-if="aasGrundfunktion.aasGrundfunktion.semanticId ==='https://th-koeln.de/gart/BaseFunctionSupplyElectricityAAS/1/0'"
                        class="mx-auto my-8">
                            <v-card-title class="text-center" style="font-size: 18px">
                                <v-avatar size="72" rounded="0">
                                    <v-img class="mx-auto" max-width="54" href="#" contain :src="stromPic[[Object.keys(stromPic)[0]]]"></v-img>
                                </v-avatar></v-card-title>
                            <v-card-text class="custom-card-text">
                                <div class="text-center">
                                <v-btn
                                    class="my-5"
                                    variant="text"
                                    @click="$router.push({name:'Monitoring_Site_Building_Grundfunktion',
                                    params:{siteid: $route.params.siteid, buildingid: $route.params.buildingid, buildingaasid:$route.params.buildingaasid, grundfunktion:'Strom versorgen'}}),
                                    monitoringStore.aasZweiteGrundfunktion = aasGrundfunktion.aasZweiteEbene"
                                >
                                    Strom versorgen
                                </v-btn>
                            </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            -->
    </v-container>
  </div>
</template>

<script>
import { useGeneralStore } from '@/store/general';
import { useMonitoringStore } from '@/store/monitoring';

export default {
  data() {
    return {
      aasTree: [],
      grundfunktionen: [],
      effizienz: [{ name: 'Energieeffizienz' }, { name: 'Kosteneffizienz' }],
      raumkomfort: [{ name: 'Temperatur' }, { name: 'Luiftqualität' }],
      wärmePic: {
        'Wärme versorgen': Object.values(
          import.meta.glob('@/assets/Wärmeversorgen.svg', { as: 'url', eager: true }),
        )[0],
      },
      luftPic: {
        'Luft versorgen': Object.values(
          import.meta.glob('@/assets/Luftversorgen.svg', { as: 'url', eager: true }),
        )[0],
      },
      kältePic: {
        'Kälte versorgen': Object.values(
          import.meta.glob('@/assets/Kälteversorgen.svg', { as: 'url', eager: true }),
        )[0],
      },
      medienPic: {
        'Medien versorgen': Object.values(
          import.meta.glob('@/assets/Medienversorgen.svg', { as: 'url', eager: true }),
        )[0],
      },
      sichernPic: {
        Sichern: Object.values(
          import.meta.glob('@/assets/Sichern.svg', { as: 'url', eager: true }),
        )[0],
      },
      stromPic: {
        'Strom versorgen': Object.values(
          import.meta.glob('@/assets/Stromversorgen.svg', { as: 'url', eager: true }),
        )[0],
      },
      items: [
        {
          function: 'Luft versorgen',
          image: Object.values(
            import.meta.glob('@/assets/air-system.jpeg', { as: 'url', eager: true }),
          )[0],
          route: 'Monitoring_Site_Building_Grundfunktion',
        },
        {
          function: 'Kälte versorgen',
          image: Object.values(
            import.meta.glob('@/assets/cooling-system.jpeg', { as: 'url', eager: true }),
          )[0],
          route: 'Monitoring_Site_Building_Grundfunktion',
        },
        {
          function: 'Wärme versorgen',
          image: Object.values(
            import.meta.glob('@/assets/heating-system.jpeg', { as: 'url', eager: true }),
          )[0],
          route: 'Monitoring_Site_Building_Grundfunktion',
        },
      ],
    };
  },
  props: {
    buildingAasId: String,
  },
  computed: {
    generalStore() {
      return useGeneralStore();
    },
    monitoringStore() {
      return useMonitoringStore();
    },
  },
  mounted() {
    this.grundfunktionen = this.generalStore.loadedBuildingWithGrundfunktion;
    this.getGrundfunktionenForBulding(this.$route.params.buildingaasid);
  },
  methods: {
    /*
        navigateToRoute(routeName, siteid, buildingid) {
            this.$router.push({name:routeName, params:{siteid:siteid, buildingid: buildingid, grundfunktion:'Luft versorgen'}});
        },
        */
    async getGrundfunktionenForBulding(aasId) {
      const aasTree = await this.monitoringStore.getGrundfunktionen(aasId, this.grundfunktionen);
      this.aasTree = aasTree;
    },
  },
};
</script>

<style scoped>
.hand-cursor {
  cursor: pointer;
}
</style>
