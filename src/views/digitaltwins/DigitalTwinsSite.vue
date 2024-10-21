<template>
  <DigitalTwinLayout>
    <template #left>
      <h1>{{ siteName || 'Loading' }}</h1>
      <div v-if="isLoading" class="digital-twin-site__site-loading">
        <LoadingCards :cardCount="1" cardClass="digital-twin-site__image-loading" size="large" />
        <h3>Informationen über die Liegenschaft</h3>
        <LoadingSpinner />
      </div>
      <SiteDetails v-else-if="site" :site="site" />
    </template>
    <template #right>
      <div class="digital-twin-site__head">
        <h2>Gebäude in der Liegenschaft</h2>
        <ButtonComponent :icon="IconTypes.ADD" state="tertiary" text="Neues Gebäude" @click="addBuildingModalIsOpen = true" />
      </div>
      <div v-if="isLoading" class="digital-twin-site__buildings-loading">
        <LoadingSpinner size="large" />
      </div>
      <div v-else class="digital-twin-site__buildings">
        <BuildingCard
          v-for="(building, idx) in site?.data.buildings"
          :key="idx"
          :building-name="building.data.buildingName"
          :open-building="() => openBuilding(building.id, building.data.buildingName)"
        />
      </div>
    </template>
  </DigitalTwinLayout>
  <AddBuildingModal v-model="addBuildingModalIsOpen" />
</template>

<script lang="ts">
// Store imports
import { useSiteStore } from '@/store/site';
import { mapStores } from 'pinia';

// Component imports
import DigitalTwinLayout from '@/components/general/digitaltwins/DigitalTwinLayout.vue';
import BuildingCard from '@/components/general/digitaltwins/BuildingCard.vue';
import SiteDetails from '@/components/general/digitaltwins/SiteDetails.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import AddBuildingModal from '@/components/general/digitaltwins/AddBuildingModal.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

// Type imports
import type { SiteWithBuildinginformation } from '@/types/global/site/Site';
import { IconTypes } from '@/types/enums/IconTypes';

export default {
  components: {
    DigitalTwinLayout,
    BuildingCard,
    SiteDetails,
    ButtonComponent,
    AddBuildingModal,
    LoadingCards,
    LoadingSpinner,
  },
  data() {
    return {
      siteName: '',
      street: '',
      zipCode: '',
      city: '',
      country: '',
      IconTypes,
      addBuildingModalIsOpen: false,
    };
  },
  created() {
    this.siteName = JSON.parse(this.$route.params.siteparams as string).siteName;
  },
  computed: {
    ...mapStores(useSiteStore),

    site(): SiteWithBuildinginformation | null {
      return this.siteStore.site;
    },

    isLoading(): boolean {
      return this.siteStore.isLoading;
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

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__site-loading {
    display: flex;
    flex-direction: column;
    gap: $s;
  }

  &__buildings-loading {
    padding: $xxl $m;
  }
}

:deep(.digital-twin-site__image-loading) {
  aspect-ratio: 3 / 2;
  height: 100%;
}

h1 {
  @include content-headline;
}

h2 {
  @include content-headline;
  color: $dark-green;
}

h3 {
  @include content-subtitle;
}

p,
label {
  @include content;
}
</style>
