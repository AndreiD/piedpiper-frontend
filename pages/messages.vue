<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 ma-5 style="max-width:900px">
      <v-layout column wrap>
        <v-flex xs12 sm4>
          <h2 class="display-1">
            Inbox
          </h2>
        </v-flex>
      </v-layout>
      <v-container fluid>
        <v-col :cols="12">
          <div v-if="chats.length > 0">
            <v-list two-line>
              <template v-for="chat in chats">
                <v-list-item
                  @click="goToUser(chat.from_user_name, chat.to_user_id)"
                  :key="chat.message"
                >
                  <v-list-item-avatar>
                    <v-img :src="chat.from_user_pic"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-html="chat.message"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="timeAgo(chat.created_at)"
                    ></v-list-item-subtitle>

                    <v-divider></v-divider>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </div>
          <div class="text-xs-center justify-center" v-if="chats.length < 1">
            <v-layout justify-center>
              <p class="justify-center">
                you can start by sending someone a message. your chat history
                will appear here
              </p>
            </v-layout>
          </div>
        </v-col>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  auth: true,
  data: () => ({
    showCallDialog: false,
    message: "",
    myUser: null,
    name: null,
    id: null,
    isLoading: false,
    chats: []
  }),
  mounted() {
    this.getMyInfo();
  },
  methods: {
    getMyInfo() {
      this.$axios
        .get("/user/me")
        .then(res => {
          this.myUser = res.data;
          this.loadChat();
          setInterval(function() {
            this.loadChat();
          }, 3000);
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          this.flash(error, "error");
        });
    },
    goToUser(userName, userID) {
      this.$router.push({
        path: "/user/" + userName + "/" + userID
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
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error);
          this.$toast.error(error.response.data.error);
        });
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
.chatImg {
  width: 60px;
  height: 60px;
  -webkit-border-radius: 60px;
  -webkit-background-clip: padding-box;
  -moz-border-radius: 60px;
  -moz-background-clip: padding;
  border-radius: 60px;
  background-clip: padding-box;
  background-size: cover;
  background-position: center center;
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
