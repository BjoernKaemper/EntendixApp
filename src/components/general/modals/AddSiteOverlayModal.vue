<template>
  <ModalOverlay :isOpen="isAddSiteModalOpen" @close="resetSite">
    <template #header>
      <h3>Neue Liegenschaft anlegen</h3>
    </template>
    <template #body>
      <p id="">
        Geben Sie die Informationen einer neuen Liegenschaft ein, um sie innerhalb von ENTENDIX zu
        verwalten.
      </p>
      <form ref="form" @submit.prevent="console.log('TODO')" @reset="closeAndResetForm">
        <h4>Informationen pflegen</h4>
        <FormInput
          id="name"
          label="Name"
          placeholder="Name der Liegenschaft"
          :required="true"
          type="text"
          v-model="nameInput.value.value"
          :hasError="!nameInput.isValid.value"
          :errorMessage="nameInput.errorMessage.value"
        />
        <FormInput
          id="street"
          label="Straße"
          placeholder="Straße"
          :required="true"
          type="text"
          v-model="streetInput.value.value"
          :hasError="!streetInput.isValid.value"
          :errorMessage="streetInput.errorMessage.value"
        />
        <div class="form-grid">
          <FormInput
            id="zip"
            label="PLZ"
            placeholder="PLZ"
            :required="true"
            type="text"
            v-model="zipCodeInput.value.value"
            :hasError="!zipCodeInput.isValid.value"
            :errorMessage="zipCodeInput.errorMessage.value"
          />
          <FormInput
            id="city"
            label="Stadt"
            placeholder="Stadt"
            :required="true"
            type="text"
            v-model="cityInput.value.value"
            :hasError="!cityInput.isValid.value"
            :errorMessage="cityInput.errorMessage.value"
          />
        </div>
        <FormInput
          id="country"
          label="Land"
          placeholder="Land"
          :required="true"
          type="text"
          v-model="countryInput.value.value"
          :hasError="!countryInput.isValid.value"
          :errorMessage="countryInput.errorMessage.value"
        />
        <FileInput
          id="image"
          label="Bild der Liegenschaft"
          accepts="*"
          @update:fileList="setImage"
        />
      </form>
    </template>
    <template #footer>
      <ButtonComponent type="reset" text="Abbrechen" state="secondary" @click="resetSite" />
      <ButtonComponent
        type="submit"
        text="Liegenschaft anlegen"
        state="primary"
        :icon="IconTypes.CHECK_MARK"
        @click="addSite"
      />
    </template>
  </ModalOverlay>
  <InterceptionModal
    :isOpen="leaveFormInterception.isOpen.value"
    @cancel="leaveFormInterception.abortAction"
    @confirm="leaveFormInterception.confirmAction"
  />
</template>

<script lang="ts">
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

export default {
  components: {
    ModalOverlay,
    ButtonComponent,
    FormInput,
    FileInput,
    InterceptionModal,
  },
  data() {
    return {
      image: [] as File[],
      name: '',
      street: '',
      zip: '',
      city: '',
      country: '',
    };
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
  setup() {
    const nameInput = useInput<string>([requiredValidator], '');
    const streetInput = useInput<string>([requiredValidator], '');
    const zipCodeInput = useInput<string>([requiredValidator], '');
    const cityInput = useInput<string>([requiredValidator], '');
    const countryInput = useInput<string>([requiredValidator], '');
    // TODO: IMAGEinput

    const formState = useFormManager([streetInput, zipCodeInput, cityInput, countryInput]);

    const leaveFormInterception = useModalInterception();

    usePageLeaveInterception(formState.isChanged, leaveFormInterception.interceptAction);

    return {
      nameInput,
      streetInput,
      zipCodeInput,
      cityInput,
      countryInput,
      formState,
      leaveFormInterception,
      IconTypes,
    };
  },
  computed: {},
  methods: {
    addSite() {
      // TODO handle check if all fields are filled
      // TODO handle the adding
      this.$refs.form.submit();
    },
    resetSite() {
      this.$refs.form.reset();
    },
    setImage(files: File[]) {
      this.image = files;
    },
    closeAndResetForm() {
      this.formState.reset();
      this.$emit('close');
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
