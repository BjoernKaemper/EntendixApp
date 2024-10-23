<template>
  <DigitalTwinLayout>
    <template #left>
      <h2>{{ buildingName }}</h2>
      <BuildingDetails v-if="building" :buildingName="buildingName" :building="building" />
    </template>
    <template #right>
      <h2>Verwaltung des Gebäudes</h2>
      <div class="digital-twin-building__trades">
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
</template>

<script lang="ts">
// TODO: loading state
// TODO: Building settings modal/button
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

// config import
import { tradesConfig } from '@/configs/trades';

export default {
  components: {
    DigitalTwinLayout,
    BuildingDetails,
    TradeCard,
  },
  data() {
    return {
      buildingName: '',
      siteName: '',
      siteId: '',
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
      // Check for building and subsection loading state, as subsections are
      // loaded after the building
      return this.buildingStore.isLoading || this.buildingStore.subsectionState.isLoading;
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
  },
  created() {
    const params = JSON.parse(this.$route.params.buildingparams as string);
    this.buildingName = params.buildingName;
    this.siteName = params.siteName;
    this.siteId = decodeURIComponent(params.siteid);
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
}

h1 {
  @include content-headline;
}

h2,
h3 {
  @include content-headline;
  color: $dark-green;
}
</style>
