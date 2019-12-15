import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB2F_Jls4pggjIuZhgL88HV2MnOEk0U_tY",
    libraries: "places"
  }
});
