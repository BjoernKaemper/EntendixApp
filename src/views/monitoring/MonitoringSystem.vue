<template>
  <BaseLayout layout="large">
    <template #left>
      <h1>{{ plantName }}</h1>
      <LoadingCards v-if="isLoading" :card-count="1" card-class="image-loading" />
      <div v-else class="image-container">
        <SymbolImage
          :src="SymbolImageHelper.getImage(plant!.data.parentType, plant!.data.plantType)"
          :alt="plant?.data.plantName || 'Plant Name'"
          :use-aspect-ratio="false"
        />
        <router-link class="image-link" :to="digitalTwinLink"
          >im Digitalen Zwilling bearbeiten</router-link
        >
      </div>
    </template>
    <template #right>
      <LoadingCards
        v-if="isLoading || plantStore.kpiState.isLoading"
        :card-count="1"
        card-class="right-side-loading"
      />
      <div class="system-overview" v-else>
        <ChipComponent v-if="plant" :status="getChipStatusByCondition(plant?.data.condition)" />
        <AlertElement
          v-for="(alert, idx) in plant?.data.alerts"
          :key="idx"
          :alert="alert"
          :is-toast="false"
        />
        <div v-if="plant?.data.stati?.length" class="system-overview--stati">
          <StatusCard
            v-for="(status, idx) in plant?.data.stati"
            :key="idx"
            :is-bordered="false"
            :is-loading="false"
            :title="status.name"
            :subtitle="status.description.de"
            :status="getChipStatusByCondition(status.condition)"
          />
        </div>
        <div v-for="(kpiGroup, idx) in mappedKpis" :key="idx" class="system-overview--modules">
          <h2>
            {{ kpiGroup.title }}
          </h2>
          <SystemAccordeon
            v-for="(kpi, kpiIdx) in kpiGroup.kpis"
            :key="kpiIdx"
            :title="kpi.data.name.de"
            :condition="getChipStatusByCondition(kpi.data.condition)"
            :kpi="kpi"
          />
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
// Library imports
import { mapStores } from 'pinia';

// Store imports
import { useGeneralStore } from '@/store/general';
import { usePlantStore } from '@/store/plant';

// type imports
import { IconTypes } from '@/types/enums/IconTypes';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ConditionTypes } from '@/types/global/enums/ConditionTypes';
import type { Kpi } from '@/types/global/kpi/Kpi';
import type { Alert } from '@/types/local/Alert';
// Remove after implementing alert fetching:
import { AlertTypes } from '@/types/enums/AlertTypes';

// component imports
import ChipComponent from '@/components/general/ChipComponent.vue';
import AlertElement from '@/components/general/AlertElement.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import SystemAccordeon from '@/components/monitoring/SystemAccordeon.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import SymbolImage from '@/components/general/SymbolImage.vue';
import BaseLayout from '@/components/general/BaseLayout.vue';

import SymbolImageHelper from '@/helpers/SymbolImageHelper';

export type Status = {
  title: string;
  subtitle: string;
  type: ChipStatusTypes;
};

export default {
  components: {
    ChipComponent,
    AlertElement,
    StatusCard,
    SystemAccordeon,
    LoadingCards,
    SymbolImage,
    BaseLayout,
  },
  data() {
    return {
      subsectionName: '',
      subsectionId: '',
      siteName: '',
      siteId: '',
      buildingName: '',
      buildingId: '',
      plantName: '',
      plantId: '',
    };
  },
  computed: {
    ...mapStores(useGeneralStore, usePlantStore),
    plant() {
      return this.plantStore.plant;
    },
    isLoading(): boolean {
      return this.plantStore.isLoading;
    },
    modules() {
      return this.plantStore.moduleState;
    },
    alerts(): Array<Alert> {
      // TODO: Implement alert fetching
      return [
        {
          id: '1',
          title: 'Wartung erforderlich',
          description: 'Die Anlage benötigt eine Wartung',
          type: AlertTypes.ERROR,
        },
      ];
    },
    mappedKpis() {
      const mappedKpis: Array<any> = [];
      this.plantStore.kpiState.kpis.forEach((kpi: Kpi) => {
        const kpiIndex = mappedKpis.findIndex((mappedKpi) => mappedKpi.title === kpi.data.type);
        if (kpiIndex !== -1) {
          mappedKpis[kpiIndex].kpis.push(kpi);
        } else {
          mappedKpis.push({
            title: kpi.data.type,
            kpis: [kpi],
          });
        }
      });
      return mappedKpis;
    },
    digitalTwinLink() {
      const route = this.$route.path;
      return route.replace('monitoring', 'digitaltwins');
    },
  },
  methods: {
    getChipStatusByCondition(condition: ConditionTypes | undefined): ChipStatusTypes {
      switch (condition) {
        case ConditionTypes.HEALTHY:
          return ChipStatusTypes.SUCCESS;
        case ConditionTypes.WARNING:
          return ChipStatusTypes.WARNING;
        case ConditionTypes.ALERT:
          return ChipStatusTypes.ERROR;
        default:
          return ChipStatusTypes.INFO;
      }
    },
  },

  setup() {
    return {
      IconTypes,
      ChipStatusTypes,
      SymbolImageHelper,
    };
  },
  created() {
    const params = JSON.parse(this.$route.params.plantparams as string);
    this.subsectionName = params.subsectionName;
    this.subsectionId = decodeURIComponent(params.subsectionid);
    this.siteName = params.siteName;
    this.siteId = decodeURIComponent(params.siteid);
    this.buildingName = params.buildingName;
    this.buildingId = decodeURIComponent(params.buildingid);
    this.plantName = params.plantName;
    this.plantId = decodeURIComponent(params.plantid);
  },
};
</script>

<style scoped lang="scss">
.system-overview {
  display: flex;
  flex-direction: column;
  gap: $m;

  > .chip--wrapper {
    margin-left: auto;
  }

  &--stati {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: $xxs;
  }

  &--modules {
    display: flex;
    flex-direction: column;
    gap: $m;
  }
}

.image-container {
  padding: $xxxl;
  background-color: $lightest;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .image-link {
    position: absolute;
    top: $m;
    right: $m;
    border: 1px solid $darken;
    @include meta-information;
    padding: $xxxs;
    border: 1px solid $darken;
    border-radius: $border-radius;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $xxxs;
    width: fit-content;
    cursor: pointer;
    background-color: $lightest;
    border: 1px solid $light-purple;
  }
}

ul {
  padding: $m;
}

h1 {
  @include content-headline;
}

p,
li {
  @include content;
}

h2 {
  @include content-headline;
  color: $darkest;
}

:deep(.image-loading) {
  height: 300px;
}

:deep(.right-side-loading) {
  height: 100%;
  background-color: transparent;
}
</style>
