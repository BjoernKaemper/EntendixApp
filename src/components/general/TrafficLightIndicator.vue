<template>
  <v-container class="traffic-light-container d-flex flex-column align-center justify-center">
    <div class="light red-light" :class="{ active: trafficLightIsRed }"></div>
    <div class="light yellow-light" :class="{ active: trafficLightIsYellow }"></div>
    <div class="light green-light" :class="{ active: trafficLightIsGreen }"></div>
  </v-container>
</template>

<script lang="ts">
/**
 * Traffic light indicator component
 * @summary A component that displays a traffic light with three lights
 * @module components/general/TrafficLightIndicator
 * @displayName TrafficLightIndicator
 */
import { TrafficLightTypes } from '@/types/enums/TrafficLightTypes';
import { type PropType } from 'vue';

export default {
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
};
</script>

<style lang="scss" scoped>
.traffic-light-container {
  height: 100%;
  width: $xl;
  background-color: $darkest;
  gap: calc($base-size + 1px);
  padding: $xxs;
}

.light {
  width: $xxs;
  height: $xxs;
  border-radius: 50%;
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
