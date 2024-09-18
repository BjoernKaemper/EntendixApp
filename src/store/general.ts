// import the defineStore function
import { defineStore } from 'pinia';
import axios from 'axios';
// import axios from 'axios'

export const useGeneralStore = defineStore('general', {
  // arrow function recommended for full type inference
  state: () => ({
    userId: '',
    // Dev
    // aasServer: 'https://kzbgm955b9.execute-api.us-east-1.amazonaws.com/testEnv/',
    // Live
    aasServer: 'https://4w6tu92q6h.execute-api.eu-central-1.amazonaws.com/Live/',
    homeLoading: false,
    loading: false,
    loadedSiteInformation: [],
    loadedSiteInformationWithBuildings: [],
    // loadedSiteBuildingInformation: [],
    loadedOrganizationInformation: [],
    loadedBacnetInformationNotAssigned: [],
    loadedBacnetInformationAssigned: [],
    loadedGatewayInformation: [],
    loadingBacnetAdding: false,
    buildingsList: [],
    buildingsIdsWithSelectName: {},
    loadedBuildingWithGrundfunktion: [],
    chartTypes: [],
    // buildingIdsArray: []
    // all these properties will have their type inferred automatically
  } as {
    userId: string,
    // Dev
    // aasServer: 'https://kzbgm955b9.execute-api.us-east-1.amazonaws.com/testEnv/',
    // Live
    aasServer: string,
    homeLoading: boolean,
    loading: boolean,
    loadedSiteInformation: any[],
    loadedSiteInformationWithBuildings: any[],
    // loadedSiteBuildingInformation: [],
    loadedOrganizationInformation: any[],
    loadedBacnetInformationNotAssigned: any[],
    loadedBacnetInformationAssigned: any[],
    loadedGatewayInformation: any[],
    loadingBacnetAdding: boolean,
    buildingsList: any[],
    buildingsIdsWithSelectName: any,
    loadedBuildingWithGrundfunktion: any[],
    chartTypes: any[]
  }),
  actions: {
    async createAas(semanticIdType: any, aasIdShort: any) {
      let aasId = '';
      try {
        const createAas = 'aasServices/createAasByAasType';
        const url = this.aasServer + createAas;
        const response = await axios.post(url, {
          userId: this.userId,
          semanticId: semanticIdType,
          idShort: aasIdShort,
        });
        aasId = response.data.body;
      } catch (error) {
        console.log(error);
      }
      return aasId;
    },

    async addSubmodelElements(
      companyAasId: any,
      submodelIdShort: any,
      semanticIdSubmodel: any,
      submodelElementValues: any,
    ) {
      try {
        const updateSubmodel = 'submodelServices/addSubmodelElements';
        const url = this.aasServer + updateSubmodel;
        const response = await axios.post(url, {
          userId: this.userId,
          aasIdentifier: companyAasId,
          submodelIdShort,
          semanticIdSubmodel,
          submodelElementValues,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getSemanticIdAas(aasId: any) {
      const path = 'aasServices/getAasSemanticIdByIdentifier';
      const url = this.aasServer + path;
      let semanticId = [];
      try {
        const response = await axios.post(url, {
          userId: this.userId,
          aasIdentifier: aasId,
        });
        semanticId = response.data.body;
      } catch (error) {
        console.log(error);
      }
      return semanticId;
    },

    async addHasPart(parentId: any, partId: any) {
      const bom = 'submodelServices/bom/addHasPartElement';
      const urlBom = this.aasServer + bom;
      try {
        const response = await axios.post(urlBom, {
          userId: this.userId,
          aasIdentifier: parentId,
          HasPart_AasIdentifier: partId,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getBomChilds(aasId: any) {
      const bomChilds = 'submodelServices/bom/getChilds';
      const urlBomChilds = this.aasServer + bomChilds;
      let childAasIds = [];
      try {
        const response = await axios.post(urlBomChilds, {
          userId: this.userId,
          aasIdentifier: aasId,
        });
        if (response.data.body.length === 0) {
          childAasIds = [];
        } else {
          childAasIds = response.data.body;
        }
      } catch (error) {
        console.log(error);
      }
      return childAasIds;
    },
    async getBomParent(aasId: any) {
      const bomParent = 'submodelServices/bom/getParents';
      const urlBomParent = this.aasServer + bomParent;
      let parentAasId = [];

      console.log(aasId);
      console.log(this.userId);

      try {
        const response = await axios.post(urlBomParent, {
          userId: this.userId,
          aasIdentifier: aasId,
        });

        parentAasId = response.data.body;
      } catch (error) {
        console.log(error);
      }
      return parentAasId;
    },
    async getAasByType(semanticId: any) {
      const getAasByType = 'aasServices/getAllAasIdentifierByAasType';
      const url = this.aasServer + getAasByType;
      let aasIds = '';
      try {
        const response = await axios.post(url, {
          semanticId,
          userId: this.userId,
        });
        aasIds = response.data.body;
      } catch (error) {
        console.log(error);
      }

      return aasIds;
    },
    async getSubmodel(aasId: any, submodelId: any) {
      const getSubmodel = 'submodelServices/getSubmodelByIdShort';
      const url = this.aasServer + getSubmodel;
      let responseBasyx = '';

      try {
        const response = await axios.post(url, {
          userId: this.userId,
          aasIdentifier: aasId,
          submodelIdShort: submodelId,
        });
        responseBasyx = response.data.body;
      } catch (error) {
        console.log(error);
      }
      return responseBasyx;
    },

    async getSeValue(aasId: any, submodelIdShort: any, idShortPaths: any) {
      const getSeValue = 'submodelServices/getSubmodelElementValue';
      const urlSeValue = this.aasServer + getSeValue;
      const allSeInformations: { [key: string]: any } = {};

      const requests = Object.entries(idShortPaths).map(async ([element, value]) => {
        try {
          const response = await axios.post(urlSeValue, {
            userId: this.userId,
            aasIdentifier: aasId,
            submodelIdShort,
            submodelElementShortIdPath: value,
          });

          if (response.data.body !== '') {
            allSeInformations[element] = response.data.body;
          }
        } catch (error) {
          console.error(error);
        }
      });

      await Promise.all(requests);
      return allSeInformations;
    },

    async getAllSubmodelElementValues(aasId: any, submodelIdShort: any) {
      const getValues = 'submodelServices/getAllSubmodelElementValues';
      const urlValues = this.aasServer + getValues;
      let values = {};

      try {
        const response = await axios.post(urlValues, {
          userId: this.userId,
          aasIdentifier: aasId,
          submodelIdShort,
        });
        values = response.data.body;
      } catch (error) {
        console.log(error);
      }

      return values;
    },

    async editSeValue(aasId: any, submodelIdShort: any, idShort: any, value: any) {
      const editSeValue = 'submodelServices/editSubmodelElementValue';
      const url = this.aasServer + editSeValue;

      if (idShort.length == 1) {
        try {
          const response = await axios.post(url, {
            userId: this.userId,
            aasIdentifier: aasId,
            submodelIdShort,
            submodelElementShortIdPath: [idShort[0]],
            submodelElementValues: value,
          });
        } catch (error) {
          console.log(error);
        }
      } else if (idShort.length == 2) {
        try {
          const response = await axios.post(url, {
            userId: this.userId,
            aasIdentifier: aasId,
            submodelIdShort,
            submodelElementShortIdPath: [idShort[0], idShort[1]],
            submodelElementValues: value,
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getAasIdShortByIdentifier(aasId: any) {
      const getAasIdShort = 'aasServices/getAasIdShortByIdentifier';
      const url = this.aasServer + getAasIdShort;
      let idShort = '';
      try {
        const response = await axios.post(url, {
          userId: this.userId,
          aasIdentifier: aasId,
        });
        idShort = response.data.body;
      } catch (error) {
        console.log(error);
      }
      return idShort;
    },

    async loadBacnetInformation(aasBacnetIds: any) {
      this.loadedBacnetInformationNotAssigned = [];
      this.loadedBacnetInformationAssigned = [];
      const digitalNameplateIdShortPaths = {
        manufacturerName: ['ManufacturerName'],
        serialNumber: ['SerialNumber'],
      };
      const digitalNameplate = 'Nameplate';

      const allBacnetGatewayInformationNotAssigned: any[] = [];
      const allBacnetGatewayInformationAssigned: any[] = [];

      const bacnetInfoPromises = aasBacnetIds.map(async (aasId: any) => {
        const parent = await this.getBomParent(aasId);

        if (parent.length === 0) {
          const [aasIdShort, nameplateSeInformationAll]: any[] = await Promise.all([
            this.getAasIdShortByIdentifier(aasId),
            this.getSeValue(aasId, digitalNameplate, digitalNameplateIdShortPaths),
          ]);

          const manufacturerName = nameplateSeInformationAll.manufacturerName?.[0]?.text ?? 'Unknown';

          const bacnetNameplateInformation = {
            'Digital Nameplate': {
              Herstellername: manufacturerName,
              Seriennummer: nameplateSeInformationAll.serialNumber ?? 'Unknown',
            },
            'AAS ID Short': aasIdShort,
            'AAS ID': aasId,
          };

          allBacnetGatewayInformationNotAssigned.push(bacnetNameplateInformation);
        } else {
          const [aasIdShort, buildingAasId, nameplateSeInformation, basyxNlpResult]: any[] = await Promise.all([
            this.getAasIdShortByIdentifier(aasId),
            this.getBomParent(parent[0]),
            this.getAllSubmodelElementValues(aasId, digitalNameplate),
            this.getSubmodel(aasId, 'NLPClassificationResult'),
          ]);

          const buildingAasIdShort = await this.getAasIdShortByIdentifier(buildingAasId[0]);

          const nameplateIdShortPaths = {
            Herstellername: nameplateSeInformation.ManufacturerName?.[0]?.de ?? 'Unknown',
            Seriennummer: nameplateSeInformation.SerialNumber ?? 'Unknown',
          };

          const nlpDone = basyxNlpResult !== '';

          const bacnetNameplateInformation = {
            'Digital Nameplate': {
              Herstellername: nameplateIdShortPaths.Herstellername,
              Seriennummer: nameplateIdShortPaths.Seriennummer,
            },
            'AAS ID Short': aasIdShort,
            'AAS ID': aasId,
            ParentAasId: parent,
            ParentAasIdShort: buildingAasIdShort,
            NlpDone: nlpDone,
          };

          allBacnetGatewayInformationAssigned.push(bacnetNameplateInformation);
        }
      });

      await Promise.all(bacnetInfoPromises);

      this.loadedBacnetInformationNotAssigned = allBacnetGatewayInformationNotAssigned;
      this.loadedBacnetInformationAssigned = allBacnetGatewayInformationAssigned;

      const buildingsIdsWithSelectName: any = {};
      const buildingsList: any[] = [];

      this.loadedSiteInformationWithBuildings.forEach((siteInformation) => {
        const { siteName } = siteInformation;
        const buildingsArray = Array.isArray(siteInformation.buildings)
          ? siteInformation.buildings
          : [];

        buildingsArray.forEach((buildingInformation: any) => {
          if (Array.isArray(buildingInformation)) {
            buildingInformation.forEach((building) => {
              const { buildingName } = building;
              const siteBuildingName = `${buildingName}, ${siteName}`;
              buildingsList.push(siteBuildingName);
              buildingsIdsWithSelectName[building.id] = siteBuildingName;
            });
          } else {
            const { buildingName } = buildingInformation;
            const siteBuildingName = `${buildingName}, ${siteName}`;
            buildingsList.push(siteBuildingName);
            buildingsIdsWithSelectName[buildingInformation.id] = siteBuildingName;
          }
        });
      });

      this.buildingsList = buildingsList;
      this.buildingsIdsWithSelectName = buildingsIdsWithSelectName;
    },

    async loadBacnetInformationForGateway(aasBacnetIds: any) {
      const digitalNameplateIdShortPaths = {
        manufacturerName: ['ManufacturerName'],
        serialNumber: ['SerialNumber'],
      };
      const digitalNameplate = 'Nameplate';
      const allBacnetInformation = [];

      for (const bacnetDevice in aasBacnetIds) {
        const aasId = aasBacnetIds[bacnetDevice];
        const aasIdShort = await this.getAasIdShortByIdentifier(aasId);
        const nameplateSeInformationAll = await this.getSeValue(
          aasId,
          digitalNameplate,
          digitalNameplateIdShortPaths,
        );
        const manufacturerName = nameplateSeInformationAll.manufacturerName[0].text;

        const bacnetNameplateInformation = {
          'Digital Nameplate': {
            Herstellername: manufacturerName,
            Seriennummer: nameplateSeInformationAll.serialNumber,
          },
          'AAS ID Short': aasIdShort,
          'AAS ID': aasId,
        };

        allBacnetInformation.push(bacnetNameplateInformation);
      }
      return allBacnetInformation;
    },

    async loadGatewayInformation(aasGatewayIds: any) {
      this.loadedGatewayInformation = [];

      const monkiGatewayIdShortPaths = {
        thingName: ['AWSIotCoreInformation', 'ThingName'],
        thingId: ['AWSIotCoreInformation', 'ThingId'],
        connectionStatus: ['ConnectionInformation', 'ConnectionStatus'],
      };
      const submodelGateway = 'MonKiGateway';
      const allGatewayInformation = [];

      for (const device in aasGatewayIds) {
        const aasId = aasGatewayIds[device];
        const parent = await this.getBomParent(aasId);
        const children = await this.getBomChilds(aasId);

        const aasIdShort = await this.getAasIdShortByIdentifier(aasId);
        const parentAasIdShort = await this.getAasIdShortByIdentifier(parent);
        const gatewaySeInformation = await this.getSeValue(
          aasId,
          submodelGateway,
          monkiGatewayIdShortPaths,
        );

        const bacnetInformation = await this.loadBacnetInformationForGateway(children);
        const gatewayInformation = {
          'Gateway Information': {
            Name: gatewaySeInformation.thingName,
            ID: gatewaySeInformation.thingId,
            Status: gatewaySeInformation.connectionStatus,
          },
          'AAS ID Short': aasIdShort,
          'AAS ID': aasId,
          ParentAasId: parent,
          ParentAasIdShort: parentAasIdShort,
          bacnetDevices: bacnetInformation,
        };
        allGatewayInformation.push(gatewayInformation);
      }
      this.loadedGatewayInformation = allGatewayInformation;
    },

    async postDataGetAllAasIdentifier() {
      const getAasIdentifier = 'aasServices/getAllAasIdentifier';
      const url = this.aasServer + getAasIdentifier;
      try {
        const response = await axios.post(url, {
          // Hier kannst du die Daten angeben, die du senden möchtest
          userId: this.userId,
        });
        console.log('Response-2:', response.data.body);
      } catch (error) {
        console.error('Error-2:', (error as any).message);
      }
    },

    async readCSV() {
      const reader = new FileReader();
      const rows: any[] = [];
      reader.onload = (event) => {
        const text = event?.target?.result as string;
        const lines = text?.split('\n');

        for (let i = 0; i < lines.length; i++) {
          const cells = lines[i].split(';');
          const semanticId = cells[0];
          const chartType = cells[1];
          const obj: { [key: string]: any } = {};
          obj[semanticId] = chartType;
          rows.push(obj);
        }
      };
      this.chartTypes = rows;
      const response = await fetch('/data/chartType.csv');
      const blobCsv = await response.blob();
      reader.readAsText(blobCsv);
    },

    async fetchGeneralInfos(userId: any) {
      this.homeLoading = true;
      await this.readCSV();
      this.userId = userId;

      const semanticIdAasType = 'https://th-koeln.de/gart/CompanyAAS/1/0';
      const aasIds = await this.getAasByType(semanticIdAasType);

      if (aasIds.length > 0) {
        const companyAasId = aasIds[0];

        const companySubmodelId = 'CompanyInformation';

        const organizationInformationBasyx: any = await this.getAllSubmodelElementValues(
          companyAasId,
          companySubmodelId,
        );

        const addressArrayOrganization = organizationInformationBasyx?.Address || [];

        const organizationInformation = {
          organizationName: organizationInformationBasyx?.CompanyName || '',
          country: addressArrayOrganization.find((item: any) => item?.NationalCode)?.NationalCode || '',
          city: addressArrayOrganization.find((item: any) => item?.CityTown)?.CityTown || '',
          zipcode: addressArrayOrganization.find((item: any) => item?.Zipcode)?.Zipcode || '',
          street: addressArrayOrganization.find((item: any) => item?.Street)?.Street || '',
        };

        if (Object.keys(organizationInformation).length > 0) {
          this.loadedOrganizationInformation.push(organizationInformation);
        }

        const siteAasIds = await this.getBomChilds(companyAasId);
        console.log(siteAasIds);

        const siteSubmodelId = 'SiteInformation';

        const siteInformationTest = siteAasIds.map(async (siteAasId: any) => {
          const siteInformationBasyx: any = await this.getAllSubmodelElementValues(
            siteAasId,
            siteSubmodelId,
          );

          const addressArray = siteInformationBasyx?.Address || [];

          const siteIdShortPaths = {
            siteName: siteInformationBasyx?.SiteName || '',
            country: addressArray.find((item: any) => item.NationalCode)?.NationalCode || '',
            city: addressArray.find((item: any) => item.CityTown)?.CityTown || '',
            zipcode: addressArray.find((item: any) => item.Zipcode)?.Zipcode || '',
            lat: addressArray.find((item: any) => item.Lattitude)?.Lattitude || '',
            lng: addressArray.find((item: any) => item.Longitude)?.Longitude || '',
            street: addressArray.find((item: any) => item.Street)?.Street || '',
          };

          return siteIdShortPaths;
        });

        const siteInformationResults = await Promise.all(siteInformationTest);

        this.loadedSiteInformation = siteInformationResults;

        this.loadedSiteInformationWithBuildings = await this.getBuildingsForEachSite();
      } else {
        this.loadedOrganizationInformation = [];
        this.loadedSiteInformation = [];
      }

      const semanticIdAasTypeBacnet = 'https://th-koeln.de/gart/BACnetDeviceAAS/1/0';
      const aasBacnetIds = await this.getAasByType(semanticIdAasTypeBacnet);

      await this.loadBacnetInformation(aasBacnetIds);

      this.homeLoading = false;
    },

    async addGatewayToBuilding(gateway: any, choosedBuilding: any, buildingsIdsWithSelectName: any) {
      this.loadingBacnetAdding = true;
      const gatewayAasId = gateway['AAS ID'];
      let parentId = '';

      for (const buildingAasId in buildingsIdsWithSelectName) {
        if (buildingsIdsWithSelectName[buildingAasId] === choosedBuilding) {
          parentId = buildingAasId;
          await this.addHasPart(buildingAasId, gatewayAasId);
        }
      }

      const digitalNameplateIdShortPaths = {
        manufacturerName: ['ManufacturerName'],
        serialNumber: ['SerialNumber'],
      };
      const digitalNameplate = 'Nameplate';

      const aasIdShort = await this.getAasIdShortByIdentifier(gatewayAasId);
      const parentAasIdShort = await this.getAasIdShortByIdentifier(parentId);
      const nameplateSeInformationAll = await this.getSeValue(
        gatewayAasId,
        digitalNameplate,
        digitalNameplateIdShortPaths,
      );
      const manufacturerName = nameplateSeInformationAll.manufacturerName[0].text;
      const basyxNlpResult = await this.getSubmodel(gatewayAasId, 'NLPClassificationResult');
      let nlpDone;
      if (basyxNlpResult === '') {
        nlpDone = false;
      } else {
        nlpDone = true;
      }
      const bacnetNameplateInformation = {
        'Digital Nameplate': {
          Herstellername: manufacturerName,
          Seriennummer: nameplateSeInformationAll.serialNumber,
        },
        'AAS ID Short': aasIdShort,
        'AAS ID': gatewayAasId,
        ParentAasId: parentId,
        ParentAasIdShort: parentAasIdShort,
        NlpDone: nlpDone,
      };
      this.loadedBacnetInformationAssigned.push(bacnetNameplateInformation);

      this.loadingBacnetAdding = false;
    },
    async addOrganizationInformation(organizationName: any, country: any, city: any, zipcode: any, street: any) {
      const semanticIdType = 'https://th-koeln.de/gart/CompanyAAS/1/0';
      const companyAasId = await this.createAas(semanticIdType, organizationName);

      const submodelIdShort = 'CompanyInformation';
      const semanticIdSubmodel = 'https://th-koeln.de/gart/vocabulary/CompanyInformation/1/0';
      const submodelElementValues = {
        CompanyName: organizationName,
        Address: {
          Street: street,
          Zipcode: zipcode,
          CityTown: city,
          NationalCode: country,
        },
      };

      await this.addSubmodelElements(
        companyAasId,
        submodelIdShort,
        semanticIdSubmodel,
        submodelElementValues,
      );
      this.fetchGeneralInfos(this.userId);
    },
    async editOrganizationInformation(organizationName: any, country: any, city: any, zipcode: any, street: any) {
      const organizationInformation: { [key: string]: string[] } = {
        organizationName,
        country,
        city,
        zipcode,
        street,
      };
      const companyIdShortPaths: { [key: string]: string[] } = {
        organizationName: ['CompanyName'],
        country: ['Address', 'NationalCode'],
        city: ['Address', 'CityTown'],
        zipcode: ['Address', 'Zipcode'],
        street: ['Address', 'Street'],
      };

      const semanticIdAasType = 'https://th-koeln.de/gart/CompanyAAS/1/0';
      const aasIds = await this.getAasByType(semanticIdAasType);
      const companyAasId = aasIds[0];

      const submodelIdShort = 'CompanyInformation';
      for (const element in companyIdShortPaths) {
        const idShort = companyIdShortPaths[element];
        await this.editSeValue(
          companyAasId,
          submodelIdShort,
          idShort,
          organizationInformation[element],
        );
      }
      this.fetchGeneralInfos(this.userId);
    },

    async addSiteInformation(country: any, city: any, street: any, _streetNumber: any, lat: any, lng: any, zipcode: any, siteName: any) {
      const semanticIdCompanyAasType = 'https://th-koeln.de/gart/CompanyAAS/1/0';
      const aasIds = await this.getAasByType(semanticIdCompanyAasType);
      const companyAasId = aasIds[0];

      const semanticIdSiteAasType = 'https://th-koeln.de/gart/SiteAAS/1/0';
      const siteAasId = await this.createAas(semanticIdSiteAasType, siteName);

      const submodelIdShort = 'SiteInformation';
      const semanticIdSubmodel = 'https://th-koeln.de/gart/vocabulary/SiteInformation/1/0';
      const submodelElementValues = {
        SiteName: siteName,
        Address: {
          Street: street,
          Zipcode: zipcode,
          CityTown: city,
          NationalCode: country,
          Lattitude: lat,
          Longitude: lng,
        },
      };

      await this.addSubmodelElements(
        siteAasId,
        submodelIdShort,
        semanticIdSubmodel,
        submodelElementValues,
      );

      await this.addHasPart(companyAasId, siteAasId);

      const siteIdShortPaths = {
        siteName: ['SiteName'],
        country: ['Address', 'NationalCode'],
        city: ['Address', 'CityTown'],
        zipcode: ['Address', 'Zipcode'],
        lat: ['Address', 'Lattitude'],
        lng: ['Address', 'Longitude'],
        street: ['Address', 'Street'],
      };

      const siteInformation = await this.getSeValue(siteAasId, submodelIdShort, siteIdShortPaths);

      this.loadedSiteInformation.push(siteInformation);

      this.loadedSiteInformationWithBuildings = await this.getBuildingsForEachSite();
    },

    async getBuildingsForEachSite() {
      this.loadedSiteInformationWithBuildings = [];
      this.loadedBuildingWithGrundfunktion = [];

      const semanticIdAasTypeSite = 'https://th-koeln.de/gart/SiteAAS/1/0';
      const siteAasIds: any = await this.getAasByType(semanticIdAasTypeSite);

      const siteSubmodelId = 'SiteInformation';
      const buildingSubmodelId = 'BuildingInformation';

      const allSitesWithBuildings = await Promise.all(
        siteAasIds.map(async (siteAasId: any) => {
          const siteName = await this.getSeValue(siteAasId, siteSubmodelId, {
            siteName: ['SiteName'],
          });
          const buildingIds = await this.getBomChilds(siteAasId);

          const buildings = await Promise.all(
            buildingIds.map(async (buildingAasId: any) => {
              const buildingInformationBasyx: any = await this.getAllSubmodelElementValues(
                buildingAasId,
                buildingSubmodelId,
              );

              const addressArrayBuilding = buildingInformationBasyx?.Address || [];

              const buildingInformation = {
                buildingName: buildingInformationBasyx?.BuildingName || '',
                country: addressArrayBuilding.find((item: any) => item.NationalCode)?.NationalCode || '',
                city: addressArrayBuilding.find((item: any) => item.CityTown)?.CityTown || '',
                zipcode: addressArrayBuilding.find((item: any) => item.Zipcode)?.Zipcode || '',
                street: addressArrayBuilding.find((item: any) => item.Street)?.Street || '',
                lat: addressArrayBuilding.find((item: any) => item.Lattitude)?.Lattitude || '',
                lng: addressArrayBuilding.find((item: any) => item.Longitude)?.Longitude || '',
              };

              const grundfunktionenInBuildings = await this.getBomChilds(buildingAasId);

              this.loadedBuildingWithGrundfunktion.push({
                [buildingAasId]: grundfunktionenInBuildings,
              });

              return {
                [buildingAasId]: buildingInformation,
              };
            }),
          );

          return {
            siteName: siteName.siteName,
            siteAasId,
            buildings, // Store all buildings for the site in an array
          };
        }),
      );

      this.loadedSiteInformationWithBuildings = allSitesWithBuildings;
      return allSitesWithBuildings;
    },

    async addBuildingInformation(
      site: any,
      buildingName: any,
      country: any,
      city: any,
      street: any,
      _streetNumber: any,
      lat: any,
      lng: any,
      zipcode: any,
    ) {
      const { siteAasId } = site;

      const semanticIdBuildingAasType = 'https://th-koeln.de/gart/BuildingAAS/1/0';
      const buildingAasId = await this.createAas(semanticIdBuildingAasType, buildingName);

      const submodelIdShort = 'BuildingInformation';
      const semanticIdSubmodel = 'https://th-koeln.de/gart/vocabulary/BuildingInformation/1/0';
      const submodelElementValues = {
        BuildingName: buildingName,
        Address: {
          Street: street,
          Zipcode: zipcode,
          CityTown: city,
          NationalCode: country,
          Lattitude: lat,
          Longitude: lng,
        },
      };

      await this.addSubmodelElements(
        buildingAasId,
        submodelIdShort,
        semanticIdSubmodel,
        submodelElementValues,
      );

      await this.addHasPart(siteAasId, buildingAasId);

      await this.getBuildingsForEachSite();
    },
  },
});
