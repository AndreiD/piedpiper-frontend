<template>
  <section>
    <v-layout column wrap align-center>
      <v-flex xs12 sm4>
        <div class="text-center">
          <p class="display-1">
            <span style="padding: 2px 7px 2px 7px;color:#555">Find an </span>

            <img
              justify="center"
              align="center"
              style="height: 54px;"
              src="/upstacklogo.png"
              alt="upstack logo"
            />

            <span
              style="background-color:#4891dc; margin-left: -10px; padding: 1px 7px 0px 7px;color:#fff"
              >er</span
            >
            <span style="padding: 2px 7px 2px 7px;color:#555">near me</span>
          </p>
          <p class="body">
            Find upstackers around the world and have fun together
          </p>
        </div>
      </v-flex>
    </v-layout>

    <div v-if="!isLoading">
      <v-container fluid class="pa-0 ma-0 fill-height">
        <GmapMap
          ref="mapRef"
          :center="{ lat: 44.52, lng: 25.25 }"
          :zoom="5"
          map-type-id="roadmap"
          fullscreenControl="true"
          style="height: 100vh; width:100%"
        >
          <GmapInfoWindow
            v-if="selectedUser"
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
          >
            <p class="title">{{ selectedUser.name }}</p>
            <p class="subtitle">{{ selectedUser.offers }}</p>

            <v-btn small block class="secondary" @click="goToUser()"
              >chat</v-btn
            >
          </GmapInfoWindow>

          <GmapMarker
            class="markerStyle"
            v-for="(m, index) in markers"
            :key="index"
            :position="m.position"
            :clickable="true"
            :icon="m.icon"
            :draggable="false"
            @click="toggleInfoWindow(m, index)"
          />
        </GmapMap>
      </v-container>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      search: "",
      isLoading: true,
      users: [],
      selectedUser: null,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: []
    };
  },
  mounted() {
    this.search = "";
    this.loadMapUsers();
  },
  methods: {
    returnToCenter() {
      this.$refs.gMap.map.setCenter(this.locations[0]);
    },

    toggleInfoWindow(marker, idx) {
      this.selectedUser = marker;
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    goToUser() {
      this.$router.push({
        path: "/user/" + this.selectedUser.name + "/" + this.selectedUser.id
      });
    },
    loadMapUsers() {
      this.$axios
        .get("/users")
        .then(res => {
          this.users = res.data;
          console.log("this.users :", this.users);
          this.selectedUser = this.users[0];
          this.users.forEach(user => {
            this.markers.push({
              id: user._id,
              position: {
                lat: user.location.lat,
                lng: user.location.lng
              },
              name: user.first_name + " " + user.last_name,
              offers: user.offers,
              optimized: true,
              icon: {
                url: user.pic_url,
                scaledSize: {
                  height: 45,
                  width: 45
                }
              },
              infoText: user.first_name + " " + user.last_name
            });
          });
          this.isLoading = false;
          console.log("this.locations :", this.locations);
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

<style lang="scss"></style>
