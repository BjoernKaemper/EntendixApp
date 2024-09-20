<template>
  <div class="line-chart-container">
    <div class="line-chart-container--left">
      <h3>{{ topic }}</h3>
      <div class="line-chart-container--left--values">
        <!-- @TODO move kpi destructuring to Big Number Component, only pass kpi object -->
        <!-- @TODO then simply call BigNumber v-for="kpi in kpis" etc. -->
        <h4 v-if="secondaryValue">{{ primaryKpi }}</h4>
        <BigNumber :number="value" :unit="unit" />
        <h4 v-if="secondaryValue">{{ secondaryKpi }}</h4>
        <BigNumber v-if="secondaryValue" :number="secondaryValue" :unit="secondaryUnit" />
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

import { DateTime, Interval } from 'luxon';
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
      required: true,
      default: 'Line Chart',
    },
    // @TODO: remove primaryKpi and secondaryKpi and replace with kpis object
    /**
     * The primary topic of the line chart
     * @type {string}
     * @default 'Line Chart'
     */
    primaryKpi: {
      type: String as PropType<string>,
      required: true,
      default: 'kpi name',
    },
    /**
     * The unit of the value
     * @type {string}
     * @default '-'
     */
    unit: {
      type: String as PropType<string>,
      required: false,
      default: '-',
    },
    /**
     * The value of the line chart
     * @type {number}
     * @default 0
     */
    value: {
      type: Number as PropType<number>,
      required: true,
      default: 0,
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
     * The secondary topic of the line chart
     * @type {string}
     * @default 'Line Chart'
     */
    secondaryKpi: {
      type: String as PropType<string>,
      required: false,
      default: 'kpi name',
    },
    /**
     * The secondary value of the line chart
     * @type {Number}
     * @default 0
     */
    secondaryValue: {
      type: Number,
      required: false,
      default: 0,
    },
    /**
     * The secondary unit of the value
     * @type {String}
     * @default '-'
     */
    secondaryUnit: {
      type: String,
      required: false,
      default: '-',
    },
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
