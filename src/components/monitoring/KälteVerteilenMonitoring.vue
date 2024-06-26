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
          <KpisMonitoringAnlage grundfunktion="Kälte"/>
        </v-container>
        <v-container>
          <LineChartAll :allElements="this.allSes" zweiteFunktion="KälteVerteilen"/> 
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-card
              style="border-radius: 20px; background-color: whitesmoke"
              variant="outlined" class="pa-4 anlagen-card">
              <v-card-text class="center-content">
                  <v-container class="mx-0 mx-lg-10 mx-xl-16 px-lg-10 px-xl-16">
                    <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.97 94.32">
                      <g id="Ebene_1-2" data-name="Ebene_1">
                        <line class="cls-2" y1="85.74" x2="89.97" y2="85.74"/>
                        <line class="cls-4" y1="92.82" x2="89.91" y2="92.82"/>
                        <polyline class="cls-3" points="65.13 92.82 65.13 10.99 59.75 10.99"/>
                        <polyline class="cls-1" points="65.13 92.82 65.13 10.99 59.75 10.99"/>
                        <circle class="cls-6" cx="46.52" cy="11.84" r="7.8"/>
                        <circle class="cls-6" cx="46.52" cy="11.84" r="11.34"/>
                        <circle class="cls-6" cx="28.66" cy="39.84" r="6.38"/>
                        <polyline class="cls-3" points="35.03 39.84 28.66 33.46 22.28 39.84"/>
                        <path class="cls-6" d="M40.88,64.22l5.87-3.35-5.87-3.35v6.7Z"/>
                        <path class="cls-6" d="M52.62,64.22l-5.87-3.35,5.87-3.35v6.7Z"/>
                        <polyline class="cls-5" points="28.57 32.11 28.57 10.99 33.41 10.99"/>
                        <line class="cls-1" x1="28.37" y1="60.87" x2="39.64" y2="60.87"/>
                        <line class="cls-1" x1="53.85" y1="61" x2="65.13" y2="61"/>
                        <line class="cls-5" x1="28.37" y1="47.6" x2="28.37" y2="85.74"/>
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
      fu: [],
      fuEnthalten: false,
      kältekreisAllgemein: [],
      kältekreisAllgemeinEnthalten: false,
      kmAnschluss: [],
      kmAnschlussEnthalten: false,
      klappe: [],
      klappeEnthalten: false,
      pumpe: [],
      pumpeEnthalten: false,
      raum: [],
      raumEnthalten: false,
      regler: [],
      reglerEnthalten: false,
      rücklauf: [],
      rücklaufEnthalten: false,
      umluftkühlgerät: [],
      umluftkühlgerätEnthalten: false,
      ventil: [],
      ventilEnthalten: false,
      vorlauf: [],
      vorlaufEnthalten: false,
      wmz: [],
      wmzEnthalten: false,      
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
        //let component = components[komponente]
        //console.log(component)
        //const semanticId = anlage.semanticId
        const submodelId = 'OperatingInformation'
        //const submodel = await this.generalStore.getSubmodel(aasId, submodelId)
        //const submodelElements = submodel.submodelElements;
        //console.log(submodelElements)
        const allElements = await this.generalStore.getAllSubmodelElementValues(aasId, submodelId)
        //console.log(allElements)
        let elements = []

        for (let element in allElements) {
            const dataContent = allElements[element]
            let elementData = {
                'aasId': aasId,
                'submodelName': submodelId,
                'idShort': element,
                'presentValue': dataContent[0].PresentValue,
                //'name': dataContent[2].DataSource,
                //'semanticId': element.semanticId.keys[0].value
                'objectName': dataContent[2].DataSource[6].ObjectName,
                'objectType': dataContent[2].DataSource[7].ObjectType,
                'description': dataContent[2].DataSource[8].Description,
                'grundfunktionLabel': dataContent[2].DataSource[0].PredictionGrundfunktion[0].LabelResult[0].LabelName,
                'grundfunktionScore': dataContent[2].DataSource[0].PredictionGrundfunktion[0].LabelResult[1].LabelScore,
                'zweiteEbeneLabel': dataContent[2].DataSource[1].PredictionFunktionEbeneZwei[0].LabelResult[0].LabelName,
                'zweiteEbeneScore': dataContent[2].DataSource[1].PredictionFunktionEbeneZwei[0].LabelResult[1].LabelScore,
                'komponenteLabel': dataContent[2].DataSource[2].PredictionKomponente[0].LabelResult[0].LabelName,
                'komponenteScore': dataContent[2].DataSource[2].PredictionKomponente[0].LabelResult[1].LabelScore,
                'datenpunktLabel': dataContent[2].DataSource[3].PredictionDatapoint[0].LabelResult[0].LabelName,
                'datenpunktScore': dataContent[2].DataSource[3].PredictionDatapoint[0].LabelResult[1].LabelScore,
                'anlageLabel': dataContent[2].DataSource[4].PredictionAnlage[0].LabelResult[0].LabelName,
                'anlageScore': dataContent[2].DataSource[4].PredictionAnlage[0].LabelResult[1].LabelScore,
            }
            //console.log(elementData)
            elements.push(elementData)
        }

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
      /*
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
        */
    
        if (semanticId === 'https://th-koeln.de/gart/ComponentRefrigerationCircuitGeneralAAS/1/0') {
          this.kältekreisAllgemein = elements;
          this.kältekreisAllgemeinEnthalten = true
          allComponents.push('Kältekreis Allgemein')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFrequencyConverterAAS/1/0') {
          this.fu = elements;
          this.fuEnthalten = true
          allComponents.push('Frequenzumrichter')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentRefrigerationMachineConnectionAAS/1/0') {
          this.kmAnschluss = elements;
          this.kmAnschlussEnthaltenEnthalten = true
          allComponents.push('Anschluss Kältemaschine')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFlapAAS/1/0') {
          this.klappe = elements;
          this.klappeEnthalten = true
          allComponents.push('Klappe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentPumpAAS/1/0') {
          this.pumpe = elements;
          this.pumpeEnthalten = true
          allComponents.push('Pumpe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentRoomAAS/1/0') {
          this.raum = elements;
          this.raumEnthalten = true
          allComponents.push('Raum')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentControllerAAS/1/0') {
          this.regler = elements;
          this.reglerEnthalten = true
          allComponents.push('Regler')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentReturnAAS/1/0') {
          this.rücklauf = elements;
          this.rücklaufEnthalten = true
          allComponents.push('Rücklauf')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentValveAAS/1/0') {
          this.umluftkühlgerät = elements;
          this.umluftkühlgerätEnthalten = true
          allComponents.push('Ventil')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentCirculatingAirCoolingUnitAAS/1/0') {
          this.ventil = elements;
          this.ventilEnthalten = true
          allComponents.push('Ventil')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAAS/1/0') {
          this.vorlauf = elements;
          this.vorlaufEnthalten = true
          allComponents.push('Vorlauf')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeatFlowMeterAAS/1/0') {
          this.wmz = elements;
          this.wmzEnthalten = true
          allComponents.push('Wärmemengenzähler')
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
  stroke-miterlimit: 10;
}

.cls-1, .cls-4 {
  stroke: #ff4a1c;
}

.cls-1, .cls-5 {
  stroke-width: 1.5px;
}

.cls-2, .cls-4 {
  stroke-width: 3px;
}

.cls-2, .cls-5 {
  stroke: #372772;
}

.cls-3 {
  stroke-width: .57px;
}

.cls-3, .cls-6 {
  stroke: #2b2a29;
}

.cls-6 {
  stroke-width: 1px;
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
