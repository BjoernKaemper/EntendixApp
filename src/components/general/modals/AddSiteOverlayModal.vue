<template>
  <ModalOverlay :isOpen="isAddSiteModalOpen">
    <template #header>
      <h3>Neue Liegenschaft anlegen</h3>
    </template>
    <template #body>
      <p id="">
        Geben Sie die Informationen einer neuen Liegenschaft ein, um sie innerhalb von ENTENDIX zu
        verwalten.
      </p>
      <h4>Informationen pflegen</h4>
      @TODO: add Form
    </template>
    <template #footer>
      <ButtonComponent @click="close" text="Abbrechen" />
      <ButtonComponent
        @click="addSite"
        :primary="true"
        text="Liegenschaft anlegen"
        :icon="IconTypes.CHECK_MARK"
      />
    </template>
  </ModalOverlay>
</template>

<script lang="ts">
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';

import { IconTypes } from '@/types/enums/IconTypes';

export default {
  components: {
    ModalOverlay,
    ButtonComponent,
  },
  props: {
    /**
     * The state of the add Site modal.
     * @type {boolean}
     * @required
     * @default false
     */
    isAddSiteModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {
      IconTypes,
    };
  },
  computed: {},
  methods: {
    close() {
      this.$emit('close');
    },
    addSite() {
      // TODO
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  @include content-subtitle;
  color: $dark-purple;
}
h4 {
  @include section-headline;
}
</style>
