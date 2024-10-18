import type { FormValidator } from '@/types/Inputs';

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
