<template>
  <div class="container">
    <p class="loading" v-if="loading">Loading...</p>
    <div v-for="object in objects" :key="object._id">
      <div
        @click="openAndCloseBox(object._id)"
        :class="dynamicClass(object._id)"
      >
        <p>
          <span class="title">
            {{ object.title }}
          </span>
          <span v-if="this.$route.query.id !== object._id" class="body-part">
            <p>
              {{ object.body.slice(0, 50)
              }}<span v-if="object.body.split('').length > 50">...</span>
            </p>
          </span>
        </p>
      </div>
      <div class="body-box" v-if="$route.query.id === object._id">
        <p class="body">
          {{ object.body }}
        </p>
        <p class="info">
          <span v-if="object.from">
            From: {{ object.from.firstName }} {{ object.from.surName }}
          </span>
          <br />
          <span>
            Published:
            {{
              new Date(object.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objects: [],
      loading: true,
      userType: this.$store.state.userType,
    };
  },
  props: ["url", "path"],
  methods: {
    async fetchObjects() {
      try {
        const response = await this.$api.get(`/${this.url}`);

        this.objects = response.data.data;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
    openAndCloseBox(id) {
      if (this.$route.query.id !== id) this.$router.push(`?id=${id}`);
      else this.$router.push(`/${this.userType}/${this.path}`);
    },
    dynamicClass(id) {
      return this.$route.query.id === id ? "title-box no-radius" : "title-box";
    },
  },
  created() {
    this.fetchObjects();
  },
};
</script>

<style lang="scss" scoped>
.container {
  .loading {
    text-align: center;
    font-size: 20px;
  }

  .title-box {
    background-color: rgb(241, 241, 241);
    padding: 10px;
    border: 1px solid grey;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;

    p {
      display: inline;

      .title,
      .body-part {
        margin: 3px;
      }

      .title {
        font-weight: 600;
      }
    }
  }

  .no-radius {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .body-box {
    background-color: rgb(232, 243, 245);
    padding: 30px;
    margin-bottom: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;

    .body {
      width: 570px;
    }

    .info {
      margin-left: 50px;
      font-size: 12px;
      color: rgb(102, 102, 102);
    }
  }
}
</style>
