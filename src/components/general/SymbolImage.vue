<template>
  <div class="symbol-image">
    <img :src="src" :alt="alt" :class="{ 'aspect-ratio': useAspectRatio }" />
    <span>{{ text }}</span>
    <slot name="additional-content" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'SymbolImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: 'Symbol-Bild',
    },
    useAspectRatio: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.symbol-image {
  display: block;
  position: relative;
  > img {
    width: 100%;
    height: auto;
    border-radius: $border-radius;
    object-fit: cover;
    &.aspect-ratio {
      aspect-ratio: 3 / 2;
    }
  }
  > span {
    @include title;
    padding: $xxxs;
    background-color: $dark-purple;
    color: orangered;
    border-radius: $border-radius;
    position: absolute;
    left: 0;
    right: 0;
    bottom: calc(50% - 24px);
    margin-inline: auto;
    width: fit-content;
  }
}
</style>
