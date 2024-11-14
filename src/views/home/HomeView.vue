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
            @close="toggleAddSiteModal"
            @click="toggleAddSiteModal"
            :disabled="sitesAreLoading"
          />
        </div>
        <LoadingCards v-if="sitesAreLoading" :card-count="3" :grow-cards="false" />
        <AlertElement
          v-else-if="generalStore.baseInfoState.error"
          :alert="AlertMessages.CANNOT_LOAD"
          :is-toast="false"
        />
        <template v-else>
          <LiegenschaftCard
            v-for="site in sites"
            :key="site.id"
            :name="site.data.siteName"
            :imgsrc="site.data.imageDataUrl || SymbolImageHelper.getImage('default', 'default')"
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
// Library imports
import { mapStores } from 'pinia';

// Store imports
import { useGeneralStore } from '@/store/general';

// Component imports
import GoogleMaps from '@/components/general/GoogleMaps.vue';
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import AddSiteOverlayModal from '@/components/general/modals/AddSiteOverlayModal.vue';
import AlertElement from '@/components/general/AlertElement.vue';

// Type imports
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import type { Site } from '@/types/global/site/Site';
import { IconTypes } from '@/types/enums/IconTypes';
import type { SiteWithDataurl } from '@/types/local/Site';

// Helper imports
import Base64Helper from '@/helpers/Base64Helper';
import SymbolImageHelper from '@/helpers/SymbolImageHelper';
import { AlertMessages } from '@/assets/json/AlertMessages';

export default {
  components: {
    GoogleMaps,
    LiegenschaftCard,
    LoadingCards,
    ButtonComponent,
    AddSiteOverlayModal,
    AlertElement,
  },
  data() {
    return {
      addSiteModalOpen: false,
    };
  },

  computed: {
    ...mapStores(useGeneralStore),

    sites(): Array<SiteWithDataurl> {
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
        name: 'DigitalTwins_Site',
        params: {
          siteparams: JSON.stringify({
            siteid: Base64Helper.encode(site.id),
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
            siteid: Base64Helper.encode(site.id),
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
      SymbolImageHelper,
      AlertMessages,
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
