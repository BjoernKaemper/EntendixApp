// Module Imports
import { defineStore } from 'pinia';
import { useAuthenticator } from '@aws-amplify/ui-vue';

// Type Imports
import type Company from '@/types/Company';
import type { Site, SiteWithBuildinginformation } from '@/types/Site';

// Helper Imports
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';

// Authenticator definition
const auth = useAuthenticator();

interface GeneralStoreState {
  globalLoadingOverlay: boolean,
  sites: Site[],
  companies: Company[],
  currentSite: SiteWithBuildinginformation | null,
}

export const useGeneralStoreV2 = defineStore('general_v2', {
  state: (): GeneralStoreState => ({
    globalLoadingOverlay: false,
    sites: [],
    companies: [],
    currentSite: null,
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

    async loadSiteInformation(siteId: string): Promise<void> {
      this.globalLoadingOverlay = true;

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

      this.globalLoadingOverlay = false;
    },
  },
});
