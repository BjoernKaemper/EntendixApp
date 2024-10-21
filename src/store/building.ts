// Modules
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

// Types
import type { Building } from '@/types/global/building/Building';
import type { Subsection } from '@/types/global/subsections/Subsection';
import type { Kpi } from '@/types/global/kpi/Kpi';

// Helpers
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';

// Stores
import { useGeneralStore } from './general';
import { useSubsectionStore } from './subsection';

interface BuildingStoreState {
  building: Building | null;
  requestTimestamp: DateTime | null;
  kpiState: {
    kpis: Kpi[];
    requestTimestamp: DateTime | null;
    isLoading: boolean;
    error: boolean;
  };
  subsectionState: {
    subsections: Subsection[];
    requestTimestamp: DateTime | null;
    isLoading: boolean;
    error: boolean;
  };
  isLoading: boolean;
  error: boolean;
}

const defaultKpiState = {
  kpis: [],
  requestTimestamp: null,
  isLoading: false,
  error: false,
};

const defaultSubsectionsState = {
  subsections: [],
  requestTimestamp: null,
  isLoading: false,
  error: false,
};

const defaultStoreState = {
  building: null,
  requestTimestamp: null,
  kpiState: defaultKpiState,
  subsectionState: defaultSubsectionsState,
  isLoading: false,
  error: false,
};

export const useBuildingStore = defineStore('building', {
  state: (): BuildingStoreState => defaultStoreState,
  actions: {
    /**
     * Load all information about a building and resetting the state by doing so
     * @param {string} buildingId The ID of the building to load
     * @returns {Promise<void>} The promise of the loading process
     */
    async loadBuildingInformation(buildingId: string): Promise<void> {
      const generalStore = useGeneralStore();
      const subsectionStore = useSubsectionStore();

      this.$state = defaultStoreState;
      this.isLoading = true;

      // Fetch the building information
      try {
        this.building = await this.fetchBuildingInformation(buildingId);
        this.requestTimestamp = DateTime.now();
      } catch (error) {
        this.error = true;
      }
      this.isLoading = false;

      // Fetching KPIs
      try {
        this.kpiState.kpis = await generalStore.fetchKpiInformation(buildingId);
        this.kpiState.requestTimestamp = DateTime.now();
      } catch (error) {
        this.kpiState.error = true;
      }
      this.kpiState.isLoading = false;

      // Fetching Subsection Information
      this.subsectionState.isLoading = true;
      this.subsectionState.subsections = [];
      try {
        this.building!.data.subsections?.forEach(async (subsection) => {
          this.subsectionState.subsections.push(
            await subsectionStore.fetchSubsectionInformation(subsection.id),
          );
        });
      } catch (error) {
        this.subsectionState.error = true;
      }
      this.subsectionState.requestTimestamp = DateTime.now();
      this.subsectionState.isLoading = false;
    },

    /**
     * Fetch the building information
     * @param {string} buildingId The ID of the building to fetch
     * @returns {Promise<Building>} The building information
     */
    async fetchBuildingInformation(buildingId: string): Promise<Building> {
      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      // Fetch the building information and return it
      return (await FetchHelper.apiCall(
        `/middleware/buildings/${Base64Helper.encode(buildingId)}?${q}`,
        requestOptions,
      )) as Building;
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
        this.kpiState.kpis = await generalStore.fetchKpiInformation((this.building!.id));
        this.kpiState.requestTimestamp = DateTime.now();
      } catch (error) {
        this.kpiState.error = true;
      }
      this.kpiState.isLoading = false;
    },
  },
});
