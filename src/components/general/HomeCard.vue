<template>
  <div>
    <v-card
      style="border-radius: 20px; background-color: whitesmoke"
      variant="outlined"
      class="anlagen-card mb-12"
    >
      <v-card-title align="center">Willkommen</v-card-title>
      <v-divider class="border-opacity-75 mx-4 mb-2" :thickness="2" color="success"></v-divider>
      <v-card-text>
        <v-row v-for="product in products" :key="product.title">
          <v-col cols="4">
            <v-img max-width="180" :src="product[[Object.keys(product)[0]]]"> </v-img>
          </v-col>
          <v-col cols="8">
            <div class="text-h6 mb-4">{{ product.title }}</div>
            <div class="mb-4">{{ product.text }}</div>
            <!--<div class="d-flex justify-center">-->
            <v-btn
              variant="outlined"
              color="#3B5249"
              size="small"
              :icon="product.icon"
              @click="() => {}"
              :to="product.link"
            >
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { useGeneralStore } from '@/store/general_v2'

export default {
  data() {
    return {
      monitoringText: 'Technisches<br>Monitoring',
      zwillingText: 'Verwaltung<br>Digitaler Zwilling',
      images: {
        deutz: Object.values(
          import.meta.glob('@/assets/gebäude_deutz.png', { as: 'url', eager: true })
        )[0],
        südstadt: Object.values(
          import.meta.glob('@/assets/gebäude_südstadt.jpg', { as: 'url', eager: true })
        )[0]
      }
    }
  },
  computed: {
    generalStore() {
      return useGeneralStore()
    },
    products() {
      const products = [
        //{ icon: '', title: 'Home', link: '/' },
        //{ icon: '', title: 'Digitale Zwillinge', link: '/digitaltwins' },
        {
          image: Object.values(
            import.meta.glob('@/assets/digital_twin_4.png', { as: 'url', eager: true })
          )[0],
          icon: 'mdi-home',
          title: 'Digital Twins',
          link: '/digitaltwins',
          text: 'Zur Verwaltung der digitalen Zwillinge Ihrer Liegenschaften'
        },
        {
          image: Object.values(
            import.meta.glob('@/assets/monitoring_golden.png', { as: 'url', eager: true })
          )[0],
          icon: 'mdi-chart-line',
          title: 'Monitoring',
          link: '/monitoring',
          text: 'Zum technischen Monitoring Ihrer Gebäude'
        } //vorher link:buildingperformance
      ]
      return products
    }
  }
}
</script>

<style scoped>
.button-span {
  padding-top: 2px;
  padding-bottom: 2px;
  height: 100%;
}
</style>
