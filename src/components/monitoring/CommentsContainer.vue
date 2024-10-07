<template>
  <div
    class="subgrid--left--comments"
    v-if="comments"
  >
    <h4>Kommentare</h4>
    <CommentsWrapper
      :comments="comments"
    />
    <button
      type="button"
      class="subgrid--left--fetchmore"
    >
      weitere laden...
    </button>
  </div>
  <InputTextarea />
  <ButtonComponent
    text="Kommentar hinzufügen"
    :primary="true"
    :icon="IconTypes.ADD"
    class="add-comment-button"
  />
</template>

<script lang="ts">
import { IconTypes } from '@/types/enums/IconTypes';

import CommentsWrapper from '@/components/general/comments/CommentsWrapper.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import InputTextarea from '@/components/general/comments/InputTextarea.vue';
import type { Comment } from '@/types/Comment';

export default {
  components: {
    CommentsWrapper,
    InputTextarea,
    ButtonComponent,
  },

  props: {
    comments: {
      type: Array as () => Comment[], // Add the Comment type to the type annotation
      required: true,
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

p, li {
  @include content;
}

</style>
