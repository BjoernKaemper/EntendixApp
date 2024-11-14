<template>
  <ModalOverlay :isOpen="isCommentsModalOpen" @close="handleClose">
    <template #header>
      <div id="comments-modal-overlay__header">
        <h3>Kommentare für "{{ commentName }}"</h3>
        <p>in {{ commentType }} "{{ commentIn }}"</p>
        <p>
          vom {{ DateHelper.prettierDate(startDate, false) }} bis
          {{ DateHelper.prettierDate(endDate, false) }}
        </p>
      </div>
    </template>
    <template #body>
      <p v-if="!comments.length" id="comments-modal-overlay__body__text">
        Es gibt keine Kommentare für den gewählten Zeitraum. Ändern Sie den Zeitraum oder fügen Sie
        einen neuen Kommentar hinzu.
      </p>
      <div v-else id="comments-modal-overlay__body__comments">
        <CommentsWrapper :comments="comments" :lightBackground="false" />
      </div>

      <div id="comments-modal-overlay__body__form">
        <form ref="form" @submit.prevent="handleSubmit">
          <h3 id="comments-modal-overlay__body__form__headline">Neuer Kommentar</h3>
          <div class="group">
            <FormInput
              id="comment"
              :icon="IconTypes.NOTE"
              type="textarea"
              placeholder="Kommentar zum Datenpunkt"
              :hasError="!newComment.isValid && formState.showErrors.value"
              :error-message="
                formState.showErrors.value ? newComment.errorMessage.value : undefined
              "
              v-model="newComment.value.value"
              required
              :rows="3"
            />
          </div>
          <div class="date-inputs">
            <div class="group">
              <FormInput
                id="start-date"
                :icon="IconTypes.CALENDAR"
                type="date"
                placeholder="Startdatum"
                :value="getCurrentDate"
                :hasError="!startDateInput.isValid && formState.showErrors.value"
                :error-message="
                  formState.showErrors.value ? startDateInput.errorMessage.value : undefined
                "
                v-model="startDateInput.value.value"
                required
              />
              <p>bis</p>
            </div>
            <div class="group">
              <FormInput
                id="end-date"
                :icon="IconTypes.CALENDAR"
                type="date"
                placeholder="Enddatum"
                :hasError="!endDateInput.isValid && formState.showErrors.value"
                :error-message="
                  formState.showErrors.value ? endDateInput.errorMessage.value : undefined
                "
                v-model="endDateInput.value.value"
              />
            </div>
          </div>
        </form>
      </div>
    </template>
    <template #footer>
      <ButtonComponent
        type="submit"
        @click="submitForm"
        state="primary"
        text="Kommentar hinzufügen"
        :icon="IconTypes.ADD"
        title="Coming soon"
        disabled
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
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';

// Hook imports
import { useInput } from '@/hooks/useInput';
import { useFormManager } from '@/hooks/useFormManager';
import { useModalInterception } from '@/hooks/useModalInterception';
import { usePageLeaveInterception } from '@/hooks/usePageLeaveInteception';

// Type imports
import { IconTypes } from '@/types/enums/IconTypes';
import { ModuleTypes } from '@/types/enums/ModuleTypes';
import type { Annotation } from '@/types/global/kpi/Kpi';

// Helper imports
import DateHelper from '@/helpers/DateHelper';
import { requiredValidator } from '@/helpers/FormValidators';

// Component imports
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import CommentsWrapper from '@/components/general/comments/CommentsWrapper.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';
import FormInput from '@/components/general/forms/FormInput.vue';

export default {
  components: {
    ModalOverlay,
    ButtonComponent,
    CommentsWrapper,
    InterceptionModal,
    FormInput,
  },
  props: {
    /**
     * The state of the comments modal.
     * @type {boolean}
     * @required
     * @default false
     */
    isCommentsModalOpen: {
      type: Boolean,
      required: true,
    },
    /**
     * The name of the thing for which the comment is, e.g. "Energieverbrauch"
     * @type {string}
     * @required
     */
    commentName: {
      type: String,
      required: true,
    },
    /**
     * The type of the module where the thing which has the comments is in, e.g. "Gebäude"
     * @type {ModuleTypes}
     * @required
     */
    commentType: {
      type: String as () => ModuleTypes,
      required: true,
    },
    /**
     * The name of the module where the comment is in, e.g. "Gebäude 1"
     * @type {string}
     * @required
     */
    commentIn: {
      type: String,
      required: true,
    },
    /**
     * The start date of the comment period.
     * @type {string}
     * @required
     */
    startDate: {
      type: String,
      required: true,
    },
    /**
     * The end date of the comment period.
     * @type {string}
     * @required
     */
    endDate: {
      type: String,
      required: true,
    },
    /**
     * The comments for the selected period.
     * @type {Array<Annotation>}
     * @default []
     */
    comments: {
      type: Array<Annotation>,
      default: () => [],
    },
  },
  emits: ['close'],
  setup() {
    const newComment = useInput<string>([requiredValidator], '');
    const startDateInput = useInput<string>([requiredValidator], '');
    const endDateInput = useInput<string>([], '');

    const formState = useFormManager([newComment, startDateInput, endDateInput]);
    const interceptLeave = useModalInterception();

    usePageLeaveInterception(formState.isChanged, interceptLeave.interceptAction);

    return {
      IconTypes,
      DateHelper,
      newComment,
      startDateInput,
      endDateInput,
      formState,
      interceptLeave,
    };
  },
  computed: {
    ...mapStores(useGeneralStore),
    getCurrentDate(): string {
      return new Date().toISOString().split('T')[0];
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
    async handleSubmit() {
      if (!this.formState.isValid.value) {
        this.formState.showErrors.value = true;
        return;
      }

      const user: string = await this.generalStore.getUserId();
      const dateOfSubmission = new Date().toISOString().split('T')[0];

      // TODO: submit properly
      const body = new FormData();
      body.append('comment', this.newComment.value.value);
      body.append('startDate', this.startDateInput.value.value);
      body.append('endDate', this.endDateInput.value.value);
      body.append('user', user);
      body.append('dateOfSubmission', dateOfSubmission);
    },
    deleteComment(id: string): void {
      // @TODO handle deletion of comment
      // eslint-disable-next-line no-console
      console.log('delete comment with id:', id);
    },
  },
};
</script>

<style lang="scss" scoped>
#comments-modal-overlay {
  // header styles
  &__header {
    color: $dark-purple;
    & h3 {
      @include content-subtitle;
    }
    & p {
      @include content;
    }
  }

  // body styles
  &__body {
    &__text {
      @include meta-information;
      text-align: center;
      max-width: 70%;
      margin: 0 auto;
      padding: $m 0;
    }
    // form styles
    &__form {
      &__headline {
        @include section-headline;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: $xxs;

        .group {
          display: flex;
          flex-direction: row;
          gap: $xxs;
          align-items: center;
          position: relative;
          width: 100%;

          span {
            position: absolute;
            left: $base-size;
            top: $base-size;
          }

          input {
            width: 100%;
            padding: $base-size;
            border: 1px solid $light-purple;
            border-radius: $border-radius;
            padding-left: $l;
            &::placeholder {
              color: $light-purple;
            }
            &:focus {
              outline: none;
              font-size: $xs;
            }
          }
        }

        .date-inputs {
          display: flex;
          gap: $xxs;
        }
      }
    }
  }
}
</style>
