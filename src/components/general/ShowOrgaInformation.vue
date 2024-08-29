<template>
  <v-container :style="{ width: '80%' }">
    <v-table style="background-color: whitesmoke">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Wert</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(key, index) in desiredOrder" :key="index">
          <td class="text-left">{{ orgaPropertyNames[key] }}</td>
          <td class="text-left">{{ generalStore.loadedOrganizationInformation[0][key] }}</td>
        </tr>
      </tbody>
    </v-table>
    <EditOrganizationInformation :orgaInformation="generalStore.loadedOrganizationInformation[0]" />
  </v-container>
</template>

<script>
import EditOrganizationInformation from '@/components/general/EditOrganizationInformation.vue'

import { useGeneralStore } from '@/store/general'

export default {
  data() {
    return {
      orgaPropertyNames: {
        organizationName: 'Name Unternehmen',
        country: 'Sitz des Unternehmens (Land)',
        city: 'Sitz des Unternehmens (Stadt)',
        zipcode: 'Sitz des Unternehmens (Postleitzahl)',
        street: 'Straße und Hausnummer'
      },
      desiredOrder: ['organizationName', 'country', 'city', 'zipcode', 'street']
    }
  },
  components: { EditOrganizationInformation },
  computed: {
    generalStore() {
      return useGeneralStore()
    }
  }
}
</script>
