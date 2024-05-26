<template>
  <div class="links">
    <div
      class="center-container"
      v-for="subject in subjects"
      :key="subject.url"
    >
      <router-link
        class="link"
        :to="'/student/subject/' + subject.url"
        :key="$route.path"
        ><p>
          {{ subject.name }}
        </p></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjects: [
        { url: "art", name: "Art" },
        { url: "biology", name: "Bio" },
        { url: "chemistry", name: "Chem" },
        { url: "civics", name: "Civ" },
        { url: "english", name: "Eng" },
        { url: "geography", name: "Geo" },
        { url: "history", name: "Hist" },
        { url: "home-ec", name: "HomeEc" },
        { url: "math", name: "Math" },
        { url: "mfl", name: "MFL" },
        { url: "music", name: "Mu" },
        { url: "pe", name: "PE" },
        { url: "pe-theory", name: "PETheory" },
        { url: "physics", name: "Phys" },
        { url: "religion", name: "Rel" },
        { url: "swedish", name: "Swe" },
        { url: "tech", name: "Tech" },
        { url: "text-craft", name: "TextCraft" },
        { url: "wood-craft", name: "WoodCraft" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.links {
  padding: 0 50px;

  .label {
    margin: 10px 0;
    align-self: flex-start;
    font-size: 18px;
    color: #444;
    display: flex;
    align-items: center;

    img {
      width: 15px;
      margin: 10px;
    }
  }

  .extends {
    cursor: pointer;
  }

  .extends:hover {
    text-decoration: underline;
  }

  .link {
    margin: 5px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgb(240, 248, 255);
    padding: 10px;
    border-radius: 5px;
    text-decoration: none;
    color: black;
    transition: 0.1s;
    display: flex;

    img {
      width: 22px;
      height: 22px;
      margin: 0;
      margin-right: 20px;
    }

    p {
      margin: 0;
      width: auto;
    }
  }

  .link:hover {
    background-color: rgb(221, 239, 255);
  }
}
</style>
