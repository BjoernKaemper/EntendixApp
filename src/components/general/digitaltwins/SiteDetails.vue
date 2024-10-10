<template>
  <img
    class="site-detail__image"
    src="@/assets/placeholder-campus-deutz.png"
    :alt="`image of ${site.data.siteName}`"
  />
  <h3>Informationen über die Liegenschaft</h3>
  <div class="group">
    <label for="street-input">Straße</label>
    <input id="street-input" type="text" placeholder="Straße" v-model="street" />
  </div>
  <div class="group">
    <label for="plz-input">PLZ</label>
    <input id="plz-input" type="text" placeholder="PLZ" v-model="zipCode" />
  </div>
  <div class="group">
    <label for="city-input">Stadt</label>
    <input id="city-input" type="text" placeholder="Stadt" v-model="city" />
  </div>
  <div class="group">
    <label for="land-input">Land</label>
    <input id="land-input" type="text" placeholder="Land" v-model="country" />
  </div>
</template>

<script lang="ts">
import type { SiteWithBuildinginformation } from '@/types/global/site/Site';
import type { PropType } from 'vue';

export default {
  props: {
    site: {
      type: Object as PropType<SiteWithBuildinginformation>,
      required: true,
    },
  },
  data() {
    return {
      siteName: '',
      street: '',
      zipCode: '',
      city: '',
      country: '',
    };
  },
  watch: {
    site: {
      handler() {
        if (this.site?.data.address) {
          this.street = this.site.data.address.street;
          this.zipCode = this.site.data.address.zipcode;
          this.city = this.site.data.address.cityTown;
          this.country = this.site.data.address.nationalCode;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss">
.site-detail {
  &__image {
    aspect-ratio: 3 / 2;
    border-radius: $border-radius;
  }
}

h3 {
  @include content-subtitle;
}

p,
label {
  @include content;
}

input {
  background-color: $lightest;
  padding: $base-size $xxs;
  border-radius: $border-radius;
  border: 1px solid $light-purple;

  &::placeholder {
    @include content;
  }

  &:focus {
    outline: none;
  }
}

.group {
  display: flex;
  flex-direction: column;
  gap: $base-size;
}
</style>
