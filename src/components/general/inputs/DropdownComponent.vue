<template>
  <div class="dropdown" ref="dropdown">
    <!-- Dropdown selector element -->
    <div class="dropdown-input-toggle" @click="toggleDropdown()" @keydown.enter="toggleDropdown()">
      {{ currentOptionLabelName }}
      <MaterialSymbol class="dropdown-input-toggle--icon" :symbol="IconTypes.ARROW_DROP_DOWN" />
    </div>
    <div class="dropdown-synthetic-wrapper">
      <div
        :class="{
          'dropdown-input-list-wrapper': true,
          'is-active': isActive,
        }"
      >
        <!-- Grouped option values -->
        <template v-for="(optionGroup, index) in options" :key="index">
          <template v-if="Array.isArray(optionGroup)">
            <div class="dropdown-input-list-group" :key="index">
              <p
                v-for="(option, index) in optionGroup"
                :key="index"
                @click="handleOptionClick(option.value)"
                @keydown.enter="handleOptionClick(option.value)"
                class="dropdown-input-option"
                :class="{ selected: option.value === currentValue }"
              >
                {{ option.label }}
              </p>
            </div>
          </template>

          <!-- Single option Values -->
          <template v-else>
            <p
              :key="index"
              @click="handleOptionClick(optionGroup.value)"
              @keydown.enter="handleOptionClick(optionGroup.value)"
              class="dropdown-input-option"
              :class="{ selected: optionGroup.value === currentValue }"
            >
              {{ optionGroup.label }}
            </p>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

// Component Imports
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

// Type Imports
import { IconTypes } from '@/types/enums/IconTypes';
import type { DropdownOptions } from '@/types/local/DropdownOptions';

export default {
  name: 'DropdownComponent',

  /**
   * Setup
   */
  setup() {
    return {
      IconTypes,
    };
  },

  /**
   * Data
   */
  data() {
    return {
      isActive: false,
    };
  },

  /**
   * Components
   */
  components: {
    MaterialSymbol,
  },

  props: {
    /**
     * Possible Options for the dropdown component
     * Values can be given plain or grouped into arrays
     * Grouped arrays will be displayed as separate groups
     * @type {DropdownOptions}
     */
    options: {
      type: Array as PropType<DropdownOptions>,
      required: true,
    },

    /**
     * The current value of the dropdown
     * @type {string}
     */
    currentValue: {
      type: String as PropType<string>,
      required: true,
    },
  },

  computed: {
    /**
     * The current label of the selected option
     * @returns {string}
     */
    currentOptionLabelName(): string {
      const currentOption = this.options
        .flat()
        .find((option) => option.value === this.currentValue);
      return currentOption ? currentOption.label : '';
    },
  },

  /**
   * Methods
   */
  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive;
    },

    handleOptionClick(option: string) {
      this.$emit('changed', option);
      this.isActive = false;
    },

    handleOutsideClick(event: MouseEvent) {
      if (!(this.$refs.dropdown as HTMLElement).contains(event.target as Node)) {
        this.isActive = false;
      }
    },
  },

  /**
   * Emits
   */
  emits: {
    changed: (() => true) as (option: string) => void,
  },

  /**
   * Watchers
   */
  watch: {
    isActive(value) {
      if (value) {
        document.addEventListener('click', this.handleOutsideClick);
      } else {
        document.removeEventListener('click', this.handleOutsideClick);
      }
    },
  },

  /**
   * Lifecycle
   */
  unmounted() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
}

.dropdown-input-toggle {
  @include content;
  cursor: pointer;
  margin: 0;
  padding: $xxxxs $xxs;
  padding-right: $xxxs;
  border: 1px solid $light-purple;
  border-radius: $border-radius;
  display: flex;
  justify-content: space-between;

  &--icon {
    vertical-align: middle;
    margin-left: $xxxs;
  }
}

.dropdown-synthetic-wrapper {
  height: 0;
}

.dropdown-input-list-wrapper {
  @include content;
  visibility: hidden;
  width: 100%;
  z-index: 1;
  border: 1px solid $light-purple;
  border-radius: $border-radius;
  background: white;
  margin-top: $xxxs;
  min-width: fit-content;

  & > * {
    padding: $xxxxs $xxs;
  }

  .dropdown-input-option {
    cursor: pointer;
    margin: $xxs 0;
    white-space: nowrap;
    padding-right: calc($xxxs + $m);

    &.selected {
      font-weight: bold;
    }
  }

  .dropdown-input-list-group {
    &:first-of-type {
      border-top: 1px solid $light-purple;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $light-purple;
    }
  }

  &.is-active {
    visibility: visible;
  }
}
</style>
