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
 * @module components/general/StatusCard
 * @displayName StatusCard
 */
import { type PropType } from 'vue';
import { StatusTypes } from '@/types/StatusTypes';
import { ConditionTypes } from '@/types/ConditionTypes';

export default {
  props: {
    /**
     * The icon to display in the card.
     * @default 'mdi-information'
     */
    icon: {
      type: String as PropType<string>,
      default: 'mdi-information'
    }, 
    /**
     * The title of the card.
     * @default 'Title'
     */
    title: {
      type: String as PropType<string>,
      default: 'Title'
    },
    /**
     * The status of the card.
     * The status can be one of 'success', 'warning', 'error', or 'info'.
     * @default 'info'
     */
    status: {
      type: String as PropType<string>,
      default: 'info' 
    },
    /**
     * The subtitle of the card.
     */
    subtitle: {
      type: String as PropType<string>,
    },
    /**
     * The icon to display as an action icon.
     */
    actionIcon: {
      type: String as PropType<string>,
      default: ''
    }
  },
  computed: {
    colourClass() {
      const statusMap: { [key: string]: StatusTypes } = {
        [ConditionTypes.SUCCESS]: StatusTypes.SUCCESS,
        [ConditionTypes.WARNING]: StatusTypes.WARNING,
        [ConditionTypes.ERROR]: StatusTypes.ERROR,
        [ConditionTypes.INFO]: StatusTypes.INFO
      }
      console.log(this.status);
      return statusMap[this.status] || this.status;
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

.success {
  background-color: $light-green;
}

.warning {
  background-color: $yellow;
}

.error {
  background-color: $orange;
}

.info {
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
