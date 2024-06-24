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
          <KpisMonitoringAnlage grundfunktion="Luft"/>
        </v-container>
        <v-container>
          <LineChartAll :allElements="this.allSes" zweiteFunktion="LuftVerteilen"/> 
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-card
                style="border-radius: 20px; background-color: whitesmoke"
                variant="outlined" class="pa-4 anlagen-card">
                <v-card-text class="center-content">
                  <v-container class="mx-0 mx-lg-6 mx-xl-16 px-lg-6 px-xl-16">
                    <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.22 139.75">
            
                      <g id="Ebene_1-2" data-name="Ebene_1">
                        <rect class="cls-3" x="25.38" y="89.34" width="15.38" height="20.16"/>
                        <line class="cls-3" x1="25.38" y1="96.67" x2="40.75" y2="92.82"/>
                        <line class="cls-3" x1="25.38" y1="102.46" x2="40.75" y2="106.3"/>
                        <rect class="cls-2" x="26.5" y="29.48" width="15.38" height="19.17"/>
                        <line class="cls-2" x1="26.5" y1="36.3" x2="41.87" y2="32.46"/>
                        <line class="cls-2" x1="26.5" y1="42.1" x2="41.87" y2="45.94"/>
                        <rect class="cls-4" x="70.38" y="77.73" width="12.28" height="46.97"/>
                        <line class="cls-1" x1="74.78" y1="82.88" x2="74.78" y2="118.98"/>
                        <line class="cls-1" x1="78.75" y1="82.88" x2="78.75" y2="118.98"/>
                        <rect class="cls-4" x="71.5" y="15.44" width="12.28" height="46.97"/>
                        <line class="cls-5" x1="75.91" y1="20.6" x2="75.91" y2="56.69"/>
                        <line class="cls-5" x1="79.88" y1="20.6" x2="79.88" y2="56.69"/>
                        <path class="cls-6" d="M79.57,2h102.46c5.08,0,9.19,5.87,9.19,13.11V124.64c0,7.24-4.12,13.11-9.19,13.11H79.57c-5.08,0-9.19-5.87-9.19-13.11V15.11c0-7.24,4.12-13.11,9.19-13.11Z"/>
                        <path class="cls-4" d="M71.5,28.24H4.96c-1.56,0-2.83,1.28-2.83,2.83v15.71c0,1.56,1.28,2.83,2.83,2.83H71.5V28.24Z"/>
                        <path class="cls-4" d="M70.38,88.6H3.83c-1.56,0-2.83,1.28-2.83,2.83v15.71c0,1.56,1.28,2.83,2.83,2.83H70.38v-21.37Z"/>
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
      wärmepumpe: [],
      wärmepumpeEnthalten: false,
      auslass: [],
      auslassEnthalten: false,
      raum: [],
      raumEnthalten: false,
      vsrAbluft: [],
      vsrAbluftEnthalten: false,
      vsrZuluft: [],
      vsrZuluftEnthalten: false,
      vsrRaum: [],
      vsrRaumEnthalten: false,
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
            'name': element.displayName[0].text,
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
    
        if (semanticId === 'https://th-koeln.de/gart/ComponentRoomAAS/1/0') {
          this.raum = elements;
          this.raumEnthalten = true
          allComponents.push('Raum')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentOutletAAS/1/0') {
          this.auslass = elements;
          this.auslassEnthalten = true
          allComponents.push('Auslass')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentVolumeFlowControllerExtractAirAAS/1/0') {
          this.vsrAbluft = elements;
          this.vsrAbluftEnthalten = true
          allComponents.push('VSR Abluft')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentVolumeFlowControllerSupplyAirAAS/1/0') {
          this.vsrZuluft = elements;
          this.vsrZuluftEnthalten = true
          allComponents.push('VSR Zuluft')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentVolumeFlowControllerRoomAAS/1/0') {
          this.vsrRaum = elements;
          this.vsrRaumEnthalten = true
          allComponents.push('VSR Raum')
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
  
	.cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6 {
    fill: none;
    stroke-miterlimit: 1.36;
  }

  .cls-1, .cls-3 {
    stroke: #372772;
  }

  .cls-1, .cls-5 {
    stroke-width: 1.5px;
  }

  .cls-2, .cls-3, .cls-4 {
    stroke-width: 2px;
  }

  .cls-2, .cls-5 {
    stroke: #ff4a1c;
  }

  .cls-4, .cls-6 {
    stroke: #2b2a29;
  }

  .cls-6 {
    stroke-width: 4px;
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
