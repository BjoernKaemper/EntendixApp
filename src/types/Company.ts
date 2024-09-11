/**
 * Company interface
 * @typedef {Object} Company
 * @property {string} id - The unique identifier of the company
 * @property {Object} data - The data of the company
 * @property {string} data.CompanyName - The name of the company
 * @property {Object[]} data.Address - The address of the company
 * @property {string} data.Address.Street - The street of the company
 * @property {string} data.Address.Zipcode - The zipcode of the company
 * @property {string} data.Address.CityTown - The city or town of the company
 * @property {string} data.Address.NationalCode - The national code of the company
 */
export default interface Company {
  id: string;
  data: {
    CompanyName: string;
    Address: {
      Street: string;
      Zipcode: string;
      CityTown: string;
      NationalCode: string;
    }[];
  };
}
