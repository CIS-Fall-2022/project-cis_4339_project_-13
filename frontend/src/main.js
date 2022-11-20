import { createApp } from 'vue'
import router from './router'
//import BootstrapVue3 from 'bootstrap-vue-3'
import App from './App.vue'
import './index.css'

// -- adding bootstrap to main.js --
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

//import axios from "axios";

const app = createApp(App);
app.use(router);
//app.use(BootstrapVue3)
app.mount('#app');
