/**
 * Dropdown option type
 * @typedef {Object} DropdownOptionElement
 * @property {string} label - The label of the option
 * @property {string} value - The value of the option
*/
export type DropdownOptionElement = {
  label: string;
  value: string;
};

/**
 * Dropdown options group type
 * @typedef {Array<DropdownOptionElement>} DropdownOptionsGroup
*/
export type DropdownOptionsGroup = DropdownOptionElement[];

/**
 * Dropdown options type
 * @typedef {Array<DropdownOptionElement | DropdownOptionsGroup>} DropdownOptions
*/
export type DropdownOptions = Array<DropdownOptionElement | DropdownOptionsGroup>;
