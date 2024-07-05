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
          <KpisMonitoringAnlage grundfunktion="Wärme"/>
        </v-container>
        <v-container>
          <LineChartAll :allElements="this.allSes" zweiteFunktion="WärmeSpeichern"/> 
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-card
                style="border-radius: 20px; background-color: whitesmoke"
                variant="outlined" class="pa-4 anlagen-card">
                <v-card-text class="center-content">
                  <v-container class="mx-0 mx-lg-6 mx-xl-16 px-lg-6 px-xl-16">
                    <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.21 224.88">
            
                      <g id="Ebene_1-2" data-name="Ebene_1">
                        <line class="cls-2" x1="166.36" y1="144.72" x2="83.89" y2="144.72"/>
                        <path class="cls-2" d="M83.89,144.72c-3.05,0-5.52,2-5.52,4.46s2.47,4.46,5.52,4.46"/>
                        <path class="cls-2" d="M166.36,144.72c3.05,0,5.52-2,5.52-4.46s-2.47-4.46-5.52-4.46"/>
                        <line class="cls-2" x1=".5" y1="135.8" x2="166.36" y2="135.8"/>
                        <path class="cls-3" d="M166.36,153.81c3.05,0,5.52,2,5.52,4.46s-2.47,4.46-5.52,4.46"/>
                        <path class="cls-3" d="M168.76,182.7c2.46,0,4.46-2.47,4.46-5.52"/>
                        <line class="cls-3" x1="83.89" y1="162.57" x2="166.36" y2="162.57"/>
                        <path class="cls-3" d="M83.89,162.57c-3.05,0-5.52,2-5.52,4.46s2.47,4.46,5.52,4.46"/>
                        <line class="cls-3" x1="168.76" y1="171.5" x2="83.88" y2="171.5"/>
                        <path class="cls-3" d="M168.76,171.66c2.46,0,4.46,2.47,4.46,5.52"/>
                        <line class="cls-3" x1="168.76" y1="182.53" y2="182.53"/>
                        <line class="cls-2" x1="166.36" y1="153.65" x2="83.89" y2="153.65"/>
                        <path class="cls-1" d="M89.55,1.5h68.32c22,0,39.83,19.67,39.83,43.94V179.44c0,24.27-17.83,43.94-39.83,43.94H89.55c-22,0-39.83-19.67-39.83-43.94V45.44C49.72,21.17,67.55,1.5,89.55,1.5Z"/>
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
      speicher: [],
      speicherEnthalten: false,
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
        //console.log(this.allSes)
    
        if (semanticId === 'https://th-koeln.de/gart/ComponentTankAAS/1/0') {
          this.speicher = elements;
          this.speicherEnthalten = true
          allComponents.push('Speicher')
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
  stroke: #2b2a29;
}

.cls-1, .cls-2, .cls-3 {
  fill: none;
  stroke-miterlimit: 2.04;
  stroke-width: 3px;
}

.cls-2 {
  stroke: #ff4a1c;
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
