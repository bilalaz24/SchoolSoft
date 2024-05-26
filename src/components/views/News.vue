<template>
  <div class="container">
    <News :url="url" :path="path" />
  </div>
</template>

<script>
import News from "../OpenAndClose.vue";

export default {
  components: {
    News,
  },
  data() {
    return {
      url: "news",
      path: "news",
    };
  },
  created() {
    this.$emit("getTitle", "news");
  },
};
</script>

<style lang="scss" scoped></style>
