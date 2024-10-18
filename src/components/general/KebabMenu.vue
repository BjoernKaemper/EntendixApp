<template>
  <div class="menu-wrapper" ref="menuWrapper">
    <button class="menu-activator" type="button" @click="toggleMenu">
      <MaterialSymbol :symbol="vertical ? 'more_vert' : IconTypes.KEBAB_MENU" />
    </button>
    <ul v-if="isOpen" class="menu-options">
      <li v-for="(option, idx) in options" :key="idx">
        <button type="button" @click="optionSelected(option.emits)">
          <MaterialSymbol :symbol="option.icon" :class="{ [`menu-icon--${option.iconColor}`]: option.iconColor }" />
          {{ option.text }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { IconTypes } from '@/types/enums/IconTypes';

import MaterialSymbol from '@/components/general/MaterialSymbol.vue';
import type { MaterialIconNames } from '@/types/local/MaterialIconNames';

export type Option = {
  icon: IconTypes | MaterialIconNames;
  text: string;
  emits: string;
  iconColor?: 'red' | 'purple'
};

export default {
  components: {
    MaterialSymbol,
  },
  props: {
    options: {
      type: Array<Option>,
      default: () => [],
    },
    /**
     * Wether or not the more icon is displayed vertically.
     */
    vertical: {
      type: Boolean,
      default: false,
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
    handleOutsideClick(event: MouseEvent) {
      if (!(this.$refs.menuWrapper as HTMLElement).contains(event.target as Node)) {
        this.isOpen = false;
      }
    },
  },
  watch: {
    isOpen(value) {
      if (value) {
        document.addEventListener('click', this.handleOutsideClick);
      } else {
        document.removeEventListener('click', this.handleOutsideClick);
      }
    },
  },
  unmounted() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  setup() {
    return {
      IconTypes,
    };
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
    padding: 0;
    display: inline-flex;
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

  & .menu-icon {
    &--red {
      color: $orange;
    }

    &--purple {
      color: $dark-purple;
    }
  }
}
</style>
