<template>
  <BaseLayout :show-sidebar="false">
    <template #left>
      <h2>
        {{ siteName }}
      </h2>
      <LoadingCards v-if="isLoading" :card-count="1" card-class="image-loading" />
      <img
        v-else
        :alt="site?.data.siteName || 'Site Name'"
        :src="site?.data.imageDataUrl || SymbolImageHelper.getImage('default', 'default')"
        :onerror="useFallbackImage"
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
        <p v-else-if="site?.data.buildings?.length === 0">
          <NoBuildingsMessage />
        </p>
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
    </template>
    <template #right>
      <div class="performance-header">
        <h3>Performance der Liegenschaft</h3>
        <TimeRangeDropdown />
      </div>
      <LoadingCards v-if="isLoading || kpiIsLoading" :card-count="3" :grow-cards="true" />
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
    </template>
  </BaseLayout>
</template>
<script lang="ts">
// Libraries
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { useGeneralStore } from '@/store/general';
import { useSiteStore } from '@/store/site';
import { mapStores } from 'pinia';
import type { DateTime } from 'luxon';

// Helpers
import Base64Helper from '@/helpers/Base64Helper';
import SymbolImageHelper from '@/helpers/SymbolImageHelper';

// Components
import StatusCard from '@/components/general/StatusCard.vue';
import ChartContainer from '@/components/monitoring/ChartContainer.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import TimeRangeDropdown from '@/components/general/inputs/TimeRangeDropdown.vue';
import AlertElement from '@/components/general/AlertElement.vue';
import BaseLayout from '@/components/general/BaseLayout.vue';
import NoBuildingsMessage from '@/components/digitaltwins/NoBuildingsMessage.vue';

// Types
import { ActionTypes } from '@/types/enums/ActionTypes';
import { type SiteWithBuildinginformationAndDataurl } from '@/types/local/Site';
import { ModuleTypes } from '@/types/enums/ModuleTypes';
import { AlertMessages } from '@/assets/json/AlertMessages';
import type { TimelineLookbackOptions } from '@/configs/timeRangeDropdown';

export default {
  components: {
    StatusCard,
    ChartContainer,
    LoadingCards,
    TimeRangeDropdown,
    AlertElement,
    BaseLayout,
    NoBuildingsMessage,
  },

  setup() {
    return {
      ChipStatusTypes,
      ActionTypes,
      ModuleTypes,
      AlertMessages,
      SymbolImageHelper,
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

    site(): SiteWithBuildinginformationAndDataurl | null {
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

    kpiLookbackStartTimestamp(): TimelineLookbackOptions {
      return this.generalStore.kpiLookbackWindow.currentValue;
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
    this.siteId = Base64Helper.decode(JSON.parse(this.$route.params.siteparams as string).siteid);
  },

  methods: {
    openBuilding(siteid: string, siteName: string, buildingid: string, buildingName: string) {
      this.$router.push({
        name: 'Monitoring_Site_Building',
        params: {
          buildingparams: JSON.stringify({
            siteid: Base64Helper.encode(siteid),
            siteName,
            buildingid: Base64Helper.encode(buildingid),
            buildingName,
          }),
        },
      });
    },
    useFallbackImage(event: Event) {
      const target = event.target as HTMLImageElement;
      target.src = SymbolImageHelper.getImage('default', 'default');
    },
  },
};
</script>

<style scoped lang="scss">
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
}

:deep(.image-loading) {
  height: 300px;
}
</style>
