<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
    <div> <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Events in the Last 2 Months</h1> </div>
    <div style="width: 1000px; min-height: 100px; height: auto; margin: 80px auto 0px auto; padding: 10px 10px; overflow:auto">
      <BarChart
        v-if="!loading && !error"
        :label="labels"
        :chart-data="attendees"
      ></BarChart>

      <!-- Start of loading animation -->
      <div class="mt-40" v-if="loading">
        <p
          class="
            text-6xl
            font-bold
            text-center text-gray-500
            animate-pulse
          "
        >
          Loading...
        </p>
      </div>
      <!-- End of loading animation -->

      <!-- Start of error alert -->
      <div class="mt-12 bg-red-50" v-if="error">
        <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
          {{ error.title }}
        </h3>
        <p class="p-4 text-lg font-bold text-red-900">
          {{ error.message }}
        </p>
      </div>
      <!-- End of error alert -->
      <br />
      <br />
    </div>
    <div class="flex flex-col col-span-2" style="width: 400px; min-height: 100px; height: auto; margin: 5px auto 0px auto; padding: 10px 10px; overflow:auto">
      <table style="border: 1px solid black;"> 
        <thead>
        <tr> 
          <th style="border: 1px solid black;"> Event Name </th>
          <th style="border: 1px solid black;"> Number of Attendees </th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="event in tabledata" :key="event._id"> 
            <td style="border: 1px solid black; text-align: center"> {{event.eventName}}</td>
            <td style="border: 1px solid black; text-align: center"> {{event.attendees[0]}} </td>


          </tr>
          
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import BarChart from './BarChart.vue';
import axios from 'axios';
export default {
  components: {
    BarChart,
  },
  data() {
    return {
      tabledata: [],
      labels: [],
      attendees: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = import.meta.env.VITE_ROOT_API + `/eventdata/dashboard`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.tabledata = response.data
        this.labels = response.data.map((item) => item.eventName);
        this.attendees = response.data.map((item) => item.attendees);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
