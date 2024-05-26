<template>
  <div>
    <div class="container">
      <div class="work section">
        <h2>Work</h2>
        <div v-if="homework.length > 0" class="block">
          <h3>Homework</h3>
          <Homework @fetch="fetchHomework" />
        </div>
        <div v-if="plannings.length > 0" class="block">
          <h3>Weekly Plannings</h3>
          <Plannings @fetch="fetchPlannings" />
        </div>
      </div>
      <div class="news section">
        <h2>News & Messages</h2>
        <div class="block">
          <h3>Messages</h3>
          <Messages />
        </div>
        <div v-if="news.length > 0" class="block">
          <h3>News</h3>
          <News @fetch="fetchNews" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import News from "../StartNews.vue";
import Messages from "../StartMessages.vue";
import Homework from "../StartHomework.vue";
import Plannings from "../StartPlannings.vue";

export default {
  components: {
    News,
    Messages,
    Homework,
    Plannings,
  },
  data() {
    return {
      homework: ["loading"],
      plannings: ["loading"],
      news: ["loading"],
    };
  },
  methods: {
    fetchHomework(homework) {
      this.homework = homework;
    },
    fetchPlannings(plannings) {
      this.plannings = plannings;
    },
    fetchNews(news) {
      this.news = news;
    },
  },
  mounted() {
    this.$emit("getTitle", "start page");
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;

  .section {
    width: 100%;
    border: 2px solid rgb(180, 180, 180);
    padding: 20px;
    border-radius: 20px;
    margin: 0;
    height: 0%;

    .block {
      margin-top: 30px;
    }

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 400;
      text-decoration: underline;
      text-align: center;
    }

    h3 {
      margin: 0;
      margin-bottom: 8px;
      margin-left: 5px;
      font-weight: 400;
    }
  }

  .news {
    margin-right: 0;
    margin-left: 25px;
  }

  .work {
    margin-left: 0;
    margin-right: 25px;
  }
}
</style>
