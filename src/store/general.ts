// Modules
import { DateTime } from 'luxon';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from 'aws-amplify';

// Types
import type Company from '@/types/global/company/Company';
import type { Site } from '@/types/global/site/Site';
import type { ActiveAlert, Alert } from '@/types/local/Alert';
import { TimelineLookbackOptions, TimeRangeDropdownConfig } from '@/configs/timeRangeDropdown';
import type { Kpi } from '@/types/global/kpi/Kpi';
import type { TimelineDataPoint } from '@/types/global/timeline/Timeline';
import { type SiteWithDataurl } from '@/types/local/Site';

// Helpers
import QueryHelper from '@/helpers/QueryHelper';
import FetchHelper from '@/helpers/FetchHelper';
import Base64Helper from '@/helpers/Base64Helper';

interface GeneralStoreState {
  time: DateTime;
  kpiLookbackWindow: {
    currentValue: TimelineLookbackOptions;
    customStartDate?: DateTime;
    customEndDate?: DateTime;
  };
  windowDimensions: {
    width: number | null;
    height: number | null;
  };
  alerts: ActiveAlert[];
  baseInfoState: {
    companies: Company[];
    sites: SiteWithDataurl[];
    requestTimestamp: DateTime | null;
    isLoading: boolean;
    error: boolean;
  };
}

// @TODO: We can check, if we can put the default values into a different file
const defaultbaseInfoState = {
  companies: [],
  sites: [],
  requestTimestamp: null,
  isLoading: false,
  error: false,
};

const defaultWindowDimensionsState = {
  width: null,
  height: null,
};

export const useGeneralStore = defineStore('general', {
  state: (): GeneralStoreState => ({
    time: DateTime.local(),
    kpiLookbackWindow: {
      currentValue: TimelineLookbackOptions.FOURTEEN_DAYS,
    },
    windowDimensions: defaultWindowDimensionsState,
    baseInfoState: defaultbaseInfoState,
    alerts: [],
  }),
  actions: {
    async getUserId(): Promise<string> {
      const session = await Auth.currentSession();
      console.log(session.getIdToken().payload);
      return session.getIdToken().payload.sub;
    },
    /**
     * Update the global time
     * @returns {void}
     */
    updateGlobalTime(): void {
      // Initially we set the global time to now to have a value...
      this.time = DateTime.local();
      // ...then we check how far along we are to the next full minute...
      const distanceToNearestMinute = this.time.endOf('minute').diff(this.time).as('millisecond');
      // ...at which time we start the global clock which updates every minute
      setTimeout(() => {
        this.updateGlobalTime();
      }, distanceToNearestMinute);
    },

    /**
     * Set the window dimensions
     * @returns {void}
     */
    setWindowDimensions(): void {
      this.windowDimensions.width = window.innerWidth;
      this.windowDimensions.height = window.innerHeight;
    },

    /**
     * Add a new alert to the alert list
     * @param {Alert} alert
     * @param {boolean} autoClose - If the alert should be closed automatically
     * after given time
     * @param {number} timeout - The time in milliseconds after which the alert
     * should be closed
     * @returns {string} The id of the alert
     */
    addAlert(alert: Alert, autoClose: boolean = false, timeout: number = 7000): string {
      const alertId = uuidv4();
      let timeoutId: NodeJS.Timeout | undefined;

      if (autoClose) {
        timeoutId = setTimeout(() => {
          this.removeAlert(alertId);
        }, timeout);
      }

      this.alerts.push({
        ...alert,
        id: alertId,
        time: DateTime.now().toFormat('HH:mm'),
        timeoutId,
        timeout,
      });
      return alertId;
    },

    /**
     * Add a new alert to the alert list
     * @param {Alert} alert
     * @returns {void}
     */
    removeAlert(alertId: string): void {
      this.alerts = this.alerts.filter((alert) => alert.id !== alertId);
    },

    /**
     * Load base informations for the application
     * @returns {Promise<void>}
     */
    async loadBaseInformations(): Promise<void> {
      this.baseInfoState = defaultbaseInfoState;

      this.baseInfoState.isLoading = true;

      // Fetching types Site Information
      const queryCombined = {
        userId: await this.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;
      try {
        this.baseInfoState.sites = (await FetchHelper.apiCall(
          `/sites?${q}`,
          requestOptions,
        )) as Site[];
        this.loadSiteImages();

        // Fetching types Company Information
        this.baseInfoState.companies = (await FetchHelper.apiCall(
          `/companies?${q}`,
          requestOptions,
        )) as Company[];

        this.baseInfoState.requestTimestamp = DateTime.now();
      } catch (error) {
        this.baseInfoState.error = true;
      }
      this.baseInfoState.isLoading = false;
    },

    async fetchKpiChartData(parentId: string, kpi: Kpi): Promise<TimelineDataPoint[]> {
      const startDate = TimeRangeDropdownConfig[
        this.kpiLookbackWindow.currentValue
      ].dateTransformer(this.time);

      const queryCombined = {
        userId: await this.getUserId(),
        startTimestamp: startDate.toSeconds(),
        endTimestamp: this.time.toSeconds(),
        aasIdentifier: Base64Helper.encode(parentId),
        sem_id_shorts: `${kpi.id}.Value.PresentValue`,
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      // eslint-disable-next-line no-useless-catch
      try {
        const rawKpiData = FetchHelper.apiCall(`/timelines?${q}`, requestOptions);

        return (await rawKpiData).map((data: any) => ({
          timestamp: DateTime.fromISO(data.timestamp),
          value: data.value,
        }));
      } catch (error) {
        throw error;
      }
    },

    /**
     * Fetch the KPI information
     * @param {string} parentId The ID of the parent element
     * @returns {Promise<void>} The promise of the KPI information
     */
    async fetchKpiInformation(parentId: string): Promise<Kpi[]> {
      const queryCombined = {
        userId: this.getUserId(),
      };
      const q = QueryHelper.queryify(queryCombined);

      const requestOptions = {
        // @TODO: Implement authentication
      } as RequestInit;

      // eslint-disable-next-line no-useless-catch
      try {
        let kpi = (await FetchHelper.apiCall(
          `/kpis/${Base64Helper.encode(parentId)}?${q}`,
          requestOptions,
        )) as Kpi[];

        const kpiDataWithCharts = kpi.map(async (kpiData) => {
          const mappedKpi = { ...kpiData };
          mappedKpi.timeline = await this.fetchKpiChartData(parentId, kpiData);
          return mappedKpi;
        });
        kpi = await Promise.all(kpiDataWithCharts);
        return kpi;
      } catch (error) {
        throw error;
      }
    },
    async loadSiteImages(): Promise<void> {
      this.baseInfoState.sites.forEach(async (site, idx) => {
        if (site.data.imagesrc) {
          const queryCombined = {
            userId: this.getUserId(),
          };
          const q = QueryHelper.queryify(queryCombined);
          const requestOptions = {
            'Content-Type': 'image/jpeg',
          } as RequestInit;
          const resp = await FetchHelper.defaultApiCall(
            `${site.data.imagesrc}?${q}`,
            requestOptions,
          );
          const blob = await resp.blob();
          this.baseInfoState.sites[idx].data.imageDataUrl = URL.createObjectURL(blob);
        }
      });
    },
  },
});
