<template>
  <v-app>
    <v-app-bar
      fixed
      clipped-left
      app
      elevation="0"
      color="rgba(0,0,0,0.8)"
      dark
    >
      <v-toolbar-title class="ml-0 pl-4">
        <nuxt-link style="text-decoration:none" to="/">
          <v-icon class="pb-3" style="font-size: 1.6em; color:#dfdfdf" right
            >map</v-icon
          >
          <span class="display-1" style="color:#dfdfdf">pied</span>
          <span class="display-1" style="color:#ff5722">piper</span>
        </nuxt-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn @click="goToUrl('/')" class="ma-2" outlined>home</v-btn>

      <v-btn
        v-if="!isAuthenticated"
        @click="goToUrl('/signup')"
        class="ma-2 "
        outlined
        >sign up</v-btn
      >
      <v-btn
        v-if="!isAuthenticated"
        @click="goToUrl('/login')"
        class="ma-2 secondary"
        outlined
        >sign in</v-btn
      >
      <v-btn
        v-if="isAuthenticated && $route.name == 'admin'"
        @click="goToUrl('/logout')"
        class="ma-2"
        outlined
        >sign out</v-btn
      >
      <v-btn
        v-if="isAuthenticated && $route.name != 'admin'"
        @click="goToUrl('/admin')"
        class="ma-2 secondary"
        outlined
        >admin</v-btn
      >
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer fixed app>
      <span>&nbsp;https://github.com/AndreiD &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  auth: false,
  data() {
    return {
      title: "𝗙𝗶𝗻𝗱𝗟𝗮𝘆𝗲𝗿.𝗯𝗴",
      auth: this.$auth,
      isLoggedIn: false
    };
  },
  methods: {
    goToUrl(url) {
      this.$router.push(url);
    },
    goToExternalUrl(url) {
      window.open(url, "_blank");
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
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
}
.v-list-item {
  border-left: 10px solid transparent;
}
.v-list-item--active {
  color: #333;
  border-left: 10px solid #ff5722;
}
</style>
