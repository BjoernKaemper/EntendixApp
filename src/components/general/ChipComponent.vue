<template>
  <div class="chip--wrapper" :class="statusData.class">
    <span>
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
import { StatusTypes } from '@/types/enums/StatusTypes';
import type { Kpi } from '@/types/Kpi';

import IconChip from '@/components/general/IconChip.vue';

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
      type: String as PropType<StatusTypes>,
      default: StatusTypes.INFO,
    },
    /**
     * The primary kpi of the line chart
     * @type {Kpi}
     * @default { number: undefined, unit: '-' }
     */
    kpi: {
      type: Object as PropType<Kpi>,
      required: false,
      default: () => ({ data: { number: undefined, unit: '-' } }),
    },
  },
  computed: {
    /**
     * Returns the status type based on the kpi data.
     * @returns The status type.
     */
    currentStatus(): StatusTypes {
      type Limits = string[];
      const limits: Limits | undefined = this.kpi?.data?.Limits;

      if (!limits || limits.length === 0) {
        return StatusTypes.INFO;
      }

      const low = parseInt(limits[0], 10);
      const mid = parseInt(limits[1], 10);
      const high = parseInt(limits[2], 10);

      const value = this.kpi?.data?.Value?.PresentValue;

      if (value < low) {
        return StatusTypes.ERROR;
      }

      if (value > high) {
        return StatusTypes.ERROR;
      }

      if (value < mid) {
        return StatusTypes.WARNING;
      }

      if (value >= mid) {
        return StatusTypes.SUCCESS;
      }

      return StatusTypes.INFO;
    },
    /**
     * Returns the status data based on the status prop.
     * @returns The status data object.
     */
    statusData() {
      switch (this.currentStatus) {
        case StatusTypes.SUCCESS:
          return {
            label: 'In Ordnung',
            class: 'success',
          };
        case StatusTypes.WARNING:
          return {
            label: 'Achtung',
            class: 'warning',
          };
        case StatusTypes.ERROR:
          return {
            label: 'Kritisch',
            class: 'alert',
          };
        case StatusTypes.INFO:
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
    border-radius: $base-size;

    &.success {
      border: 2px solid $light-green;
    }

    &.warning {
      border: 2px solid $yellow;
    }

    &.alert {
      border: 2px solid $orange;
    }

    &.info {
      border: 2px solid $light-purple;
    }

    > span {
      padding: 0 $xs;
      border-radius: $base-size 0 0 $base-size;
    }
  }

  .chip--icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
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
