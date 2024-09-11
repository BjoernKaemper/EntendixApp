<template>
  <div class="card" :class="{ 'has-action': action }" @click="action(liegenschaftName)">
    <TrafficLightIndicator class="traffic-light" :light="currentLight" />
    <img src="@/assets/gebäude_deutz.png" />
    <div class="info">
      <span class="title">{{ liegenschaftLocation }}</span>
      <span class="subtitle">{{ liegenschaftName }}</span>
    </div>
    <div v-if="showIcon" class="action">
      <ChevronIcon />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * LiegenschaftCard component
 * @module components/monitoring/LiegenschaftCard
 * @summary A card component that displays a location and name of a property
 * @displayName LiegenschaftCard
 */

import TrafficLightIndicator from '@/components/general/TrafficLightIndicator.vue'
import ChevronIcon from '@/components/icons/ChevronIcon.vue'
import { TrafficLightTypes } from '@/types/enums/TrafficLightTypes'
import { ConditionTypes } from '@/types/enums/ConditionTypes'
import { type PropType } from 'vue'

export default {
  props: {
    /**
     * The location of the property
     * @default 'Ort'
     */
    location: {
      type: String as PropType<string>,
      default: 'Ort'
    },
    /**
     * The name of the property
     * @default 'Name'
     */
    name: {
      type: String as PropType<string>,
      default: 'Name'
    },
    /**
     * The action which is performed when the card is clicked
     * @default () => {}
     */
    action: {
      type: Function,
      default: null
    },
    /**
     * Whether to show the icon on the right side of the card
     * @default true
     */
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  components: {
    TrafficLightIndicator,
    ChevronIcon
  },
  computed: {
    liegenschaftName(): string {
      return this.name
    },
    liegenschaftLocation(): string {
      return this.location
    }
  },
  data() {
    return {
      currentLight: TrafficLightTypes.GREEN
    }
  },
  mounted() {
    // Example of dynamically setting the light
    this.updateLightBasedOnCondition()
  },
  methods: {
    /**
     * Updates the light based on a condition
     */
    updateLightBasedOnCondition() {
      const condition = /* some logic to determine the light */ ConditionTypes.ALERT

      const conditionToLightMap = {
        [ConditionTypes.ALERT]: TrafficLightTypes.RED,
        [ConditionTypes.WARNING]: TrafficLightTypes.YELLOW,
        [ConditionTypes.NORMAL]: TrafficLightTypes.GREEN
      }

      // Default to GREEN if the condition doesn't match
      this.currentLight = conditionToLightMap[condition] || TrafficLightTypes.GREEN
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  background-color: $lightest;
  border-radius: $base-size;
  display: flex;
  height: $xxxl;
  margin-bottom: $s;
  align-items: center;

  &.has-action {
    cursor: pointer;
  }

  > .traffic-light {
    border-right: 1px solid white;
    border-radius: $base-size 0 0 $base-size;
  }

  > img {
    border-radius: 0 $base-size $base-size 0;
    height: 100%;
  }

  > .info {
    display: flex;
    flex-direction: column;
    padding: $m;
    flex-grow: 1;
    > .title {
      @include section-headline;
    }
    > .subtitle {
      @include content;
    }
  }
  > .action {
    padding: $xs;
  }
}
</style>
