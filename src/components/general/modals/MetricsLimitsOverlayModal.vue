<template>
  <ModalOverlay :isOpen="isMetricsModalOpen">
    <template #header>
      <h2>{{ modalTitle }}</h2>
    </template>
    <template #body>
      <p>
        {{ modalDescription }}
      </p>
      <form action="submit">
        <h3>Einstellung der Grenzwerte</h3>
        <div class="group">
          <input type="radio" id="InputA" name="values" />
          <label for="InputA">Norm für Bürogebäude</label>
          <InfoCircleIcon @click="showOptions = !showOptions" />
        </div>
        <div class="group">
          <input type="radio" id="InputB" name="values" />
          <label for="InputB">Norm XYZ korrigiert nach Historie</label>
          <InfoCircleIcon @click="showOptions = !showOptions" />
        </div>
        <div class="group">
          <input type="radio" id="InputC" name="values" />
          <label for="InputC">Eigene Werte</label>
          <InfoCircleIcon @click="showOptions = !showOptions" />
        </div>

        <div v-if="showOptions" class="options">
          <div class="options--option">
            <label for="Option A">Grenzwert "Krtisch"</label>
            <IconChip :status="ChipStatusTypes.ERROR" />
            <input type="text" id="Option A" placeholder="150" />
            <p class="unit">kWh/m<sup>2</sup>/a</p>
          </div>
          <div class="options--option">
            <label for="Option B">Grenzwert "Achtung"</label>
            <IconChip :status="ChipStatusTypes.WARNING" />
            <input type="text" id="Option B" placeholder="100" />
            <p class="unit">kWh/m<sup>2</sup>/a</p>
          </div>
          <div class="options--option">
            <label for="Option C">Grenzwert "In Ordnung"</label>
            <IconChip :status="ChipStatusTypes.SUCCESS" />
            <input type="text" id="Option C" placeholder="50" />
            <p class="unit">kWh/m<sup>2</sup>/a</p>
          </div>
        </div>
      </form>
    </template>
  </ModalOverlay>
</template>

<script lang="ts">
import ModalOverlay from '@/components/general/modals/ModalOverlay.vue';
import InfoCircleIcon from '@/components/icons/InfoCircleIcon.vue';
import IconChip from '@/components/general/IconChip.vue';
import { ChipStatusTypes } from '@/types/enums/ChipStatusTypes';

export default {
  components: {
    ModalOverlay,
    InfoCircleIcon,
    IconChip,
  },
  props: {
    /**
     * The state of the metrics modal.
     * @type {boolean}
     * @default false
     */
    isMetricsModalOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
    modalTitle: {
      type: String,
      required: true,
    },
    modalDescription: {
      type: String,
      required: true,
    },
    // TODO: Add the current values as props
  },
  data() {
    return {
      showOptions: false,
    };
  },
  setup() {
    return {
      ChipStatusTypes,
    };
  },
  methods: {
    accept() {
      // TODO: Post data to API
      this.$emit('accept');
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: $xxs;

  .group {
    display: flex;
    gap: $xxs;
    align-items: center;

    > svg {
      cursor: pointer;

      > * > * {
        fill: $light-purple;
      }
    }
  }

  .options {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    gap: $xxs;
    margin-top: $s;

    .options--option {
      display: flex;
      align-items: center;
      gap: $xxs;

      & > input {
        max-width: 100px;
        border: 1px solid $light-purple;
        border-radius: $border-radius;
        padding: $base-size $xs;
        outline: none;
        text-align: end;
      }

      & > .unit {
        color: $dark-purple;
      }
    }
  }
}
</style>
