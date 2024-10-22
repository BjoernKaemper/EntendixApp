<template>
  <ModalOverlay :isOpen="isAddSiteModalOpen">
    <template #header>
      <h3>Neue Liegenschaft anlegen</h3>
    </template>
    <template #body>
      <p id="">
        Geben Sie die Informationen einer neuen Liegenschaft ein, um sie innerhalb von ENTENDIX zu
        verwalten.
      </p>
      <form action="">
        <h4>Informationen pflegen</h4>
        <FormInput
          id="name"
          label="Name"
          placeholder=""
          :required="true"
          type="text"
          :model-value="name"
        />
        <FormInput
          id="street"
          label="Straße"
          placeholder=""
          :required="true"
          type="text"
          :model-value="street"
        />
        <div class="form-grid">
          <FormInput
            id="zip"
            label="PLZ"
            placeholder=""
            :required="true"
            type="text"
            :model-value="zip"
          />
          <FormInput
            id="city"
            label="Stadt"
            placeholder=""
            :required="true"
            type="text"
            :model-value="city"
          />
        </div>
        <FormInput
          id="country"
          label="Land"
          placeholder=""
          :required="true"
          type="text"
          :model-value="country"
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
      <ButtonComponent @click="close" text="Abbrechen" />
      <ButtonComponent
        @click="addSite"
        :primary="true"
        text="Liegenschaft anlegen"
        :icon="IconTypes.CHECK_MARK"
      />
    </template>
  </ModalOverlay>
</template>

<script lang="ts">
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import FormInput from '@/components/general/forms/FormInput.vue';
import FileInput from '@/components/general/forms/FileInput.vue';

import { IconTypes } from '@/types/enums/IconTypes';

export default {
  components: {
    ModalOverlay,
    ButtonComponent,
    FormInput,
    FileInput,
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
    return {
      IconTypes,
    };
  },
  computed: {},
  methods: {
    close() {
      this.$emit('close');
    },
    addSite() {
      // TODO handle check if all fields are filled
      // TODO handle the adding
    },
    setImage(files: File[]) {
      this.image = files;
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
