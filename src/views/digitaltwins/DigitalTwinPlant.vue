<template>
  <DigitalTwinLayout layout="large">
    <template #left>
      <h1>{{ plantName }}</h1>
      <LoadingSpinner
        class="digital-twin-plant__image digital-twin-plant__image--loading"
        v-if="plantStore.isLoading"
        size="large"
      />
      <SymbolImage
        v-else
        :alt="plantName || 'Plant Name'"
        :src="SystemPreviewImage"
        class="digital-twin-plant__image"
        :use-aspect-ratio="false"
      />
    </template>
    <template #right>
      <div class="digital-twin-plant__head">
        <ButtonComponent
          text="Neues Aggregat verknüpfen"
          icon="add_link"
          state="secondary"
          disabled
          title="Coming soon"
        />
      </div>
      <div v-if="plantStore.isLoading" class="digital-twin-plant__loading">
        <LoadingSpinner size="large" />
      </div>
      <PlantDetails v-else-if="plant" :plant="plant" />
      <LoadingCards v-if="plantStore.isLoading || plantStore.moduleState.isLoading" />
      <div v-else class="digital-twin-plant__modules">
        <AccordionBase
          v-for="module in plantStore.moduleState.modules"
          :key="module.id"
          :title="module.data.moduleName"
        >
          <template #content>
            <div
              v-for="medium in module.data.mediums"
              :key="medium.id"
              class="digital-twin-plant__medium"
            >
              <h4>{{ medium.data.mediumName }}</h4>
              <ListElement
                v-for="aggregate in medium.data.aggregates"
                :key="aggregate.id"
                representationIcon="account_tree"
                :title="aggregate.data.aggregateName"
                interactionIcon="open_in_new"
                @click="handleAggregateClick(aggregate)"
              />
            </div>
          </template>
        </AccordionBase>
      </div>
    </template>
  </DigitalTwinLayout>
  <AggregateModal
    v-model="aggregateModalOpen"
    :aggregateId="currentAggregateId"
    :aggregateName="currenAggregateName"
    :key="currentAggregateId"
  />
</template>

<script lang="ts">
// Library imports
import { mapStores } from 'pinia';

// Store imports
import { usePlantStore } from '@/store/plant';

// Component imports
import DigitalTwinLayout from '@/components/digitaltwins/DigitalTwinLayout.vue';
import ListElement from '@/components/general/ListElement.vue';
import PlantDetails from '@/components/digitaltwins/PlantDetails.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import AccordionBase from '@/components/general/AccordionBase.vue';
import AggregateModal from '@/components/digitaltwins/AggregateModal.vue';
import SymbolImage from '@/components/general/SymbolImage.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';

// Type imports
import type { Aggregate } from '@/types/global/aggregate/Aggregate';

// Image imports
import SystemPreviewImage from '@/assets/AutomationHeizkreis.svg';

export default {
  components: {
    DigitalTwinLayout,
    ListElement,
    PlantDetails,
    ButtonComponent,
    AccordionBase,
    AggregateModal,
    SymbolImage,
    LoadingSpinner,
    LoadingCards,
  },
  data() {
    return {
      plantName: '',
      currentAggregateId: '',
      currenAggregateName: '',
      aggregateModalOpen: false,
      SystemPreviewImage,
    };
  },
  computed: {
    ...mapStores(usePlantStore),

    plant() {
      return this.plantStore.plant;
    },
  },
  methods: {
    handleAggregateClick(aggregate: Aggregate) {
      this.currentAggregateId = aggregate.id;
      this.currenAggregateName = aggregate.data.aggregateName;
      this.aggregateModalOpen = true;
    },
  },
  created() {
    const params = JSON.parse(this.$route.params.plantparams as string);
    this.plantName = params.plantName;
  },
};
</script>

<style scoped lang="scss">
.digital-twin-plant {
  &__image {
    padding: $xxl;
    border-radius: $border-radius;
    background-color: $lightest;

    &--loading {
      aspect-ratio: 3 / 2;
    }
  }

  &__head {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  &__modules {
    display: flex;
    flex-direction: column;
    gap: $xl;
  }

  &__medium {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }

  &__loading {
    padding: $xxl $m;
  }
}

h1 {
  @include content-headline;
}

h2 {
  @include content-headline;
  color: $dark-green;
}
</style>
