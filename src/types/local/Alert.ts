/**
 * Alert interface
 * @typedef {Object} Alert
 * @property {string} id - The id of the alert
 * @property {string} type - The type of the alert
 * @property {string} title - The title of the alert
 * @property {string} description - The description of the alert
 * @property {string} time - The time of the alert
 */

export interface Alert {
  id?: string;
  type: string;
  title: string;
  description: string;
  time?: string;
}

/**
 * Initialized and pending alert
 */
export interface ActiveAlert extends Alert {
  /** Initial timeout id, if alert is set to autoclose */
  timeoutId?: NodeJS.Timeout;
  /** Timeout period of alert in ms */
  timeout: number;
}
