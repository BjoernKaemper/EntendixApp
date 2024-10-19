import { ref, watch } from 'vue';
import type { EntendixInput } from '@/types/local/Inputs';

/**
 * Hook to generalize basic actions and states on custom inputs
 * @param inputs - Array of EntendixInputs to manage
 */
export const useFormManager = (inputs: EntendixInput<unknown>[]) => {
  const isValid = ref(false);
  const isChanged = ref(false);
  const showErrors = ref(false);
  const validRefs = inputs.map((input) => input.isValid);
  const changedRefs = inputs.map((input) => input.isChanged);

  watch(validRefs, () => {
    isValid.value = validRefs.every((valid) => valid.value);
  }, { immediate: true });

  watch(changedRefs, () => {
    isChanged.value = changedRefs.some((changed) => changed.value);
  }, { immediate: true });

  /**
   * Reset all inputs to their initial values
   */
  const reset = () => {
    inputs.forEach((input) => input.reset());
  };

  return {
    isValid,
    isChanged,
    showErrors,
    reset,
  };
};
