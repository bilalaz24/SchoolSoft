<template>
  <div class="news-container">
    <p class="loading" v-if="loading">Loading News...</p>
    <div v-for="newsObject in news" :key="newsObject._id">
      <div
        @click="
          $router.push({
            path: `/${$store.state.userType}/news`,
            query: { id: newsObject._id },
          })
        "
        class="news-object"
      >
        <h3>{{ newsObject.title }}</h3>
        <p>
          {{ newsObject.body.slice(0, 75)
          }}<span v-if="newsObject.body.split('').length > 75">...</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      loading: true,
    };
  },
  methods: {
    async getNews() {
      try {
        const response = await this.$api.get("/news");

        this.loading = false;
        this.news = response.data.data;
        this.$emit("fetch", this.news);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getNews();
  },
};
</script>

<style lang="scss" scoped>
.loading {
  padding: 10px;
}

.news-container {
  margin: 0;
  border-radius: 10px;
  background-color: rgb(241, 241, 241);
}

.news-container > div:last-child .news-object {
  border: none;
}

.news-object {
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
