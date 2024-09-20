<template>
  <div
    class="status-card"
    :class="[{ isBordered }, colourClass]"
    @click="$emit('clicked')"
    @keydown.enter="$emit('clicked')"
    tabindex="0"
  >
    <div class="icon-section">
      <component :is="icon" />
    </div>
    <div class="kpi-icon">
      <component :is="kpiIcon" />
    </div>
    <div class="text-section">
      <span class="title">
        {{ title }}
      </span>
      <span v-if="subtitle" class="subtitle">
        {{ subtitle }}
      </span>
    </div>
    <div class="timestamp">
      <span v-if="timestamp">seit {{ timestampFormatted }}</span>
    </div>
    <div class="action-section" v-if="actionIcon">
      <component :is="actionIcon" />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * A card component that displays a title, subtitle, icon, and an optional action icon.
 * The card can be styled with a status color (success, warning, error, info).
 * @module components/general/StatusCard
 * @displayName StatusCard
 */
import { type PropType } from 'vue';
import { StatusTypes } from '@/types/enums/StatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { KpiTypes } from '@/types/enums/KpiTypes';

import CheckMarkCircleIcon from '@/components/icons/CheckMarkCircleIcon.vue';
import ExclamationMarkIcon from '@/components/icons/ExclamationMarkIcon.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import QuestionMarkIcon from '@/components/icons/QuestionMarkIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import InfoCircleIcon from '@/components/icons/InfoCircleIcon.vue';
import AirIcon from '@/components/icons/AirIcon.vue';
import MediaIcon from '@/components/icons/MediaIcon.vue';
import HeatIcon from '@/components/icons/HeatIcon.vue';
import ColdIcon from '@/components/icons/ColdIcon.vue';
import SecurityIcon from '@/components/icons/SecurityIcon.vue';
import ElectricityIcon from '@/components/icons/ElectricityIcon.vue';

export default {
  components: {
    CheckMarkCircleIcon,
    ExclamationMarkIcon,
    WarningIcon,
    QuestionMarkIcon,
    ArrowIcon,
    InfoCircleIcon,
    AirIcon,
    MediaIcon,
    HeatIcon,
    ColdIcon,
    ElectricityIcon,
    SecurityIcon,
  },
  props: {
    /**
     * The title of the card.
     * @default 'Title'
     */
    title: {
      type: String as PropType<string>,
      default: 'Title',
    },
    /**
     * The status of the card.
     * The status can be one of 'success', 'warning', 'error', or 'info'.
     * @default 'info'
     */
    status: {
      type: String as PropType<StatusTypes>,
      default: StatusTypes.INFO,
    },
    /**
     * The subtitle of the card.
     */
    subtitle: {
      type: String as PropType<string> | undefined,
      default: undefined,
    },
    /**
     * The icon to display as an action icon.
     */
    actionType: {
      type: String as PropType<ActionTypes>,
      default: ActionTypes.NONE,
    },
    /**
     * Whether the card should have a border.
     * @default true
     */
    isBordered: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    kpiType: {
      type: String as PropType<KpiTypes>,
      default: KpiTypes.NONE,
    },
    timestamp: {
      type: String as PropType<string>,
      default: '',
    },
  },
  computed: {
    timestampFormatted(): string {
      const date = new Date(this.timestamp);
      const formatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      // replace all / with . and remove commas
      return formatter.format(date).replace(',', '').replaceAll('/', '.');
    },
    colourClass(): string {
      switch (this.status) {
        case StatusTypes.SUCCESS:
          return 'success';
        case StatusTypes.WARNING:
          return 'warning';
        case StatusTypes.ERROR:
          return 'error';
        case StatusTypes.INFO:
          return 'info';
        case StatusTypes.ERROR_COMPONENT:
          return 'error-component';
        case StatusTypes.WARNING_COMPONENT:
          return 'warning-component';
        default:
          return 'info';
      }
    },
    icon(): string {
      switch (this.status) {
        case StatusTypes.SUCCESS:
          return 'CheckMarkCircleIcon';
        case StatusTypes.WARNING:
          return 'ExclamationMarkIcon';
        case StatusTypes.ERROR:
          return 'WarningIcon';
        case StatusTypes.INFO:
          return 'QuestionMarkIcon';
        case StatusTypes.ERROR_COMPONENT:
          return 'WarningIcon';
        case StatusTypes.WARNING_COMPONENT:
          return 'ExclamationMarkIcon';
        default:
          return 'QuestionMarkIcon';
      }
    },
    kpiIcon(): string | undefined {
      switch (this.kpiType) {
        case KpiTypes.MEDIA:
          return 'MediaIcon';
        case KpiTypes.HEAT:
          return 'HeatIcon';
        case KpiTypes.COLD:
          return 'ColdIcon';
        case KpiTypes.AIR:
          return 'AirIcon';
        case KpiTypes.ELECTRICITY:
          return 'ElectricityIcon';
        case KpiTypes.SECURITY:
          return 'SecurityIcon';
        default:
          return undefined;
      }
    },
    actionIcon(): string | undefined {
      switch (this.actionType) {
        case ActionTypes.INFO:
          return 'InfoCircleIcon';
        case ActionTypes.ARROW:
          return 'ArrowIcon';
        default:
          return undefined;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.status-card {
  border-radius: $base-size;
  background-color: $lightest;
  display: flex;
  align-items: center;
  gap: $xs;
  margin-bottom: $s;
  cursor: pointer;

  &.isBordered {
    &.success {
      border: 1px solid $light-green;
    }
    &.warning {
      border: 1px solid $yellow;
    }

    &.error {
      border: 1px solid $orange;
    }

    &.info {
      border: 1px solid $light-purple;
    }

    &.error-component {
      border: 1px solid $darkest;
    }

    &.warning-component {
      border: 1px solid $darkest;
    }
  }

  &.success > .icon-section {
    background-color: $light-green;
    border-radius: $base-size 0 0 $base-size;
  }

  &.warning > .icon-section {
    background-color: $yellow;
    border-radius: $base-size 0 0 $base-size;
  }

  &.error > .icon-section {
    background-color: $orange;
    border-radius: $base-size 0 0 $base-size;
  }

  &.info > .icon-section {
    background-color: $light-purple;
    border-radius: $base-size 0 0 $base-size;
  }

  &.error-component > .icon-section {
    background-color: $darkest;
    border-radius: $base-size 0 0 $base-size;

    svg > * > * {
      fill: $orange;
    }
  }

  &.warning-component > .icon-section {
    background-color: $darkest;
    border-radius: $base-size 0 0 $base-size;

    svg > * > * {
      fill: $yellow;
    }
  }

  > .kpi-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > .text-section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  > .icon-section,
  .action-section {
    display: flex;
    align-items: center;
    padding: $xxs $base-size;
  }
}

.title {
  @include section-headline;
}

.subtitle {
  @include content;
}

.timestamp {
  @include meta-information;
}

</style>
