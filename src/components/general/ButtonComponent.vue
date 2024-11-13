<template>
  <button :type="type" :class="[state, size, onlyIconClass]" :title="title">
    {{ text }}
    <MaterialSymbol v-if="icon" :symbol="icon" />
  </button>
</template>

<script lang="ts">
import type { ButtonHTMLAttributes, PropType } from 'vue';
import { IconTypes } from '@/types/enums/IconTypes';
import type { MaterialIconNames } from '@/types/local/MaterialIconNames';
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
     * @type {IconTypes | MaterialIconNames}
     * @default ''
     */
    icon: {
      type: [String as () => IconTypes | MaterialIconNames],
      default: '',
    },
    /**
     * The state of the button.
     * @type {string}
     */
    state: {
      type: String as PropType<'primary' | 'secondary' | 'error'>,
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
    /**
     * Button type
     */
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
    },
    /**
     * Title of the button
     */
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    onlyIconClass(): string {
      return this.text === '' ? 'only-icon' : '';
    },
  },
};
</script>

<style scoped lang="scss">
button {
  border: 1px solid $light-purple !important;
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
  }

  &.secondary {
    background-color: $lightest;
    border: 1px solid $light-purple;
  }

  &.error {
    background-color: $orange;
    border-color: $orange;
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
