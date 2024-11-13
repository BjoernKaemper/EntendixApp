<template>
  <BaseLayout>
    <template #left>
      <h1>{{ siteName || 'Loading' }}</h1>
      <div v-if="isLoading" class="digital-twin-site__site-loading">
        <LoadingCards :cardCount="1" cardClass="digital-twin-site__image-loading" size="large" />
        <h3>Informationen über die Liegenschaft</h3>
        <LoadingSpinner />
      </div>
      <AlertElement v-else-if="hasError" :alert="AlertMessages.CANNOT_LOAD" :is-toast="false" />
      <SiteDetails v-else-if="site" :site="site" />
    </template>
    <template #right>
      <div class="digital-twin-site__head">
        <h2>Gebäude in der Liegenschaft</h2>
        <ButtonComponent
          :icon="IconTypes.ADD"
          state="secondary"
          text="Neues Gebäude"
          @click="addBuildingModalIsOpen = true"
        />
      </div>
      <div v-if="isLoading" class="digital-twin-site__buildings-loading">
        <LoadingSpinner size="large" />
      </div>
      <AlertElement v-else-if="hasError" :alert="AlertMessages.CANNOT_LOAD" :is-toast="false" />
      <div v-else-if="site?.data.buildings?.length" class="digital-twin-site__buildings">
        <BuildingCard
          v-for="(building, idx) in site?.data.buildings"
          :key="idx"
          :building-name="building.data.buildingName"
          :open-building="() => openBuilding(building.id, building.data.buildingName)"
        />
      </div>
      <div v-else class="digital-twin-site__no-buildings">
        <NoBuildingsMessage />
      </div>
    </template>
  </BaseLayout>
  <AddBuildingModal v-model="addBuildingModalIsOpen" />
</template>

<script lang="ts">
// Store imports
import { useSiteStore } from '@/store/site';
import { mapStores } from 'pinia';

// Helper imports
import Base64Helper from '@/helpers/Base64Helper';

// Component imports
import BaseLayout from '@/components/general/BaseLayout.vue';
import BuildingCard from '@/components/digitaltwins/BuildingCard.vue';
import SiteDetails from '@/components/digitaltwins/SiteDetails.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import AddBuildingModal from '@/components/digitaltwins/AddBuildingModal.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';
import NoBuildingsMessage from '@/components/digitaltwins/NoBuildingsMessage.vue';
import AlertElement from '@/components/general/AlertElement.vue';

// Type imports
import type { SiteWithBuildinginformation } from '@/types/global/site/Site';
import { IconTypes } from '@/types/enums/IconTypes';

// Data imports
import { AlertMessages } from '@/assets/json/AlertMessages';

export default {
  components: {
    BaseLayout,
    BuildingCard,
    SiteDetails,
    ButtonComponent,
    AddBuildingModal,
    LoadingCards,
    LoadingSpinner,
    NoBuildingsMessage,
    AlertElement,
  },
  data() {
    return {
      siteName: '',
      IconTypes,
      addBuildingModalIsOpen: false,
      AlertMessages,
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

    hasError(): boolean {
      return this.siteStore.error;
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
            siteid: Base64Helper.encode(siteid),
            siteName,
            buildingid: Base64Helper.encode(buildingid),
            buildingName,
          }),
        },
      });
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

  &__no-buildings {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
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
