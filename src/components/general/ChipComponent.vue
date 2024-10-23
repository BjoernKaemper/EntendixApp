<template>
  <div class="chip--wrapper" :class="[statusData.class, isMini ? 'mini' : '']">
    <span class="chip--body">
      {{ statusData.label }}
    </span>
    <IconChip class="chip--icon" :status="status" />
  </div>
</template>

<script lang="ts">
/**
 * A chip component that displays a label and an icon.
 * The chip can be styled with a status color (success, warning, error, info).
 * @module components/general/ChipComponent
 * @displayName ChipComponent
 */
import type { PropType } from 'vue';
import IconChip from '@/components/general/IconChip.vue';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';

export default {
  components: {
    IconChip,
  },
  props: {
    /**
     * The status of the chip.
     * The status can be one of 'success', 'warning', 'error', or 'info'.
     * @type {string}
     * @default 'info'
     */
    status: {
      type: String as PropType<ChipStatusTypes>,
      default: ChipStatusTypes.INFO,
    },
    /**
     * The flag to determine if the chip is mini.
     * @type {boolean}
     * @default false
     */
    isMini: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  computed: {
    /**
     * Returns the status data based on the status prop.
     * @returns The status data object.
     */
    statusData() {
      switch (this.status) {
        case ChipStatusTypes.SUCCESS:
          return {
            label: 'In Ordnung',
            class: 'success',
          };
        case ChipStatusTypes.WARNING:
          return {
            label: 'Achtung',
            class: 'warning',
          };
        case ChipStatusTypes.ERROR:
          return {
            label: 'Kritisch',
            class: 'alert',
          };
        case ChipStatusTypes.INFO:
          return {
            label: 'Unbekannt',
            class: 'info',
          };
        default:
          return {
            label: 'Info',
            class: 'info',
          };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chip--wrapper {
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  border-radius: $border-radius;

  &.mini {
    border-radius: $s;
    overflow: hidden;
    & > span {
      @include meta-information;
      padding: 0 $base-size;
    }
    & > .chip--icon {
      padding: 0;

      & > * {
        font-size: 16px;
      }
    }
  }

  &.success {
    border: 2px solid $light-green;

    &.mini {
      background-color: $light-green;
    }
  }

  &.warning {
    border: 2px solid $yellow;

    &.mini {
      background-color: $yellow;
    }
  }

  &.alert {
    border: 2px solid $orange;

    &.mini {
      background-color: $orange;
    }
  }

  &.info {
    border: 2px solid $light-purple;

    &.mini {
      background-color: $light-purple;
    }
  }

  > span {
    padding: 0 $xs;
    border-radius: $border-radius 0 0 $border-radius;
  }
}

.chip--body {
  @include content;
}

.chip--icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $base-size;
  border-radius: 0;

  &.success {
    background-color: $light-green;
  }
  &.warning {
    background-color: $yellow;
  }
  &.alert {
    background-color: $orange;
  }
  &.info {
    background-color: $light-purple;
  }
}
</style>
