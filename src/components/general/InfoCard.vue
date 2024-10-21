<template>
  <div class="infocard">
    <MaterialSymbol symbol="quick_reference" />
    <p>
      {{ info }}
    </p>
    <ButtonComponent
      v-if="showButton"
      @clicked="$emit('clicked')"
      @keydown.enter="$emit('clicked')"
      text="Mehr erfahren"
      icon="open_in_new"
      :primary="true"
    />
  </div>
</template>
<script lang="ts">
import ButtonComponent from '@/components/general/ButtonComponent.vue';
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

export default {
  components: {
    ButtonComponent,
    MaterialSymbol,
  },
  props: {
    /**
     * The information to be displayed in the card.
     * @type {string}
     * @required
     */
    info: {
      type: String,
      required: true,
    },
    /**
     * Whether to show the button or not.
     * @type {boolean}
     * @default true
     */
    showButton: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style scoped lang="scss">
.infocard {
  display: flex;
  align-items: flex-start;
  gap: $xxs;
  padding: $xxs;
  background-color: $dark-purple-15;
  border-radius: $base-size;
  color: $dark-purple;

  > button {
    min-width: max-content;
  }

  > p {
    flex-grow: 1;
    @include content;
  }
}
</style>
