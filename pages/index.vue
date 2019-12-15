<template>
  <v-container>
    <section>
      <v-layout column wrap class="my-12" align-center>
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="display-3">
              Find an upstacker
              <span
                style="background-color:rgba(0,0,0,0.8); padding: 2px 7px 2px 7px;color:#fff"
                >near me</span
              >
            </h2>
            <h3 class="mt-5">
              an easy to use location based social network
            </h3>
          </div>
        </v-flex>
      </v-layout>
    </section>

    <div v-if="!isLoading">
      <v-container fluid class="pa-0 ma-0">
        <GmapMap
          ref="mapRef"
          :center="{ lat: 54.52, lng: 15.25 }"
          :zoom="5"
          map-type-id="roadmap"
          fullscreenControl="true"
          style="width: 1200px; height: 1200px"
        >
          <GmapInfoWindow
            v-if="selectedUser"
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
          >
            <p class="title">{{ selectedUser.name }}</p>
            <p class="subtitle">{{ selectedUser.offers }}</p>

            <v-btn small class="secondary" @click="goToUser()">chat</v-btn>
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
  </v-container>
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
      center: {
        lat: 47.376332,
        lng: 8.547511
      },
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
                  height: 32,
                  width: 32
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
