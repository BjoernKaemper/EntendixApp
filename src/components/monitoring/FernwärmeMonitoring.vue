<template>
    <div>
      <v-container v-if="monitoringStore.loadingMonitoringComponent === true">
        <v-progress-linear
        indeterminate
        color="success"
        ></v-progress-linear>
      </v-container>
      <v-container v-else-if="monitoringStore.loadingMonitoringComponent === false" class="my-4 justify-center align-center">
        <v-container>
          <KpisMonitoringAnlage />
        </v-container>
        <v-container>
          <LineChartAll :allElements="this.allSes" zweiteFunktion="WärmeBeziehen"/> 
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-card
                style="border-radius: 20px; background-color: whitesmoke"
                variant="outlined" class="pa-4 anlagen-card">
                <v-card-text class="center-content">
                  <v-container class="mx-0 mx-lg-10 mx-xl-16 px-lg-10 px-xl-16">
                    <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.56 220.26">
            
                            <g id="Ebene_1-2" data-name="Ebene_1">
                                <line class="cls-2" x1="6.6" y1="170.08" x2="6.6" y2="64.33"/>
                                <line class="cls-2" x1="148.34" y1="170.08" x2="148.34" y2="64.33"/>
                                <polygon class="cls-2" points="5.39 64.33 77.11 2.64 148.83 64.33 5.39 64.33"/>
                                <path class="cls-3" d="M216.18,200.38c-89.54,6.09-131.92-9.66-127.13-47.25"/>
                                <path class="cls-3" d="M216.4,216.55c-105.03,8.17-154.73-12.97-149.11-63.43"/>
                                <line class="cls-2" x1="4.81" y1="168.32" x2="55.03" y2="168.32"/>
                                <line class="cls-2" x1="100.1" y1="170.08" x2="150.32" y2="170.08"/>
                                <g id="_1700032706960" data-name=" 1700032706960">
                                <path class="cls-1" d="M47.09,92.55c5.37,5.93,5.37,11.18,0,15.75"/>
                                <path class="cls-1" d="M47.16,124.04c-5.37-5.93-5.37-11.18,0-15.75"/>
                                <path class="cls-1" d="M47.09,124.02c5.37,5.93,5.37,11.18,0,15.75"/>
                                </g>
                                <g id="_1700032705952" data-name=" 1700032705952">
                                <path class="cls-1" d="M75.44,92.55c5.37,5.93,5.37,11.18,0,15.75"/>
                                <path class="cls-1" d="M75.5,124.04c-5.37-5.93-5.37-11.18,0-15.75"/>
                                <path class="cls-1" d="M75.44,124.02c5.37,5.93,5.37,11.18,0,15.75"/>
                                </g>
                                <g id="_1700032708880" data-name=" 1700032708880">
                                <path class="cls-1" d="M103.78,92.55c5.37,5.93,5.37,11.18,0,15.75"/>
                                <path class="cls-1" d="M103.85,124.04c-5.37-5.93-5.37-11.18,0-15.75"/>
                                <path class="cls-1" d="M103.78,124.02c5.37,5.93,5.37,11.18,0,15.75"/>
                                </g>
                            </g>
                      </svg>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="8">
              <v-card 
              style="border-radius: 20px; background-color: whitesmoke"
              variant="outlined" class="anlagen-card">
                <v-tabs
                  color="success"
                >
                  <v-tab v-for="komponente in this.allComponents" :key="komponente"
                  @click="handleAreaClick(komponente)"
                  >
                    {{ komponente }}
                  </v-tab>
                </v-tabs>
              </v-card>
              <AnlagenMonitoringCard :elements="this.komponenteZeigen"/>
              <!--
              <div v-for="element in this.komponenteZeigen" :key="element.idShort">
                <AnlagenMonitoringCard :elements="element"/>
              </div>
            -->
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </div>
</template>

<script>
import { useGeneralStore } from "@/store/general"
import { useMonitoringStore } from "@/store/monitoring"
import { useDigitalTwinsStore } from "@/store/digitaltwins"
import AnlagenMonitoringCard from "@/components/monitoring/AnlagenMonitoringCard.vue"
import LineChartAll from "@/components/monitoring/LineChartAll.vue"
import KpisMonitoringAnlage from "@/components/monitoring/KpisMonitoringAnlage.vue"

export default {
  data() {
    return {
      viewBox: '0 0 400 120', // Adjust the viewBox dimensions to fit your image
      fernwärme: [],
      fernwärmeEnthalten: false,
      komponenteZeigen: [],
      allComponents: null,
      allSes: null
    };
  },
  components: {
    AnlagenMonitoringCard, KpisMonitoringAnlage, LineChartAll
  },
  props: {
    anlage: Object
  },
  mounted() {
    this.getSubmodelInformations()
  },
  computed: {
    generalStore () {
      return useGeneralStore()
    }, 
    monitoringStore () {
      return useMonitoringStore()
    },
    digitalTwinStore () {
      return useDigitalTwinsStore()
    }
  },
  methods: {
    async getSubmodelInformations() {
      await this.monitoringStore.setLoadingMonitoringComponent('true')
      let allSE = []
      let allComponents = []
      for (const komponente in this.anlage) {
        const { aasId, semanticId } = this.anlage[komponente];
        const submodelId = 'OperatingInformation';
        const submodel = await this.generalStore.getSubmodel(aasId, submodelId);
        const submodelElements = submodel.submodelElements;

        // Define an array to store the promises for the asynchronous calls
        const elementPromises = submodelElements.map(async (element) => {
          let elementData = {
            'aasId': aasId,
            'submodelName': submodelId,
            'idShort': element.idShort,
            'name': element.descriptions[0].text,
            'semanticId': element.semanticId.keys[0].value
          };
          /*
          let valueIdShortpath = {
            path: [element.idShort]
          }
          */
          elementData = await this.digitalTwinStore.getSeElement(aasId, submodelId, element.idShort, elementData)
          elementData['datenpunktLabel'] = elementData['datenpunkt'][0]['value']
          return elementData
        });

        const elements = await Promise.all(elementPromises);

        if (this.komponenteZeigen.length === 0) {
          this.komponenteZeigen = elements
        }

        allSE.push(
            {
            'anlagenInformation': this.anlage[komponente],
            'elements': elements
            }
        )
        this.allSes = allSE
        //console.log(this.allSes)
    
        if (semanticId === 'https://th-koeln.de/gart/ComponentDistrictHeatingAAS/1/0') {
          this.fernwärme = elements;
          this.fernwärmeEnthalten = true
          allComponents.push('Fernwärme')
        }
      }
      this.allComponents = allComponents
      await this.monitoringStore.setLoadingMonitoringComponent('false')
      //this.getCssInfos(allComponents)
    },
    /*
    getCssInfos(allComponents) {
      for (let element in allComponents) {
        let name = allComponents[element]
        if (name === 'Rücklauf') {
          const cssElement = document.getElementById("rücklauf");
          cssElement.classList.add("pointer", "rücklauf")
          const cssElement1 = document.getElementById("rücklauf1");
          cssElement1.classList.add("pointer", "rücklauf")
          const cssElement2 = document.getElementById("rücklauf2");
          cssElement2.classList.add("pointer", "rücklauf")
        } else if (name === 'Vorlauf') {
          const cssElement = document.getElementById("vorlauf");
          cssElement.classList.add("pointer", "vorlauf")
          const cssElement1 = document.getElementById("vorlauf1");
          cssElement1.classList.add("pointer", "vorlauf")
          const cssElement2 = document.getElementById("vorlauf2");
          cssElement2.classList.add("pointer", "vorlauf")
          const cssElement3 = document.getElementById("vorlauf3");
          cssElement3.classList.add("pointer", "vorlauf")
        } else if (name === 'Pumpe') {
          const cssElement = document.getElementById("pumpe");
          cssElement.classList.add("pointer", "pumpe")
        }  else if (name === 'Heizkreis allgemein') {
          const cssElement = document.getElementById("hkAllgemein");
          cssElement.classList.add("pointer", "hkAllgemein")
        } else if (name === 'Ventil') {
          const cssElement = document.getElementById("ventil");
          cssElement.classList.add("pointer", "ventil")
        }
      }
    },

    handleAreaClick(component) {
      if (component == 'Rücklauf') {
        this.komponenteZeigen = this.rücklauf
      } else if (component == 'Vorlauf') {
        this.komponenteZeigen = this.vorlauf
      } else if (component == 'Pumpe') {
        this.komponenteZeigen = this.pumpe
      } else if (component == 'Ventil') {
        this.komponenteZeigen = this.ventil
      } else if (component == 'Heizkreis allgemein') {
        this.komponenteZeigen = this.heizkreisAllgemein
      }
    },
    */
  },
};
</script>

<style scoped>
  
.cls-1 {
stroke: #ff4a1c;
}

.cls-1, .cls-2, .cls-3 {
fill: none;
stroke-miterlimit: 10;
stroke-width: 4px;
}

.cls-2 {
stroke: #2b2a29;
}

.cls-3 {
stroke: #372772;
}

.pointer {
  cursor: pointer;
}
.anlagen-card {
  background-color: #ffffff;
}
.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center; /* Optional: If you want to center-align text within v-card-text */
  height: 100%; /* Optional: Set a specific height if needed */
}

</style>
