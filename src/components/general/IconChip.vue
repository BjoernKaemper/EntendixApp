<template>
  <div class="icon-chip" :class="colorClass">
    <MaterialSymbol :symbol="icon" />
  </div>
</template>
<script lang="ts">
/**
 * A chip component that displays an icon.
 * The chip can be styled with a status color (success, warning, error, info).
 * @module components/general/IconChip
 * @displayName IconChip
 */
import type { PropType } from 'vue';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';
import { IconTypes } from '@/types/enums/IconTypes';

import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

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
    MaterialSymbol,
  },
  computed: {
    icon(): IconTypes {
      switch (this.status) {
        case ChipStatusTypes.SUCCESS:
          return IconTypes.CHECK_MARK_CIRCLE;
        case ChipStatusTypes.WARNING:
          return IconTypes.EXCLAMATION_MARK;
        case ChipStatusTypes.ERROR:
          return IconTypes.WARNING;
        case ChipStatusTypes.INFO:
          return IconTypes.QUESTION_MARK;
        case ComponentStatusTypes.SUCCESS_COMPONENT:
          return IconTypes.CHECK_MARK_CIRCLE;
        case ComponentStatusTypes.NONE:
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
          return ChipStatusTypes.SUCCESS;
        case ChipStatusTypes.WARNING:
          return ChipStatusTypes.WARNING;
        case ChipStatusTypes.ERROR:
          return ChipStatusTypes.ERROR;
        case ChipStatusTypes.INFO:
          return ChipStatusTypes.INFO;
        case ComponentStatusTypes.SUCCESS_COMPONENT:
          return ComponentStatusTypes.SUCCESS_COMPONENT;
        case ComponentStatusTypes.NONE:
          return ComponentStatusTypes.NONE;
        case ComponentStatusTypes.ERROR_COMPONENT:
          return ComponentStatusTypes.ERROR_COMPONENT;
        case ComponentStatusTypes.WARNING_COMPONENT:
          return ComponentStatusTypes.WARNING_COMPONENT;
        default:
          return ChipStatusTypes.INFO;
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
  height: 100%;
  padding: $xxs $xxxs;

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

  &.success-component {
    background-color: $darkest;
    color: $light-green;
  }

  &.none {
    background-color: $darken;
    color: $light-purple;
  }

  &.error-component {
    background-color: $darkest;
    color: $orange;
  }

  &.warning-component {
    background-color: $darkest;
    color: $yellow;
  }
}
</style>
