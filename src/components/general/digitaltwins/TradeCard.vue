<template>
  <div class="trade-card">
    <header class="trade-card__header">
      <MaterialSymbol :symbol="icon" />
      <h4>{{ name }}</h4>
    </header>
    <div class="trade-card__content">
      <LoadingSpinner v-if="isLoading" />
      <p v-else-if="!plantTypes" class="trade-card__empty-message">Noch keine Komponenten hinterlegt.</p>
      <p v-else v-for="(count, key) in plantTypes" :key="key">
        {{ count }}x {{ key }}
      </p>
    </div>
    <footer class="trade-card__footer" v-if="plantTypes">
      <ButtonComponent @click="openTrade()" state="primary" text="Komponenten" :icon="IconTypes.ARROW" />
    </footer>
  </div>
</template>

<script lang="ts">
// Component imports
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

// Type imports
import type { PropType } from 'vue';
import { IconTypes } from '@/types/enums/IconTypes';
import type { MaterialIconNames } from '@/types/MaterialIconNames';

export default {
  components: {
    MaterialSymbol,
    ButtonComponent,
    LoadingSpinner,
  },
  props: {
    /**
     * Name of the trade
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Icon to show in the header
     */
    icon: {
      type: String as PropType<MaterialIconNames>,
      required: true,
    },
    /*
      * Plant types with their counts
     */
    plantTypes: {
      type: Object as PropType<{ [key: string]: number }>,
      default: undefined,
    },
    /**
     * Wether or not trade/building is loading
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * Function to open current trade page
     */
    openTrade: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      IconTypes,
    };
  },
};
</script>

<style scoped lang="scss">
.trade-card {
  background-color: $lightest;
  border-radius: $border-radius;
  display: flex;
  flex-direction: column;
  gap: $m;
  padding: $m;

  &__header {
    display: flex;
    align-items: center;
    gap: $xxs;
    width: 100%;
  }

  &__content {
    flex: 1;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }

  &__empty-message {
    @include meta-information;
    text-align: center;
  }
}

h4 {
  @include section-headline;
}

p {
  @include content;
}
</style>
