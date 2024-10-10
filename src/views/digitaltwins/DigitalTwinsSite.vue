<template>
  <DigitalTwinLayout>
    <template #left>
      <h1>{{ siteName || 'Loading' }}</h1>
      <BuildingCardLoading v-if="isLoading" />
      <SiteDetails v-else-if="site" :site="site" />
    </template>
    <template #right>
      <h3>Gebäude in der Liegenschaft</h3>
      <div class="digital-twin-site__buildings">
        <BuildingCardLoading v-if="isLoading" />
        <BuildingCard
          v-else
          v-for="(building, idx) in site?.data.buildings"
          :key="idx"
          :building-name="building.data.buildingName"
          :open-building="() => openBuilding(building.id, building.data.buildingName)"
        />
      </div>
    </template>
  </DigitalTwinLayout>
</template>

<script lang="ts">
import DigitalTwinLayout from '@/components/general/digitaltwins/DigitalTwinLayout.vue';
import BuildingCard from '@/components/general/digitaltwins/BuildingCard.vue';
import BuildingCardLoading from '@/components/general/digitaltwins/BuildingCardLoading.vue';
import SiteDetails from '@/components/general/digitaltwins/SiteDetails.vue';

import { useGeneralStore } from '@/store/general';
import type { SiteWithBuildinginformation } from '@/types/global/site/Site';
import { mapStores } from 'pinia';

export default {
  components: {
    DigitalTwinLayout,
    BuildingCard,
    BuildingCardLoading,
    SiteDetails,
  },
  data() {
    return {
      siteName: '',
      street: '',
      zipCode: '',
      city: '',
      country: '',
    };
  },
  created() {
    this.siteName = JSON.parse(this.$route.params.siteparams as string).siteName;
  },
  computed: {
    ...mapStores(useGeneralStore),

    site(): SiteWithBuildinginformation | null {
      return this.generalStore.siteState.site;
    },

    isLoading(): boolean {
      return this.generalStore.siteState.isLoading;
    },
  },
  methods: {
    openBuilding(buildingid: string, buildingName: string) {
      if (!this.site) {
        return;
      }

      const siteid = this.site.id;
      const { siteName } = this.site.data;

      this.$router.push({
        name: 'DigitalTwins_Site_Building',
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
  watch: {
    site: {
      handler() {
        if (this.site?.data.address) {
          this.street = this.site.data.address.street;
          this.zipCode = this.site.data.address.zipcode;
          this.city = this.site.data.address.cityTown;
          this.country = this.site.data.address.nationalCode;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss">
.digital-twin-site {
  &__buildings {
    display: grid;
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    flex-wrap: wrap;
    gap: $s;
  }
}

h1 {
  @include content-headline;
}

h2, h3 {
  @include content-headline;
  color: $dark-green;
}

p,
label {
  @include content;
}
</style>
