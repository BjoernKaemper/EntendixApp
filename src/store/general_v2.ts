// Module Imports
import { defineStore } from 'pinia'
import { useAuthenticator } from '@aws-amplify/ui-vue'

// Type Imports
import type Company from '@/types/Company';
import type Site from '@/types/Site';

// Helper Imports
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';

// Authenticator definition
const auth = useAuthenticator();

interface GeneralStoreState {
  globalLoadingOverlay: boolean,
  sites: Site[],
  companies: Company[],
}

export const useGeneralStorev2 = defineStore('generalv2', {
  state: (): GeneralStoreState => {
    return {
      globalLoadingOverlay: false,
      sites: [],
      companies: [],
    }
  },
  actions: {
    /**
     * Load base informations for the application
     * @returns {Promise<void>}
     */
    async loadBaseInformations(): Promise<void> {
      this.globalLoadingOverlay = true

      // Fetching types Site Information
      const queryCombined = {
        userId: auth.user.signInUserSession.idToken.payload.sub,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      this.sites = await FetchHelper.apiCall(
        `${import.meta.env.VITE_MIDDLEWARE_URL}/sites?${q}`,
        requestOptions,
      ) as Site[];

      // Fetching types Company Information
      this.companies = await FetchHelper.apiCall(
        `${import.meta.env.VITE_MIDDLEWARE_URL}/companies?${q}`,
        requestOptions,
      ) as Company[];

      this.globalLoadingOverlay = false
    },
  },
});
