<template>
  <div
    class="status-card"
    :class="[{ isBordered: isBordered, 'has-action': action }, colourClass]"
    @click="action()"
  >
    <div class="icon-section">
      <component :is="icon" />
    </div>
    <div class="text-section">
      <span class="title">
        {{ title }}
      </span>
      <span v-if="subtitle" class="subtitle">
        {{ subtitle }}
      </span>
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
import { type PropType } from 'vue'
import { StatusTypes } from '@/types/enums/StatusTypes'
import { ActionTypes } from '@/types/enums/ActionTypes'
import CheckMarkCircleIcon from '@/components/icons/CheckMarkCircleIcon.vue'
import ExclamationMarkIcon from '@/components/icons/ExclamationMarkIcon.vue'
import WarningIcon from '@/components/icons/WarningIcon.vue'
import QuestionMarkIcon from '@/components/icons/QuestionMarkIcon.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import InfoCircleIcon from '@/components/icons/InfoCircleIcon.vue'

export default {
  components: {
    CheckMarkCircleIcon,
    ExclamationMarkIcon,
    WarningIcon,
    QuestionMarkIcon,
    ArrowIcon,
    InfoCircleIcon
  },
  props: {
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
      type: String as PropType<StatusTypes>,
      default: StatusTypes.INFO
    },
    /**
     * The subtitle of the card.
     */
    subtitle: {
      type: String as PropType<string>
    },
    /**
     * The icon to display as an action icon.
     */
    actionType: {
      type: String as PropType<ActionTypes>,
      default: ActionTypes.NONE
    },
    /**
     * Whether the card should have a border.
     * @default true
     */
    isBordered: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    action: {
      type: Function,
      default: null
    }
  },
  computed: {
    colourClass(): string {
      switch (this.status) {
        case StatusTypes.SUCCESS:
          return 'success'
        case StatusTypes.WARNING:
          return 'warning'
        case StatusTypes.ERROR:
          return 'error'
        case StatusTypes.INFO:
          return 'info'
      }
      return 'info'
    },
    icon(): string {
      switch (this.status) {
        case StatusTypes.SUCCESS:
          return 'CheckMarkCircleIcon'
        case StatusTypes.WARNING:
          return 'ExclamationMarkIcon'
        case StatusTypes.ERROR:
          return 'WarningIcon'
        case StatusTypes.INFO:
          return 'QuestionMarkIcon'
      }
      return 'QuestionMarkIcon'
    },
    actionIcon(): string | undefined {
      switch (this.actionType) {
        case ActionTypes.INFO:
          return 'InfoCircleIcon'
        case ActionTypes.ARROW:
          return 'ArrowIcon'
      }
      return undefined
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.status-card {
  border-radius: $base-size;
  background-color: $lightest;
  display: flex;
  margin-bottom: $s;

  &.has-action {
    cursor: pointer;
  }

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

  > .text-section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: $xxs;
  }

  > .icon-section,
  .action-section {
    display: flex;
    align-items: center;
    padding: $xxs;
  }
}

.title {
  @include section-headline;
}

.subtitle {
  @include content;
}
</style>
