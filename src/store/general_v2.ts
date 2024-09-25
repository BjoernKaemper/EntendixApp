// Module Imports
import { DateTime } from 'luxon';
import { defineStore } from 'pinia';
import { useAuthenticator } from '@aws-amplify/ui-vue';

// Type Imports
import type Company from '@/types/Company';
import type { Site, SiteWithBuildinginformation } from '@/types/Site';
import type { Building } from '@/types/Building';
import type { Kpi } from '@/types/Kpi';

// Helper Imports
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import type { Subsection } from '@/types/Subsection';

// Authenticator definition
const auth = useAuthenticator();

interface GeneralStoreState {
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

export const useGeneralStoreV2 = defineStore('general_v2', {
  state: (): GeneralStoreState => ({
    baseInfoState: defaultbaseInfoState,
    siteState: defaultSiteState,
    buildingState: defaultBuildingState,
  }),
  actions: {
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
      this.siteState.kpiState.isLoading = true;

      this.siteState.kpiState.kpis = await this.fetchKpiInformation(siteId);

      this.siteState.kpiState.requestTimestamp = DateTime.now();
      this.siteState.kpiState.isLoading = false;
    },

    async loadBuildingInformation(buildingId: string): Promise<void> {
      this.buildingState = defaultBuildingState;
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

      // Fetching KPI Information
      this.buildingState.kpiState.isLoading = true;

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
