<template>
  <div class="container">
    <button :class="buttonClass" @click="toggleCreate">{{ buttonText }}</button>
    <div class="create-box" v-if="create">
      <h2>Create Message</h2>
      <div class="input-box" v-if="$store.state.userType === 'student'">
        <label for="to">To (Email): </label>
        <input type="email" id="to" v-model="to" />
      </div>
      <div class="input-box">
        <label for="title">Title: </label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div class="input-box">
        <label for="message">Body: </label>
        <textarea id="message" cols="30" rows="10" v-model="message"></textarea>
      </div>
      <button @click="send">Send</button>
    </div>
    <Messages :url="url" :path="path" />
  </div>
</template>

<script>
import Messages from "../OpenAndClose.vue";

export default {
  components: {
    Messages,
  },
  data() {
    return {
      url: "messages/authenticated",
      path: "messages",

      create: false,

      to: "",
      title: "",
      message: "",
    };
  },
  computed: {
    buttonText() {
      if (this.create) return "Cancle";
      else return "Create Message";
    },
    buttonClass() {
      if (this.create) return "create-cancle cancle";
      else return "create-cancle";
    },
  },
  methods: {
    toggleCreate() {
      if (this.create) this.create = false;
      else this.create = true;
    },
    async send() {
      try {
        const userResponse = await this.$api.get("/users/authenticated", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const userId = userResponse.data.user._id;

        const allUsers = await this.$api.get("/users");
        console.log(allUsers);
        const toUser = allUsers.data.data.filter(
          (user) => user.email === this.to
        )[0];
        console.log(toUser);
        const toId = toUser._id;
        console.log(toId);

        const type = this.to.split("").length < 10 ? "group" : "student";
        let to = "";
        if (this.to.split("").length < 10) to = this.to;
        else to = toId;

        const form = {
          from: userId,
          to: {
            type,
            to,
          },
          title: this.title,
          body: this.message,
        };

        console.log(form);

        const response = await this.$api.post("/messages/create", form);

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.$emit("getTitle", "messages");
  },
};
</script>

<style lang="scss" scoped>
.create-cancle {
  font-size: 17px;
  padding: 10px;
  border-radius: 20px;
  border: none;
  background-color: rgb(0, 105, 204);
  color: white;
  font-weight: 400;
  cursor: pointer;
}

.cancle {
  background-color: red;
}

.create-box {
  border: 2px grey solid;
  padding: 20px;
  margin: 20px 0;
  border-radius: 20px;

  h2 {
    margin: 10px 0;
    font-weight: 400;
    text-decoration: underline;
  }

  button {
    font-size: 17px;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 20px;
    border: none;
    background-color: rgb(1, 175, 1);
    color: white;
    font-weight: 400;
    cursor: pointer;
  }

  .input-box {
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    width: 100px;

    label {
      margin: 5px 0;
    }

    input {
      border: none;
      outline: none;
      font-size: 16px;
      border-bottom: 1px solid rgb(0, 105, 204);
    }

    input:focus {
      border-bottom: 2px solid rgb(0, 105, 204);
    }

    textarea {
      font-size: 16px;
      outline: none;
      border: 1px solid rgb(0, 105, 204);
    }

    textarea:focus {
      border: 2px solid rgb(0, 105, 204);
    }
  }
}
</style>
