<template>
  <div class="no-buildings">
    <MaterialSymbol symbol="add_home_work" size="x-large" />
    <h4 class="no-buildings__title">
      Aktuell sind keine Gebäude zugeordnet. Erstellen Sie
      <a :href="path" v-if="path">im Digitalen Zwilling</a> ein Gebäude, damit wir den Digitalen
      Zwilling aufbauen können.
    </h4>
  </div>
</template>

<script lang="ts">
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

export default {
  name: 'NoBuildingsMessage',
  components: {
    MaterialSymbol,
  },
  computed: {
    /**
     * Returns the path to the digital twins page if the current route is the monitoring page
     */
    path(): string | undefined {
      return this.$route.path.includes('monitoring')
        ? this.$route.path.replace('monitoring', 'digitaltwins')
        : undefined;
    },
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
  &__title {
    text-align: center;
    a {
      color: $dark-purple;
      text-decoration: underline;
    }
  }
}
</style>
