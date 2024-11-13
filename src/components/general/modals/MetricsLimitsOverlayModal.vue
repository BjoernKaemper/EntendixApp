<template>
  <ModalOverlay :isOpen="isMetricsModalOpen" @close="handleClose">
    <template #header>
      <h2>{{ modalTitle }}</h2>
    </template>
    <template #body>
      <p>
        {{ modalDescription }}
      </p>
      <form action="submit">
        <h3>Einstellung der Grenzwerte</h3>
        <div class="group">
          <input
            type="radio"
            id="norm1"
            value="norm1"
            name="values"
            v-model="selectedOption.value.value"
          />
          <label for="norm1">Norm für Bürogebäude</label>
          <button
            type="button"
            @click="toggleInfoNorm1()"
            class="infoButton"
            disabled
            title="Coming soon"
          >
            <MaterialSymbol :symbol="IconTypes.INFO_CIRCLE" />
          </button>
        </div>
        <div v-if="info1Open">TODO: INFO</div>
        <div class="group">
          <input
            type="radio"
            id="norm2"
            value="norm2"
            name="values"
            v-model="selectedOption.value.value"
          />
          <label for="norm2">Norm XYZ korrigiert nach Historie</label>
          <button
            type="button"
            @click="toggleInfoNorm2()"
            class="infoButton"
            disabled
            title="Coming soon"
          >
            <MaterialSymbol :symbol="IconTypes.INFO_CIRCLE" />
          </button>
        </div>
        <div v-if="info2Open">TODO: INFO</div>
        <div class="group">
          <input
            type="radio"
            id="custom"
            value="custom"
            name="values"
            v-model="selectedOption.value.value"
          />
          <label for="custom">Eigene Werte</label>
        </div>
        <div v-if="selectedOption.value.value === 'custom'" class="options">
          <div class="options--option">
            <label for="critical">Grenzwert "Krtisch"</label>
            <IconChip :status="ChipStatusTypes.ERROR" size="small" />
            <FormInput
              id="critical"
              placeholder="???"
              align="right"
              :required="true"
              type="number"
              v-model="criticalValueInput.value.value"
              :has-error="!criticalValueInput.isValid && formState.showErrors.value"
              :error-message="
                formState.showErrors.value ? criticalValueInput.errorMessage.value : undefined
              "
              class="input-width"
            />
            <p class="unit">{{ unit }}</p>
          </div>
          <div class="options--option">
            <label for="warning">Grenzwert "Achtung"</label>
            <IconChip :status="ChipStatusTypes.WARNING" size="small" />
            <FormInput
              id="warning"
              v-model="warningValue"
              align="right"
              :required="true"
              type="text"
              :disabled="true"
              class="input-width"
            />
            <p class="unit">{{ unit }}</p>
          </div>
          <div class="options--option">
            <label for="good">Grenzwert "In Ordnung"</label>
            <IconChip :status="ChipStatusTypes.SUCCESS" size="small" />
            <FormInput
              id="good"
              placeholder="???"
              align="right"
              :required="true"
              type="number"
              v-model="goodValueInput.value.value"
              :has-error="!goodValueInput.isValid && formState.showErrors.value"
              :error-message="
                formState.showErrors.value ? goodValueInput.errorMessage.value : undefined
              "
              class="input-width"
            />
            <p class="unit">{{ unit }}</p>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <ButtonComponent text="Abbrechen" @click="handleClose" state="secondary" />
      <ButtonComponent
        type="submit"
        text="Akzeptieren"
        state="primary"
        :icon="IconTypes.CHECK_MARK"
        @click="submitForm"
        disabled
        title="Coming soon"
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
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';
import { IconTypes } from '@/types/enums/IconTypes';

// Component imports
import IconChip from '@/components/general/IconChip.vue';
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import FormInput from '@/components/general/forms/FormInput.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';

// Helper imports
import { requiredValidator } from '@/helpers/FormValidators';

export default {
  components: {
    ModalOverlay,
    MaterialSymbol,
    IconChip,
    FormInput,
    InterceptionModal,
    ButtonComponent,
  },
  props: {
    /**
     * The state of the metrics modal.
     * @type {boolean}
     * @default false
     */
    isMetricsModalOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
    /**
     * The title of the modal.
     * @type {string}
     * @required
     */
    modalTitle: {
      type: String,
      required: true,
    },
    /**
     * The description of the modal.
     * @type {string}
     * @required
     */
    modalDescription: {
      type: String,
      required: true,
    },
    /**
     * Current Value critical
     * @type {number}
     * @required
     */
    criticalValue: {
      type: Number,
      required: true,
    },
    /**
     * Current Value good
     * @type {number}
     * @required
     */
    goodValue: {
      type: Number,
      required: true,
    },
    /**
     * The unit of the metric
     * @type {string}
     * @required
     */
    unit: {
      type: String,
      required: true,
      default: '???',
    },
  },
  emits: ['close'],
  data() {
    return {
      showOptions: false,
      info1Open: false,
      info2Open: false,
    };
  },
  setup(props) {
    const selectedOption = useInput<string>([requiredValidator], '');
    // TODO: Need Validators to check if the selected option is custom
    const goodValueInput = useInput<string>([], props.goodValue.toString());
    const criticalValueInput = useInput<string>([], props.criticalValue.toString());

    const formState = useFormManager([selectedOption, goodValueInput, criticalValueInput]);
    const interceptLeave = useModalInterception();

    usePageLeaveInterception(formState.isChanged, interceptLeave.interceptAction);

    return {
      ChipStatusTypes,
      IconTypes,
      selectedOption,
      goodValueInput,
      criticalValueInput,
      formState,
      interceptLeave,
    };
  },
  computed: {
    warningValue(): string {
      return `${this.goodValueInput.value.value} - ${this.criticalValueInput.value.value}`;
    },
  },
  methods: {
    toggleInfoNorm1() {
      this.info1Open = !this.info1Open;
      this.info2Open = false;
    },
    toggleInfoNorm2() {
      this.info2Open = !this.info2Open;
      this.info1Open = false;
    },
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

      this.interceptLeave.interceptAction(
        () => {
          this.$emit('close');
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
      body.append('selectedOption', this.selectedOption.value.value);
      body.append('goodValue', this.goodValueInput.value.value);
      body.append('criticalValue', this.criticalValueInput.value.value);
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: $xxs;

  .group {
    display: flex;
    gap: $xxs;
    align-items: center;

    > span {
      cursor: pointer;

      > * > * {
        fill: $light-purple;
      }
    }
    > .infoButton {
      display: flex;
      align-items: center;
      padding: 0;
    }
  }

  .options {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    gap: $xxs;
    margin-top: $s;

    .options--option {
      display: flex;
      align-items: center;
      gap: $xxs;

      .input-width {
        max-width: 100px;
      }

      & > .unit {
        color: $dark-purple;
      }
    }
  }
}
</style>
