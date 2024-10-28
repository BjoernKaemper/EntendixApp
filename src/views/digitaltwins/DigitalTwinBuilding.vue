<template>
  <DigitalTwinLayout>
    <template #left>
      <h1>{{ buildingName }}</h1>
      <div v-if="buildingLoading" class="digital-twin-building__loading">
        <LoadingCards
          :cardCount="1"
          cardClass="digital-twin-building__image-loading"
          size="large"
        />
        <h3>Informationen über das Gebäude</h3>
        <LoadingSpinner />
      </div>
      <BuildingDetails
        v-else-if="!buildingLoading && building"
        :buildingName="buildingName"
        :building="building"
      />
    </template>
    <template #right>
      <div class="digital-twin-building__head">
        <h2>Verwaltung des Gebäudes</h2>
        <ButtonComponent
          state="secondary"
          text="Einstellung des Gebäudes"
          icon="manufacturing"
          @click="buildingSettingsOpen = true"
          disabled
          title="Coming soon"
        />
      </div>
      <LoadingSpinner
        v-if="subSectionsLoading"
        size="large"
        class="digital-twin-building__trades-loading"
      />
      <div v-else class="digital-twin-building__trades">
        <TradeCard
          v-for="(trade, idx) in trades"
          :key="idx"
          :icon="trade.icon"
          :name="trade.title"
          :plantTypes="'plantCounter' in trade ? trade.plantCounter : undefined"
          :openTrade="'openTrade' in trade ? trade.openTrade : undefined"
          :isLoading="subSectionsLoading"
        />
      </div>
    </template>
  </DigitalTwinLayout>
  <EditEdgeDeviceModal
    v-model="buildingSettingsOpen"
    :edgeDevices="dummyEdgeDevices"
    :initialValue="initialEdgeDevice"
    canEdit
    @update:edge-device="handleEdgeDeviceChange"
  />
</template>

<script lang="ts">
// TODO: Building details form handling
// TODO: Edge device currently gathering data view
// TODO: No Edge device connected to building view

// Library imports
import { mapStores } from 'pinia';
import Base64Helper from '@/helpers/Base64Helper';

// Store imports
import { useGeneralStore } from '@/store/general';
import { useBuildingStore } from '@/store/building';

// Component imports
import DigitalTwinLayout from '@/components/digitaltwins/DigitalTwinLayout.vue';
import BuildingDetails from '@/components/digitaltwins/BuildingDetails.vue';
import TradeCard from '@/components/digitaltwins/TradeCard.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import EditEdgeDeviceModal from '@/components/digitaltwins/EditEdgeDeviceModal.vue';

// config import
import { tradesConfig } from '@/configs/trades';
import type { DropdownOptionElement } from '@/types/local/DropdownOptions';

// TODO: get actual edge devices
const dummyEdgeDevices: DropdownOptionElement[] = [
  {
    value: '1',
    label: 'Edge Device 1',
  },
  {
    value: '2',
    label: 'Edge Device 2',
  },
  {
    value: '3',
    label: 'Edge Device 3',
  },
];

export default {
  components: {
    DigitalTwinLayout,
    BuildingDetails,
    TradeCard,
    LoadingSpinner,
    LoadingCards,
    ButtonComponent,
    EditEdgeDeviceModal,
  },
  data() {
    return {
      buildingName: '',
      siteName: '',
      siteId: '',
      buildingSettingsOpen: false,
      dummyEdgeDevices,
      initialEdgeDevice:
        dummyEdgeDevices[Math.round(Math.random() * (dummyEdgeDevices.length - 1))].value,
    };
  },
  computed: {
    ...mapStores(useGeneralStore, useBuildingStore),

    building() {
      return this.buildingStore.building;
    },

    subSections() {
      return this.buildingStore.subsectionState.subsections;
    },

    subSectionsLoading() {
      return this.buildingStore.subsectionState.isLoading;
    },

    buildingLoading() {
      return this.buildingStore.isLoading;
    },

    trades() {
      return tradesConfig.map((trade) => {
        const tradeId = this.building?.data.subsections?.find(
          (subsection) => subsection.aasSemanticIdentifyer === trade.id,
        )?.id;

        if (!tradeId) {
          return trade;
        }

        const tradeData = this.subSections.find((subSection) => subSection.id === tradeId);

        if (!tradeData) {
          return trade;
        }

        const plantCounter: { [key: string]: number } = {};

        tradeData.data.plants.forEach((plant) => {
          if (plant.data.plantType in plantCounter) {
            plantCounter[plant.data.plantType] += 1;
          } else {
            plantCounter[plant.data.plantType] = 1;
          }
        });

        return {
          ...trade,
          plantCounter,
          openTrade: () => this.openSubsection(trade.title, tradeId),
        };
      });
    },
  },
  methods: {
    openSubsection(subsectionName: string, subsectionid: string) {
      if (this.building) {
        this.$router.push({
          name: 'DigitalTwins_Site_Building_Subsection',
          params: {
            subsectionparams: JSON.stringify({
              siteid: Base64Helper.encode(this.siteId),
              siteName: this.siteName,
              buildingid: Base64Helper.encode(this.building!.id),
              buildingName: this.building!.data.buildingName,
              subsectionName,
              subsectionid: Base64Helper.encode(subsectionid),
            }),
          },
        });
      }
    },
    handleEdgeDeviceChange(value: string) {
      // TODO: actually change edge device via middleware/store
      this.initialEdgeDevice = value;
      this.buildingSettingsOpen = false;
    },
  },
  created() {
    const params = JSON.parse(this.$route.params.buildingparams as string);
    this.buildingName = params.buildingName;
    this.siteName = params.siteName;
    this.siteId = Base64Helper.decode(params.siteid);
  },
};
</script>

<style scoped lang="scss">
.digital-twin-building {
  &__trades {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    gap: $m;
  }

  &__loading {
    display: flex;
    flex-direction: column;
    gap: $s;
  }

  &__trades-loading {
    height: auto;
    padding: $xxl $m;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}

:deep(.digital-twin-building__image-loading) {
  aspect-ratio: 4 / 5;
  height: 100%;
}

h1,
h2 {
  @include content-headline;
  color: $dark-green;
}

h3 {
  @include content-subtitle;
}
</style>
