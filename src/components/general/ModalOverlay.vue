<template>
  <div v-if="isOpen" class="modal-overlay">
    <button type="button" class="modal-overlay__background" @click="close" aria-label="Close modal" />
    <slot>
      <div class="modal-overlay__content">
        <div class="modal-overlay__content__header">
          <slot name="header" />
          <CloseIcon @click="close" />
        </div>
        <div class="modal-overlay__content__body">
          <slot name="body" />
        </div>
        <div class="modal-overlay__content__footer">
          <ButtonComponent
            v-if="!hasFooterSlot"
            @click="close"
            :primary="false"
            text="Abbrechen"
            :icon="IconTypes.CLOSE" />
          <ButtonComponent
            v-if="!hasFooterSlot"
            :primary="true"
            text="Akzeptieren"
            :icon="IconTypes.CHECK_MARK" />
          <slot name="footer" />
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import { IconTypes } from '@/types/enums/IconTypes';

export default {
  components: {
    CloseIcon,
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
     * The state of the metrics modal.
     * @type {boolean}
     * @required
     * @default false
     */
    isMetricsModalOpen: {
      type: Boolean,
      required: false,
      default: false,
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
      background-color: $darken;
      cursor: auto;
    }

    &__content {
      background-color: $lightest;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 500px;
      margin: 0 $s;
      padding: $m;
      z-index: 1001;

      &__header {
        margin-bottom: $s;
        @include content-subtitle;
        display: flex;
        justify-content: space-between;
        align-items: start;

        & > svg {
          cursor: pointer;
        }
      }

      &__body {
        display: flex;
        flex-direction: column;
        gap: $m;
        margin-bottom: $s;
        @include content;
      }

      &__footer {
        display: flex;
        justify-content: flex-end;
        gap: $xxs;
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
