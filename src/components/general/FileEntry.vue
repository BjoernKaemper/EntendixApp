<template>
  <div class="file">
    <MaterialSymbol symbol="description" class="file__icon" />
    <p class="file__name">{{ fileName }}</p>
    <!-- TODO: add download functionality -->
    <KebabMenu :options="kebabOptions" @delete="$emit('delete')" vertical />
  </div>
</template>

<script lang="ts">
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';
import KebabMenu, { type Option } from '@/components/general/KebabMenu.vue';
import { IconTypes } from '@/types/enums/IconTypes';

export default {
  name: 'FileEntry',
  components: {
    MaterialSymbol,
    KebabMenu,
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
      default: undefined,
    },
  },
  computed: {
    kebabOptions(): Option[] {
      const options: Option[] = [
        {
          icon: IconTypes.DELETE,
          text: 'Datei Löschen',
          emits: 'delete',
          iconColor: 'red',
        },
      ];

      if (this.url) {
        options.push({
          icon: 'download',
          text: 'Datei herunterladen',
          emits: 'download',
          iconColor: 'purple',
        });
      }

      return options;
    },
  },
  emits: ['delete', 'download'],
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
  color: $darkest;
  border: 1px solid $light;
  border-radius: $border-radius;

  @include content;

  &__name {
    flex: 1;
  }

  &__options {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__icon {
    color: $dark-green;
  }
}
</style>
