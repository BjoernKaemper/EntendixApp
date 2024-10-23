import { ref, watch, type Ref } from 'vue';
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
  const value = ref<T>(initialValue) as Ref<T>;
  const isValid = ref(false);
  const isChanged = ref(false);
  const errorMessage = ref<string>();

  // Aware that this could be computed values, but these somehow don't work in
  // conjunction with the options api, so went for refs and a watch instead
  watch(
    value,
    () => {
      if (Array.isArray(initialValue) && Array.isArray(value.value)) {
        if (initialValue.length !== value.value.length) {
          isChanged.value = true;
        } else {
          isChanged.value = initialValue.some(
            (val, index) => val !== value.value[index as keyof T],
          );
        }
      } else if ((!initialValue && value.value) || value.value !== initialValue) {
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
    },
    { immediate: true },
  );

  /**
   * Reset the input to its initial value
   */
  const reset = () => {
    value.value = initialValue;
  };

  return {
    value,
    isChanged,
    isValid,
    errorMessage,
    reset,
  };
};
