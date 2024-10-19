import type { MaterialIconNames } from '@/types/local/MaterialIconNames';

interface TradesConfigEntry {
  id: string;
  title: string;
  icon: MaterialIconNames;
}

/**
 * All trades with their ids, title and icons in desired order
 */
export const tradesConfig: TradesConfigEntry[] = [
  {
    // TODO: get proper id
    id: 'unknown',
    title: 'Türen, Tore, Fenster, Sonnenschutz (TTF)',
    icon: 'encrypted',
  },
  {
    // TODO: get proper id
    id: 'unknown',
    title: 'Technische Anlagen (TGA)',
    icon: 'electric_meter',
  },
  {
    id: 'https://entendix.com/gart/vocabulary/bactwinTrade_wastewater-water-gas-systems/1/0',
    title: 'Abwasser-, Wasser-, Gasanlagen (GWA)',
    icon: 'water',
  },
  {
    id: 'https://entendix.com/gart/vocabulary/bactwinTrade_heat-supply-systems/1/0',
    title: 'Wärmeversorgungsanlagen (HZG)',
    icon: 'heat',
  },
  {
    id: 'https://entendix.com/gart/vocabulary/bactwinTrade_air-technical-systems/1/0',
    title: 'Lufttechnische Anlagen (RLT)',
    icon: 'air',
  },
  {
    id: 'https://entendix.com/gart/vocabulary/bactwinTrade_cold-systems/1/0',
    title: 'Kälteanlagen (KAE)',
    icon: 'ac_unit',
  },
  {
    id: 'https://entendix.com/gart/vocabulary/bactwinTrade_high-voltage-systems/1/0',
    title: 'Starkstromanlagen (ELT)',
    icon: 'bolt',
  },
  {
    // TODO: get proper id
    id: 'unknown',
    title: 'Fernmelde- und IT-Anlagen (FIA)',
    icon: 'dns',
  },
  {
    // TODO: get proper id
    id: 'unknown',
    title: 'Förderanlagen (FTA)',
    icon: 'escalator',
  },
  {
    // TODO: get proper id
    id: 'unknown',
    title: 'Nutzungsspezifische Anlagen (NTZ)',
    icon: 'location_home',
  },
  {
    id: 'https://entendix.com/gart/vocabulary/bactwinTrade_building-automation-system/1/0',
    title: 'Gebäudeautomationssystem (GAA)',
    icon: 'automation',
  },
  {
    // TODO: get proper id
    id: 'unknown',
    title: 'Techn. Anl. in Außenanlagen (TAA)',
    icon: 'nature',
  },
];
