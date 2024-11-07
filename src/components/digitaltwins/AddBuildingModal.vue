<template>
  <ModalOverlay :isOpen="modelValue" class="add-building" @close="handleClose">
    <template #header>
      <h5>Neues Gebäude zur Liegenschaft hinzufügen</h5>
    </template>
    <template #body>
      <p>
        Geben Sie die Informationen eines neuen Gebäudes ein. Falls das ENTENDIX Edge Device im
        Gebäude angebracht wurde, können Sie es hier mit dem Digitalen Zwilling verknüpfen.
      </p>
      <form class="add-building__form" ref="form" @submit.prevent="handleSubmit">
        <div class="add-building__form-group">
          <h3>Informationen pflegen</h3>
          <FormInput
            id="building-name"
            label="Name"
            placeholder="Name"
            v-model="name.value.value"
            :hasError="!name.isValid && formState.showErrors.value"
            :error-message="formState.showErrors.value ? name.errorMessage.value : undefined"
            required
          />
          <FormInput
            id="building-space"
            label="Netto-Grundfläche [m²]"
            type="number"
            v-model="usableSpace.value.value"
            :has-error="!usableSpace.isValid && formState.showErrors.value"
            :error-message="formState.showErrors.value ? usableSpace.errorMessage.value : undefined"
            required
          />
          <FormInput
            id="building-usage"
            label="Allgemeine Nutzungszeit (optional)"
            type="textarea"
            :rows="2"
            v-model="usage.value.value"
            placeholder="Allgemein Nutzungszeit"
            description="Geplante Nutzung des Gebäudes nach Uhrzeit, Wochentag und Saison"
            :has-error="!usage.isValid && formState.showErrors.value"
            :error-message="formState.showErrors.value ? usage.errorMessage.value : undefined"
          />
          <FileInput
            id="building-planning-data"
            label="Planungsdaten"
            accepts="image/*"
            multiple
            selectPrompt="Dateien auswählen"
            @update:fileList="(e) => (files.value.value = e)"
          />
        </div>
        <div class="add-building__form-group">
          <h3>Physische Komponente verknüpfen</h3>
          <div class="add-building__dropdown">
            <label for="edge-device">ENTENDIX Edge Device (optional)</label>
            <DropdownComponent
              :options="dummyOptions"
              :currentValue="edgeDevice.value.value"
              @changed="(value) => (edgeDevice.value.value = value)"
            />
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <ButtonComponent text="Abbrechen" @click="handleClose" state="secondary" />
      <ButtonComponent
        type="submit"
        text="Gebäude anlegen"
        state="primary"
        :icon="IconTypes.CHECK_MARK"
        @click="submitForm"
      />
    </template>
  </ModalOverlay>
  <InterceptionModal
    :isOpen="interceptLeave.isOpen.value"
    @cancel="interceptLeave.abortAction"
    @confirm="interceptLeave.confirmAction"
    title="Änderungen verwerfen?"
    confirmText="Änderungen verwerfen"
  >
    <template #body>
      <p>
        Sind Sie sicher, dass Sie den aktuellen Dialog schließen wollen? Die von Ihnen vorgenommenen
        <strong>Änderungen gehen verloren.</strong>
      </p>
    </template>
  </InterceptionModal>
</template>

<script lang="ts">
// Hook imports
import { useInput } from '@/hooks/useInput';
import { useFormManager } from '@/hooks/useFormManager';
import { useModalInterception } from '@/hooks/useModalInterception';
import { usePageLeaveInterception } from '@/hooks/usePageLeaveInteception';

// Type imports
import { IconTypes } from '@/types/enums/IconTypes';
import type { DropdownOptions } from '@/types/local/DropdownOptions';

// Component imports
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import FormInput from '@/components/general/forms/FormInput.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import FileInput from '@/components/general/forms/FileInput.vue';
import DropdownComponent from '@/components/general/inputs/DropdownComponent.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';

// Helper imports
import { minValidator, requiredValidator } from '@/helpers/FormValidators';

// TODO: get proper edge device options from middleware/backend
const dummyOptions: DropdownOptions = [
  { value: '', label: 'Bitte wählen...' },
  { value: '123', label: 'Edge Device 1' },
  { value: '456', label: 'Edge Device 2' },
  { value: '789', label: 'Edge Device 3' },
];

export default {
  name: 'AddBuildingModal',
  components: {
    ModalOverlay,
    FormInput,
    ButtonComponent,
    FileInput,
    DropdownComponent,
    InterceptionModal,
  },
  data() {
    return {
      IconTypes,
      dummyOptions,
    };
  },
  props: {
    /**
     * Boolean value to determine if the modal is open or not.
     */
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    const name = useInput<string>([requiredValidator], '');
    const usableSpace = useInput<string>([requiredValidator, minValidator(0)], '');
    const usage = useInput<string>([], '');
    const files = useInput<File[]>([], []);
    const edgeDevice = useInput<string>([], '');

    const formState = useFormManager([name, usableSpace, edgeDevice, files, usage]);

    const interceptLeave = useModalInterception();

    usePageLeaveInterception(formState.isChanged, interceptLeave.interceptAction);

    return {
      name,
      usableSpace,
      edgeDevice,
      files,
      usage,
      formState,
      interceptLeave,
    };
  },
  methods: {
    submitForm() {
      if (!this.$refs.form) {
        return;
      }

      const form = this.$refs.form as HTMLFormElement;

      form.requestSubmit();
    },
    handleClose() {
      if (!this.formState.isChanged.value) {
        this.$emit('update:modelValue', false);
        return;
      }

      this.interceptLeave.interceptAction(
        () => {
          this.$emit('update:modelValue', false);
          this.formState.reset();
        },
        () => {},
      );
    },
    handleSubmit() {
      if (!this.formState.isValid.value) {
        this.formState.showErrors.value = true;
        return;
      }

      // TODO: submit properly
      const body = new FormData();
      this.files.value.value.forEach((file) => {
        body.append('files', file);
      });
      body.append('name', this.name.value.value);
      body.append('usableSpace', this.usableSpace.value.value);
      body.append('usage', this.usage.value.value);

      fetch('http://localhost:3000/la/le/lu', {
        method: 'POST',
        body,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-building {
  &__form {
    display: flex;
    flex-direction: column;
    gap: $m;
  }

  &__form-group {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }

  &__dropdown {
    display: flex;
    flex-direction: column;
    gap: $xxxs;
  }
}

h5 {
  @include content-subtitle;
  color: $dark-purple;
}
</style>
