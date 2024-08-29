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
        <LineChartAll :allElements="this.allSes" zweiteFunktion="MedienVerteilen" />
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
                    viewBox="0 0 202.32 117.16"
                  >
                    <g id="Ebene_1-2" data-name="Ebene_1">
                      <g id="_1699567178896" data-name=" 1699567178896">
                        <path class="cls-1" d="M1.34,105.1c15.04-13.62,28.35-13.62,39.93,0" />
                        <path class="cls-1" d="M81.15,104.94c-15.04,13.63-28.35,13.63-39.93,0" />
                        <path class="cls-1" d="M81.1,105.1c15.04-13.62,28.35-13.62,39.93,0" />
                        <path class="cls-1" d="M160.91,104.94c-15.04,13.63-28.35,13.63-39.93,0" />
                        <path class="cls-1" d="M160.87,105.1c15.04-13.62,28.35-13.62,39.93,0" />
                      </g>
                      <circle class="cls-2" cx="105.53" cy="37.93" r="35.93" />
                      <polyline class="cls-2" points="172.45 57.08 172.45 17.63 155.28 17.63" />
                      <polyline class="cls-2" points="172.45 17.63 172.45 57.08 155.39 57.08" />
                      <path class="cls-2" d="M157.38,17.63c-.57,6.6-3.54,9.73-8.91,9.39" />
                      <path class="cls-2" d="M157.33,59.19c-.57-6.6-3.54-9.73-8.91-9.39" />
                      <line class="cls-2" x1="150.59" y1="27.01" x2="150.33" y2="49.79" />
                      <rect class="cls-3" x="86.29" y="22.48" width="38.5" height="9.98" />
                      <circle class="cls-3" cx="105.06" cy="51.69" r="7.9" />
                      <polyline class="cls-2" points="38.15 57.08 38.15 17.63 55.32 17.63" />
                      <polyline class="cls-2" points="38.15 17.63 38.15 57.08 55.21 57.08" />
                      <path class="cls-2" d="M53.22,17.63c.57,6.6,3.54,9.73,8.91,9.39" />
                      <path class="cls-2" d="M53.27,59.19c.57-6.6,3.54-9.73,8.91-9.39" />
                      <line class="cls-2" x1="60.01" y1="27.01" x2="60.27" y2="49.79" />
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
      druckhaltestation: [],
      druckhaltestationEnthalten: false,
      hygienespülung: [],
      hygienespülungEnthalten: false,
      kraftstoffpumpe: [],
      kraftstoffpumpeEnthalten: false,
      rohrbegleitheizung: [],
      rohrbegleitheizungEnthalten: false,
      ventil: [],
      ventilEnthalten: false,
      wasserzähler: [],
      wasserzählerEnthalten: false,
      zirkulationAllgemein: [],
      zirkulationAllgemeinEnthalten: false,
      zirkulationspumpe: [],
      zirkulationspumpeEnthalten: false,
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
      let allSE = []
      let allComponents = []
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
        let elements = []

        for (let element in allElements) {
          const dataContent = allElements[element]
          let elementData = {
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
          let value = this.monitoringStore.checkvalue(elementData.presentValue)
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

        if (semanticId === 'https://th-koeln.de/gart/ComponentPressurizationStationAAS/1/0') {
          this.druckhaltestation = elements
          this.druckhaltestationEnthalten = true
          allComponents.push('Druckhaltestation')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHygieneFlushingAAS/1/0') {
          this.hygienespülung = elements
          this.hygienespülungEnthalten = true
          allComponents.push('Hygienespülung')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFuelPumpAAS/1/0') {
          this.kraftstoffpumpe = elements
          this.kraftstoffpumpeEnthalten = true
          allComponents.push('Kraftstoffpumpe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentPipeHeatingAAS/1/0') {
          this.rohrbegleitheizung = elements
          this.rohrbegleitheizungEnthalten = true
          allComponents.push('Rohrbegleitheizung')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentValveAAS/1/0') {
          this.ventil = elements
          this.ventilEnthalten = true
          allComponents.push('Ventil')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentWaterMeterAAS/1/0') {
          this.wasserzähler = elements
          this.wasserzählerEnthalten = true
          allComponents.push('Wasserzähler')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentCirculationgeneralAAS/1/0') {
          this.zirkulationAllgemein = elements
          this.zirkulationAllgemeinEnthalten = true
          allComponents.push('Zirkulation Allgemein')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentCirculationPumpAAS/1/0') {
          this.zirkulationspumpe = elements
          this.zirkulationspumpeEnthalten = true
          allComponents.push('Zirkulationspumpe')
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
}

.cls-1,
.cls-2 {
  stroke-width: 4px;
}

.cls-1,
.cls-2,
.cls-3 {
  fill: none;
  stroke-miterlimit: 10;
}

.cls-2 {
  stroke: #2b2a29;
}

.cls-3 {
  stroke: #ff4a1c;
  stroke-width: 2px;
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
