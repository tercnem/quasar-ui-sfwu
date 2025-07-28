import { defineStore } from "pinia";
import { Loading, Cookies, LocalStorage } from "quasar";
import { userDataStore } from "./userData";
import { notificationStore } from "./notification";

export const sfapiStore = defineStore("sfapi", {
  state: () => ({}),
  getters: {},
  actions: {
    async call({
      param,
      apiName,
      header = {},
      showErrorNotification = true,
      flgJsonAsContentType = true,
      flgLoading = false,
    }) {
      const notification = notificationStore();
      if (flgLoading) {
        Loading.show();
      }
      try {
        const formData = new FormData();
        //combine header
        const headers = Object.assign(
          {},
          {
            Authorization: Cookies.has("token")
              ? "Bearer " + Cookies.get("token")
              : "",
            "Content-Language": Cookies.has("lang")
              ? Cookies.get("lang")
              : "en",
          },
          header,
        );
        const options = {
          headers: headers,
        };

        for (const key in param) {
          if (param.hasOwnProperty(key)) {
            //console.log(param[key]);
            //console.log(":", Array.isArray(param[key]));
            !Array.isArray(param[key])
              ? formData.append(key, param[key])
              : formData.append(key, JSON.stringify(param[key]));
          }
        }

        const response = await this.api.post(
          apiName,
          flgJsonAsContentType ? JSON.stringify(param) : formData,
          options,
        );

        if (!response.data.success && showErrorNotification) {
          if (
            typeof response?.data?.data?.msglist === "object" &&
            response?.data?.data?.msglist !== null &&
            !Array.isArray(response?.data?.data?.msglist)
          ) {
            notification.warning("error validation");
          } else if (response?.data?.data?.msglist) {
            notification.warning(response?.data?.data?.msglist);
          } else {
            notification.warning(response?.data?.data?.msg);
          }
        }
        response.data.error = false;
        return response.data;
      } catch (error) {
        await this.handleError(error, true);
        return { error: true, success: false, error_data: error };
      } finally {
        if (flgLoading) {
          Loading.hide();
        }
      }
    },

    async postmultipart({
      param,
      apiName,
      header = {},
      showErrorNotification = true,
      flgLoading = true,
    }) {
      header["Content-Type"] = "multipart/form-data";
      let response = await this.call({
        param,
        apiName,
        header,
        showErrorNotification,
        flgJsonAsContentType: false,
        flgLoading: flgLoading,
      });
      return response;
    },

    async add({ param, apiName, header = {}, showErrorNotification = true }) {
      let response = await this.call({
        param,
        apiName,
        header,
        showErrorNotification,
        flgLoading: true,
      });
      return response;
    },

    async edit({ param, apiName, header = {}, showErrorNotification = true }) {
      let response = await this.call({
        param,
        apiName,
        header,
        showErrorNotification,
        flgLoading: true,
      });
      return response;
    },

    async delete({
      param,
      apiName,
      header = {},
      showErrorNotification = true,
    }) {
      let response = await this.call({
        param,
        apiName,
        header,
        showErrorNotification,
        flgLoading: true,
      });
      return response;
    },

    async get({
      param,
      apiName,
      loading = true,
      header = {},
      showErrorNotification = true,
    }) {
      let response = await this.call({
        param,
        apiName,
        header,
        showErrorNotification,
        flgLoading: loading,
      });

      return response;
    },

    async getlist({
      param,
      apiName,
      loading = false,
      header = {},
      showErrorNotification = true,
    }) {
      let response = await this.call({
        param,
        apiName,
        header,
        showErrorNotification,
        flgLoading: loading,
      });

      return response;
    },

    async count({
      param,
      apiName,
      loading = false,
      header = {},
      showErrorNotification = true,
    }) {
      let response = await this.call({
        param,
        apiName,
        header,
        showErrorNotification,
        flgLoading: loading,
      });

      return response;
    },

    async download({
      param,
      apiName,
      header = {},
      loading = false,
      showErrorNotification = true,
      flgJsonAsContentType = true,
    }) {
      const notification = notificationStore();
      try {
        if (loading) {
          Loading.show();
        }
        const formData = new FormData();
        //combine header
        const headers = Object.assign(
          {},
          {
            Authorization: Cookies.has("token")
              ? "Bearer " + Cookies.get("token")
              : "",
            "Content-Language": Cookies.has("lang")
              ? Cookies.get("lang")
              : "en",
          },
          header,
        );
        const options = {
          headers: headers,
          responseType: "blob",
        };

        for (const key in param) {
          if (param.hasOwnProperty(key)) {
            !Array.isArray(param[key])
              ? formData.append(key, param[key])
              : formData.append(key, JSON.stringify(param[key]));
          }
        }
        let response = await this.api.post(
          apiName,
          flgJsonAsContentType ? JSON.stringify(param) : formData,
          options,
        );

        if (loading) {
          Loading.hide();
        }
        if (response?.data?.type == "application/json") {
          const responseData = await response?.data?.text();
          let responseJson = JSON.parse(responseData);
          if (!responseJson.success) {
            if (responseJson?.data?.msglist) {
              notification.warning(responseJson?.data?.msglist);
            } else {
              notification.warning(responseJson?.data?.msg);
            }
            return { error: true, success: false };
          } else {
            return responseJson;
          }
        }
        const url = window.URL.createObjectURL(new Blob([response.data]), {
          type: response.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = url;
        //link.target = "_blank";
        const filename =
          response.headers["content-disposition"]?.split("filename=")[1];

        link.setAttribute("download", filename ? filename : "download");
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        await this.handleError(error, showErrorNotification);
        return { error: true, success: false, error_data: error };
      }
    },

    async handleError(error, showErrorNotification) {
      const userdata = userDataStore();
      const notification = notificationStore();
      if (error.response != null) {
        if (error.response.status == 401) {
          if (showErrorNotification) {
            notification.error("Session Expired");
          }
          userdata.isLoggedIn = false;
          LocalStorage.set("permissions", []);
          userdata.displayName = "";
          userdata.role = "";
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
          this.router.replace("/login");
          return;
        }

        if (error.response.status == 419) {
          if (showErrorNotification) {
            notification.error("Session Expired");
          }
          userdata.isLoggedIn = false;
          LocalStorage.set("permissions", []);
          userdata.displayName = "";
          userdata.role = "";
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
          window.location.reload();
          return;
        }
        if (error?.response?.data?.errorKey == 900) {
          //userdata.setRedirectToEmailNotVerified(true);
          this.router.replace("/emailNotVerified");
          return;
        }

        if (error?.response?.data?.data?.msg) {
          if (showErrorNotification) {
            notification.error(error?.response?.data?.data?.msg);
          }
          return;
        }
      } else {
        if (showErrorNotification) {
          notification.error(error?.message);
        }
        return;
      }
    },
  },
});
