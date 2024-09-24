<template>
  <div
    class="card"
    @click="$emit('clicked')"
    @keydown.enter="$emit('clicked')"
    tabindex="0"
  >
    <template v-if="isLoading">
      <div class="loading">
        <LoadingSpinner />
      </div>
    </template>
    <template v-else>
      <TrafficLightIndicator class="traffic-light" :light="currentLight" />
      <img src="@/assets/gebäude_deutz.png" alt="Gebäudebild" />
      <div class="info">
        <span class="title">{{ name }}</span>
        <span class="subtitle">{{ location }}</span>
      </div>
      <div v-if="showIcon" class="action">
        <ChevronIcon />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/**
 * LiegenschaftCard component
 * @module components/monitoring/LiegenschaftCard
 * @summary A card component that displays a location and name of a property
 * @displayName LiegenschaftCard
 */

import TrafficLightIndicator from '@/components/general/TrafficLightIndicator.vue';
import ChevronIcon from '@/components/icons/ChevronIcon.vue';
import { TrafficLightTypes } from '@/types/enums/TrafficLightTypes';
import { ConditionTypes } from '@/types/enums/ConditionTypes';
import { type PropType } from 'vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

export default {
  props: {
    /**
     * The location of the property
     * @default 'Ort'
     */
    location: {
      type: String as PropType<string>,
      default: 'Ort',
    },
    /**
     * The name of the property
     * @default 'Name'
     */
    name: {
      type: String as PropType<string>,
      default: 'Name',
    },
    /**
     * Whether to show the icon on the right side of the card
     * @default true
     */
    showIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * Whether the card is loading
     * @default true
     */
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    TrafficLightIndicator,
    ChevronIcon,
    LoadingSpinner,
  },
  data() {
    return {
      currentLight: TrafficLightTypes.GREEN,
    };
  },
  mounted() {
    // Example of dynamically setting the light
    this.updateLightBasedOnCondition();
  },
  methods: {
    /**
     * Updates the light based on a condition
     */
    updateLightBasedOnCondition() {
      const condition = /* some logic to determine the light */ ConditionTypes.ALERT;

      const conditionToLightMap = {
        [ConditionTypes.ALERT]: TrafficLightTypes.RED,
        [ConditionTypes.WARNING]: TrafficLightTypes.YELLOW,
        [ConditionTypes.NORMAL]: TrafficLightTypes.GREEN,
      };

      // Default to GREEN if the condition doesn't match
      this.currentLight = conditionToLightMap[condition] || TrafficLightTypes.GREEN;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: $lightest;
  border-radius: $base-size;
  display: flex;
  height: $xxxl;
  margin-bottom: $s;
  align-items: center;
  cursor: pointer;

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
