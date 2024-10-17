export default {
  /**
   * Decodes a URI recursively.
   * @param {string} url - The URL to decode.
   * @returns {string} The decoded URL.
   */
  decodeURIrecursiv(url: string): string {
    if (url.indexOf('%') !== -1) {
      return this.decodeURIrecursiv(decodeURIComponent(url));
    }

    return url;
  },
  /**
   * Encodes a URI, but first decodes it recursively.
   * @param {string} url - The URL to encode.
   * @returns {string} The encoded URL.
   */
  encodeURI(url: string): string {
    const decodedUrl = this.decodeURIrecursiv(url);
    return encodeURIComponent(decodedUrl);
  },
};
