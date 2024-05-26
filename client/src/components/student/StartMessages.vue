<template>
  <div class="messages-container">
    <div :class="cursorPointer">
      <p v-if="loading">Loading Messages...</p>
      <p v-else-if="messages.length === 0">You don't have any messages!</p>
      <p v-else @click="$router.push(`/${$store.state.userType}/messages`)">
        You have {{ messages.length }} messages
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      loading: true,
    };
  },
  methods: {
    async getMessages() {
      try {
        const response = await this.$api.get("/messages/authenticated", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        this.loading = false;
        this.messages = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    cursorPointer() {
      if (this.loading || this.messages.length === 0) {
        return "message no-cursor";
      } else {
        return "message";
      }
    },
  },
  mounted() {
    this.getMessages();
  },
};
</script>

<style lang="scss" scoped>
.messages-container {
  margin: 0;
  border-radius: 10px;
  background-color: rgb(241, 241, 241);
}

.message {
  padding: 5px;
  cursor: pointer;

  h3 {
    font-size: 18px;
    font-weight: 600;
  }

  p {
    font-size: 15px;
    margin: 10px;
  }
}

.no-cursor {
  cursor: auto;
}
</style>
