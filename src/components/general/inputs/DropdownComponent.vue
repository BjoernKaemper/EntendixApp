<template>
  <div class="dropdown">
    <div
      class="dropdown-input-toggle"
      @click="toggleDropdown()"
      @keydown.enter="toggleDropdown()"
    >
      {{ currentValue }}
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
              @click="$emit('changed', option)"
              @keydown.enter="$emit('changed', option)"
              :class="{ selected: option === currentValue }"
            >
              {{ option }}
            </p>
          </div>
        </template>

        <!-- Single option Values -->
        <template v-else>
          <p
            :key="index"
            @click="$emit('changed', optionGroup)"
            @keydown.enter="$emit('changed', optionGroup)"
            :class="{ selected: optionGroup === currentValue }"
          >
            {{ optionGroup }}
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
     * @type {Array<string | string[]>}
     */
    options: {
      type: Array as PropType<Array<string | string[]>>,
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

  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive;
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
    &:not(:last-child) {
      border-bottom: 1px solid $light-purple;
    }
  }

  &.is-active {
    visibility: visible;
  }
}

</style>
