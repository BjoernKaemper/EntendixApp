<template>
  <div>
    <v-container v-if="monitoringStore.loadingMonitoringComponent === true">
      <v-progress-linear indeterminate color="success" />
    </v-container>
    <v-container
      v-else-if="monitoringStore.loadingMonitoringComponent === false"
      class="my-4 justify-center align-center"
    >
      <v-container>
        <KpisMonitoringAnlage grundfunktion="Kälte" />
      </v-container>
      <v-container>
        <LineChartAll :allElements="this.allSes" zweiteFunktion="KälteSpeichern" />
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
                    viewBox="0 0 214.58 237.26"
                  >
                    <g id="Ebene_1-2" data-name="Ebene_1">
                      <path
                        class="cls-3"
                        d="M91.85,29.58c-10.76,1.8-21.44,6.98-29.91,12.9-13.35,9.33-24.49,24.14-29.75,42.13-2.51,8.61-2.95,16.06-2.95,25.58v43.07c.04,3.85-.5,2.76-2.28,4.98-1,1.25-2.31,2.78-3.37,3.9-5.37,5.71-8.62,8.89-8.75,20.13-2.73,1.63-5.43,1.61-8.99,6.08-7.81,9.81-2.7,25.16,10.4,27.65,4.31,.82,53.16,.05,60.46,.32,3.8,18.93,32.02,27.5,50.26,15.15,4.34-2.94,9.63-8.33,10.77-15.16,6.33-.14,56.51,.46,60.47-.3,13.36-2.58,18.11-18.05,10.41-27.66-2.63-3.28-4.65-4.22-9.28-6.11-.07-5.02-.36-7.96-2.35-11.93-1.89-3.76-5.56-6.98-7.88-9.88-.57-.71-1.09-1.1-1.68-1.81-2.66-3.14-2.53-2.1-2.51-4.77v-43.08c.01-17.91-2.81-30.48-11.8-45.51-1.77-2.97-3.94-5.98-5.92-8.34-3.77-4.51-3.85-4.11-7.03-7.52-7.75-8.31-25.98-18.43-37.88-19.78,.72-2.19,2.92-3.98,3.35-9.63C126.43,9.76,118.51,.09,107.26,0c-13.63-.11-22,13.41-17.65,25.11,.7,1.87,1.66,3,2.25,4.47h0Z"
                      />
                      <path
                        class="cls-1"
                        d="M24.04,181.77l166.12,.04c0-5.41-.91-7.38-3.61-10.37l-9.93-11.31c-1.09-1.73-.86-3.86-.86-6.29v-42.78c0-9.64-.6-16.79-3.3-25.34-8.01-25.38-32.27-48.46-65.22-48.51-33.47-.05-57.63,22.62-65.66,48.04-2.72,8.59-3.17,15.6-3.17,25.22v42.78c0,6.37,.67,5.43-3.93,10.47-2.39,2.61-4.5,4.93-6.71,7.54-2.68,3.18-3.91,4.78-3.74,10.49h0Z"
                      />
                      <path
                        class="cls-1"
                        d="M17.55,191.23c-7.63,1.78-8.32,12.22-1.33,15.23,3.03,1.31,20.54,.67,25.27,.67H184.08c2.91,0,10.56,.35,12.92-.21,7.64-1.82,8.03-12.35,1.34-15.25-3.03-1.32-20.55-.68-25.33-.68H30.43c-3.1,0-10.34-.34-12.88,.25h0Z"
                      />
                      <path
                        class="cls-2"
                        d="M40.52,16.29c-10.29,4.01-22.71,16.33-28.09,24.11C6.66,48.76,2.62,57.24,.43,67.7c-.83,3.99,1.93,7.32,5.78,6.05,3.4-1.12,3.14-4.59,4.27-8.53,4.52-15.74,14.63-28.54,28.05-37.42,2.33-1.54,6.7-3.41,7.53-5.56,1.39-3.6-2.12-7.29-5.55-5.95Z"
                      />
                      <path
                        class="cls-2"
                        d="M174.29,17.1c-1.39,.65-2.49,1.51-2.71,3.5-.48,4.33,3.96,5.21,9.24,9.34,4.92,3.85,8.86,7.42,12.7,12.03,14.31,17.17,9.67,27.19,13.13,30.23,1.18,1.04,3.23,1.55,5.05,.72,3.43-1.58,2.66-5.55,2.12-9.05-2.84-18.3-16.32-33.7-30.82-43.67-1.99-1.37-5.49-4.61-8.71-3.1h0Z"
                      />
                      <path
                        class="cls-1"
                        d="M128.09,216.3h-41.67c1.61,7.03,12.52,11.84,20.84,11.83,8.3,0,19-4.6,20.84-11.83h0Z"
                      />
                      <path
                        class="cls-2"
                        d="M171.82,47.06c13.53,9.87,9.52,21.51,11.78,24.91,1.9,2.85,6.43,2.61,7.94-.56,2.13-4.45-1.91-16.49-3.74-19.92-2.54-4.75-7.45-10.51-11.87-12.51-.68,.6-3.95,7.01-4.11,8.08h0Z"
                      />
                      <path
                        class="cls-2"
                        d="M42.7,47.06c-.1-1.05-3.42-7.48-4.12-8.09-4.41,2.01-9.34,7.85-11.87,12.52-1.78,3.3-5.89,15.49-3.75,19.91,1.54,3.17,6.02,3.49,7.94,.58,2.14-3.23-1.53-15.48,11.79-24.92Z"
                      />
                      <path
                        class="cls-1"
                        d="M104.99,9.46c-12.47,3.14-7.61,21.21,4.28,18.36,4.33-1.04,8.36-5.57,7.02-11.33-1.04-4.44-5.61-8.46-11.3-7.03h0Z"
                      />
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
import { useGeneralStore } from '@/store/general';
import { useMonitoringStore } from '@/store/monitoring';
import { useDigitalTwinsStore } from '@/store/digitaltwins';
import AnlagenMonitoringCard from '@/components/monitoring/AnlagenMonitoringCard.vue';
import LineChartAll from '@/components/monitoring/LineChartAll.vue';
import KpisMonitoringAnlage from '@/components/monitoring/KpisMonitoringAnlage.vue';

export default {
  data() {
    return {
      viewBox: '0 0 400 120', // Adjust the viewBox dimensions to fit your image
      bsk: [],
      bskEnthalten: false,
      bma: [],
      bmaEnthalten: false,
      entrauchung: [],
      entrauchungEnthalten: false,
      entrauchungVentilator: [],
      entrauchungVentilatorEnthalten: false,
      einbruch: [],
      einbruchEnthalten: false,
      feuerlösch: [],
      feuerlöschEnthalten: false,
      gaswarnanlage: [],
      gaswarnanlageEnthalten: false,
      notruf: [],
      notrufEnthalten: false,
      rauchmeldeanlage: [],
      rauchmeldeanlageEnthalten: false,
      komponenteZeigen: [],
      allComponents: null,
      allSes: null,
    };
  },
  components: {
    AnlagenMonitoringCard,
    KpisMonitoringAnlage,
    LineChartAll,
  },
  props: {
    anlage: Object,
  },
  mounted() {
    this.getSubmodelInformations();
  },
  computed: {
    generalStore() {
      return useGeneralStore();
    },
    monitoringStore() {
      return useMonitoringStore();
    },
    digitalTwinStore() {
      return useDigitalTwinsStore();
    },
  },
  methods: {
    async getSubmodelInformations() {
      await this.monitoringStore.setLoadingMonitoringComponent('true');
      const allSE = [];
      const allComponents = [];
      for (const komponente in this.anlage) {
        const { aasId, semanticId } = this.anlage[komponente];
        // let component = components[komponente]
        // console.log(component)
        // const semanticId = anlage.semanticId
        const submodelId = 'OperatingInformation';
        // const submodel = await this.generalStore.getSubmodel(aasId, submodelId)
        // const submodelElements = submodel.submodelElements;
        // console.log(submodelElements)
        const allElements = await this.generalStore.getAllSubmodelElementValues(aasId, submodelId);
        // console.log(allElements)
        const elements = [];

        for (const element in allElements) {
          const dataContent = allElements[element];
          const elementData = {
            aasId,
            submodelName: submodelId,
            idShort: element,
            presentValue: dataContent[0].PresentValue,
            // 'name': dataContent[2].DataSource,
            // 'semanticId': element.semanticId.keys[0].value
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
            anlageScore: dataContent[2].DataSource[4].PredictionAnlage[0].LabelResult[1].LabelScore,
          };
          // console.log(elementData)
          elements.push(elementData);
        }

        if (this.komponenteZeigen.length === 0) {
          this.komponenteZeigen = elements;
        }

        allSE.push({
          anlagenInformation: this.anlage[komponente],
          elements,
        });

        this.allSes = allSE;
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

        if (semanticId === 'https://th-koeln.de/gart/ComponentFireAlarmSystemAAS/1/0') {
          this.bma = elements;
          this.bmaEnthalten = true;
          allComponents.push('Brandmeldeanlage');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFireShutterAAS/1/0') {
          this.bsk = elements;
          this.bskEnthalten = true;
          allComponents.push('Brandschutzklappe');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentIntruderAlarmSystemAAS/1/0') {
          this.einbruch = elements;
          this.einbruchEnthalten = true;
          allComponents.push('Einbruchmeldeanlage');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSmokeExtractionFanAAS/1/0') {
          this.entrauchungVentilator = elements;
          this.entrauchungVentilatorEnthalten = true;
          allComponents.push('Entrauchung Ventilator');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSmokeExtractionAAS/1/0') {
          this.entrauchung = elements;
          this.entrauchungEnthalten = true;
          allComponents.push('Entrauchung');
        } else if (
          semanticId === 'https://th-koeln.de/gart/ComponentFireExtinguishingSystemAAS/1/0'
        ) {
          this.feuerlösch = elements;
          this.feuerlöschEnthalten = true;
          allComponents.push('Feuerlöschanlage');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentGasWarningSystemAAS/1/0') {
          this.gaswarnanlage = elements;
          this.gaswarnanlageEnthalten = true;
          allComponents.push('Gaswarnanlage');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentEmergencyCallAAS/1/0') {
          this.notruf = elements;
          this.notrufEnthalten = true;
          allComponents.push('Notruf');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSmokeAlarmSystemAAS/1/0') {
          this.rauchmeldeanlage = elements;
          this.rauchmeldeanlageEnthalten = true;
          allComponents.push('Rauchmeldeanlage');
        }
      }

      this.allComponents = allComponents;
      await this.monitoringStore.setLoadingMonitoringComponent('false');
      // this.getCssInfos(allComponents)
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
  fill: #fff;
}

.cls-1,
.cls-2,
.cls-3 {
  fill-rule: evenodd;
}

.cls-2 {
  fill: #ff4a1c;
  stroke: #ff4a1c;
  stroke-miterlimit: 1.41;
  stroke-width: 0.57px;
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
