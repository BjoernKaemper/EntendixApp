<template>
  <div class="dropdown">
    <div
      class="dropdown-input-toggle"
      @click="toggleDropdown()"
      @keydown.enter="toggleDropdown()"
    >
      {{ currentTimeRangeLabel }} x {{ isActive }}
    </div>
    <div
      :class="{
        'dropdown-input-list': true,
        'is-active': isActive,
      }">
      <ul>
        <li
          v-for="timerange in timeRangeConfig"
          :key="timerange.value"
          @click="changeTimeRange(timerange.value)"
          @keydown.enter="changeTimeRange(timerange.value)"
        >
          {{ timerange.label }}
        </li>
      </ul>
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

.dropdown-input-toggle {
  @include content;
  cursor: pointer;
  border: 1px solid $light-purple;
  margin: 0;
  padding: 0 $xxs;
  border-radius: $border-radius;
}

.dropdown-input-list {
  display: none;
  position: absolute;
  z-index: 1;
  border: 1px solid $light-purple;
  border-top: none;
  border-radius: 0 0 $border-radius $border-radius;
  width: 100%;
  background: white;

  &.is-active {
    display: block;
  }
}

</style>
