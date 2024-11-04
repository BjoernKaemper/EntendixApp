<template>
  <div v-if="isOpen" class="modal-overlay">
    <button
      type="button"
      class="modal-overlay__background"
      @click="close"
      aria-label="Close modal"
    />
    <slot>
      <div class="modal-overlay__content" :class="{ [`modal-overlay__content--${size}`]: size }">
        <div class="modal-overlay__content__header">
          <slot name="header" />
          <MaterialSymbol :symbol="IconTypes.CLOSE" @click="close" />
        </div>
        <div class="modal-overlay__content__body">
          <slot name="body" />
        </div>
        <div class="modal-overlay__content__footer">
          <ButtonComponent
            v-if="!hasFooterSlot"
            @click="close"
            text="Abbrechen"
            :icon="IconTypes.CLOSE"
          />
          <ButtonComponent
            v-if="!hasFooterSlot"
            state="primary"
            text="Akzeptieren"
            :icon="IconTypes.CHECK_MARK"
          />
          <slot name="footer" />
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import { IconTypes } from '@/types/enums/IconTypes';
import type { PropType } from 'vue';

export default {
  components: {
    MaterialSymbol,
    ButtonComponent,
  },
  setup() {
    return {
      IconTypes,
    };
  },
  name: 'ModalOverlay',
  props: {
    /**
     * The state of the modal.
     * @type {boolean}
     * @required
     * @default false
     */
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
    /**
     * Size of the modal
     */
    size: {
      type: String as PropType<'default' | 'large'>,
      default: 'default',
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(val: boolean) {
        if (val) {
          document.body.style.overflow = 'hidden'; // Disable scroll
          document.addEventListener('keydown', this.handleKeydown); // Listen for keyboard events
        } else {
          document.body.style.overflow = 'auto'; // Enable scroll
          document.removeEventListener('keydown', this.handleKeydown); // Remove keyboard listener
        }
      },
    },
  },
  computed: {
    hasFooterSlot(): boolean {
      return !!this.$slots.footer;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.close(); // Close modal if Escape key is pressed
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $modal-background;
    cursor: auto;
  }

  &__content {
    background-color: $lightest;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    margin: 0 $s;
    z-index: 1001;
    max-height: calc(100vh - 2 * $xxl);
    overflow-y: auto;

    &--large {
      max-width: 1200px;
    }

    &__header {
      padding: $m;
      background-color: $lightest;
      position: sticky;
      top: 0;
      @include content-subtitle;
      display: flex;
      justify-content: space-between;
      align-items: start;
      z-index: 1;

      & > span {
        cursor: pointer;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: $m;
      padding: 0 $m;
      @include content;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      gap: $xxs;
      padding: $m;
      background-color: $lightest;
      position: sticky;
      bottom: 0;
      z-index: 1;
      @include content;

      & > button {
        border: 1px solid $darken;
        border-radius: $border-radius;
        padding: $base-size 0 $base-size $xxs;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: $base-size;

        &.primary {
          background-color: $light-purple;
          border-color: $light-purple;
        }

        & > * {
          margin-right: $base-size;
        }
      }
    }
  }
}
</style>
