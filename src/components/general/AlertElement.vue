<template>
  <div
    class="alert-tiles--wrapper"
    :class="alert.type"
    ref="alert"
  >
    <component :is="icon" />
    <div class="alert-tiles--wrapper--inner">
      <h4>{{ alert.title }}</h4>
      <p>
        {{ alert.description }}
      </p>
      <small>
        <time>{{ alert.time }} Uhr</time>
      </small>
    </div>
    <button type="button" @click="closeAlert">
      <CloseIcon />
    </button>
  </div>
</template>

<script lang="ts">
/**
 * @name AlertElement
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
import { AlertTypes } from '@/types/enums/AlertTypes';
import type { Alert } from '@/types/Alert';

export default {
  name: 'AlertElement',
  components: {
    WarningIcon,
    CloseIcon,
    CheckMarkCircleIcon,
    InfoCircleIcon,
    ExclamationMarkIcon,
  },
  props: {
    /**
     * The alert object that contains the alert details.
     * @type Alert
     */
    alert: {
      type: Object as () => Alert,
      required: true,
    },
  },
  computed: {
    icon() {
      switch (this.alert.type) {
        case AlertTypes.INFO:
          return IconTypes.INFO_CIRCLE;
        case AlertTypes.WARNING:
          return IconTypes.EXCLAMATION_MARK;
        case AlertTypes.SUCCESS:
          return IconTypes.CHECK_MARK_CIRCLE;
        case AlertTypes.ERROR:
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

<style lang="scss" scoped>
.alert-tiles--wrapper {
  background-color: $darken;
  color: $lightest;
  padding: $xxs $xxs $xxs $xxs;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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
    flex-shrink: 0;

    > svg {
      color: $lightest;
    }
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
