import { defineStore } from 'pinia'
import axios from 'axios'
import { useGeneralStore } from "@/store/general"

export const useMonitoringStore = defineStore('monitoring', {
    state: () => {
        return {
            timeSeriesSubmodel: [],
            timeSeriesSubmodelElementsIdShorts: [],
            userId: '',
            loadingLineChart: false,
            // Dev
            //aasServer: 'https://kzbgm955b9.execute-api.us-east-1.amazonaws.com/testEnv/',
            // Live
            aasServer: 'https://4w6tu92q6h.execute-api.eu-central-1.amazonaws.com/Live',
            roomTemperature: [],
            aasTree: [],
            loadingAasTree: false,
            loadingMonitoringComponent: null,
            loadedElement: false,
            aasZweiteGrundfunktion: [],
            currentBuildingAas: '',
            aasAnlage: [],
            zweiteGrundfunktionForMonitoring: 'hallo'
        }
    },
    actions: {
      checkvalue (value) {
        if (!isNaN(value)) {
          // Convert the string to a number
          let numberValue = parseFloat(value);
  
          // Check if it's an integer or float
          if (Number.isInteger(numberValue)) {
              return numberValue;
          } else {
              // Round to two decimal places if it's a float
              return parseFloat(numberValue.toFixed(2));
          }
        } else {
          return value
        }
      }, 
              
        async setLoadingMonitoringComponent(value) {
          if (value == 'true') {
            this.loadingMonitoringComponent = true
          } else if (value == 'false') {
            this.loadingMonitoringComponent = false
          }
        },
        async getGrundfunktionen(aasId, allBuildings) {
          
            if (this.currentBuildingAas === aasId) {
              return this.aasTree
            }
            this.aasTree = []
            this.loadingAasTree = true
            const generalStore = useGeneralStore()
            const userId = generalStore.userId
            this.userId = userId
            //const aasStrukturinformationen = []
          
            for (const obj of allBuildings) {
              for (const key in obj) {
                if (key === aasId) {
                  const grundfunktionenAas = obj[key];
                  const aasPromises = [];
          
                  for (let grundfunktionAas in grundfunktionenAas) {
                    let aasId = grundfunktionenAas[grundfunktionAas]
                    let semanticIdAAS = await generalStore.getSemanticIdAas(aasId)

                    if (semanticIdAAS[0] === 'https://th-koeln.de/gart/BaseFunctionSupplyHeatAAS/1/0' ||
                    semanticIdAAS[0] === 'https://th-koeln.de/gart/BaseFunctionSupplyAirAAS/1/0' ||
                    semanticIdAAS[0] === 'https://th-koeln.de/gart/BaseFunctionSupplyColdAAS/1/0' ||
                    semanticIdAAS[0] === 'https://th-koeln.de/gart/BaseFunctionSupplyMediaAAS/1/0' ||
                    semanticIdAAS[0] === 'https://th-koeln.de/gart/BaseFunctionSupplyElectricityAAS/1/0' ||
                    semanticIdAAS[0] === 'https://th-koeln.de/gart/BaseFunctionOtherAAS/1/0' ||
                    semanticIdAAS[0] === 'https://th-koeln.de/gart/BaseFunctionTransportAAS/1/0' ||
                    semanticIdAAS[0] === 'https://th-koeln.de/gart/BaseFunctionSecureAAS/1/0')  {
                      aasPromises.push(fetchAasData(aasId, semanticIdAAS[0]));
                    }
                  }
          
                  const aasData = await Promise.all(aasPromises);
          
                  this.aasTree = aasData
                  this.loadingAasTree = false
                  this.currentBuildingAas = aasId
                  return aasData
                  //break;
                }
              }
            }
          
            async function fetchAasData(aasId, semanticId) {
              const idShort = await generalStore.getAasIdShortByIdentifier(aasId);
              //const semanticId = await generalStore.getSemanticIdAas(aasId);
              const aasIdsZweiteEbene = await generalStore.getBomChilds(aasId);
          
              const aasZweiteEbeneArray = await Promise.all(
                aasIdsZweiteEbene.map((aasIdZweiteEbene) =>
                  fetchAasZweiteEbeneData(aasIdZweiteEbene)
                )
              );
          
              return {
                aasGrundfunktion: {
                  semanticId: semanticId,
                  aasId: aasId,
                  idShort: idShort[0],
                },
                aasZweiteEbene: aasZweiteEbeneArray,
              };
            }
          
            async function fetchAasZweiteEbeneData(aasIdZweiteEbene) {
              const idShortZweiteEbene = await generalStore.getAasIdShortByIdentifier(
                aasIdZweiteEbene
              );
              const semanticIdZweiteEbene = await generalStore.getSemanticIdAas(aasIdZweiteEbene);
              const aasIdsAnlagen = await generalStore.getBomChilds(aasIdZweiteEbene);
          
              const aasAnlagen = await Promise.all(
                aasIdsAnlagen.map((aasIdAnlage) => fetchAasAnlageData(aasIdAnlage))
              );
          
              return {
                semanticId: semanticIdZweiteEbene[0],
                aasId: aasIdZweiteEbene,
                idShort: idShortZweiteEbene[0],
                anlagenAas: aasAnlagen,
              };
            }
          
            async function fetchAasAnlageData(aasIdAnlage) {
              const idShortAnlage = await generalStore.getAasIdShortByIdentifier(
                aasIdAnlage
              );
              const semanticIdAnlage = await generalStore.getSemanticIdAas(aasIdAnlage);
              const aasIdsKomponenten = await generalStore.getBomChilds(aasIdAnlage);
          
              const aasKomponenten = await Promise.all(
                aasIdsKomponenten.map((aasIdKomponente) =>
                  fetchAasKomponenteData(aasIdKomponente)
                )
              );
          
              return {
                semanticId: semanticIdAnlage[0],
                aasId: aasIdAnlage,
                idShort: idShortAnlage[0],
                komponentenAas: aasKomponenten,
              };
            }
          
        async function fetchAasKomponenteData(aasIdKomponente) {
            const idShortKomponente = await generalStore.getAasIdShortByIdentifier(
            aasIdKomponente
            );
            const semanticIdKomponente = await generalStore.getSemanticIdAas(aasIdKomponente);
        
            return {
            semanticId: semanticIdKomponente[0],
            aasId: aasIdKomponente,
            idShort: idShortKomponente[0],
            };
            }
        },
        async getTimeSeriesSubmodelElements(aasId) {
            const getSubmodelElements = 'submodelServices/getSubmodelElementByPath'
            const url = this.aasServer + getSubmodelElements
            let responseBasyx = ''
            const generalStore = useGeneralStore()
            const userId = generalStore.userId
            this.userId = userId

            try {
                const response = await axios.post(url, {
                    userId: this.userId,
                    aasIdentifier: aasId,
                    submodelIdShort : 'TimeSeries',
                    submodelElementShortIdPath: [
                        "Segments"
                    ]
                })
                responseBasyx = response.data
            } catch (error) {
                console.log(error)
            }
            let idShorts = []
            for  (let element in responseBasyx['value']) {
                idShorts.push(responseBasyx['value'][element]['idShort'])
            }
            this.timeSeriesSubmodelElementsIdShorts = idShorts
            this.timeSeriesSubmodel = responseBasyx
            
            return responseBasyx
        }, 
        async getChartType(semanticId) {
          const generalStore = useGeneralStore()
        
          let chartTypesForSemanticId = generalStore.chartTypes;
          
          let matchedValue = 'None';

          for (let i = 0; i < chartTypesForSemanticId.length; i++) {
            if (Object.keys(chartTypesForSemanticId[i])[0] === semanticId) {
              matchedValue = chartTypesForSemanticId[i][semanticId]
              return matchedValue
            }
          }
        },

        async getSeValueAnlagenmonitoring(aasId, submodelIdShort, idShort, elementData) {
          const getSeValue = 'submodelServices/getSubmodelElementValue';
          const urlSeValue = this.aasServer + getSeValue;
          //let supplementInfos = {}
      
          try {
              const response = await axios.post(urlSeValue, {
                userId: this.userId,
                aasIdentifier: aasId,
                submodelIdShort: submodelIdShort,
                submodelElementShortIdPath: [idShort]
              });
              elementData['presentValue'] = response.data
  
          } catch (error) {
              console.error(error);
          }

          const chartType = await this.getChartType(elementData.semanticId) 
          elementData['chartType'] = chartType  
          console.log(elementData)
          //await Promise.all(requests);
          this.loadedElement = true
          return elementData;
        }, 
        async getTimeSeriesValues(submodelElementPath, submodelRefIdShort, aasId) {
            this.loadingLineChart = true

            const readTimeSeries = 'timeseriesServices/readTimeSeries'
            const url = this.aasServer + readTimeSeries
            let responseBasyx = ''        
            const actualTime = Math.floor(new Date().getTime() / 1000)
            console.log(actualTime)
            console.log(this.userId)
            console.log(aasId)
            //let path = submodelElementPath + '/PresentValue'
            let path = [submodelElementPath, 'PresentValue']
            console.log(path)
            console.log(submodelRefIdShort)
            try {
                const response = await axios.post(url, {
                    userId: this.userId,
                    aasIdentifier: aasId,
                    //submodelRefIdShort: submodelRefIdShort,
                    submodelIdentifier: submodelRefIdShort,
                    //submodelElementPath: path,
                    sempath: path,
                    timestampStart: 0,
                    timestampStop: actualTime,
                    //timestampStop: 1696878572
                },{
                  timeout: 600000
                })
                console.log(response)
                responseBasyx = response.data.body
                console.log(responseBasyx)
            } catch (error) {
                console.log(error)
            }
            
            this.roomTemperature = responseBasyx
            this.loadingLineChart = false

            return responseBasyx
        }
    }
})
