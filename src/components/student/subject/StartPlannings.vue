<template>
  <h2 v-if="plannings.length !== 0">Weekly Planning</h2>
  <div class="planning-container">
    <p class="loading" v-if="loading">Loading Weekly Plannings...</p>
    <div v-for="planning in plannings" :key="planning._id">
      <div
        @click="
          $router.push({
            path: `/${
              $store.state.userType
            }/subject/${planning.subject.toLowerCase()}/plannings`,
            query: { id: planning._id },
          })
        "
        class="planning"
      >
        <h3>
          {{ planning.title }}
        </h3>
        <p>
          {{ planning.body.slice(0, 75)
          }}<span v-if="planning.body.split('').length > 75">...</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plannings: [],
      loading: true,
    };
  },
  props: ["subject"],
  methods: {
    async getPlannings() {
      try {
        const response = await this.$api.get(
          `/planning/authenticated/subject/${this.subject}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        this.loading = false;
        this.plannings = response.data.data;
        this.$emit("fetch", this.plannings);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getPlannings();
  },
};
</script>

<style lang="scss" scoped>
.loading {
  padding: 10px;
}

.planning-container {
  margin: 0;
  border-radius: 10px;
  background-color: rgb(241, 241, 241);
}

h2 {
  margin: 0;
  margin-bottom: 8px;
  margin-left: 5px;
  font-weight: 400;
  font-size: 20px;
}

.planning-container > div:last-child .planning {
  border: none;
}

.planning {
  border-bottom: 1px solid grey;
  padding: 10px;
  cursor: pointer;

  h3 {
    font-size: 18px;
    font-weight: 600;
  }

  p {
    font-size: 15px;
  }
}
</style>
