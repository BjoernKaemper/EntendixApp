<template>
  <div class="grid-wrapper" v-if="site">
    <div>
      <h2>
        {{ siteName }}
      </h2>
      <img
        :alt="site?.data.SiteName || 'Site Name'"
        src="@/assets/gebäude_deutz.png"
        class="site-image"
      />

      <div class="status-container">
        <h3 class="status-headline">Gebäude in der Liegenschaft</h3>
        <StatusCard
          v-for="(building, idx) in site?.data.Buildings"
          @click="
            openBuilding(site.id, site.data.SiteName, building.id, building.data.BuildingName)
          "
          :key="idx"
          :title="building.data.BuildingName"
          subtitle="@TODO: Get subtitle"
          :status="StatusTypes.SUCCESS"
          :isBordered="false"
          :actionType="ActionTypes.ARROW"
        />
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
      <div class="performance-grid">
        <LineChart_v2
          v-for="(kpi, idx) in kpis"
          :key="idx"
          :kpi="kpi"
          :lastUpdateTimestamp="lastSiteRequestTime"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <!-- @TODO: Implement loading logic base on store and components -->
    <p>Loading...</p>
  </div>
</template>
<script lang="ts">
// Libraries
import { useGeneralStoreV2 } from '@/store/general_v2';
import { mapStores } from 'pinia';
import type { DateTime } from 'luxon';

// Components
import StatusCard from '@/components/general/StatusCard.vue';
import LineChart_v2 from '@/components/monitoring/LineChart_v2.vue';

// Types
import { StatusTypes } from '@/types/enums/StatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import type { SiteWithBuildinginformation } from '@/types/Site';

export default {
  components: {
    StatusCard,
    LineChart_v2,
  },

  setup() {
    return {
      StatusTypes,
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
      return this.general_v2Store.currentSite;
    },

    kpis() {
      return this.general_v2Store.currentKPIs;
    },

    lastSiteRequestTime(): DateTime | null {
      return this.general_v2Store.lastSiteRequestTimestamp;
    },
  },

  created() {
    this.general_v2Store.loadSiteInformation(
      JSON.parse(this.$route.params.siteparams as string).siteid,
    );
    this.siteName = JSON.parse(this.$route.params.siteparams as string).siteName;
    this.general_v2Store.loadKpiInformation(
      JSON.parse(this.$route.params.siteparams as string).siteid,
    );
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

.site-image {
  width: 100%;
  height: auto;
  border-radius: $base-size;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.status-container {
  margin-top: $s;

  & > h3 {
    @include content-subtitle;
    color: $darkest;
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
    border-radius: $base-size;
  }
}
</style>
