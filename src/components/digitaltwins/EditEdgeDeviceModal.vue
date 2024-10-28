<template>
  <ModalOverlay :isOpen="modelValue" @close="handleClose">
    <template #header>
      <h5>Einstellungen zum Gebäude: Edge Device</h5>
    </template>
    <template #body v-if="!canEdit">
      <p>
        Anpassungen des ENTENDIX Edge Devices wirken sich auf den Digitalen Zwilling und die
        Komponenten innerhalb des Gebäudes aus. Bei Fragen oder Problemen kontaktieren Sie bitte
        unseren Support.
      </p>
      <div class="edge-device-modal__contact">
        <!-- TODO: add correct contact data -->
        <span>support@example.com</span>
        <span>0221/123456780</span>
      </div>
    </template>
    <template #body v-else>
      <p>
        Anpassungen des ENTENDIX Edge Devices wirken sich auf den Digitalen Zwilling und die
        Komponenten innerhalb des Gebäudes aus.
      </p>
      <div class="edge-device-modal__form">
        <h6>Physische Komponente verknüpfen</h6>
        <div class="edge-device-modal__input-group">
          <label class="edge-device-modal__label" for="edge-device">
            ENTENDIX Edge Device (optional)
          </label>
          <DropdownComponent
            :options="edgeDevices"
            :currentValue="edgeDevice.value.value"
            @changed="(e) => (edgeDevice.value.value = e)"
          />
        </div>
      </div>
    </template>
    <template #footer v-if="!canEdit">
      <ButtonComponent state="primary" text="OK" @click="$emit('update:modelValue', false)" />
    </template>
    <template #footer v-else>
      <ButtonComponent state="secondary" text="Abbrechen" @click="handleClose" />
      <ButtonComponent
        state="primary"
        text="Bestätigen"
        icon="check"
        @click="$emit('update:edgeDevice', edgeDevice.value.value)"
      />
    </template>
  </ModalOverlay>
  <InterceptionModal
    :isOpen="interceptModalLeave.isOpen.value"
    @cancel="interceptModalLeave.abortAction"
    @confirm="interceptModalLeave.confirmAction"
    title="Änderungen verwerfen?"
    confirmText="Änderungen verwerfen"
  >
    <template #body>
      <p>
        Sind Sie sicher, dass Sie den aktuellen Dialog schließen wollen? Die von Ihnen vorgenommenen
        <strong>Änderungen gehen verloren.</strong>
      </p>
    </template>
  </InterceptionModal>
</template>

<script lang="ts">
// Hook imports
import { useInput } from '@/hooks/useInput';
import { useModalInterception } from '@/hooks/useModalInterception';

// Component imports
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import DropdownComponent from '@/components/general/inputs/DropdownComponent.vue';

// Type imports
import type { PropType } from 'vue';
import type { DropdownOptions } from '@/types/local/DropdownOptions';
import InterceptionModal from '@/components/general/modals/InterceptionModal.vue';

export default {
  name: 'EditEdgeDeviceModal',
  components: {
    ModalOverlay,
    ButtonComponent,
    DropdownComponent,
    InterceptionModal,
  },
  props: {
    /**
     * Boolean value to determine if the modal is open or not.
     */
    modelValue: {
      type: Boolean,
      required: true,
    },
    /**
     * Wether or not the current user can edit the edge device settings.
     */
    canEdit: {
      type: Boolean,
      default: false,
    },
    /**
     * Available edge devices to choose from.
     */
    edgeDevices: {
      type: Array as PropType<DropdownOptions>,
      required: true,
    },
    /**
     * Currently/initially selected edge device.
     */
    initialValue: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const edgeDevice = useInput([], props.initialValue);

    const interceptModalLeave = useModalInterception();

    return {
      edgeDevice,
      interceptModalLeave,
    };
  },
  methods: {
    handleClose() {
      if (!this.edgeDevice.isChanged.value) {
        this.$emit('update:modelValue', false);
        return;
      }

      this.interceptModalLeave.interceptAction(
        () => {
          this.edgeDevice.reset();
          this.$emit('update:modelValue', false);
        },
        () => {},
      );
    },
  },
  emits: {
    'update:modelValue': (() => true) as (value: boolean) => void,
    'update:edgeDevice': (() => true) as (value: string) => void,
  },
};
</script>

<style lang="scss" scoped>
.edge-device-modal {
  &__contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $xxs;

    @include content-subtitle;
  }

  &__label {
    @include content;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }

  &__input-group {
    display: flex;
    flex-direction: column;
    gap: $xxxs;
  }
}

h5 {
  @include content-subtitle;
  color: $dark-purple;
}

h6 {
  @include section-headline;
}
</style>
