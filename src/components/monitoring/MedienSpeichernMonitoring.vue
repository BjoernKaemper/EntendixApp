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
        <KpisMonitoringAnlage grundfunktion="Medien" />
      </v-container>
      <v-container>
        <LineChartAll :allElements="this.allSes" zweiteFunktion="MedienSpeichern" />
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
                    viewBox="0 0 117.56 174.76"
                  >
                    <g id="Ebene_1-2" data-name="Ebene_1">
                      <path
                        class="cls-1"
                        d="M32.34,1.5h52.89c17.03,0,30.84,15.23,30.84,34.02v103.73c0,18.79-13.81,34.02-30.84,34.02H32.34c-17.03,0-30.84-15.23-30.84-34.02V35.52C1.5,16.73,15.31,1.5,32.34,1.5Z"
                      />
                      <line class="cls-1" x1="1.5" y1="32.34" x2="116.06" y2="32.34" />
                      <line class="cls-1" x1="1.5" y1="142.43" x2="116.06" y2="142.43" />
                      <path
                        class="cls-3"
                        d="M71.72,62.08c-.02,1.86-1.24,4.37-3.98,5.01-.19,.04-.36-.12-.32-.31,.53-2.48,2.62-16.07-13.32-24.68-.39-.21-.83,.17-.67,.58,1.12,2.93,2.97,10.77-4.9,18.91-6.1,6.31-11.1,12.35-11.1,20.05s4.68,15.51,13.64,18.19c.43,.13,.71-.45,.34-.7-2.41-1.64-4.33-4.23-4.87-7.9-.75-5.15,1.06-8.79,2.02-10.3,.16-.25,.55-.17,.58,.13,.13,1.18,.65,3.22,2.61,4.25,.3,.16,.65-.09,.61-.42-.32-2.42-.75-10.38,5.93-16.84,.21-.2,.55-.04,.54,.24-.09,1.88,.15,6.65,4.39,10.13,3.41,2.8,6.86,6.3,6.86,12.07,0,3.33-1.44,6.33-3.93,8.33-.35,.28-.05,.83,.37,.69,8.7-2.96,13.27-10.51,13.59-18.13,.36-8.46-2.78-15.53-7.61-19.66-.3-.26-.78-.05-.78,.35h0Z"
                      />
                      <circle class="cls-2" cx="59.01" cy="122.93" r="10.98" />
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
      speicher: [],
      speicherEnthalten: false,

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

        if (semanticId === 'https://th-koeln.de/gart/ComponentTankAAS/1/0') {
          this.speicher = elements
          this.speicherEnthalten = true
          allComponents.push('Speicher')
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
  stroke: #2b2a29;
  stroke-width: 3px;
}

.cls-1,
.cls-2 {
  fill: none;
  stroke-miterlimit: 1.91;
}

.cls-3 {
  fill: #ff4a1c;
}

.cls-2 {
  stroke: #372772;
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
