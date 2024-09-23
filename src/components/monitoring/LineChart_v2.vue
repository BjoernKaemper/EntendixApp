<template>
  <div class="line-chart-container">
    <div class="line-chart-container--left">
      <h3>{{ kpi?.data.Name.de || topic }}</h3>
      <div class="line-chart-container--left--values">
        <h4>{{ kpi.data.Context.de || topic }}</h4>
        <div>
          <BigNumber
            :number="primaryKpiValue"
            :unit="primaryKpiValueUnit"
          />
          <BigNumber
            v-if="secondaryKpiValue"
            :number="secondaryKpiValue"
            :unit="secondaryKpiValueUnit"
          />
        </div>
      </div>
      <div class="line-chart-container--left--footer">
        <p class="last-update">Letzte Aktualisierung vor: {{ lastUpdateTime }} Minuten</p>
        <ChipComponent :status="status" />
      </div>
    </div>
    <div class="line-chart-container--right">
      <p>@TODO: insert Line Chart here...</p>
    </div>
  </div>
</template>

<script lang="ts">
import BigNumber from '@/components/general/BigNumber.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';
import { StatusTypes } from '@/types/enums/StatusTypes';
import type { Kpi } from '@/types/Kpi';

import { DateTime, Interval } from 'luxon';
import type { PropType } from 'vue';

export default {
  props: {
    topic: {
      type: String as PropType<string>,
      required: false,
      default: 'Line Chart',
    },
    /**
     * The primary kpi of the line chart
     * @type {Kpi}
     * @default { number: 0, unit: 'tbd.' }
     */
    kpi: {
      type: Object as PropType<Kpi>,
      required: false,
      default: () => ({ data: { number: 0, unit: 'tbd.' } }),
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
    // /**
    //  * The secondary topic of the line chart
    //  * @type {string}
    //  * @default 'Line Chart'
    //  */
    // secondaryKpi: {
    //   type: String as PropType<string>,
    //   required: false,
    //   default: 'kpi name',
    // },
    // /**
    //  * The secondary value of the line chart
    //  * @type {Number}
    //  * @default 0
    //  */
    // secondaryValue: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },
    // /**
    //  * The secondary unit of the value
    //  * @type {String}
    //  * @default '-'
    //  */
    // secondaryUnit: {
    //   type: String,
    //   required: false,
    //   default: '-',
    // },
    /**
     * The status of the line chart
     * @type {String}
     * @default 'info'
     */
    status: {
      type: String as PropType<StatusTypes>,
      required: false,
      default: StatusTypes.INFO,
    },
  },
  components: {
    BigNumber,
    ChipComponent,
  },
  computed: {
    lastUpdateTime(): number | string {
      if (this.lastUpdateTimestamp) {
        return Math.round(Interval.fromDateTimes(this.lastUpdateTimestamp, DateTime.now()).length('minutes'));
      }
      return '-';
    },
    primaryKpiValue(): number {
      return Number(this.kpi?.data.Value.PresentValue);
    },
    primaryKpiValueUnit(): string {
      return this.kpi?.data.Value.PhysicalUnit;
    },
    secondaryKpiValue(): number {
      // @ToDo refine this when data is available
      // if (Array.isArray(this.kpi?.data.Value)) {
      //   return Number(this.kpi?.data.Value[1].PresentValue);
      // }
      return 0;
    },
    secondaryKpiValueUnit(): string {
      // @ToDo refine this when data is available
      // if (secondaryKpiValue) {
      //   return this.kpi?.data.Value[1].PhysicalUnit;
      // }
      return 'tbd.';
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.line-chart-container {
  width: 100%;
  background-color: $lightest;
  border-radius: $base-size;
  padding: $m;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: $m;

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
