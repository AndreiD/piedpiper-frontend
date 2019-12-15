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
                    {{ user.city }} - {{ user.country }}
                  </div>
                  <v-list-item-title class="headline mb-1"
                    >{{ user.first_name }}
                    {{ user.last_name }}</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    user.paragraph | truncate(2000, "...")
                  }}</v-list-item-subtitle>

                  <v-list-item-subtitle class="headline">{{
                    user.offers | truncate(2000, "...")
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar size="256" tile color="grey">
                  <img
                    v-bind:src="user.pic_url"
                    style=" object-fit: cover;"
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

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col :cols="12">
            <v-card style="min-height:300px" outlined>
              <v-card-text>
                <div v-for="chat in chats" :key="chat.id" style="max-width:80%">
                  <p></p>
                  <div
                    v-if="chat.to_user_id != user._id"
                    class="ma-3 left-bubble"
                  >
                    <p class="msg-name">
                      {{ chat.message }}
                      <span class="caption">{{
                        timeAgo(chat.created_at)
                      }}</span>
                    </p>
                  </div>

                  <div
                    v-if="chat.to_user_id == user._id"
                    class="ma-3 right-bubble"
                  >
                    <p class="msg-name">
                      {{ chat.message }}
                      <span class="caption">{{
                        timeAgo(chat.created_at)
                      }}</span>
                    </p>

                    <p class="caption"></p>
                  </div>
                </div>
                <v-text-field
                  outlined
                  placeholder="Type Your Message"
                  v-model="message"
                  ref="message"
                >
                </v-text-field>
                <v-btn class="primary" @click="sendMessage()"
                  >SEND MESSAGE</v-btn
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
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  auth: false,
  data: () => ({
    user: null,
    showCallDialog: false,
    message: "",
    myUser: null,
    name: null,
    id: null,
    isLoading: false,
    chats: []
  }),
  mounted() {
    this.name = this.$route.params.name;
    this.id = this.$route.params.id;
    this.getMyInfo();
    this.loadUser(this.id);
    this.loadChat(this.id);
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
    getMyInfo() {
      this.$axios
        .get("/user/me")
        .then(res => {
          this.myUser = res.data;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          this.flash(error, "error");
        });
    },
    loadChat() {
      this.isLoading = true;
      this.$axios
        .get("/user/chats?page=1&limit=100")
        .then(response => {
          this.isLoading = false;
          let data = response["data"];
          if (data == null) {
            console.log("no results found!");
            return;
          }
          this.chats = data;
          this.chats = this.chats.reverse();
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error);
          this.$toast.error(error.response.data.error);
        });
    },
    loadUser() {
      this.isLoading = true;
      this.$axios
        .get("/u/" + this.id)
        .then(response => {
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
      if (this.message.length > 1000) {
        this.$toast.error("maximum 1000 characters allowed");
        return;
      }
      if (this.message.length < 1) {
        this.$toast.error("what's your message?");
        return;
      }

      if (this.user._id == this.myUser._id) {
        this.$toast.info("did you just try to talk with yourself ?");
      }

      this.isLoading = true;
      const self = this;
      this.$axios
        .post("/user/chat", {
          to_user_id: this.user._id,
          message: this.message,
          metadata: this.user.first_name + this.user.last_name
        })
        .then(response => {
          console.log(response.status);
          this.$toast.success("Message Sent!");
          self.isLoading = false;
          this.message = "";
          this.loadChat(this.id);
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
    },
    getFormattedDate(date, prefomattedDate = false, hideYear = false) {
      const MONTH_NAMES = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const day = date.getDate();
      const month = MONTH_NAMES[date.getMonth()];
      const year = date.getFullYear();
      var hours = date.getHours();
      let minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
      }
      if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes} ${ampm}`;
      }
      if (hideYear) {
        // 10. January at 10:20
        return `${day}. ${month} at ${hours}:${minutes} ${ampm}`;
      }
      // 10. January 2017. at 10:20
      return `${day}. ${month} ${year}. at ${hours}:${minutes} ${ampm}`;
    },
    timeAgo(dateParam) {
      if (!dateParam) {
        return null;
      }
      const date =
        typeof dateParam === "object" ? dateParam : new Date(dateParam * 1000);
      const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
      const today = new Date();
      const yesterday = new Date(today - DAY_IN_MS);
      const seconds = Math.round((today - date) / 1000);
      const minutes = Math.round(seconds / 60);
      const isToday = today.toDateString() === date.toDateString();
      const isYesterday = yesterday.toDateString() === date.toDateString();
      const isThisYear = today.getFullYear() === date.getFullYear();
      if (seconds < 5) {
        return "now";
      } else if (seconds < 60) {
        return `${seconds} seconds ago`;
      } else if (seconds < 90) {
        return "about a minute ago";
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (isToday) {
        return this.getFormattedDate(date, "Today"); // Today at 10:20
      } else if (isYesterday) {
        return this.getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
      } else if (isThisYear) {
        return this.getFormattedDate(date, false, true); // 10. January at 10:20
      }
      return this.getFormattedDate(date); // 10. January 2017. at 10:20
    }
  }
};
</script>
<style scoped>
.chat-box {
  height: 500px;
  width: 100%;
  overflow: scroll;
}
.chat-item {
  border: none;
}
.chat-status {
  min-height: 49px;
}
.chat-status .chat-date {
  display: block;
  font-size: 10px;
  font-style: italic;
  color: #999;
  height: 15px;
  left: 10%;
  right: 10%;
}
.chat-status .chat-content-center {
  padding: 5px 10px;
  background-color: #e1e1f7;
  border-radius: 6px;
  font-size: 12px;
  color: #555;
  height: 34px;
  left: 10%;
  right: 10%;
}
.right-bubble {
  position: relative;
  background: #dcf8c6;
  border-top-left-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  left: 15%;
}
.right-bubble span.msg-name {
  font-size: 12px;
  font-weight: bold;
  color: green;
  display: block;
}
.right-bubble span.msg-date {
  font-size: 10px;
  display: block;
}
.right-bubble:after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-left-color: #dcf8c6;
  border-right: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-right: -27px;
}
.left-bubble {
  position: relative;
  background: #efefef;
  border-top-right-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
  padding: 5px 10px 10px;
  left: 5%;
}
.left-bubble span.msg-name {
  font-size: 12px;
  font-weight: bold;
  color: blue;
  display: block;
}
.left-bubble span.msg-date {
  font-size: 10px;
  display: block;
}
.left-bubble:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 27px solid transparent;
  border-right-color: #efefef;
  border-left: 0;
  border-top: 0;
  margin-top: -0.5px;
  margin-left: -27px;
}
footer.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  border-top: solid 1px #efefef;
}
</style>
