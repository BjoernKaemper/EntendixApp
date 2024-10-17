// Modules
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

// Types
import type { Plant } from '@/types/global/plant/Plant';

// Helpers
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import URIHelper from '@/helpers/URIHelper';

// Stores
import { useGeneralStore } from './general';

interface PlantStoreState {
  plant: Plant | null;
  requestTimestamp: DateTime | null;
  isLoading: boolean;
  error: boolean;
}

const defaultStoreState = {
  plant: null,
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
      this.$state = defaultStoreState;
      this.isLoading = true;

      try {
        this.plant = await this.fetchPlantInformation(plantId);
        this.requestTimestamp = DateTime.now();
      } catch (error) {
        this.error = true;
      }

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
        `/middleware/plants/${URIHelper.encodeURI(plantId)}/modules?${q}`,
        requestOptions,
      )) as Plant;
    },
  },
});
