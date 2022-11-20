<template>
  <canvas ref="myChart"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js'

//code taken from class and edited
Chart.register(...registerables);
export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  async mounted() {
    console.log(this.chartData);
    await new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: this.label,
        datasets: [
          {
            label: "Attendees",
            backgroundColor: "rgb(255, 102, 102)",
            data: this.chartData,
            barThickness: 80
          },
        ],
      },
      options: {
        scales: {
            y: {
                max:10 
            }
        }
      }
    });
  },
};
</script>