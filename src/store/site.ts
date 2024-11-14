// Modules
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

// Types
import type { Site, SiteUpdateData, SiteWithBuildinginformation } from '@/types/global/site/Site';
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
      this.$state = defaultStoreState;
      this.isLoading = true;

      try {
        this.site = await this.fetchSiteInformation(siteId);
        this.loadImage();
        this.requestTimestamp = DateTime.now();
      } catch (error) {
        this.error = true;
      }

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
        userId: await generalStore.getUserId(),
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

    async addSite(requestBody: FormData): Promise<Site> {
      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: await generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        method: 'POST',
        body: requestBody,
      } as RequestInit;

      // Try to post the data and add the site
      const postResult = await FetchHelper.defaultApiCall(`/sites?${q}`, requestOptions);

      // Parse the result and add it to the store
      const site = (await postResult.json()) as SiteWithBuildinginformation;
      generalStore.baseInfoState.sites.push(site);
      return site;
    },
    /**
     * Load all images of the site
     */
    async loadImage(): Promise<void> {
      const generalStore = useGeneralStore();

      if (this.site && this.site.data.imagesrc) {
        const queryCombined = {
          userId: await generalStore.getUserId(),
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

    /**
     * Update props of a site
     * @param siteId - Site to update props for
     * @param updateData - props to change
     * @returns Updated site on success
     * @throws Error on failure
     */
    async updateSite(siteId: string, updateData: SiteUpdateData): Promise<Site> {
      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: await generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(updateData),
      };

      const updatedSite = (await FetchHelper.apiCall(
        `/sites/${Base64Helper.encode(siteId)}?${q}`,
        requestOptions,
      )) as Site;

      // Merge the updated site data with current extended site data
      const mergedData = Object.assign(updatedSite.data, {
        buildings: this.site?.data.buildings,
        imageDataUrl: this.site?.data.imageDataUrl,
      });

      this.site = {
        id: updatedSite.id,
        data: mergedData,
      };

      return updatedSite;
    },
  },
});
