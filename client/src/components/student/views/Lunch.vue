<template>
  <div class="container">
    <hr />
    <div class="box">
      <div class="title">
        <h3>
          {{ displayWeekRange() }}
        </h3>
      </div>
      <div class="menus-container">
        <div class="menus" v-for="menu in menus">
          <div class="menu">
            <h4>{{ menu.day }}</h4>
            <p>Main: {{ menu.main }}</p>
            <p>Vegetarian: {{ menu.vegetarian }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
    };
  },
  methods: {
    async fetchMenus() {
      try {
        const response = await this.$api.get(
          `/lunch/current/${this.getCurrentWeekNumber()}`
        );

        this.menus = response.data.data[0].menus;
      } catch (error) {
        console.error(error);
      }
    },
    getWeekDateRange(year, weekNumber) {
      let firstDayOfYear = new Date(year, 0, 1);

      let daysToFirstMonday = (1 - firstDayOfYear.getDay() + 7) % 7;
      let firstMondayOfYear = new Date(firstDayOfYear);
      firstMondayOfYear.setDate(firstDayOfYear.getDate() + daysToFirstMonday);

      let startOfWeek = new Date(firstMondayOfYear);
      startOfWeek.setDate(firstMondayOfYear.getDate() + (weekNumber - 1) * 7);

      let endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 4);

      return { startOfWeek, endOfWeek };
    },
    getCurrentWeekNumber() {
      const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today - firstDayOfYear) / 86400000;

      const dayOfWeekAdjustment =
        firstDayOfYear.getDay() === 0 ? 6 : firstDayOfYear.getDay() - 1;

      const weekNumber = Math.ceil((pastDaysOfYear + dayOfWeekAdjustment) / 7);

      return weekNumber;
    },
    displayWeekRange() {
      const year = new Date().getFullYear();
      const weekNumber = this.getCurrentWeekNumber();
      const { startOfWeek, endOfWeek } = this.getWeekDateRange(
        year,
        weekNumber
      );

      const options = { month: "short", day: "numeric" };

      const formattedStart = startOfWeek.toLocaleDateString("en-US", options);
      const formattedEnd = endOfWeek.toLocaleDateString("en-US", options);

      return `Week ${weekNumber}, ${formattedStart} - ${formattedEnd}`;
    },
  },
  created() {
    this.fetchMenus();
    this.$emit("getTitle", "lunch menu");
  },
};
</script>

<style lang="scss" scoped>
.box {
  border: 2px solid rgb(180, 180, 180);
  border-radius: 20px;
  margin-top: 50px;
}

.title {
  background-color: rgb(151, 151, 151);
  color: white;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  padding: 10px;

  h3 {
    font-weight: 400;
    font-size: 22px;
    margin: 0;
  }
}

.menu {
  padding: 10px 30px;

  h4 {
    text-decoration: underline;
  }
}

.menus:nth-child(even) {
  background-color: aliceblue;
}
.menus:nth-child(odd) {
  background-color: ghostwhite;
}

.menus-container > .menus:last-child {
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
}
</style>
