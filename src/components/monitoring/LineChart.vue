<template>
  <div class="line-chart-container">
    <template v-if="isLoading">
      <div class="loading">
        <LoadingSpinner />
      </div>
    </template>
    <template v-else>
      <div class="line-chart-container--left">
        <h3>{{ kpi?.data.Name.de || topic }}</h3>
        <div class="line-chart-container--left--values">
          <div v-if="primaryKpiValue">
            <h4 v-if="secondaryKpiValue">{{ kpi.data.Context.de || topic }}</h4>
            <BigNumber
              :number="primaryKpiValue"
              :unit="primaryKpiValueUnit"
            />
          </div>
          <div v-if="secondaryKpiValue">
            <h4>{{ kpi.data.Context.de || topic }}</h4>
            <BigNumber
              :number="secondaryKpiValue"
              :unit="secondaryKpiValueUnit"
            />
          </div>
        </div>
        <div class="line-chart-container--left--footer">
          <p class="last-update">Letzte Aktualisierung vor: {{ lastUpdateTime }} Minuten</p>
          <ChipComponent :status="status" :kpi="kpi" />
        </div>
      </div>
      <div class="line-chart-container--right">
        <p>@TODO: insert Line Chart here...</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from '@/store/general';

import { mapStores } from 'pinia';
// type imports
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import type { Kpi } from '@/types/Kpi';

// component imports
import BigNumber from '@/components/general/BigNumber.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

// vue / library imports
import { DateTime } from 'luxon';
import type { PropType } from 'vue';

export default {
  props: {
    /**
     * The topic of the line chart
     * @type {string}
     * @default 'Line Chart'
     */
    topic: {
      type: String as PropType<string>,
      required: false,
      default: '-',
    },
    /**
     * The primary kpi of the line chart
     * @type {Kpi}
     * @default { number: undefined, unit: '-' }
     */
    kpi: {
      type: Object as PropType<Kpi>,
      required: false,
      default: () => ({ data: { number: undefined, unit: '-' } }),
    },
    /**
     * The timestamp of the last update
     * @type {DateTime | null}
     * @default null
     */
    lastUpdateTimestamp: {
      type: Object as PropType<DateTime | null>,
      required: false,
      default: null,
    },
    /**
     * The status of the line chart
     * @type {string}
     * @default 'info'
     */
    status: {
      type: String as PropType<ChipStatusTypes>,
      required: false,
      default: ChipStatusTypes.INFO,
    },
    /**
     * Whether the line chart is loading
     * @type {boolean}
     * @default true
     */
    isLoading: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  components: {
    BigNumber,
    ChipComponent,
    LoadingSpinner,
  },
  computed: {
    ...mapStores(useGeneralStore),

    /**
     * @returns The time since the last update in minutes
     */
    lastUpdateTime(): number | string {
      if (this.lastUpdateTimestamp) {
        return Math.round(
          this.generalStore.time.diff(this.lastUpdateTimestamp).as('minutes'),
        );
      }
      return '-';
    },
    /**
     * @returns The primary kpi value
     */
    primaryKpiValue(): number | undefined {
      return Number(this.kpi?.data.Value.PresentValue) || undefined;
    },
    /**
     * @returns The primary kpi value unit
     */
    primaryKpiValueUnit(): string {
      return this.kpi?.data.Value.PhysicalUnit || '-';
    },
    /**
     * @returns The secondary kpi value
     */
    secondaryKpiValue(): number | undefined {
      // @TODO: refine this when data is available
      // if (Array.isArray(this.kpi?.data.Value)) {
      //   return Number(this.kpi?.data.Value[1].PresentValue);
      // }
      return undefined;
    },
    /**
     * @returns The secondary kpi value unit
     */
    secondaryKpiValueUnit(): string {
      // @TODO: refine this when data is available
      // if (secondaryKpiValue) {
      //   return this.kpi?.data.Value[1].PhysicalUnit;
      // }
      return '-';
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.line-chart-container {
  width: 100%;
  background-color: $lightest;
  border-radius: $border-radius;
  padding: $m;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: $m;

  & .loading {
    grid-column: 1 / -1;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &--left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &--values {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: $m;
      min-height: 150px;
    }

    &--footer {
      display: flex;
      justify-content: space-between;
      align-items: end;
    }
  }

  &--right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.last-update {
  @include meta-information;
}

h4 {
  @include content;
}
</style>
