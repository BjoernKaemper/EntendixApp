<template>
  <div>
    <v-container v-if="monitoringStore.loadingMonitoringComponent === true">
      <v-progress-linear indeterminate color="success"></v-progress-linear>
    </v-container>
    <v-container
      v-else-if="monitoringStore.loadingMonitoringComponent === false"
      class="my-4 justify-center align-center"
    >
      <v-container>
        <KpisMonitoringAnlage grundfunktion="Wärme" />
      </v-container>
      <v-container>
        <LineChartAll :allElements="this.allSes" zweiteFunktion="WärmeErzeugen" />
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-card
              style="border-radius: 20px; background-color: whitesmoke"
              variant="outlined"
              class="pa-4 anlagen-card"
            >
              <v-card-text class="center-content">
                <v-container class="mx-0 mx-lg-10 mx-xl-16 px-lg-10 px-xl-16">
                  <svg
                    id="Ebene_1"
                    data-name="Ebene 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 211.88 274.58"
                  >
                    <g id="Ebene_1-2" data-name="Ebene_1">
                      <rect
                        class="cls-1"
                        x="2"
                        y="2"
                        width="207.48"
                        height="228.89"
                        rx="37.01"
                        ry="37.01"
                      />
                      <path
                        class="cls-1"
                        d="M39.01,230.9h49.83v12.72c0,5.09-4.16,9.25-9.25,9.25h-31.32c-5.09,0-9.25-4.16-9.25-9.25v-12.72h0Z"
                      />
                      <path
                        class="cls-1"
                        d="M122.28,230.9h49.83v12.72c0,5.09-4.16,9.25-9.25,9.25h-31.32c-5.09,0-9.25-4.16-9.25-9.25v-12.72h0Z"
                      />
                      <path
                        class="cls-1"
                        d="M48.26,252.87h32.62v15.09c0,2.54-2.08,4.63-4.63,4.63h-23.37c-2.54,0-4.63-2.08-4.63-4.63v-15.09h0Z"
                      />
                      <path
                        class="cls-1"
                        d="M131.53,252.87h32.62v15.09c0,2.54-2.08,4.63-4.63,4.63h-23.37c-2.54,0-4.63-2.08-4.63-4.63v-15.09h0Z"
                      />
                      <line class="cls-2" x1="68.28" y1="199.1" x2="144.98" y2="199.1" />
                      <circle class="cls-2" cx="103.38" cy="86.16" r="39.32" />
                      <line class="cls-1" x1="2" y1="162.06" x2="211.88" y2="162.06" />
                    </g>
                  </svg>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card
              style="border-radius: 20px; background-color: whitesmoke"
              variant="outlined"
              class="anlagen-card"
            >
              <v-tabs color="success">
                <v-tab
                  v-for="komponente in this.allComponents"
                  :key="komponente"
                  @click="handleAreaClick(komponente)"
                >
                  {{ komponente }}
                </v-tab>
              </v-tabs>
            </v-card>
            <AnlagenMonitoringCard :elements="this.komponenteZeigen" />
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
import { useGeneralStore } from '@/store/general'
import { useMonitoringStore } from '@/store/monitoring'
import { useDigitalTwinsStore } from '@/store/digitaltwins'
import AnlagenMonitoringCard from '@/components/monitoring/AnlagenMonitoringCard.vue'
import LineChartAll from '@/components/monitoring/LineChartAll.vue'
import KpisMonitoringAnlage from '@/components/monitoring/KpisMonitoringAnlage.vue'

export default {
  data() {
    return {
      viewBox: '0 0 400 120', // Adjust the viewBox dimensions to fit your image
      wärmepumpe: [],
      wärmepumpeEnthalten: false,
      kessel: [],
      kesselEnthalten: false,
      bhkw: [],
      bhkwEnthalten: [],
      pellet: [],
      pelletEnthalten: false,
      wärmeerzeugerAllgemein: [],
      wärmeerzeugerAllgemeinEnthalten: false,
      komponenteZeigen: [],
      allComponents: null,
      allSes: null
    }
  },
  components: {
    AnlagenMonitoringCard,
    KpisMonitoringAnlage,
    LineChartAll
  },
  props: {
    anlage: Object
  },
  mounted() {
    this.getSubmodelInformations()
  },
  computed: {
    generalStore() {
      return useGeneralStore()
    },
    monitoringStore() {
      return useMonitoringStore()
    },
    digitalTwinStore() {
      return useDigitalTwinsStore()
    }
  },
  methods: {
    async getSubmodelInformations() {
      await this.monitoringStore.setLoadingMonitoringComponent('true')
      const allSE = []
      const allComponents = []
      for (const komponente in this.anlage) {
        const { aasId, semanticId } = this.anlage[komponente]
        //let component = components[komponente]
        //console.log(component)
        //const semanticId = anlage.semanticId
        const submodelId = 'OperatingInformation'
        //const submodel = await this.generalStore.getSubmodel(aasId, submodelId)
        //const submodelElements = submodel.submodelElements;
        //console.log(submodelElements)
        const allElements = await this.generalStore.getAllSubmodelElementValues(aasId, submodelId)
        //console.log(allElements)
        const elements = []

        for (const element in allElements) {
          const dataContent = allElements[element]
          const elementData = {
            aasId: aasId,
            submodelName: submodelId,
            idShort: element,
            presentValue: dataContent[0].PresentValue,
            //'name': dataContent[2].DataSource,
            //'semanticId': element.semanticId.keys[0].value
            objectName: dataContent[2].DataSource[6].ObjectName,
            objectType: dataContent[2].DataSource[7].ObjectType,
            description: dataContent[2].DataSource[8].Description,
            grundfunktionLabel:
              dataContent[2].DataSource[0].PredictionGrundfunktion[0].LabelResult[0].LabelName,
            grundfunktionScore:
              dataContent[2].DataSource[0].PredictionGrundfunktion[0].LabelResult[1].LabelScore,
            zweiteEbeneLabel:
              dataContent[2].DataSource[1].PredictionFunktionEbeneZwei[0].LabelResult[0].LabelName,
            zweiteEbeneScore:
              dataContent[2].DataSource[1].PredictionFunktionEbeneZwei[0].LabelResult[1].LabelScore,
            komponenteLabel:
              dataContent[2].DataSource[2].PredictionKomponente[0].LabelResult[0].LabelName,
            komponenteScore:
              dataContent[2].DataSource[2].PredictionKomponente[0].LabelResult[1].LabelScore,
            datenpunktLabel:
              dataContent[2].DataSource[3].PredictionDatapoint[0].LabelResult[0].LabelName,
            datenpunktScore:
              dataContent[2].DataSource[3].PredictionDatapoint[0].LabelResult[1].LabelScore,
            anlageLabel: dataContent[2].DataSource[4].PredictionAnlage[0].LabelResult[0].LabelName,
            anlageScore: dataContent[2].DataSource[4].PredictionAnlage[0].LabelResult[1].LabelScore
          }
          //console.log(elementData)
          const value = this.monitoringStore.checkvalue(elementData.presentValue)
          elementData.presentValue = value
          elements.push(elementData)
        }

        if (this.komponenteZeigen.length === 0) {
          this.komponenteZeigen = elements
        }

        allSE.push({
          anlagenInformation: this.anlage[komponente],
          elements: elements
        })

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
        //console.log(this.allSes)

        if (semanticId === 'https://th-koeln.de/gart/ComponentChpAAS/1/0') {
          this.bhkw = elements
          this.bhkwEnthalten = true
          allComponents.push('BHKW')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentBoilerAAS/1/0') {
          this.kesel = elements
          this.kesselEnthalten = true
          allComponents.push('Kessel')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentPelletBoilersAAS/1/0') {
          this.pellet = elements
          this.pelletEnthalten = true
          allComponents.push('Pelletkessel')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeatSupplierGeneralAAS/1/0') {
          this.wärmeerzeugerAllgemein = elements
          this.wärmeerzeugerAllgemeinEnthalten = true
          allComponents.push('Wärmeerzeuger Allgemein')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeatPumpAAS/1/0') {
          this.wärmepumpe = elements
          this.wärmepumpeEnthalten = true
          allComponents.push('Wärmepumpe')
        }
      }
      this.allComponents = allComponents
      await this.monitoringStore.setLoadingMonitoringComponent('false')
      //this.getCssInfos(allComponents)
    }
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
  }
}
</script>

<style scoped>
.cls-1 {
  stroke: #372772;
  stroke-width: 4px;
  fill: none;
  stroke-miterlimit: 10;
}

.cls-2 {
  stroke: #ff4a1c;
  stroke-width: 8px;
  fill: none;
  stroke-miterlimit: 10;
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
