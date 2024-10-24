import { TimelineLookbackOptions } from '@/configs/timeRangeDropdown';

export default {
  getLookbackInDays(option: TimelineLookbackOptions): number {
    switch (option) {
      case TimelineLookbackOptions.TWENTYFOUR_HOURS:
        return 1;
      case TimelineLookbackOptions.CURRENT_WEEK:
        return 7;
      case TimelineLookbackOptions.SEVEN_DAYS:
        return 7;
      case TimelineLookbackOptions.FOURTEEN_DAYS:
        return 14;
      case TimelineLookbackOptions.CURRENT_MONTH:
        return 30;
      case TimelineLookbackOptions.THIRTY_DAYS:
        return 30;
      case TimelineLookbackOptions.CURRENT_QUARTER:
        return 90;
      case TimelineLookbackOptions.CURRENT_YEAR:
        return 365;
      default:
        return 0;
    }
  },
};
