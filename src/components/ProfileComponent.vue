<template>
  <div class="container">
    <div class="center" v-if="user">
      <div class="field">
        <span class="bold">First Name:</span> <span>{{ user.firstName }}</span>
      </div>
      <div class="field">
        <span class="bold">Surname:</span> <span>{{ user.surName }}</span>
      </div>
      <div class="field">
        <span class="bold">Username:</span> <span>{{ user.username }}</span>
      </div>
      <div class="field">
        <span class="bold">Personal Number:</span>
        <span>{{ user.personalNum }}</span>
      </div>
      <div class="field">
        <span class="bold">Email:</span> <span>{{ user.email }}</span>
      </div>
      <div class="field" v-if="$store.state.userType === 'student'">
        <span class="bold">Class:</span> <span>{{ user.yearLevel }}</span>
      </div>
      <div
        class="field"
        v-if="
          $store.state.userType === 'staff' && user.subjectTeaching.length > 0
        "
      >
        <span class="bold">Subject Teaching:</span>
        <span>{{ user.subjectTeaching.join(", ") }}</span>
      </div>
      <hr />
      <h2>Change Password</h2>
      <div class="field password">
        <span class="bold">Old Password:</span>
        <span>
          <input type="password" v-model="oldPassword" />
        </span>
      </div>
      <div class="field password">
        <span class="bold">New Password:</span>
        <span>
          <input type="password" v-model="newPassword" />
        </span>
      </div>
      <div class="field password">
        <span class="bold">Confirm Password:</span>
        <span>
          <input type="password" v-model="confirm" />
        </span>
      </div>
      <div class="button-container">
        <button class="submit" @click="updatePassword">Submit</button>
      </div>
      <p :class="messageClass">{{ message.text }}</p>
    </div>
    <p v-else>Loading User...</p>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      user: null,
      oldPassword: "",
      newPassword: "",
      confirm: "",
      message: {
        text: "",
        error: null,
      },
    };
  },
  computed: {
    messageClass() {
      if (this.message.error) {
        return "error";
      } else {
        return "error green";
      }
    },
  },
  methods: {
    async getUser() {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await this.$api.get("/users/authenticated", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        this.user = response.data.user;
      } catch (error) {
        console.error(error);
      }
    },
    async updatePassword() {
      if (this.newPassword !== this.confirm) {
        this.message.text =
          "Confirmation has to be the same as the new password";
        this.message.error = true;
      } else {
        try {
          console.log(this.oldPassword, this.newPassword);
          const response = await this.$api.post("/users/change-password", {
            currentPassword: this.oldPassword,
            newPassword: this.newPassword,
          });

          this.oldPassword = "";
          this.newPassword = "";
          this.confirm = "";

          this.message.text = "Successfully updated password!";
          this.message.error = false;
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.message.text = "Old password is incorrect";
            this.message.error = true;
          } else {
            this.message.text = "An unexpected error occurred";
            this.message.error = true;
          }
          console.error(error);
        }
      }
    },
  },
  mounted() {
    this.$emit("getTitle", "profile");
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}

.center {
  display: flex;
  flex-direction: column;
}

h1 {
  margin-bottom: 75px;
}

h2 {
  font-weight: 400;
  font-size: 22px;
  text-align: center;
  text-decoration: underline;
  margin: 0;
  margin-top: 40px;
  margin-bottom: 10px;
}

hr {
  margin: 0 120px;
}

.error {
  color: darkred;
  text-align: center;
}

.green {
  color: darkgreen;
}

.submit {
  width: 100px;
  font-size: 20px;
  border: none;
  background-color: rgb(0, 105, 204);
  color: white;
  border-radius: 30px;
  padding: 10px;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.field {
  font-size: 22px;
  margin: 20px;
  display: flex;
  justify-content: space-between;

  span {
    margin: 0 100px;
  }

  input {
    width: 200px;
    font-size: 18px;
  }

  .bold {
    font-weight: 600;
    font-size: 20px;
  }
}

.password {
  font-size: 16px;
}
</style>
