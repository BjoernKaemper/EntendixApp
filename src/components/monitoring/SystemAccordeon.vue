<template>
  <AccordionBase>
    <template #heading>
      <h4>{{ title }}</h4>
      <ChipComponent :status="condition" :is-mini="true" />
    </template>
    <template #content>
      <div class="chart-container">
        <div class="chart-container--header">
          <TimeRangeDropdown />
        </div>
        <LineChart :data="kpi.timeline ? kpi.timeline : []" />
      </div>
      <InfoCard :info="kpi.data.context.de" :showButton="false" />
      <div class="subgrid">
        <div class="subgrid--left">
          <div class="subgrid--left--header">
            <h4>Aktueller Tageswert</h4>
            <ChipComponent :isMini="true" :status="ChipStatusTypes.SUCCESS" />
          </div>
          <BigNumber :number="kpi.data.value.presentValue" :unit="kpi.data.value.physicalUnit" />
          <CommentsContainer :comments="kpi.data.annotations" />
        </div>
        <div class="subgrid--right">
          <ImprovementsContainer />
        </div>
      </div>
      <slot name="content" />
    </template>
  </AccordionBase>
</template>

<script lang="ts">
import { type PropType } from 'vue';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { usePlantStore } from '@/store/plant';
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';
import type { TimelineLookbackOptions } from '@/configs/timeRangeDropdown';

import LineChart from '@/components/general/charts/LineChart.vue';
import BigNumber from '@/components/general/BigNumber.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';
import ImprovementsContainer from '@/components/monitoring/ImprovementsContainer.vue';
import InfoCard from '@/components/general/InfoCard.vue';
import CommentsContainer from '@/components/general/comments/CommentsContainer.vue';
import TimeRangeDropdown from '@/components/general/inputs/TimeRangeDropdown.vue';
import AccordionBase from '@/components/general/AccordionBase.vue';

export default {
  components: {
    ChipComponent,
    LineChart,
    BigNumber,
    CommentsContainer,
    ImprovementsContainer,
    InfoCard,
    TimeRangeDropdown,
    AccordionBase,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    /**
     * The title of the accordeon
     * @type {String}
     * @required
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * The condition of the accordeon
     * @type {ChipStatusTypes}
     * @required
     */
    condition: {
      type: String as PropType<ChipStatusTypes>,
      required: true,
    },
    /**
     * The kpi object which contains the data for the accordeon
     * @type {Object}
     * @required
     */
    kpi: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapStores(usePlantStore, useGeneralStore),
    kpiLookbackStartTimestamp(): TimelineLookbackOptions {
      return this.generalStore.kpiLookbackWindow.currentValue;
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
  watch: {
    kpiLookbackStartTimestamp() {
      this.plantStore.fetchKpiChartData();
    },
  },

  setup() {
    return {
      comments: [],
      improvements: [],
      ChipStatusTypes,
    };
  },
};
</script>
<style scoped lang="scss">
.chart-container {
  display: flex;
  flex-direction: column;
  gap: $xxs;
  &--header {
    display: flex;
    justify-content: flex-end;
  }
}

.subgrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $m;

  &--left {
    display: flex;
    flex-direction: column;
    gap: $xxs;

    &--header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: $m;
    }

    &--comments {
      display: flex;
      flex-direction: column;
      gap: $xxs;
    }

    &--fetchmore {
      @include meta-information;
      cursor: pointer;
      text-align: center;
    }

    button {
      margin-left: auto;
    }
  }

  &--right {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }
}

.big-number {
  justify-content: center;
}
ul {
  padding: $m;
}

p,
li {
  @include content;
}
</style>
