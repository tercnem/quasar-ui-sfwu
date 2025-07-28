import { defineStore } from "pinia";
import { Cookies, LocalStorage, Loading } from "quasar";
import { sfapiStore } from "./sfapi";

import { userDataStore } from "./userData";
import { notificationStore } from "./notification";

export const authStore = defineStore("auth", {
  state: () => ({
    // cookiesExpire: "24h",
    // isLoggedIn: false,
    // displayName: "",
    // role: "",
    // verified: false,
    // emailVerified: true,
  }),
  getters: {},
  actions: {
    async login(param, redirectTo = "/dashboard") {
      const api = sfapiStore();
      const userData = userDataStore();
      Loading.show();
      let result = await api.call({
        param: param,
        apiName: "login",
      });
      Loading.hide();
      if (result.success) {
        userData.isLoggedIn = true;
        userData.displayName = result.data.user.name;
        userData.role = result.data.user.role_name;
        userData.user = result.data.user;
        LocalStorage.set("user", result.data.user);
        LocalStorage.set("permissions", result.data.user.permissions);
        LocalStorage.set("isLoggedIn", true);
        LocalStorage.set("displayName", result.data.user.name);
        LocalStorage.set("role", result.data.user.role_name);

        Cookies.set("role", result.data.user.role_name, {
          expires: userData.cookiesExpire,
          sameSite: "Strict",
          secure: true,
          path: "/",
        });
        Cookies.set("token", result.data.token, {
          expires: this.cookiesExpire,
          sameSite: "Strict",
          secure: true,
          path: "/",
        });
        this.router.push(redirectTo);
      }
      return result.success;
    },
    async logout(param, redirectTo = "/") {
      const api = sfapiStore();
      const userData = userDataStore();
      const notification = notificationStore();
      Loading.show();
      let result = await api.call({
        param: param,
        apiName: "auth/logout",
      });
      Loading.hide();
      if (result.success) {
        userData.isLoggedIn = false;
        LocalStorage.set("permissions", []);
        userData.displayName = "";
        userData.role = "";

        Cookies.remove("token", {
          sameSite: "Strict",
          secure: true,
          path: "/",
        });
        Cookies.remove("role", {
          sameSite: "Strict",
          secure: true,
          path: "/",
        });
        notification.success("success");
        this.router.push(redirectTo);
      }
      return result.success;
    },

    async isTokenValid() {
      const api = sfapiStore();
      const userData = userDataStore();
      const notification = notificationStore();
      let result = await api.call({
        param: {},
        apiName: "auth/isTokenValid",
        showErrorNotification: false,
      });

      if (result.success) {
        userData.isLoggedIn = true;
        userData.displayName = result.data.user.name;
        userData.role = result.data.user.role_name;
        userData.user = result.data.user;
        LocalStorage.set("user", result.data.user);
        LocalStorage.set("permissions", result.data.user.permissions);
        LocalStorage.set("isLoggedIn", true);
        LocalStorage.set("displayName", result.data.user.name);
        LocalStorage.set("role", result.data.user.role_name);

        Cookies.set("role", result.data.user.role_name, {
          expires: "24h",
          sameSite: "Strict",
          secure: true,
          path: "/",
        });
      } else {
        if (!navigator.onLine) {
          notification.error("DEVICE OFFLINE");
          // Cookies.remove("role", {
          //   expires: userData.cookiesExpire,
          //   sameSite: "Strict",
          //   secure: true,
          //   path: "/",
          // });
          // Cookies.remove("token", {
          //   expires: this.cookiesExpire,
          //   sameSite: "Strict",
          //   secure: true,
          //   path: "/",
          // });
        } else {
          userData.user = LocalStorage.getItem("user");
          userData.isLoggedIn = LocalStorage.getItem("isLoggedIn");
          userData.displayName = LocalStorage.getItem("displayName");
          userData.role = LocalStorage.getItem("role");
        }
      }
    },
  },
});
