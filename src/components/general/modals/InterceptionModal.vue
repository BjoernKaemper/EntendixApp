<template>
  <ModalOverlay :isOpen="isOpen" @close="handleClose">
    <template #header>
      <h5>{{ title }}</h5>
    </template>
    <template #body>
      <slot name="body">
        <p>
          Sind Sie sicher, dass Sie die aktuelle Seite verlassen wollen? Die von Ihnen vorgenommenen
          <strong>Änderungen gehen verloren.</strong>
        </p>
      </slot>
    </template>
    <template #footer>
      <ButtonComponent :text="cancelText" @click="handleClose" state="secondary" />
      <ButtonComponent :text="confirmText" @click="$emit('confirm')" state="error" />
    </template>
  </ModalOverlay>
</template>

<script lang="ts">
// Component imports
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';

export default {
  name: 'InterceptionModal',
  components: {
    ModalOverlay,
    ButtonComponent,
  },
  props: {
    /**
     * Wether or not this modal is visible.
     */
    isOpen: {
      type: Boolean,
      required: true,
    },
    /**
     * Title of the modal.
     */
    title: {
      type: String,
      default: 'Seite verlassen?',
    },
    /**
     * Text of the cancel button.
     */
    cancelText: {
      type: String,
      default: 'Abbrechen',
    },
    /**
     * Text of the confirm button.
     */
    confirmText: {
      type: String,
      default: 'Seite verlassen',
    },
  },
  emits: {
    cancel: (() => true) as () => void,
    confirm: (() => true) as () => void,
  },
  methods: {
    handleClose() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped lang="scss">
h5 {
  @include content-subtitle;
  color: $dark-purple;
}
</style>
