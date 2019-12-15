<template>
  <v-container>
    <section>
      <v-layout column wrap class="my-12" align-center>
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="display-3">
              sign
              <span
                style="background-color:black; padding: 2px 7px 2px 7px;color:#fff"
                >UP</span
              >
            </h2>
          </div>
        </v-flex>
      </v-layout>

      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 ma-5 style="max-width:500px">
          <v-form ref="form">
            <v-text-field
              v-model="first_name"
              outlined
              label="First Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="last_name"
              outlined
              label="Last Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="phone"
              outlined
              label="Phone"
              required
            ></v-text-field>

            <v-text-field
              outlined
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              outlined
              v-model="password"
              type="password"
              label="Password"
              required
            ></v-text-field>

            <v-text-field
              outlined
              v-model="address"
              label="Address"
              required
            ></v-text-field>

            <v-text-field
              outlined
              v-model="city"
              label="City"
              required
            ></v-text-field>

            <v-text-field
              outlined
              v-model="country"
              label="Country"
              required
            ></v-text-field>

            <v-text-field
              outlined
              v-model="pic_url"
              label="PIC URL (square works best)"
            ></v-text-field>

            <v-text-field
              outlined
              v-model="lng"
              label="Latitude"
            ></v-text-field>

            <v-text-field
              outlined
              v-model="lat"
              label="Longitude"
            ></v-text-field>

            <v-textarea
              outlined
              v-model="paragraph"
              label="Profile Description"
            ></v-textarea>

            <v-textarea
              outlined
              v-model="offers"
              label="Offers (ex: drinks, place to sleep etc)"
            ></v-textarea>

            <v-btn :loading="isLoading" color="primary" block @click="signup"
              >SIGN UP</v-btn
            >
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
      last_name: null,
      phone: null,
      city: null,
      address: null,
      country: null,
      pic_url: null,
      paragraph: null,
      offers: null,
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
