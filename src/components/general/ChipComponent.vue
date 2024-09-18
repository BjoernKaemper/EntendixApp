<template>
  <div class="chip--wrapper" :class="statusData.class">
    <span>
      {{ statusData.label }}
    </span>
    <div class="chip--icon" :class="statusData.class">
      <component :is="statusData.icon" />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * A chip component that displays a label and an icon.
 * The chip can be styled with a status color (success, warning, error, info).
 * @module components/general/ChipComponent
 * @displayName ChipComponent
 */
import type { PropType } from 'vue'
import { StatusTypes } from '@/types/enums/StatusTypes'

import CheckMarkCircleIcon from '@/components/icons/CheckMarkCircleIcon.vue'
import ExclamationMarkIcon from '@/components/icons/ExclamationMarkIcon.vue'
import WarningIcon from '@/components/icons/WarningIcon.vue'
import QuestionMarkIcon from '@/components/icons/QuestionMarkIcon.vue'

export default {
  components: {
    CheckMarkCircleIcon,
    ExclamationMarkIcon,
    WarningIcon,
    QuestionMarkIcon,
  },
  props: {
    /**
     * The status of the chip.
     * The status can be one of 'success', 'warning', 'error', or 'info'.
     * @default 'info'
     */
    status: {
      type: String as PropType<StatusTypes>,
      default: StatusTypes.INFO
    },
  },
  computed: {
    /**
     * Returns the status data based on the status prop.
     * @returns The status data object.
     */
    statusData() {
      switch (this.status) {
        case StatusTypes.SUCCESS:
          return {
            label: 'In Ordnung',
            icon: CheckMarkCircleIcon,
            class: 'success',
          }
        case StatusTypes.WARNING:
          return {
            label: 'Achtung',
            icon: ExclamationMarkIcon,
            class: 'warning',
          }
        case StatusTypes.ERROR:
          return {
            label: 'Kritisch',
            icon: WarningIcon,
            class: 'alert',
        }
        case StatusTypes.INFO:
          return {
            label: 'Unbekannt',
            icon: QuestionMarkIcon,
            class: 'info',
          }
        default:
          return {
            label: 'Info',
            icon: QuestionMarkIcon,
            class: 'info',
          }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .chip--wrapper {
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    border-radius: $base-size;
    margin: $xs 0;

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
      background-color: #efefef;
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