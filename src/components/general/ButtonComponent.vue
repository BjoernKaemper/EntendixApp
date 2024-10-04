<template>
  <button type="button" :class="colorClass">
    {{ text }}
    <component :is="iconClass" />
  </button>
</template>

<script lang="ts">
import { IconTypes } from '@/types/enums/IconTypes';
import CheckMarkCircleIcon from '@/components/icons/CheckMarkCircleIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import ExclamationMarkIcon from '@/components/icons/ExclamationMarkIcon.vue';
import WarningIcon from '@/components/icons/WarningIcon.vue';
import QuestionMarkIcon from '@/components/icons/QuestionMarkIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import InfoCircleIcon from '@/components/icons/InfoCircleIcon.vue';
import AddIcon from '@/components/icons/AddIcon.vue';

export default {
  name: 'ButtonComponent',
  components: {
    CheckMarkCircleIcon,
    CheckIcon,
    ExclamationMarkIcon,
    WarningIcon,
    QuestionMarkIcon,
    ArrowIcon,
    InfoCircleIcon,
    AddIcon,
    CloseIcon,
  },
  props: {
    /**
     * The text of the button.
     * @type {string}
     * @default 'Button'
     */
    text: {
      type: String,
      default: '-',
    },
    /**
     * The icon of the button.
     * @type {IconTypes}
     * @default ''
     */
    icon: {
      type: String as () => IconTypes,
      default: '',
    },
    /**
     * The primary state of the button.
     * @type {boolean}
     * @default false
     */
    primary: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    colorClass(): string {
      return this.primary ? 'primary' : '';
    },
    iconClass(): IconTypes {
      switch (this.icon) {
        case IconTypes.ARROW:
          return IconTypes.ARROW;
        case IconTypes.CHECK_MARK_CIRCLE:
          return IconTypes.CHECK_MARK_CIRCLE;
        case IconTypes.CHECK_MARK:
          return IconTypes.CHECK_MARK;
        case IconTypes.EXCLAMATION_MARK:
          return IconTypes.EXCLAMATION_MARK;
        case IconTypes.WARNING:
          return IconTypes.WARNING;
        case IconTypes.QUESTION_MARK:
          return IconTypes.QUESTION_MARK;
        case IconTypes.INFO_CIRCLE:
          return IconTypes.INFO_CIRCLE;
        case IconTypes.ADD:
          return IconTypes.ADD;
        case IconTypes.CLOSE:
          return IconTypes.CLOSE;
        default:
          return IconTypes.ARROW;
      }
    },
  },
};
</script>

<style scoped lang="scss">

button {
  border: 1px solid $darken;
  border-radius: $border-radius;
  padding: $base-size 0 $base-size $xxs;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $base-size;
  width: fit-content;
  cursor: pointer;

  &.primary {
    background-color: $light-purple;
    border-color: $light-purple;
  }

  & > * {
    margin-right: $base-size;
  }
}
</style>
