<template>
  <h2 v-if="homework.length !== 0">Homework</h2>
  <div class="homework-container">
    <p class="loading" v-if="loading">Loading Homework...</p>
    <div v-for="homeworkObject in homework" :key="homeworkObject._id">
      <div
        @click="
          $router.push({
            path: `/${
              $store.state.userType
            }/subject/${subject.toLowerCase()}/homework`,
            query: { id: homeworkObject._id },
          })
        "
        class="homework-object"
      >
        <h3>
          Week {{ getWeekOfYear(new Date(homeworkObject.dueDate)) }} -
          {{ homeworkObject.title }}
        </h3>
        <p>
          {{ formatDateWithWeek(homeworkObject.dueDate) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homework: [],
      loading: true,
    };
  },
  props: ["subject"],
  methods: {
    async getHomework() {
      try {
        const response = await this.$api.get(
          `/homework/authenticated/${this.subject}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        this.loading = false;
        this.homework = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    formatDateWithWeek(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const weekOfYear = this.getWeekOfYear(date);
      return `${formattedDate}, w.${weekOfYear}`;
    },
    getWeekOfYear(date) {
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear =
        (date - startOfYear) / 86400000 + startOfYear.getDay() + 1;
      return Math.ceil(pastDaysOfYear / 7);
    },
  },
  mounted() {
    this.getHomework();
  },
};
</script>

<style lang="scss" scoped>
.loading {
  padding: 10px;
}

h2 {
  margin: 0;
  margin-bottom: 8px;
  margin-left: 5px;
  font-weight: 400;
  font-size: 20px;
}

.homework-container {
  margin: 0;
  border-radius: 10px;
  background-color: rgb(241, 241, 241);
}

.homework-container > div:last-child .homework-object {
  border: none;
}

.homework-object {
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
