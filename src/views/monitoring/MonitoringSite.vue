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
        <!-- @TODO: create dropdown component -->
        <div class="dropdown">Letzte 14 Tage</div>
      </div>
      <LoadingCards v-if="kpiIsLoading" :card-count="3" :grow-cards="true" />
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
import { mapStores } from 'pinia';
import type { DateTime } from 'luxon';

// Components
import StatusCard from '@/components/general/StatusCard.vue';
import ChartContainer from '@/components/monitoring/ChartContainer.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';

// Types
import { ActionTypes } from '@/types/enums/ActionTypes';
import type { SiteWithBuildinginformation } from '@/types/global/site/Site';
import { ModuleTypes } from '@/types/enums/ModuleTypes';

export default {
  components: {
    StatusCard,
    ChartContainer,
    LoadingCards,
  },

  setup() {
    return {
      ChipStatusTypes,
      ActionTypes,
      ModuleTypes,
    };
  },

  data() {
    return {
      siteName: '',
    };
  },

  computed: {
    ...mapStores(useGeneralStore),

    site(): SiteWithBuildinginformation | null {
      return this.generalStore.siteState.site;
    },

    kpis() {
      return this.generalStore.siteState.kpiState.kpis;
    },

    lastSiteRequestTime(): DateTime | null {
      return this.generalStore.siteState.requestTimestamp;
    },

    statusCardAmount(): number {
      return this.site?.data?.buildings?.length || 3;
    },

    isLoading(): boolean {
      return this.generalStore.siteState.isLoading;
    },

    kpiIsLoading(): boolean {
      return this.generalStore.siteState.kpiState.isLoading;
    },

    kpiAmount(): number {
      return this.kpis.length ? this.kpis.length : 3;
    },
  },

  created() {
    this.siteName = JSON.parse(this.$route.params.siteparams as string).siteName;
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
