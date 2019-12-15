<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 ma-5 style="max-width:600px">
      <v-card class="elevation-4 pa-3">
        <v-card-text>
          <p class="ma-5 headline">You are now logged out.</p>
          <p class="ma-5 body-1">We are looking forward to seeing you again!</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    errors: []
  }),
  mounted() {
    this.logout();
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
};
</script>
