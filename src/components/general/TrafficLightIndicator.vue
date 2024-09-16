<template>
  <div class="traffic-light-container">
    <div class="light red-light" :class="{ active: trafficLightIsRed }">
      <WarningIcon v-if="trafficLightIsRed" />
    </div>
    <div class="light yellow-light" :class="{ active: trafficLightIsYellow }">
      <ExclamationMarkIcon v-if="trafficLightIsYellow" />
    </div>
    <div class="light green-light" :class="{ active: trafficLightIsGreen }">
      <CheckMarkCircleIcon v-if="trafficLightIsGreen" />
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
import { TrafficLightTypes } from '@/types/enums/TrafficLightTypes';
import CheckMarkCircleIcon from '@/components/icons/CheckMarkCircleIcon.vue';
import ExclamationMarkIcon from '@/components/icons/ExclamationMarkIcon.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import { type PropType } from 'vue';

export default {
  components: {
    CheckMarkCircleIcon,
    ExclamationMarkIcon,
    WarningIcon,
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
  border-radius: $base-size;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
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
