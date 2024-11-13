// Modules
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

// Types
import type {
  Building,
  BuildingUpdateData,
  FlatBuildingCreateData,
} from '@/types/global/building/Building';
import type { Subsection } from '@/types/global/subsections/Subsection';
import type { Kpi } from '@/types/global/kpi/Kpi';

// Helpers
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import Base64Helper from '@/helpers/Base64Helper';

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
      const subsectionStore = useSubsectionStore();

      this.$state = defaultStoreState;
      this.isLoading = true;
      this.subsectionState.isLoading = true;

      // Fetch the building information
      try {
        this.building = await this.fetchBuildingInformation(buildingId);
        this.requestTimestamp = DateTime.now();
      } catch (error) {
        this.error = true;
      }
      this.isLoading = false;

      // Fetching Subsection Information
      this.subsectionState.subsections = [];
      try {
        // eslint-disable-next-line arrow-body-style
        const subsectionPromises = this.building!.data.subsections?.map((subsection) => {
          return subsectionStore.fetchSubsectionInformation(subsection.id).then((response) => {
            this.subsectionState.subsections.push(response);
          });
        });

        await Promise.all(subsectionPromises ?? []);
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
        `/buildings/${Base64Helper.encode(buildingId)}?${q}`,
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
        this.kpiState.kpis = await generalStore.fetchKpiInformation(this.building!.id);
        this.kpiState.requestTimestamp = DateTime.now();
      } catch (error) {
        this.kpiState.error = true;
      }
      this.kpiState.isLoading = false;
    },

    /**
     * Add a new building
     * @param {FormData} requestBody The form data of the Building to add
     * @returns {Promise<Building>} The promise of the adding process
     * @throws {Error} Throws an error if the adding process fails
     */
    async addBuilding(requestBody: FlatBuildingCreateData): Promise<Building> {
      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(requestBody),
      } as RequestInit;

      // Try to post the data and add the site
      const postResult = await FetchHelper.apiCall(`/buildings?${q}`, requestOptions);

      const building = postResult as Building;
      this.building = building;
      return building;
    },

    /**
     * Update props of a building
     * @param buildingId - Building to update props for
     * @param updateData - props to change
     * @returns Updated Building on success
     * @throws Error on failure
     */
    async updateBuilding(buildingId: string, updateData: BuildingUpdateData): Promise<Building> {
      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(updateData),
      };

      const updatedBuilding = (await FetchHelper.apiCall(
        `/buildings/${Base64Helper.encode(buildingId)}?${q}`,
        requestOptions,
      )) as Building;

      // Merge the updated buildings data with current extended buildings data
      const mergedData = { ...this.building?.data, ...updatedBuilding.data };

      this.building = {
        ...updatedBuilding,
        data: mergedData,
      };

      return this.building;
    },
  },
});
