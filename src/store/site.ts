// Modules
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

// Types
import type { SiteWithBuildinginformation } from '@/types/global/site/Site';
import type { Kpi } from '@/types/global/kpi/Kpi';
import { type SiteWithBuildinginformationAndDataurl } from '@/types/local/Site';

// Helpers
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import Base64Helper from '@/helpers/Base64Helper';

// Stores
import { useGeneralStore } from './general';

interface SiteStoreState {
  site: SiteWithBuildinginformationAndDataurl | null;
  kpiState: {
    kpis: Kpi[];
    requestTimestamp: DateTime | null;
    isLoading: boolean;
    error: boolean;
  };
  requestTimestamp: DateTime | null;
  isLoading: boolean;
  error: boolean;
}

const defaultKpiState = {
  kpis: [],
  requestTimestamp: null,
  isLoading: false,
  error: false,
};

const defaultStoreState = {
  site: null,
  kpiState: defaultKpiState,
  requestTimestamp: null,
  isLoading: false,
  error: false,
};

export const useSiteStore = defineStore('site', {
  state: (): SiteStoreState => defaultStoreState,
  actions: {
    /**
     * Load all information about a site and resetting the state by doing so
     * @param {string} siteId The ID of the site to load
     * @returns {Promise<void>} The promise of the loading process
     */
    async loadSiteInformation(siteId: string): Promise<void> {
      const generalStore = useGeneralStore();
      this.$state = defaultStoreState;
      this.isLoading = true;

      try {
        this.site = await this.fetchSiteInformation(siteId);
        this.loadImage();
        this.requestTimestamp = DateTime.now();
      } catch (error) {
        this.error = true;
      }

      this.kpiState.isLoading = true;

      // Start fetching of the KPIs
      try {
        this.kpiState.kpis = await generalStore.fetchKpiInformation(siteId);
        this.kpiState.requestTimestamp = DateTime.now();
      } catch (error) {
        this.kpiState.error = true;
      }
      this.kpiState.isLoading = false;
      this.isLoading = false;
    },

    /**
     * Fetch the information about a site
     * @param {string} siteId The ID of the site to fetch
     * @returns {Promise<SiteWithBuildinginformation>} The promise of the site information
     */
    async fetchSiteInformation(siteId: string): Promise<SiteWithBuildinginformation> {
      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      // Fetch the site information and return it
      return (await FetchHelper.apiCall(
        `/sites/${Base64Helper.encode(siteId)}?${q}`,
        requestOptions,
      )) as SiteWithBuildinginformation;
    },

    /**
     * Refetch the KPI Chart Data
     * @returns {Promise<void>} The promise of the refetching process
     */
    async fetchKpiChartData(): Promise<void> {
      const generalStore = useGeneralStore();

      // Fetching KPI Information
      this.kpiState.isLoading = true;
      try {
        this.kpiState.kpis = await generalStore.fetchKpiInformation(this.site!.id);
        this.kpiState.requestTimestamp = DateTime.now();
      } catch (error) {
        this.kpiState.error = true;
      }
      this.kpiState.isLoading = false;
    },

    async addSite(requestBody: FormData): Promise<boolean> {
      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        method: 'POST',
        body: requestBody,
      } as RequestInit;

      // Try to post the data and add the site
      try {
        const postResult = await FetchHelper.apiCall(`/sites?${q}`, requestOptions);
        if (postResult.ok) {
          generalStore.addAlert({
            type: 'success',
            title: 'Liegenschaft wurde hinzugefügt',
            description: '',
          });
          // TODO: Change the view?
          return true;
        }
        throw new Error('Failed to add site');
      } catch (error) {
        generalStore.addAlert({
          type: 'error',
          title: 'Hinzufügen der Liegenschaft fehlgeschlagen!',
          description: 'Bitte versuche es zu einem späteren Zeitpunkt erneut.',
        });
        return false;
      }
    },
    /**
     * Load all images of the site
     */
    async loadImage(): Promise<void> {
      const generalStore = useGeneralStore();

      if (this.site && this.site.data.imagesrc) {
        const queryCombined = {
          userId: generalStore.getUserId(),
        };
        const q = QueryHelper.queryify(queryCombined);
        const requestOptions = {
          'Content-Type': 'image/jpeg',
        } as RequestInit;
        const resp = await FetchHelper.defaultApiCall(
          `${this.site.data.imagesrc}?${q}`,
          requestOptions,
        );
        const blob = await resp.blob();
        this.site.data.imageDataUrl = URL.createObjectURL(blob);
      }
    },
  },
});
