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
          <FormInput id="building-name" label="Name" placeholder="Name" v-model="name" required />
          <FormInput
            id="building-space"
            label="Netto-Grundfläche [m²]"
            type="number"
            v-model="usableSpace"
            icon="heat"
            required
          />
          <FormInput
            id="building-usage"
            label="Allgemeine Nutzungszeit (optional)"
            type="textarea"
            v-model="usage"
            placeholder="Allgemein Nutzungszeit"
            description="Geplante Nutzung des Gebäudes nach Uhrzeit, Wochentag und Saison"
          />
          <FileInput id="building-planning-data" label="Planungsdaten" accepts="image/*" multiple selectPrompt="Dateien auswählen" @update:fileList="(e) => files = e" />
        </div>
        <div class="add-building__form-group">
          <h3>Physische Komponente verknüpfen</h3>
          <!-- TODO: use dropdown component, when available -->
          <label for="device">ENTENDIX Edge Device</label>
          <select id="device">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </div>
      </form>
    </template>
    <template #footer>
      <ButtonComponent
        text="Abbrechen"
        @click="handleClose"
        state="tertiary"
      />
      <ButtonComponent type="submit" text="Gebäude anlegen" state="primary" :icon="IconTypes.CHECK_MARK" @click="submitForm" />
    </template>
  </ModalOverlay>
</template>

<script lang="ts">
// Component imports
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import FormInput from '@/components/general/forms/FormInput.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import FileInput from '@/components/general/forms/FileInput.vue';

// Type imports
import { IconTypes } from '@/types/enums/IconTypes';

export default {
  name: 'AddBuildingModal',
  components: {
    ModalOverlay,
    FormInput,
    ButtonComponent,
    FileInput,
  },
  data() {
    return {
      name: '',
      usableSpace: '',
      usage: '',
      files: [] as File[],
      IconTypes,
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
  methods: {
    submitForm() {
      if (!this.$refs.form) {
        return;
      }

      const form = this.$refs.form as HTMLFormElement;

      form.requestSubmit();
    },
    handleClose() {
      this.$emit('update:modelValue', false);
    },
    handleSubmit() {
      // TODO: submit properly
      const body = new FormData();
      this.files.forEach((file) => {
        body.append('files', file);
      });
      body.append('name', this.name);
      body.append('usableSpace', this.usableSpace);
      body.append('usage', this.usage);

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
}

h5 {
  @include content-subtitle;
  color: $dark-purple;
}
</style>
