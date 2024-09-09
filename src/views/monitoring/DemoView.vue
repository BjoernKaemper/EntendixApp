<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="5">
          <GoogleMapsCardHome />
        </v-col>
        <v-col cols="7">
          <v-card
            style="border-radius: 20px; background-color: whitesmoke"
            variant="outlined"
            class="anlagen-card mb-12 mx-10"
          >
            <v-card-title align="center">
              Meine Liegenschaften - Monitoring
            </v-card-title>
            <v-divider
              class="border-opacity-75 mx-4 mb-2"
              :thickness="2"
              color="success"
            ></v-divider>

            <LiegenschaftCard
              location="Köln"
              name="TH Köln, Campus Deutz"
            />
            <LiegenschaftCard
              location="Köln"
              name="TH Köln, Campus Gummersbach"
            />
            <LiegenschaftCard
              location="Köln"
              name="TH Köln, Campus Deutz"
            />
            <StatusCard
              icon="mdi-check-circle"
              title="Name"
              subtitle="Some description"
              status="success"
              actionIcon="mdi-arrow-right"
            />
            <StatusCard
              icon="mdi-alert-circle"
              title="Warning"
              status="warning"
              actionIcon="mdi-information-outline"
            />
            <StatusCard
              icon="mdi-alert"
              title="Error"
              subtitle="An error occurred"
              status="error"
              actionIcon="mdi-information-outline"
            />
            <StatusCard
              icon="mdi-help-circle"
              title="Info"
              subtitle="This is some info"
              status="info"
              actionIcon="mdi-information-outline"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import GoogleMapsCardHome from '@/components/general/GoogleMapsCardHome.vue'
import LiegenschaftCard from '@/components/monitoring/LiegenschaftCard.vue'
import StatusCard from '@/components/general/StatusCard.vue'

export default {
  components: {
    GoogleMapsCardHome,
    LiegenschaftCard,
    StatusCard
  },
}
</script>
<style lang="scss">
  
</style>