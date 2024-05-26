<template>
  <div>
    <h1>{{ title.toUpperCase() }}</h1>
    <Start @getTitle="getTitle" v-if="$route.path.includes('/start')" />
    <News @getTitle="getTitle" v-if="$route.path.includes('/news')" />
    <Messages @getTitle="getTitle" v-if="$route.path.includes('/messages')" />
    <Lunch @getTitle="getTitle" v-if="$route.path.includes('/lunch')" />
    <Subject
      @reload="reload"
      :key="key"
      @getTitle="getTitle"
      v-if="$route.path.includes('/subject')"
    />
    <Profile @getTitle="getTitle" v-if="$route.path.includes('/profile')" />
  </div>
</template>

<script>
import Start from "./views/StartPage.vue";
import News from "../views/News.vue";
import Messages from "../views/Messages.vue";
import Lunch from "./views/Lunch.vue";
import Subject from "./views/Subject.vue";
import Profile from "@/components/ProfileComponent.vue";

export default {
  components: {
    Start,
    News,
    Messages,
    Lunch,
    Profile,
    Subject,
  },
  data() {
    return {
      title: "",
      key: 0,
    };
  },
  methods: {
    getTitle(title) {
      this.title = title;
    },
    reload() {
      this.key++;
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
