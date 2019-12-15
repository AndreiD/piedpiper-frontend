<template>
  <v-app>
    <v-app-bar fixed clipped-left app elevation="0" color="#FFF">
      <v-toolbar-title class="ml-0 pl-4">
        <nuxt-link style="text-decoration:none" to="/">
          <img
            justify="center"
            align="center"
            style="height: 64px;"
            src="/upstacklogo.png"
            alt="upstack logo"
          />
        </nuxt-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn @click="goToUrl('/')" class="ma-2" style="color: #555" outlined>
        <v-icon left>home</v-icon>
        home</v-btn
      >

      <v-btn
        v-if="!isAuthenticated"
        @click="goToUrl('/signup')"
        class="ma-2 "
        outlined
        style="color: #555"
        ><v-icon left>account_circle</v-icon>sign up</v-btn
      >
      <v-btn
        v-if="!isAuthenticated"
        @click="goToUrl('/login')"
        class="ma-2 secondary white--text"
        outlined
        ><v-icon left>pets</v-icon>sign in</v-btn
      >

      <v-btn
        v-if="isAuthenticated"
        @click="goToUrl('/messages')"
        class="ma-2"
        style="color: #555"
        outlined
        ><v-icon left>message</v-icon>messages</v-btn
      >

      <v-btn
        v-if="isAuthenticated && $route.name != 'admin'"
        @click="goToUrl('/admin')"
        class="ma-2 primary white--text"
        outlined
        ><v-icon left>face</v-icon>admin</v-btn
      >

      <v-btn
        v-if="isAuthenticated && $route.name == 'admin'"
        @click="goToUrl('/logout')"
        class="ma-2"
        style="color: #555"
        outlined
        ><v-icon left>remove_circle</v-icon>sign out</v-btn
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
      title: "Hackathon...",
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
