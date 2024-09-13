<template>
  <div class="line-chart-container">
    <div class="line-chart-container--left">
      <h3>{{ topic }}</h3>
      <BigNumber number="135,27" unit="kWh/m2/a" />
       <p class="last-update">Letzte Aktualisierung vor: {{ lastUpdate }} Minuten</p>
    </div>
    <div class="line-chart-container--right">
      <p>insert Line Chart here...</p>
    </div>
  </div>
</template>

<script lang="ts">
import BigNumber from '@/components/general/BigNumber.vue';

export default {
  props: {
    /**
     * The topic of the line chart
     * @type {String}
     * @default 'Line Chart'
     */
    topic: {
      type: String,
      required: true,
      default: 'Line Chart',
    },
  },
  components: {
    BigNumber,
  },
  data() {
    return {
      lastUpdate: 0,
    };
  },
};

</script>

<style lang="scss">
@import '@/styles/mixins.scss';

  .line-chart-container {
    width: 100%;
    height: 35%;
    background-color: $lightest;
    border-radius: $base-size;
    padding: $m;
    display: grid;
    grid-template-columns: 1fr 2fr;

    > .line-chart-container--left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    > .line-chart-container--right {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .last-update {
    @include meta-information;
  }
</style>
