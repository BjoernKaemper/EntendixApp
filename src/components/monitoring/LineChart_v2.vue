<template>
  <div class="line-chart-container">
    <div class="line-chart-container--left">
      <h3>{{ topic }}</h3>
      <BigNumber :number="value" :unit="unit" />
      <p class="last-update">Letzte Aktualisierung vor: {{ lastUpdateTime }} Minuten</p>
    </div>
    <div class="line-chart-container--right">
      <p>@TODO: insert Line Chart here...</p>
    </div>
  </div>
</template>

<script lang="ts">
import BigNumber from '@/components/general/BigNumber.vue';
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
  },
  components: {
    BigNumber,
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
  height: 35%;
  background-color: $lightest;
  border-radius: $base-size;
  padding: $m;
  display: grid;
  grid-template-columns: 1fr 2fr;

  > .line-chart-container--left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  > .line-chart-container--right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.last-update {
  @include meta-information;
}
</style>
