<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md8 mt-5>
      <v-container fluid>
        <v-row v-if="user">
          <v-col :cols="12">
            <v-card outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">
                    {{ user.type }} - {{ user.company }}
                  </div>
                  <v-list-item-title class="headline mb-1"
                    >{{ user.first_name }}
                    {{ user.last_name }}</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    user.paragraph | truncate(2000, "...")
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar size="125" color="grey">
                  <img
                    v-bind:src="user.pic_url"
                    class="img-circle"
                    v-bind:alt="user.last_name"
                  />
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  @click="showCallDialog = !showCallDialog"
                  :elevation="0"
                  color="accent"
                  min-width="220"
                >
                  <v-icon left>mdi-phone</v-icon>call
                </v-btn>

                <v-btn
                  @click="showMessageDialog = !showMessageDialog"
                  :elevation="0"
                  color="primary"
                  min-width="220"
                >
                  <v-icon left>mdi-email</v-icon>message
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col :cols="6">
            <v-card style="min-height:300px" outlined>
              <v-card-text>
                <p class="title mb-4"><v-icon left>build</v-icon>Expertise</p>

                <v-chip
                  color="rgba(0, 0, 0, 0.47)"
                  class="white--text mr-1"
                  v-for="exp in user.expertise"
                  :key="exp"
                  >{{ exp }}</v-chip
                >

                <p class="title mb-4 mt-5">
                  <v-icon left>favorite</v-icon>Perks
                </p>

                <p class="subtitle">
                  <span
                    color="rgba(0, 0, 0, 0.47)"
                    v-for="perk in user.perks"
                    :key="perk"
                  >
                    <v-icon>check</v-icon>
                    {{ perk }}
                  </span>
                </p>

                <p v-if="user.fee" class="mt-5 subtitle">
                  <span color="rgba(0, 0, 0, 0.47)"
                    >Approximate Rate: {{ user.fee }}
                    {{ user.fee_currency }} per hour</span
                  >
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col :cols="6">
            <v-card style="min-height:300px" outlined>
              <v-card-text>
                <p class="title mb-4">
                  <v-icon left>translate</v-icon>Languages
                </p>

                <v-chip
                  color="rgba(0, 0, 0, 0.47)"
                  class="white--text mr-1"
                  v-for="lang in user.languages"
                  :key="lang"
                  >{{ lang }}</v-chip
                >

                <p class="title mb-4 mt-4">
                  <v-icon left>access_time</v-icon>Office Hours
                </p>

                <span color="rgba(0, 0, 0, 0.47)" class="mr-1"
                  >9:00 - 17:00</span
                >

                <p class="title mt-5 mb-4"><v-icon left>map</v-icon>Address</p>

                <span color="rgba(0, 0, 0, 0.47)" class="mr-1"
                  >{{ user.address }}, {{ user.city | title }}</span
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- DIALOG PHONE CONTACT -->
      <div v-if="user">
        <v-dialog v-model="showCallDialog" width="500">
          <v-card class="text-center">
            <v-card-title class="text-center" primary-title>
              <v-icon left>mdi-phone</v-icon>Phone Contact
            </v-card-title>

            <v-card-text class="mt-5 text-center">
              <p class="title">
                You can reach {{ user.first_name }} {{ user.last_name }} via the
                number below
              </p>
              <v-btn x-large class="ma-5 primary" @click="openPhone()">{{
                formatPhone(user.phone)
              }}</v-btn>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="showCallDialog = false"
                >CLOSE</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!-- DIALOG MESSAGE CONTACT -->
      <v-row justify="center">
        <v-dialog max-width="700" v-if="user" v-model="showMessageDialog">
          <v-card class="text-center">
            <v-card-title class="text-center" primary-title>
              <v-icon left>mdi-email</v-icon>E-mail Contact
            </v-card-title>

            <v-card-text class="mt-5 text-center">
              <v-form>
                <v-text-field
                  outlined
                  v-model="messagePayload.first_name"
                  type="text"
                  label="Fist Name"
                  flat
                />
                <v-text-field
                  outlined
                  v-model="messagePayload.last_name"
                  type="text"
                  label="Last Name"
                  flat
                />
                <v-text-field
                  outlined
                  v-model="messagePayload.phone"
                  type="phone"
                  label="Phone"
                  flat
                />
                <v-text-field
                  outlined
                  v-model="messagePayload.email"
                  type="email"
                  label="Email"
                  flat
                />

                <v-textarea
                  v-model="messagePayload.message"
                  outlined
                  counter
                  :maxlength="1000"
                  label="Please describe your need/case"
                ></v-textarea>
                <v-checkbox
                  v-model="checkbox1"
                  checked="false"
                  color="success"
                  label="By ticking this box you agree to our Terms and Privacy."
                ></v-checkbox>

                <v-checkbox
                  checked="false"
                  v-model="checkbox2"
                  color="success"
                  label="By ticking this box you agree to us collecting the necessary information to process your request."
                ></v-checkbox>

                <v-btn
                  @click="sendMessage()"
                  block
                  class="primary"
                  :loading="isLoading"
                  >SEND MESSAGE</v-btn
                >
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="showMessageDialog = false"
                >CLOSE</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  auth: false,
  data: () => ({
    user: null,
    showMessageDialog: false,
    showCallDialog: false,
    name: null,
    id: null,
    checkbox1: true, //TODO: CHANGE THEM TO FALSE
    checkbox2: true, //TODO: CHANGE THEM TO FALSE
    messagePayload: {
      recipient: "",
      first_name: "first name",
      last_name: "last name",
      email: "email@me.com",
      phone: "+3598899038892",
      message: "this is a long message....xyz",
      recaptcha_token: "changeme"
    },
    isLoading: false,
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6
      }
    ]
  }),
  mounted() {
    this.name = this.$route.params.name;
    this.id = this.$route.params.id;
    this.loadUser(this.id);
  },
  computed: {
    mapsIframeURL: function() {
      return (
        "https://maps.google.com/maps/embed/v1/place?key=AIzaSyB2F_Jls4pggjIuZhgL88HV2MnOEk0U_tY&q=" +
        btoa(this.user.address + ", " + this.user.city + ", Bulgaria")
      );
    }
  },
  methods: {
    loadUser(userID) {
      console.log("loading userID :", userID);
      this.isLoading = true;
      this.$axios
        .get("/u/" + userID)
        .then(response => {
          console.log("response :", response);
          this.isLoading = false;
          let data = response["data"];
          if (data == null) {
            console.log("no results found!");
            return;
          }
          this.user = data;
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error);
          this.$toast.error(error.response.data.error);
        });
    },
    sendMessage() {
      if (this.messagePayload.message.length > 1000) {
        this.$toast.error("maximum 1000 characters allowed");
        return;
      }
      if (this.messagePayload.first_name.length < 2) {
        this.$toast.error("please fill the first name");
        return;
      }
      if (this.messagePayload.last_name.length < 2) {
        this.$toast.error("please fill the last name");
        return;
      }
      if (this.messagePayload.phone.length < 2) {
        this.$toast.error("please fill your phone");
        return;
      }
      if (this.messagePayload.email.length < 2) {
        this.$toast.error("please fill your email");
        return;
      }
      if (this.messagePayload.message.length < 2) {
        this.$toast.error("please write your message");
        return;
      }
      if (this.checkbox1 != true || this.checkbox2 != true) {
        this.$toast.error(
          "you have to accept our terms if you want to send the message"
        );
        return;
      }
      this.isLoading = true;
      console.log("this.user :", this.user);
      this.messagePayload.recipient = this.user._id;
      const self = this;
      this.$axios
        .post("/message", this.messagePayload)
        .then(response => {
          console.log(response.status);
          self.showMessageDialog = false;
          this.$toast.success("Message Sent!");
          self.isLoading = false;
        })
        .catch(error => {
          self.isLoading = false;
          this.$toast.error(error.response.data.error);
          console.log(error);
        });
    },
    openPhone() {
      window.open("tel:" + this.user.phone, "_blank");
    },
    formatPhone(phone) {
      return phone
        .replace(/[^0-9]/g, "")
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
  }
};
</script>
./star
