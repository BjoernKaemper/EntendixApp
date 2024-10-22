import type { FormValidator } from '@/types/local/Inputs';

/**
 * A validator that makes sure given value is not empty and thus makes it
 * required
 */
export const requiredValidator: FormValidator<unknown> = {
  fn: (value: unknown) => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    if (typeof value === 'number') {
      // Immediately return true as we know it's a number so it can't be
      // undefined or null, but we also accept 0 which is a falsy value
      return true;
    }

    return !!value;
  },
  errorMessage: 'Dieses Feld ist erforderlich',
};

/**
 * A validator to ensure that a given input reach a minimum amount/value
 * @param minValue - Value that the input should be greater to
 * @param includeValue - If the minValue itself should be included in the check
 */
export const minValidator = (
  minValue: number,
  includeValue = false,
): FormValidator<number | string> => ({
  fn: (value: number | string) => {
    let parsedValue = value as number;

    if (typeof value === 'string') {
      parsedValue = parseFloat(value);
    }

    return includeValue ? parsedValue >= minValue : parsedValue > minValue;
  },
  errorMessage: `Der Wert muss ${includeValue ? 'mindestens' : 'größer als'} ${minValue} sein`,
});

/**
 * A validator to ensure that a given input does not exceed a certain amount/value
 * @param maxValue - Value that the input should be less to
 * @param includeValue - If the maxValue itself should be included in the check
 */
export const maxValidator = (maxValue: number, includeValue = false): FormValidator<number> => ({
  fn: (value: number) => {
    let parsedValue = value as number;

    if (typeof value === 'string') {
      parsedValue = parseFloat(value);
    }

    return includeValue ? parsedValue <= maxValue : parsedValue < maxValue;
  },
  errorMessage: `Der Wert muss ${includeValue ? 'maximal' : 'kleiner als'} ${maxValue} sein`,
});
