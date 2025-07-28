import { defineStore } from "pinia";
//import { Notify } from "quasar";
//import { Router } from "vue-router";

export const notificationStore = defineStore("notification", {
  state: () => ({}),
  getters: {},
  actions: {
    success(msgs) {
      if (Array.isArray(msgs)) {
        for (const i in msgs) {
          this.Notify.create({
            position: "top-right",
            type: "positive",
            color: "positive",
            textColor: "white",
            icon: "check_circle",
            message: msgs[i],
            closeBtn: "x",
          });
        }
      } else {
        const msg = msgs == "" || msgs == null ? "Success" : msgs;
        this.Notify.create({
          position: "top-right",
          type: "positive",
          color: "positive",
          textColor: "white",
          icon: "check_circle",
          message: msg,
          closeBtn: "x",
        });
      }
    },

    warning(msgs) {
      if (Array.isArray(msgs)) {
        for (const i in msgs) {
          this.Notify.create({
            position: "top-right",
            type: "warning",
            color: "warning",
            textColor: "white",
            icon: "warning",
            message: msgs[i],
            closeBtn: "x",
          });
        }
      } else {
        const msg = msgs == "" || msgs == null ? "Error" : msgs;
        this.Notify.create({
          position: "top-right",
          type: "warning",
          color: "warning",
          textColor: "white",
          icon: "warning",
          message: msg,
          closeBtn: "x",
        });
      }
    },

    error(msgs) {
      if (Array.isArray(msgs)) {
        for (const i in msgs) {
          this.Notify.create({
            position: "top-right",
            type: "negative",
            color: "negative",
            textColor: "white",
            icon: "error",
            message: msgs[i],
            closeBtn: "x",
          });
        }
      } else {
        const msg = msgs == "" || msgs == null ? "Error" : msgs;
        this.Notify.create({
          position: "top-right",
          type: "negative",
          color: "negative",
          textColor: "white",
          icon: "error",
          message: msg,
          closeBtn: "x",
        });
      }
    },
  },
});
