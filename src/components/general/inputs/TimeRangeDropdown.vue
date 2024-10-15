<template>
  <div class="dropdown">
    <select
      name="timerange"
      id="timerange"
      :value="currentTimeRangeValue"
      @change="changeTimeRange(
        ($event.target as HTMLSelectElement).value as keyof typeof TimelineLookbackOptions,
      )"
    >
      <option
        v-for="timerange in timeranges"
        :key="timerange"
        :value="timerange"
      >
        {{ TimelineLookbackOptions[timerange as keyof typeof TimelineLookbackOptions] }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';

import { TimelineLookbackOptions } from '@/types/enums/TimelineLookbackOptions';

export default {
  name: 'TimeRangeDropdown',

  components: {

  },

  setup() {
    return {
      timeranges: Object.keys(TimelineLookbackOptions),
      TimelineLookbackOptions,
    };
  },

  computed: {
    ...mapStores(useGeneralStore),

    currentTimeRangeValue(): keyof typeof TimelineLookbackOptions {
      return this.generalStore.kpiLookbackStartTimestamp;
    },
  },

  methods: {
    changeTimeRange(value: keyof typeof TimelineLookbackOptions): void {
      this.generalStore.kpiLookbackStartTimestamp = value;
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
