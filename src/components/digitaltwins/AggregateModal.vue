<template>
  <ModalOverlay :isOpen="modelValue" @close="handleClose" size="large">
    <template #header>
      <h5>Aggregat "{{ data.aggregateName }}"</h5>
    </template>
    <template #body>
      <div v-if="aggregateLoading">
        <LoadingSpinner />
      </div>
      <AlertElement v-else-if="loadingError" :alert="AlertMessages.CANNOT_LOAD" :is-toast="false" />
      <div v-else-if="aggregate" class="aggregate-modal__content">
        <div class="aggregate-modal__updating" v-if="updateLoading">
          <LoadingSpinner size="large" />
        </div>
        <form
          class="aggregate-modal__section"
          :class="{ 'aggregate-modal__section--loading': updateLoading }"
          ref="form"
          @submit.prevent="handleSubmit"
        >
          <h6>Informationen anpassen</h6>
          <FormInput
            id="aggregate-name"
            label="Bezeichnung des Aggregats"
            placeholder="Bezeichnung des Aggregats"
            v-model="inputs.aggregateName.value.value"
            :hasError="!inputs.aggregateName.isValid && formState.showErrors.value"
            :error-message="
              formState.showErrors.value ? inputs.aggregateName.errorMessage.value : undefined
            "
          />
          <div class="aggregate-modal__input-group">
            <legend>Versorgender Bereich (optional)</legend>
            <div class="aggregate-modal__input-label-left">
              <label for="aggregate-name" class="aggregate-modal__label">Etage</label>
              <FormInput
                id="aggregate-floor"
                placeholder="Etage"
                v-model="floor.value.value"
                :hasError="!floor.isValid && formState.showErrors.value"
                :error-message="formState.showErrors.value ? floor.errorMessage.value : undefined"
                disabled
                title="Coming soon"
              />
              <label for="aggregate-room" class="aggregate-modal__label">Raum</label>
              <FormInput
                id="aggregate-room"
                placeholder="Raum"
                v-model="room.value.value"
                :hasError="!room.isValid && formState.showErrors.value"
                :error-message="formState.showErrors.value ? room.errorMessage.value : undefined"
                disabled
                title="Coming soon"
              />
            </div>
          </div>

          <FileInput
            id="file-upload"
            label="Technische Datenblätter (optional)"
            select-prompt="Schemata oder Grundrisse auswählen..."
            disabled
            title="Coming soon"
            accepts="image/*,.pdf"
          />
        </form>
        <section
          class="aggregate-modal__section"
          :class="{ 'aggregate-modal__section--loading': updateLoading }"
        >
          <h6>Funktionen nach BACnet & BACtwin</h6>
          <table class="aggregate-modal__table" cellspacing="0">
            <tr>
              <td colspan="2" class="aggregate-modal__table-sub-heading">BACnet</td>
              <td colspan="6" class="aggregate-modal__table-sub-heading">BACtwin</td>
            </tr>
            <tr>
              <th>Name</th>
              <th>Beschreibung</th>
              <th>Gewerk</th>
              <th>Anlage</th>
              <th>Baugruppe</th>
              <th>Medium</th>
              <th>Aggregat</th>
              <th>
                Funktion
                <MaterialSymbol
                  symbol="info"
                  size="small"
                  class="aggregate-modal__function-info"
                  v-tooltip="
                    'In einer zukünftigen Version wird es möglich sein, die erkannte Funktion manuell anzupassen.'
                  "
                />
              </th>
            </tr>
            <tr
              v-for="dataPoint in aggregate.data.dataPoints"
              :key="dataPoint.dataPoint?.objectIdentifier"
            >
              <td class="aggregate-modal__data-name">{{ dataPoint.dataPoint?.objectName }}</td>
              <td>{{ dataPoint.dataPoint?.description }}</td>
              <td>{{ data.subSectionName }}</td>
              <td>{{ data.plantName }}</td>
              <td>{{ data.moduleName }}</td>
              <td>{{ data.mediumName }}</td>
              <td>{{ data.aggregateName }}</td>
              <td>{{ dataPoint.description.de }}</td>
            </tr>
          </table>
        </section>
      </div>
    </template>
    <template #footer>
      <template v-if="formState.isChanged.value">
        <ButtonComponent text="Abbrechen" @click="handleClose" state="secondary" />
        <ButtonComponent
          type="submit"
          text="Bestätigen"
          state="primary"
          icon="check"
          @click="submitForm"
        />
      </template>
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
// Store imports
import { useAggregateStore } from '@/store/aggregate';
import { useGeneralStore } from '@/store/general';

// Library imports
import type { PropType } from 'vue';

// Hook imports
import { useInput } from '@/hooks/useInput';
import { useFormManager } from '@/hooks/useFormManager';
import { useModalInterception } from '@/hooks/useModalInterception';
import { usePageLeaveInterception } from '@/hooks/usePageLeaveInteception';

// Component imports
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import type { Aggregate, AggregateUpdateData } from '@/types/global/aggregate/Aggregate';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';
import FileInput from '@/components/general/forms/FileInput.vue';
import FormInput from '@/components/general/forms/FormInput.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';
import AlertElement from '@/components/general/AlertElement.vue';
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

// Helper imports
import { requiredValidator } from '@/helpers/FormValidators';

// Data import
import { AlertMessages } from '@/assets/json/AlertMessages';

// Type imports
import type { EntendixInput } from '@/types/local/Inputs';

export interface AggregateModalData {
  aggregateId: string;
  aggregateName: string;
  mediumName: string;
  moduleName: string;
  plantName: string;
  subSectionName: string;
  refetchModule: () => Promise<void>;
}

export default {
  name: 'AggregateModal',
  components: {
    ModalOverlay,
    LoadingSpinner,
    FileInput,
    FormInput,
    ButtonComponent,
    InterceptionModal,
    AlertElement,
    MaterialSymbol,
  },
  props: {
    /**
     * All required data to display current aggregate in the modal.
     */
    data: {
      type: Object as PropType<AggregateModalData>,
      required: true,
    },
    /**
     * Wether or not the modal is visible.
     */
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    'update:modelValue': (() => true) as (value: boolean) => void,
  },
  setup(props) {
    const aggregateStore = useAggregateStore();
    const generalStore = useGeneralStore();

    const inputs: {
      [key in keyof Pick<Required<AggregateUpdateData>, 'aggregateName'>]: EntendixInput<string>;
    } = {
      aggregateName: useInput([requiredValidator], props.data.aggregateName),
    };

    const floor = useInput([], '');
    const room = useInput([], '');

    const formState = useFormManager([floor, room, ...Object.values(inputs)]);

    const interceptLeave = useModalInterception();

    usePageLeaveInterception(formState.isChanged, interceptLeave.interceptAction);

    return {
      name: inputs.aggregateName,
      floor,
      room,
      formState,
      aggregateStore,
      interceptLeave,
      inputs,
      generalStore,
    };
  },
  data() {
    return {
      aggregateLoading: false,
      loadingError: false,
      aggregate: null as null | Aggregate,
      AlertMessages,
      updateLoading: false,
    };
  },
  watch: {
    aggregateId: {
      handler() {
        if (!this.data.aggregateId) {
          return;
        }

        this.aggregateLoading = true;
        this.aggregateStore
          .getAggregate(this.data.aggregateId)
          .then((aggregate) => {
            this.aggregate = aggregate;
          })
          .catch(() => {
            this.loadingError = true;
          })
          .finally(() => {
            this.aggregateLoading = false;
          });
      },
      immediate: true,
    },
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
        return;
      }

      this.updateLoading = true;

      const updateData: AggregateUpdateData = {};

      Object.entries(this.inputs).forEach(([key, input]) => {
        if (input.isChanged.value) {
          updateData[key as keyof AggregateUpdateData] = input.value.value;
        }
      });

      this.aggregateStore
        .updateAggregate(this.data.aggregateId, updateData)
        .then((updatedAggregate) => {
          // Update initial values of inputs with new data from backend
          Object.entries(updatedAggregate.data).forEach(([key, value]) => {
            if (this.inputs[key as keyof typeof this.inputs]) {
              this.inputs[key as keyof typeof this.inputs].updateInitialValue(value);
            }
          });

          // Communicate success to user
          this.formState.reset();
          this.generalStore.addAlert(
            {
              type: 'success',
              title: 'Änderungen gespeichert',
              description: 'Das Aggregat wurde erfolgreich aktualisiert!',
            },
            true,
          );

          // Refetch module this aggregate belongs to. Don't do anything on
          // failure as partial error will be displayed anyways
          this.data.refetchModule();
        })
        .catch(() => {
          this.generalStore.addAlert({
            type: 'error',
            title: 'Fehler',
            description:
              'Das Aggregat konnte nicht aktualisiert werden. Bitte versuchen Sie es später erneut.',
          });
        })
        .finally(() => {
          this.updateLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.aggregate-modal {
  &__content {
    display: flex;
    flex-direction: column;
    gap: $m;
  }

  &__table {
    width: 100%;
    table-layout: fixed;

    & th {
      text-align: left;
      border-bottom: 1px solid $light-purple;
      padding: $xxxs $xxs $xxxs 0;
    }

    & td:not(&-sub-heading) {
      word-break: break-word;
      border-bottom: 1px solid $light-purple-20;
      padding: $xxxs $xxs $xxxs 0;
    }
  }

  &__data-name {
    font-family: $font-family-mono;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: $xxs;

    &--loading {
      opacity: 0.6;
    }
  }

  &__input-group {
    border: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: $xxxs;
  }

  &__input-label-left {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: $xxxs $xxs;
  }

  &__label {
    @include content;
    min-width: 50px;
    display: flex;
    align-items: center;
  }

  &__function-info {
    cursor: pointer;
    vertical-align: middle;
  }

  &__updating {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
}

h5 {
  @include content-subtitle;
  color: $dark-purple;
}

h6 {
  @include section-headline;
}
</style>
