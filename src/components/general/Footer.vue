<template>
    <v-footer
      id="footer"
      class="text-center d-flex justify-space-between" color="secondary-darken-1"
    >
    <v-row class="mb-0">
      <v-col cols="2">
      </v-col>
      <v-col cols="8">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
        <div class="pt-0">
        </div>
        <v-divider></v-divider>
        <div>
          {{ new Date().getFullYear() }} — <strong>PLYTEQ</strong>
        </div>
      </v-col>
      <v-col cols="2">
        <!--
        <v-avatar size="100px" rounded="0" class="mr-6">
        <v-img src="@/assets/plyteq_schriftzug.svg"></v-img>
      </v-avatar>-->
      </v-col>
    </v-row>
    </v-footer>

</template>
  
<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>
  
<style scoped>
  #footer {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    position: absolute;
    margin-top: 10%;
    bottom: 0;
  }


</style>
  