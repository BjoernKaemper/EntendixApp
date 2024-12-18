import { Auth } from 'aws-amplify';

export default {
  /**
   * Make an api call
   * Content-Type is set to application/json by default
   *
   * @param {string} url Request URL
   * @param {RequestInit} options Additional fetch request options
   * @return {any} Api call response data, JSON is returned already parsed
   */
  async apiCall(url: string, options: RequestInit = {}): Promise<any> {
    const jwt = (await Auth.currentSession()).getIdToken().getJwtToken();

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${jwt}`,
      },
    };

    const CONTENT_TYPE = 'content-type';

    try {
      const response = await this.defaultApiCall(url, { ...defaultOptions, ...options });

      if (response.headers.get(CONTENT_TYPE)?.includes('application/json')) {
        return await response.json();
      }

      // @TODO: Implement global error handler
      throw new Error('API call failed, unexpected response type');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('API call failed', error);
      throw error;
    }
  },

  /**
   * Make an api call with default headers
   * @param {string} url The URL to call
   * @param {RequestInit} options Additional fetch request options
   * @returns {Promise<Response>} The response of the fetch call
   */
  async defaultApiCall(url: string, options: RequestInit = {}): Promise<Response> {
    const jwt = (await Auth.currentSession()).getIdToken().getJwtToken();

    const defaultOptions: RequestInit = {
      headers: {
        Authorization: `${jwt}`,
      },
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_MIDDLEWARE_URL}${url}`, {
        ...defaultOptions,
        ...options,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('API call failed', error);
      throw error;
    }
  },
};
