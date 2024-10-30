<template>
  <div class="card">
    <h3>{{ buildingName }}</h3>
    <SymbolImage
      :src="BuildingCardPreview"
      :alt="`Schema des Gebäudes ${buildingName}`"
      :use-aspect-ratio="false"
    />
    <ButtonComponent
      text="Zur Verwaltung"
      state="primary"
      :icon="IconTypes.ARROW"
      @click="openBuilding()"
    />
  </div>
</template>

<script lang="ts">
// Component imports
import BuildingCardPreview from '@/assets/BuildingCardPreview.svg';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import SymbolImage from '@/components/general/SymbolImage.vue';

// Type imports
import type { PropType } from 'vue';
import { IconTypes } from '@/types/enums/IconTypes';

export default {
  name: 'BuildingCard',
  components: {
    ButtonComponent,
    SymbolImage,
  },
  props: {
    /**
     * The name of the building
     * @required
     */
    buildingName: {
      type: String as PropType<string>,
      required: true,
    },
    openBuilding: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  data() {
    return {
      BuildingCardPreview,
      IconTypes,
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

h3 {
  @include section-headline;
}
</style>
