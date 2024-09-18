<template>
  <div>
    <!--Test-->
    <v-card
      style="border-radius: 20px; background-color: whitesmoke"
      class="pa-4"
      variant="outlined"
    >
      <v-img
        v-if="this.grundfunktionId == 'Wärme versorgen'"
        src="@/assets/GebäudeHeizungOn.svg"
      />
      <v-img
        v-else-if="this.grundfunktionId == 'Luft versorgen'"
        src="@/assets/GebäudeLüftungOn.svg"
      />
      <v-img v-else src="@/assets/GebäudeAllesOff.svg" />
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    grundfunktionId: String,
  },
};
</script>

<style scoped>
.building-card {
  background-color: #ffffff;
}
</style>
