<template>
  <div class="icon-chip" :class="colorClass">
    <component :is="icon" />
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { StatusTypes } from '@/types/enums/StatusTypes';

import CheckMarkCircleIcon from '@/components/icons/CheckMarkCircleIcon.vue';
import ExclamationMarkIcon from '@/components/icons/ExclamationMarkIcon.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import QuestionMarkIcon from '@/components/icons/QuestionMarkIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import InfoCircleIcon from '@/components/icons/InfoCircleIcon.vue';

export default {
  name: 'IconChip',
  props: {
    status: {
      type: String as PropType<StatusTypes>,
      default: StatusTypes.INFO,
    },
  },
  components: {
    CheckMarkCircleIcon,
    ExclamationMarkIcon,
    WarningIcon,
    QuestionMarkIcon,
    ArrowIcon,
    InfoCircleIcon,
  },
  computed: {
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
    colorClass(): string {
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
  },
};
</script>

<style lang="scss">

.icon-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $base-size;
  border-radius: $base-size;

  &.success {
    background-color: $light-green;
  }

  &.warning {
    background-color: $yellow;
  }

  &.error {
    background-color: $orange;
  }

  &.info {
    background-color: $light-purple;
  }

  &.error-component {
    background-color: $darkest;

    svg > * > * {
      fill: $orange;
    }
  }

  &.warning-component {
    background-color: $darkest;

    svg > * > * {
      fill: $yellow;
    }
  }
}

</style>
