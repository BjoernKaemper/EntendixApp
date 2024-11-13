// Modules
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

// Types
import type { Plant, PlantUpdateData } from '@/types/global/plant/Plant';
import type { Module } from '@/types/global/module/Module';
import type { Kpi } from '@/types/global/kpi/Kpi';

// Helpers
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import Base64Helper from '@/helpers/Base64Helper';

// Stores
import { useGeneralStore } from './general';

interface PlantStoreState {
  plant: Plant | null;
  moduleState: {
    modules: Array<Module>;
    isLoading: boolean;
    requestTimestamp: DateTime | null;
    error: boolean;
    partialError: boolean;
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
  partialError: false,
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
        `/plants/${Base64Helper.encode(plantId)}/modules?${q}`,
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
        this.kpiState.kpis = await generalStore.fetchKpiInformation(this.plant!.id);
        this.kpiState.requestTimestamp = DateTime.now();
      } catch (error) {
        this.kpiState.error = true;
      }
      this.kpiState.isLoading = false;
    },

    /**
     * Internal function to fetch a module
     * @param moduleId - Module to fetch
     * @returns Promise of module
     * @throws Error
     */
    async fetchModule(moduleId: string): Promise<Module> {
      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const module: Module = await FetchHelper.apiCall(
        `/modules/${Base64Helper.encode(moduleId)}/mediums?${q}`,
        {},
      );

      // Sort mediums and aggregates alphabetically
      module.data.mediums?.sort((a, b) => a.data.mediumName.localeCompare(b.data.mediumName));

      module.data.mediums?.forEach((medium) => {
        medium.data.aggregates?.sort((a, b) =>
          a.data.aggregateName.localeCompare(b.data.aggregateName),
        );
      });

      const moduleIndex = this.moduleState.modules.findIndex((m) => m.id === module.id);

      // Add or update module in store
      if (moduleIndex !== -1) {
        this.moduleState.modules[moduleIndex] = module;
      } else {
        this.moduleState.modules.push(module);
      }

      return module;
    },

    /**
     * Action to call to refetch a single module\
     * Manipulates the partialError state
     * @param moduleId - Module to fetch
     * @returns Fetched module
     * @throws Error
     */
    async fetchSingleModule(moduleId: string): Promise<Module> {
      this.moduleState.partialError = this.moduleState.partialError || false;

      try {
        const module = await this.fetchModule(moduleId);
        return module;
      } catch (error) {
        this.moduleState.partialError = true;
        throw error;
      }
    },

    /**
     * Fetch detailed module data for current plant
     */
    async fetchModuleData(): Promise<void> {
      if (!this.plant) {
        throw new Error('Plant not loaded');
      }

      if (!this.plant.data.modules) {
        throw new Error('No modules found');
      }

      this.moduleState.isLoading = true;
      this.moduleState.error = false;
      this.moduleState.partialError = false;

      const modulePromises = this.plant.data.modules.map((module) => this.fetchModule(module.id));

      await Promise.allSettled(modulePromises)
        .then((results) => {
          results.forEach((result) => {
            if (result.status === 'rejected') {
              this.moduleState.partialError = true;
            }
          });

          if (
            this.moduleState.partialError &&
            results.every((result) => result.status === 'rejected')
          ) {
            throw new Error("Couldn't fetch any module data");
          }

          this.moduleState.modules.sort((a, b) =>
            a.data.moduleName.localeCompare(b.data.moduleName),
          ) as Module[];
          this.moduleState.requestTimestamp = DateTime.now();
        })
        .catch(() => {
          this.moduleState.error = true;
        })
        .finally(() => {
          this.moduleState.isLoading = false;
        });
    },

    /**
     * Update props of a plant
     * @param plantId - Plant to update props for
     * @param updateData - props to change
     * @returns Updated plant on success
     * @throws Error on failure
     */
    async updatePlant(plantId: string, updateData: PlantUpdateData): Promise<Plant> {
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

      const updatedPlant = (await FetchHelper.apiCall(
        `/plants/${Base64Helper.encode(plantId)}?${q}`,
        requestOptions,
      )) as Plant;

      // Merge the updated plants data with current extended plants data
      const mergedData = { ...this.plant?.data, ...updatedPlant.data };

      this.plant = {
        ...updatedPlant,
        data: mergedData,
      };

      return this.plant;
    },
  },
});
