<template>
  <div class="traffic-light-container">
    <div class="light red-light" :class="{ active: trafficLightIsRed }">
      <MaterialSymbol v-if="trafficLightIsRed" :symbol="IconTypes.WARNING" />
    </div>
    <div class="light yellow-light" :class="{ active: trafficLightIsYellow }">
      <MaterialSymbol v-if="trafficLightIsYellow" :symbol="IconTypes.EXCLAMATION_MARK" />
    </div>
    <div class="light green-light" :class="{ active: trafficLightIsGreen }">
      <MaterialSymbol v-if="trafficLightIsGreen" :symbol="IconTypes.CHECK_MARK_CIRCLE" />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * Traffic light indicator component
 * @summary A component that displays a traffic light with three lights
 * @module components/general/TrafficLightIndicator
 * @displayName TrafficLightIndicator
 */
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

import { TrafficLightTypes } from '@/types/enums/TrafficLightTypes';
import { IconTypes } from '@/types/enums/IconTypes';
import { type PropType } from 'vue';

export default {
  components: {
    MaterialSymbol,
  },
  props: {
    /**
     * The current light of the traffic light
     * @default TrafficLightTypes.GREEN
     */
    light: {
      type: String as PropType<TrafficLightTypes>,
      default: TrafficLightTypes.GREEN,
    },
  },
  computed: {
    /**
     * @returns {boolean} Whether the traffic light is red
     */
    trafficLightIsRed(): boolean {
      return this.light === TrafficLightTypes.RED;
    },
    /**
     * @returns {boolean} Whether the traffic light is yellow
     */
    trafficLightIsYellow(): boolean {
      return this.light === TrafficLightTypes.YELLOW;
    },
    /**
     * @returns {boolean} Whether the traffic light is green
     */
    trafficLightIsGreen(): boolean {
      return this.light === TrafficLightTypes.GREEN;
    },
  },
  setup() {
    return {
      IconTypes,
    };
  },
};
</script>

<style lang="scss" scoped>
.traffic-light-container {
  height: 100%;
  width: $xl;
  background-color: $darken;
  gap: calc($base-size + 1px);
  padding: $base-size 0 $base-size 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.light {
  width: $m;
  height: $m;
  border-radius: $border-radius;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    height: $xs;
  }
}

.red-light {
  background-color: $orange;
  opacity: 0.2;

  &.active {
    background-color: $orange;
    opacity: 1;
  }
}

.yellow-light {
  background-color: $yellow;
  opacity: 0.2;

  &.active {
    background-color: $yellow;
    opacity: 1;
  }
}

.green-light {
  background-color: $light-green;
  opacity: 0.2;
  &.active {
    background-color: $light-green;
    opacity: 1;
  }
}
</style>
