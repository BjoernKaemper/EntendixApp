export default {
  /**
   * Create a data url from a blob.
   * @param {blob} blob - The data to encode.
   * @returns {string} The dataurl.
   */
  async createURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  },
};
