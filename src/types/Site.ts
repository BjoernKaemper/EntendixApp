import type { AddressWithGeoLatLong } from '@/types/Address';

/**
 * Site interface
 * @typedef {Object} Site
 * @property {string} id - The unique identifier of the site
 * @property {Object} data - The data of the site
 * @property {string} data.SiteName - The name of the site
 * @property {AddressWithGeoLatLong} data.Address - The address of the site
 * @see {@link AddressWithGeoLatLong}
 */
export default interface Site {
  id: string;
  data: {
    Address: AddressWithGeoLatLong
    SiteName: string;
  };
}
