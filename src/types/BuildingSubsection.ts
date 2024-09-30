import type { SemanticSubmoduleTypes } from '@/types/enums/SemanticSubmoduleTypes';

/**
 * BuildingSubsection interface
 * @typedef {Object} BuildingSubsection
 * @property {string} id - The unique identifier of the subsection
 * @property {SemanticSubmoduleTypes} aasSemanticIdentifyer - Semantic identifier of the subsection
 * @property {string} type - The type of the subsection
 */
export interface BuildingSubsection {
  id: string;
  aasSemanticIdentifyer: SemanticSubmoduleTypes;
  type: string;
}
