import type { SemanticSubmoduleTypes } from '@/types/enums/SemanticSubmoduleTypes';

/**
 * Subsection interface
 * @typedef {Object} Subsection
 * @property {string} id - The unique identifier of the subsection
 * @property {SemanticSubmoduleTypes} aasSemanticIdentifyer - Semantic identifier of the subsection
 * @property {string} type - The type of the subsection
 */
export interface Subsection {
  id: string;
  aasSemanticIdentifyer: SemanticSubmoduleTypes;
  type: string;
}
