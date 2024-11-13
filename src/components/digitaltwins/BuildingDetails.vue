<template>
  <div class="twin-building-details">
    <figure class="twin-building-details__preview">
      <SymbolImage
        :src="BuildingCardPreview"
        :alt="`Schema des Gebäudes ${buildingName}`"
        :use-aspect-ratio="false"
        class="twin-building-details__image"
      />
    </figure>
    <div class="twin-building-details__form-wrap">
      <div class="twin-building-details__updating" v-if="updateLoading">
        <LoadingSpinner size="large" />
      </div>
      <form
        class="twin-building-details__info"
        :class="{ 'twin-building-details__info--loading': updateLoading }"
        @submit.prevent="handleSubmit"
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
        />
        <!-- TODO: no data for this field yet -->
        <FormInput
          id="usageTime"
          type="textarea"
          :rows="2"
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
            :disabled="!formState.isChanged.value"
          />
        </div>
      </form>
    </div>
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

// Store imports
import { useBuildingStore } from '@/store/building';
import { mapStores } from 'pinia';
import { useGeneralStore } from '@/store/general';

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
import SymbolImage from '@/components/general/SymbolImage.vue';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';

// Type imports
import { IconTypes } from '@/types/enums/IconTypes';
import type {
  Building,
  BuildingUpdateData,
  FlatBuildingData,
} from '@/types/global/building/Building';
import type { EntendixInput } from '@/types/local/Inputs';

export default {
  components: {
    FileEntry,
    FormInput,
    ButtonComponent,
    FileInput,
    InterceptionModal,
    SymbolImage,
    LoadingSpinner,
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
    // TODO: extend with further inputs when in scope
    const inputs: {
      [key in keyof Pick<FlatBuildingData, 'usableSpace'>]: EntendixInput<string>;
    } = {
      usableSpace: useInput<string>([], props.building.data.usableSpace.toString()),
    };

    const usage = useInput<string>([], '');

    const formState = useFormManager([usage, ...Object.values(inputs)]);

    const leavePageInterception = useModalInterception();

    usePageLeaveInterception(formState.isChanged, leavePageInterception.interceptAction);

    return {
      usableSpace: inputs.usableSpace,
      usage,
      formState,
      leavePageInterception,
      inputs,
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
      updateLoading: false,
    };
  },
  computed: {
    ...mapStores(useBuildingStore, useGeneralStore),
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
    async handleSubmit() {
      if (!this.formState.isValid.value) {
        return;
      }

      this.updateLoading = true;

      const updatedData: BuildingUpdateData = {};

      Object.entries(this.inputs).forEach(([key, input]) => {
        if (input.isChanged.value) {
          // I am aware that casting to any is not ideal, but i have no other
          // solution right now as the original type defines props that are
          // either string or number but ts can't properly keep reference to the
          // actual type of the value via its key in the inputs object. If a
          // given value needs to be a number, the backend will handle the
          // conversion
          updatedData[key as keyof BuildingUpdateData] = input.value.value as any;
        }
      });

      this.buildingStore
        .updateBuilding(this.building.id, updatedData)
        .then((updateBuilding) => {
          // Update initial values of inputs with new data from backend
          Object.entries(updateBuilding.data).forEach(([key, value]) => {
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
              description: 'Das Gebäude wurde erfolgreich aktualisiert!',
            },
            true,
          );
        })
        .catch(() => {
          this.generalStore.addAlert({
            type: 'error',
            title: 'Fehler',
            description:
              'Das Gebäude konnte nicht aktualisiert werden. Bitte versuchen Sie es später erneut.',
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

  &__form-wrap {
    position: relative;
  }

  &__info {
    display: flex;
    flex-flow: column;
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
