<template>
  <div class="comment">
    <h4 class="comment--user">{{ user }}</h4>
    <p class="comment--body">{{ body }}</p>
    <time class="comment--date" datetime="">vom {{ date }} Uhr</time>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'CommentComponent',

  props: {
    /**
     * The id of the comment
     * @type {String}
     * @required
     */
    id: {
      type: String as PropType<string>,
      required: false,
      default: uuidv4(),
    },
    /**
     * The user of the comment
     * @type {String}
     * @required
     */
    user: {
      type: String as PropType<string>,
      required: true,
      default: 'Kommentar',
    },
    /**
     * The body of the comment
     * @type {String}
     * @required
     */
    body: {
      type: String as PropType<string>,
      required: true,
      default: '-',
    },
    /**
     * The date of the comment
     * @type {String}
     * @required
     */
    date: {
      type: String as PropType<string>,
      required: true,
      default: '-',
    },
  },
};
</script>
<style lang="scss">
  .comment {
    display: flex;
    flex-direction: column;
    gap: $xxxs;
    background-color: $lightest;
    padding: $xxs;
    border-radius: $border-radius;

    &--user {
      @include meta-information;
    }

    &--body {
      @include content;
    }

    &--date {
      @include meta-information;
      text-align: end;
    }
  }
</style>
