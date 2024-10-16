<template>
  <div class="dropdown">
    <div
      class="dropdown-input-toggle"
      @click="toggleDropdown()"
      @keydown.enter="toggleDropdown()"
    >
      {{ currentTimeRangeLabel }} xxxxxx
    </div>
    <div
      :class="{
        'dropdown-input-list-wrapper': true,
        'is-active': isActive,
      }">
      <p
        v-for="timerange in timeRangeConfig"
        :key="timerange.value"
        @click="changeTimeRange(timerange.value)"
        @keydown.enter="changeTimeRange(timerange.value)"
      >
        {{ timerange.label }}
      </p>
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
  margin-top: $xxxs;
  padding: $xxxxs $xxs;
  border: 1px solid $light-purple;
  border-radius: $border-radius;
  background: white;

  & > p {
    cursor: pointer;
    margin: $xxs 0;
  }

  &.is-active {
    display: block;
  }
}

</style>
