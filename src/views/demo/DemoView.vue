<template>
  <div>
    <button type="button" @click="openModal">Open Modal</button>
    <ModalOverlay :isOpen="isModalOpen" @close="closeModal">
      <template #header>
        <h1>Title of Modal</h1>
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
        <br />
        <p>Dank moderner Technologien wie dem Digitalen Zwilling sind Sie in der Lage,
          den Zustand Ihrer Gebäude in Echtzeit zu überwachen und fundierte
          Entscheidungen zu treffen.
          So reduzieren Sie langfristig Kosten und erhöhen die Effizienz
          – alles auf einen Blick und immer aktuell.</p>
      </template>
    </ModalOverlay>
    <ChipComponent :status="StatusTypes.SUCCESS" />
    <ChipComponent :status="StatusTypes.WARNING" />
    <ChipComponent :status="StatusTypes.ERROR" />
    <ChipComponent />
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
  </div>
</template>
<script lang="ts">
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue';
import StatusCard from '@/components/general/StatusCard.vue';
import ChipComponent from '@/components/general/ChipComponent.vue';
import ModalOverlay from '@/components/general/ModalOverlay.vue';

import { StatusTypes } from '@/types/enums/StatusTypes';
import { ActionTypes } from '@/types/enums/ActionTypes';

export default {
  components: {
    LiegenschaftCard,
    StatusCard,
    ChipComponent,
    ModalOverlay,
  },
  data() {
    return {
      isModalOpen: false,
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
  },
};
</script>

<style lang="scss"></style>
