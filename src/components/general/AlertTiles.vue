<template>
  <div
    class="alert-tiles--wrapper"
    :class="type.toLowerCase()"
    ref="alert"
  >
    <component :is="icon" />
    <div class="alert-tiles--wrapper--inner">
      <h4>{{ headline }}</h4>
      <p>
        {{ text }}
      </p>
      <small>
        <time>{{ time }} Uhr</time>
      </small>
    </div>
    <button type="button" @click="closeAlert">
      <CloseIcon />
    </button>
  </div>
</template>

<script lang="ts">
/**
 * @name AlertTiles
 * @description
 * This component is used to display alert tiles on the top right corner of the screen.
 * The alert tiles can be of different types like success, warning, error, and info.
 * The alert tiles can be closed by clicking on the close icon.
 * The alert tiles are displayed in a stack, so the latest alert tile is displayed on top.
 */

// component imports
import WarningIcon from '@/components/icons/WarningIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import CheckMarkCircleIcon from '@/components/icons/CheckMarkCircleIcon.vue';
import InfoCircleIcon from '@/components/icons/InfoCircleIcon.vue';
import ExclamationMarkIcon from '@/components/icons/ExclamationMarkIcon.vue';

// type imports
import { IconTypes } from '@/types/enums/IconTypes';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import type { PropType } from 'vue';

export default {
  name: 'AlertTiles',
  components: {
    WarningIcon,
    CloseIcon,
    CheckMarkCircleIcon,
    InfoCircleIcon,
    ExclamationMarkIcon,
  },
  props: {
    /**
     * The type of the alert tile.
     * The type can be one of the following:
     * @default SUCCESS
     * @type ChipStatusTypes
     */
    type: {
      type: String as () => ChipStatusTypes,
      default: ChipStatusTypes.SUCCESS,
    },
    headline: {
      type: String as PropType<string>,
      default: 'Notification Tile 1',
    },
    /**
     * The text to be displayed in the alert tile.
     * @default 'This is an alert message'
     * @type string
     */
    text: {
      type: String as PropType<string>,
      default: 'This is an alert message',
    },
    /**
     * The time at which the alert tile was created.
     * @default new Date().toLocaleTimeString().split(':').slice(0, 2).join(':')
     * @type string
     */
    time: {
      type: String as PropType<string>,
      default: new Date().toLocaleTimeString().split(':')
        .slice(0, 2)
        .join(':'),
    },
  },
  computed: {
    icon() {
      switch (this.type) {
        case ChipStatusTypes.INFO:
          return IconTypes.INFO_CIRCLE;
        case ChipStatusTypes.WARNING:
          return IconTypes.EXCLAMATION_MARK;
        case ChipStatusTypes.SUCCESS:
          return IconTypes.CHECK_MARK_CIRCLE;
        case ChipStatusTypes.ERROR:
          return IconTypes.WARNING;
        default:
          return IconTypes.INFO_CIRCLE;
      }
    },
  },
  methods: {
    closeAlert() {
      const alert = this.$refs.alert as HTMLElement;
      alert.style.display = 'none';
    },
  },
};
</script>

<style lang="scss">
.alert-tiles--wrapper {
  background-color: $darken;
  color: $lightest;
  padding: $xxs $xxs $xxs $s;

  display: flex;
  align-items: flex-start;
  gap: $base-size;

  border-left: $xxs solid $lightest;
  border-radius: $base-size;
  box-shadow: 0px $base-size $base-size 0px $shadow;

  &.success {
    border-left-color: $light-green;
    & > svg {
      color: $light-green;
    }
  }

  &.warning {
    border-left-color: $yellow;
    & > svg {
      color: $yellow;
    }
  }

  &.error {
    border-left-color: $orange;
    & > svg {
      color: $orange;
    }
  }

  &.info {
    border-left-color: $light-purple;
    & > svg {
      color: $light-purple;
    }
  }

  & > svg {
    flex-shrink: 0;
  }

  & > button {
    border: none;
    cursor: pointer;
    padding: 0;
  }

  &--inner {
    display: flex;
    flex-direction: column;
    gap: $xxs;

    h4 {
      margin-top: 2.5px;
      @include section-headline;
    }

    p {
      @include content;
    }

    small {
      @include meta-information;
      color: $lightest;
    }
  }
}
</style>
