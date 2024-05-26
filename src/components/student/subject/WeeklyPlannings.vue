<template>
  <div class="container">
    <Plannings :url="url" :path="path" />
  </div>
</template>

<script>
import Plannings from "../../OpenAndClose.vue";

export default {
  components: {
    Plannings,
  },
  props: ["subject"],
  data() {
    return {
      url: `planning/authenticated/subject/${this.subject}`,
      path: `subject/${this.subject.toLowerCase()}/plannings`,
      allHomework: [],
    };
  },
  created() {
    this.$emit("getTitle", "news");
  },
};
</script>

<style lang="scss" scoped></style>
