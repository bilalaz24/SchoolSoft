<template>
  <div>
    <h1>{{ title.toUpperCase() }}</h1>
    <Profile @getTitle="getTitle" v-if="$route.path.includes('/profile')" />
    <Start @getTitle="getTitle" v-if="$route.path.includes('/start')" />
    <News @getTitle="getTitle" v-if="$route.path.includes('/news')" />
    <Messages @getTitle="getTitle" v-if="$route.path.includes('/messages')" />
  </div>
</template>

<script>
import Start from "./views/StartPage.vue";
import News from "../views/News.vue";
import Messages from "../views/Messages.vue";
import Profile from "@/components/ProfileComponent.vue";

export default {
  components: {
    Start,
    News,
    Messages,
    Profile,
  },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    getTitle(title) {
      this.title = title;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
}
</style>
