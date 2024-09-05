<template>
  <v-container>
    <v-card class="liegeschaft-card">
      <v-container class="ma-0 pa-0">
        <v-row class="liegeschaft-card--row" no-gutters align="center">
          <v-col cols="1" class="full-height">
            <AmpelElement :light="currentLight" />
          </v-col>
          <v-col cols="3" class="full-height">
            <v-img 
              src="@/assets/gebäude_deutz.png" 
              class="liegenschaft-image"
              cover
            ></v-img>
          </v-col>
          <v-col cols="8">
            <v-card-title class="pa-1 pl-6">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-card-title class="pa-0 title">Ort</v-card-title>
                </v-col>
                <v-col cols="12">
                  <v-card-subtitle class="pa-0 subtitle">Name</v-card-subtitle>
                </v-col>
              </v-row>
            </v-card-title>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import AmpelElement from '@/components/general/TrafficLightIndicator.vue'
import { TrafficLightTypes } from '@/types/TrafficLightTypes';
import { ConditionTypes } from '@/types/ConditionTypes';

export default {
  components: {
    AmpelElement
  },
  data() {
    return {
      currentLight: TrafficLightTypes.GREEN.toLowerCase() 
    }
  },
  mounted() {
    // Example of dynamically setting the light
    this.updateLightBasedOnCondition();
  },
  methods: {
    updateLightBasedOnCondition() {
      const condition = /* some logic to determine the light */ ConditionTypes.NORMAL.toLowerCase();

      if (condition === ConditionTypes.ALERT.toLowerCase()) {
        this.currentLight = TrafficLightTypes.RED.toLowerCase();
      } else if (condition === ConditionTypes.WARNING.toLowerCase()) {
        this.currentLight = TrafficLightTypes.YELLOW.toLowerCase();
      } else if (condition === ConditionTypes.NORMAL.toLowerCase()) {
        this.currentLight = TrafficLightTypes.GREEN.toLowerCase();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss'; 

.liegeschaft-card {
  box-shadow: none;
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
