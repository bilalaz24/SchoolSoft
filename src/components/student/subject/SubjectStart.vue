<template>
  <div>
    <div class="container">
      <div class="section left">
        <div class="small-section">
          <Homework :subject="subject" />
        </div>
        <div class="small-section">
          <Plannings :subject="subject" />
        </div>
      </div>
      <div class="section right">
        <h2>Staff</h2>
        <div class="teachers" v-for="teacher in teachers">
          <div class="teacher">
            <p class="info">{{ teacher.firstName }} {{ teacher.surName }}</p>
            <a class="info" :href="`mailto:${teacher.email}`">{{
              teacher.email
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Homework from "./StartHomework.vue";
import Plannings from "./StartPlannings.vue";

export default {
  components: {
    Homework,
    Plannings,
  },
  data() {
    return {
      teachers: [],
    };
  },
  props: ["subject"],
  methods: {
    async fetchTeachers() {
      try {
        const response = await this.$api.get(`/users/teachers/${this.subject}`);

        this.teachers = response.data.data;
        console.log(this.subject, response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchTeachers();
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}

.section {
  width: 50%;
}

.small-section {
  margin: 20px 0;
}

.left {
  margin-right: 50px;
  justify-self: start;
}

.right {
  left: 50px;
  justify-self: end;
}

h2 {
  margin: 20px;
  margin-bottom: 8px;
  margin-left: 5px;
  font-weight: 400;
  font-size: 20px;
}

.teachers {
  border-radius: 10px;
  background-color: rgb(241, 241, 241);
}

.teacher {
  padding: 10px;
  margin: 10px;
  padding-bottom: 20px;

  h3 {
    font-size: 18px;
    font-weight: 600;
  }

  .info {
    font-size: 15px;
    margin: 10px;
  }
}
</style>
