<template>
  <ModalOverlay :isOpen="modelValue" @close="$emit('update:modelValue', false)" size="large">
    <template #header>
      <h5>Aggregat "{{ aggregateName }}"</h5>
    </template>
    <template #body>
      <div v-if="aggregateLoading">
        <LoadingSpinner />
      </div>
      <div v-else-if="aggregate">
        <p>{{ aggregate.data.aggregateName }}</p>
        <p>{{ aggregate.data.aggregateType }}</p>
        <h6>Funktionen nach BACnet & BACtwin</h6>
        <table class="aggregate-modal__table" cellspacing="0">
          <tr>
            <td colspan="2">BACnet</td>
            <td colspan="6">BACtwin</td>
          </tr>
          <tr>
            <th>Name</th>
            <th>Beschreibung</th>
            <th>Gewerk</th>
            <th>Anlage</th>
            <th>Baugruppe</th>
            <th>Medium</th>
            <th>Aggregat</th>
            <th>Funktion</th>
          </tr>
          <tr
            v-for="dataPoint in aggregate.data.dataPoints"
            :key="dataPoint.dataPoint?.objectIdentifier"
          >
            <td class="aggregate-modal__data-name">{{ dataPoint.dataPoint?.objectName }}</td>
            <td>{{ dataPoint.dataPoint?.description }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{ dataPoint.description.de }}</td>
          </tr>
        </table>
      </div>
    </template>
  </ModalOverlay>
</template>

<script lang="ts">
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import { useAggregateStore } from '@/store/aggregate';
import type { Aggregate } from '@/types/global/aggregate/Aggregate';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

export default {
  name: 'AggregateModal',
  components: {
    ModalOverlay,
    LoadingSpinner,
  },
  props: {
    /**
     * The id of the aggregate to show.
     */
    aggregateId: {
      type: String,
      required: true,
    },
    /**
     * The name of the aggregate to show.
     */
    aggregateName: {
      type: String,
      required: true,
    },
    /**
     * Wether or not the modal is visible.
     */
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    'update:modelValue': (() => true) as (value: boolean) => void,
  },
  setup() {
    const aggregateStore = useAggregateStore();

    return {
      aggregateStore,
    };
  },
  data() {
    return {
      aggregateLoading: false,
      aggregate: null as null | Aggregate,
    };
  },
  watch: {
    aggregateId() {
      this.aggregateLoading = true;
      this.aggregateStore
        .getAggregate(this.aggregateId)
        .then((aggregate) => {
          this.aggregate = aggregate;
        })
        .finally(() => {
          this.aggregateLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.aggregate-modal {
  &__table {
    width: 100%;
    table-layout: fixed;

    & th {
      text-align: left;
      border-bottom: 1px solid $light-purple;
      padding: $xxxs $xxs $xxxs 0;
    }

    & td {
      word-break: break-word;
      border-bottom: 1px solid $light-purple-20;
      padding: $xxxs $xxs $xxxs 0;
    }
  }

  &__data-name {
    font-family: $font-family-mono;
  }
}
</style>
