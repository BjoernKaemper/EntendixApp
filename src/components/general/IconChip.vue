<template>
  <div class="icon-chip" :class="colorClass">
    <component :is="icon" />
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { StatusTypes } from '@/types/enums/StatusTypes';
import { IconTypes } from '@/types/enums/IconTypes';

import CheckMarkCircleIcon from '@/components/icons/CheckMarkCircleIcon.vue';
import ExclamationMarkIcon from '@/components/icons/ExclamationMarkIcon.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import QuestionMarkIcon from '@/components/icons/QuestionMarkIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import InfoCircleIcon from '@/components/icons/InfoCircleIcon.vue';

export default {
  name: 'IconChip',
  props: {
    /**
     * The status of the chip.
     * The status can be one of 'success', 'warning', 'error', or 'info'.
     * @default 'info'
     */
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
          return IconTypes.CHECK_MARK_CIRCLE;
        case StatusTypes.WARNING:
          return IconTypes.EXCLAMATION_MARK;
        case StatusTypes.ERROR:
          return IconTypes.WARNING;
        case StatusTypes.INFO:
          return IconTypes.QUESTION_MARK;
        case StatusTypes.ERROR_COMPONENT:
          return IconTypes.WARNING;
        case StatusTypes.WARNING_COMPONENT:
          return IconTypes.EXCLAMATION_MARK;
        default:
          return IconTypes.QUESTION_MARK;
      }
    },
    colorClass(): string {
      switch (this.status) {
        case StatusTypes.SUCCESS:
          return StatusTypes.SUCCESS.toLocaleLowerCase();
        case StatusTypes.WARNING:
          return StatusTypes.WARNING.toLocaleLowerCase();
        case StatusTypes.ERROR:
          return StatusTypes.ERROR.toLocaleLowerCase();
        case StatusTypes.INFO:
          return StatusTypes.INFO.toLocaleLowerCase();
        case StatusTypes.ERROR_COMPONENT:
          return StatusTypes.ERROR_COMPONENT.replace('.', '-').toLocaleLowerCase();
        case StatusTypes.WARNING_COMPONENT:
          return StatusTypes.WARNING_COMPONENT.replace('.', '-').toLocaleLowerCase();
        default:
          return StatusTypes.INFO.toLocaleLowerCase();
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
