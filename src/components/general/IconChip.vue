<template>
  <div class="icon-chip" :class="colorClass">
    <component :is="icon" />
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';
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
      type: String as PropType<ChipStatusTypes | ComponentStatusTypes>,
      default: ChipStatusTypes.INFO,
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
        case ChipStatusTypes.SUCCESS:
          return IconTypes.CHECK_MARK_CIRCLE;
        case ChipStatusTypes.WARNING:
          return IconTypes.EXCLAMATION_MARK;
        case ChipStatusTypes.ERROR:
          return IconTypes.WARNING;
        case ChipStatusTypes.INFO:
          return IconTypes.QUESTION_MARK;
        case ComponentStatusTypes.ERROR_COMPONENT:
          return IconTypes.WARNING;
        case ComponentStatusTypes.WARNING_COMPONENT:
          return IconTypes.EXCLAMATION_MARK;
        default:
          return IconTypes.QUESTION_MARK;
      }
    },
    colorClass(): string {
      switch (this.status) {
        case ChipStatusTypes.SUCCESS:
          return ChipStatusTypes.SUCCESS.toLocaleLowerCase();
        case ChipStatusTypes.WARNING:
          return ChipStatusTypes.WARNING.toLocaleLowerCase();
        case ChipStatusTypes.ERROR:
          return ChipStatusTypes.ERROR.toLocaleLowerCase();
        case ChipStatusTypes.INFO:
          return ChipStatusTypes.INFO.toLocaleLowerCase();
        case ComponentStatusTypes.ERROR_COMPONENT:
          return ComponentStatusTypes.ERROR_COMPONENT.replace('.', '-').toLocaleLowerCase();
        case ComponentStatusTypes.WARNING_COMPONENT:
          return ComponentStatusTypes.WARNING_COMPONENT.replace('.', '-').toLocaleLowerCase();
        default:
          return ChipStatusTypes.INFO.toLocaleLowerCase();
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
  border-radius: $border-radius;

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
