<template>
  <div class="container">
    <Homework :url="url" :path="path" />
    <div v-if="allHomework.some((homework) => Boolean(homework.result))">
      <h3>Results:</h3>
      <div class="results" v-for="homework in allHomework">
        <div v-if="homework.result" class="result">
          <p>{{ homework.title }} : {{ homework.result }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Homework from "../../OpenAndClose.vue";

export default {
  components: {
    Homework,
  },
  props: ["subject"],
  data() {
    return {
      url: `homework/authenticated/${this.subject}`,
      path: `subject/${this.subject.toLowerCase()}/homework`,
      allHomework: [],
    };
  },
  methods: {
    async fetchObjects() {
      try {
        const response = await this.$api.get(
          `/homework/authenticated/${this.subject}`
        );

        this.allHomework = response.data.data;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchObjects();
    this.$emit("getTitle", "news");
  },
};
</script>

<style lang="scss" scoped>
.result {
  background-color: rgb(241, 241, 241);
  padding: 10px;
  border: 1px solid grey;
  border-radius: 10px;
  margin-top: 10px;
}

h3 {
  font-weight: 400;
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>
