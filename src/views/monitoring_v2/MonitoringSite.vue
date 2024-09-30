<template>
  <div class="grid-wrapper">
    <div>
      <h2>
        {{ siteName }}
      </h2>
      <template v-if="isLoading">
        <div class="image-loading">
          <LoadingSpinner />
        </div>
      </template>
      <img
        v-else
        :alt="site?.data.SiteName || 'Site Name'"
        src="@/assets/gebäude_deutz.png"
        class="site-image"
      />

      <div class="status-container">
        <h3 class="status-headline">Gebäude in der Liegenschaft</h3>
        <template v-if="isLoading">
          <div class="status-container--loading">
            <StatusCard
              v-for="index in 3"
              :key="index"
              :isLoading="true"
            />
          </div>
        </template>
        <div v-else class="status-container-wrapper">
          <StatusCard
            v-for="(building, idx) in site?.data.Buildings"
            @click="
              if (site) {
                openBuilding(site.id, site.data.SiteName, building.id, building.data.BuildingName);
              }
            "
            :key="idx"
            :title="building.data.BuildingName"
            subtitle="@TODO: Get subtitle"
            :status="ChipStatusTypes.SUCCESS"
            :isBordered="false"
            :actionType="ActionTypes.ARROW"
            :isLoading="isLoading"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="performance-header">
        <h3>Performance der Liegenschaft</h3>
        <!-- @TODO: create dropdown component -->
        <div class="dropdown">
          Letzte 14 Tage
        </div>
      </div>
      <div v-if="kpiIsLoading || !kpis.length" class="performance-grid--loading">
        <LineChart_v2 v-for="index in kpiAmount" :key="index" />
      </div>
      <div class="performance-grid" v-else>
        <LineChart_v2
          v-for="(kpi, idx) in kpis"
          :key="idx"
          :kpi="kpi"
          :lastUpdateTimestamp="lastSiteRequestTime"
          :isLoading="isLoading"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// Libraries
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { useGeneralStoreV2 } from '@/store/general_v2';
import { mapStores } from 'pinia';
import type { DateTime } from 'luxon';

// Components
import StatusCard from '@/components/general/StatusCard.vue';
import LineChart_v2 from '@/components/monitoring/LineChart_v2.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

// Types
import { ActionTypes } from '@/types/enums/ActionTypes';
import type { SiteWithBuildinginformation } from '@/types/Site';

export default {
  components: {
    StatusCard,
    LineChart_v2,
    LoadingSpinner,
  },

  setup() {
    return {
      ChipStatusTypes,
      ActionTypes,
    };
  },

  data() {
    return {
      siteName: '',
    };
  },

  computed: {
    ...mapStores(useGeneralStoreV2),

    site(): SiteWithBuildinginformation | null {
      return this.general_v2Store.siteState.site;
    },

    kpis() {
      return this.general_v2Store.siteState.kpiState.kpis;
    },

    lastSiteRequestTime(): DateTime | null {
      return this.general_v2Store.siteState.requestTimestamp;
    },

    statusCardAmount(): number {
      return this.site?.data?.Buildings?.length || 3;
    },

    isLoading(): boolean {
      return this.general_v2Store.siteState.isLoading;
    },

    kpiIsLoading(): boolean {
      return this.general_v2Store.siteState.kpiState.isLoading;
    },

    kpiAmount(): number {
      return this.kpis.length ? this.kpis.length : 3;
    },
  },

  created() {
    this.general_v2Store.loadSiteInformation(
      JSON.parse(this.$route.params.siteparams as string).siteid,
    );
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
}

.image-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  background-color: $lightest;
  border-radius: $base-size;
}

.site-image {
  width: 100%;
  height: auto;
  border-radius: $border-radius;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.status-container {
  margin-top: $s;

  & > h3 {
    @include content-subtitle;
    color: $darkest;
  }

  &--loading {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    @for $i from 1 through 3 {
      & > div:nth-child(#{$i}) {
        // from 99% to 66% to 33% opacity
        opacity: 1 - (($i - 1) * 0.33);
      }
    }
  }
}

h2,
h3 {
  @include content-headline;
  margin-bottom: $s;
}

.performance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .dropdown {
    @include content;
    cursor: pointer;
    border: 1px solid $light-purple;
    padding: $base-size;
    border-radius: $border-radius;
  }
}

.performance-grid--loading {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: $m;
  @for $i from 1 through 3 {
    & > div:nth-child(#{$i}) {
      // from 99% to 66% to 33% opacity
      opacity: 1 - (($i - 1) * 0.33);
    }
  }
}
</style>
