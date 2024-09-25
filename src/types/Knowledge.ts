/**
 * Description interface
 * @typedef {Object} Description
 * @property {string} de - The german description
 * @property {string} en - The english description
 * @see {@link WissenssammlungItem}
*/
interface Description {
  de: string;
  en: string;
}

/**
 * WissenssammlungItem interface
 * @typedef {Object} WissenssammlungItem
 * @property {number} id - The id of the item
 * @property {string} title - The title of the item
 * @property {Description[]} description - The description of the item
 * @see {@link Description}
*/
export interface WissenssammlungItem {
  id: number;
  title: string;
  description: Description[];
}

/**
 * Wissenssammlung interface
 * @typedef {Object} Wissenssammlung
 * @property {WissenssammlungItem[]} wissenssammlung - The collection of items
 * @see {@link WissenssammlungItem}
 */
export interface Wissenssammlung {
  wissenssammlung: WissenssammlungItem[];
}
