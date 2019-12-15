<template>
  <v-layout align-center justify-center>
    <v-flex v-if="user" xs12 sm8 md8 mt-5>
      <p class="display-1 mt-5 mb-5">Hi {{ user.first_name }}</p>

      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex md12>
            <v-card outlined class="pa-5">
              <v-card-title>
                <v-icon left>mdi-account-circle</v-icon>My Profile
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-textarea
                    outlined
                    v-model="mUser.paragraph"
                    counter
                    :maxlength="1000"
                    label="Describe your services here"
                  ></v-textarea>

                  <v-text-field
                    outlined
                    v-model="mUser.offers"
                    label="Offers"
                  ></v-text-field>

                  <v-text-field
                    outlined
                    v-model="mUser.address"
                    label="Address"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="mUser.city"
                    label="City"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="mUser.country"
                    label="Country"
                  ></v-text-field>

                  <v-btn
                    @click="saveDetails()"
                    :elevation="0"
                    color="accent"
                    min-width="220"
                    >Save Details</v-btn
                  >
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex md6>
            <v-card class="pa-5" style="min-height:250px; " outlined>
              <v-card-title>
                <v-icon left>insert_photo</v-icon>Profile Picture
              </v-card-title>
              <v-card-text>
                <img
                  width="256"
                  class="ma-3"
                  :src="mUser.pic_url + '?rand_number=' + Math.random()"
                  v-bind:alt="mUser.first_name + ' ' + mUser.last_name"
                />

                <v-text-field
                  outlined
                  v-model="mUser.pic_url"
                  label="Pic URL"
                ></v-text-field>

                <v-btn
                  @click="saveDetails()"
                  :elevation="0"
                  color="accent"
                  min-width="220"
                  >Change Profile Picture</v-btn
                >
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex md6>
            <v-card class="pa-5" style="min-height:250px; " outlined>
              <v-card-title> <v-icon left>map</v-icon>Location </v-card-title>
              <v-card-text>
                <v-text-field
                  outlined
                  v-model="mUser.location.lat"
                  label="Latitude"
                ></v-text-field>
                <v-text-field
                  outlined
                  v-model="mUser.location.lng"
                  label="Longitude"
                ></v-text-field>

                <v-btn
                  @click="saveDetails()"
                  :elevation="0"
                  color="accent"
                  min-width="220"
                  >Change Profile Picture</v-btn
                >
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  auth: true,
  data: () => ({
    user: null,
    imageLoading: false,
    mUser: null,
    profilePic: null,
    isLoading: false
  }),
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$axios
        .get("/user/me")
        .then(res => {
          console.log("res :", res);
          let originalUser = res.data;
          console.log("originalUser :", originalUser);
          this.isLoading = false;
          this.user = originalUser;
          this.mUser = originalUser;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          this.flash(error, "error");
        });
    },
    saveDetails() {
      const self = this;
      self.isLoading = true;
      this.mUser.location.lat = String(this.mUser.location.lat);
      this.mUser.location.lng = String(this.mUser.location.lng);
      this.$axios
        .put("/user/me", this.mUser)
        .then(response => {
          console.log(response.status);
          this.$toast.success("Profile Updated Successfully");
          self.getUserInfo();
          self.isLoading = false;
        })
        .catch(error => {
          self.isLoading = false;
          this.$toast.error(error.response.data.error);
          console.log(error);
        });
    }
  }
};
</script>
