<template>
  <div class="grid-wrapper">
    <div class="grid-wrapper--left">
      <h2>
        {{ siteName }}
      </h2>
      <LoadingCards v-if="isLoading" :card-count="1" card-class="image-loading" />
      <img
        v-else
        :alt="site?.data.siteName || 'Site Name'"
        src="@/assets/3_campus_deutz_iwz_sharon_nathan_th_koeln.png"
        class="site-image"
      />

      <div class="status-container">
        <h3 class="status-headline">Gebäude in der Liegenschaft</h3>
        <LoadingCards v-if="isLoading" :card-count="3" />
        <AlertElement
          v-else-if="buildingLoadingError"
          :alert="AlertMessages.CANNOT_LOAD"
          :is-toast="false"
        />
        <StatusCard
          v-else
          v-for="(building, idx) in site?.data.buildings"
          @click="
            if (site) {
              openBuilding(site.id, site.data.siteName, building.id, building.data.buildingName);
            }
          "
          :key="idx"
          :title="building.data.buildingName"
          :status="ChipStatusTypes.SUCCESS"
          :isBordered="false"
          :actionType="ActionTypes.ARROW"
          :isLoading="isLoading"
        />
      </div>
    </div>
    <div class="grid-wrapper--right">
      <div class="performance-header">
        <h3>Performance der Liegenschaft</h3>
        <TimeRangeDropdown />
      </div>
      <LoadingCards v-if="kpiIsLoading" :card-count="3" :grow-cards="true" />
      <AlertElement
        v-else-if="kpiLoadingError"
        :alert="AlertMessages.CANNOT_LOAD"
        :is-toast="false"
      />
      <div v-else class="performance-grid">
        <ChartContainer
          v-for="(kpi, idx) in kpis"
          :key="idx"
          :kpi="kpi"
          :lastUpdateTimestamp="lastSiteRequestTime"
          :isLoading="isLoading"
          :moduleType="ModuleTypes.SITE"
          :moduleName="siteName"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// Libraries
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { useGeneralStore } from '@/store/general';
import { useSiteStore } from '@/store/site';
import { mapStores } from 'pinia';
import type { DateTime } from 'luxon';

// Components
import StatusCard from '@/components/general/StatusCard.vue';
import ChartContainer from '@/components/monitoring/ChartContainer.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import TimeRangeDropdown from '@/components/general/inputs/TimeRangeDropdown.vue';
import AlertElement from '@/components/general/AlertElement.vue';

// Types
import { ActionTypes } from '@/types/enums/ActionTypes';
import type { SiteWithBuildinginformation } from '@/types/global/site/Site';
import { ModuleTypes } from '@/types/enums/ModuleTypes';
import type { TimelineLookbackOptions } from '@/types/enums/TimelineLookbackOptions';
import { AlertMessages } from '@/assets/json/AlertMessages';

export default {
  components: {
    StatusCard,
    ChartContainer,
    LoadingCards,
    TimeRangeDropdown,
    AlertElement,
  },

  setup() {
    return {
      ChipStatusTypes,
      ActionTypes,
      ModuleTypes,
      AlertMessages,
    };
  },

  data() {
    return {
      siteName: '',
      siteId: '',
    };
  },

  computed: {
    ...mapStores(useGeneralStore, useSiteStore),

    site(): SiteWithBuildinginformation | null {
      return this.siteStore.site;
    },

    kpis() {
      return this.siteStore.kpiState.kpis;
    },

    lastSiteRequestTime(): DateTime | null {
      return this.siteStore.requestTimestamp;
    },

    statusCardAmount(): number {
      return this.site?.data?.buildings?.length || 3;
    },

    isLoading(): boolean {
      return this.siteStore.isLoading;
    },

    kpiIsLoading(): boolean {
      return this.siteStore.kpiState.isLoading;
    },

    kpiAmount(): number {
      return this.kpis.length ? this.kpis.length : 3;
    },

    kpiLookbackStartTimestamp(): keyof typeof TimelineLookbackOptions {
      return this.generalStore.kpiLookbackStartTimestamp;
    },

    buildingLoadingError(): boolean {
      return this.siteStore.error;
    },

    kpiLoadingError(): boolean {
      return this.siteStore.kpiState.error;
    },
  },

  watch: {
    kpiLookbackStartTimestamp() {
      this.siteStore.fetchKpiChartData();
    },
  },

  created() {
    this.siteName = JSON.parse(this.$route.params.siteparams as string).siteName;
    this.siteId = decodeURIComponent(JSON.parse(this.$route.params.siteparams as string).siteid);
  },

  methods: {
    openBuilding(siteid: string, siteName: string, buildingid: string, buildingName: string) {
      this.$router.push({
        name: 'Monitoring_Site_Building',
        params: {
          buildingparams: JSON.stringify({
            siteid: encodeURIComponent(siteid),
            siteName,
            buildingid: encodeURIComponent(buildingid),
            buildingName,
          }),
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: $m;

  &--left,
  &--right {
    display: flex;
    flex-direction: column;
    gap: $s;
  }
}

.site-image {
  width: 100%;
  height: auto;
  border-radius: $border-radius;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.status-container {
  display: flex;
  flex-direction: column;
  gap: $xxs;

  & > h3 {
    @include content-subtitle;
    color: $darkest;
  }
}

h2,
h3 {
  @include content-headline;
}

.performance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .dropdown {
    @include content;
    cursor: pointer;
    border: 1px solid $light-purple;
    margin: 0;
    padding: 0 $xxs;
    border-radius: $border-radius;
  }
}

:deep(.image-loading) {
  height: 300px;
}
</style>
