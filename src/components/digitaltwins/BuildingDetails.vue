<template>
  <div class="twin-building-details">
    <figure class="twin-building-details__preview">
      <img
        class="twin-building-details__image"
        :src="BuildingCardPreview"
        :alt="`Schema des Gebäudes ${buildingName}`"
      />
    </figure>
    <form
      class="twin-building-details__info"
      @submit.prevent="console.log('TODO')"
      @focusin="formFocused = true"
      @focusout="formFocused = false"
      @reset="closeAndResetForm"
    >
      <h4>Informationen über das Gebäude</h4>
      <FormInput
        id="area"
        type="number"
        label="Netto-Grundfläche (in m²)"
        placeholder="Netto-Grundfläche"
        v-model="usableSpace.value.value"
        disabled
      />
      <!-- TODO: no data for this field yet -->
      <FormInput
        id="usageTime"
        type="textarea"
        label="Allgemeine Nutzungszeit"
        placeholder="Allgemeine Nutzungszeit"
        v-model="usage.value.value"
        disabled
      />
      <div
        class="twin-building-details__actions"
        :class="{
          'twin-building-details__actions--hidden': !(formState.isChanged.value || formFocused),
        }"
      >
        <ButtonComponent text="Abbrechen" type="reset" state="secondary" />
        <ButtonComponent
          text="Speichern"
          type="submit"
          state="primary"
          disabled
          title="Coming soon"
        />
      </div>
    </form>
    <div class="twin-building-details__input-group">
      <p>Planungsdaten</p>
      <div class="twin-building-details__files">
        <FileEntry v-for="file in dummyFiles" :key="file.fileName" :file-name="file.fileName" />
        <FileInput
          id="files"
          accepts="image/*"
          emitOnly
          @update:fileList="uploadFiles"
          disabled
          title="Coming soon"
        />
      </div>
    </div>
  </div>
  <InterceptionModal
    :isOpen="leavePageInterception.isOpen.value"
    @cancel="leavePageInterception.abortAction"
    @confirm="leavePageInterception.confirmAction"
  />
</template>

<script lang="ts">
// Library imports
import type { PropType } from 'vue';

// Hook imports
import { useInput } from '@/hooks/useInput';
import { useFormManager } from '@/hooks/useFormManager';
import { useModalInterception } from '@/hooks/useModalInterception';
import { usePageLeaveInterception } from '@/hooks/usePageLeaveInteception';

// Component imports
import BuildingCardPreview from '@/assets/BuildingCardPreview.svg';
import FileEntry from '@/components/general/FileEntry.vue';
import FormInput from '@/components/general/forms/FormInput.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import FileInput from '@/components/general/forms/FileInput.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';

// Type imports
import { IconTypes } from '@/types/enums/IconTypes';
import type { Building } from '@/types/global/building/Building';

export default {
  components: {
    FileEntry,
    FormInput,
    ButtonComponent,
    FileInput,
    InterceptionModal,
  },
  props: {
    /**
     * The name of the building.
     */
    buildingName: {
      type: String as PropType<string>,
      required: true,
    },
    /**
     * Detailed data of the building.
     */
    building: {
      type: Object as PropType<Building>,
      required: true,
    },
  },
  setup(props) {
    const usableSpace = useInput<string>([], props.building.data.usableSpace.toString());
    const usage = useInput<string>([], '');

    const formState = useFormManager([usableSpace, usage]);

    const leavePageInterception = useModalInterception();

    usePageLeaveInterception(formState.isChanged, leavePageInterception.interceptAction);

    return {
      usableSpace,
      usage,
      formState,
      leavePageInterception,
    };
  },
  data() {
    return {
      BuildingCardPreview,
      IconTypes,
      // TODO: get actual files
      dummyFiles: [
        {
          fileName: 'gebäude-plan.pdf',
          url: 'test',
        },
        {
          fileName: 'Energieausweis.pdf',
          url: 'test',
        },
      ],
      // TODO: handle focus properly, when one looses focus and another one gets
      // it, the state flaps
      formFocused: false,
    };
  },
  methods: {
    async uploadFiles(files: File[]) {
      // TODO: implement actual file upload
      const uploadResult = await new Promise<{
        fileName: string;
        url: string;
      }>((resolve) => {
        setTimeout(() => {
          resolve({
            fileName: files[0].name,
            url: 'test',
          });
        }, 250);
      });

      this.dummyFiles.push(uploadResult);
    },
    closeAndResetForm() {
      this.formState.reset();
      this.formFocused = false;
    },
  },
};
</script>

<style scoped lang="scss">
.twin-building-details {
  display: flex;
  flex-direction: column;
  gap: $m;

  &__preview {
    width: 100%;
    aspect-ratio: 4 / 5;
    padding: $xxxl;
    background-color: $lightest;
    border-radius: $border-radius;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    width: 100%;
  }

  &__info {
    display: flex;
    flex-flow: column;
    gap: $xxs;
  }

  &__files {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }

  &__actions {
    display: flex;
    gap: $xxs;
    justify-content: flex-end;

    &--hidden {
      opacity: 0;
      user-select: none;
    }
  }
}

h4 {
  @include content-subtitle;
}

p {
  @include content;
}
</style>
