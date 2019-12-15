<template>
  <v-app>
    <v-app-bar flat fixed clipped-left app color="#333" dark>
      <v-toolbar-title style="width: 150px" class="ml-0 pl-4">
        <nuxt-link style="text-decoration:none" to="/">
          <span class="display-1" style="color:#888">to</span>
          <span class="display-1" style="color:#fff">WTF</span>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn @click="goToUrl('write')" class="ma-2" outlined color="#fff">write</v-btn>
      <v-btn @click="goToUrl('signup')" class="ma-2" outlined color="#fff">sign up</v-btn>
      <v-btn @click="goToUrl('signin')" class="ma-2 black--text" color="#fff">sign in</v-btn>
    </v-app-bar>
    <v-content v-cloak>
      <Nuxt />
    </v-content>
    <v-footer color="#333" dark app>
      <a
        disabled
        style="text-decoration: none; color: #b0bec5"
        text
        href="https://frontrx.com"
      >to.wtf &copy; 2019</a>&nbsp;
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      title: "to.wtf"
    };
  },
  methods: {
    goToUrl(url) {
      this.$router.push(url);
    },
    goToExternalUrl(url) {
      window.open(url, "_blank");
    }
  }
};
</script>
<style scoped>
#styled-input {
  height: 48px;
  width: 48px;
}
.styled-input label[for] {
  height: 48px;
}
.v-navigation-drawer > .list:not(.list--dense) .list__tile {
  font-size: 17px;
}
.avatar {
  max-width: 75px;
}
/* .list__tile--active.list__tile.list__tile--link {
} */
a.nuxt-link-exact-active.list__tile--active.list__tile.list__tile--link {
  font-weight: 900 !important;
  color: #3f51b5 !important;
}
.v-list-item {
  border-left: 10px solid transparent;
}
.v-list-item--active {
  color: black;
  border-left: 10px solid red;
}
</style>
