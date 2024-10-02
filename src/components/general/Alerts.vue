<template>
  <div
    class="alert-wrapper"
    data-jest="alerts"
  >
    <AlertElement
      v-for="alert in alerts"
      :key="alert.id"
      :alert="alert"
    />
  </div>
</template>

<script lang="ts">
import AlertElement from '@/components/general/AlertElement.vue';
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';
import type { Alert } from '@/types/general/Alert';

export default {
  name: 'AlertsComponent',

  components: {
    AlertElement,
  },

  computed: {
    ...mapStores(useGeneralStore),

    alerts(): Alert[] {
      return this.generalStore.alerts;
    },
  },

  mounted() {
    this.generalStore.loadAlerts();
  },
};
</script>

<style lang="scss" scoped>
.alert-wrapper {
  position: absolute;
  top: 140px;
  right: 20px;
  z-index: 1000;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  gap: $xxs;
}
</style>
