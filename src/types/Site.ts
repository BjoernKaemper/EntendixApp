/**
 * Site interface
 * @typedef {Object} Site
 * @property {string} id - The unique identifier of the site
 * @property {Object} data - The data of the site
 * @property {string} data.SiteName - The name of the site
 * @property {Object[]} data.Address - The address of the site
 * @property {string} data.Address.Street - The street of the site
 * @property {string} data.Address.Zipcode - The zipcode of the site
 * @property {string} data.Address.CityTown - The city or town of the site
 * @property {string} data.Address.NationalCode - The national code of the site
 * @property {string} data.Address.Longitude - The longitude of the site
 * @property {string} data.Address.Lattitude - The lattitude of the site
 */
export default interface Site {
  id: string;
  data: {
    Address: {
      Street: string;
      Zipcode: string;
      CityTown: string;
      NationalCode: string;
      Longitude: string;
      Lattitude: string;
    }[];
    SiteName: string;
  };
}
