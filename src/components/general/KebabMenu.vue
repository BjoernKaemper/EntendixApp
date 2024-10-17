<template>
  <div class="menu-wrapper">
    <button class="menu-activator" type="button" @click="toggleMenu">
      <MaterialSymbol :symbol="IconTypes.KEBAB_MENU" />
    </button>
    <ul v-if="isOpen" class="menu-options">
      <li v-for="(option, idx) in options" :key="idx">
        <button type="button" @click="optionSelected(option.emits)">
          <MaterialSymbol :symbol="option.icon" />
          {{ option.text }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { IconTypes } from '@/types/enums/IconTypes';

import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

type Option = {
  icon: IconTypes;
  text: string;
  emits: string;
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
  }

  & .menu-options {
    min-width: fit-content;
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
      }
    }
  }
}
</style>
