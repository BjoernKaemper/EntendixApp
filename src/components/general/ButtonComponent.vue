<template>
  <button type="button" :class="[colorClass, size, onlyIconClass]">
    {{ text }}
    <MaterialSymbol v-if="icon" :symbol="icon" />
  </button>
</template>

<script lang="ts">
import { IconTypes } from '@/types/enums/IconTypes';
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

export default {
  name: 'ButtonComponent',
  components: {
    MaterialSymbol,
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
      type: [String as () => IconTypes],
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
    colorClass(): string {
      return this.primary ? 'primary' : '';
    },
    onlyIconClass(): string {
      return this.text === '' ? 'only-icon' : '';
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
  &.small {
    padding: $xxxs;
    @include meta-information;
    > span {
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
}
</style>
