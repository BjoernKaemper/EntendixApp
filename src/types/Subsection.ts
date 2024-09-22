/**
 * Subsection interface
 * @typedef {Object} Subsection
 * @property {string} id - The unique identifier of the subsection
 * @property {string} aasSemanticIdentifyer - The semantic identifier of the subsection
 * @property {string} type - The type of the subsection
 */
export interface Subsection {
  id: string;
  aasSemanticIdentifyer: string;
  type: string;
}
