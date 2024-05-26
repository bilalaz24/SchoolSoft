<template>
  <div class="navbar">
    <nav>
      <h3>IES Krokslätt</h3>
      <div class="profile" @click="toggle = !toggle">
        <div>
          <h4 v-if="user.firstName">
            {{ user.firstName.split("")[0].toUpperCase() }}
          </h4>
          <h4 v-else>...</h4>
        </div>
        <h3 v-if="user.firstName">HELLO, {{ user.firstName.toUpperCase() }}</h3>
        <h4 v-else>Loading...</h4>
        <img src="https://cdn-icons-png.flaticon.com/512/510/510715.png" />
      </div>
    </nav>
    <menu v-if="toggle">
      <div
        class="menu_choice"
        @click="$router.push(`/${$store.state.userType}/profile`)"
      >
        <span
          ><img
            src="https://icons.veryicon.com/png/o/education-technology/alibaba-big-data-oneui/user-profile.png"
        /></span>
        Profile
      </div>
      <div @click="logout()" class="menu_choice">
        <span
          ><img src="https://cdn-icons-png.flaticon.com/512/126/126467.png"
        /></span>
        Logout
      </div>
    </menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: false,

      user: {
        role: "",
        firstName: "",
        surName: "",
      },
    };
  },
  methods: {
    async logout() {
      try {
        const token = localStorage.getItem("refreshToken");

        await this.$api.delete(`/users/logout/${token}`);

        this.$router.push("/login");

        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
      } catch (error) {
        console.error(error);
      }
    },
    async getUser() {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await this.$api.get("/users/authenticated", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        this.user.firstName = response.data.user.firstName;
        this.user.surName = response.data.user.surName;
        this.user.role = response.data.user.role;
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    $route(to, from) {
      this.toggle = false;
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 80vw;
  height: 100px;
  margin: 0;
  margin-left: calc(20vw + 2px);
  position: fixed;
}

nav,
nav div {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}

nav {
  border-bottom: 2px gray solid;
  padding: 20px;

  .profile {
    cursor: pointer;

    img {
      width: 15px;
      margin: 10px;
    }
  }

  .profile:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }

  div div {
    background-color: darkgray;
    color: white;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    margin: 10px;
    justify-content: center;

    h4 {
      font-size: 20px;
      font-weight: 400;
    }
  }

  div h3,
  h3 {
    font-weight: 400;
  }
}
menu {
  position: absolute;
  border: 2px solid #c9c9c9;
  border-radius: 20px;
  background-color: white;
  right: 20px;
  top: 60px;
  width: 200px;
  text-align: center;
  padding: 0;
  font-size: 18px;
  height: auto;

  .menu_choice {
    padding: 15px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 20px;
      margin-right: 10px;
    }
  }

  .menu_choice:hover:first-child {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .menu_choice:hover:last-child {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .menu_choice:hover {
    background-color: #e6e6e6;
  }
}
</style>
