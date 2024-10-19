import { ref, watch, type Ref } from 'vue';
import type { EntendixInput, FormValidator } from '@/types/local/Inputs';

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
      if ((!initialValue && value.value) || value.value !== initialValue) {
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
