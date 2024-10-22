import { DateTime } from 'luxon';

export default {
  /**
   * Format date to a prettier string
   * @param date Date string
   * @param withTime Wheter or not include the time in the output
   * @returns Formatted date string
   */
  prettierDate(date: string, withTime: boolean = true): string {
    return DateTime.fromJSDate(new Date(date)).toFormat(
      withTime ? 'dd.MM.yyyy HH:mm' : 'dd.MM.yyyy',
    );
  },
};
