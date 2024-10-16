<template>
  <div class="menu-wrapper" @focusout="toggleMenu">
    <button class="menu-activator" type="button" @click="toggleMenu">
      <KebabMenuIcon />
    </button>
    <ul v-if="isOpen" class="menu-options">
      <li v-for="(option, idx) in options" :key="idx">
        <button type="button" @click="optionSelected(option.emits)">
          <component :is="option.icon" />
          {{ option.text }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { IconTypes } from '@/types/enums/IconTypes';

import KebabMenuIcon from '@/components/icons/KebabMenuIcon.vue';
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
import DeleteIcon from '@/components/icons/DeleteIcon.vue';

export type Option = {
  icon: IconTypes;
  text: string;
  emits: string;
};

export default {
  components: {
    KebabMenuIcon,
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
    DeleteIcon,
  },
  props: {
    options: {
      type: Array<Option>,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    optionSelected(emits: string) {
      this.$emit(emits);
      this.isOpen = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-wrapper {
  position: relative;
  display: inline-block;

  & .menu-activator {
    float: right;
    background: none;
    border: none;
    cursor: pointer;
  }

  & .menu-options {
    width: max-content;
    position: absolute;
    top: -50%;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: $xxs;
    padding: $xxs;
    background-color: $lightest;
    border: 1px solid $light-purple;
    border-radius: 0.25rem;
    > li {
      > button {
        padding: 0;
        display: flex;
        gap: $xxxxs;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
</style>
