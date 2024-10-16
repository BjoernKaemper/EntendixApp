<template>
  <div class="dropdown">
    <div
      class="dropdown-input-toggle"
      @click="toggleDropdown()"
      @keydown.enter="toggleDropdown()"
    >
      {{ currentTimeRangeLabel }} v
    </div>
    <div
      :class="{
        'dropdown-input-list-wrapper': true,
        'is-active': isActive,
      }">
      <div
        class="dropdown-input-list-group"
        v-for="(group, index) in timeRangeDropdownGrouping"
        :key="index"
      >
        <p
          v-for="timerange in group"
          :key="timerange"
          @click="changeTimeRange(timerange)"
          @keydown.enter="changeTimeRange(timerange)"
        >
          {{ timeRangeConfig[timerange].label }}
        </p>
      </div>
    </div>
    <!-- <select
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
    </select> -->
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';

import { TimelineLookbackOptions, TimeRangeDropdownConfig } from '@/configs/timeRangeDropdown';

export default {
  name: 'TimeRangeDropdown',

  setup() {
    return {
      timeRangeConfig: TimeRangeDropdownConfig,
      TimelineLookbackOptions,
      timeRangeDropdownGrouping: [
        [TimelineLookbackOptions.TWENTYFOUR_HOURS],
        [TimelineLookbackOptions.CURRENT_WEEK, TimelineLookbackOptions.SEVEN_DAYS],
        [TimelineLookbackOptions.CURRENT_MONTH, TimelineLookbackOptions.THIRTY_DAYS],
        [TimelineLookbackOptions.CURRENT_QUARTER, TimelineLookbackOptions.CURRENT_YEAR],
        [TimelineLookbackOptions.ALL],
      ],
    };
  },

  data() {
    return {
      isActive: false,
    };
  },

  computed: {
    ...mapStores(useGeneralStore),

    currentTimeRangeValue(): TimelineLookbackOptions {
      return this.generalStore.kpiLookbackWindow.currentValue;
    },

    currentTimeRangeLabel(): string {
      return this.timeRangeConfig[this.currentTimeRangeValue].label;
    },
  },

  methods: {
    changeTimeRange(value: TimelineLookbackOptions): void {
      this.generalStore.kpiLookbackWindow.currentValue = value;
      this.isActive = false;
    },

    toggleDropdown(): void {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss" scoped>

.dropdown {
  position: relative;
}

.dropdown-input-toggle {
  @include content;
  cursor: pointer;
  margin: 0;
  padding: $xxxxs $xxs;
  border: 1px solid $light-purple;
  border-radius: $border-radius;
}

.dropdown-input-list-wrapper {
  @include content;
  display: none;
  position: absolute;
  width: 100%;
  z-index: 1;
  border: 1px solid $light-purple;
  border-radius: $border-radius;
  background: white;
  margin-top: $xxxs;

  .dropdown-input-list-group {
    padding: $xxxxs $xxs;

    &:not(:first-child) {
      border-top: 1px solid $light-purple;
    }

    & > p {
      cursor: pointer;
      margin: $xxs 0;
    }
  }

  &.is-active {
    display: block;
  }
}

</style>
