<template>
  <v-card class="liegeschaft-card ma-2 my-6 pa-0">
    <v-container class="ma-0 pa-0">
      <v-row class="liegeschaft-card--row" no-gutters align="center">
        <v-col cols="1" class="full-height">
          <TrafficLightIndicator :light="currentLight" />
        </v-col>
        <v-col cols="3" class="full-height">
          <v-img 
            src="@/assets/gebäude_deutz.png" 
            class="liegenschaft-image"
            cover
          ></v-img>
        </v-col>
        <v-col class="text-col" cols="7">
          <v-card-title class="pa-1 pl-6">
            <v-row no-gutters>
              <v-col cols="12">
                <v-card-title class="pa-0 title">{{ location }}</v-card-title>
              </v-col>
              <v-col cols="12">
                <v-card-subtitle class="pa-0 subtitle">{{ name }}</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card-title>
        </v-col>
        <v-col class="action-col" cols="1" v-if="actionIcon">
          <v-icon class="action-icon"> {{ actionIcon }}</v-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
/**
* LiegenschaftCard component
* @module components/monitoring/LiegenschaftCard
* @summary A card component that displays a location and name of a property
* @displayName LiegenschaftCard
*/

import TrafficLightIndicator from '@/components/general/TrafficLightIndicator.vue'
import { TrafficLightTypes } from '@/types/TrafficLightTypes';
import { ConditionTypes } from '@/types/ConditionTypes';
import { type PropType } from 'vue';

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
     * The icon to display in the card.
     * @default 'mdi-chevron-right'
     */
    actionIcon: {
      type: String as PropType<string>,
      default: 'mdi-chevron-right'
    },
  },
  components: {
    TrafficLightIndicator,
  },
  data() {
    return {
      currentLight: TrafficLightTypes.GREEN,
    }
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
        [ConditionTypes.NORMAL]: TrafficLightTypes.GREEN
      };

      // Default to GREEN if the condition doesn't match
      this.currentLight = conditionToLightMap[condition];
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss'; 

.liegeschaft-card {
  box-shadow: none;
  cursor: pointer;
}

.liegeschaft-card--row {
  height: $xxxl;
}

.full-height {
  height: 100%;
}

.liegenschaft-image {
  border-radius: 0 $base-size $base-size 0;
  height: 100%; 
}

.title {
  @include section-headline; 
}

.subtitle {
  @include content; 
}
</style>
