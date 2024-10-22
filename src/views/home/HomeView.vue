<template>
  <div>
    <div class="grid-wrapper">
      <GoogleMaps :sites="sites" />
      <div>
        <div class="site-header">
          <h2>Meine Liegenschaften</h2>
          <ButtonComponent
            text="Liegenschaft hinzufügen"
            :icon="IconTypes.ADD"
            class="add-site-button"
            @click="toggleAddSiteModal"
          />
        </div>
        <LoadingCards v-if="sitesAreLoading" :card-count="3" :grow-cards="false" />
        <template v-else>
          <LiegenschaftCard
            v-for="site in sites"
            :key="site.id"
            :name="site.data.siteName"
            :imgsrc="placeholderCampusDeutz"
            :status="ChipStatusTypes.SUCCESS"
            :location="site.data.address.cityTown"
            @digitalTwinClicked="loadTwin(site)"
            @monitoringClicked="loadSite(site)"
            :isLoading="sitesAreLoading"
          />
        </template>
      </div>
    </div>
    <AddSiteOverlayModal :isAddSiteModalOpen="addSiteModalOpen" @close="toggleAddSiteModal" />
  </div>
</template>

<script lang="ts">
// Modules and Libraries
import { mapStores } from 'pinia';

// Stores
import { useGeneralStore } from '@/store/general';
import placeholderCampusDeutz from '@/assets/placeholder-campus-deutz.png';

// Types
import type { Site } from '@/types/global/site/Site';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { IconTypes } from '@/types/enums/IconTypes';

// Components
import GoogleMaps from '@/components/general/GoogleMaps.vue';
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import AddSiteOverlayModal from '@/components/general/modals/AddSiteOverlayModal.vue';

export default {
  components: {
    GoogleMaps,
    LiegenschaftCard,
    LoadingCards,
    ButtonComponent,
    AddSiteOverlayModal,
  },
  data() {
    return {
      addSiteModalOpen: false,
      placeholderCampusDeutz,
    };
  },

  computed: {
    ...mapStores(useGeneralStore),

    sites(): Array<Site> {
      return this.generalStore.baseInfoState.sites;
    },

    sitesAreLoading(): boolean {
      return this.generalStore.baseInfoState.isLoading;
    },
  },

  methods: {
    /**
     * Navigates to the digital twin page
     * @param {Site} site Object of the site to navigate to
     */
    loadTwin(site: Site): void {
      this.$router.push({
        name: 'DigitalTwins',
        params: {
          siteparams: JSON.stringify({
            siteid: encodeURIComponent(site.id),
            siteName: site.data.siteName,
          }),
        },
      });
    },
    /**
     * Navigates to the site page
     * @param {Site} site Object of the site to navigate to
     */
    loadSite(site: Site): void {
      this.$router.push({
        name: 'Monitoring_Site',
        params: {
          siteparams: JSON.stringify({
            siteid: encodeURIComponent(site.id),
            siteName: site.data.siteName,
          }),
        },
      });
    },
    toggleAddSiteModal(): void {
      this.addSiteModalOpen = !this.addSiteModalOpen;
    },
  },

  setup() {
    return {
      ChipStatusTypes,
      IconTypes,
    };
  },
};
</script>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $m;
}
.site-header {
  margin-bottom: $xl;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h2 {
    @include content-headline;
    color: $dark-green;
  }
  > .subtitle {
    @include content-subtitle;
  }
  > .add-site-button {
    background-color: $lightest;
  }
}
</style>
