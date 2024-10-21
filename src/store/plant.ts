// Modules
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

// Types
import type { Plant } from '@/types/global/plant/Plant';
import type { Module } from '@/types/global/module/Module';
import type { Kpi } from '@/types/global/kpi/Kpi';

// Helpers
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import URIHelper from '@/helpers/URIHelper';

// Stores
import { useGeneralStore } from './general';

interface PlantStoreState {
  plant: Plant | null;
  moduleState: {
    modules: Array<Module>;
    isLoading: boolean;
    requestTimestamp: DateTime | null;
    error: boolean;
  };
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

const defaultModuleState = {
  modules: [],
  isLoading: false,
  requestTimestamp: null,
  error: false,
};

const defaultStoreState = {
  plant: null,
  moduleState: defaultModuleState,
  kpiState: defaultKpiState,
  requestTimestamp: null,
  isLoading: false,
  error: false,
};

export const usePlantStore = defineStore('plant', {
  state: (): PlantStoreState => defaultStoreState,
  actions: {
    /**
     * Load all information about a plant and resetting the state by doing so
     * @param {string} plantId The ID of the plant to load
     * @returns {Promise<void>} The promise of the loading process
     */
    async loadPlantInformation(plantId: string): Promise<void> {
      const generalStore = useGeneralStore();

      this.$state = defaultStoreState;
      this.isLoading = true;

      try {
        this.plant = await this.fetchPlantInformation(plantId);
        this.requestTimestamp = DateTime.now();
      } catch (error) {
        this.error = true;
      }

      // Fetching KPIs
      try {
        this.kpiState.kpis = await generalStore.fetchKpiInformation(plantId);
        this.kpiState.requestTimestamp = DateTime.now();
      } catch (error) {
        this.kpiState.error = true;
      }
      this.kpiState.isLoading = false;

      this.isLoading = false;
    },

    /**
     * Fetch the information about a plant
     * @param {string} plantId The ID of the plant to fetch
     * @returns {Promise<Plant>} The promise of the plant information
     */
    async fetchPlantInformation(plantId: string): Promise<Plant> {
      const generalStore = useGeneralStore();
      const queryCombined = {
        userId: generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      return (await FetchHelper.apiCall(
        `/middleware/plants/${URIHelper.encodeURI(plantId)}?${q}`,
        requestOptions,
      )) as Plant;
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
        this.kpiState.kpis = await generalStore.fetchKpiInformation(
          encodeURIComponent(this.plant!.id),
        );
        this.kpiState.requestTimestamp = DateTime.now();
      } catch (error) {
        this.kpiState.error = true;
      }
      this.kpiState.isLoading = false;
    },
  },
});
