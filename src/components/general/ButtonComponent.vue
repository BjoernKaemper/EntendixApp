<template>
  <button type="button" :class="[state, size, onlyIconClass]">
    {{ text }}
    <component v-if="icon" :is="iconName" />
  </button>
</template>

<script lang="ts">
import type { PropType } from 'vue';
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
import CommentIcon from '@/components/icons/CommentIcon.vue';
import SettingsIcon from '@/components/icons/SettingsIcon.vue';

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
    CommentIcon,
    SettingsIcon,
  },
  props: {
    /**
     * The text of the button.
     * @type {string}
     * @default 'Button'
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * The icon of the button.
     * @type {IconTypes}
     * @default ''
     */
    icon: {
      type: [String as () => IconTypes, Boolean],
      default: false,
    },
    /**
     * The state of the button.
     * @type {string}
     */
    state: {
      type: String as PropType<'primary' | 'tertiary'>,
      default: '',
    },
    /**
     * The size of the button.
     * @type {'normal' | 'small' }
     * @default 'normal'
     */
    size: {
      type: String as () => 'normal' | 'small',
      default: 'normal',
    },
  },
  computed: {
    onlyIconClass(): string {
      return this.text === '' ? 'only-icon' : '';
    },
    iconName(): IconTypes {
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
        case IconTypes.COMMENT:
          return IconTypes.COMMENT;
        case IconTypes.SETTINGS:
          return IconTypes.SETTINGS;
        default:
          return IconTypes.QUESTION_MARK;
      }
    },
  },
};
</script>

<style scoped lang="scss">
button {
  border: 1px solid $darken;
  border-radius: $border-radius;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $xxxs;
  width: fit-content;
  cursor: pointer;

  @include content;

  &.small {
    padding: $xxxs;
    @include meta-information;
    > svg {
      width: $xs;
      height: $xs;
    }
  }
  &.normal {
    &.only-icon {
      padding: $xxxs;
    }
    padding: $xxxs $xxs $xxxs $xxs;
    @include content;
  }
  &.primary {
    background-color: $light-purple;
    border-color: $light-purple;
  }

  &.tertiary {
    background-color: $lightest;
    border: 1px solid $light-purple;
  }
}
</style>
