<template>
  <div :class="['grid-wrapper', { 'grid-wrapper--sidebar-open': isSidebarOpen }]">
    <div class="grid-wrapper--left">
      <h1>Heizkreis 1</h1>
      <div class="image-container">
        <ButtonComponent
          text="im Digitalen Zwilling bearbeiten"
        />
        <Heizkreis />
      </div>
    </div>

    <div class="grid-wrapper--right">
      <ChipComponent
        :status="ChipStatusTypes.ERROR"
      />
      <div class="grid-wrapper--right--header">
        <h4>Spreizung Vorlauf-Rücklauf</h4>
        <ChipComponent
          :isMini="true"
          :status="ChipStatusTypes.SUCCESS"
        />
      </div>
      <LineChart :data=[] />
      <div class="subgrid">
        <div class="subgrid--left">
          <div class="subgrid--left--header">
            <h4>Aktueller Tageswert</h4>
            <ChipComponent
              :isMini="true"
              :status="ChipStatusTypes.SUCCESS"
            />
          </div>
          <BigNumber :number="15" unit="Kelvin (K)" />
          <CommentsContainer :comments="comments" />
        </div>
        <div class="subgrid--right">
          <ImprovementsContainer :improvement="improvements" />
        </div>
      </div>
    </div>
    <SideBar @toggle-sidebar="toggleSidebar" />
  </div>
</template>

<script lang="ts">

// component imports
import Heizkreis from '@/assets/AutomationHeizkreis.vue';
import LineChart from '@/components/general/charts/LineChart.vue';
import SideBar from '@/components/general/SideBar.vue';
import BigNumber from '@/components/general/BigNumber.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';
import CommentsContainer from '@/components/monitoring/CommentsContainer.vue';
import ImprovementsContainer from '@/components/monitoring/ImprovementsContainer.vue';

// type imports
import { IconTypes } from '@/types/enums/IconTypes';
import comments from '@/assets/json/comments.json';
import improvements from '@/assets/json/improvements.json';
import type { Comment } from '@/types/Comment';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';

export default {
  components: {
    Heizkreis,
    LineChart,
    SideBar,
    BigNumber,
    ButtonComponent,
    ChipComponent,
    CommentsContainer,
    ImprovementsContainer,
  },

  data() {
    return {
      isSidebarOpen: false,
      comments: comments.comments as Comment[],
      improvements: improvements.improvements,
    };
  },

  methods: {
    toggleSidebar(state: boolean) {
      this.isSidebarOpen = state;
    },

  },
  setup() {
    return {
      IconTypes,
      ChipStatusTypes,
    };
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

.subgrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $m;

  &--left {
    display: flex;
    flex-direction: column;
    gap: $xxs;

    &--header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: $m;
    }

    &--comments {
      display: flex;
      flex-direction: column;
      gap: $xxs;
    }

    &--fetchmore {
      @include meta-information;
      cursor: pointer;
      text-align: center;
    }

    button {
      margin-left: auto;
    }
  }

  &--right {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }
}

.big-number {
  justify-content: center;;
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

h4 {
  @include section-headline;
}

p, li {
  @include content;
}
</style>
