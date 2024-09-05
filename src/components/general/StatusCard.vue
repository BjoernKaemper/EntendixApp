<template>
  <v-card class="status-card ma-0 my-6 pa-0">
    <v-row no-gutters class="d-flex align-stretch">
      <!-- Icon Section -->
      <v-col :class="colourClass" class="icon-col" cols="1">
        <v-icon :class="iconClass">
          {{ icon }}
        </v-icon>
      </v-col>

      <!-- Text Section -->
      <v-col class="text-col pl-2" cols="10">
        <v-card-title class="pa-0 title">
          {{ title }}
        </v-card-title>
        <v-card-subtitle v-if="subtitle" class="pa-0 subtitle">
          {{ subtitle }}
        </v-card-subtitle>
      </v-col>

      <!-- Action Section -->
      <v-col class="action-col" cols="1" v-if="actionIcon">
        <v-icon class="action-icon"> {{ actionIcon }}</v-icon>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
/**
 * A card component that displays a title, subtitle, icon, and an optional action icon.
 * The card can be styled with a status color (success, warning, error, info).
 * 
 * @prop {string} icon - The icon to display in the card.
 * @prop {string} title - The title of the card.
 * @prop {string} status - The status of the card (success, warning, error, info).
 * @prop {string} subtitle - The subtitle of the card.
 * @prop {string} actionIcon - The icon to display as an action icon.
 */
import { type PropType } from 'vue';

export default {
  props: {
    icon: {
      type: String as PropType<string>,
      default: 'mdi-information'
    }, 
    title: {
      type: String as PropType<string>,
      default: 'Title'
    },
    status: {
      type: String as PropType<string>,
      default: 'info' // success, warning, error, info
    },
    subtitle: {
      type: String as PropType<string>,
    },
    actionIcon: {
      type: String as PropType<string>,
      default: ''
    }
  },
  computed: {
    colourClass() {
      return {
        'colour-card--success': this.status === 'success',
        'colour-card--warning': this.status === 'warning',
        'colour-card--error': this.status === 'error',
        'colour-card--info': this.status === 'info'
      }
    },
    iconClass() {
      return `status-icon-${this.status}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss'; 

.status-card {
  border-radius: $base-size;
  padding: $xxs;
}

.v-row {
  display: flex;
  align-items: stretch; 
}

.colour-card--success {
  background-color: $light-green;
}

.colour-card--warning {
  background-color: $yellow;
}

.colour-card--error {
  background-color: $orange;
}

.colour-card--info {
  background-color: $light-purple;
}

.title {
  @include section-headline; 
}

.subtitle {
  @include content; 
}

.v-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.icon-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.action-col {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
