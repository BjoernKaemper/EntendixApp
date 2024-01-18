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
                    <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 171.95 139.79">
            
                        <path class="cls-5" d="M2,111.16V13.65C2,7.24,7.24,2,13.65,2H158.27c6.43,0,11.68,5.24,11.68,11.65V111.16c0,6.41-5.24,11.68-11.68,11.68H13.65c-6.41,0-11.65-5.27-11.65-11.68h0Z"/>
                        <line class="cls-5" x1="120.86" y1="2" x2="120.86" y2="122.84"/>
                        <path class="cls-2" d="M60.96,109.49c25.94,0,47.08-21.15,47.08-47.08S86.9,15.35,60.96,15.35,13.9,36.5,13.9,62.4s21.15,47.08,47.06,47.08h0Z"/>
                        <path class="cls-3" d="M68.36,62.6c6.01-.77,11.99-1.53,16.95-1.64,4.93-.11,8.82,.43,11.48,1.22,2.69,.77,4.14,1.76,4.99,2.92,.85,1.13,1.11,2.41,1.02,3.46-.09,1.08-.51,1.93-1.53,2.81-.99,.85-2.61,1.76-5.7,2.21-3.12,.43-7.74,.37-12.76-.99-4.99-1.39-10.35-4.08-15.7-6.77"/>
                        <path class="cls-3" d="M60.22,55.12c-.77-6.01-1.53-11.99-1.64-16.95-.11-4.93,.45-8.82,1.22-11.51,.77-2.66,1.76-4.11,2.92-4.96,1.13-.88,2.41-1.11,3.49-1.02,1.05,.09,1.9,.51,2.78,1.53,.88,.99,1.79,2.61,2.21,5.7,.43,3.12,.37,7.74-.99,12.73-1.39,5.02-4.08,10.35-6.77,15.7"/>
                        <path class="cls-3" d="M53.05,63.96c-5.98,.77-11.99,1.53-16.92,1.62-4.96,.11-8.84-.43-11.51-1.19-2.69-.79-4.14-1.79-4.99-2.92-.85-1.13-1.11-2.44-1.02-3.49,.09-1.05,.51-1.9,1.53-2.78,1.02-.88,2.61-1.79,5.73-2.21,3.09-.43,7.74-.4,12.73,.99,4.99,1.36,10.35,4.05,15.7,6.77"/>
                        <path class="cls-3" d="M60.85,69.94c.77,6.01,1.53,11.99,1.64,16.95,.11,4.93-.45,8.82-1.22,11.51-.77,2.66-1.79,4.11-2.92,4.99-1.13,.85-2.41,1.08-3.49,.99-1.05-.09-1.9-.51-2.78-1.53-.88-.99-1.79-2.61-2.21-5.7-.43-3.12-.37-7.74,.99-12.73s4.08-10.35,6.77-15.7"/>
                        <line class="cls-1" x1="127.37" y1="33.29" x2="162.81" y2="33.29"/>
                        <line class="cls-1" x1="127.37" y1="38.96" x2="162.81" y2="38.96"/>
                        <line class="cls-1" x1="127.37" y1="44.63" x2="162.81" y2="44.63"/>
                        <line class="cls-1" x1="127.37" y1="50.3" x2="162.81" y2="50.3"/>
                        <path class="cls-4" d="M22.15,122.84h21.86v11.48c0,2.18-1.79,3.97-3.97,3.97h-13.92c-2.18,0-3.97-1.79-3.97-3.97,0,0,0-11.48,0-11.48Z"/>
                        <path class="cls-4" d="M129.59,122.84h21.86v11.48c0,2.18-1.79,3.97-3.97,3.97h-13.92c-2.18,0-3.97-1.79-3.97-3.97v-11.48Z"/>
                        <path class="cls-6" d="M56.34,56.99c3-2.52,7.48-2.13,9.98,.88,2.52,3,2.13,7.46-.88,9.98-2.98,2.52-7.46,2.13-9.98-.88s-2.13-7.46,.88-9.98h0Z"/>
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
      kälteAnlage: [],
      kälteAnlageEnthalten: false,
      kältekreisAllgemein: [],
      kältekreisAllgemeinEnthalten: false,
      kältemaschine: [],
      kältemaschineEnthalten: false,
      kmz: [],
      kmzEnthalten: false,
      klappe: [],
      klappeEnthalten: false,
      pumpe: [],
      pumpeEnthalten: false,
      regler: [],
      reglerEnthalten: false,
      rkw: [],
      rkwEnthalten: false,
      rücklauf: [],
      rücklaufEnthalten: false,
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
    
        if (semanticId === 'https://th-koeln.de/gart/ComponentRefrigerationSystemAAS/1/0') {
          this.kälteAnlage = elements;
          this.kälteAnlageEnthalten = true
          allComponents.push('Kälteanlage')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentRefrigerationCircuitGeneralAAS/1/0') {
          this.kältekreisAllgemein = elements;
          this.kältekreisAllgemeinEnthalten = true
          allComponents.push('Kältekreis Allgemein')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentRefrigerationMachineAAS/1/0') {
          this.kältemaschine = elements;
          this.kältemaschineEnthalten = true
          allComponents.push('Kältemaschine')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentRefrigerationMeterAAS/1/0') {
          this.kmz = elements;
          this.kmzEnthalten = true
          allComponents.push('Kältemengenzähler')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFlapAAS/1/0') {
          this.klappe = elements;
          this.klappeEnthalten = true
          allComponents.push('Klappe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentPumpAAS/1/0') {
          this.pumpe = elements;
          this.pumpeEnthalten = true
          allComponents.push('Pumpe')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentControllerAAS/1/0') {
          this.regler = elements;
          this.reglerEnthalten = true
          allComponents.push('Regler')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentRecoolingPlantAAS/1/0') {
          this.rkw = elements;
          this.rkwEnthalten = true
          allComponents.push('Rückkühlwerk')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentReturnAAS/1/0') {
          this.rücklauf = elements;
          this.rücklaufEnthalten = true
          allComponents.push('Rücklauf')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentValveAAS/1/0') {
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

<style>

.cls-1 {
stroke-width: 1.5px;
}

.cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6 {
fill: none;
stroke-miterlimit: 10;
}

.cls-1, .cls-3 {
stroke: #372870;
}

.cls-2, .cls-3, .cls-6 {
stroke-width: 2.01px;
}

.cls-2, .cls-4, .cls-5 {
stroke: #141515;
}

.cls-4 {
stroke-width: 3px;
}

.cls-5 {
stroke-width: 4px;
}

.cls-6 {
stroke: #e94d29;
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
