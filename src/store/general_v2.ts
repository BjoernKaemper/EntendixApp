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
  currentSite: SiteWithBuildinginformation | null;
  currentKPIs: Kpi[];
  lastSiteRequestTimestamp: DateTime | null;
  currentBuilding: Building | null;
  lastBuildingRequestTimestamp: DateTime | null;
}

export const useGeneralStoreV2 = defineStore('general_v2', {
  state: (): GeneralStoreState => ({
    globalLoadingOverlay: false,
    sites: [],
    companies: [],
    currentSite: null,
    currentKPIs: [],
    lastSiteRequestTimestamp: null,
    currentBuilding: null,
    lastBuildingRequestTimestamp: null,
  }),
  actions: {
    /**
     * Load base informations for the application
     * @returns {Promise<void>}
     */
    async loadBaseInformations(): Promise<void> {
      this.globalLoadingOverlay = true;

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

      this.globalLoadingOverlay = false;
    },

    async loadKpiInformation(parentId: string): Promise<void> {
      this.globalLoadingOverlay = true;

      // Reset the KPI Store data
      this.currentKPIs = [];

      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      this.currentKPIs = (await FetchHelper.apiCall(
        `/middleware/kpis/${parentId}?${q}`,
        requestOptions,
      )) as Kpi[];

      this.globalLoadingOverlay = false;
    },

    async loadSiteInformation(siteId: string): Promise<void> {
      this.globalLoadingOverlay = true;

      // Reset the site data
      this.currentSite = null;

      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      this.currentSite = await FetchHelper.apiCall(
        `/middleware/sites/${siteId}?${q}`,
        requestOptions,
      ) as SiteWithBuildinginformation;

      this.lastSiteRequestTimestamp = DateTime.now();
      this.globalLoadingOverlay = false;
    },

    async loadBuildingInformation(buildingId: string): Promise<void> {
      this.globalLoadingOverlay = true;

      // Reset the store data
      this.currentBuilding = null;
      this.currentKPIs = [];

      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      this.currentBuilding = (await FetchHelper.apiCall(
        `/middleware/buildings/${buildingId}?${q}`,
        requestOptions,
      )) as Building;

      this.lastBuildingRequestTimestamp = DateTime.now();
      this.globalLoadingOverlay = false;
    },
  },
});
