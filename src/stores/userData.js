import { defineStore } from "pinia";

export const userDataStore = defineStore("userData", {
  state: () => {
    return {
      cookiesExpire: "24h",
      isLoggedIn: false,
      displayName: "",
      role: "",
      verified: false,
      emailVerified: true,
      user: {},
    };
  },
  getters: {},
  actions: {},
});
