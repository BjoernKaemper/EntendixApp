<template>
  <div class="comments-wrapper">
    <CommentComponent
      v-for="(comment, idx) in comments"
      :key="idx"
      :comment="comment"
      :lightBackground="lightBackground"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { Annotation } from '@/types/global/kpi/Kpi';
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
      type: Array as PropType<Annotation[]>,
      required: true,
    },
    /**
     * Whether or not to use a light background for the comments
     * @type {boolean}
     * @default true
     */
    lightBackground: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
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
