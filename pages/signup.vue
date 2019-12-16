<template>
  <v-container>
    <section>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 ma-5 style="max-width:500px">
          <v-form ref="form">
            <v-text-field v-model="first_name" outlined label="First Name" required></v-text-field>

            <v-text-field v-model="last_name" outlined label="Last Name" required></v-text-field>

            <v-text-field v-model="phone" outlined label="Phone" required></v-text-field>

            <v-text-field outlined v-model="email" label="E-mail" required></v-text-field>

            <v-text-field outlined v-model="password" type="password" label="Password" required></v-text-field>

            <v-text-field outlined v-model="city" label="City" required></v-text-field>

            <v-text-field outlined v-model="country" label="Country" required></v-text-field>

            <p
              class="subtitle"
            >Please make sure that your image url ends up with .jpg .png extension</p>

            <v-text-field outlined v-model="pic_url" label="PIC URL (square works best)"></v-text-field>

            <v-btn
              block
              class="mt-3 mb-3"
              outlined
              @click="locateMe"
            >Don't Know your lat/lng ? Click ME!</v-btn>

            <v-text-field outlined v-model="lng" label="Latitude"></v-text-field>

            <v-text-field outlined v-model="lat" label="Longitude"></v-text-field>

            <v-textarea
              outlined
              v-model="paragraph"
              :maxlength="1000"
              counter
              label="Profile Description"
            ></v-textarea>

            <v-textarea
              outlined
              v-model="offers"
              :maxlength="40"
              counter
              label="Offers (ex: drinks, place to sleep etc)"
            ></v-textarea>

            <v-btn :loading="isLoading" color="primary" block @click="signup">SIGN UP</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
import { getSHA512 } from "../static/hashing";
export default {
  auth: false,
  data() {
    return {
      first_name: null,
      location: null,
      gettingLocation: false,
      last_name: null,
      phone: null,
      city: null,
      address: "undefined",
      country: null,
      pic_url:
        "https://media.glassdoor.com/sqll/2304831/upstack-squarelogo-1552547821116.png",
      paragraph:
        "provide a description what others might want to know about you",
      offers: "drinks, disco, night-club & more",
      valid: true,
      password: null,
      lat: null,
      lng: null,
      isLoading: false,
      passwordRepeat: null,
      email: ""
    };
  },
  mounted() {
    this.search = "";
  },
  methods: {
    signup() {
      const self = this;
      self.isLoading = true;

      var register = {
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone,
        email: this.email,
        password: getSHA512(this.password),
        address: this.address,
        city: this.city,
        pic_url: this.pic_url,
        location: {
          lat: String(this.lat),
          lng: String(this.lng)
        },
        paragraph: this.paragraph,
        offers: this.offers,
        country: this.country
      };

      this.$axios
        .post("/register", register)
        .then(response => {
          console.log(response.status);
          this.$toast.success("All right! Success!!!");
          self.isLoading = false;
        })
        .catch(error => {
          self.isLoading = false;
          this.$toast.error(error.response.data.error);
          console.log(error);
        });
    },
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }
        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(pos);
          },
          err => {
            reject(err);
          }
        );
      });
    },
    async locateMe() {
      this.gettingLocation = true;
      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();
        this.lat = this.location.coords.latitude;
        this.lng = this.location.coords.longitude;
      } catch (e) {
        this.gettingLocation = false;
        console.log("e :", e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#styled-input {
  height: 48px;
}
.styled-input label[for] {
  height: 48px;
}
</style>
