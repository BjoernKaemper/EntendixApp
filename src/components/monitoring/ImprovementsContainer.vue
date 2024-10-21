<template>
  <div class="improvements-wrapper">
    <div v-if="type === ImprovementContainerTypes.NONE">
      <h4>Optimierungen</h4>

      <p>
        Für diesen KPI gibt es aktuell keine Optimierungsvorschläge. Der Wert liegt im Zielbereich.
      </p>
    </div>
    <div v-else-if="type === ImprovementContainerTypes.IMPROVEMENTS">
      <h4>Optimierungen</h4>
      <div v-for="improvement in improvements" :key="improvement.id">
        {{ improvement.body }}
      </div>
      <ButtonComponent
        text="ENTENDIX zur Ausführung berechtigen"
        :primary="true"
        icon="arrow_forward"
      />
      <ButtonComponent
        text="Optimierung durch externe Firma vor Ort"
        :primary="true"
        icon="arrow_forward"
      />
    </div>
    <div
      v-else-if="type === ImprovementContainerTypes.NOT_INCLUDED"
      class="improvements-not-included"
    >
      <div>
        <h4>Optimierungsvorschlag</h4>
        <MaterialSymbol symbol="lock" />
      </div>
      <p>Kontaktieren Sie uns, um Optiemierungsvarianten freizuschalten.</p>
    </div>
  </div>
</template>

<script lang="ts">
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import type { Improvement } from '@/types/Improvement';
import type { PropType } from 'vue';
import { ImprovementContainerTypes } from '@/types/enums/ImprovementContainerTypes';
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

export default {
  props: {
    /**
     * The improvements to display
     * @type {Array<Improvement> | null}
     * @default null
     */
    improvements: {
      type: Array as PropType<Improvement[]> | null,
      default: null,
    },
  },
  components: {
    ButtonComponent,
    MaterialSymbol,
  },
  computed: {
    type() {
      if (this.improvements === null) {
        return ImprovementContainerTypes.NOT_INCLUDED;
      }
      if (this.improvements.length === 0) {
        return ImprovementContainerTypes.NONE;
      }
      return ImprovementContainerTypes.IMPROVEMENTS;
    },
  },
  setup() {
    return {
      ImprovementContainerTypes,
    };
  },
};
</script>

<style lang="scss">
.improvements-wrapper {
  display: flex;
  flex-direction: column;
  gap: $xxs;
  height: 100%;
  > .improvements-not-included {
    display: flex;
    flex-direction: column;
    gap: $xxs;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-radius: $base-size;
    background-color: $dark-purple;
    color: $lightest;
    > div {
      display: flex;
      gap: $xxs;
      align-items: center;
      justify-content: center;
    }
  }
}

p,
li {
  @include content;
}
</style>
