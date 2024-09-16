/**
 * Address Interface
 * @typedef {Object} Address
 * @property {string} Street - The street of the address
 * @property {string} Zipcode - The zipcode of the address
 * @property {string} CityTown - The city or town of the address
 * @property {string} NationalCode - The national code of the address
 */
export interface Address {
  Street: string;
  Zipcode: string;
  CityTown: string;
  NationalCode: string;
}

/**
 * Address Interface with Geo Lat Long
 * @typedef {Object} AddressWithGeoLatLong
 * @property {string} Longitude - The longitude of the address
 * @property {string} Lattitude - The lattitude of the address
 * @extends {Address}
 * @see {@link Address}
 */
export interface AddressWithGeoLatLong extends Address {
  Longitude: string;
  Lattitude: string;
}
