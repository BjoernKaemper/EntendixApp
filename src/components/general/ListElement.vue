<template>
  <div class="list-element">
    <div v-if="representationIcon" class="list-element__icon">
      <MaterialSymbol :symbol="representationIcon" />
    </div>
    <div class="list-element__content">
      <h5>{{ title }}</h5>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="interactionIcon" class="list-element__icon">
      <MaterialSymbol :symbol="interactionIcon" />
    </div>
  </div>
</template>

<script lang="ts">
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

export default {
  name: 'ListElement',
  components: {
    MaterialSymbol,
  },
  props: {
    /**
     * Icon to visually communication the what this element represents.
     */
    representationIcon: {
      type: String,
      default: undefined,
    },
    /**
     * Icon to communicate what the user can expect upon interaction with this
     * element.
     */
    interactionIcon: {
      type: String,
      default: undefined,
    },
    /**
     * The title of the element.
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * The subtitle of the element.
     */
    subtitle: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style scoped lang="scss">
.list-element {
  display: flex;
  padding: $xxs;
  gap: $xxs;
  border-radius: $border-radius;
  background-color: $dark-green-15;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: $dark-green;
    color: $lightest;

    & p {
      color: $lightest;
    }
  }

  &__content {
    flex: 1;
  }

  &__icon {
    display: inline-flex;

    & > span {
      font-size: $m;
    }
  }
}

h5 {
  @include content;
}

p {
  @include meta-information;
}
</style>
