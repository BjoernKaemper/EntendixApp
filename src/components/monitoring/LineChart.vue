<template>
  <div class="line-chart-container">
    <div class="line-chart-container--left">
      <h3>{{ kpi?.data.Name.de || topic }}</h3>
      <div class="line-chart-container--left--values">
        <template v-if="primaryKpiValue">
          <h4 v-if="hasContext">{{ kpi.data.Context.de || topic }}</h4>
          <BigNumber :number="primaryKpiValue" :unit="primaryKpiValueUnit" />
        </template>
        <template v-if="secondaryKpiValue">
          <BigNumber :number="secondaryKpiValue" :unit="secondaryKpiValueUnit" />
        </template>
      </div>
      <div class="line-chart-container--right">
        <p>@TODO: insert Line Chart here...</p>
      </div>
    </div>
    <div class="line-chart-container--right">
      <LineChart :data="chartData" />
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';

import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import type { Kpi } from '@/types/kpi/Kpi';

// component imports
import BigNumber from '@/components/general/BigNumber.vue';

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
  },

  computed: {
    ...mapStores(useGeneralStore),

    chartData() {
      // TODO: JUST A SHORT TERM SOLUTION TO SHOW THE CHART A BIT LESS CLUMPED
      // return chart data from store with every second element removed
      const { chartData } = this.generalStore;
      return chartData.filter((_: any, index: number) => index % 2 === 0);
    },
    /**
     * @returns The time since the last update in minutes
     */
    lastUpdateTime(): number | string {
      if (this.lastUpdateTimestamp) {
        return Math.round(
          Interval.fromDateTimes(this.lastUpdateTimestamp, DateTime.now()).length('minutes'),
        );
      }
      return '-';
    },

    /**
     * @returns Whether the KPI context exists.
     */
    hasContext(): boolean {
      return !!this.kpi?.data?.Context?.de;
    },

    /**
     * @returns The primary KPI value if available.
     */
    primaryKpiValue(): number | undefined {
      return this.kpi?.data?.Value?.PresentValue
        ? Number(this.kpi.data.Value.PresentValue)
        : undefined;
    },

    /**
     * @returns The unit for the primary KPI value.
     */
    primaryKpiValueUnit(): string {
      return this.kpi?.data?.Value?.PhysicalUnit || '-';
    },

    /**
     * @returns The secondary KPI value if available.
     */
    secondaryKpiValue(): number | undefined {
      // @TODO: update logic when data is available
      return undefined;
    },

    /**
     * @returns The secondary KPI value unit if available.
     */
    secondaryKpiValueUnit(): string {
      // @TODO: update logic when data is available
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
