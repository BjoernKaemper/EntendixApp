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
          <LineChartAll :allElements="this.allSes" zweiteFunktion="KälteSpeichern"/> 
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-card
              style="border-radius: 20px; background-color: whitesmoke"
              variant="outlined" class="pa-4 anlagen-card">
              <v-card-text class="center-content">
                  <v-container class="mx-0 mx-lg-10 mx-xl-16 px-lg-10 px-xl-16">
                    <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.56 174.76">
                        <g id="Ebene_1-2" data-name="Ebene_1">
                            <path class="cls-2" d="M32.34,1.5h52.89c17.03,0,30.84,15.23,30.84,34.02v103.73c0,18.79-13.81,34.02-30.84,34.02H32.34c-17.03,0-30.84-15.23-30.84-34.02V35.52C1.5,16.73,15.31,1.5,32.34,1.5Z"/>
                            <line class="cls-2" x1="1.5" y1="32.34" x2="116.06" y2="32.34"/>
                            <line class="cls-2" x1="1.5" y1="142.43" x2="116.06" y2="142.43"/>
                            <circle class="cls-4" cx="59.01" cy="122.93" r="10.98"/>
                            <g id="_1596143231952" data-name=" 1596143231952">
                            <line class="cls-1" x1="33.2" y1="74.3" x2="82.6" y2="74.3"/>
                            <line class="cls-1" x1="40.57" y1="74.3" x2="37.37" y2="68.74"/>
                            <line class="cls-1" x1="40.57" y1="74.56" x2="37.37" y2="80.12"/>
                            <line class="cls-3" x1="40.3" y1="73.82" x2="40.23" y2="74.57"/>
                            <line class="cls-1" x1="75.92" y1="74.3" x2="79.13" y2="68.74"/>
                            <line class="cls-1" x1="75.92" y1="74.56" x2="79.13" y2="80.12"/>
                            <line class="cls-3" x1="76.19" y1="73.82" x2="76.27" y2="74.57"/>
                            <line class="cls-1" x1="57.77" y1="99.13" x2="57.77" y2="49.73"/>
                            <line class="cls-1" x1="57.77" y1="91.76" x2="52.21" y2="94.97"/>
                            <line class="cls-1" x1="58.03" y1="91.76" x2="63.59" y2="94.97"/>
                            <line class="cls-3" x1="57.3" y1="92.03" x2="58.04" y2="92.11"/>
                            <line class="cls-1" x1="57.77" y1="56.41" x2="52.21" y2="53.2"/>
                            <line class="cls-1" x1="58.03" y1="56.41" x2="63.59" y2="53.2"/>
                            <line class="cls-3" x1="57.3" y1="56.14" x2="58.04" y2="56.06"/>
                            <line class="cls-1" x1="40.34" y1="91.8" x2="75.28" y2="56.87"/>
                            <line class="cls-1" x1="45.56" y1="86.59" x2="39.36" y2="84.93"/>
                            <line class="cls-1" x1="45.74" y1="86.77" x2="47.4" y2="92.97"/>
                            <line class="cls-3" x1="45.03" y1="86.45" x2="45.5" y2="87.03"/>
                            <line class="cls-1" x1="70.55" y1="61.6" x2="68.89" y2="55.4"/>
                            <line class="cls-1" x1="70.73" y1="61.78" x2="76.93" y2="63.44"/>
                            <line class="cls-3" x1="70.41" y1="61.07" x2="70.99" y2="61.54"/>
                            <line class="cls-1" x1="75.76" y1="91.99" x2="40.83" y2="57.06"/>
                            <line class="cls-1" x1="70.55" y1="86.77" x2="68.89" y2="92.97"/>
                            <line class="cls-1" x1="70.73" y1="86.59" x2="76.93" y2="84.93"/>
                            <line class="cls-3" x1="70.41" y1="87.31" x2="70.99" y2="86.83"/>
                            <line class="cls-1" x1="45.56" y1="61.78" x2="39.36" y2="63.44"/>
                            <line class="cls-1" x1="45.74" y1="61.6" x2="47.4" y2="55.4"/>
                            <line class="cls-3" x1="45.03" y1="61.92" x2="45.5" y2="61.35"/>
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
      eisspeicher: [],
      eisspeicherEnthalten: false,   
      eisspeicherAnschluss: [],
      eissspeicherAnschlussEnthalten: false,
      kmz: [],
      kmzEnthalten: false,
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
            let value = this.monitoringStore.checkvalue(elementData.presentValue)
            elementData.presentValue = value
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
    
        if (semanticId === 'https://th-koeln.de/gart/ComponentIceTankAAS/1/0') {
          this.eisspeicher = elements;
          this.eisspeicherEnthalten = true
          allComponents.push('Eisspeicher')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentIceTankConnectionAAS/1/0') {
          this.eisspeicherAnschluss = elements;
          this.eissspeicherAnschlussEnthalten = true
          allComponents.push('Eisspeicheranschluss')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentRefrigerationMeterAAS/1/0') {
          this.kmz = elements;
          this.kmzEnthalten = true
          allComponents.push('Kältemengenzähler')
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
stroke-width: 2px;
}

.cls-1, .cls-2, .cls-3, .cls-4 {
fill: none;
stroke-miterlimit: 1.91;
}

.cls-1, .cls-3 {
stroke: #372772;
}

.cls-2 {
stroke: #2b2a29;
stroke-width: 3px;
}

.cls-3 {
stroke-width: .57px;
}

.cls-4 {
stroke: #ff4a1c;
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
