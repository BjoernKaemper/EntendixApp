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
        <KpisMonitoringAnlage grundfunktion="Luft" />
      </v-container>
      <v-container>
        <LineChartAll :allElements="this.allSes" zweiteFunktion="LuftBereitstellen" />
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="5">
            <v-card
              style="border-radius: 20px; background-color: whitesmoke"
              variant="outlined"
              class="pa-4 anlagen-card"
            >
              <v-card-text class="center-content">
                <svg
                  id="Ebene_1"
                  data-name="Ebene 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 519.14 160.95"
                >
                  <g id="Ebene_1-2" data-name="Ebene_1">
                    <rect
                      id="außenluftfilter"
                      class="cls-1"
                      x="55.18"
                      y="112.81"
                      width="31.87"
                      height="47.63"
                      @click="handleAreaClick('Außenluftfilter')"
                    />
                    <polyline
                      class="cls-4"
                      points="71.12 160.44 87.06 136.63 71.12 112.81"
                      @click="handleAreaClick('Außenluftklappe')"
                    />
                    <rect
                      id="außenluftklappe"
                      class="cls-1"
                      x=".5"
                      y="112.81"
                      width="26.34"
                      height="47.63"
                    />
                    <circle class="cls-5" cx="13.45" cy="122.45" r="4.25" />
                    <circle class="cls-5" cx="13.45" cy="150.8" r="4.25" />
                    <line class="cls-4" x1="8.4" y1="128.25" x2="13.45" y2="122.45" />
                    <line class="cls-4" x1="18.5" y1="145" x2="13.45" y2="150.8" />
                    <line class="cls-4" x1="13.45" y1="122.45" x2="18.5" y2="116.65" />
                    <line class="cls-4" x1="8.4" y1="156.6" x2="13.45" y2="150.8" />
                    <rect
                      id="wrg"
                      class="cls-1"
                      x="115.41"
                      y=".5"
                      width="31.69"
                      height="159.94"
                      @click="handleAreaClick('WRG')"
                    />
                    <circle class="cls-3" cx="131.38" cy="80.28" r="7.8" />
                    <line class="cls-4" x1="147.09" y1=".5" x2="115.41" y2="160.44" />
                    <line class="cls-4" x1="115.41" y1=".5" x2="147.09" y2="160.44" />
                    <rect
                      id="vorerhitzer"
                      class="cls-1"
                      x="175.44"
                      y="112.81"
                      width="31.87"
                      height="47.63"
                      @click="handleAreaClick('Erhitzer')"
                    />
                    <line class="cls-3" x1="175.44" y1="160.44" x2="207.32" y2="112.81" />
                    <rect
                      id="kühler"
                      class="cls-1"
                      x="235.66"
                      y="112.81"
                      width="31.87"
                      height="47.63"
                      @click="handleAreaClick('Kühler')"
                    />
                    <line class="cls-4" x1="235.66" y1="112.81" x2="267.54" y2="160.44" />
                    <line class="cls-4" x1="267.54" y1="112.81" x2="235.66" y2="160.44" />
                    <rect
                      id="zuluftventilator"
                      class="cls-1"
                      x="295.88"
                      y="112.81"
                      width="47.62"
                      height="47.63"
                      @click="handleAreaClick('Zuluftventilator')"
                    />
                    <circle class="cls-4" cx="319.7" cy="136.63" r="14.17" />
                    <line class="cls-4" x1="333.34" y1="140.16" x2="310.34" y2="146.95" />
                    <line class="cls-4" x1="310.34" y1="125.7" x2="333.34" y2="132.49" />
                    <rect
                      id="zuluftfilter"
                      class="cls-1"
                      x="371.86"
                      y="112.81"
                      width="31.87"
                      height="47.63"
                      @click="handleAreaClick('Zuluftfilter')"
                    />
                    <line class="cls-3" x1="371.86" y1="160.44" x2="403.73" y2="112.81" />
                    <rect
                      id="abluftfilter"
                      class="cls-1"
                      x="432.08"
                      y="112.81"
                      width="31.87"
                      height="47.63"
                      @click="handleAreaClick('Abluftfilter')"
                    />
                    <polyline class="cls-4" points="448.02 160.44 463.95 136.63 448.02 112.81" />
                    <rect class="cls-1" x="432.08" y="1.91" width="31.87" height="47.63" />
                    <polyline class="cls-4" points="448.02 49.54 432.08 25.73 448.02 1.91" />
                    <rect
                      id="abluftventilator"
                      class="cls-1"
                      x="295.88"
                      y="1.91"
                      width="47.62"
                      height="47.63"
                      @click="handleAreaClick('Abluftventilator')"
                    />
                    <circle class="cls-4" cx="319.7" cy="25.73" r="14.17" />
                    <line class="cls-4" x1="306.05" y1="29.26" x2="329.06" y2="36.05" />
                    <line class="cls-4" x1="329.06" y1="14.8" x2="306.05" y2="21.6" />
                    <rect class="cls-1" x=".5" y="112.81" width="26.34" height="47.63" />
                    <circle class="cls-5" cx="13.45" cy="122.45" r="4.25" />
                    <circle class="cls-5" cx="13.45" cy="150.8" r="4.25" />
                    <line class="cls-4" x1="8.4" y1="128.25" x2="13.45" y2="122.45" />
                    <line class="cls-4" x1="18.5" y1="145" x2="13.45" y2="150.8" />
                    <line class="cls-4" x1="13.45" y1="122.45" x2="18.5" y2="116.65" />
                    <line class="cls-4" x1="8.4" y1="156.6" x2="13.45" y2="150.8" />
                    <rect
                      id="zuluftklappe"
                      class="cls-1"
                      x="492.3"
                      y="112.81"
                      width="26.34"
                      height="47.63"
                      @click="handleAreaClick('Zuluftklappe')"
                    />
                    <circle class="cls-5" cx="505.25" cy="122.45" r="4.25" />
                    <circle class="cls-5" cx="505.25" cy="150.8" r="4.25" />
                    <line class="cls-4" x1="500.2" y1="128.25" x2="505.25" y2="122.45" />
                    <line class="cls-4" x1="510.31" y1="145" x2="505.25" y2="150.8" />
                    <line class="cls-4" x1="505.25" y1="122.45" x2="510.31" y2="116.65" />
                    <line class="cls-4" x1="500.2" y1="156.6" x2="505.25" y2="150.8" />
                    <rect
                      id="abluftklappe"
                      class="cls-1"
                      x="492.3"
                      y="112.81"
                      width="26.34"
                      height="47.63"
                      @click="handleAreaClick('Abluftklappe')"
                    />
                    <circle class="cls-5" cx="505.25" cy="122.45" r="4.25" />
                    <circle class="cls-5" cx="505.25" cy="150.8" r="4.25" />
                    <line class="cls-4" x1="500.2" y1="128.25" x2="505.25" y2="122.45" />
                    <line class="cls-4" x1="510.31" y1="145" x2="505.25" y2="150.8" />
                    <line class="cls-4" x1="505.25" y1="122.45" x2="510.31" y2="116.65" />
                    <line class="cls-4" x1="500.2" y1="156.6" x2="505.25" y2="150.8" />
                    <rect
                      class="cls-1"
                      x="491.36"
                      y="1.91"
                      width="26.34"
                      height="47.63"
                      @click="handleAreaClick('Fortluftklappe')"
                    />
                    <circle class="cls-5" cx="504.31" cy="11.55" r="4.25" />
                    <circle class="cls-5" cx="504.31" cy="39.9" r="4.25" />
                    <line class="cls-4" x1="499.26" y1="17.35" x2="504.31" y2="11.55" />
                    <line class="cls-4" x1="509.37" y1="34.1" x2="504.31" y2="39.9" />
                    <line class="cls-4" x1="504.31" y1="11.55" x2="509.37" y2="5.75" />
                    <line class="cls-4" x1="499.26" y1="45.7" x2="504.31" y2="39.9" />
                    <rect class="cls-1" x="491.36" y="1.91" width="26.34" height="47.63" />
                    <circle class="cls-5" cx="504.31" cy="11.55" r="4.25" />
                    <circle class="cls-5" cx="504.31" cy="39.9" r="4.25" />
                    <line class="cls-4" x1="499.26" y1="17.35" x2="504.31" y2="11.55" />
                    <line class="cls-4" x1="509.37" y1="34.1" x2="504.31" y2="39.9" />
                    <line class="cls-4" x1="504.31" y1="11.55" x2="509.37" y2="5.75" />
                    <line class="cls-4" x1="499.26" y1="45.7" x2="504.31" y2="39.9" />
                    <rect class="cls-1" x=".5" y="1.91" width="26.34" height="47.63" />
                    <circle class="cls-5" cx="13.45" cy="11.55" r="4.25" />
                    <circle class="cls-5" cx="13.45" cy="39.9" r="4.25" />
                    <line class="cls-4" x1="8.4" y1="17.35" x2="13.45" y2="11.55" />
                    <line class="cls-4" x1="18.5" y1="34.1" x2="13.45" y2="39.9" />
                    <line class="cls-4" x1="13.45" y1="11.55" x2="18.5" y2="5.75" />
                    <line class="cls-4" x1="8.4" y1="45.7" x2="13.45" y2="39.9" />
                    <rect class="cls-1" x=".5" y="1.91" width="26.34" height="47.63" />
                    <circle class="cls-5" cx="13.45" cy="11.55" r="4.25" />
                    <circle class="cls-5" cx="13.45" cy="39.9" r="4.25" />
                    <line class="cls-4" x1="8.4" y1="17.35" x2="13.45" y2="11.55" />
                    <line class="cls-4" x1="18.5" y1="34.1" x2="13.45" y2="39.9" />
                    <line class="cls-4" x1="13.45" y1="11.55" x2="18.5" y2="5.75" />
                    <line class="cls-4" x1="8.4" y1="45.7" x2="13.45" y2="39.9" />
                    <line
                      id="zuluftAllgemein"
                      class="cls-2"
                      x1="26.84"
                      y1="136.63"
                      x2="55.18"
                      y2="136.63"
                      @click="handleAreaClick('Zuluft allgemein')"
                    />
                    <line
                      id="zuluftAllgemein"
                      class="cls-2"
                      x1="87.06"
                      y1="136.63"
                      x2="115.41"
                      y2="136.63"
                      @click="handleAreaClick('Zuluft allgemein')"
                    />
                    <line
                      id="zuluftAllgemein"
                      class="cls-2"
                      x1="147.09"
                      y1="136.63"
                      x2="175.44"
                      y2="136.63"
                      @click="handleAreaClick('Zuluft allgemein')"
                    />
                    <line
                      id="zuluftAllgemein"
                      class="cls-2"
                      x1="207.32"
                      y1="136.63"
                      x2="235.66"
                      y2="136.63"
                      @click="handleAreaClick('Zuluft allgemein')"
                    />
                    <line
                      id="zuluftAllgemein"
                      class="cls-2"
                      x1="267.54"
                      y1="136.63"
                      x2="295.88"
                      y2="136.63"
                      @click="handleAreaClick('Zuluft allgemein')"
                    />
                    <line
                      id="zuluftAllgemein"
                      class="cls-2"
                      x1="343.51"
                      y1="136.63"
                      x2="371.86"
                      y2="136.63"
                      @click="handleAreaClick('Zuluft allgemein')"
                    />
                    <line
                      id="zuluftAllgemein"
                      class="cls-2"
                      x1="403.73"
                      y1="136.63"
                      x2="432.08"
                      y2="136.63"
                      @click="handleAreaClick('Zuluft allgemein')"
                    />
                    <line
                      id="zuluftAllgemein"
                      class="cls-2"
                      x1="463.95"
                      y1="136.63"
                      x2="492.3"
                      y2="136.63"
                      @click="handleAreaClick('Zuluft allgemein')"
                    />
                    <line
                      id="abluftAllgemein"
                      class="cls-2"
                      x1="463.95"
                      y1="25.73"
                      x2="491.36"
                      y2="25.73"
                      @click="handleAreaClick('Abluft allgemein')"
                    />
                    <line
                      id="abluftAllgemein"
                      class="cls-2"
                      x1="343.51"
                      y1="25.73"
                      x2="432.08"
                      y2="25.73"
                      @click="handleAreaClick('Abluft allgemein')"
                    />
                    <line
                      id="abluftAllgemein"
                      class="cls-2"
                      x1="147.09"
                      y1="25.73"
                      x2="295.88"
                      y2="25.73"
                      @click="handleAreaClick('Abluft allgemein')"
                    />
                    <line
                      id="abluftAllgemein"
                      class="cls-2"
                      x1="115.41"
                      y1="25.73"
                      x2="26.84"
                      y2="25.73"
                      @click="handleAreaClick('Abluft allgemein')"
                    />
                  </g>
                </svg>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="7">
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
      abluftventilator: [],
      abluftventilatorEnthalten: false,
      gerätAllgemein: [],
      gerätAllgemeinEnthalten: false,
      abluftAllgemein: [],
      abluftAllgemeinEnthalten: false,
      abluftFilter: [],
      abluftFilterEnthalten: false,
      abluftklappe: [],
      abluftklappeEnthalten: false,
      außenluftfilter: [],
      außenluftfilterEnthalten: false,
      außenluftklappe: [],
      außenluftklappeEnthalten: false,
      erhitzer: [],
      erhitzerEnthalten: false,
      fortluftklappe: [],
      fortluftklappeEnthalten: false,
      kühler: [],
      kühlerEnthalten: false,
      wrg: [],
      wrgEnthalten: false,
      zuluftAllgemein: [],
      zuluftAllgemeinEnthalten: false,
      zuluftfilter: [],
      zuluftfilterEnthalten: false,
      zuluftklappe: [],
      zuluftklappeEnthalten: false,
      zuluftventilator: [],
      zuluftventilatorEnthalten: false,
      befeuchter: [],
      befeuchterEnthalten: false,
      filter: [],
      filterEnthalten: false,
      fu: [],
      fuEnthalten: false,
      klappe: [],
      klappeEnthalten: false,
      umluft: [],
      umluftEnthalten: false,
      ventilator: [],
      ventilatorEnthalten: false,
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
          const value = this.monitoringStore.checkvalue(elementData.presentValue);
          elementData.presentValue = value;
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

        console.log(submodelElements)
        const elementPromises = submodelElements.map(async (element) => {
          let elementData = {
            'aasId': aasId,
            'submodelName': submodelId,
            'idShort': element.idShort,
            'name': element.displayName[0].text,
            'semanticId': element.semanticId.keys[0].value
          };

          //elementData = await this.monitoringStore.getSeValueAnlagenmonitoring(aasId, submodelId, element.idShort, elementData)
          //elementData.presentValue = supplementaryInfos.presentValue;
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

        if (semanticId === 'https://th-koeln.de/gart/ComponentExtractAirFanAAS/1/0') {
          this.abluftventilator = elements;
          this.abluftventilatorEnthalten = true;
          allComponents.push('Abluftventilator');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentExtractAirGeneralAAS/1/0') {
          this.abluftAllgemein = elements;
          this.abluftAllgemeinEnthalten = true;
          allComponents.push('Abluft allgemein');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentExtractAirFilterAAS/1/0') {
          this.abluftFilter = elements;
          this.abluftFilterEnthalten = true;
          allComponents.push('Abluftfilter');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentExhaustAirFlapAAS/1/0') {
          this.abluftklappe = elements;
          this.abluftklappeEnthalten = true;
          allComponents.push('Abluftklappe');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentOutsideAirFilterAAS/1/0') {
          this.außenluftfilter = elements;
          this.außenluftfilterEnthalten = true;
          allComponents.push('Außenluftfilter');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentOutsideAirFlapAAS/1/0') {
          this.außenluftklappe = elements;
          this.außenluftklappeEnthalten = true;
          allComponents.push('Außenluftklappe');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentDeviceGeneralAAS/1/0') {
          this.gerätAllgemein = elements;
          this.gerätAllgemeinEnthalten = true;
          allComponents.push('Gerät allgemein');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeaterAAS/1/0') {
          this.erhitzer = elements;
          this.erhitzerEnthalten = true;
          allComponents.push('Erhitzer');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentExtractAirFlapAAS/1/0') {
          this.fortluftklappe = elements;
          this.fortluftklappeEnthalten = true;
          allComponents.push('Fortluftklappe');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentCoolerAAS/1/0') {
          this.kühler = elements;
          this.kühlerEnthalten = true;
          allComponents.push('Kühler');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHeatRecoveryAAS/1/0') {
          this.wrg = elements;
          this.wrgEnthalten = true;
          allComponents.push('WRG');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAirGeneralAAS/1/0') {
          this.zuluftAllgemein = elements;
          this.zuluftAllgemeinEnthalten = true;
          allComponents.push('Zuluft allgemein');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAirFilterAAS/1/0') {
          this.zuluftfilter = elements;
          this.zuluftfilterEnthalten = true;
          allComponents.push('Zuluftfilter');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAirFlapAAS/1/0') {
          this.zuluftklappe = elements;
          this.zuluftklappeEnthalten = true;
          allComponents.push('Zuluftklappe');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentSupplyAirFanAAS/1/0') {
          this.zuluftventilator = elements;
          this.zuluftventilatorEnthalten = true;
          allComponents.push('Zuluftventilator');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentHumidifierAAS/1/0') {
          this.befeuchter = elements;
          this.befeuchterEnthalten = true;
          allComponents.push('Befeuchter');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFilterAAS/1/0') {
          this.filter = elements;
          this.filterEnthalten = true;
          allComponents.push('Filter');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFrequencyConverterAAS/1/0') {
          this.fu = elements;
          this.fuEnthalten = true;
          allComponents.push('Frequenzumrichter');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFlapAAS/1/0') {
          this.klappe = elements;
          this.klappeEnthaltenEnthalten = true;
          allComponents.push('Klappe');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentCirculatingAirAAS/1/0') {
          this.umluft = elements;
          this.umluftEnthalten = true;
          allComponents.push('Umluft');
        } else if (semanticId === 'https://th-koeln.de/gart/ComponentFanAAS/1/0') {
          this.ventilator = elements;
          this.ventilatorEnthalten = true;
          allComponents.push('Ventilator');
        }
      }
      this.allComponents = allComponents;
      await this.monitoringStore.setLoadingMonitoringComponent('false');
      this.getCssInfos(allComponents);
    },
    getCssInfos(allComponents) {
      for (const element in allComponents) {
        const name = allComponents[element];
        if (name === 'Abluftventilator') {
          const cssElement = document.getElementById('abluftventilator');
          cssElement.classList.add('pointer', 'abluftventilator');
        } else if (name === 'Abluft allgemein') {
          const cssElement = document.getElementById('abluftAllgemein');
          cssElement.classList.add('pointer', 'abluftAllgemein');
        } else if (name === 'Abluftfilter') {
          const cssElement = document.getElementById('abluftfilter');
          cssElement.classList.add('pointer', 'abluftfilter');
        } else if (name === 'Abluftklappe') {
          const cssElement = document.getElementById('abluftklappe');
          cssElement.classList.add('pointer', 'abluftklappe');
        } else if (name === 'Außenluftfilter') {
          const cssElement = document.getElementById('außenluftfilter');
          cssElement.classList.add('pointer', 'außenluftfilter');
        } else if (name === 'Außenluftklappe') {
          const cssElement = document.getElementById('außenluftklappe');
          cssElement.classList.add('pointer', 'außenluftklappe');
        } else if (name === 'Erhitzer') {
          const cssElement = document.getElementById('vorerhitzer');
          cssElement.classList.add('pointer', 'vorerhitzer');
        } else if (name === 'Fortluftklappe') {
          const cssElement = document.getElementById('fortluftklappe');
          cssElement.classList.add('pointer', 'fortluftklappe');
        } else if (name === 'Kühler') {
          const cssElement = document.getElementById('kühler');
          cssElement.classList.add('pointer', 'kühler');
        } else if (name === 'WRG') {
          const cssElement = document.getElementById('wrg');
          cssElement.classList.add('pointer', 'wrg');
        } else if (name === 'Zuluft allgemein') {
          e;
          const cssElement = document.getElementById('zuluftAllgemein');
          cssElement.classList.add('pointer', 'zuluftAllgemein');
        } else if (name === 'Zuluftfilter') {
          const cssElement = document.getElementById('zuluftfilter');
          cssElement.classList.add('pointer', 'zuluftfilter');
        } else if (name === 'Zuluftklappe') {
          const cssElement = document.getElementById('zuluftklappe');
          cssElement.classList.add('pointer', 'zuluftklappe');
        } else if (name === 'Zuluftventilator') {
          const cssElement = document.getElementById('zuluftventilator');
          cssElement.classList.add('pointer', 'zuluftventilator');
        }
      }
    },
    handleAreaClick(component) {
      if (component == 'Abluftventilator') {
        this.komponenteZeigen = this.abluftventilator;
      } else if (component == 'Gerät allgemein') {
        this.komponenteZeigen = this.gerätAllgemein;
      } else if (component == 'Abluft allgemein') {
        this.komponenteZeigen = this.abluftAllgemein;
      } else if (component == 'Abluftfilter') {
        this.komponenteZeigen = this.abluftFilter;
      } else if (component == 'Abluftklappe') {
        this.komponenteZeigen = this.abluftklappe;
      } else if (component == 'Außenluftklappe') {
        this.komponenteZeigen = this.außenluftklappe;
      } else if (component == 'Außenluftfilter') {
        this.komponenteZeigen = this.außenluftfilter;
      } else if (component == 'Erhitzer') {
        this.komponenteZeigen = this.erhitzer;
      } else if (component == 'Fortluftklappe') {
        this.komponenteZeigen = this.fortluftklappe;
      } else if (component == 'Kühler') {
        this.komponenteZeigen = this.fortluftklappe;
      } else if (component == 'WRG') {
        this.komponenteZeigen = this.wrg;
      } else if (component == 'Zuluft allgemein') {
        this.komponenteZeigen = this.zuluftAllgemein;
      } else if (component == 'Zuluftfilter') {
        this.komponenteZeigen = this.zuluftfilter;
      } else if (component == 'Zuluftklappe') {
        this.komponenteZeigen = this.zuluftklappe;
      } else if (component == 'Zuluftventilator') {
        this.komponenteZeigen = this.zuluftventilator;
      } else if (component == 'Befeuchter') {
        this.komponenteZeigen = this.befeuchter;
      } else if (component == 'Filter') {
        this.komponenteZeigen = this.filter;
      } else if (component == 'Frequenzumrichter') {
        this.komponenteZeigen = this.fu;
      } else if (component == 'Klappe') {
        this.komponenteZeigen = this.klappe;
      } else if (component == 'Umluft') {
        this.komponenteZeigen = this.umluft;
      } else if (component == 'Ventilator') {
        this.komponenteZeigen = this.ventilator;
      }
    },
  },
};
</script>

<style scoped>
.cls-1,
.cls-2 {
  stroke: #2b2a29;
}

.cls-1,
.cls-2,
.cls-3,
.cls-4 {
  fill: none;
}

.cls-1,
.cls-2,
.cls-3,
.cls-4,
.cls-5 {
  stroke-miterlimit: 10;
}

.cls-1,
.cls-3,
.cls-4,
.cls-5 {
  stroke-width: 1px;
}

.cls-2 {
  stroke-width: 3px;
}

.cls-3 {
  stroke: #ff4a1c;
}

.cls-4,
.cls-5 {
  stroke: #372772;
}

.cls-5 {
  fill: #372772;
}

.pointer {
  cursor: pointer;
}
.abluftventilator:hover {
  fill: #e6bcbc;
}
.abluftventilator {
  fill: transparent;
}
.abluftAllgemein:hover {
  stroke: #ff4a1c;
}
.abluftfilter {
  fill: transparent;
}
.abluftfilter:hover {
  fill: #e6bcbc;
}
.abluftklappe {
  fill: transparent;
}
.abluftklappe:hover {
  fill: #e6bcbc;
}
.außenluftfilter {
  fill: transparent;
}
.außenluftfilter:hover {
  fill: #e6bcbc;
}
.außenluftklappe {
  fill: transparent;
}
.außenluftklappe:hover {
  fill: #e6bcbc;
}
.vorerhitzer {
  fill: transparent;
}
.vorerhitzer:hover {
  fill: #e6bcbc;
}
.fortluftklappe {
  fill: transparent;
}
.fortluftklappe:hover {
  fill: #e6bcbc;
}
.kühler {
  fill: transparent;
}
.kühler:hover {
  fill: #e6bcbc;
}
.wrg {
  fill: transparent;
}
.wrg:hover {
  fill: #e6bcbc;
}
.zuluftAllgemein:hover {
  stroke: #ff4a1c;
}
.zuluftfilter {
  fill: transparent;
}
.zuluftfilter:hover {
  fill: #e6bcbc;
}
.zuluftklappe {
  fill: transparent;
}
.zuluftklappe:hover {
  fill: #e6bcbc;
}
.zuluftventilator {
  fill: transparent;
}
.zuluftventilator:hover {
  fill: #e6bcbc;
}

.heizkreis {
  width: 80%;
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
