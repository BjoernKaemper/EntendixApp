<template>
  <div class="comment" :class="{ isLight: lightBackground }">
    <div class="comment--header">
      <div>
        <span class="comment--user">{{ comment.creator }}</span>
        <span v-if="comment.referringTimestamp" class="comment--referring-timestamp">
          {{ DateHelper.prettierDate(comment.referringTimestamp) }}</span
        >
      </div>
      <KebabMenu
        :options="[
          {
            icon: 'delete',
            text: 'Kommentar löschen',
            emits: 'delete',
            iconColor: 'red',
            disabled: true,
          },
        ]"
        @delete="deleteComment('TODO: Add Identifier')"
        class="comment--header--kebab-menu"
      />
    </div>
    <p class="comment--body">{{ comment.annotationText }}</p>
    <time
      v-if="comment.timestampOfCreation"
      class="comment--date"
      :datetime="comment.timestampOfCreation"
    >
      verfasst am {{ DateHelper.prettierDate(comment.timestampOfCreation) }} Uhr
    </time>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { Annotation } from '@/types/global/kpi/Kpi';
import DateHelper from '@/helpers/DateHelper';

import KebabMenu from '@/components/general/KebabMenu.vue';

export default {
  name: 'CommentComponent',
  components: {
    KebabMenu,
  },
  props: {
    /**
     * The id of the comment
     * @type {Annotation}
     * @required
     */
    comment: {
      type: Object as PropType<Annotation>,
      required: true,
    },
    /**
     * Whether or not to use a light background
     * @type {boolean}
     * @default true
     */
    lightBackground: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    deleteComment(id: string) {
      // TODO: Implement delete functionality
      // eslint-disable-next-line no-console
      console.log('Delete comment:', id);
    },
  },
  setup() {
    return {
      DateHelper,
    };
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
  background-color: $light;

  &--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--kebab-menu {
      flex-grow: 1;
    }
  }

  &.isLight {
    background-color: $lightest;
  }

  &--user {
    @include meta-information;
    font-weight: 700;
    display: block;
  }

  &--referring-timestamp {
    @include meta-information;
    display: block;
  }

  &--body {
    @include content;
  }

  &--date {
    @include meta-information;
    text-align: end;
    color: $dark-purple;
  }
}
</style>
