import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCM68teubnMqkivyg1vLdrYRxoxQ2RFWjc",
    libraries: "places"
  }
});
