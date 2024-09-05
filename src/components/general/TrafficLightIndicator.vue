<template>
  <v-container class="traffic-light-container d-flex flex-column align-center justify-center">
    <div class="light red-light" :class="{ active: trafficLightIsRed }"></div>
    <div class="light yellow-light" :class="{ active: trafficLightIsYellow }"></div>
    <div class="light green-light" :class="{ active: trafficLightIsGreen }"></div>
  </v-container>
</template>

<script lang="ts">
import { TrafficLightTypes } from '@/types/TrafficLightTypes';

export default {
  props: {
    light: {
      type: String as () => string,
      default: TrafficLightTypes.GREEN.toLowerCase(),
    },
  },
  computed: {
    trafficLightIsRed(): boolean {
      return this.light === TrafficLightTypes.RED.toLowerCase();
    },
    trafficLightIsYellow(): boolean {
      return this.light === TrafficLightTypes.YELLOW.toLowerCase();
    },
    trafficLightIsGreen(): boolean {
      return this.light === TrafficLightTypes.GREEN.toLowerCase();
    },
  },
};
</script>

<style lang="scss">
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