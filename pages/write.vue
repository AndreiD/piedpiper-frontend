<template>
  <v-container>
    <section>
      <v-layout column wrap class="my-12" align-center>
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="display-3">
              write
              <span style="background-color:black; padding: 2px 7px 2px 7px;color:#fff">CONTENT</span>
            </h2>
          </div>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  mounted() {
    this.search = "";
  },
  methods: {
    toSearchResolver() {}
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
