<template>
  <div class="textarea-wrapper">
    <h3 id="headline">Neuer Kommentar</h3>
    <div class="group">
      <NotesIcon />
      <textarea id="comment" placeholder="Nachricht" />
    </div>
  </div>
</template>

<script lang="ts">
import NotesIcon from '@/components/icons/NotesIcon.vue';

export default {
  components: {
    NotesIcon,
  },
};
</script>

<style lang="scss">
.textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: $xxs;

  .group {
    display: flex;
    flex-direction: column;
    gap: $xxs;
    position: relative;
    width: 100%;
    background-color: $lightest;

    svg {
      position: absolute;
      left: $xxxs;
      top: $xxxs;
    }

    textarea {
      width: 100%;
      padding: calc($base-size/2) $xxxs;
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
  }
}
</style>
