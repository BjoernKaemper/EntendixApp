import { Buffer } from 'buffer';

export default {
  /**
   * Encodes a value in base64.
   * @param {string} data - The data to encode.
   * @returns {string} The encoded data.
   */
  encode(data: string): string {
    return Buffer.from(data).toString('base64');
  },

  /**
   * Decodes a value from base64.
   * @param {string} data - The data to decode.
   * @returns {string} The decoded data.
   */
  decode(data: string): string {
    return Buffer.from(data, 'base64').toString('utf-8');
  },
};
