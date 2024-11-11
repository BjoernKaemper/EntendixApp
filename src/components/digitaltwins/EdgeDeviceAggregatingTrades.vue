<template>
  <div class="aggregating-trades">
    <div class="aggregating-trades__icons">
      <MaterialSymbol symbol="encrypted" />
      <MaterialSymbol symbol="electric_meter" />
      <MaterialSymbol symbol="water" />
      <MaterialSymbol symbol="heat" />
      <MaterialSymbol symbol="air" />
    </div>
    <h4 class="aggregating-trades__message">
      Das ENTENDIX Edge Device wurde erkannt und misst derzeit alle Gebäudekomponenten zur
      Erstellung des Digitalen Zwillings...
    </h4>
  </div>
</template>

<script lang="ts">
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

export default {
  name: 'EdgeDeviceAggregatingTrades',
  components: {
    MaterialSymbol,
  },
};
</script>

<style lang="scss" scoped>
.aggregating-trades {
  display: flex;
  flex-direction: column;
  gap: $m;
  padding: $xxl 0;

  &__icons {
    display: flex;
    justify-content: center;
    color: $dark-purple;
    gap: $xxs;
  }

  &__message {
    text-align: center;
    color: $dark-purple;
    @include content;
  }
}
</style>
