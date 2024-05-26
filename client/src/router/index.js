import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Layout from "../views/Layout.vue";
import NotFoundError from "../views/Error.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "Login" },
  },
  {
    path: "/page_not_found_error",
    name: "Error",
    component: NotFoundError,
    meta: { title: "Page Not Found" },
  },
  {
    path: "/:userType/profile",
    name: "Profile",
    component: Layout,
    meta: { title: "Profile" },
    beforeEnter: (to, from, next) => {
      const userType = to.params.userType;
      if (userType === "staff" || userType === "student") {
        next();
      } else {
        next({ path: "/page_not_found_error" });
      }
    },
  },
  {
    path: "/:userType/news/",
    name: "News",
    component: Layout,
    meta: { title: "News" },
    beforeEnter: (to, from, next) => {
      const userType = to.params.userType;
      if (userType === "staff" || userType === "student") {
        next();
      } else {
        next({ path: "/page_not_found_error" });
      }
    },
  },
  {
    path: "/:userType/messages/",
    name: "Messages",
    component: Layout,
    meta: { title: "Messages" },
    beforeEnter: (to, from, next) => {
      const userType = to.params.userType;
      if (userType === "staff" || userType === "student") {
        next();
      } else {
        next({ path: "/page_not_found_error" });
      }
    },
  },
  {
    path: "/student/subject/:subject/homework",
    name: "Homework",
    component: Layout,
    meta: { title: "Homework" },
  },
  {
    path: "/student/subject/:subject/plannings",
    name: "Plannings",
    component: Layout,
    meta: { title: "Weekly Plannings" },
  },
  {
    path: "/student/subject/:subject",
    name: "Subject",
    component: Layout,
  },
  {
    path: "/student/lunch/",
    name: "Lunch",
    component: Layout,
    meta: { title: "Lunch Menu" },
  },
  {
    path: "/:userType/start",
    name: "StudentStartPage",
    meta: { title: "Start Page" },
    component: Layout,
    beforeEnter: (to, from, next) => {
      const userType = to.params.userType;
      if (userType === "staff" || userType === "student") {
        next();
      } else {
        next({ path: "/page_not_found_error" });
      }
    },
  },

  // Catch All
  {
    path: "/:catchAll(.*)",
    component: NotFoundError,
    meta: { title: "Page Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  const title = to.meta.title;
  if (title) {
    document.title = `Schoolsoft | ${title}`;
  }
});

router.beforeEach((to, from, next) => {
  if (to.params.subject) {
    const subjectParam = to.params.subject;

    const formattedSubject = subjectParam
      .split("-")
      .map((part, index) => {
        return part.length === 2
          ? part.toUpperCase()
          : index > 0
          ? part.charAt(0).toUpperCase() + part.slice(1)
          : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      })
      .join(" ");

    document.title = `Schoolsoft | ${formattedSubject}`;

    next();
  } else {
    next();
  }
});

export default router;
