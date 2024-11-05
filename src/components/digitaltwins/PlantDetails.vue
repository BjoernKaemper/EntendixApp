<template>
  <div class="plant-details">
    <form
      class="plant-details__section"
      @submit.prevent="console.log('TODO')"
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
        <ButtonComponent text="Speichern" type="submit" icon="check" state="primary" />
      </footer>
    </form>
    <div class="plant-details__section">
      <FileInput
        id="fiel-upload"
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

// Component imports
import FormInput from '@/components/general/forms/FormInput.vue';
import DropdownComponent from '@/components/general/inputs/DropdownComponent.vue';
import FileInput from '@/components/general/forms/FileInput.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';

// Helper imports
import { requiredValidator } from '@/helpers/FormValidators';

// Type imports
import type { PropType } from 'vue';
import type { Plant } from '@/types/global/plant/Plant';
import type { DropdownOptionElement } from '@/types/local/DropdownOptions';

export default {
  name: 'PlantDetails',
  components: {
    FormInput,
    DropdownComponent,
    FileInput,
    ButtonComponent,
    InterceptionModal,
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

    const plantName = useInput([requiredValidator], props.plant.data.plantName);
    const plantType = useInput([], props.plant.data.plantType);
    const operatingInformation = useInput([], '');

    const formState = useFormManager([plantName, plantType, operatingInformation]);

    const leavePageInterception = useModalInterception();

    usePageLeaveInterception(formState.isChanged, leavePageInterception.interceptAction);

    return {
      plantName,
      plantTypeOptions,
      plantType,
      operatingInformation,
      formState,
      leavePageInterception,
    };
  },
  data() {
    return {
      formFocused: false,
    };
  },
};
</script>

<style scoped lang="scss">
.plant-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $m;

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
