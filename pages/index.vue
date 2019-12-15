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
      <GMap
        ref="gMap"
        :cluster="{ options: { styles: clusterStyle } }"
        :center="{ lat: 54.526, lng: 15.255 }"
        :options="{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative',
          styles: mapStyle
        }"
        :zoom="5"
        @bounds_changed="checkForMarkers"
      >
        <GMapMarker
          v-for="location in locations"
          :key="location.id"
          :position="{ lat: location.lat, lng: location.lng }"
          :options="{
            icon:
              location === currentLocation ? pins.selected : pins.notSelected
          }"
          @click="currentLocation = location"
        >
          <GMapInfoWindow>
            <b>{{ location.name }}</b>
            <br />
            <p>
              {{ location.offers }}
            </p>
          </GMapInfoWindow>
        </GMapMarker>
      </GMap>
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
      currentLocation: {},
      locationsVisibleOnMap: "",
      locations: [],
      pins: {
        selected:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB5VU7SwNBEJ7LmZBgMC+UdKKx0MZCG2srwcbCB2glpFDQ3to/IegvSAIWPrBJIySlipUKKqYLaHJ3iWIelzu/DTk8j71H7MQPltmZnflmZ3b3juivQ3BzCIfDI4FAYBvTRV3XR7tBglCCOIP9oFwuv/46QSwWWwfZIaaDNi7vGOlqtZqhfhPE4/EViAy5V6ljE8uVSuXYc4JkMjncarUeMR0ib5Db7fZEvV6vWBd8PG+Q73LIFYyj3lAsa1G/37/D4+JWgPbcQkybd9jpdGYVRXlmSiQSSYmieMWmhgMuwI0kSTPkpQJgzKJnDfJuKYryBJH7sVNBSPGI7BKoFl3n+GguMY4JHiz6GtoybiisRczmEtPFAM+Ifl6i5DmTKYqeX+Nssj19lUz9N2J4XNxDTiQSkwi4oz6ADU3hLdxb7dwW9RyL5B0FHrltAgZUsEce4eRrmwB3ugCRJ3fk4VvsOwEDHtcWxKeDy4emaWmHdRKdFpvNphQKhdhFmOet42D3sftTJw7X/wHgw/U8h1ywkJ/gYJeI/wi/g8kdmqqqG5Alk62Er+emG7nXBFSr1aroNSNknwOVzZnNS6xIHtFoNF6CweAbpheyLOfo3+ALfrSuzJ1F8EsAAAAASUVORK5CYII=",
        notSelected:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABHElEQVR42uVVyw4BMRQdC98lsbPwG5YSH+BzWFtLZilh0oQgFh6J54IwBmGYtrfaBREdcTvDhpM0adrec3rb+7Csn8fRdrLg7VzBubhDzmHrudRuZ2KRs/miLd6AThfNaOTTGRFIsMm8bkSuXBeGoLVaGi0g39wLI4GTf1EjdE/+E1pAAGgEAenkb/tBo1vQFUDgBbSbny6al77uSQwB/6wJSNHoAo8xj30iaYMW4Lv9wfSTpc0eH6atXtE4TKWNUS4AY2hyddY4k/lwVEZncm9QilQuBGPwnp1B5GIXGi3P0eU0c7EqKrje5hU5d7fr2P2AEJIESkNqB1XJkvhI0/GrTuqZX619tLMF/VHlfnk5/0r7ZMvVWA3rr3AF6LIMZ7PmSlUAAAAASUVORK5CYII="
      },
      clusterStyle: [
        {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 56,
          height: 56,
          textColor: "#fff"
        }
      ],
      mapStyle: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#3e606f"
            },
            {
              weight: 2
            },
            {
              gamma: 0.84
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "on"
            }
          ]
        }
      ]
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

    checkForMarkers() {
      this.locations.forEach((location, i) => {
        location.visible = this.$refs.gMap.map
          .getBounds()
          .contains(this.$refs.gMap.markers[i].getPosition());
      });

      this.locationsVisibleOnMap = this.locations
        .filter(l => l.visible)
        .map(l => l.name)
        .join(", ");
    },
    loadMapUsers() {
      this.$axios
        .get("/users")
        .then(res => {
          this.users = res.data;
          console.log("this.users :", this.users);
          this.users.forEach(user => {
            this.locations.push({
              id: user._id,
              lat: user.location.lat,
              lng: user.location.lng,
              name: user.first_name + " " + user.last_name,
              offers: user.offers,
              icon: user.pic_url
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

<style lang="scss">
.visibleCities {
  position: absolute;
  span {
    font-weight: bold;
  }
}

.flex {
  position: relative;
}

#markerLayer img {
  border: 2px solid red !important;
  width: 85% !important;
  height: 90% !important;
  border-radius: 5px;
}

.GMap__Wrapper {
  width: 100%;
  height: 80vh;
}

.button {
  background-color: #206569;
  color: #fff;
  outline: 0;
  border: 0;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 200ms;
  backface-visibility: hidden;
  &:hover {
    background-color: #12957b;
  }
}
</style>
