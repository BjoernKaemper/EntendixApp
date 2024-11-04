import { defineStore } from 'pinia';
import type { Aggregate } from '@/types/global/aggregate/Aggregate';
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
  },
});
