<template>
  <div class="improvements-wrapper">
    <h4>Optimierungen</h4>
    <div
      v-for="improvement in improvements"
      :key="improvement.id"
    >
      {{ improvement.body }}
    </div>
    <ButtonComponent
      text="ENTENDIX zur Ausführung berechtigen"
      :primary="true"
      :icon="IconTypes.ARROW"
    />
    <ButtonComponent
      text="Optimierung durch externe Firma vor Ort"
      :primary="true"
      :icon="IconTypes.ARROW"
    />
  </div>
</template>

<script lang="ts">
import { IconTypes } from '@/types/enums/IconTypes';
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import type { Improvement } from '@/types/Improvement';
import type { PropType } from 'vue';

export default {
  props: {
    improvements: {
      type: Array as PropType<Improvement[]>,
      required: true,
    },
  },
  components: {
    ButtonComponent,
  },
  setup() {
    return {
      IconTypes,
    };
  },
};
</script>

<style lang="scss">
  .improvements-wrapper {
    display: flex;
    flex-direction: column;
    gap: $xxs;
  }

p, li {
  @include content;
}
</style>
