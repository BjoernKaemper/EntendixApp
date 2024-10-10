<template>
  <div class="line-chart-container">
    <div v-if="isLoading" class="loading">
      <LoadingSpinner />
    </div>
    <template v-else>
      {{ kpi }}
      <div class="line-chart-container--header">
        <h3>{{ kpi?.data.name?.de || topic }}</h3>
        <div class="line-chart-container--header--buttons">
          <ButtonComponent :icon="IconTypes.COMMENT" @click="toggleComments" />
          <ButtonComponent :icon="IconTypes.SETTINGS" :primary="true" @click="toggleSettings" />
        </div>
      </div>
      <div class="line-chart-container--content">
        <div class="line-chart-container--left">
          <div class="line-chart-container--left--values">
            <template v-if="primaryKpiValue">
              <!-- <h4 v-if="hasContext">{{ kpi.data.context.de || topic }}</h4> -->
              <BigNumber :number="primaryKpiValue" :unit="primaryKpiValueUnit" />
            </template>
            <template v-if="secondaryKpiValue">
              <BigNumber :number="secondaryKpiValue" :unit="secondaryKpiValueUnit" />
            </template>
          </div>
          <div class="line-chart-container--left--footer">
            <p>Letztes Update vor {{ lastUpdateTime }} Minuten</p>
            <ChipComponent :status="status" />
          </div>
        </div>
        <div class="line-chart-container--right">
          <LineChart :data="chartData" />
        </div>
      </div>
    </template>
    <CommentsOverlayModal
      :isCommentsModalOpen="commentsOpen"
      @close="toggleComments"
      :comment-type="moduleType"
      :comment-name="kpi?.data.name?.de || topic"
      :comment-in="moduleName"
      :comments="kpi?.data.annotations"
      startDate="@TODO"
      endDate="@TODO"
    />
    <ModalOverlay :isOpen="settingsOpen" @close="toggleSettings">
      <template #header>
        <p>Title of Modal</p>
      </template>
      <template #body>
        <p>
          Ein effizientes Gebäudemanagement beginnt mit klaren Strukturen. Mit unserer Lösung
          behalten Sie jederzeit den Überblick über alle relevanten Prozesse – von der
          Instandhaltung bis zur Optimierung Ihrer Gebäudedaten. Transparenz und Übersichtlichkeit
          stehen dabei im Vordergrund. Unsere intuitive Plattform ermöglicht es Ihnen, Ressourcen
          gezielt einzusetzen und Arbeitsabläufe zu vereinfachen.
        </p>
        <p>
          Dank moderner Technologien wie dem Digitalen Zwilling sind Sie in der Lage, den Zustand
          Ihrer Gebäude in Echtzeit zu überwachen und fundierte Entscheidungen zu treffen. So
          reduzieren Sie langfristig Kosten und erhöhen die Effizienz – alles auf einen Blick und
          immer aktuell.
        </p>
      </template>
    </ModalOverlay>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';

import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { IconTypes } from '@/types/enums/IconTypes';
import { ModuleTypes } from '@/types/enums/ModuleTypes';

// component imports
import BigNumber from '@/components/general/BigNumber.vue';
import LineChart from '@/components/general/charts/LineChart.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import CommentsOverlayModal from '@/components/general/CommentsOverlayModal.vue';
import ModalOverlay from '@/components/general/ModalOverlay.vue';

// vue / library imports
import { DateTime, Interval } from 'luxon';
import type { PropType } from 'vue';
import type { Kpi } from '@/types/global/kpi/Kpi';

export default {
  props: {
    /**
     * The topic of the line chart
     * @type {string}
     * @default 'Line Chart'
     */
    topic: {
      type: String as PropType<string>,
      required: false,
      default: '-',
    },
    /**
     * The primary kpi of the line chart
     * @type {Kpi}
     * @default { number: undefined, unit: '-' }
     */
    kpi: {
      type: Object as PropType<Kpi>,
      required: false,
      default: () => ({ data: { number: undefined, unit: '-' } }),
    },
    /**
     * The timestamp of the last update
     * @type {DateTime | null}
     * @default null
     */
    lastUpdateTimestamp: {
      type: Object as PropType<DateTime | null>,
      required: false,
      default: null,
    },
    /**
     * The status of the line chart
     * @type {string}
     * @default 'info'
     */
    status: {
      type: String as PropType<ChipStatusTypes>,
      required: false,
      default: ChipStatusTypes.INFO,
    },
    /**
     * Whether the line chart is loading
     * @type {boolean}
     * @default true
     */
    isLoading: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    moduleType: {
      type: String as () => ModuleTypes,
      required: true,
    },
    moduleName: {
      type: String,
      required: true,
    },
  },

  components: {
    BigNumber,
    LineChart,
    ChipComponent,
    LoadingSpinner,
    ButtonComponent,
    CommentsOverlayModal,
    ModalOverlay,
  },
  data() {
    return {
      commentsOpen: false,
      settingsOpen: false,
    };
  },
  computed: {
    ...mapStores(useGeneralStore),

    chartData() {
      // TODO: JUST A SHORT TERM SOLUTION TO SHOW THE CHART A BIT LESS CLUMPED
      // return chart data from store with every second element removed
      const { chartData } = this.generalStore;
      return chartData.filter((_, index) => index % 2 === 0);
    },
    /**
     * @returns The time since the last update in minutes
     */
    lastUpdateTime(): number | string {
      if (this.lastUpdateTimestamp) {
        return Math.round(
          Interval.fromDateTimes(this.lastUpdateTimestamp, DateTime.now()).length('minutes'),
        );
      }
      return '-';
    },

    /**
     * @returns Whether the KPI context exists.
     */
    hasContext(): boolean {
      return !!this.kpi?.data?.context?.de;
    },

    /**
     * @returns The primary KPI value if available.
     */
    primaryKpiValue(): number | undefined {
      return this.kpi?.data?.value?.presentValue
        ? Number(this.kpi.data.value.presentValue)
        : undefined;
    },

    /**
     * @returns The unit for the primary KPI value.
     */
    primaryKpiValueUnit(): string {
      return this.kpi?.data?.value?.physicalUnit || '-';
    },

    /**
     * @returns The secondary KPI value if available.
     */
    secondaryKpiValue(): number | undefined {
      // @TODO: update logic when data is available
      return undefined;
    },

    /**
     * @returns The secondary KPI value unit if available.
     */
    secondaryKpiValueUnit(): string {
      // @TODO: update logic when data is available
      return '-';
    },
  },
  methods: {
    /**
     * Toggles the comments modal.
     * @returns void
     */
    toggleComments(): void {
      this.commentsOpen = !this.commentsOpen;
    },
    /**
     * Toggles the settings modal.
     * @returns void
     */
    toggleSettings(): void {
      this.settingsOpen = !this.settingsOpen;
    },
  },
  setup() {
    return {
      IconTypes,
    };
  },
};
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.line-chart-container {
  width: 100%;
  background-color: $lightest;
  border-radius: $border-radius;
  padding: $m;

  & .loading {
    grid-column: 1 / -1;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &--header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--buttons {
      display: flex;
      gap: $xxs;
    }
  }

  &--content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: $m;
    &--left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 300px;

      &--values {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 150px;
      }

      &--footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        & > p {
          @include meta-information;
        }
      }
    }
  }

  &--right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.last-update {
  @include meta-information;
}

h3 {
  @include section-headline;
}

h4 {
  @include content;
}
</style>
