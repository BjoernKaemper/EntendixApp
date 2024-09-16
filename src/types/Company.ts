import type { Address } from '@/types/Address';

/**
 * Company interface
 * @typedef {Object} Company
 * @property {string} id - The unique identifier of the company
 * @property {Object} data - The data of the company
 * @property {string} data.CompanyName - The name of the company
 * @property {Address} data.Address - The address of the company
 * @see {@link Address}
 */
export default interface Company {
  id: string;
  data: {
    CompanyName: string;
    Address: Address;
  };
}
