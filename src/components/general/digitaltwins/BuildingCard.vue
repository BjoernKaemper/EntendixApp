<template>
  <div class="card">
    <h1>{{ buildingName }}</h1>
    <img
      :src="BuildingCardPreview"
      :alt="`Schema des Gebäudes ${buildingName}`
      ">
    <ButtonComponent
      text="Zur Verwaltung"
      :primary="true"
    />
  </div>
</template>

<script lang="ts">
import BuildingCardPreview from '@/assets/BuildingCardPreview.svg';
import ButtonComponent from '@/components/general/ButtonComponent.vue';

import type { PropType } from 'vue';

export default {
  props: {
    /**
     * The name of the building
     * @required
     */
    buildingName: {
      type: String as PropType<string>,
      required: true,
    },
  },
  components: {
    ButtonComponent,
  },
  data() {
    return {
      BuildingCardPreview,
    };
  },
};
</script>

<style scoped lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    gap: $m;
    padding: $m;
    border-radius: $border-radius;
    background-color: $lightest;

    & > svg {
      margin: auto;
    }

    & > button {
      margin-left: auto;
    }
  }

  h1 {
    @include section-headline;
  }
</style>
