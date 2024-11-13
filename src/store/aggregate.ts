import { defineStore } from 'pinia';
import type {
  Aggregate,
  AggregateUpdateData,
  BasicAggregate,
} from '@/types/global/aggregate/Aggregate';
import { DateTime } from 'luxon';
import { useGeneralStore } from '@/store/general';
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import Base64Helper from '@/helpers/Base64Helper';

interface AggregateStoreState {
  aggregates: Map<string, Aggregate & { requestTimestamp: DateTime }>;
}

export const useAggregateStore = defineStore('aggregate', {
  state: (): AggregateStoreState => ({
    aggregates: new Map(),
  }),
  actions: {
    /**
     * Get data for a specific aggregate\
     * Returns local data if it is present or fetches it from the API\
     * Throws errors to be handled in the component!
     * @param id - The id of the aggregate
     * @returns Full aggregate data
     * @throws Error
     */
    async getAggregate(id: string): Promise<Aggregate | null> {
      const presentAggregate = this.aggregates.get(id);

      if (presentAggregate) {
        return presentAggregate;
      }

      const generalStore = useGeneralStore();

      // Build the query and the request
      const queryCombined = {
        userId: generalStore.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const aggregate = await FetchHelper.apiCall(`/aggregates/${Base64Helper.encode(id)}?${q}`);
      this.aggregates.set(id, { ...aggregate, requestTimestamp: DateTime.now() });

      return aggregate;
    },

    /**
     * Update props of a aggregate
     * @param buildingId - Aggregate to update props for
     * @param updateData - props to change
     * @returns Updated Aggregate on success
     * @throws Error on failure
     */
    async updateAggregate(id: string, updateData: AggregateUpdateData): Promise<Aggregate> {
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

      const updatedAggregate = (await FetchHelper.apiCall(
        `/aggregates/${Base64Helper.encode(id)}?${q}`,
        requestOptions,
      )) as BasicAggregate;

      const currentAggregate = this.aggregates.get(id);

      // Merge the updated buildings data with current extended buildings data
      const mergedData = { ...currentAggregate?.data, ...updatedAggregate.data };

      const fullAggregate = {
        ...updatedAggregate,
        data: mergedData,
        requestTimestamp: DateTime.now(),
      };

      this.aggregates.set(id, fullAggregate);

      return fullAggregate;
    },
  },
});
