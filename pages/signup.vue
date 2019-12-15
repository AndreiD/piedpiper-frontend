<template>
  <v-container>
    <section>
      <v-layout column wrap class="my-12" align-center>
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="display-3">
              sign
              <span style="background-color:black; padding: 2px 7px 2px 7px;color:#fff">UP</span>
            </h2>
          </div>
        </v-flex>
      </v-layout>

      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 ma-5 style="max-width:500px">
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="nickname"
              outlined
              :rules="nicknameRules"
              label="Nickname"
              required
            ></v-text-field>

            <v-text-field outlined v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-text-field
              outlined
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>

            <v-btn
              style="min-width:120px"
              :loading="isLoading"
              outlined
              color="primary"
              @click="signup"
            >SIGN UP</v-btn>
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
      password: null,
      isLoading: false,
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
    async signup() {
      this.isLoading = true;

      await this.$axios
        .post("/user/register", {
          email: this.email,
          password: this.password,
          nickname: this.nickname
        })
        .then(response => {
          console.log(response.status);
          this.$toast.success("Registration successfully.");
          this.$router.push("/signin");
        })
        .catch(error => {
          self.isLoading = false;
          console.log(error);
          this.$toast.error(error);
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
