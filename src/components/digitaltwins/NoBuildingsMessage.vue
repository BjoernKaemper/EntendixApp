<template>
  <div class="no-buildings">
    <MaterialSymbol symbol="add_home_work" size="x-large" />
    <h4 class="not-buildings__title">Aktuell sind keine Gebäude zugeordnet. Erstellen Sie ein neues, damit wir den Digitalen Zwilling aufbauen können.</h4>
  </div>
</template>

<script lang="ts">
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

export default {
  name: 'NoBuildingsMessage',
  components: {
    MaterialSymbol,
  },
};
</script>

<style lang="scss" scoped>
.no-buildings {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $dark-purple;
  gap: $m;
  padding: $xxl 0;
  grid-column-start: 2;
  grid-column-end: -2;
}
</style>
