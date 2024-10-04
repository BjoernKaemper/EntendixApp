<template>
  <div class="comments-wrapper">
    <CommentComponent
      v-for="comment in comments"
      :key="comment.id"
      :user="comment.user"
      :body="comment.body"
      :date="comment.date"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { Comment } from '@/types/Comment';
import CommentComponent from './CommentComponent.vue';

export default {
  components: {
    CommentComponent,
  },
  props: {
    /**
     * The comments to display
     * @type {Array}
     * @required
     */
    comments: {
      type: Array as PropType<Comment[]>,
      required: true,
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
  .comments-wrapper {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }
</style>
