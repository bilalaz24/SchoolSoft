<template>
  <div class="sidebar">
    <div class="center-container">
      <img class="logo" src="@/assets/logo.png" alt="Logo" />
    </div>
    <hr />
    <div class="links center-container container">
      <router-link class="link" to="/student/start/"
        ><span
          ><img src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
        /></span>
        <p>Start Page</p></router-link
      >
      <p class="label">School Information</p>
      <router-link class="link" to="/student/news/"><p>News</p></router-link>
      <router-link class="link" to="/student/messages/"
        ><p>Messages</p></router-link
      >
      <router-link class="link" to="/student/lunch/"
        ><p>Lunch Menu</p></router-link
      >
      <p class="label extends" @click="toggleSubject = !toggleSubject">
        Subjects
        <img
          v-if="!toggleSubject"
          src="https://cdn-icons-png.flaticon.com/512/318/318426.png"
        />
        <img
          v-else
          src="https://cdn-icons-png.flaticon.com/128/130/130906.png"
        />
      </p>
      <div class="subjects">
        <Subjects v-if="toggleSubject" />
      </div>
    </div>
  </div>
</template>

<script>
import Subjects from "./Subjects.vue";

export default {
  components: {
    Subjects,
  },
  data() {
    return {
      toggleSubject: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 20vw;
  height: 100vh;
  border-right: 2px gray solid;
  background-color: white;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  height: calc(100% - 210px);
  overflow-y: auto;
  overflow-x: hidden;
}

.links {
  padding: 0 50px;

  .subjects {
    margin: 0;
    padding: 0;
  }

  .label {
    margin: 10px 0;
    align-self: flex-start;
    font-size: 18px;
    color: #444;
    display: flex;
    align-items: center;

    img {
      width: 15px;
      margin: 10px;
    }
  }

  .extends {
    cursor: pointer;
  }

  .extends:hover {
    text-decoration: underline;
  }

  .link {
    margin: 5px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgb(240, 248, 255);
    padding: 10px;
    border-radius: 5px;
    text-decoration: none;
    color: black;
    transition: 0.1s;
    display: flex;

    img {
      width: 22px;
      height: 22px;
      margin: 0;
      margin-right: 20px;
    }

    p {
      margin: 0;
      width: auto;
    }
  }

  .link:hover {
    background-color: rgb(221, 239, 255);
  }
}

.logo {
  width: 100px;
  height: 100px;
  margin: 25px;
}

hr {
  margin: 20px;
}
</style>
