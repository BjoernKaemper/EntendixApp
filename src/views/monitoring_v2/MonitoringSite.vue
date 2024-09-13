<template>
  <div class="grid-wrapper" v-if="site">
    <div>
      <h2>
        {{ site?.data.SiteName }}
      </h2>
      <img src="@/assets/gebäude_deutz.png" class="site-image" />

      <div class="status-container">
        <StatusCard
          v-for="(building, idx) in site?.data.Buildings"
          @click="
            this.$router.push({
              name: 'Monitoring_Site_Building',
              params: {
                siteid: $route.params.siteid,
                buildingid: Object.values(building)[0].buildingName,
                buildingaasid: Object.keys(building)[0]
              }
            })
          "
          :key="idx"
          :title="building.data.BuildingName"
          subtitle="@TODO: Get subtitle"
          :status="StatusTypes.SUCCESS"
          :isBordered="false"
        />
      </div>
    </div>
    <div>
      <h3>Performance der Liegenschaft</h3>
      <LineChart_v2 topic="Nutzungskomfort" />
    </div>
  </div>
  <div v-else>
    <!-- @TODO: Implement loading logic base on store and components -->
    <p>Loading...</p>
  </div>
</template>
<script lang="ts">
import StatusCard from '@/components/general/StatusCard.vue'
import LineChart_v2 from '@/components/monitoring/LineChart_v2.vue'
import { StatusTypes } from '@/types/enums/StatusTypes'
import { ActionTypes } from '@/types/enums/ActionTypes'
import { useGeneralStore_v2 } from '@/store/general_v2'
import { mapStores } from 'pinia'
import type { SiteWithBuildinginformation } from '@/types/Site'

export default {
  components: {
    StatusCard,
    LineChart_v2
  },

  setup() {
    return {
      StatusTypes,
      ActionTypes
    }
  },

  computed: {
    ...mapStores(useGeneralStore_v2),
    site_id(): string {
      return this.$route.params.siteid.toString()
    },
    site(): SiteWithBuildinginformation | null {
      return this.general_v2Store.currentSite;
    }
  },

  created() {
    this.general_v2Store.loadSiteInformation(this.site_id);
  }
}
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
  margin-top: $m;
}

h2,
h3 {
  @include content-headline;
  color: $dark-green;
  margin-bottom: $s;
}
</style>
