<template>
  <div>
    <div class="overlays">
      <button type="button" @click="openMetricsModal">Open Metrics Modal</button>
      <MetricsLimitsOverlayModal
        :isMetricsModalOpen="isMetricsModalOpen"
        @close="closeMetricsModal" />
      <button type="button" @click="openModal">Open Modal</button>
      <ModalOverlay :isOpen="isModalOpen" @close="closeModal">
        <template #header>
          <p>Title of Modal</p>
        </template>
        <template #body>
          <p>
            Ein effizientes Gebäudemanagement beginnt mit klaren Strukturen.
            Mit unserer Lösung behalten Sie jederzeit den Überblick über alle relevanten Prozesse
            – von der Instandhaltung bis zur Optimierung Ihrer Gebäudedaten.
            Transparenz und Übersichtlichkeit stehen dabei im Vordergrund.
            Unsere intuitive Plattform ermöglicht es Ihnen, Ressourcen gezielt
            einzusetzen und Arbeitsabläufe zu vereinfachen.
          </p>
          <p>Dank moderner Technologien wie dem Digitalen Zwilling sind Sie in der Lage,
            den Zustand Ihrer Gebäude in Echtzeit zu überwachen und fundierte
            Entscheidungen zu treffen.
            So reduzieren Sie langfristig Kosten und erhöhen die Effizienz
            – alles auf einen Blick und immer aktuell.</p>
        </template>
      </ModalOverlay>
    </div>
    <div class="chips">
      <ChipComponent :status="StatusTypes.SUCCESS" />
      <ChipComponent :status="StatusTypes.WARNING" />
      <ChipComponent :status="StatusTypes.ERROR" />
      <ChipComponent />
    </div>
    <LiegenschaftCard location="Köln" name="TH Köln, Campus Deutz" />
    <LiegenschaftCard location="Köln" name="TH Köln, Campus Gummersbach" />
    <LiegenschaftCard location="Köln" name="TH Köln, Campus Deutz" :showIcon="false" />
    <StatusCard
      title="Success"
      subtitle="Some description"
      :status="StatusTypes.SUCCESS"
      :actionType="ActionTypes.ARROW"
    />
    <StatusCard
      title="Warning"
      subtitle="Some description"
      :status="StatusTypes.WARNING"
      :actionType="ActionTypes.INFO"
    />
    <StatusCard
      title="Error"
      subtitle="An error occurred"
      :status="StatusTypes.ERROR"
      :actionType="ActionTypes.NONE"
    />
    <StatusCard title="Info" subtitle="This is some info" :status="StatusTypes.INFO" />
    <StatusCard
      title="Success"
      subtitle="Some description"
      :status="StatusTypes.SUCCESS"
      :actionType="ActionTypes.ARROW"
      :isBordered="false"
    />
    <StatusCard
      title="Warning"
      subtitle="Some description"
      :status="StatusTypes.WARNING"
      :actionType="ActionTypes.INFO"
      :isBordered="false"
    />
    <StatusCard
      title="Error"
      subtitle="An error occurred"
      :status="StatusTypes.ERROR"
      :actionType="ActionTypes.NONE"
      :isBordered="false"
    />
    <StatusCard
      title="Info"
      subtitle="This is some info"
      :status="StatusTypes.INFO"
      :isBordered="false"
    />
    <StatusCard
      title="Info"
      subtitle="This is some info"
      :status="StatusTypes.ERROR_COMPONENT"
      :isBordered="false"
    />
    <StatusCard
      title="Info"
      subtitle="This is some info"
      :status="StatusTypes.WARNING_COMPONENT"
      :isBordered="false"
    />
  </div>
</template>
<script lang="ts">
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';
import ModalOverlay from '@/components/general/ModalOverlay.vue';
import MetricsLimitsOverlayModal from '@/components/general/MetricsLimitsOverlayModal.vue';

import { StatusTypes } from '@/types/enums/StatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';

export default {
  components: {
    LiegenschaftCard,
    StatusCard,
    ChipComponent,
    ModalOverlay,
    MetricsLimitsOverlayModal,
  },
  data() {
    return {
      isModalOpen: false,
      isMetricsModalOpen: false,
      StatusTypes,
      ActionTypes,
    };
  },
  methods: {
    closeModal() {
      this.isModalOpen = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
    openMetricsModal() {
      this.isMetricsModalOpen = true;
    },
    closeMetricsModal() {
      this.isMetricsModalOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  border: 1px solid $light-purple;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: $light-purple;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: $lightest;
    color: $light-purple;
  }
}

.overlays {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

  .chips {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
