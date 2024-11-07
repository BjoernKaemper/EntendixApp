import type { Address, AddressWithGeoLatLong } from '@/types/global/general/Address';
import { Loader } from '@googlemaps/js-api-loader';

export default {
  /**
   * Get Coordinates based of a given address
   * @param {Address} address - The adress to get the coordinates for
   * @returns {string} The encoded data.
   */
  async getCoordinates(address: Address): Promise<AddressWithGeoLatLong> {
    try {
      const google = await new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places'],
      }).load();
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({
        address: `${address.street} ${address.zipcode} ${address.cityTown} ${address.nationalCode}`,
      });
      if (result.results.length) {
        return {
          ...address,
          lattitude: result.results[0].geometry.location.lat().toString(),
          longitude: result.results[0].geometry.location.lng().toString(),
        } as AddressWithGeoLatLong;
      }
      throw new Error('No coordinates found');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('No coordinates found: ', error);
      throw error;
    }
  },
};
