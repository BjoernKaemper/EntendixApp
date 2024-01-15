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
          <LineChartAll :allElements="this.allSes" zweiteFunktion="MedienBereitstellen"/> 
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-card
              style="border-radius: 20px; background-color: whitesmoke"
              variant="outlined" class="pa-4 anlagen-card">
              <v-card-text class="center-content">
                  <v-container class="mx-0 mx-lg-10 mx-xl-16 px-lg-10 px-xl-16">
                    <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 211.48 254.38">
            
                          <g id="Ebene_1-2" data-name="Ebene_1">
                          <rect class="cls-2" x="2" y="23.49" width="207.48" height="228.89" rx="37.01" ry="37.01"/>
                          <line class="cls-1" x1="19.42" y1="221.25" x2="191.17" y2="221.25"/>
                          <line class="cls-1" x1="147.74" y1="221.25" x2="147.74" y2="145.14"/>
                          <circle class="cls-3" cx="147.74" cy="134.16" r="10.98"/>
                          <line class="cls-1" x1="138.74" y1="166.7" x2="156.55" y2="166.7"/>
                          <line class="cls-1" x1="71.77" y1="205.52" x2="71.77" y2="145.14"/>
                          <circle class="cls-3" cx="71.77" cy="134.16" r="10.98"/>
                          <line class="cls-1" x1="62.77" y1="166.7" x2="80.58" y2="166.7"/>
                          <line class="cls-1" x1="19.42" y1="205.09" x2="134.17" y2="205.09"/>
                          <line class="cls-1" x1="160.98" y1="205.09" x2="190.86" y2="205.09"/>
                          <path class="cls-4" d="M110.44,7.9c5.64,21.55,22.56,32.32,22.56,43.1s-5.64,21.55-22.56,21.55-22.56-10.77-22.56-21.55,16.92-21.55,22.56-43.1Z"/>
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
      bereitstellenAllgemein: [],
      bereitstellenAllgemeinEnthalten: false,
      enthärtung: [],
      enthärtungEnthalten: false,
      entsalzung: [],
      entsalzungEnthalten: false,
      wasseraufbereitung: [],
      wasseraufbereitungEnthalten: false,
      frischwasser: [],
      frischwasserEnthalten: false,
      dosieranlage: [],
      dosieranlageEnthalten: false,
      kraftstoffreinigung: [],
      kraftstoffreinigungEnthalten: false,
      thermischeDesinfektion: [],
      thermischeDesinfektionEnthalten: false,
      nachfüllstation: [],
      nachfüllstationEnthalten: false,
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
    
        if (semanticId === 'https://th-koeln.de/gart/ComponentGeneralProvisionAAS/1/0') {
          this.bereitstellenAllgemein = elements;
          this.bereitstellenAllgemeinEnthalten = true
          allComponents.push('Allgemein')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentDosingSystemAAS/1/0') {
          this.dosieranlage = elements;
          this.dosieranlageEnthalten = true
          allComponents.push('Dosieranlage')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSofteningAAS/1/0') {
          this.enthärtung = elements;
          this.enthärtungEnthalten = true
          allComponents.push('Enthärtung')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentDesalinationAAS/1/0') {
          this.entsalzung = elements;
          this.entsalzungEnthalten = true
          allComponents.push('Entsalzung')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFreshWaterModuleAAS/1/0') {
          this.frischwasser = elements;
          this.frischwasserEnthalten = true
          allComponents.push('Frischwassermodul')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFuelCleaningAAS/1/0') {
          this.kraftstoffreinigung = elements;
          this.kraftstoffreinigungEnthalten = true
          allComponents.push('Kraftstoffreinigung')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentRefillStationAAS/1/0') {
          this.nachfüllstation = elements;
          this.nachfüllstationEnthalten = true
          allComponents.push('Nachfüllstation')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentThermalDisinfectionAAS/1/0') {
          this.thermischeDesinfektion = elements;
          this.thermischeDesinfektionEnthalten = true
          allComponents.push('Thermische Desinfektion')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentWaterTreatmentAAS/1/0') {
          this.wasseraufbereitung = elements;
          this.wasseraufbereitungEnthalten = true
          allComponents.push('Wasseraufbereitung')
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

<style>
  
	.cls-1, .cls-2, .cls-3 {
    fill: none;
  }

  .cls-1, .cls-2, .cls-3, .cls-4 {
    stroke-miterlimit: 10;
  }

  .cls-1, .cls-2, .cls-4 {
    stroke-width: 4px;
  }

  .cls-1, .cls-4 {
    stroke: #372772;
  }

  .cls-2 {
    stroke: #000;
  }

  .cls-3 {
    stroke: #ff4a1c;
    stroke-width: 8px;
  }

  .cls-4 {
    fill: #fefefe;
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
