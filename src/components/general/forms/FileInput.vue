<template>
  <div class="file-input">
    <label v-if="label" :for="id" class="file-input__label">{{ label }}</label>
    <FileEntry
      v-for="file in fileList"
      :key="file.name"
      :file-name="file.name"
      @delete="deleteFile(file)"
    />
    <div class="file-input__container">
      <div v-if="multiple || fileList.length === 0" class="file-input__upload">
        <span class="file-input__prompt">{{ selectPrompt }}</span>
        <MaterialSymbol symbol="upload" />
        <input
          type="file"
          :id="id"
          :multiple="multiple"
          :accept="accepts"
          @change="onFileChange"
          class="file-input__input"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TODO: add drag and drop functionality?
// Component imports
import FileEntry from '@/components/general/FileEntry.vue';
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

export default {
  name: 'FileInput',
  components: {
    FileEntry,
    MaterialSymbol,
  },
  props: {
    /**
     * Unique identifier for the input.
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * Wether or not the input accepts multiple files.
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * The accepted file types.
     */
    accepts: {
      type: String,
      required: true,
    },
    /**
     * Text to show on the select button.
     */
    selectPrompt: {
      type: String,
      default: 'Datei auswählen',
    },
    /**
     * Label for the input.
     */
    label: {
      type: String,
      default: undefined,
    },
  },
  emits: ['update:fileList'],
  data: () => ({
    fileList: [] as File[],
  }),
  methods: {
    onFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (!target.files) {
        return;
      }

      const files = Array.from(target.files);
      this.fileList = this.fileList.concat(files);
      this.$emit('update:fileList', this.fileList);
    },
    deleteFile(file: File) {
      this.fileList = this.fileList.filter((f) => f !== file);
      this.$emit('update:fileList', this.fileList);
    },
  },
};
</script>

<style lang="scss" scoped>
.file-input {
  display: flex;
  flex-direction: column;
  gap: $xxxs;

  &__upload {
    @include meta-information;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px dashed $light-purple;
    padding: $xxxs $xxxs $xxxs $xxs;
    border-radius: $border-radius;
    position: relative;
    color: $darkest;
  }

  &__input {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 0;

    &::-webkit-file-upload-button {
      visibility: hidden;
    }
  }

  &__label {
    @include content;
  }
}
</style>
