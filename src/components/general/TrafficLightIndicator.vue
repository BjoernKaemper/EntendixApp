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
 * @module components/general/TrafficLightIndicator
 * @summary A component that displays a traffic light indicator
 * @props {string} light - The current light of the traffic light
 * @computed {boolean} trafficLightIsRed - Whether the traffic light is red
 * @computed {boolean} trafficLightIsYellow - Whether the traffic light is yellow
 * @computed {boolean} trafficLightIsGreen - Whether the traffic light is green
 */
import { TrafficLightTypes } from '@/types/TrafficLightTypes';
import { type PropType } from 'vue';

export default {
  props: {
    light: {
      type: String as PropType<TrafficLightTypes>,
      default: TrafficLightTypes.GREEN,
    },
  },
  computed: {
    trafficLightIsRed(): boolean {
      return this.light === TrafficLightTypes.RED;
    },
    trafficLightIsYellow(): boolean {
      return this.light === TrafficLightTypes.YELLOW;
    },
    trafficLightIsGreen(): boolean {
      return this.light === TrafficLightTypes.GREEN;
    },
  },
};
</script>

<style lang="scss" scoped>
.traffic-light-container {
  height: 100%;
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