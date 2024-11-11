import type { MaterialIconNames } from './MaterialIconNames';

/** Basic info about a trade with it's icon and counters of plants */
export interface TradeWithPlantCounter {
  /** Object wih plantcategories as keys and amount of plants per category */
  plantCounter: {
    [key: string]: number;
  };
  /** Function to open the current trade */
  openTrade: () => void;
  /** Unique ID */
  id: string;
  /** Title of trade */
  title: string;
  /** Icon representing the trade */
  icon: MaterialIconNames;
}
