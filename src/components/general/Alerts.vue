<template>
  <div
    class="alert-wrapper"
    data-jest="alerts"
  >
    <AlertElement
      v-for="alert in demoAlerts"
      :key="alert.id"
      :alert="alert"
    />
  </div>
</template>

<script lang="ts">
import AlertElement from '@/components/general/AlertElement.vue';
import { useGeneralStore } from '@/store/general';
import { mapStores } from 'pinia';
import { AlertTypes } from '@/types/enums/AlertTypes';
import type { Alert } from '@/types/Alert';
import { v4 as uuidv4 } from 'uuid';

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
    demoAlerts(): Alert[] {
      return [
        {
          id: uuidv4(),
          title: 'Notification Title 1',
          type: AlertTypes.ERROR,
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
          time: '14:02',
        },
        {
          id: uuidv4(),
          title: 'Notification Title 2',
          type: AlertTypes.SUCCESS,
          description: 'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
          time: '12:00',
        },
        {
          id: uuidv4(),
          title: 'Notification Title 3',
          type: AlertTypes.SUCCESS,
          description: 'Lorem ipsum dolor sit amet.',
          time: '12:00',
        },
      ];
    },
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
