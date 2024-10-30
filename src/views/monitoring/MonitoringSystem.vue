<template>
  <div :class="['grid-wrapper', { 'grid-wrapper--sidebar-open': isSidebarOpen }]">
    <div class="grid-wrapper--left">
      <h1>{{ plantName }}</h1>
      <LoadingCards v-if="isLoading" :card-count="1" card-class="image-loading" />

      <div v-else class="image-container">
        <SymbolImage
          :src="SystemPreviewImage"
          :alt="plant?.data.plantName || 'Plant Name'"
          :use-aspect-ratio="false"
        />
        <ButtonComponent text="im Digitalen Zwilling bearbeiten" />
      </div>
    </div>

    <LoadingCards v-if="isLoading" :card-count="1" card-class="right-side-loading" />
    <div v-else class="grid-wrapper--right">
      <ChipComponent v-if="plant" :status="getChipStatusByCondition(plant?.data.condition)" />
      <AlertElement
        v-for="(alert, idx) in plant?.data.alerts"
        :key="idx"
        :alert="alert"
        :is-toast="false"
      />
      <div class="status-grid">
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
      <div v-for="(kpiGroup, idx) in mappedKpis" :key="idx" class="module-area">
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
    <SideBar @toggle-sidebar="toggleSidebar" />
  </div>
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
import SideBar from '@/components/general/SideBar.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';
import AlertElement from '@/components/general/AlertElement.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import SystemAccordeon from '@/components/monitoring/SystemAccordeon.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import SymbolImage from '@/components/general/SymbolImage.vue';

import SystemPreviewImage from '@/assets/AutomationHeizkreis.svg';

export type Status = {
  title: string;
  subtitle: string;
  type: ChipStatusTypes;
};

export default {
  components: {
    SideBar,
    ButtonComponent,
    ChipComponent,
    AlertElement,
    StatusCard,
    SystemAccordeon,
    LoadingCards,
    SymbolImage,
  },
  data() {
    return {
      isSidebarOpen: false,
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
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
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
      SystemPreviewImage,
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
.grid-wrapper {
  display: grid;
  grid-gap: $m;
  grid-template-columns: 1fr 2fr 80px;
  transition: grid-template-columns 0.3s ease;

  &--sidebar-open {
    grid-template-columns: 1fr 2fr 355px; // Sidebar open, width 355px
  }

  &--left {
    display: flex;
    flex-direction: column;
    gap: $m;
  }

  &--right {
    display: flex;
    flex-direction: column;
    gap: $m;

    > .chip--wrapper {
      margin-left: auto;
    }

    &--header {
      display: flex;
      align-items: center;
      gap: $m;
    }
  }
}

.image-container {
  padding: $xxxl;
  background-color: $lightest;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  button {
    position: absolute;
    top: $m;
    right: $m;
    border: 1px solid $darken;
    @include meta-information;
    padding: $xxxs;
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

.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: $xxs;
}
.module-area {
  display: flex;
  flex-direction: column;
  gap: $m;
}
:deep(.image-loading) {
  height: 300px;
}
:deep(.right-side-loading) {
  height: 100%;
  background-color: transparent;
}
</style>
