<template>
  <main class="flex flex-row">
  <!-- Create links to other pages in top header-->
    <div id="_container" class="h-auto">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link to="/">
              <!-- Link to the main page-->
                <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/intakeform">
              <!-- Link to the intake form page-->
                <span style="position: relative; top: 6px" class="material-icons">people</span>
                Client Intake Form
              </router-link>
            </li>
            <li>
              <router-link to="/eventform">
              <!-- Link to the create event page-->
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Event
              </router-link>
            </li>
            <li>
              <router-link to="/findclient">
              <!-- Link to the find client page-->
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Client
              </router-link>
            </li>
            <li>
              <router-link to="/findEvents">
              <!-- Link to the find event page-->
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="
          background: linear-gradient(250deg, #C8102E 70%, #efecec 50.6%);
        "
      >
        <h1 class="mr-20 text-3xl text-white"> {{org.orgId}} </h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      org: '',
    }
  },
  created() {
            //make call to backend to get orgName
              let apiURL = 'http://localhost:3000/orgData/org';
              axios.get(apiURL).then(res => {
                  this.org = res.data;
              }).catch(error => {
                  console.log(error)
              }); 
          },
  name: "App",
};
</script>

<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
