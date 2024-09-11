<template>
  <div class="grid-wrapper">
    <div>
      <h2>
        {{ site.siteName }}
      </h2>
      <img src="@/assets/gebäude_deutz.png" class="site-image" />
      <StatusCard
        v-for="(building, idx) in site.buildings"
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
        :title="Object.values(building)[0].buildingName"
        subtitle="Some description"
        :status="StatusTypes.SUCCESS"
        :isBordered="false"
      />
    </div>
    <div>
      <h3>Performance der Liegenschaft</h3>
    </div>
  </div>
</template>
<script lang="ts">
import StatusCard from '@/components/general/StatusCard.vue'
import { StatusTypes } from '@/types/enums/StatusTypes'
import { useGeneralStore } from '@/store/general'
import { mapStores } from 'pinia'

export default {
  components: {
    StatusCard
  },
  computed: {
    ...mapStores(useGeneralStore),
    site_id(): string {
      return this.$route.params.siteid
    },
    site(): any {
      return (
        this.generalStore.loadedSiteInformationWithBuildings.find((site) => {
          return site.siteName === this.site_id
        }) || {}
      )
    }
  },
  setup() {
    return {
      StatusTypes
    }
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
}

h2,
h3 {
  @include content-headline;
  color: $dark-green;
  margin-bottom: $s;
}
</style>
