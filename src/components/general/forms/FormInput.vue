<template>
  <div class="form-input">
    <label v-if="label" :for="id" class="form-input__label">{{ label }}</label>
    <div class="form-input__container">
      <MaterialSymbol
        v-if="icon"
        :symbol="icon"
        class="form-input__icon"
        :class="{ 'form-input__icon--textarea': type === 'textarea' }"
      />
      <textarea
        v-if="type === 'textarea'"
        class="form-input__input form-input__input--textarea"
        :class="{ 'form-input__input--icon': icon, 'form-input__input--error': hasError }"
        :id="id"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="(e) => $emit('update:modelValue', (e.target as HTMLTextAreaElement).value)"
        :value="modelValue"
        :required="required"
        :rows="rows"
      />
      <input
        v-else
        class="form-input__input"
        :class="{
          'form-input__input--icon': icon,
          'form-input__input--error': hasError,
          'form-input__input--align': align === 'right',
        }"
        :id="id"
        :type="internalType"
        :placeholder="placeholder"
        :disabled="disabled"
        @focus="handleFocus"
        @blur="handleBlur"
        :value="modelValue"
        @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
        :required="required"
      />
    </div>
    <div v-if="description" class="form-input__description">{{ description }}</div>
    <div v-if="errorMessage" class="form-input__error-message">
      <MaterialSymbol symbol="warning" class="form-input__error-icon" />
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts">
// Library imports
import type { InputHTMLAttributes, PropType } from 'vue';

// Component imports
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

// Type imports
import type { MaterialIconNames } from '@/types/local/MaterialIconNames';

export default {
  name: 'FormInput',
  components: {
    MaterialSymbol,
  },
  props: {
    /**
     * Unique identifier for the input.
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * Label for the input.
     */
    label: {
      type: String,
      default: undefined,
    },
    /**
     * Placeholder to show on no value.
     */
    placeholder: {
      type: String,
      default: undefined,
    },
    /**
     * Wether or not the input is required.
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * Type of the input.
     */
    type: {
      type: String as PropType<InputHTMLAttributes['type'] | 'textarea'>,
      default: 'text',
    },
    /**
     * Value of the input.
     */
    modelValue: {
      type: String,
      required: true,
    },
    /**
     * Define alignment of text in the input.
     */
    align: {
      type: String as PropType<'left' | 'right'>,
      default: 'left',
    },
    /**
     * Wether or not the input is disabled.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * If the input has an error.
     */
    hasError: {
      type: Boolean,
      default: false,
    },
    /**
     * Error message
     */
    errorMessage: {
      type: String,
      default: undefined,
    },
    /**
     * Custom icon to show on the input.
     */
    icon: {
      type: String as PropType<MaterialIconNames>,
      default: undefined,
    },
    /**
     * Additional description for the input.
     */
    description: {
      type: String,
      default: undefined,
    },
    /**
     * Number of rows for the textarea.
     * @default 3
     */
    rows: {
      type: Number,
      default: 3,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      typeOverride: undefined as InputHTMLAttributes['type'] | undefined,
    };
  },
  computed: {
    internalType(): InputHTMLAttributes['type'] {
      if (this.typeOverride) {
        return this.typeOverride;
      }

      // Override type for date inputs to show proper placeholder
      if (this.type === 'date') {
        return 'text';
      }

      return this.type;
    },
  },
  methods: {
    handleFocus() {
      // Override type for date inputs to enable date picker on focus
      if (this.type === 'date') {
        this.typeOverride = 'date';
      }
    },
    handleBlur() {
      this.typeOverride = undefined;
    },
  },
};
</script>

<style scoped lang="scss">
.form-input {
  display: flex;
  flex-direction: column;
  gap: $xxxs;
  width: 100%;

  &__label,
  &__input {
    @include content;
  }

  &__container {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__input {
    background-color: $lightest;
    border-radius: $border-radius;
    border: 1px solid $light-purple;
    padding: $xxxs $xxs;
    width: 100%;

    &--textarea {
      resize: vertical;
      min-height: calc(2 * $xxxs + ($content-size * $content-line-height * 2));
    }

    &--icon {
      padding-left: calc(2 * $xxxs + $m);
    }

    &--error {
      border-color: $orange;
    }

    &--align {
      text-align: right;
    }

    &:focus:not(:disabled),
    &:active:not(:disabled) {
      border-color: $dark-purple;
      box-shadow: 0px 0px 0px 2px $dark-purple-15;
      outline: none;
    }

    &::placeholder {
      color: $light-purple;
    }

    &:disabled {
      border-color: $light;
      cursor: not-allowed;
    }
  }

  &__icon {
    position: absolute;
    font-size: $m;
    left: calc($xxxs + 1px); // 1px to align with input border

    &--textarea {
      align-self: flex-start;
      top: calc($xxxs + 1px); // 1px to align with input border;
    }
  }

  &__error-message {
    display: flex;
    align-items: center;
    color: $orange !important;
    gap: $xxxs;

    @include meta-information;
  }

  &__error-icon {
    font-size: $s;
  }

  &__description {
    @include meta-information;
  }
}
</style>
