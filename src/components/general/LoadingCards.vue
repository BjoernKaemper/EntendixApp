<template>
  <div class="cards-wrapper" :class="{ 'use-opacity': useOpacity }">
    <div
      class="card"
      :class="{ [cardClass]: true, 'grow-cards': growCards }"
      v-for="i in cardCount"
      :key="i"
    >
      <LoadingSpinner class="spinner" :size="size" />
    </div>
  </div>
</template>
<script lang="ts">
/**
 * LoadingCards component
 * @module components/general/LoadingCards
 * @summary This component displays a number of loading cards with a spinner
 * @displayName LoadingCards
 */
import LoadingSpinner from '@/components/general/LoadingSpinner.vue';
import { type PropType } from 'vue';

export default {
  components: {
    LoadingSpinner,
  },
  props: {
    /**
     * The number of cards to display
     * @type {number}
     * @default 3
     */
    cardCount: {
      type: Number as PropType<number>,
      default: 3,
    },
    /**
     * Classes to apply to the card
     * @type {string}
     * @default ''
     */
    cardClass: {
      type: String as PropType<string>,
      default: '',
    },
    /**
     * Whether to use different opacitys on the cards, only works with 3 cards for now
     * @type {boolean}
     * @default true
     */
    useOpacity: {
      type: Boolean,
      default: true,
    },
    /**
     * Whether to grow the cards to fill the space
     * @type {boolean}
     * @default false
     */
    growCards: {
      type: Boolean,
      default: false,
    },
    /**
     * Size of the spinner
     */
    size: {
      type: String as PropType<'small' | 'normal' | 'large'>,
      default: 'normal',
    },
  },
};
</script>
<style scoped lang="scss">
.card {
  background-color: $lightest;
  border-radius: $base-size;
  height: 100px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-grow: 0;

  &.grow-cards {
    flex-grow: 1;
  }

  & > .spinner {
    margin: 0 auto;
  }
}
.cards-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: $s;

  &.use-opacity {
    @for $i from 1 through 3 {
      & > div:nth-child(#{$i}) {
        // from 99% to 66% to 33% opacity
        opacity: 1 - (($i - 1) * 0.33);
      }
    }
  }
}
</style>
