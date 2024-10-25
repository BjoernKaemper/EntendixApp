<template>
  <section class="accordion">
    <div class="accordion__activator" @click="toggleOpen" @keydown.enter="toggleOpen">
      <div class="accordion__heading">
        <slot name="heading">
          <h4>{{ title }}</h4>
        </slot>
      </div>
      <MaterialSymbol symbol="expand_circle_down" :class="{ rotate: isOpen }" />
    </div>
    <div v-if="isOpen" class="accordion__content">
      <slot name="content" />
    </div>
  </section>
</template>
<script lang="ts">
import MaterialSymbol from '@/components/general/MaterialSymbol.vue';

export default {
  name: 'AccordionBase',
  components: {
    MaterialSymbol,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    /**
     * The title of the accordion
     * @type {String}
     * @required
     */
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
<style scoped lang="scss">
.accordion {
  border-bottom: 1px solid $light-purple;

  &__activator {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: $xxs;
  }

  &__heading {
    display: flex;
    gap: $xxs;
    align-items: center;

    > h4 {
      @include content-subtitle;
    }
  }

  &__content {
    padding: $xs 0;
    display: flex;
    flex-direction: column;
    gap: $m;
  }
}

.rotate {
  transform: rotate(180deg);
}
</style>
