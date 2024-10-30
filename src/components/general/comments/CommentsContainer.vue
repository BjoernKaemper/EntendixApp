<template>
  <div class="subgrid--left--comments" v-if="comments.length">
    <h4>Kommentare</h4>
    <CommentsWrapper :comments="currentComments" />
    <button
      v-if="commentCount < comments.length"
      @click="fetchMoreComments"
      type="button"
      class="subgrid--left--fetchmore"
    >
      weitere laden...
    </button>
  </div>
  <div>
    <form ref="form" @submit.prevent="handleSubmit">
      <!-- TODO: Styling of Label is off -->
      <FormInput
        id="comment"
        icon="notes"
        type="textarea"
        label="Kommentar hinzufügen"
        placeholder="Nachricht"
        :hasError="!newComment.isValid && formState.showErrors.value"
        :error-message="formState.showErrors.value ? newComment.errorMessage.value : undefined"
        v-model="newComment.value.value"
        required
        :rows="3"
      />
    </form>
  </div>
  <ButtonComponent
    type="submit"
    @click="submitForm"
    text="Kommentar hinzufügen"
    state="primary"
    :icon="IconTypes.ADD"
    class="add-comment-button"
    title="Coming soon"
    disabled
  />
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
import { IconTypes } from '@/types/enums/IconTypes';
import type { Annotation } from '@/types/global/kpi/Kpi';

// Helper imports
import { requiredValidator } from '@/helpers/FormValidators';

// Component imports
import CommentsWrapper from '@/components/general/comments/CommentsWrapper.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import FormInput from '@/components/general/forms/FormInput.vue';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';

export default {
  components: {
    CommentsWrapper,
    FormInput,
    ButtonComponent,
    InterceptionModal,
  },

  props: {
    comments: {
      type: Array as () => Annotation[], // Add the Comment type to the type annotation
      required: true,
    },
  },
  data() {
    return {
      commentCount: 0,
    };
  },
  created() {
    this.commentCount = this.comments.length >= 2 ? 2 : this.comments.length;
  },
  methods: {
    fetchMoreComments() {
      this.commentCount =
        this.commentCount + 2 >= this.comments.length
          ? this.commentCount + 2
          : this.comments.length;
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
        return;
      }

      this.interceptLeave.interceptAction(
        () => {
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

      const user: string =
        window.localStorage.getItem(
          'CognitoIdentityServiceProvider.72jdgrgeu89hiqvmaciibrdi4.LastAuthUser',
        ) || 'User'; // @TODO get user from backend
      const dateOfSubmission = new Date().toISOString().split('T')[0];

      // TODO: submit properly
      const body = new FormData();
      body.append('comment', this.newComment.value.value);
      body.append('user', user);
      body.append('dateOfSubmission', dateOfSubmission);
    },
  },
  computed: {
    currentComments() {
      return this.comments.slice(0, this.commentCount);
    },
  },
  setup() {
    const newComment = useInput<string>([requiredValidator], '');

    const formState = useFormManager([newComment]);
    const interceptLeave = useModalInterception();

    usePageLeaveInterception(formState.isChanged, interceptLeave.interceptAction);

    return {
      newComment,
      formState,
      interceptLeave,
      IconTypes,
    };
  },
};
</script>

<style lang="scss">
.subgrid {
  gap: $m;

  &--left {
    display: flex;
    flex-direction: column;
    gap: $xxs;

    &--header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: $m;
    }

    &--comments {
      display: flex;
      flex-direction: column;
      gap: $xxs;
    }

    &--fetchmore {
      @include meta-information;
      cursor: pointer;
      text-align: center;
    }

    .add-comment-button {
      margin-left: auto;
    }
  }
}

h4 {
  @include section-headline;
}

p,
li {
  @include content;
}
</style>
