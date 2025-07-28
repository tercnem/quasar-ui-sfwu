import { defineStore } from "pinia";
import { sfapiStore } from "./sfapi";
import { notificationStore } from "./notification";

export const roleAndPermissionStore = defineStore("roleAndPermission", {
  state: () => ({}),
  getters: {},
  actions: {
    async addPermissionToRole(param) {
      const wsapi = sfapiStore();
      const notification = notificationStore();
      let result = await wsapi.add({
        param: param,
        apiName: "roleAndPermission/addPermissionToRole",
      });
      //console.log(this);
      if (result.success) {
        notification.showSuccess("success");
      }
      return result;
    },

    async deleteRole(param) {
      const wsapi = sfapiStore();
      const notification = notificationStore();
      let result = await wsapi.delete({
        param: param,
        apiName: "roleAndPermission/deleteRole",
      });
      //console.log(this);
      if (result.success) {
        notification.showSuccess("success");
      }
      return result;
    },

    async changeRole(param) {
      const wsapi = sfapiStore();
      const notification = notificationStore();
      let result = await wsapi.edit({
        param: param,
        apiName: "roleAndPermission/changeRole",
      });
      //console.log(this);
      if (result.success) {
        notification.showSuccess("success");
      }
      return result;
    },

    async deletePermissionOfRoleRole(param) {
      const wsapi = sfapiStore();
      const notification = notificationStore();
      let result = await wsapi.delete({
        param: param,
        apiName: "roleAndPermission/deletePermissionOfRoleRole",
      });
      //console.log(this);
      if (result.success) {
        notification.showSuccess("success");
      }
      return result;
    },

    async getRoleList(param) {
      const wsapi = sfapiStore();
      let result = await wsapi.getlist({
        param: param,
        apiName: "roleAndPermission/getRoleList",
        loading: false,
      });
      //console.log(this);
      return result;
    },

    async countGetRoleList(param) {
      const wsapi = sfapiStore();
      let result = await wsapi.get({
        param: param,
        apiName: "roleAndPermission/countGetRoleList",
        loading: false,
      });
      //console.log(this);
      return result;
    },

    async getAvailablePermissionListForRole(param) {
      const wsapi = sfapiStore();
      let result = await wsapi.getlist({
        param: param,
        apiName: "roleAndPermission/getAvailablePermissionListForRole",
        loading: false,
      });
      //console.log(this);
      return result;
    },

    async countGetAvailablePermissionListForRole(param) {
      const wsapi = wsapiStore();
      let result = await wsapi.get({
        param: param,
        apiName: "roleAndPermission/countGetAvailablePermissionListForRole",
        loading: false,
      });
      //console.log(this);
      return result;
    },

    async getPermissionOfRoleList(param) {
      const wsapi = sfapiStore();
      let result = await wsapi.getlist({
        param: param,
        apiName: "roleAndPermission/getPermissionOfRoleList",
        loading: false,
      });
      //console.log(this);
      return result;
    },
  },
});
