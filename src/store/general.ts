// Module Imports
import { DateTime } from 'luxon';
import { defineStore } from 'pinia';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { v4 as uuidv4 } from 'uuid';

// Type Imports
import type Company from '@/types/Company';
import type { Site, SiteWithBuildinginformation } from '@/types/Site';
import type { Building } from '@/types/Building';
import type { Kpi } from '@/types/Kpi';
import type { Alert } from '@/types/Alert';
import { AlertTypes } from '@/types/enums/AlertTypes';

// Helper Imports
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import type { Subsection } from '@/types/Subsection';

// Authenticator definition
const auth = useAuthenticator();

interface GeneralStoreState {
  time: DateTime;
  windowDimensions: {
    width: number | null;
    height: number | null;
  },
  alerts: Alert[],
  baseInfoState: {
    companies: Company[],
    sites: Site[],
    requestTimestamp: DateTime | null,
    isLoading: boolean,
  },
  siteState: {
    site: SiteWithBuildinginformation | null;
    kpiState: {
      kpis: Kpi[],
      requestTimestamp: DateTime | null,
      isLoading: boolean,
    },
    requestTimestamp: DateTime | null;
    isLoading: boolean,
  },
  buildingState: {
    building: Building | null;
    kpiState: {
      kpis: Kpi[],
      requestTimestamp: DateTime | null,
      isLoading: boolean,
    },
    subsectionState: {
      subsections: Subsection[],
      requestTimestamp: DateTime | null,
      isLoading: boolean,
    },
    requestTimestamp: DateTime | null;
    isLoading: boolean,
  },
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

const defaultSubsectionState = {
  subsections: [],
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
  subsectionState: defaultSubsectionState,
};

export const useGeneralStore = defineStore('general', {
  state: (): GeneralStoreState => ({
    time: DateTime.local(),
    windowDimensions: defaultWindowDimensionsState,
    baseInfoState: defaultbaseInfoState,
    siteState: defaultSiteState,
    buildingState: defaultBuildingState,
    alerts: [],
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
     * Load alerts for the application
     * @returns {Promise<void>}
     */
    async loadAlerts(): Promise<void> {
      // @TODO Implement loading of alerts
      this.alerts = [
        {
          id: uuidv4(),
          title: 'Notification Title 1',
          type: AlertTypes.ERROR,
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
          time: DateTime.now().toFormat('HH:mm'),
        },
        {
          id: uuidv4(),
          title: 'Notification Title 2',
          type: AlertTypes.SUCCESS,
          description: 'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
          time: DateTime.now().toFormat('HH:mm'),
        },
        {
          id: uuidv4(),
          title: 'Notification Title 3',
          type: AlertTypes.SUCCESS,
          description: 'Lorem ipsum dolor sit amet.',
          time: DateTime.now().toFormat('HH:mm'),
        },
      ];
    },

    /**
     * Add a new alert to the alert list
     * @param {Alert} alert
     * @returns {void}
     */
    removeAlerts(alertId: string): void {
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

      this.baseInfoState.sites = await FetchHelper.apiCall(
        `/middleware/sites?${q}`,
        requestOptions,
      ) as Site[];

      // Fetching types Company Information
      this.baseInfoState.companies = await FetchHelper.apiCall(
        `/middleware/companies?${q}`,
        requestOptions,
      ) as Company[];

      this.baseInfoState.requestTimestamp = DateTime.now();
      this.baseInfoState.isLoading = false;
    },

    async fetchKpiInformation(parentId: string): Promise<Kpi[]> {
      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      return (await FetchHelper.apiCall(
        `/middleware/kpis/${parentId}?${q}`,
        requestOptions,
      )) as Kpi[];
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

      this.siteState.site = await FetchHelper.apiCall(
        `/middleware/sites/${siteId}?${q}`,
        requestOptions,
      ) as SiteWithBuildinginformation;

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

      this.buildingState.building.data.Subsections?.forEach(async (subsection) => {
        this.buildingState.subsectionState.subsections.push(
          await this.fetchSubsectionInformation(subsection.id),
        );
      });

      this.buildingState.subsectionState.requestTimestamp = DateTime.now();
      this.buildingState.subsectionState.isLoading = false;
    },
  },
});
