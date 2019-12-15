<template>
  <v-container>
    <section>
      <v-layout column wrap class="my-12" align-center>
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="display-3">
              sign
              <span style="background-color:black; padding: 2px 7px 2px 7px;color:#fff">IN</span>
            </h2>
          </div>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 ma-5 style="max-width:500px">
          <v-form>
            <v-text-field outlined v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-text-field
              :append-icon="showPassword ? 'lock' : 'remove_red_eye'"
              :type="showPassword ? 'text' : 'password'"
              outlined
              v-model="password"
              :rules="passwordRules"
              label="Password"
              @click:append="showPassword = !showPassword"
              required
            ></v-text-field>

            <v-btn outlined color="black white--text" @click="login">SIGN IN</v-btn>
            <div class="mt-5">
              don't have an account ?
              <nuxt-link to="signup">sign up</nuxt-link>
            </div>
          </v-form>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      showPassword: false,
      password: null,
      passwordRepeat: null,
      nickname: "",
      nicknameRules: [
        v =>
          (v && v.length >= 3) || "Nickname must be greater than 3 characters"
      ],
      passwordRules: [
        v =>
          (v && v.length >= 5) || "Password must be greater than 5 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  mounted() {
    this.search = "";
  },
  methods: {
    async login() {
      try {
        this.loading = true;

        await this.$auth
          .loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
            this.$toast.error("wrong email/password");
          });
        if (this.$auth.loggedIn) {
          this.loading = false;
          this.getUserInfo();
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.$toast.error("wrong email or password");
      }
    },
    getUserInfo() {
      this.$axios
        .get("/user/me")
        .then(res => {
          this.user = res.data;
          localStorage.setItem("user", JSON.stringify(this.user));
          console.log("/user/me data >>--->", res.data);
          this.isLoading = false;
          console.log("this.user login ->", this.user);
          // if (this.user["is_locked"] == 1) {
          //   console.log("USER IS LOCKED");
          //   window.location.href = "/account_locked";
          //   return;
          // }
          // if (this.user["phone_verified"] == 0) {
          //   console.log("Phone verification required");
          //   window.location.href = "/phone_verification";
          //   return;
          // }
          // if (this.user["workplace_assigned"] == 0) {
          //   console.log("redirecting to pick place");
          //   window.location.href = "/places";
          //   return;
          // }
          // if (this.user["workplace_approved"] == 0) {
          //   console.log("place pending approval");
          //   window.location.href = "/places/pending_approval";
          //   return;
          // }
          // if (this.user["kyc_passed"] == 0) {
          //   console.log("USER DID NOT PASS KYC");
          //   localStorage.setItem("kyc_passed", false);
          //   window.location.href = "/kyc";
          //   return;
          // }
          // localStorage.setItem("kyc_passed", true);
          // window.location.href = "/";
        })
        .catch(error => {
          console.log(error);
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
