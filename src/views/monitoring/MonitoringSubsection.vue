<template>
  <div>
    <div :class="['grid-wrapper', { 'grid-wrapper--sidebar-open': isSidebarOpen }]">
      <div class="grid-wrapper--left">
        <h2> {{ subsectionName }}</h2>
        <AutomationHZG />
      </div>
      <div class="grid-wrapper--right">
        <div class="grid-wrapper--right--header">
          <h2>Performance in den Funktionsbereichen</h2>
          <ChipComponent :status="ChipStatusTypes.ERROR" />
        </div>
        <div class="grid-wrapper--right--content">
          <div>
            <h3>Wärmeerzeugung</h3>
            <div>
              <StatusCard
                :isLoading="false"
                title="Wärmeerzeuger 1"
                subtitle="Ursache: Unter Sollwert"
                :isBordered="false"
                :status="ComponentStatusTypes.ERROR_COMPONENT"
                :actionType="ActionTypes.ARROW"
                timestamp="2024-08-14T18:27:00"
              />
              <StatusCard
                :isLoading="false"
                title="Wärmeerzeuger 2"
                subtitle="Ursache: Unter Sollwert"
                :isBordered="false"
                :status="ComponentStatusTypes.WARNING_COMPONENT"
                :actionType="ActionTypes.ARROW"
                timestamp="2024-08-14T18:27:00"
              />
            </div>
          </div>
          <div>
            <h3>Wäremverteilung</h3>
            <div>
              <h4>Erdgeschoss</h4>
              <StatusCard
                :isLoading="false"
                title="Heizkreis 1"
                subtitle="Ursache: Unter Sollwert"
                :isBordered="false"
                :status="ComponentStatusTypes.ERROR_COMPONENT"
                :actionType="ActionTypes.ARROW"
                timestamp="2024-08-14T18:27:00"
              />
              <StatusCard
                :isLoading="false"
                title="Heizkreis 2"
                subtitle="Ursache: Unter Sollwert"
                :isBordered="false"
                :status="ComponentStatusTypes.WARNING_COMPONENT"
                :actionType="ActionTypes.ARROW"
                timestamp="2024-08-14T18:27:00"
              />
            </div>
            <div>
              <h4>Erste Etage</h4>
              <StatusCard
                :isLoading="false"
                title="Heizkreis 3"
                subtitle="Ursache: Fehlender Datenpunkt"
                :isBordered="false"
                :status="ComponentStatusTypes.NONE"
                :actionType="ActionTypes.OPEN"
              />
              <StatusCard
                :isLoading="false"
                title="Heizkreis 4"
                subtitle="Ursache: Fehlender Datenpunkt"
                :isBordered="false"
                :status="ComponentStatusTypes.NONE"
                :actionType="ActionTypes.OPEN"
              />
            </div>
          </div>
          <div>
            <h3>Wäremspeicher</h3>
            <div>
              <StatusCard
                :isLoading="false"
                title="Speicher 1"
                :isBordered="false"
                :status="ComponentStatusTypes.SUCCESS_COMPONENT"
                :actionType="ActionTypes.ARROW"
              />
            </div>

          </div>
        </div>
      </div>
      <SideBar @toggle-sidebar="toggleSidebar" />
    </div>
  </div>
</template>
<script lang="ts">
// type imports
import type { PropType } from 'vue';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';
import { ComponentStatusTypes } from '@/types/enums/ComponentStatusTypes';

// component imports
import AutomationHZG from '@/assets/AutomationHZG.vue';
import SideBar from '@/components/general/SideBar.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';

export default {
  props: {
    /**
     * The name of the subsection.
     * @default 'Wärmeversorgung'
     */
    subsectionName: {
      type: String as PropType<string>,
      default: 'Wärmeversorgung',
    },
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  components: {
    AutomationHZG,
    SideBar,
    StatusCard,
    ChipComponent,
  },
  methods: {
    toggleSidebar(state: boolean) {
      this.isSidebarOpen = state;
    },
  },
  setup() {
    return {
      ChipStatusTypes,
      ComponentStatusTypes,
      ActionTypes,
    };
  },
};
</script>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 80px; // Sidebar closed, width 0
  grid-gap: $m;
  transition: grid-template-columns 0.3s ease; // Smooth transition on layout change

  &--left {
    display: flex;
    flex-direction: column;
    gap: $xl;
  }

  &--right {
    display: flex;
    flex-direction: column;
    gap: $m;

    &--header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &--content {
      display: flex;
      flex-direction: column;
      gap: $l;

      & > div {
        display: flex;
        flex-direction: column;
        gap: $xxs;
        & > div {
          display: flex;
          flex-direction: column;
          gap: $xxs;
        }
      }
    }
  }

  &--sidebar-open {
    grid-template-columns: 1fr 2fr 355px; // Sidebar open, width 355px
  }
}

  h2 {
    @include content-headline;
  }
  h3 {
    @include content-subtitle;
  }
  h4 {
    @include content;
  }
</style>
