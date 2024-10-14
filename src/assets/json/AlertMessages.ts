import { AlertMessageTypes } from '@/types/enums/AlertMessageTypes';
import { AlertTypes } from '@/types/enums/AlertTypes';
import type { Alert } from '@/types/Alert';

export const AlertMessages: { [key: string]: Alert } = {
  [AlertMessageTypes.FETCH_ERROR]: {
    title: 'Fehler beim Laden der Daten',
    description:
      'Beim Laden der Daten ist ein Fehler aufgetreten. Bitte versuche es zu einem späteren Zeitpunkt erneut.',
    type: AlertTypes.ERROR,
  },
};
