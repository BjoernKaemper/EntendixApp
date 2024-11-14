// Modules
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

// Types
import type { Subsection } from '@/types/global/subsections/Subsection';

// Helpers
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import Base64Helper from '@/helpers/Base64Helper';

// Stores
import type { Plant } from '@/types/global/plant/Plant';
import { useGeneralStore } from './general';

interface SubsectionStoreState {
  subsection: Subsection | null;
  requestTimestamp: DateTime | null;
  isLoading: boolean;
  error: boolean;
}

const defaultStoreState = {
  subsection: null,
  requestTimestamp: null,
  isLoading: false,
  error: false,
};

export const useSubsectionStore = defineStore('subsection', {
  state: (): SubsectionStoreState => defaultStoreState,
  actions: {
    /**
     * Load all information about a subsection and resetting the state by doing so
     * @param {string} subsectionId The ID of the subsection to load
     * @returns {Promise<void>} The promise of the loading process
     */
    async loadSubsectionInformation(subsectionId: string): Promise<void> {
      this.$state = defaultStoreState;
      this.isLoading = true;

      try {
        this.subsection = await this.fetchSubsectionWithPlantInformation(subsectionId);
        this.requestTimestamp = DateTime.now();
      } catch (error) {
        this.error = true;
      }

      this.isLoading = false;
    },

    /**
     * Fetch the information about a subsection
     * @param {string} subsectionId The ID of the subsection to fetch
     * @returns {Promise<Subsection>} The promise of the subsection information
     */
    async fetchSubsectionInformation(subsectionId: string): Promise<Subsection> {
      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: await generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      // Fetch the subsection information and return it
      return (await FetchHelper.apiCall(
        `/subsections/${Base64Helper.encode(subsectionId)}?${q}`,
        requestOptions,
      )) as Subsection;
    },

    /**
     * Fetch the information about a subsection
     * @param {string} subsectionId The ID of the subsection to fetch
     * @returns {Promise<Subsection>} The promise of the subsection information
     */
    async fetchSubsectionWithPlantInformation(subsectionId: string): Promise<Subsection> {
      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: await generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      // Fetch the subsection information and return it
      return (await FetchHelper.apiCall(
        `/subsections/${Base64Helper.encode(subsectionId)}/plants?${q}`,
        requestOptions,
      )) as Subsection;
    },

    /**
     * Locally update the data of a plant in the subsections plant and plantByType arrays\
     * Used after updates of a plant to prevent refetch and keep the data up to date
     * @param plantId - Id of plant to update
     * @param updateData - Updated plant to replace the old one with
     */
    updatePlant(plantId: string, updateData: Plant): void {
      if (!this.subsection) {
        return;
      }

      const plantIndex = this.subsection.data.plants.findIndex((plant) => plant.id === plantId);
      if (plantIndex === -1) {
        return;
      }

      this.subsection.data.plants[plantIndex] = updateData;

      // Update plant in plantsByType
      if (!this.subsection.data.plantsByType) {
        return;
      }

      this.subsection.data.plantsByType.forEach((plantsByType) => {
        const { plants } = plantsByType;
        const plantIndexByType = plants.findIndex((plant) => plant.id === plantId);
        if (plantIndexByType === -1) {
          return;
        }

        plants[plantIndexByType] = updateData;
      });
    },
  },
});
