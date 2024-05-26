<template>
  <div class="container">
    <div class="center">
      <img class="ies-logo" src="@/assets/logo.png" alt="Logo" />
      <form v-if="loginForm">
        <h1>Login</h1>
        <div>
          <label for="role">I am</label>
          <select type="text" id="role" v-model="loginRole">
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <div>
          <label for="username">Username</label>
          <input type="text" id="username" v-model="loginUsername" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model="loginPassword" />
        </div>
        <div>
          <p class="message-link" @click="loginForm = false">
            Forgot password?
          </p>
          <p class="error">{{ error }}</p>
          <button @click.prevent="login" class="login-btn">Login</button>
        </div>
      </form>
      <form v-else>
        <h1>Reset Password</h1>
        <div>
          <label for="username">Username</label>
          <input type="text" id="username" v-model="resetUsername" />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="resetEmail" />
        </div>
        <div>
          <label for="password">New Password</label>
          <input type="password" id="password" v-model="resetPassword" />
        </div>
        <div>
          <label for="confirm">Confirm Password</label>
          <input type="password" id="confirm" v-model="resetConfirm" />
        </div>
        <div>
          <p class="message-link" @click="loginForm = true">Back</p>
          <p class="error">{{ error }}</p>
          <button @click.prevent="reset" class="login-btn">Reset</button>
        </div>
      </form>
      <img class="logo" src="@/assets/schoolsoft-logo.png" alt="SchoolSoft" />
      <h3>Delivered by SchoolSoft {{ new Date().getFullYear() }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginRole: "",
      loginUsername: "",
      loginPassword: "",

      resetUsername: "",
      resetEmail: "",
      resetPassword: "",
      resetConfirm: "",

      loginForm: true,

      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const formData = {
          role: this.loginRole,
          username: this.loginUsername,
          password: this.loginPassword,
        };

        const response = await this.$api.post("/users/login", formData);

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        this.$store.commit("setUserType", this.loginRole);
        this.$router.push(`/${this.loginRole}/start`);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data === "All fields required") {
            this.error = "All fields required";
          } else {
            this.error = "Incorrect credentials";
          }
        } else {
          this.error = "An unexpected error occurred";
        }
        console.error(error);
      }
    },
    async reset() {
      if (this.resetPassword !== this.resetConfirm) {
        this.error = "Confirmation has to be the same as the new password";
      } else {
        try {
          const form = {
            username: this.resetUsername,
            email: this.resetEmail,
            password: this.resetPassword,
          };

          const response = await this.$api.post("/users/reset-password", form);

          this.loginForm = true;
          this.error = false;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            this.error = "Incorrect credentials";
          } else {
            this.error = "An unexpected error occurred";
          }
          console.error(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;

  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ies-logo {
    width: 110px;
    margin: 20px;
    margin-bottom: 50px;
  }

  .logo {
    width: 200px;
    margin-top: 50px;
  }

  h3 {
    color: grey;
    font-weight: 500;
    font-size: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 450px;
    border: 2px solid rgb(19, 19, 124);
    border-radius: 20px;
    text-align: center;

    .error {
      text-align: center;
      color: darkred;
    }

    .message-link {
      color: darkblue;
    }
    .message-link:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    h1 {
      margin-bottom: 50px;
    }

    div {
      // width: 100px;
      // font-size: 17px;
      // margin: 30px 0;

      display: flex;
      flex-direction: column; /* Stack label and input vertically */
      align-items: center; /* Center align items horizontally */
      width: 100%; /* Full width of the form */
      margin-bottom: 20px; /* Adjust as needed for spacing */

      label {
        display: inline-block;
        margin: 0;
        width: 200px;
        text-align: center;
      }

      input,
      select {
        font-size: 18px;
        margin-top: 10px;
        padding: 10px;
        border-radius: 50px;
        border: 1px solid black;
        background-color: white;
        width: 200px;
      }

      input:focus {
        outline: none;
        border: 2px solid rgb(19, 19, 124);
      }
    }

    .login-btn {
      padding: 15px;
      font-size: 20px;
      background-color: rgb(0, 105, 204);
      color: white;
      border: none;
      border-radius: 50px;
      width: 150px;
      cursor: pointer;
    }
  }
}
</style>
