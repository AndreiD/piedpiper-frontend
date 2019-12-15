<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 ma-5 style="max-width:500px">
      <v-form @submit.prevent="login">
        <v-hover v-slot:default="{ hover }">
          <v-card outlined class="pa-5" :elevation="hover ? 2 : 0">
            <v-card-text>
              <v-text-field
                outlined
                v-model="email"
                type="email"
                label="Email"
                flat
                append-icon="mdi-email"
              />

              <v-text-field
                outlined
                v-model="password"
                :append-icon="showPassword ? 'lock' : 'remove_red_eye'"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                label="Password"
                hint="At least 8 characters"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                min-height="50"
                block
                class="primary"
                :loading="isLoading"
                type="submit"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
var shajs = require("sha.js");
export default {
  auth: false,
  data() {
    return {
      password: "test123",
      email: "test@test.com",
      recaptchaToken: "",
      isLoading: false,
      showPassword: false
    };
  },
  methods: {
    async login() {
      try {
        this.isLoading = true;
        await this.$auth
          .loginWith("local", {
            data: {
              email: this.email,
              password: new shajs.sha512().update(this.password).digest("hex"),
              recaptcha_token: this.recaptchaToken
            }
          })
          .catch(error => {
            this.isLoading = false;
            console.log(error);
            this.$toast.error("invalid username or password");
          });
        if (this.$auth.loggedIn) {
          this.isLoading = false;
          this.getUserInfo();
        }
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.$toast.error("failed to login");
      }
    },
    getUserInfo() {
      this.$axios
        .get("/user/me")
        .then(res => {
          console.log("res :", res);
          this.user = res.data;
          this.isLoading = false;
          this.$router.push("/admin");
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          this.flash(error, "error");
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
