<template>
  <div class="dropdown">
    <!-- Dropdown selector element -->
    <div
      class="dropdown-input-toggle"
      @click="toggleDropdown()"
      @keydown.enter="toggleDropdown()"
    >
      {{ currentOption.label }}
      <MaterialSymbol
        class="dropdown-input-toggle--icon"
        :symbol="IconTypes.ARROW_DROP_DOWN"
      />
    </div>
    <div
      :class="{
        'dropdown-input-list-wrapper': true,
        'is-active': isActive,
      }">

      <!-- Grouped option values -->
      <template
        v-for="(optionGroup, index) in options"
        :key="index"
      >
        <template v-if="Array.isArray(optionGroup)">
          <div
            class="dropdown-input-list-group"
            :key="index"
          >
            <p
              v-for="(option, index) in optionGroup"
              :key="index"
              @click="handleOptionClick(option.value)"
              @keydown.enter="handleOptionClick(option.value)"
              :class="{ selected: option.value === currentOption.value }"
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
            :class="{ selected: optionGroup.value === currentOption.value }"
          >
            {{ optionGroup.label }}
          </p>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

// Component Imports
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

// Type Imports
import { IconTypes } from '@/types/enums/IconTypes';
import type { DropdownOptionElement, DropdownOptions } from '@/types/local/DropdownOptions';

export default {
  name: 'DropdownComponent',

  setup() {
    return {
      IconTypes,
    };
  },

  data() {
    return {
      isActive: false,
    };
  },

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
     * @type {DropdownOptionElement}
     */
    currentOption: {
      type: Object as PropType<DropdownOptionElement>,
      required: true,
    },
  },

  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive;
    },

    handleOptionClick(option: string) {
      this.$emit('changed', option);
      this.isActive = false;
    },
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

  &--icon {
    vertical-align: middle;
    margin-left: $xxxs;
  }
}

.dropdown-input-list-wrapper {
  @include content;
  visibility: hidden;
  position: absolute;
  width: 100%;
  z-index: 1;
  border: 1px solid $light-purple;
  border-radius: $border-radius;
  background: white;
  margin-top: $xxxs;

  & > * {
    padding: $xxxxs $xxs;
  }

  p {
    cursor: pointer;
    margin: $xxs 0;

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
