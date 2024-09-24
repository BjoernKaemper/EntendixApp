import type { AddressWithGeoLatLong } from '@/types/Address';
import type { Subsection } from '@/types/Subsection';

/**
 * Building interface
 * @typedef {Object} Building
 * @property {string} id - The unique identifier of the building
 * @property {Object} data - The data of the building
 * @property {AddressWithGeoLatLong} data.Address - The address of the building
 * @property {string} data.BuildingName - The name of the building
 * @property {number} data.UsableSpace - The usable space of the building
 * @property {number} data.BuildingVolume - The volume of the building
 * @property {number} data.QuantityFloors - The quantity of floors of the building
 * @property {Array<Subsection>} [data.Subsections] - The subsections of the building
 */
export interface Building {
  id: string;
  data: {
    Address: AddressWithGeoLatLong;
    BuildingName: string;
    UsableSpace: number;
    BuildingVolume: number;
    QuantityFloors: number;
    Subsections?: Array<Subsection>;
  };
}
