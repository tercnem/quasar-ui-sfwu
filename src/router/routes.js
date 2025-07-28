const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/user",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("components/user/page/SfUserPage.vue"),
      },
    ],
  },
  {
    path: "/role",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("components/role-permission/page/SfRolePage.vue"),
      },
    ],
  },
  {
    path: "/uservsrole",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("components/role-permission/page/SfUserVsRolePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
