export default {
  /**
   * Converts an object into a query string.
   *
   * @param obj - The object to be converted.
   * @returns The query string representation of the object.
   */
  queryify(obj: Record<string, any>): string {
  return Object.keys(obj)
    .filter((k: string) => obj[k] !== undefined && obj[k] !== null && obj[k] !== '')
    .map((k: string) => (`${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`))
    .filter(Boolean)
    .join('&');
  }
};
