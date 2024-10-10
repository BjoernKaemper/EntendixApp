<template>
  <a :href="url" class="file">
    <MaterialSymbol symbol="description" />
    <p class="file__name">{{ fileName }}</p>
    <button class="file__options" @click.prevent="console.log('TODO')" type="button">
      <MaterialSymbol symbol="more_vert" />
    </button>
  </a>
</template>

<script lang="ts">
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

export default {
  components: {
    MaterialSymbol,
  },
  props: {
    /**
     * The name of the file.
     * @type {string}
     */
    fileName: {
      type: String,
      required: true,
    },
    /**
     * The url to download the file.
     * @type {string}
     */
    url: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.file {
  display: flex;
  gap: $xxs;
  padding: $xxxs;
  border-radius: $border-radius;
  background-color: $lightest;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: $darkest;

  @include content;

  &__name {
    flex: 1;
  }

  &__options {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
