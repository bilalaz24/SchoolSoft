<template>
  <div class="container">
    <img class="logo" src="@/assets/logo.png" alt="Logo" />
    <div>
      <h1>404 Error</h1>
      <p>The page you are trying to access is not accessable</p>
      <p>
        Try going to <code><b>/login</b></code>
      </p>
    </div>
    <div class="bottom">
      <img
        class="schoolsoft"
        src="@/assets/schoolsoft-logo.png"
        alt="SchoolSoft"
      />
      <h3>Delivered by SchoolSoft {{ new Date().getFullYear() }}</h3>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  text-align: center;
  font-size: 25px;
  background-color: white;
  height: 100vh;

  .logo {
    width: 150px;
    margin: 50px;
  }

  .schoolsoft {
    width: 200px;
  }

  h3 {
    color: grey;
    font-weight: 500;
    font-size: 18px;
  }

  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-bottom: 50px;
  }
}
</style>
