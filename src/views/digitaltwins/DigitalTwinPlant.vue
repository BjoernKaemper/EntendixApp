<template>
  <BaseLayout layout="large">
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
        :src="SymbolImageHelper.getImage(plant!.data.parentType, plant?.data.plantType)"
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
      <AlertElement
        v-else-if="plantStore.error"
        :alert="AlertMessages.CANNOT_LOAD"
        :is-toast="false"
      />
      <PlantDetails v-else-if="plant" :plant="plant" />

      <AlertElement
        v-if="
          !plantStore.error &&
          !plantStore.moduleState.error &&
          !plantStore.isLoading &&
          !plantStore.moduleState.isLoading &&
          plantStore.moduleState.partialError
        "
        :alert="AlertMessages.PARTIAL_DATA"
        :is-toast="false"
      />
      <LoadingCards v-if="plantStore.isLoading || plantStore.moduleState.isLoading" />
      <AlertElement
        v-else-if="!plantStore.error && plantStore.moduleState.error"
        :alert="AlertMessages.CANNOT_LOAD"
        :is-toast="false"
      />
      <div v-else class="digital-twin-plant__modules">
        <AccordionBase
          v-for="module in filteredModules"
          :key="module.id"
          :title="module.data.moduleName"
          class="digital-twin-plant__module"
        >
          <template #content>
            <LoadingSpinner
              v-if="partialModuleLoadingId === module.id"
              size="large"
              class="digital-twin-plant__module-spinner"
            />
            <div
              v-for="medium in module.data.mediums?.filter(
                (medium) => medium.data.aggregates?.length,
              )"
              :key="medium.id"
              class="digital-twin-plant__medium"
              :class="{
                'digital-twin-plant__medium--loading': partialModuleLoadingId === module.id,
              }"
            >
              <h4>{{ medium.data.mediumName }}</h4>
              <ListElement
                v-for="aggregate in medium.data.aggregates"
                :key="aggregate.id"
                representationIcon="account_tree"
                :title="aggregate.data.aggregateName"
                interactionIcon="open_in_new"
                @click="
                  handleAggregateClick(
                    aggregate,
                    module.data.moduleName,
                    module.id,
                    medium.data.mediumName,
                  )
                "
              />
            </div>
          </template>
        </AccordionBase>
      </div>
    </template>
  </BaseLayout>
  <AggregateModal
    v-if="aggregateModalData"
    v-model="aggregateModalOpen"
    :data="aggregateModalData"
    :key="aggregateModalData?.aggregateId"
  />
</template>

<script lang="ts">
// Library imports
import { mapStores } from 'pinia';

// Store imports
import { usePlantStore } from '@/store/plant';
import { useAggregateStore } from '@/store/aggregate';

// Component imports
import BaseLayout from '@/components/general/BaseLayout.vue';
import ListElement from '@/components/general/ListElement.vue';
import PlantDetails from '@/components/digitaltwins/PlantDetails.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import AccordionBase from '@/components/general/AccordionBase.vue';
import AggregateModal, {
  type AggregateModalData,
} from '@/components/digitaltwins/AggregateModal.vue';
import SymbolImage from '@/components/general/SymbolImage.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';
import LoadingCards from '@/components/general/LoadingCards.vue';
import AlertElement from '@/components/general/AlertElement.vue';

// Type imports
import type { Aggregate } from '@/types/global/aggregate/Aggregate';

// Data imports
import { AlertMessages } from '@/assets/json/AlertMessages';

// Helper imports
import SymbolImageHelper from '@/helpers/SymbolImageHelper';

export default {
  components: {
    BaseLayout,
    ListElement,
    PlantDetails,
    ButtonComponent,
    AccordionBase,
    AggregateModal,
    SymbolImage,
    LoadingSpinner,
    LoadingCards,
    AlertElement,
  },
  data() {
    return {
      paramsPlantName: '',
      subSectionName: '',
      aggregateModalData: null as AggregateModalData | null,
      aggregateModalOpen: false,
      AlertMessages,
      partialModuleLoadingId: null as string | null,
    };
  },
  computed: {
    ...mapStores(usePlantStore, useAggregateStore),

    plant() {
      return this.plantStore.plant;
    },

    /**
     * Array of modules that contain at least one medium that also has at leas
     * one aggregate
     */
    filteredModules() {
      return this.plantStore.moduleState.modules.filter((module) => {
        if (!module.data.mediums?.length) {
          return false;
        }

        if (module.data.mediums.every((medium) => medium.data.aggregates?.length === 0)) {
          return false;
        }

        return true;
      });
    },

    plantName() {
      return this.plant?.data.plantName || this.paramsPlantName;
    },
  },
  methods: {
    async handleModuleUpdate(moduleId: string) {
      this.partialModuleLoadingId = moduleId;

      // Refetch module data after update. Don't do anything on error, as
      // partial error will be triggered and shown from store
      await this.plantStore
        .fetchSingleModule(moduleId)
        .catch()
        .finally(() => {
          this.partialModuleLoadingId = null;
        });
    },

    handleAggregateClick(
      aggregate: Aggregate,
      moduleName: string,
      moduleId: string,
      mediumName: string,
    ) {
      this.aggregateModalData = {
        aggregateId: aggregate.id,
        aggregateName: aggregate.data.aggregateName,
        mediumName,
        moduleName,
        plantName: this.plantName,
        subSectionName: this.subSectionName,
        refetchModule: () => this.handleModuleUpdate(moduleId),
      };
      this.aggregateModalOpen = true;
    },
  },
  created() {
    const params = JSON.parse(this.$route.params.plantparams as string);
    this.paramsPlantName = params.plantName;
    this.subSectionName = params.subsectionName;
  },
  setup() {
    return {
      SymbolImageHelper,
    };
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

  &__module {
    position: relative;
  }

  &__medium {
    display: flex;
    flex-direction: column;
    gap: $xxs;

    &--loading {
      opacity: 0.6;
    }
  }

  &__loading {
    padding: $xxl $m;
  }

  &__module-spinner {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
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
