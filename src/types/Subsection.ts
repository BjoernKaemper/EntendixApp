import type { SubsectionPlant } from '@/types/SubsectionPlant';

/**
 * Subsection interface
 * @typedef {Object} Subsection
 * @property {string} condition - The condition of the subsection
 * @property {string} tradeName - The trade name of the subsection
 * @property {string} tradeType - The trade type of the subsection
 * @property {Array<SubsectionPlant>} plants - The plants of the subsection
 * @see {@link SubsectionPlant}
 */
export interface Subsection {
  condition: string; // @TODO: Add ENUM
  tradeName: string;
  tradeType: string;
  plants: Array<SubsectionPlant>
}
