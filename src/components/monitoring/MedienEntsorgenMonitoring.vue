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
          <LineChartAll :allElements="this.allSes" zweiteFunktion="MedienEntsorgen"/> 
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-card
              style="border-radius: 20px; background-color: whitesmoke"
              variant="outlined" class="pa-4 anlagen-card">
              <v-card-text class="center-content">
                  <v-container class="mx-0 mx-lg-10 mx-xl-16 px-lg-10 px-xl-16">
                    <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.84 41.42">
                        <g id="Ebene_1-2" data-name="Ebene_1">
                            <g id="_1699756229424" data-name=" 1699756229424">
                            <path class="cls-1" d="M23.48,35.95c5.93-5.38,11.18-5.38,15.75,0"/>
                            <path class="cls-1" d="M54.97,35.89c-5.93,5.38-11.18,5.38-15.75,0"/>
                            <path class="cls-1" d="M54.95,35.95c5.93-5.38,11.18-5.38,15.75,0"/>
                            </g>
                            <path class="cls-2" d="M1.92,2.58H24.73V19.73H1.92c-.78,0-1.42-.64-1.42-1.42V4c0-.78,.64-1.42,1.42-1.42Z"/>
                            <path class="cls-3" d="M27.84,0h0c.93,0,1.69,1.58,1.69,3.52v15.5c0,1.95-.76,3.52-1.69,3.52h0c-.93,0-1.69-1.58-1.69-3.52V3.52c0-1.95,.76-3.52,1.69-3.52Z"/>
                            <g id="_1699756236576" data-name=" 1699756236576">
                            <path class="cls-2" d="M39.22,31.64c4.78,4.96,8.43,6.24,10.97,3.84,.64-18.47-5.3-27.59-17.81-27.37"/>
                            <path class="cls-2" d="M32.37,8.11l-.09,5.71c7.09,2.86,9.4,8.8,6.94,17.82"/>
                            </g>
                            <path class="cls-4" d="M32.37,8.11l-.09,5.71c7.09,2.86,9.4,8.8,6.94,17.82,4.78,4.96,8.43,6.24,10.97,3.84,.64-18.47-5.3-27.59-17.81-27.37h0Z"/>
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
      drainage: [],
      drainageEnthalten: false,
      fettabscheider: [],
      fettabscheiderEnthalten: false,
      hebeanlage: [],
      hebeanlageEnthalten: false,
      neutralisationKondensat: [],
      neutralisationKondensatEnthalten: false,
      regenwasserpumpe: [],
      regenwasserpumpeEnthalten: false,
      schmutzwasserpumpe: [],
      schmutzwasserpumpeEnthalten: false,
      wcAbwasser: [],
      wcAbwasserEnthalten: false,
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
    
        if (semanticId === 'https://th-koeln.de/gart/ComponentDrainageAAS/1/0') {
          this.drainage = elements;
          this.drainageEnthalten = true
          allComponents.push('Drainage')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentGreaseSeparatorAAS/1/0') {
          this.fettabscheider = elements;
          this.fettabscheiderEnthalten = true
          allComponents.push('Fettabscheider')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentLiftstationAAS/1/0') {
          this.hebeanlage = elements;
          this.hebeanlageEnthalten = true
          allComponents.push('Hebeanlage')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentCondensateNeutralizationAAS/1/0') {
          this.neutralisationKondensat = elements;
          this.neutralisationKondensatEnthalten = true
          allComponents.push('Neutralisation Kondensat')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentRainwaterPumpAAS/1/0') {
          this.regenwasserpumpe = elements;
          this.regenwasserpumpeEnthalten = true
          allComponents.push('Regenwasserpumpe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentWasteWaterPumpAAS/1/0') {
          this.schmutzwasserpumpe = elements;
          this.schmutzwasserpumpeEnthalten = true
          allComponents.push('Schmutzwasserpumpe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentToiletWasteWaterAAS/1/0') {
          this.wcAbwasser = elements;
          this.wcAbwasserEnthalten = true
          allComponents.push('WC Abwasser')
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
stroke: #372772;
stroke-width: 3px;
}

.cls-1, .cls-2 {
fill: none;
stroke-miterlimit: 2.4;
}

.cls-3 {
fill: #ff4a1c;
}

.cls-3, .cls-4 {
fill-rule: evenodd;
}

.cls-2 {
stroke: #2b2a29;
stroke-width: 1px;
}

.cls-4 {
fill: #372772;
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
