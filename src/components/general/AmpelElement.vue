<template>
  <v-container class="traffic-light-container d-flex flex-column align-center justify-center">
    <div class="light red-light" :class="{ active: currentLight === 'red' }"></div>
    <div class="light yellow-light" :class="{ active: currentLight === 'yellow' }"></div>
    <div class="light green-light" :class="{ active: currentLight === 'green' }"></div>
  </v-container>
</template>

<script>
export default {
  props: {
    light: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentLight: 'green', // Default value
    };
  },
  watch: {
    light(newLight) {
      // Update currentLight whenever the light prop changes
      this.currentLight = newLight;
    },
  },
  mounted() {
    // Initialize currentLight with the initial prop value
    this.currentLight = this.light;
  },
};
</script>

<style lang="scss">
.traffic-light-container {
  height: 100%;
  background-color: #333;
  gap: 5px;
  padding: 10px;
}

.light {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.red-light {
  background-color: $orange;
  opacity: 0.2;

  &.active {
    background-color: $orange;
    opacity: 1;
  }
}

.yellow-light {
  background-color: $yellow;
  opacity: 0.2;

  &.active {
    background-color: $yellow;
    opacity: 1;
  }
}

.green-light {
  background-color: $light-green;
  opacity: 0.2;
  &.active {
    background-color: $light-green;
    opacity: 1;
  }
}
</style>
