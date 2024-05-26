<template>
  <div>
    <nav class="links">
      <router-link
        class="link"
        exact
        active-class="active"
        :to="`/student/subject/${subject.toLowerCase().split(' ').join('-')}`"
        >Overview</router-link
      >
      <router-link
        class="link"
        exact
        active-class="active"
        :to="`/student/subject/${subject
          .toLowerCase()
          .split(' ')
          .join('-')}/homework`"
        >Homework</router-link
      >
      <router-link
        class="link"
        exact
        active-class="active"
        :to="`/student/subject/${subject
          .toLowerCase()
          .split(' ')
          .join('-')}/plannings`"
        >Weekly Plannings</router-link
      >
    </nav>
    <div class="line"></div>
    <Plannings v-if="$route.path.includes('plannings')" :subject="subject" />
    <Homework v-else-if="$route.path.includes('homework')" :subject="subject" />
    <Start v-else :subject="subject" />
  </div>
</template>

<script>
import Start from "../subject/SubjectStart.vue";
import Homework from "../subject/Homework.vue";
import Plannings from "../subject/WeeklyPlannings.vue";

export default {
  components: {
    Start,
    Homework,
    Plannings,
  },
  data() {
    const subject = this.$route.params.subject;
    return {
      subject:
        subject === "mfl" || subject === "pe"
          ? subject.toUpperCase()
          : subject
              .split("-")
              .join(" ")
              .replace(/\b\w/g, (char) => char.toUpperCase()),
    };
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.$emit("reload");
      }
    },
  },
  mounted() {
    this.$emit("getTitle", this.subject);
    this.$store.commit("reloadTitle", { title: this.subject });
  },
};
</script>

<style lang="scss" scoped>
.links {
  margin: 20px 0;
  margin-bottom: 0;
  display: flex;
}

.link {
  margin: 0 10px;
  height: 40px;
  padding: 10px;
  text-decoration: none;
  color: black;
  background-color: rgb(250, 250, 250);
  border: 1px solid grey;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
}

.active {
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-bottom: -1px;
  height: 50px;
  background-color: white;
  padding-top: 15px;
  cursor: auto;
}

.line {
  height: 1px;
  background-color: gray;
  width: 100%;
  margin-bottom: 20px;
}
</style>
