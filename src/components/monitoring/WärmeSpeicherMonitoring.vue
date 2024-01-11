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
                    <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202.21 230.5">
            
                        <g id="Ebene_1-2" data-name="Ebene_1">
                            <path class="cls-2" d="M83,2h86.41c17,0,30.79,13.37,30.79,29.86V198.64c0,16.49-13.78,29.86-30.79,29.86H83c-17,0-30.79-13.37-30.79-29.86V31.86c0-16.49,13.78-29.86,30.79-29.86Z"/>
                            <polygon class="cls-3" points="89.53 149.84 167.93 149.84 167.93 153.84 89.53 153.84 89.53 149.84"/>
                            <path class="cls-3" d="M84.49,156.08h-.4l.04-1.28,.07-.72,.06-.42,.07-.3,.07-.25,.08-.23,.09-.21,.1-.2,.11-.2,.12-.19,.13-.18,.14-.18,.15-.17,.16-.16,.17-.16,.18-.15,.18-.14,.19-.13,.2-.13,.21-.12,.21-.11,.22-.1,.23-.09,.23-.09,.24-.08,.24-.07,.25-.06,.25-.05,.26-.04,.26-.03,.27-.02h.27s0,3.99,0,3.99h-.27s-.27,.02-.27,.02l-.26,.03-.26,.04-.25,.05-.25,.06-.24,.07-.24,.08-.23,.08-.22,.09-.22,.1-.21,.11-.2,.12-.2,.13-.19,.13-.18,.14-.17,.15-.16,.15-.15,.16-.14,.16-.13,.17-.12,.17-.11,.18-.1,.18-.09,.18-.07,.18-.06,.17-.04,.16-.03,.12h0s.02-.28,.02-.28l.02-.84h0Zm5.04,2.24v4h-.27s-.27-.02-.27-.02l-.26-.03-.26-.04-.25-.05-.25-.06-.24-.07-.24-.08-.23-.09-.23-.09-.22-.1-.21-.11-.21-.12-.2-.13-.19-.13-.18-.14-.18-.15-.17-.16-.16-.16-.15-.17-.14-.18-.13-.18-.12-.19-.11-.2-.1-.2-.09-.21-.08-.23-.07-.25-.07-.3-.06-.42-.07-.72-.04-1.28h.4l-.02-.84-.02-.28h0s.03,.12,.03,.12l.04,.16,.06,.17,.07,.18,.09,.18,.1,.18,.11,.18,.12,.17,.13,.17,.14,.16,.15,.16,.16,.15,.17,.15,.18,.14,.19,.13,.2,.13,.2,.12,.21,.11,.22,.1,.22,.09,.23,.08,.24,.08,.24,.07,.25,.06,.25,.05,.26,.04,.26,.03,.27,.02h.27s0,0,0,0Z"/>
                            <path class="cls-3" d="M172.98,147.6h.4l-.04,1.28-.07,.72-.06,.42-.07,.3-.07,.25-.08,.23-.09,.21-.1,.2-.11,.2-.12,.19-.13,.18-.14,.18-.15,.17-.16,.16-.17,.16-.18,.15-.18,.14-.19,.13-.2,.13-.21,.12-.21,.11-.22,.1-.23,.09-.23,.09-.24,.08-.24,.07-.25,.06-.25,.05-.26,.04-.26,.03-.27,.02h-.27s0-3.99,0-3.99h.27s.27-.02,.27-.02l.26-.03,.26-.04,.25-.05,.25-.06,.24-.07,.24-.08,.23-.08,.22-.09,.22-.1,.21-.11,.2-.12,.2-.13,.19-.13,.18-.14,.17-.15,.16-.15,.15-.16,.14-.16,.13-.17,.12-.17,.11-.18,.1-.18,.09-.18,.08-.18,.06-.17,.04-.16,.03-.12h0s-.02,.28-.02,.28l-.02,.84h0Zm-5.04-2.24v-4h.27s.27,.02,.27,.02l.26,.03,.26,.04,.25,.05,.25,.06,.24,.07,.24,.08,.23,.09,.23,.09,.22,.1,.21,.11,.21,.12,.2,.13,.19,.13,.18,.14,.18,.15,.17,.16,.16,.16,.15,.17,.14,.18,.13,.18,.12,.19,.11,.2,.1,.2,.09,.21,.08,.23,.07,.25,.07,.3,.06,.42,.07,.72,.04,1.28h-.4l.02,.84,.02,.28h0s-.03-.12-.03-.12l-.04-.16-.06-.17-.08-.18-.09-.18-.1-.18-.11-.18-.12-.17-.13-.17-.14-.16-.15-.16-.16-.15-.17-.15-.18-.14-.19-.13-.2-.13-.2-.12-.21-.11-.22-.1-.22-.09-.23-.08-.24-.08-.24-.07-.25-.06-.25-.05-.26-.04-.26-.03-.27-.02h-.27s0,0,0,0Z"/>
                            <polygon class="cls-3" points="167.93 145.35 4 145.35 4 141.35 167.93 141.35 167.93 145.35"/>
                            <path class="cls-1" d="M167.93,160.48c2.9,0,5.24,1.9,5.24,4.24s-2.35,4.24-5.24,4.24"/>
                            <path class="cls-1" d="M170.21,187.94c2.34,0,4.24-2.35,4.24-5.24"/>
                            <line class="cls-1" x1="89.53" y1="168.81" x2="167.93" y2="168.81"/>
                            <path class="cls-1" d="M89.53,168.81c-2.9,0-5.24,1.9-5.24,4.24s2.35,4.24,5.24,4.24"/>
                            <line class="cls-1" x1="167.93" y1="177.29" x2="89.53" y2="177.29"/>
                            <path class="cls-1" d="M170.21,177.45c2.34,0,4.24,2.35,4.24,5.24"/>
                            <line class="cls-1" x1="167.93" y1="187.78" y2="187.78"/>
                            <polygon class="cls-3" points="89.53 158.32 167.93 158.32 167.93 162.32 89.53 162.32 89.53 158.32"/>
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
        //console.log(this.allSes)
    
        if (semanticId === 'https://th-koeln.de/gart/ComponentTankAAS/1/0') {
          this.speicher = elements;
          this.speicherEnthalten = true
          allComponents.push('Speicher')
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentBoilerAAS/1/0') {
          this.kesel = elements;
          this.kesselEnthalten = true
          allComponents.push('Kessel')
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
    stroke: #372772;
    stroke-dasharray: 0 0 4 4;
}

.cls-1, .cls-2 {
    fill: none;
    stroke-miterlimit: 10;
    stroke-width: 4px;
}

.cls-2 {
    stroke: #2b2a29;
}

.cls-3 {
    fill: #ff4a1c;
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
