// Module Imports
import { DateTime } from 'luxon';
import { defineStore } from 'pinia';
import { useAuthenticator } from '@aws-amplify/ui-vue';

// Type Imports
import type Company from '@/types/Company';
import type { Site, SiteWithBuildinginformation } from '@/types/Site';
import type { Building } from '@/types/Building';

// Helper Imports
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import type { Kpi } from '@/types/Kpi';

// Authenticator definition
const auth = useAuthenticator();

interface GeneralStoreState {
  globalLoadingOverlay: boolean;
  sites: Site[];
  companies: Company[];
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
    requestTimestamp: DateTime | null;
    isLoading: boolean,
  },
}

// @TODO: We can check, if we can put the default values into a different file
const defaultKPIState = {
  kpis: [],
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
};

export const useGeneralStoreV2 = defineStore('general_v2', {
  state: (): GeneralStoreState => ({
    globalLoadingOverlay: false,
    sites: [],
    companies: [],
    siteState: defaultSiteState,
    buildingState: defaultBuildingState,
  }),
  actions: {
    /**
     * Load base informations for the application
     * @returns {Promise<void>}
     */
    async loadBaseInformations(): Promise<void> {
      // Fetching types Site Information
      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      this.sites = await FetchHelper.apiCall(
        `/middleware/sites?${q}`,
        requestOptions,
      ) as Site[];

      // Fetching types Company Information
      this.companies = await FetchHelper.apiCall(
        `/middleware/companies?${q}`,
        requestOptions,
      ) as Company[];
    },

    async loadKpiInformation(parentId: string): Promise<Kpi[]> {
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

    async loadSiteInformation(siteId: string): Promise<void> {
      this.siteState.isLoading = true;

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
    },

    async loadBuildingInformation(buildingId: string): Promise<void> {
      this.buildingState.isLoading = false;

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
    },
  },
});
