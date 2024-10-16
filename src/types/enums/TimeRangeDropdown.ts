import type { DateTime } from 'luxon';

export enum TimelineLookbackOptions {
  TWENTYFOUR_HOURS = 'TWENTYFOUR_HOURS',
  CURRENT_WEEK = 'CURRENT_WEEK',
  SEVEN_DAYS = 'SEVEN_DAYS',
  FOURTEEN_DAYS = 'FOURTEEN_DAYS',
  CURRENT_MONTH = 'CURRENT_MONTH',
  THIRTY_DAYS = 'THIRTY_DAYS',
  CURRENT_QUARTER = 'CURRENT_QUARTER',
  CURRENT_YEAR = 'CURRENT_YEAR',
  ALL = 'ALL',
}

export type TimeRangeDropdownConfigElement = {
  value: TimelineLookbackOptions;
  label: string;
  dateTransformer: (date: DateTime) => DateTime;
};

export type TimeRangeDropdownConfigType = {
  [key in TimelineLookbackOptions]: TimeRangeDropdownConfigElement;
};

export const TimeRangeDropdownConfig: TimeRangeDropdownConfigType = {
  [TimelineLookbackOptions.TWENTYFOUR_HOURS]: {
    value: TimelineLookbackOptions.TWENTYFOUR_HOURS,
    label: 'Letzte 24 Stunden',
    dateTransformer: (date: DateTime) => date.minus({ days: 1 }),
  },
  [TimelineLookbackOptions.CURRENT_WEEK]: {
    value: TimelineLookbackOptions.CURRENT_WEEK,
    label: 'Diese Woche',
    dateTransformer: (date: DateTime) => date.startOf('week'),
  },
  [TimelineLookbackOptions.SEVEN_DAYS]: {
    value: TimelineLookbackOptions.SEVEN_DAYS,
    label: 'Letzte 7 Tage',
    dateTransformer: (date: DateTime) => date.minus({ days: 7 }),
  },
  [TimelineLookbackOptions.FOURTEEN_DAYS]: {
    value: TimelineLookbackOptions.FOURTEEN_DAYS,
    label: 'Letzte 14 Tage',
    dateTransformer: (date: DateTime) => date.minus({ days: 14 }),
  },
  [TimelineLookbackOptions.CURRENT_MONTH]: {
    value: TimelineLookbackOptions.CURRENT_MONTH,
    label: 'Dieser Monat',
    dateTransformer: (date: DateTime) => date.startOf('month'),
  },
  [TimelineLookbackOptions.THIRTY_DAYS]: {
    value: TimelineLookbackOptions.THIRTY_DAYS,
    label: 'Letzte 30 Tage',
    dateTransformer: (date: DateTime) => date.minus({ days: 30 }),
  },
  [TimelineLookbackOptions.CURRENT_QUARTER]: {
    value: TimelineLookbackOptions.CURRENT_QUARTER,
    label: 'Dieses Quartal',
    dateTransformer: (date: DateTime) => date.startOf('quarter'),
  },
  [TimelineLookbackOptions.CURRENT_YEAR]: {
    value: TimelineLookbackOptions.CURRENT_YEAR,
    label: 'Dieses Jahr',
    dateTransformer: (date: DateTime) => date.startOf('year'),
  },
  [TimelineLookbackOptions.ALL]: {
    value: TimelineLookbackOptions.ALL,
    label: 'Alle Daten',
    dateTransformer: (date: DateTime) => date.minus({ years: 100 }),
  },
};
