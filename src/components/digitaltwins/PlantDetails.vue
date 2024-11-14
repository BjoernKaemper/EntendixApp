<template>
  <div class="plant-details">
    <div class="plant-details__updating" v-if="updateLoading">
      <LoadingSpinner size="large" />
    </div>
    <form
      class="plant-details__section"
      :class="{ 'plant-details__section--loading': updateLoading }"
      @submit.prevent="handleSubmit"
      @reset="formState.reset()"
      @focusin="formFocused = true"
      @focusout="formFocused = false"
    >
      <FormInput
        id="plant-name"
        label="Name der Anlage"
        icon="edit"
        v-model="plantName.value.value"
      />
      <div class="plant-details__dropdown">
        <label for="plant-type" class="plant-details__label">Anlagentyp</label>
        <DropdownComponent
          id="plant-type"
          :options="plantTypeOptions"
          :current-value="plantType.value.value"
          @changed="(e) => (plantType.value.value = e)"
          title="Coming soon"
          disabled
        />
      </div>
      <FormInput
        id="operating-information"
        type="textarea"
        label="Betriebsinformationen"
        v-model="operatingInformation.value.value"
        description="Geplante Nutzung der Anlage nach Uhrzeit, Wochentag und Saison"
        title="Coming soon"
        disabled
      />
      <footer
        class="plant-details__actions"
        :class="{
          'plant-details__actions--hidden': !(formState.isChanged.value || formFocused),
        }"
      >
        <ButtonComponent text="Abbrechen" type="reset" state="secondary" />
        <ButtonComponent
          text="Speichern"
          type="submit"
          icon="check"
          state="primary"
          :disabled="!formState.isChanged.value"
        />
      </footer>
    </form>
    <div
      class="plant-details__section"
      :class="{ 'plant-details__section--loading': updateLoading }"
    >
      <FileInput
        id="file-upload"
        label="Technische Planungen und Datenblätter"
        select-prompt="Schemata oder Grundrisse auswählen..."
        disabled
        title="Coming soon"
        accepts="image/*,.pdf"
      />
    </div>
  </div>
  <InterceptionModal
    :isOpen="leavePageInterception.isOpen.value"
    @cancel="leavePageInterception.abortAction"
    @confirm="leavePageInterception.confirmAction"
  />
</template>

<script lang="ts">
// Hook imports
import { useInput } from '@/hooks/useInput';
import { useFormManager } from '@/hooks/useFormManager';
import { useModalInterception } from '@/hooks/useModalInterception';
import { usePageLeaveInterception } from '@/hooks/usePageLeaveInteception';

// Store imports
import { usePlantStore } from '@/store/plant';
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';

// Component imports
import FormInput from '@/components/general/forms/FormInput.vue';
import DropdownComponent from '@/components/general/inputs/DropdownComponent.vue';
import FileInput from '@/components/general/forms/FileInput.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

// Helper imports
import { requiredValidator } from '@/helpers/FormValidators';

// Type imports
import type { PropType } from 'vue';
import type { Plant, PlantUpdateData } from '@/types/global/plant/Plant';
import type { DropdownOptionElement } from '@/types/local/DropdownOptions';
import type { EntendixInput } from '@/types/local/Inputs';

export default {
  name: 'PlantDetails',
  components: {
    FormInput,
    DropdownComponent,
    FileInput,
    ButtonComponent,
    InterceptionModal,
    LoadingSpinner,
  },
  props: {
    plant: {
      type: Object as PropType<Plant>,
      required: true,
    },
  },
  setup(props) {
    const plantTypeOptions: DropdownOptionElement[] = [
      {
        value: props.plant.data.plantType,
        label: props.plant.data.plantType,
      },
    ];

    const inputs: { [key in keyof Required<PlantUpdateData>]: EntendixInput<string> } = {
      plantName: useInput([requiredValidator], props.plant.data.plantName),
      plantType: useInput([], props.plant.data.plantType),
    };

    const operatingInformation = useInput([], '');

    const formState = useFormManager([operatingInformation, ...Object.values(inputs)]);

    const leavePageInterception = useModalInterception();

    usePageLeaveInterception(formState.isChanged, leavePageInterception.interceptAction);

    return {
      plantName: inputs.plantName,
      plantTypeOptions,
      plantType: inputs.plantType,
      operatingInformation,
      formState,
      leavePageInterception,
      inputs,
    };
  },
  data() {
    return {
      formFocused: false,
      updateLoading: false,
    };
  },
  computed: {
    ...mapStores(usePlantStore, useGeneralStore),
  },
  methods: {
    closeAndResetForm() {
      this.formState.reset();
      this.formFocused = false;
    },
    async handleSubmit() {
      if (!this.formState.isValid.value) {
        return;
      }

      this.updateLoading = true;

      const updatedData: PlantUpdateData = {};

      Object.entries(this.inputs).forEach(([key, input]) => {
        if (input.isChanged.value) {
          updatedData[key as keyof PlantUpdateData] = input.value.value;
        }
      });

      this.plantStore
        .updatePlant(this.plant.id, updatedData)
        .then((updatedPlant) => {
          // Update initial values of inputs with new data from backend
          Object.entries(updatedPlant.data).forEach(([key, value]) => {
            if (this.inputs[key as keyof typeof this.inputs]) {
              this.inputs[key as keyof typeof this.inputs].updateInitialValue(value);
            }
          });

          // Communicate success to user
          this.closeAndResetForm();
          this.generalStore.addAlert(
            {
              type: 'success',
              title: 'Änderungen gespeichert',
              description: 'Die Anlage wurde erfolgreich aktualisiert!',
            },
            true,
          );
        })
        .catch(() => {
          this.generalStore.addAlert({
            type: 'error',
            title: 'Fehler',
            description:
              'Die Anlage konnte nicht aktualisiert werden. Bitte versuchen Sie es später erneut.',
          });
        })
        .finally(() => {
          this.updateLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.plant-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $m;
  position: relative;

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: $xxs;

    &--hidden {
      opacity: 0;
      user-select: none;
    }
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: $xxs;

    &--loading {
      opacity: 0.6;
    }
  }

  &__updating {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  &__dropdown {
    display: flex;
    flex-direction: column;
    gap: $xxxs;
  }

  &__label {
    @include content;
  }
}
</style>
