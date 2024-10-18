<template>
  <div class="timeRangeDropdown">
    <DropdownComponent
      :options="timeRangeDropdownGrouping"
      :currentValue="currentValue"
      @changed="changeTimeRange($event as TimelineLookbackOptions)"
    />
  </div>
</template>

<script lang="ts">
// Store Imports
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';

// Type Imports
import { TimelineLookbackOptions, TimeRangeDropdownConfig } from '@/configs/timeRangeDropdown';
import type { DropdownOptions } from '@/types/local/DropdownOptions';

// Component Imports
import DropdownComponent from './DropdownComponent.vue';

export default {
  name: 'TimeRangeDropdown',

  /**
   * Components
   */
  components: {
    DropdownComponent,
  },

  /**
   * Setup
   */
  setup() {
    return {
      timeRangeConfig: TimeRangeDropdownConfig,
      TimelineLookbackOptions,
      timeRangeDropdownGrouping: [
        {
          value: TimelineLookbackOptions.TWENTYFOUR_HOURS,
          label: TimeRangeDropdownConfig[TimelineLookbackOptions.TWENTYFOUR_HOURS].label,
        },
        [
          {
            value: TimelineLookbackOptions.CURRENT_WEEK,
            label: TimeRangeDropdownConfig[TimelineLookbackOptions.CURRENT_WEEK].label,
          },
          {
            value: TimelineLookbackOptions.SEVEN_DAYS,
            label: TimeRangeDropdownConfig[TimelineLookbackOptions.SEVEN_DAYS].label,
          },
          {
            value: TimelineLookbackOptions.FOURTEEN_DAYS,
            label: TimeRangeDropdownConfig[TimelineLookbackOptions.FOURTEEN_DAYS].label,
          },
        ],
        [
          {
            value: TimelineLookbackOptions.CURRENT_MONTH,
            label: TimeRangeDropdownConfig[TimelineLookbackOptions.CURRENT_MONTH].label,
          },
          {
            value: TimelineLookbackOptions.THIRTY_DAYS,
            label: TimeRangeDropdownConfig[TimelineLookbackOptions.THIRTY_DAYS].label,
          },
        ],
        [
          {
            value: TimelineLookbackOptions.CURRENT_QUARTER,
            label: TimeRangeDropdownConfig[TimelineLookbackOptions.CURRENT_QUARTER].label,
          },
          {
            value: TimelineLookbackOptions.CURRENT_YEAR,
            label: TimeRangeDropdownConfig[TimelineLookbackOptions.CURRENT_YEAR].label,
          },
        ],
        {
          value: TimelineLookbackOptions.ALL,
          label: TimeRangeDropdownConfig[TimelineLookbackOptions.ALL].label,
        },
      ] as DropdownOptions,
    };
  },

  /**
   * Computed
   */
  computed: {
    ...mapStores(useGeneralStore),

    currentValue(): TimelineLookbackOptions {
      return this.generalStore.kpiLookbackWindow.currentValue;
    },
  },

  /**
   * Methods
   */
  methods: {
    changeTimeRange(value: TimelineLookbackOptions): void {
      this.generalStore.kpiLookbackWindow.currentValue = value;
    },
  },
};
</script>
