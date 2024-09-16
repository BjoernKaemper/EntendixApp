import type { AddressWithGeoLatLong } from '@/types/Address';
import type { Building } from '@/types/Building';

/**
 * SiteData interface
 * @typedef {Object} SiteData
 * @property {AddressWithGeoLatLong} Address - The address of the site
 * @property {string} SiteName - The name of the site
 * @see {@link AddressWithGeoLatLong}
 */
interface SiteData {
  Address: AddressWithGeoLatLong
  SiteName: string;
}

/**
 * SiteData interface with building information
 * @typedef {Object} SiteDataWithBuildingInformation
 * @property {Building[]} Buildings - The buildings of the site
 * @see {@link Building}
 */
interface SiteDataWithBuildingInformation extends SiteData {
  Buildings?: Building[];
}

/**
 * Site interface
 * @typedef {Object} Site
 * @property {string} id - The id of the site
 * @property {SiteData} data - The data of the site
 * @see {@link SiteData}
 */
export interface Site {
  id: string;
  data: SiteData;
}

/**
 * Site interface with building information
 * @typedef {Object} SiteWithBuildinginformation
 * @property {string} id - The id of the site
 * @property {SiteDataWithBuildingInformation} data - The data of the site
 * @see {@link SiteDataWithBuildingInformation}
 */
export interface SiteWithBuildinginformation {
  id: string;
  data: SiteDataWithBuildingInformation;
}
