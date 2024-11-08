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
        <form class="aggregate-modal__section" ref="form" @submit.prevent="console.log('TODO')">
          <h6>Informationen anpassen</h6>
          <FormInput
            id="aggregate-name"
            label="Bezeichnung des Aggregats"
            placeholder="Bezeichnung des Aggregats"
            v-model="name.value.value"
            :hasError="!name.isValid && formState.showErrors.value"
            :error-message="formState.showErrors.value ? name.errorMessage.value : undefined"
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
        <section class="aggregate-modal__section">
          <h6>Funktionen nach BACnet & BACtwin</h6>
          <table class="aggregate-modal__table" cellspacing="0">
            <thead>
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
                <th>Funktion</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </section>
      </div>
    </template>
    <template #footer>
      <ButtonComponent text="Abbrechen" @click="handleClose" state="secondary" />
      <ButtonComponent
        type="submit"
        text="Bestätigen"
        state="primary"
        icon="check"
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
// Store imports
import { useAggregateStore } from '@/store/aggregate';

// Library imports
import type { PropType } from 'vue';

// Hook imports
import { useInput } from '@/hooks/useInput';
import { useFormManager } from '@/hooks/useFormManager';
import { useModalInterception } from '@/hooks/useModalInterception';
import { usePageLeaveInterception } from '@/hooks/usePageLeaveInteception';

// Component imports
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import type { Aggregate } from '@/types/global/aggregate/Aggregate';
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';
import FileInput from '@/components/general/forms/FileInput.vue';
import FormInput from '@/components/general/forms/FormInput.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';
import AlertElement from '@/components/general/AlertElement.vue';

// Helper imports
import { requiredValidator } from '@/helpers/FormValidators';

// Data import
import { AlertMessages } from '@/assets/json/AlertMessages';

export interface AggregateModalData {
  aggregateId: string;
  aggregateName: string;
  mediumName: string;
  moduleName: string;
  plantName: string;
  subSectionName: string;
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

    const name = useInput([requiredValidator], props.data.aggregateName);
    const floor = useInput([], '');
    const room = useInput([], '');

    const formState = useFormManager([name, floor, room]);

    const interceptLeave = useModalInterception();

    usePageLeaveInterception(formState.isChanged, interceptLeave.interceptAction);

    return {
      name,
      floor,
      room,
      formState,
      aggregateStore,
      interceptLeave,
    };
  },
  data() {
    return {
      aggregateLoading: false,
      loadingError: false,
      aggregate: null as null | Aggregate,
      AlertMessages,
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
}

h5 {
  @include content-subtitle;
  color: $dark-purple;
}

h6 {
  @include section-headline;
}
</style>
