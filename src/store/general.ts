// import the defineStore function
import { defineStore } from 'pinia'
import axios from 'axios'
// import axios from 'axios'

export const useGeneralStore = defineStore('general', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      userId: '',
      // Dev
      //aasServer: 'https://kzbgm955b9.execute-api.us-east-1.amazonaws.com/testEnv/',
      // Live
      aasServer: 'https://4w6tu92q6h.execute-api.eu-central-1.amazonaws.com/Live/',
      homeLoading: false,
      loading: false,
      loadedSiteInformation: [],
      loadedSiteInformationWithBuildings: [],
      //loadedSiteBuildingInformation: [],
      loadedOrganizationInformation: [],
      loadedBacnetInformationNotAssigned: [],
      loadedBacnetInformationAssigned: [],
      loadedGatewayInformation: [],
      loadingBacnetAdding: false,
      buildingsList: [],
      buildingsIdsWithSelectName: {},
      loadedBuildingWithGrundfunktion: [],
      chartTypes: []
      //buildingIdsArray: []
      // all these properties will have their type inferred automatically
    }
  },
  actions: {
    async createAas(semanticIdType: any, aasIdShort: any) {
      let aasId = ''
      try {
        const createAas = 'aasServices/createAasByAasType'
        const url = this.aasServer + createAas
        const response = await axios.post(url, {
          userId: this.userId,
          //semanticIdAasType: semanticIdType,
          semanticId: semanticIdType,
          idShort: aasIdShort
        })
        aasId = response.data.body
      } catch (error) {
        console.log(error)
      }
      return aasId
    },

    async addSubmodelElements(
      companyAasId: any,
      submodelIdShort: any,
      semanticIdSubmodel: any,
      submodelElementValues: any,
    ) {
      try {
        const updateSubmodel = 'submodelServices/addSubmodelElements'
        const url = this.aasServer + updateSubmodel
        const response = await axios.post(url, {
          userId: this.userId,
          aasIdentifier: companyAasId,
          submodelIdShort: submodelIdShort,
          semanticIdSubmodel: semanticIdSubmodel,
          submodelElementValues: submodelElementValues
        })
      } catch (error) {
        console.log(error)
      }
    },
    /*
    async inititalPostBomHasPart(parentId, partId) {

        const bom = 'submodelServices/bom/initalPost'
        const urlBom = this.aasServer + bom
        try {
            const response = await axios.post(urlBom, {
                userId: this.userId,
                aasIdentifier: parentId,
                submodelIdShort:"HierarchicalStructures",
                BomValues: {
                    ArcheType:"Full",
                    entityType:"SelfManagedEntity", 
                    EntitiyAasIdentifier: parentId,
                    HasPart:[
                        partId
                    ],
                    IsPartOf:[
        
                    ]
                }	
            })
        } catch (error) {
            console.log(error)
        }
    },
    

    async inititalPostBomIsPartOf(parentId, partId) {
        
        const bom = 'submodel/bom/initialpost'
        const urlBom = this.aasServer + bom
        try {
            const response = await axios.post(urlBom, {
                userId: this.userId,
                aasIdentifier: partId,
                submodelIdShort:"HierarchicalStructures",
                BomValues: {
                    ArcheType:"Full",
                    entityType:"SelfManagedEntity", 
                    EntitiyAasIdentifier: partId,
                    HasPart:[
                    ],
                    IsPartOf:[
                        parentId        
                    ]
                }	
            })
        } catch (error) {
            console.log(error)
        }
    },
    */

    async getSemanticIdAas(aasId: any) {
      const path = 'aasServices/getAasSemanticIdByIdentifier'
      const url = this.aasServer + path
      let semanticId = []
      try {
        const response = await axios.post(url, {
          userId: this.userId,
          aasIdentifier: aasId
        })
        semanticId = response.data.body
      } catch (error) {
        console.log(error)
      }
      return semanticId
    },

    async addHasPart(parentId: any, partId: any) {
      const bom = 'submodelServices/bom/addHasPartElement'
      const urlBom = this.aasServer + bom
      try {
        const response = await axios.post(urlBom, {
          userId: this.userId,
          aasIdentifier: parentId,
          HasPart_AasIdentifier: partId
        })
        //console.log(response.data.body)
      } catch (error) {
        console.log(error)
      }
    },

    async getBomChilds(aasId: any) {
      const bomChilds = 'submodelServices/bom/getChilds'
      const urlBomChilds = this.aasServer + bomChilds
      let childAasIds = []
      try {
        const response = await axios.post(urlBomChilds, {
          userId: this.userId,
          aasIdentifier: aasId
        })
        /*
            if ('status' in response.data) {
                // 'status' property exists in the object
                childAasIds = []
            */
        if (response.data.body.length === 0) {
          childAasIds = []
        } else {
          //console.log(response.data.body)
          childAasIds = response.data.body
        }
      } catch (error) {
        console.log(error)
      }
      return childAasIds
    },
    async getBomParent(aasId: any) {
      const bomParent = 'submodelServices/bom/getParents'
      const urlBomParent = this.aasServer + bomParent
      let parentAasId = []

      console.log(aasId)
      console.log(this.userId)

      try {
        const response = await axios.post(urlBomParent, {
          userId: this.userId,
          aasIdentifier: aasId
        })

        parentAasId = response.data.body
      } catch (error) {
        console.log(error)
      }
      return parentAasId
    },
    async getAasByType(semanticId: any) {
      const getAasByType = 'aasServices/getAllAasIdentifierByAasType'
      const url = this.aasServer + getAasByType
      let aasIds = ''
      try {
        const response = await axios.post(url, {
          //semanticIdAasType: semanticId
          semanticId: semanticId,
          userId: this.userId
        })
        aasIds = response.data.body
      } catch (error) {
        console.log(error)
      }
      //console.log(aasIds)

      return aasIds
    },
    async getSubmodel(aasId: any, submodelId: any) {
      const getSubmodel = 'submodelServices/getSubmodelByIdShort'
      const url = this.aasServer + getSubmodel
      let responseBasyx = ''

      try {
        const response = await axios.post(url, {
          userId: this.userId,
          aasIdentifier: aasId,
          submodelIdShort: submodelId
          //submodelIdentifier: submodelId
        })
        responseBasyx = response.data.body
      } catch (error) {
        console.log(error)
      }
      return responseBasyx
    },

    async getSeValue(aasId: any, submodelIdShort: any, idShortPaths: any) {
      const getSeValue = 'submodelServices/getSubmodelElementValue'
      const urlSeValue = this.aasServer + getSeValue
      const allSeInformations: { [key: string]: any } = {}

      const requests = Object.entries(idShortPaths).map(async ([element, value]) => {
        try {
          const response = await axios.post(urlSeValue, {
            userId: this.userId,
            aasIdentifier: aasId,
            submodelIdShort: submodelIdShort,
            submodelElementShortIdPath: value
          })
          //console.log(response.data.body)

          if (response.data.body !== '') {
            allSeInformations[element] = response.data.body
          }
        } catch (error) {
          console.error(error)
        }
      })

      await Promise.all(requests)
      return allSeInformations
    },

    async getAllSubmodelElementValues(aasId: any, submodelIdShort: any) {
      const getValues = 'submodelServices/getAllSubmodelElementValues'
      const urlValues = this.aasServer + getValues
      //console.log(aasId)
      //console.log(submodelIdShort)
      //console.log(this.userId)
      let values = {}

      try {
        const response = await axios.post(urlValues, {
          userId: this.userId,
          aasIdentifier: aasId,
          submodelIdShort: submodelIdShort
        })
        //console.log(response)
        values = response.data.body
      } catch (error) {
        console.log(error)
      }

      return values
    },

    async editSeValue(aasId: any, submodelIdShort: any, idShort: any, value: any) {
      const editSeValue = 'submodelServices/editSubmodelElementValue'
      const url = this.aasServer + editSeValue

      if (idShort.length == 1) {
        try {
          const response = await axios.post(url, {
            userId: this.userId,
            aasIdentifier: aasId,
            submodelIdShort: submodelIdShort,
            submodelElementShortIdPath: [idShort[0]],
            //value: value
            submodelElementValues: value
          })
          //console.log(response)
        } catch (error) {
          console.log(error)
        }
      } else if (idShort.length == 2) {
        try {
          const response = await axios.post(url, {
            userId: this.userId,
            aasIdentifier: aasId,
            submodelIdShort: submodelIdShort,
            submodelElementShortIdPath: [idShort[0], idShort[1]],
            //value: value
            submodelElementValues: value
          })
          //console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getAasIdShortByIdentifier(aasId: any) {
      const getAasIdShort = 'aasServices/getAasIdShortByIdentifier'
      const url = this.aasServer + getAasIdShort
      let idShort = ''
      //console.log(aasId)
      //console.log(this.userId)
      try {
        const response = await axios.post(url, {
          userId: this.userId,
          aasIdentifier: aasId
        })
        //console.log(response)
        idShort = response.data.body
      } catch (error) {
        console.log(error)
      }
      return idShort
    },
    /*
    async getSubmodel (aasId, submodelIdShort) {
        const  = 'api/v1/Submodel/getSubmodel'
        const url = this.aasServer + editSeValue
    },
    */

    async loadBacnetInformation(aasBacnetIds: any) {
      this.loadedBacnetInformationNotAssigned = []
      this.loadedBacnetInformationAssigned = []
      const digitalNameplateIdShortPaths = {
        manufacturerName: ['ManufacturerName'],
        serialNumber: ['SerialNumber']
      }
      const digitalNameplate = 'Nameplate'

      let allBacnetGatewayInformationNotAssigned: any[] = []
      let allBacnetGatewayInformationAssigned: any[] = []

      const bacnetInfoPromises = aasBacnetIds.map(async (aasId: any) => {
        let parent = await this.getBomParent(aasId)

        if (parent.length === 0) {
          const [aasIdShort, nameplateSeInformationAll] = await Promise.all([
            this.getAasIdShortByIdentifier(aasId),
            this.getSeValue(aasId, digitalNameplate, digitalNameplateIdShortPaths)
          ])

          const manufacturerName =
            nameplateSeInformationAll['manufacturerName']?.[0]?.['text'] ?? 'Unknown'

          const bacnetNameplateInformation = {
            'Digital Nameplate': {
              Herstellername: manufacturerName,
              Seriennummer: nameplateSeInformationAll['serialNumber'] ?? 'Unknown'
            },
            'AAS ID Short': aasIdShort,
            'AAS ID': aasId
          }

          allBacnetGatewayInformationNotAssigned.push(bacnetNameplateInformation)
        } else {
          const [aasIdShort, buildingAasId, nameplateSeInformation, basyxNlpResult] =
            await Promise.all([
              this.getAasIdShortByIdentifier(aasId),
              this.getBomParent(parent[0]),
              this.getAllSubmodelElementValues(aasId, digitalNameplate),
              this.getSubmodel(aasId, 'NLPClassificationResult')
            ])

          const buildingAasIdShort = await this.getAasIdShortByIdentifier(buildingAasId[0])

          const nameplateIdShortPaths = {
            Herstellername: nameplateSeInformation.ManufacturerName?.[0]?.de ?? 'Unknown',
            Seriennummer: nameplateSeInformation.SerialNumber ?? 'Unknown'
          }

          const nlpDone = basyxNlpResult !== ''

          const bacnetNameplateInformation = {
            'Digital Nameplate': {
              Herstellername: nameplateIdShortPaths.Herstellername,
              Seriennummer: nameplateIdShortPaths.Seriennummer
            },
            'AAS ID Short': aasIdShort,
            'AAS ID': aasId,
            ParentAasId: parent,
            ParentAasIdShort: buildingAasIdShort,
            NlpDone: nlpDone
          }

          allBacnetGatewayInformationAssigned.push(bacnetNameplateInformation)
        }
      })

      await Promise.all(bacnetInfoPromises)

      this.loadedBacnetInformationNotAssigned = allBacnetGatewayInformationNotAssigned
      this.loadedBacnetInformationAssigned = allBacnetGatewayInformationAssigned

      const buildingsIdsWithSelectName = {}
      const buildingsList = []

      this.loadedSiteInformationWithBuildings.forEach((siteInformation) => {
        const siteName = siteInformation['siteName']
        const buildingsArray = Array.isArray(siteInformation['buildings'])
          ? siteInformation['buildings']
          : []

        buildingsArray.forEach((buildingInformation) => {
          if (Array.isArray(buildingInformation)) {
            buildingInformation.forEach((building) => {
              const buildingName = building['buildingName']
              const siteBuildingName = `${buildingName}, ${siteName}`
              buildingsList.push(siteBuildingName)
              buildingsIdsWithSelectName[building['id']] = siteBuildingName
            })
          } else {
            const buildingName = buildingInformation['buildingName']
            const siteBuildingName = `${buildingName}, ${siteName}`
            buildingsList.push(siteBuildingName)
            buildingsIdsWithSelectName[buildingInformation['id']] = siteBuildingName
          }
        })
      })

      this.buildingsList = buildingsList
      this.buildingsIdsWithSelectName = buildingsIdsWithSelectName
    },

    /*
    async loadBacnetInformation(aasBacnetIds) {
        //console.log(aasBacnetIds)
        this.loadedBacnetInformationNotAssigned = []
        this.loadedBacnetInformationAssigned = []      
        const digitalNameplateIdShortPaths = {
            manufacturerName: ['ManufacturerName'],
            serialNumber: ['SerialNumber'],
        }
        const digitalNameplate = 'Nameplate'
        // const semanticIdNameplate = 'https://admin-shell.io/zvei/nameplate/2/0/Nameplate'
        const allBacnetGatewayInformationNotAssigned = []
        const allBacnetGatewayInformationAssigned = []

        for (let bacnetDevice in aasBacnetIds) {
            let aasId = aasBacnetIds[bacnetDevice]
            
            //let bacnetGatewayInformation = []
            //console.log(aasId)
            let parent = await this.getBomParent(aasId)
            
            if (parent.length === 0) {
                let aasIdShort = await this.getAasIdShortByIdentifier(aasId)
                let nameplateSeInformationAll = await this.getSeValue(aasId, digitalNameplate, digitalNameplateIdShortPaths)
                //let nameplateSeInformation = await this.getAllSubmodelElementValues(aasId, digitalNameplate)
                //console.log(nameplateSeInformation)
                let manufacturerName = nameplateSeInformationAll['manufacturerName'][0]['text']

                let bacnetNameplateInformation = {
                    'Digital Nameplate': {
                        'Herstellername': manufacturerName,
                        'Seriennummer': nameplateSeInformationAll['serialNumber']
                    },
                    'AAS ID Short': aasIdShort,
                    'AAS ID': aasId
                }
                //console.log(bacnetNameplateInformation)   
                //let aasIdDict = {aasId: aasId}

                //bacnetGatewayInformation.push(aasIdDict) 
                // bacnetGatewayInformation.push(bacnetNameplateInformation)        
                allBacnetGatewayInformationNotAssigned.push(bacnetNameplateInformation)
            } else {
                let aasIdShort = await this.getAasIdShortByIdentifier(aasId)
                let buildingAasId = await this.getBomParent(parent[0])

                let buildingAasIdShort = await this.getAasIdShortByIdentifier(buildingAasId[0])
                //let nameplateSeInformationAll = await this.getSeValue(aasId, digitalNameplate, digitalNameplateIdShortPaths)
                let nameplateSeInformation = await this.getAllSubmodelElementValues(aasId, digitalNameplate)
                //console.log(nameplateSeInformation)

                const nameplateIdShortPaths = {
                    Herstellername: nameplateSeInformation.ManufacturerName[0].de,
                    Seriennummer: nameplateSeInformation.SerialNumber,
                };

                //console.log(nameplateIdShortPaths)
                
                //console.log(nameplateSeInformationAll)
                //let manufacturerName = nameplateSeInformationAll['manufacturerName'][0]['text']
                let basyxNlpResult = await this.getSubmodel(aasId, 'NLPClassificationResult')
                let nlpDone
                if (basyxNlpResult === '') {
                    nlpDone = false
                } else {
                    nlpDone = true
                }
                let bacnetNameplateInformation = {
                    'Digital Nameplate': {
                        'Herstellername': nameplateIdShortPaths.Herstellername,
                        'Seriennummer': nameplateIdShortPaths.Seriennummer
                    },
                    'AAS ID Short': aasIdShort,
                    'AAS ID': aasId,
                    'ParentAasId': parent,
                    'ParentAasIdShort': buildingAasIdShort,
                    'NlpDone': nlpDone
                }  
                console.log(bacnetNameplateInformation)
                //let aasIdDict = {aasId: aasId}

                //bacnetGatewayInformation.push(aasIdDict) 
                // bacnetGatewayInformation.push(bacnetNameplateInformation)        
                allBacnetGatewayInformationAssigned.push(bacnetNameplateInformation)
            }
            this.loadedBacnetInformationNotAssigned = allBacnetGatewayInformationNotAssigned
            this.loadedBacnetInformationAssigned = allBacnetGatewayInformationAssigned


            let buildingsIdsWithSelectName = {}
            let buildingsList = []

            for (let site in this.loadedSiteInformationWithBuildings) {
                let siteInformation = this.loadedSiteInformationWithBuildings[site]
                let siteName = siteInformation['siteName']
                for (let building in siteInformation['buildings'][0]) {
                    let buildingInformation = siteInformation['buildings'][0][building]
                    let buildingName = buildingInformation['buildingName']
                    let siteBuildingName = buildingName + ', ' + siteName
                    buildingsList.push(siteBuildingName)
                    //this.$set(this.myObject, 'newKey', 'New Value')
                    buildingsIdsWithSelectName[building] = siteBuildingName
                }

                //buildingsList.push(buildingName)
            }
            this.buildingsList = buildingsList
            this.buildingsIdsWithSelectName = buildingsIdsWithSelectName

            }
    },
    */

    async loadBacnetInformationForGateway(aasBacnetIds) {
      const digitalNameplateIdShortPaths = {
        manufacturerName: ['ManufacturerName'],
        serialNumber: ['SerialNumber']
      }
      const digitalNameplate = 'Nameplate'
      // const semanticIdNameplate = 'https://admin-shell.io/zvei/nameplate/2/0/Nameplate'
      const allBacnetInformation = []

      for (let bacnetDevice in aasBacnetIds) {
        let aasId = aasBacnetIds[bacnetDevice]
        let aasIdShort = await this.getAasIdShortByIdentifier(aasId)
        let nameplateSeInformationAll = await this.getSeValue(
          aasId,
          digitalNameplate,
          digitalNameplateIdShortPaths
        )
        let manufacturerName = nameplateSeInformationAll['manufacturerName'][0]['text']

        let bacnetNameplateInformation = {
          'Digital Nameplate': {
            Herstellername: manufacturerName,
            Seriennummer: nameplateSeInformationAll['serialNumber']
          },
          'AAS ID Short': aasIdShort,
          'AAS ID': aasId
        }

        allBacnetInformation.push(bacnetNameplateInformation)
      }
      return allBacnetInformation
    },

    async loadGatewayInformation(aasGatewayIds) {
      this.loadedGatewayInformation = []

      const monkiGatewayIdShortPaths = {
        thingName: ['AWSIotCoreInformation', 'ThingName'],
        thingId: ['AWSIotCoreInformation', 'ThingId'],
        connectionStatus: ['ConnectionInformation', 'ConnectionStatus']
      }
      const submodelGateway = 'MonKiGateway'
      // const semanticIdNameplate = 'https://admin-shell.io/zvei/nameplate/2/0/Nameplate'
      let allGatewayInformation = []

      for (let device in aasGatewayIds) {
        let aasId = aasGatewayIds[device]
        let parent = await this.getBomParent(aasId)
        let children = await this.getBomChilds(aasId)

        let aasIdShort = await this.getAasIdShortByIdentifier(aasId)
        let parentAasIdShort = await this.getAasIdShortByIdentifier(parent)
        let gatewaySeInformation = await this.getSeValue(
          aasId,
          submodelGateway,
          monkiGatewayIdShortPaths
        )

        let bacnetInformation = await this.loadBacnetInformationForGateway(children)
        let gatewayInformation = {
          'Gateway Information': {
            Name: gatewaySeInformation['thingName'],
            ID: gatewaySeInformation['thingId'],
            Status: gatewaySeInformation['connectionStatus']
          },
          'AAS ID Short': aasIdShort,
          'AAS ID': aasId,
          ParentAasId: parent,
          ParentAasIdShort: parentAasIdShort,
          bacnetDevices: bacnetInformation
        }
        allGatewayInformation.push(gatewayInformation)
      }
      this.loadedGatewayInformation = allGatewayInformation
    },

    // Test of Amlify klapp
    /*
    async helloServer() {
        //const hello = 'dev/v1/aas/helloserver'
        const url = 'https://svmiv1rcci.execute-api.us-east-1.amazonaws.com/dev/v1/aas/helloserver'
        //const url = this.aasServer + hello
        try {
            console.log(url)
             const response = await axios.get(url);
        
            console.log('Response-1:', response.data);
          } catch (error) {
            console.error('Error-1:', error.message);
        }
    },
    */
    async postDataGetAllAasIdentifier() {
      const getAasIdentifier = 'aasServices/getAllAasIdentifier'
      const url = this.aasServer + getAasIdentifier
      try {
        const response = await axios.post(url, {
          // Hier kannst du die Daten angeben, die du senden möchtest
          userId: this.userId
        })
        console.log('Response-2:', response.data.body)
      } catch (error) {
        console.error('Error-2:', error.message)
      }
    },

    async readCSV() {
      const reader = new FileReader()
      let rows = []
      reader.onload = (event) => {
        const text = event.target.result
        const lines = text.split('\n')
        //const headers = lines[0].split(';');

        for (let i = 0; i < lines.length; i++) {
          const cells = lines[i].split(';')
          let semanticId = cells[0]
          let chartType = cells[1]
          let obj = {}
          obj[semanticId] = chartType
          rows.push(obj)
          /*
            if (cells.length === headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = cells[j];
                }
                rows.push(obj);
            }
            */
        }
      }
      //console.log(csvData)
      this.chartTypes = rows
      const response = await fetch('/data/chartType.csv')
      const blobCsv = await response.blob()
      reader.readAsText(blobCsv)
    },

    async fetchGeneralInfos(userId) {
      this.homeLoading = true
      await this.readCSV()
      this.userId = userId
      //console.log('hiiii')

      const semanticIdAasType = 'https://th-koeln.de/gart/CompanyAAS/1/0'
      const aasIds = await this.getAasByType(semanticIdAasType)
      //console.log(aasIds)

      /*

        const companyIdShortPaths = {
            organizationName: ['CompanyName'],
            country: ['Address', 'NationalCode'],
            city: ['Address', 'CityTown'],
            zipcode: ['Address', 'Zipcode'],
            street: ['Address', 'Street'],
        }
        
        const siteIdShortPaths = {
            siteName: ['SiteName'],
            country: ['Address', 'NationalCode'],
            city: ['Address', 'CityTown'],
            zipcode: ['Address', 'Zipcode'],
            lat: ['Address', 'Lattitude'],
            lng: ['Address', 'Longitude'],
            street: ['Address', 'Street'],
        }
        */
      //console.log(aasIds.body.length)

      if (aasIds.length > 0) {
        const companyAasId = aasIds[0]

        const companySubmodelId = 'CompanyInformation'
        /*
            const organizationInformation = await this.getSeValue(companyAasId, companySubmodelId, companyIdShortPaths);
            
            console.log(organizationInformation)
            if (Object.keys(organizationInformation).length > 0) {
                this.loadedOrganizationInformation.push(organizationInformation);
            }
            */

        const organizationInformationBasyx = await this.getAllSubmodelElementValues(
          companyAasId,
          companySubmodelId
        )

        /*
            const addressArrayOrganization = organizationInformationBasyx.Address

            const organizationInformation = {
                organizationName: organizationInformationBasyx.CompanyName,
                country: addressArrayOrganization.find(item => item.NationalCode)?.NationalCode || '',
                city: addressArrayOrganization.find(item => item.CityTown)?.CityTown || '',
                zipcode: addressArrayOrganization.find(item => item.Zipcode)?.Zipcode || '',
                street: addressArrayOrganization.find(item => item.Street)?.Street || ''
            };

            if (Object.keys(organizationInformation).length > 0) {
                this.loadedOrganizationInformation.push(organizationInformation);
            }

            */

        const addressArrayOrganization = organizationInformationBasyx?.Address || []

        const organizationInformation = {
          organizationName: organizationInformationBasyx?.CompanyName || '',
          country: addressArrayOrganization.find((item) => item?.NationalCode)?.NationalCode || '',
          city: addressArrayOrganization.find((item) => item?.CityTown)?.CityTown || '',
          zipcode: addressArrayOrganization.find((item) => item?.Zipcode)?.Zipcode || '',
          street: addressArrayOrganization.find((item) => item?.Street)?.Street || ''
        }

        if (Object.keys(organizationInformation).length > 0) {
          this.loadedOrganizationInformation.push(organizationInformation)
        }

        const siteAasIds = await this.getBomChilds(companyAasId)
        console.log(siteAasIds)

        const siteSubmodelId = 'SiteInformation'

        /*
            const siteInformationPromises = siteAasIds.map(async (siteAasId) => {

                const siteInformation = await this.getSeValue(siteAasId, siteSubmodelId, siteIdShortPaths);
                return Object.keys(siteInformation).length > 0 ? siteInformation : null;
            });
            */

        const siteInformationTest = siteAasIds.map(async (siteAasId) => {
          const siteInformationBasyx = await this.getAllSubmodelElementValues(
            siteAasId,
            siteSubmodelId
          )
          //console.log(siteInformationBasyx)
          const addressArray = siteInformationBasyx?.Address || []

          const siteIdShortPaths = {
            siteName: siteInformationBasyx?.SiteName || '',
            country: addressArray.find((item) => item.NationalCode)?.NationalCode || '',
            city: addressArray.find((item) => item.CityTown)?.CityTown || '',
            zipcode: addressArray.find((item) => item.Zipcode)?.Zipcode || '',
            lat: addressArray.find((item) => item.Lattitude)?.Lattitude || '',
            lng: addressArray.find((item) => item.Longitude)?.Longitude || '',
            street: addressArray.find((item) => item.Street)?.Street || ''
          }

          return siteIdShortPaths
        })

        const siteInformationResults = await Promise.all(siteInformationTest)
        //console.log(siteInformationResults)

        //const siteInformationResults = await Promise.all(siteInformationPromises);
        //console.log(siteInformationResults)

        //this.loadedSiteInformation = siteInformationResults.filter((info) => info);
        this.loadedSiteInformation = siteInformationResults

        //console.log(this.loadedSiteInformation)

        this.loadedSiteInformationWithBuildings = this.getBuildingsForEachSite()
      } else {
        this.loadedOrganizationInformation = []
        this.loadedSiteInformation = []
      }

      const semanticIdAasTypeBacnet = 'https://th-koeln.de/gart/BACnetDeviceAAS/1/0'
      const aasBacnetIds = await this.getAasByType(semanticIdAasTypeBacnet)

      //const semanticIdAasTypeGateway = 'https://th-koeln.de/gart/MonKiGatewayAas/1/0';
      //onst semanticIdAasTypeGateway = 'https://th-koeln.de/gart/PLYTEQGatewayAas/1/0'
      //const aasGatewayIds = await this.getAasByType(semanticIdAasTypeGateway);

      //console.log(aasBacnetIds)
      //console.log(aasGatewayIds)

      this.loadedBacnetInformation = aasBacnetIds

      //await this.loadGatewayInformation(aasGatewayIds)

      await this.loadBacnetInformation(aasBacnetIds)

      this.homeLoading = false
    },

    async addGatewayToBuilding(gateway, choosedBuilding, buildingsIdsWithSelectName) {
      this.loadingBacnetAdding = true
      const gatewayAasId = gateway['AAS ID']
      let parentId = ''

      for (let buildingAasId in buildingsIdsWithSelectName) {
        if (buildingsIdsWithSelectName[buildingAasId] === choosedBuilding) {
          parentId = buildingAasId
          await this.addHasPart(buildingAasId, gatewayAasId)
          //await this.inititalPostBomIsPartOf(buildingAasId, gatewayAasId)
        }
      }
      //this.fetchGeneralInfos()
      // const semanticIdAasTypeBacnet = 'https://th-koeln.de/gart/BACnetDeviceAAS/1/0'

      //const aasBacnetIds = await this.getAasByType(semanticIdAasTypeBacnet)

      const digitalNameplateIdShortPaths = {
        manufacturerName: ['ManufacturerName'],
        serialNumber: ['SerialNumber']
      }
      const digitalNameplate = 'Nameplate'

      let aasIdShort = await this.getAasIdShortByIdentifier(gatewayAasId)
      let parentAasIdShort = await this.getAasIdShortByIdentifier(parentId)
      let nameplateSeInformationAll = await this.getSeValue(
        gatewayAasId,
        digitalNameplate,
        digitalNameplateIdShortPaths
      )
      let manufacturerName = nameplateSeInformationAll['manufacturerName'][0]['text']
      let basyxNlpResult = await this.getSubmodel(gatewayAasId, 'NLPClassificationResult')
      let nlpDone
      if (basyxNlpResult === '') {
        nlpDone = false
      } else {
        nlpDone = true
      }
      let bacnetNameplateInformation = {
        'Digital Nameplate': {
          Herstellername: manufacturerName,
          Seriennummer: nameplateSeInformationAll['serialNumber']
        },
        'AAS ID Short': aasIdShort,
        'AAS ID': gatewayAasId,
        ParentAasId: parentId,
        ParentAasIdShort: parentAasIdShort,
        NlpDone: nlpDone
      }
      this.loadedBacnetInformationAssigned.push(bacnetNameplateInformation)

      // await this.loadBacnetInformation(aasBacnetIds)
      this.loadingBacnetAdding = false
    },
    async addOrganizationInformation(organizationName, country, city, zipcode, street) {
      const semanticIdType = 'https://th-koeln.de/gart/CompanyAAS/1/0'
      const companyAasId = await this.createAas(semanticIdType, organizationName)

      const submodelIdShort = 'CompanyInformation'
      const semanticIdSubmodel = 'https://th-koeln.de/gart/vocabulary/CompanyInformation/1/0'
      const submodelElementValues = {
        CompanyName: organizationName,
        Address: {
          Street: street,
          Zipcode: zipcode,
          CityTown: city,
          NationalCode: country
        }
      }

      await this.addSubmodelElements(
        companyAasId,
        submodelIdShort,
        semanticIdSubmodel,
        submodelElementValues
      )
      this.fetchGeneralInfos(this.userId)
    },
    async editOrganizationInformation(organizationName, country, city, zipcode, street) {
      const organizationInformation = {
        organizationName: organizationName,
        country: country,
        city: city,
        zipcode: zipcode,
        street: street
      }
      const companyIdShortPaths = {
        organizationName: ['CompanyName'],
        country: ['Address', 'NationalCode'],
        city: ['Address', 'CityTown'],
        zipcode: ['Address', 'Zipcode'],
        street: ['Address', 'Street']
      }
      //(organizationInformation)

      const semanticIdAasType = 'https://th-koeln.de/gart/CompanyAAS/1/0'
      const aasIds = await this.getAasByType(semanticIdAasType)
      const companyAasId = aasIds[0]

      const submodelIdShort = 'CompanyInformation'
      for (let element in companyIdShortPaths) {
        let idShort = companyIdShortPaths[element]
        await this.editSeValue(
          companyAasId,
          submodelIdShort,
          idShort,
          organizationInformation[element]
        )
      }
      this.fetchGeneralInfos(this.userId)
    },

    async addSiteInformation(country, city, street, streetNumber, lat, lng, zipcode, siteName) {
      const semanticIdCompanyAasType = 'https://th-koeln.de/gart/CompanyAAS/1/0'
      const aasIds = await this.getAasByType(semanticIdCompanyAasType)
      const companyAasId = aasIds[0]

      const semanticIdSiteAasType = 'https://th-koeln.de/gart/SiteAAS/1/0'
      const siteAasId = await this.createAas(semanticIdSiteAasType, siteName)

      const submodelIdShort = 'SiteInformation'
      const semanticIdSubmodel = 'https://th-koeln.de/gart/vocabulary/SiteInformation/1/0'
      const submodelElementValues = {
        SiteName: siteName,
        Address: {
          Street: street,
          Zipcode: zipcode,
          CityTown: city,
          NationalCode: country,
          Lattitude: lat,
          Longitude: lng
        }
      }

      await this.addSubmodelElements(
        siteAasId,
        submodelIdShort,
        semanticIdSubmodel,
        submodelElementValues
      )

      const companyChilds = await this.getBomChilds(companyAasId)
      //if (companyChilds.length === 0) {
      //await this.inititalPostBomHasPart(companyAasId, siteAasId)
      //} else if (companyChilds.length >= 1) {
      await this.addHasPart(companyAasId, siteAasId)
      //}
      //await this.inititalPostBomIsPartOf(companyAasId, siteAasId)

      const siteIdShortPaths = {
        siteName: ['SiteName'],
        country: ['Address', 'NationalCode'],
        city: ['Address', 'CityTown'],
        zipcode: ['Address', 'Zipcode'],
        lat: ['Address', 'Lattitude'],
        lng: ['Address', 'Longitude'],
        street: ['Address', 'Street']
      }

      const siteInformation = await this.getSeValue(siteAasId, submodelIdShort, siteIdShortPaths)

      this.loadedSiteInformation.push(siteInformation)

      this.loadedSiteInformationWithBuildings = this.getBuildingsForEachSite()

      //this.fetchGeneralInfos()
    },

    async getBuildingsForEachSite() {
      const buildingIdShortPaths = {
        buildingName: ['BuildingName'],
        country: ['Address', 'NationalCode'],
        city: ['Address', 'CityTown'],
        zipcode: ['Address', 'Zipcode'],
        lat: ['Address', 'Lattitude'],
        lng: ['Address', 'Longitude'],
        street: ['Address', 'Street']
      }

      this.loadedSiteInformationWithBuildings = []
      this.loadedBuildingWithGrundfunktion = []

      const semanticIdAasTypeSite = 'https://th-koeln.de/gart/SiteAAS/1/0'
      const siteAasIds = await this.getAasByType(semanticIdAasTypeSite)

      const siteSubmodelId = 'SiteInformation'
      const buildingSubmodelId = 'BuildingInformation'

      const allSitesWithBuildings = await Promise.all(
        siteAasIds.map(async (siteAasId) => {
          const siteName = await this.getSeValue(siteAasId, siteSubmodelId, {
            siteName: ['SiteName']
          })
          const buildingIds = await this.getBomChilds(siteAasId)

          const buildings = await Promise.all(
            buildingIds.map(async (buildingAasId) => {
              //const buildingInformation = await this.getSeValue(buildingAasId, buildingSubmodelId, buildingIdShortPaths);

              const buildingInformationBasyx = await this.getAllSubmodelElementValues(
                buildingAasId,
                buildingSubmodelId
              )

              const addressArrayBuilding = buildingInformationBasyx?.Address || []

              const buildingInformation = {
                buildingName: buildingInformationBasyx?.BuildingName || '',
                country: addressArrayBuilding.find((item) => item.NationalCode)?.NationalCode || '',
                city: addressArrayBuilding.find((item) => item.CityTown)?.CityTown || '',
                zipcode: addressArrayBuilding.find((item) => item.Zipcode)?.Zipcode || '',
                street: addressArrayBuilding.find((item) => item.Street)?.Street || '',
                lat: addressArrayBuilding.find((item) => item.Lattitude)?.Lattitude || '',
                lng: addressArrayBuilding.find((item) => item.Longitude)?.Longitude || ''
              }

              //console.log(buildingInformation)

              const grundfunktionenInBuildings = await this.getBomChilds(buildingAasId)

              this.loadedBuildingWithGrundfunktion.push({
                [buildingAasId]: grundfunktionenInBuildings
              })

              return {
                [buildingAasId]: buildingInformation
              }
            })
          )

          return {
            siteName: siteName.siteName,
            siteAasId,
            buildings // Store all buildings for the site in an array
          }
        })
      )

      this.loadedSiteInformationWithBuildings = allSitesWithBuildings
      return allSitesWithBuildings
    },

    async addBuildingInformation(
      site,
      buildingName,
      country,
      city,
      street,
      streetNumber,
      lat,
      lng,
      zipcode
    ) {
      const siteAasId = site['siteAasId']

      const semanticIdBuildingAasType = 'https://th-koeln.de/gart/BuildingAAS/1/0'
      const buildingAasId = await this.createAas(semanticIdBuildingAasType, buildingName)

      const submodelIdShort = 'BuildingInformation'
      const semanticIdSubmodel = 'https://th-koeln.de/gart/vocabulary/BuildingInformation/1/0'
      const submodelElementValues = {
        BuildingName: buildingName,
        Address: {
          Street: street,
          Zipcode: zipcode,
          CityTown: city,
          NationalCode: country,
          Lattitude: lat,
          Longitude: lng
        }
      }

      await this.addSubmodelElements(
        buildingAasId,
        submodelIdShort,
        semanticIdSubmodel,
        submodelElementValues
      )

      await this.addHasPart(siteAasId, buildingAasId)
      //await this.inititalPostBomIsPartOf(siteAasId, buildingAasId)

      await this.getBuildingsForEachSite()

      //this.fetchGeneralInfos()
    }
  }
})
