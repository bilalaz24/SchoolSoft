<template>
  <div>
    <h1>Staff</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$emit("getTitle", "start");
  },
};
</script>

<style lang="scss" scoped></style>
