<template>
  <ModalOverlay :isOpen="isCommentsModalOpen">
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
        <form action="submit">
          <h3 id="comments-modal-overlay__body__form__headline">Neuer Kommentar</h3>
          <div class="group">
            <MaterialSymbol :symbol="IconTypes.NOTE" />
            <textarea id="comment" placeholder="Kommentar zum Datenpunkt" />
          </div>
          <div class="date-inputs">
            <div class="group">
              <MaterialSymbol :symbol="IconTypes.CALENDAR" />
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
              <MaterialSymbol :symbol="IconTypes.CALENDAR" />
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
        :icon="IconTypes.ADD"
      />
    </template>
  </ModalOverlay>
</template>

<script lang="ts">
import { IconTypes } from '@/types/enums/IconTypes';
import { ModuleTypes } from '@/types/enums/ModuleTypes';
import type { Annotation } from '@/types/global/kpi/Kpi';
import DateHelper from '@/helpers/DateHelper';

import ButtonComponent from '@/components/general/ButtonComponent.vue';
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import CommentsWrapper from '@/components/general/comments/CommentsWrapper.vue';

export default {
  components: {
    ModalOverlay,
    ButtonComponent,
    MaterialSymbol,
    CommentsWrapper,
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
  setup() {
    return {
      IconTypes,
      DateHelper,
    };
  },
  computed: {
    getCurrentDate(): string {
      return new Date().toISOString().split('T')[0];
    },
  },
  methods: {
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
      const user: string =
        window.localStorage.getItem(
          'CognitoIdentityServiceProvider.72jdgrgeu89hiqvmaciibrdi4.LastAuthUser'
        ) || 'User'; // @TODO get user from backend
      const dateOfSubmission = new Date().toISOString().split('T')[0];

      if (!this.validateComment(comment.value, new Date(startDate.value))) {
        // TODO: show error message
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
