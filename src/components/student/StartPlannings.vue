<template>
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
  methods: {
    getCurrentWeekNumber() {
      const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today - firstDayOfYear) / 86400000;

      const dayOfWeekAdjustment =
        firstDayOfYear.getDay() === 0 ? 6 : firstDayOfYear.getDay() - 1;

      const weekNumber = Math.ceil((pastDaysOfYear + dayOfWeekAdjustment) / 7);

      return weekNumber;
    },
    async getPlannings() {
      try {
        const response = await this.$api.get(
          `/planning/authenticated/week/${this.getCurrentWeekNumber()}`,
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
