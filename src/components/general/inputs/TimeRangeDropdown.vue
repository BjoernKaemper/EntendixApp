<template>
  <div class="dropdown">
    <!-- @TODO: Implement propper styling -->
    <select
      name="timerange"
      id="timerange"
      :value="currentTimeRangeValue"
      @change="changeTimeRange(
        ($event.target as HTMLSelectElement).value as TimelineLookbackOptions,
      )"
    >
      <option
        v-for="timerange in timeRangeConfig"
        :key="timerange.value"
        :value="timerange.value"
      >
        {{ timerange.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';

import { TimelineLookbackOptions, TimeRangeDropdownConfig } from '@/types/enums/TimeRangeDropdown';

export default {
  name: 'TimeRangeDropdown',

  setup() {
    return {
      timeRangeConfig: TimeRangeDropdownConfig,
      TimelineLookbackOptions,
    };
  },

  computed: {
    ...mapStores(useGeneralStore),

    currentTimeRangeValue(): keyof typeof TimelineLookbackOptions {
      return this.generalStore.kpiLookbackWindow.currentValue;
    },
  },

  methods: {
    changeTimeRange(value: TimelineLookbackOptions): void {
      this.generalStore.kpiLookbackWindow.currentValue = value;
    },
  },
};
</script>

<style lang="scss" scoped>

.dropdown {
  @include content;
  cursor: pointer;
  border: 1px solid $light-purple;
  margin: 0;
  padding: 0 $xxs;
  border-radius: $border-radius;
}

</style>
