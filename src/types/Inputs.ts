import type { Ref } from 'vue';

export interface FormValidator<T> {
  fn: (val: T) => boolean;
  errorMessage: string;
}

export interface EntendixInput<T> {
  value: Ref<T>;
  isChanged: Ref<boolean, boolean>;
  isValid: Ref<boolean>;
  errorMessage: Ref<string | undefined>;
  reset: () => void;
}
