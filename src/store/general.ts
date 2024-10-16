// Module Imports
import { DateTime } from 'luxon';
import { defineStore } from 'pinia';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { v4 as uuidv4 } from 'uuid';

// Type Imports
import type Company from '@/types/global/company/Company';
import type { Site, SiteWithBuildinginformation } from '@/types/global/site/Site';
import type { Building } from '@/types/global/building/Building';
import type { Kpi } from '@/types/global/kpi/Kpi';
import type { Subsection } from '@/types/global/subsections/Subsection';
import type { Alert } from '@/types/Alert';
import { TimelineLookbackOptions, TimeRangeDropdownConfig } from '@/types/enums/TimeRangeDropdown';

// Helper Imports
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import type { Plant } from '@/types/global/plant/Plant';
import type { TimelineDataPoint } from '@/types/global/timeline/Timeline';

// Authenticator definition
const auth = useAuthenticator();

interface GeneralStoreState {
  time: DateTime;
  kpiLookbackWindow: {
    currentValue: TimelineLookbackOptions;
    customStartDate?: DateTime;
    customEndDate?: DateTime;
  };
  windowDimensions: {
    width: number | null;
    height: number | null;
  };
  alerts: Alert[];
  baseInfoState: {
    companies: Company[];
    sites: Site[];
    requestTimestamp: DateTime | null;
    isLoading: boolean;
  };
  siteState: {
    site: SiteWithBuildinginformation | null;
    kpiState: {
      kpis: Kpi[];
      requestTimestamp: DateTime | null;
      isLoading: boolean;
    };
    requestTimestamp: DateTime | null;
    isLoading: boolean;
  };
  buildingState: {
    building: Building | null;
    kpiState: {
      kpis: Kpi[];
      requestTimestamp: DateTime | null;
      isLoading: boolean;
    };
    subsectionState: {
      subsections: Subsection[];
      requestTimestamp: DateTime | null;
      isLoading: boolean;
    };
    requestTimestamp: DateTime | null;
    isLoading: boolean;
  };
  subsectionState: {
    subsection: Subsection | null;
    requestTimestamp: DateTime | null;
    isLoading: boolean;
  };
  plantState: {
    plant: Plant | null;
    requestTimestamp: DateTime | null;
    isLoading: boolean;
  };
  chartData: any[];
}

// @TODO: We can check, if we can put the default values into a different file
const defaultbaseInfoState = {
  companies: [],
  sites: [],
  requestTimestamp: null,
  isLoading: false,
};

const defaultWindowDimensionsState = {
  width: null,
  height: null,
};

const defaultKPIState = {
  kpis: [],
  requestTimestamp: null,
  isLoading: false,
};

const defaultPlantState = {
  plant: null,
  requestTimestamp: null,
  isLoading: false,
};

const defaultSubsectionsState = {
  subsections: [],
  requestTimestamp: null,
  isLoading: false,
};

const defaultSubsectionState = {
  subsection: null,
  requestTimestamp: null,
  isLoading: false,
};

const defaultSiteState = {
  site: null,
  kpiState: defaultKPIState,
  requestTimestamp: null,
  isLoading: false,
};

const defaultBuildingState = {
  building: null,
  kpiState: defaultKPIState,
  requestTimestamp: null,
  isLoading: false,
  subsectionState: defaultSubsectionsState,
};

export const useGeneralStore = defineStore('general', {
  state: (): GeneralStoreState => ({
    time: DateTime.local(),
    kpiLookbackWindow: {
      currentValue: TimelineLookbackOptions.FOURTEEN_DAYS,
    },
    windowDimensions: defaultWindowDimensionsState,
    baseInfoState: defaultbaseInfoState,
    siteState: defaultSiteState,
    buildingState: defaultBuildingState,
    chartData: [],
    alerts: [],
    subsectionState: defaultSubsectionState,
    plantState: defaultPlantState,
  }),
  actions: {
    /**
     * Update the global time
     * @returns {void}
     */
    updateGlobalTime(): void {
      // Initially we set the global time to now to have a value...
      this.time = DateTime.local();
      // ...then we check how far along we are to the next full minute...
      const distanceToNearestMinute = this.time.endOf('minute').diff(this.time).as('millisecond');
      // ...at which time we start the global clock which updates every minute
      setTimeout(() => {
        this.updateGlobalTime();
      }, distanceToNearestMinute);
    },

    /**
     * Set the window dimensions
     * @returns {void}
     */
    setWindowDimensions(): void {
      this.windowDimensions.width = window.innerWidth;
      this.windowDimensions.height = window.innerHeight;
    },

    /**
     * Add a new alert to the alert list
     * @param {Alert} alert
     * @returns {string} The id of the alert
     */
    addAlert(alert: Alert): string {
      const alertId = uuidv4();
      this.alerts.push({
        ...alert,
        id: alertId,
        time: DateTime.now().toFormat('HH:mm'),
      });
      return alertId;
    },

    /**
     * Add a new alert to the alert list
     * @param {Alert} alert
     * @returns {void}
     */
    removeAlert(alertId: string): void {
      this.alerts = this.alerts.filter((alert) => alert.id !== alertId);
    },

    /**
     * Load base informations for the application
     * @returns {Promise<void>}
     */
    async loadBaseInformations(): Promise<void> {
      this.baseInfoState = defaultbaseInfoState;

      this.baseInfoState.isLoading = true;

      // Fetching types Site Information
      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      this.baseInfoState.sites = (await FetchHelper.apiCall(
        `/middleware/sites?${q}`,
        requestOptions,
      )) as Site[];

      // Fetching types Company Information
      this.baseInfoState.companies = (await FetchHelper.apiCall(
        `/middleware/companies?${q}`,
        requestOptions,
      )) as Company[];

      this.baseInfoState.requestTimestamp = DateTime.now();
      this.baseInfoState.isLoading = false;
    },

    async refetchKpiChartDataForSiteKpis(): Promise<void> {
      const siteId = this.siteState.site?.id;

      if (!siteId) {
        return;
      }

      this.siteState.kpiState.isLoading = true;

      // Fetching KPI Information
      this.siteState.kpiState.kpis = await this.fetchKpiInformation(
        encodeURIComponent(siteId),
      );

      this.siteState.kpiState.requestTimestamp = DateTime.now();
      this.siteState.kpiState.isLoading = false;
    },

    async refetchKpiChartDataForBuildingKpis(): Promise<void> {
      const buildingId = this.buildingState.building?.id;

      if (!buildingId) {
        return;
      }

      this.buildingState.kpiState.isLoading = true;

      // Fetching KPI Information
      this.buildingState.kpiState.kpis = await this.fetchKpiInformation(
        encodeURIComponent(buildingId),
      );

      this.buildingState.kpiState.requestTimestamp = DateTime.now();
      this.buildingState.kpiState.isLoading = false;
    },

    async fetchKpiChartData(parentId: string, kpi: Kpi): Promise<TimelineDataPoint[]> {
      const startDate = TimeRangeDropdownConfig[this.kpiLookbackWindow.currentValue]
        .dateTransformer(this.time);

      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
        startTimestamp: startDate,
        endTimestamp: this.time.toSeconds(),
        aasIdentifier: parentId,
        sem_id_shorts: `${kpi.id}.Value.PresentValue`,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      const rawKpiData = FetchHelper.apiCall(
        `/middleware/timelines?${q}`,
        requestOptions,
      );

      return (await rawKpiData).map((data: any) => ({
        timestamp: DateTime.fromISO(data.timestamp),
        value: data.value,
      }));
    },

    async fetchKpiInformation(parentId: string): Promise<Kpi[]> {
      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      let kpi = (await FetchHelper.apiCall(
        `/middleware/kpis/${parentId}?${q}`,
        requestOptions,
      )) as Kpi[];

      const kpiDataWithCharts = kpi.map(async (kpiData) => {
        const mappedKpi = { ...kpiData };
        mappedKpi.timeline = await this.fetchKpiChartData(parentId, kpiData);
        return mappedKpi;
      });

      kpi = await Promise.all(kpiDataWithCharts);

      return kpi;
    },

    async fetchSubsectionInformation(subsectionId: string): Promise<Subsection> {
      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      return (await FetchHelper.apiCall(
        `/middleware/subsections/${encodeURIComponent(subsectionId)}?${q}`,
        requestOptions,
      )) as Subsection;
    },

    async fetchPlantInformation(plantId: string): Promise<any> {
      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      return (await FetchHelper.apiCall(
        `/middleware/plants/${encodeURIComponent(plantId)}/modules?${q}`,
        requestOptions,
      )) as any; //  as Plant;
    },

    async loadSiteInformation(siteId: string): Promise<void> {
      this.siteState = defaultSiteState;
      this.siteState.isLoading = true;
      this.siteState.kpiState.isLoading = true;

      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      this.siteState.site = (await FetchHelper.apiCall(
        `/middleware/sites/${siteId}?${q}`,
        requestOptions,
      )) as SiteWithBuildinginformation;

      this.siteState.requestTimestamp = DateTime.now();
      this.siteState.isLoading = false;

      // Fetching KPI Information
      this.siteState.kpiState.kpis = await this.fetchKpiInformation(siteId);

      this.siteState.kpiState.requestTimestamp = DateTime.now();
      this.siteState.kpiState.isLoading = false;
    },

    async loadBuildingInformation(buildingId: string): Promise<void> {
      this.buildingState = defaultBuildingState;
      this.buildingState.isLoading = true;
      this.buildingState.kpiState.isLoading = true;

      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      this.buildingState.building = (await FetchHelper.apiCall(
        `/middleware/buildings/${buildingId}?${q}`,
        requestOptions,
      )) as Building;

      this.buildingState.requestTimestamp = DateTime.now();
      this.buildingState.isLoading = false;

      // Fetching KPI Information
      this.buildingState.kpiState.kpis = await this.fetchKpiInformation(buildingId);

      this.buildingState.kpiState.requestTimestamp = DateTime.now();
      this.buildingState.kpiState.isLoading = false;

      // Fetching Subsection Information
      this.buildingState.subsectionState.subsections = [];
      this.buildingState.subsectionState.isLoading = true;

      this.buildingState.building.data.subsections?.forEach(async (subsection) => {
        this.buildingState.subsectionState.subsections.push(
          await this.fetchSubsectionInformation(subsection.id),
        );
      });

      this.buildingState.subsectionState.requestTimestamp = DateTime.now();
      this.buildingState.subsectionState.isLoading = false;
    },

    async loadSubsectionInformation(subsectionId: string): Promise<void> {
      this.subsectionState.isLoading = true;

      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);
      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;
      this.subsectionState.subsection = (await FetchHelper.apiCall(
        `/middleware/subsections/${subsectionId}/plants?${q}`,
        requestOptions,
      )) as Subsection;

      this.subsectionState.requestTimestamp = DateTime.now();

      this.subsectionState.isLoading = false;
    },

    async loadPlantInformation(plantid: string): Promise<void> {
      this.plantState.isLoading = true;

      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);
      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;
      this.plantState.plant = (await FetchHelper.apiCall(
        `/middleware/plants/${plantid}/modules?${q}`,
        requestOptions,
      )) as Plant;

      this.plantState.requestTimestamp = DateTime.now();

      this.plantState.isLoading = false;
    },
  },
});
