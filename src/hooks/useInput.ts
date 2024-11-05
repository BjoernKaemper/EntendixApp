import { ref, watchEffect, type Ref } from 'vue';
import type { EntendixInput, FormValidator } from '@/types/local/Inputs';

/**
 * Hook to provide all necessary states and methods to manage an input\
 * Returned `value` prop is supposed to be bound to the input element (ideally via v-model)
 * @param validators - Array of validators to run against the input
 * @param initialValue - Initial value of the input
 */
export const useInput = <T = string | number>(
  validators: FormValidator<T>[],
  initialValue: T,
): EntendixInput<T> => {
  const internalInitialValue = ref<T>(initialValue) as Ref<T>;
  const value = ref<T>(initialValue) as Ref<T>;
  const isValid = ref(false);
  const isChanged = ref(false);
  const errorMessage = ref<string>();

  // Aware that this could be computed values, but these somehow don't work in
  // conjunction with the options api, so went for refs and a watch instead
  watchEffect(() => {
    if (Array.isArray(internalInitialValue.value) && Array.isArray(value.value)) {
      if (internalInitialValue.value.length !== value.value.length) {
        isChanged.value = true;
      } else {
        isChanged.value = internalInitialValue.value.some(
          (val, index) => val !== value.value[index as keyof T],
        );
      }
    } else if (
      (!internalInitialValue.value && value.value) ||
      value.value !== internalInitialValue.value
    ) {
      isChanged.value = true;
    } else {
      isChanged.value = false;
    }

    const errorMessages: string[] = [];
    isValid.value = true;
    errorMessage.value = undefined;

    validators.forEach((validator) => {
      const validatorResult = validator.fn(value.value as T);

      if (!validatorResult) {
        errorMessages.push(validator.errorMessage);
        isValid.value = false;
      }
    });

    if (errorMessages.length) {
      errorMessage.value = errorMessages.join(', ');
    }
  });

  /**
   * Reset the input to its initial value
   */
  const reset = () => {
    value.value = internalInitialValue.value;
  };

  const updateInitialValue = (newValue: T) => {
    internalInitialValue.value = newValue;
  };

  return {
    value,
    isChanged,
    isValid,
    errorMessage,
    reset,
    updateInitialValue,
  };
};
