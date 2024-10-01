<template>
  <ModalOverlay :isOpen="isCommentsModalOpen" @close="closeMetricsModal">
    <template #header>
      <div id="comments-modal-overlay__header">
        <h3>Kommentare für "@TODO insert kpi name"</h3>
        <p>in der Liegenschaft "@TODO insert site name"</p>
        <p>vom @TODO insert Date & Time here</p>
      </div>
    </template>
    <template #body>
      <p
        v-if="!comments.length"
        id="comments-modal-overlay__body__text">
        Es gibt keine Kommentare für den gewählten Zeitraum.
        Ändern Sie den Zeitraum oder fügen Sie einen neuen Kommentar hinzu.
      </p>
      <div
        v-else
        id="comments-modal-overlay__body__comments">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="comment">
          <p>
            <span>{{ comment.startDate }}</span>
            <span v-if="comments.endDate"> - {{ comment.endDate }}</span>
          </p>
          <p>{{ comment.comment }}</p>
          <span class="comment__timestamp">verfasst von {{ comment.user }} am {{ comment.dateOfSubmission }}</span>
        </div>
      </div>

      <div id="comments-modal-overlay__body__form">
        <form action="submit">
          <h3 id="comments-modal-overlay__body__form__headline">Neuer Kommentar</h3>
          <div class="group">
            <NotesIcon />
            <textarea id="comment" placeholder="Kommentar zum Datenpunkt" />
          </div>
          <div class="date-inputs">
            <div class="group">
              <CalendarIcon />
              <input
                type="text"
                onfocus="(this.type='date')"
                onblur="(this.type='text')"
                id="start-date"
                placeholder="Startdatum"
                :value="getCurrentDate"
              />
              <p>bis</p>
            </div>
            <div class="group">
              <CalendarIcon />
              <input
                type="text"
                onfocus="(this.type='date')"
                onblur="(this.type='text')"
                id="end-date"
                placeholder="Enddatum"
              />
            </div>
          </div>
        </form>
      </div>
    </template>
    <template #footer>
      <ButtonComponent
        @click="submitComment"
        :primary="true"
        text="Kommentar hinzufügen"
        :icon="IconTypes.ADD" />
    </template>
  </ModalOverlay>
</template>

<script lang="ts">
import ModalOverlay from '@/components/general/ModalOverlay.vue';
import NotesIcon from '@/components/icons/NotesIcon.vue';
import CalendarIcon from '@/components/icons/CalendarIcon.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import { IconTypes } from '@/types/enums/IconTypes';

export default {
  components: {
    ModalOverlay,
    NotesIcon,
    CalendarIcon,
    ButtonComponent,
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
  },
  setup() {
    return {
      IconTypes,
    };
  },
  data() {
    return {
      comments: JSON.parse(window.localStorage.getItem('comment') || '[]'),
    };
  },
  computed: {
    getCurrentDate(): string {
      return new Date().toISOString().split('T')[0];
    },
  },
  methods: {
    closeMetricsModal() {
      this.$emit('close');
    },
    validateComment(comment: string, startDate: Date): boolean {
      // validate comment
      if (!comment) {
        // show error message
        return false;
      }
      // validate start date
      if (!startDate) {
        // show error message
        return false;
      }
      return true;
    },
    submitComment(): void {
      // reference the comment
      const comment = document.getElementById('comment') as HTMLInputElement;
      // reference the start date
      const startDate = document.getElementById('start-date') as HTMLInputElement;
      // reference the end date
      const endDate = document.getElementById('end-date') as HTMLInputElement;
      // add a unique id to the comment using hash function
      const id: number = Math.floor(Math.random() * 1000000);
      const user: string = window.localStorage.getItem('CognitoIdentityServiceProvider.72jdgrgeu89hiqvmaciibrdi4.LastAuthUser') || 'User'; // @TODO get user from backend
      const dateOfSubmission = new Date().toISOString().split('T')[0];

      if (!this.validateComment(
        comment.value,
        new Date(startDate.value),
      )) {
        return;
      }

      // when comment is submitted, write it to JSON file
      const comments = JSON.parse(window.localStorage.getItem('comment') || '[]');
      const submittedComment = {
        id,
        comment: comment.value,
        startDate: startDate.value,
        endDate: endDate.value,
        user,
        dateOfSubmission,
      };

      comments.push(submittedComment);

      // clear the form
      comment.value = '';
      startDate.value = '';
      endDate.value = '';

      // @TODO handle submission to backend in future implementations
      // check local storage for comments
      window.localStorage.setItem('comment', JSON.stringify(comments));
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

    &__comments {
      display: flex;
      flex-direction: column;
      gap: $xxs;

      .comment {
        background-color: $background;
        display: flex;
        flex-direction: column;
        gap: $base-size;
        padding: $s;
        border-radius: $border-radius;

        p {
          @include content;
          span {
            @include meta-information;
            font-weight: bold;
          }
        }
        &__timestamp {
          margin-top: $xxs;
          @include meta-information;
          text-align: end;
          font-weight: bold;
        }
      }
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

          svg {
            position: absolute;
            left: $base-size;
            top: $base-size;
          }

          textarea {
            // focus textarea right after icon
            width: 100%;
            padding: $base-size;
            border: 1px solid $light-purple;
            border-radius: $border-radius;
            min-height: $xxxl;
            padding-left: $l;

            &::placeholder {
              color: $light-purple;
            }
            &:focus {
              outline: none;
            }
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
