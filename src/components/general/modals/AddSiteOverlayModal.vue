<template>
  <ModalOverlay :isOpen="isAddSiteModalOpen" @close="handleClose">
    <template #header>
      <h3>Neue Liegenschaft anlegen</h3>
    </template>
    <template #body>
      <p id="">
        Geben Sie die Informationen einer neuen Liegenschaft ein, um sie innerhalb von ENTENDIX zu
        verwalten.
      </p>
      <form ref="form" @submit.prevent="handleSubmit">
        <h4>Informationen pflegen</h4>
        <FormInput
          id="name"
          label="Name"
          placeholder="Name der Liegenschaft"
          :required="true"
          type="text"
          v-model="nameInput.value.value"
          :hasError="!nameInput.isValid.value && formState.showErrors.value"
          :errorMessage="formState.showErrors.value ? nameInput.errorMessage.value : undefined"
        />
        <FormInput
          id="street"
          label="Straße"
          placeholder="Straße"
          :required="true"
          type="text"
          v-model="streetInput.value.value"
          :hasError="!streetInput.isValid.value && formState.showErrors.value"
          :errorMessage="formState.showErrors.value ? streetInput.errorMessage.value : undefined"
        />
        <div class="form-grid">
          <FormInput
            id="zip"
            label="PLZ"
            placeholder="PLZ"
            :required="true"
            type="text"
            v-model="zipCodeInput.value.value"
            :hasError="!zipCodeInput.isValid.value && formState.showErrors.value"
            :errorMessage="formState.showErrors.value ? zipCodeInput.errorMessage.value : undefined"
          />
          <FormInput
            id="city"
            label="Stadt"
            placeholder="Stadt"
            :required="true"
            type="text"
            v-model="cityInput.value.value"
            :hasError="!cityInput.isValid.value && formState.showErrors.value"
            :errorMessage="formState.showErrors.value ? cityInput.errorMessage.value : undefined"
          />
        </div>
        <FormInput
          id="country"
          label="Land"
          placeholder="Land"
          :required="true"
          type="text"
          v-model="countryInput.value.value"
          :hasError="!countryInput.isValid.value && formState.showErrors.value"
          :errorMessage="formState.showErrors.value ? countryInput.errorMessage.value : undefined"
        />
        <FileInput
          id="site-image"
          label="Bild der Liegenschaft"
          accepts="image/*"
          selectPrompt="Datei auswählen"
          @update:fileList="(e) => (files.value.value = e)"
        />
      </form>
    </template>
    <template #footer>
      <ButtonComponent type="reset" text="Abbrechen" state="secondary" @click="handleClose" />
      <ButtonComponent
        type="submit"
        text="Liegenschaft anlegen"
        state="primary"
        :icon="IconTypes.CHECK_MARK"
        @click="submitForm"
      />
    </template>
  </ModalOverlay>
  <InterceptionModal
    :isOpen="leaveFormInterception.isOpen.value"
    @cancel="leaveFormInterception.abortAction"
    @confirm="leaveFormInterception.confirmAction"
    title="Änderungen verwerfen?"
    confirmText="Änderungen verwerfen"
  />
</template>

<script lang="ts">
// Library import
import { mapStores } from 'pinia';

// Hook import
import { useInput } from '@/hooks/useInput';
import { useFormManager } from '@/hooks/useFormManager';
import { useModalInterception } from '@/hooks/useModalInterception';
import { usePageLeaveInterception } from '@/hooks/usePageLeaveInteception';

// Component import
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import FormInput from '@/components/general/forms/FormInput.vue';
import FileInput from '@/components/general/forms/FileInput.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';

// Helper imports
import { requiredValidator } from '@/helpers/FormValidators';

// Type imports
import { IconTypes } from '@/types/enums/IconTypes';
import type { Site } from '@/types/global/site/Site';
// Store import
import { useSiteStore } from '@/store/site';
import { useGeneralStore } from '@/store/general';

export default {
  components: {
    ModalOverlay,
    ButtonComponent,
    FormInput,
    FileInput,
    InterceptionModal,
  },
  props: {
    /**
     * The state of the add Site modal.
     * @type {boolean}
     * @required
     * @default false
     */
    isAddSiteModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  setup() {
    const nameInput = useInput<string>([requiredValidator], '');
    const streetInput = useInput<string>([requiredValidator], '');
    const zipCodeInput = useInput<string>([requiredValidator], '');
    const cityInput = useInput<string>([requiredValidator], '');
    const countryInput = useInput<string>([requiredValidator], '');
    const files = useInput<File[]>([], []);

    const formState = useFormManager([
      nameInput,
      streetInput,
      zipCodeInput,
      cityInput,
      countryInput,
      files,
    ]);

    const leaveFormInterception = useModalInterception();

    usePageLeaveInterception(formState.isChanged, leaveFormInterception.interceptAction);

    return {
      nameInput,
      streetInput,
      zipCodeInput,
      cityInput,
      countryInput,
      files,
      formState,
      leaveFormInterception,
      IconTypes,
    };
  },
  computed: {
    ...mapStores(useSiteStore, useGeneralStore),
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
        this.$emit('close');
        return;
      }

      this.leaveFormInterception.interceptAction(
        () => {
          this.$emit('close');
          this.formState.reset();
        },
        () => {},
      );
    },
    async handleSubmit() {
      if (!this.formState.isValid.value) {
        this.formState.showErrors.value = true;
        return;
      }

      const body = new FormData();
      if (this.files.value.value.length !== 0) {
        body.append('image', this.files.value.value[0]);
      }
      body.append('siteName', this.nameInput.value.value);
      body.append('street', this.streetInput.value.value);
      body.append('zipcode', this.zipCodeInput.value.value);
      body.append('cityTown', this.cityInput.value.value);
      body.append('nationalCode', this.countryInput.value.value);
      // Add the Company ID to the body, this will be for the next few years always be the first company, cause we only have one company
      body.append('companyId', this.generalStore.baseInfoState.companies[0].id);
      const result = await this.siteStore.addSite(body);
      if (typeof result !== 'boolean') {
        // The result is not a boolean, so it is a Site object
        // Close the modal, reset the form and navigate to the new site page
        this.$emit('close');
        this.formState.reset();
        this.$router.push({
          name: 'DigitalTwins_Site',
          params: {
            siteparams: JSON.stringify({
              siteid: result.id,
              siteName: result.data.siteName,
            }),
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  @include content-subtitle;
  color: $dark-purple;
}
h4 {
  @include section-headline;
}
form {
  display: flex;
  flex-direction: column;
  gap: $xxs;

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $xxs;
  }
}
</style>
