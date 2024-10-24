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
    <!-- TODO: Styling of Label is off -->
    <FormInput
      id="newComment"
      label="Kommentar hinzufügen"
      placeholder="Nachricht"
      :required="true"
      type="textarea"
      model-value=""
      icon="notes"
    />
  </div>
  <ButtonComponent
    text="Kommentar hinzufügen"
    :primary="true"
    :icon="IconTypes.ADD"
    class="add-comment-button"
  />
</template>

<script lang="ts">
import { IconTypes } from '@/types/enums/IconTypes';
import type { Annotation } from '@/types/global/kpi/Kpi';

import CommentsWrapper from '@/components/general/comments/CommentsWrapper.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import FormInput from '@/components/general/forms/FormInput.vue';

export default {
  components: {
    CommentsWrapper,
    FormInput,
    ButtonComponent,
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
  },
  computed: {
    currentComments() {
      return this.comments.slice(0, this.commentCount);
    },
  },
  setup() {
    return {
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
