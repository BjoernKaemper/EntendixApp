<template>
  <div>
    <v-data-iterator :items="kpis" :items-per-page="kpisPerPage" item-value="name">
      <template v-slot:default="{ items, isExpanded, toggleExpand }">
        <v-row v-for="kpi in items" :key="kpi.raw.name">
          <v-col :key="kpi.raw.name" cols="12">
            <v-card
              variant="outlined"
              style="border-radius: 20px; background-color: rgba(178, 255, 169, 0.3)"
            >
              <v-card-text class="text-h6">
                <v-row>
                  <v-col cols="3">
                    <v-avatar
                      :style="{ border: `2px solid ${kpi.raw.color}` }"
                      size="50"
                      color="#f5f5f5"
                    >
                      {{ kpi.raw.value }}
                    </v-avatar>
                  </v-col>
                  <v-col cols="9">
                    <v-list-item :title="kpi.raw.name" lines="two" density="comfortable">
                      <template v-slot:title>
                        <v-card-subtitle class="multiline">{{ kpi.raw.name }}</v-card-subtitle>
                      </template>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider />
              <div class="px-8">
                <v-switch
                  :model-value="isExpanded(kpi)"
                  :label="`${isExpanded(kpi) ? 'Hide' : 'Show'} details`"
                  density="compact"
                  @click="() => toggleExpand(kpi)"
                />
              </div>
              <v-divider />
              <v-expand-transition>
                <div v-if="isExpanded(kpi)">To be done</div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kpisPerPage: 4,
      kpis: [
        {
          name: 'Behaglichkeit',
          value: '4',
          color: '#FF9966',
        },
        {
          name: 'Energieeffizienz',
          value: '9',
          color: '#33FF33',
        },
      ],
      /* color palette
            Green (for 10): #00FF00
            Lighter Green: #33FF33
            Moderate Green: #66FF66
            Mild Green: #99FF99
            Neutral: #B0E57C (a balanced mix of green and red)
            Mild Red: #FF9966
            Moderate Red: #FF6347
            Lighter Red: #FF3300
            Red (for 1): #FF0000
            */
    };
  },
};
</script>

<style scoped>
.custom-avatar {
  background-color: #ffffff; /* White background color */
  border: 2px solid #4caf50; /* Green border color */
  box-sizing: content-box; /* Ensure the border is included in the size */
}

.title-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.multiline {
  white-space: pre-wrap;
  font-size: medium;
  font-weight: 400;
}
</style>
