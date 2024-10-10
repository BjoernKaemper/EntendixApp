import { Auth } from 'aws-amplify';
import { AlertTypes } from '@/types/enums/AlertTypes';
import { useGeneralStore } from '../store/general';

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
      const response = await fetch(url, { ...defaultOptions, ...options });

      if (response.headers.get(CONTENT_TYPE)?.includes('application/json')) {
        return await response.json();
      }

      // @TODO: Implement global error handler
      throw new Error('API call failed, unexpected response type');
    } catch (error) {
      // @TODO: Implement global error handler
      const generalStore = useGeneralStore();
      generalStore.addAlert(
        AlertTypes.ERROR,
        'Beim Laden der Daten ist ein Fehler aufgetreten. Bitte versuche es zu einem späteren Zeitpunkt erneut.',
        'Fehler beim Laden der Daten',
      );
      // eslint-disable-next-line no-console
      console.error('API call failed', error);
      throw error;
    }
  },
};
