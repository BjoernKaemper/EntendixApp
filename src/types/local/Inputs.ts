import type { Ref } from 'vue';

/**
 * Validator with validate function and error message to run against inputs to
 * determine their validity and display error messages if necessary
 * @param T - The type of the value to be validated
*/
export interface FormValidator<T> {
  /**
   * Function that will be run to determine validity of input
   * @param val - The value to be validated
   * @returns - Whether the value is valid or not
  */
  fn: (val: T) => boolean;
  /**
  * Error message to display if the value is not valid
 */
  errorMessage: string;
}

/**
 * Form of a managed input with generalized states, validation and errors
 * @param T - The type of the value
 */
export interface EntendixInput<T> {
  /** Current value of the input */
  value: Ref<T>;
  /** Wether or not the input has been changed compared to a initial value or empty state */
  isChanged: Ref<boolean, boolean>;
  /** If the current input is valid, determined on a set of validators */
  isValid: Ref<boolean>;
  /** Current error message, if input is not valid */
  errorMessage: Ref<string | undefined>;
  /** Reset the input to its initial value */
  reset: () => void;
}
