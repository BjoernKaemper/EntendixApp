<template>
  <div ref="chart" class="line-chart" />
</template>

<script lang="ts" setup>
import * as d3 from 'd3';
import {
  ref, onMounted, watch, type PropType,
} from 'vue';

interface UnparsedDataPoint {
  timestamp: string;
  value: number;
}

interface DataPoint {
  timestamp: Date;
  value: number;
}

const props = defineProps(
  {
    data: {
      type: Array as PropType<UnparsedDataPoint[]>,
      required: true,
    },
    width: {
      type: Number as PropType<number>,
      default: 700,
    },
    height: {
      type: Number as PropType<number>,
      default: 300,
    },
    margin: {
      type: Object as PropType<{ top: number; right: number; bottom: number; left: number }>,
      default: () => ({
        top: 20, right: 50, bottom: 40, left: 20,
      }),
    },
  },
);

// Define ref for chart container
const chart = ref<HTMLDivElement | null>(null);

// Parse the date using d3
const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S.%L%Z');

// Map the data to convert timestamp to Date object
const parsedData = ref<DataPoint[]>(props.data.map((d) => ({
  timestamp: parseDate(d.timestamp) as Date,
  value: d.value,
})));

// Function to draw the chart
const drawChart = () => {
  const svgWidth = props.width - props.margin.left - props.margin.right;
  const svgHeight = props.height - props.margin.top - props.margin.bottom;

  if (chart.value) {
    d3.select(chart.value).selectAll('*').remove();

    const svg = d3
      .select(chart.value)
      .append('svg')
      .attr('width', props.width)
      .attr('height', props.height)
      .append('g')
      .attr('transform', `translate(${props.margin.left},${props.margin.top})`);

    // Define scales for x and y axes
    const x = d3
      .scaleTime()
      .domain(d3.extent(parsedData.value, (d) => d.timestamp) as [Date, Date])
      .range([0, svgWidth]);

    // Restore and display the X axis at the bottom
    svg
      .append('g')
      .attr('transform', `translate(0,${svgHeight})`)
      .call(
        d3.axisBottom(x)
          .ticks(8)
          .tickFormat((domainValue) => d3.timeFormat('%d.%m')(domainValue as Date)),
      )
      .selectAll('text')
      .attr('fill', '#372D72');

    const min = d3.min(parsedData.value, (d) => d.value) as number;
    const max = d3.max(parsedData.value, (d) => d.value) as number;

    const y = d3
      .scaleLinear()
      .domain([min * 0.97, max * 1.03])
      .range([svgHeight, 0]);

    // Add horizontal gridlines with dashed lines
    const gridlines = svg
      .append('g')
      .attr('class', 'grid')
      .call(
        d3.axisRight(y).ticks(5).tickSize(svgWidth),
      );

    gridlines.selectAll('line')
      .style('stroke', '#ccc')
      .style('stroke-dasharray', '4,4');

    gridlines.select('.domain').remove();

    // Define line generator for data points
    const line = d3.line<DataPoint>()
      .x((d) => x(d.timestamp))
      .y((d) => y(d.value));

    // Add the line path
    svg
      .append('path')
      .datum(parsedData.value)
      .attr('fill', 'none')
      .attr('stroke', '#372D72')
      .attr('stroke-props.width', 1.3)
      .attr('d', line);

    // Add circles at data points
    svg.selectAll('circle')
      .data(parsedData.value)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.timestamp))
      .attr('cy', (d) => y(d.value))
      .attr('r', 3)
      .attr('fill', '#372D72');
  }
};

// Watch for data changes and redraw the chart
watch(() => props.data, () => {
  parsedData.value = props.data.map((d) => ({
    timestamp: parseDate(d.timestamp) as Date,
    value: d.value,
  }));
  drawChart();
}, { deep: true });

// Draw the chart once on mount
onMounted(() => {
  drawChart();
});
</script>

<style scoped>
.line-chart {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
