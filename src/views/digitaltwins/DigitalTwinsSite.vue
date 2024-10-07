<template>
  <div>
    <div :class="['grid-wrapper', { 'grid-wrapper--sidebar-open': isSidebarOpen }]">
      <div class="grid-wrapper--left">
        <h1>{{ 'TH Köln, Campus Deutz'}}</h1>
        <img src="@/assets/placeholder-campus-deutz.png" alt="image of {{ buildingName }}">
        <h3>Informationen über die Liegenschaft</h3>
        <div class="group">
          <label for="street-input">Straße</label>
          <input id="street-input" type="text" placeholder="Betzdorfer Straße" />
        </div>
        <div class="group">
          <label for="plz-input">PLZ</label>
          <input id="plz-input" type="text" placeholder="50679" />
        </div>
        <div class="group">
          <label for="city-input">Stadt</label>
          <input id="city-input" type="text" placeholder="Köln" />
        </div>
        <div class="group">
          <label for="land-input">Land</label>
          <input id="land-input" type="text" placeholder="Deutschland" />
        </div>
      </div>
      <div class="grid-wrapper--right">
        <h1>Gebäude in der Liegenschaft</h1>
        <div>
          <BuildingCard buildingName="IWZ" />
          <BuildingCard buildingName="Halle West" />
          <BuildingCard buildingName="Halle Süd" />
          <BuildingCard buildingName="Halle Ost" />
          <BuildingCard buildingName="Halle Nord" />
        </div>
      </div>
      <SideBar @toggle-sidebar="toggleSidebar" />
    </div>
  </div>
</template>

<script lang="ts">
import BuildingCard from '@/components/general/digitaltwins/BuildingCard.vue';
import SideBar from '@/components/general/SideBar.vue';

export default {
  components: {
    SideBar,
    BuildingCard,
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar(state: boolean) {
      this.isSidebarOpen = state;
    },
  },
};
</script>

<style scoped lang="scss">
  .grid-wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr 80px; // Sidebar closed, width 0
    transition: grid-template-columns 0.3s ease; // Smooth transition on layout change
    gap: 2rem;

    &--sidebar-open {
    grid-template-columns: 1fr 2fr 355px; // Sidebar open, width 355px
  }

    &--left {
      display: flex;
      flex-direction: column;
      gap: $s;

      img {
        aspect-ratio: 3 / 2;
        border-radius: $border-radius;
      }
    }

    &--right > div {
      display: grid;
      grid-template-columns: repeat(2, minmax(200px, 1fr));
      flex-wrap: wrap;
      gap: $s;
    }
  }

  h1 {
    @include content-headline;
  }

  h3 {
    @include content-subtitle;
  }

  p, label {
    @include content;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: $base-size;
  }

  input {
    background-color: $lightest;
    padding: $base-size $xxs;
    border-radius: $border-radius;
    border: 1px solid $light-purple;

    &::placeholder {
      @include content;
    }

    &:focus {
      outline: none;
    }
  }
</style>
