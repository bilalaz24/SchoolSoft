<template>
  <div class="container">
    <StudentSidebar
      v-if="$store.state.userType === 'student'"
      class="sidebar"
    />
    <StaffSidebar v-if="$store.state.userType === 'staff'" class="sidebar" />
    <Navbar class="navbar" />
    <div class="content-container">
      <div class="content">
        <StudentContent v-if="$store.state.userType === 'student'" />
        <StaffContent v-if="$store.state.userType === 'staff'" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import StudentSidebar from "@/components/student/Sidebar.vue";
import StaffSidebar from "@/components/staff/Sidebar.vue";
import StudentContent from "@/components/student/Content.vue";
import StaffContent from "@/components/staff/Content.vue";

export default {
  name: "Layout",
  components: {
    Navbar,
    StudentSidebar,
    StaffSidebar,
    StudentContent,
    StaffContent,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 4fr;
}

.content-container {
  width: calc(80vw - 2px);
  height: calc(100vh - 92px);
  margin-top: 92px;
  overflow-x: hidden;
}

.content {
  background-color: white;
  width: calc(100% - 226px);
  height: auto;
  margin: 50px;
  border-radius: 20px;
  border: 2px solid gray;
  padding: 20px 63px;
}
</style>
