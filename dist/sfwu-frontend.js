import { date as ne, Loading as ee, Cookies as G, LocalStorage as K, useDialogPluginComponent as oe, useQuasar as W, QCard as Be, QCardSection as me, QBtn as ce, QInput as ie, QCardActions as xe } from "quasar";
import { defineStore as de } from "pinia";
import { ref as c, watch as z, resolveComponent as l, resolveDirective as te, openBlock as L, createBlock as B, withCtx as n, createVNode as e, createElementVNode as u, createTextVNode as le, toDisplayString as E, createElementBlock as re, createCommentVNode as se, unref as I, withDirectives as M, onMounted as Q, normalizeStyle as pe, Fragment as Ie, renderList as Me } from "vue";
import { useRoute as X, useRouter as Z } from "vue-router";
import { useI18n as J } from "vue-i18n";
const _e = function(a, t) {
  if (a != null && a.length >= 10) {
    const s = new Date(a);
    return ne.formatDate(s, "DD-MM-YYYY");
  } else
    return "";
}, Fe = function(a, t) {
  if (a != null && a.length >= 7) {
    const s = new Date(a);
    return ne.formatDate(s, "MM-YYYY");
  } else
    return "";
}, fe = function(a, t) {
  if (a != null && a.length >= 10) {
    const s = new Date(a);
    return ne.formatDate(s, "DD-MM-YYYY HH:mm:ss");
  } else
    return "";
}, je = function(a, t) {
  if (a != null && a.length >= 10) {
    const s = new Date(a);
    return ne.formatDate(s, t);
  } else
    return "";
}, He = function(a) {
  const t = a.split("-");
  return t[2] + "-" + t[1] + "-" + t[0];
}, ze = function() {
  const a = /* @__PURE__ */ new Date();
  return ne.formatDate(a, "YYYY-MM-DD HH:mm:ss");
}, Ke = function() {
  const a = /* @__PURE__ */ new Date();
  return ne.formatDate(a, "YYYY-MM-DD");
}, Ge = function() {
  const a = /* @__PURE__ */ new Date(), t = new Date(a.getFullYear(), a.getMonth(), 1);
  return ne.formatDate(t, "YYYY-MM-DD");
}, Qe = function() {
  const a = /* @__PURE__ */ new Date(), t = new Date(a.getFullYear(), a.getMonth() + 1, 0);
  return ne.formatDate(t, "YYYY-MM-DD");
}, ae = de("userData", {
  state: () => ({
    cookiesExpire: "24h",
    isLoggedIn: !1,
    displayName: "",
    role: "",
    verified: !1,
    emailVerified: !0,
    user: {}
  }),
  getters: {},
  actions: {}
}), F = de("notification", {
  state: () => ({}),
  getters: {},
  actions: {
    success(o) {
      if (Array.isArray(o))
        for (const a in o)
          this.Notify.create({
            position: "top-right",
            type: "positive",
            color: "positive",
            textColor: "white",
            icon: "check_circle",
            message: o[a],
            closeBtn: "x"
          });
      else {
        const a = o == "" || o == null ? "Success" : o;
        this.Notify.create({
          position: "top-right",
          type: "positive",
          color: "positive",
          textColor: "white",
          icon: "check_circle",
          message: a,
          closeBtn: "x"
        });
      }
    },
    warning(o) {
      if (Array.isArray(o))
        for (const a in o)
          this.Notify.create({
            position: "top-right",
            type: "warning",
            color: "warning",
            textColor: "white",
            icon: "warning",
            message: o[a],
            closeBtn: "x"
          });
      else {
        const a = o == "" || o == null ? "Error" : o;
        this.Notify.create({
          position: "top-right",
          type: "warning",
          color: "warning",
          textColor: "white",
          icon: "warning",
          message: a,
          closeBtn: "x"
        });
      }
    },
    error(o) {
      if (Array.isArray(o))
        for (const a in o)
          this.Notify.create({
            position: "top-right",
            type: "negative",
            color: "negative",
            textColor: "white",
            icon: "error",
            message: o[a],
            closeBtn: "x"
          });
      else {
        const a = o == "" || o == null ? "Error" : o;
        this.Notify.create({
          position: "top-right",
          type: "negative",
          color: "negative",
          textColor: "white",
          icon: "error",
          message: a,
          closeBtn: "x"
        });
      }
    }
  }
}), x = de("sfapi", {
  state: () => ({}),
  getters: {},
  actions: {
    async call({
      param: o,
      apiName: a,
      header: t = {},
      showErrorNotification: s = !0,
      flgJsonAsContentType: p = !0,
      flgLoading: _ = !1
    }) {
      var k, w, b, g, y, v, r, m, $, D, R, i;
      const P = F();
      _ && ee.show();
      try {
        const d = new FormData(), h = {
          headers: Object.assign(
            {},
            {
              Authorization: G.has("token") ? "Bearer " + G.get("token") : "",
              "Content-Language": G.has("lang") ? G.get("lang") : "en"
            },
            t
          )
        };
        for (const S in o)
          o.hasOwnProperty(S) && (Array.isArray(o[S]) ? d.append(S, JSON.stringify(o[S])) : d.append(S, o[S]));
        const f = await this.api.post(
          a,
          p ? JSON.stringify(o) : d,
          h
        );
        return !f.data.success && s && (typeof ((w = (k = f == null ? void 0 : f.data) == null ? void 0 : k.data) == null ? void 0 : w.msglist) == "object" && ((g = (b = f == null ? void 0 : f.data) == null ? void 0 : b.data) == null ? void 0 : g.msglist) !== null && !Array.isArray((v = (y = f == null ? void 0 : f.data) == null ? void 0 : y.data) == null ? void 0 : v.msglist) ? P.warning("error validation") : (m = (r = f == null ? void 0 : f.data) == null ? void 0 : r.data) != null && m.msglist ? P.warning((D = ($ = f == null ? void 0 : f.data) == null ? void 0 : $.data) == null ? void 0 : D.msglist) : P.warning((i = (R = f == null ? void 0 : f.data) == null ? void 0 : R.data) == null ? void 0 : i.msg)), f.data.error = !1, f.data;
      } catch (d) {
        return await this.handleError(d, !0), { error: !0, success: !1, error_data: d };
      } finally {
        _ && ee.hide();
      }
    },
    async postmultipart({
      param: o,
      apiName: a,
      header: t = {},
      showErrorNotification: s = !0,
      flgLoading: p = !0
    }) {
      return t["Content-Type"] = "multipart/form-data", await this.call({
        param: o,
        apiName: a,
        header: t,
        showErrorNotification: s,
        flgJsonAsContentType: !1,
        flgLoading: p
      });
    },
    async add({ param: o, apiName: a, header: t = {}, showErrorNotification: s = !0 }) {
      return await this.call({
        param: o,
        apiName: a,
        header: t,
        showErrorNotification: s,
        flgLoading: !0
      });
    },
    async edit({ param: o, apiName: a, header: t = {}, showErrorNotification: s = !0 }) {
      return await this.call({
        param: o,
        apiName: a,
        header: t,
        showErrorNotification: s,
        flgLoading: !0
      });
    },
    async delete({
      param: o,
      apiName: a,
      header: t = {},
      showErrorNotification: s = !0
    }) {
      return await this.call({
        param: o,
        apiName: a,
        header: t,
        showErrorNotification: s,
        flgLoading: !0
      });
    },
    async get({
      param: o,
      apiName: a,
      loading: t = !0,
      header: s = {},
      showErrorNotification: p = !0
    }) {
      return await this.call({
        param: o,
        apiName: a,
        header: s,
        showErrorNotification: p,
        flgLoading: t
      });
    },
    async getlist({
      param: o,
      apiName: a,
      loading: t = !1,
      header: s = {},
      showErrorNotification: p = !0
    }) {
      return await this.call({
        param: o,
        apiName: a,
        header: s,
        showErrorNotification: p,
        flgLoading: t
      });
    },
    async count({
      param: o,
      apiName: a,
      loading: t = !1,
      header: s = {},
      showErrorNotification: p = !0
    }) {
      return await this.call({
        param: o,
        apiName: a,
        header: s,
        showErrorNotification: p,
        flgLoading: t
      });
    },
    async download({
      param: o,
      apiName: a,
      header: t = {},
      loading: s = !1,
      showErrorNotification: p = !0,
      flgJsonAsContentType: _ = !0
    }) {
      var k, w, b, g, y, v;
      const P = F();
      try {
        s && ee.show();
        const r = new FormData(), $ = {
          headers: Object.assign(
            {},
            {
              Authorization: G.has("token") ? "Bearer " + G.get("token") : "",
              "Content-Language": G.has("lang") ? G.get("lang") : "en"
            },
            t
          ),
          responseType: "blob"
        };
        for (const q in o)
          o.hasOwnProperty(q) && (Array.isArray(o[q]) ? r.append(q, JSON.stringify(o[q])) : r.append(q, o[q]));
        let D = await this.api.post(
          a,
          _ ? JSON.stringify(o) : r,
          $
        );
        if (s && ee.hide(), ((k = D == null ? void 0 : D.data) == null ? void 0 : k.type) == "application/json") {
          const q = await ((w = D == null ? void 0 : D.data) == null ? void 0 : w.text());
          let h = JSON.parse(q);
          return h.success ? h : ((b = h == null ? void 0 : h.data) != null && b.msglist ? P.warning((g = h == null ? void 0 : h.data) == null ? void 0 : g.msglist) : P.warning((y = h == null ? void 0 : h.data) == null ? void 0 : y.msg), { error: !0, success: !1 });
        }
        const R = window.URL.createObjectURL(new Blob([D.data]), {
          type: D.headers["content-type"]
        }), i = document.createElement("a");
        i.href = R;
        const d = (v = D.headers["content-disposition"]) == null ? void 0 : v.split("filename=")[1];
        i.setAttribute("download", d || "download"), document.body.appendChild(i), i.click(), window.URL.revokeObjectURL(R);
      } catch (r) {
        return await this.handleError(r, p), { error: !0, success: !1, error_data: r };
      }
    },
    async handleError(o, a) {
      var p, _, P, k, w, b, g, y;
      const t = ae(), s = F();
      if (o.response != null) {
        if (o.response.status == 401) {
          a && s.error("Session Expired"), t.isLoggedIn = !1, K.set("permissions", []), t.displayName = "", t.role = "", G.remove("token", {
            sameSite: "Strict",
            secure: !0,
            path: "/"
          }), G.remove("role", {
            sameSite: "Strict",
            secure: !0,
            path: "/"
          }), this.router.replace("/login");
          return;
        }
        if (o.response.status == 419) {
          a && s.error("Session Expired"), t.isLoggedIn = !1, K.set("permissions", []), t.displayName = "", t.role = "", G.remove("token", {
            sameSite: "Strict",
            secure: !0,
            path: "/"
          }), G.remove("role", {
            sameSite: "Strict",
            secure: !0,
            path: "/"
          }), window.location.reload();
          return;
        }
        if (((_ = (p = o == null ? void 0 : o.response) == null ? void 0 : p.data) == null ? void 0 : _.errorKey) == 900) {
          this.router.replace("/emailNotVerified");
          return;
        }
        if ((w = (k = (P = o == null ? void 0 : o.response) == null ? void 0 : P.data) == null ? void 0 : k.data) != null && w.msg) {
          a && s.error((y = (g = (b = o == null ? void 0 : o.response) == null ? void 0 : b.data) == null ? void 0 : g.data) == null ? void 0 : y.msg);
          return;
        }
      } else {
        a && s.error(o == null ? void 0 : o.message);
        return;
      }
    }
  }
}), Je = de("auth", {
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
    async login(o, a = "/dashboard") {
      const t = x(), s = ae();
      ee.show();
      let p = await t.call({
        param: o,
        apiName: "login"
      });
      return ee.hide(), p.success && (s.isLoggedIn = !0, s.displayName = p.data.user.name, s.role = p.data.user.role_name, s.user = p.data.user, K.set("user", p.data.user), K.set("permissions", p.data.user.permissions), K.set("isLoggedIn", !0), K.set("displayName", p.data.user.name), K.set("role", p.data.user.role_name), G.set("role", p.data.user.role_name, {
        expires: s.cookiesExpire,
        sameSite: "Strict",
        secure: !0,
        path: "/"
      }), G.set("token", p.data.token, {
        expires: this.cookiesExpire,
        sameSite: "Strict",
        secure: !0,
        path: "/"
      }), this.router.push(a)), p.success;
    },
    async logout(o, a = "/") {
      const t = x(), s = ae(), p = F();
      ee.show();
      let _ = await t.call({
        param: o,
        apiName: "auth/logout"
      });
      return ee.hide(), _.success && (s.isLoggedIn = !1, K.set("permissions", []), s.displayName = "", s.role = "", G.remove("token", {
        sameSite: "Strict",
        secure: !0,
        path: "/"
      }), G.remove("role", {
        sameSite: "Strict",
        secure: !0,
        path: "/"
      }), p.success("success"), this.router.push(a)), _.success;
    },
    async isTokenValid() {
      const o = x(), a = ae(), t = F();
      let s = await o.call({
        param: {},
        apiName: "auth/isTokenValid",
        showErrorNotification: !1
      });
      s.success ? (a.isLoggedIn = !0, a.displayName = s.data.user.name, a.role = s.data.user.role_name, a.user = s.data.user, K.set("user", s.data.user), K.set("permissions", s.data.user.permissions), K.set("isLoggedIn", !0), K.set("displayName", s.data.user.name), K.set("role", s.data.user.role_name), G.set("role", s.data.user.role_name, {
        expires: "24h",
        sameSite: "Strict",
        secure: !0,
        path: "/"
      })) : navigator.onLine ? (a.user = K.getItem("user"), a.isLoggedIn = K.getItem("isLoggedIn"), a.displayName = K.getItem("displayName"), a.role = K.getItem("role")) : t.error("DEVICE OFFLINE");
    }
  }
}), We = de("roleAndPermission", {
  state: () => ({}),
  getters: {},
  actions: {
    async addPermissionToRole(o) {
      const a = x(), t = F();
      let s = await a.add({
        param: o,
        apiName: "roleAndPermission/addPermissionToRole"
      });
      return s.success && t.showSuccess("success"), s;
    },
    async deleteRole(o) {
      const a = x(), t = F();
      let s = await a.delete({
        param: o,
        apiName: "roleAndPermission/deleteRole"
      });
      return s.success && t.showSuccess("success"), s;
    },
    async changeRole(o) {
      const a = x(), t = F();
      let s = await a.edit({
        param: o,
        apiName: "roleAndPermission/changeRole"
      });
      return s.success && t.showSuccess("success"), s;
    },
    async deletePermissionOfRoleRole(o) {
      const a = x(), t = F();
      let s = await a.delete({
        param: o,
        apiName: "roleAndPermission/deletePermissionOfRoleRole"
      });
      return s.success && t.showSuccess("success"), s;
    },
    async getRoleList(o) {
      return await x().getlist({
        param: o,
        apiName: "roleAndPermission/getRoleList",
        loading: !1
      });
    },
    async countGetRoleList(o) {
      return await x().get({
        param: o,
        apiName: "roleAndPermission/countGetRoleList",
        loading: !1
      });
    },
    async getAvailablePermissionListForRole(o) {
      return await x().getlist({
        param: o,
        apiName: "roleAndPermission/getAvailablePermissionListForRole",
        loading: !1
      });
    },
    async countGetAvailablePermissionListForRole(o) {
      return await wsapiStore().get({
        param: o,
        apiName: "roleAndPermission/countGetAvailablePermissionListForRole",
        loading: !1
      });
    },
    async getPermissionOfRoleList(o) {
      return await x().getlist({
        param: o,
        apiName: "roleAndPermission/getPermissionOfRoleList",
        loading: !1
      });
    }
  }
}), Xe = function(a) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(a);
}, Ze = function(a) {
  const t = K.getItem("permissions");
  if (Array.isArray(a) && Array.isArray(t)) {
    let s = a.some((p, _, P) => t.includes(p));
    return s = s || a.includes("ALL") || a.length == 0, G.get("role") == "SUPERADMIN" || s;
  } else
    return !1;
}, eo = {
  //A
  action: "Action",
  add: "Add",
  add_role: "Add Role",
  are_you_sure: "Are you sure ?",
  are_you_sure_delete: "Are you sure delete ?",
  //B
  bahasa: "Bahasa",
  //C
  cancel: "Cancel",
  change_profile: "Change Profile",
  change_role: "Change Role",
  confirm_password: "Confirm Password",
  //D
  delete: "Delete",
  //E
  edit_user: "Edit User",
  email: "Email",
  english: "English",
  //F
  //G
  //H
  //I
  //J
  //K
  keyword: "Keyword",
  //L
  login: "Login",
  //M
  //N
  name: "Name",
  new_password: "New Password",
  no: "No",
  //O
  old_password: "Old Password",
  //P
  password: "Password",
  permission_group: "Permission Group",
  permission_name: "Permission Name",
  permission_of_role: "Permission of Role",
  please_choose_permission: "Please Choose Permission",
  profile: "Profile",
  //Q
  //R
  role: "Role",
  role_name: "Role Name",
  role_of_user: "Role of User",
  //S
  //T
  //U
  user: "User",
  username: "Username",
  user_role: "User Role",
  user_vs_role: "User VS Role",
  //V
  //W
  //X
  //Y
  yes: "Yes"
  //Z
}, oo = {
  //A
  action: "Aksi",
  add: "Tambah",
  add_role: "Tambah Role",
  are_you_sure: "Apakah anda yakin ?",
  are_you_sure_delete: "Apakah anda yakin hapus ?",
  //B
  bahasa: "Bahasa",
  //C
  cancel: "Batalkan",
  change_profile: "Ubah Profile",
  change_role: "Ubah Role",
  confirm_password: "Konfirmasi Password",
  //D
  delete: "Hapus",
  //E
  edit_user: "Sunting User",
  email: "Email",
  english: "English",
  //F
  //G
  //H
  //I
  //J
  //K
  keyword: "kata kunci",
  //L
  login: "Login",
  //M
  //N
  name: "Nama",
  new_password: "Password Baru",
  no: "No",
  //O
  old_password: "Password Lama",
  //P
  password: "Password",
  permission_group: "Permission Group",
  permission_name: "Nama Permission",
  permission_of_role: "Permission of Role",
  please_choose_permission: "Mohon Pilih Permission",
  profile: "Profile",
  //Q
  //R
  role: "Role",
  role_name: "Nama Role",
  role_of_user: "Role of User",
  //S
  //T
  //U
  user: "User",
  username: "Username",
  user_role: "User Role",
  user_vs_role: "User VS Role",
  //V
  //W
  //X
  //Y
  yes: "Ya"
  //Z
}, to = { class: "row col" }, ao = {
  key: 0,
  class: "text-negative"
}, lo = {
  class: "self-center full-width no-outline",
  tabindex: "0"
}, so = { class: "row items-center justify-end" }, ge = {
  __name: "SfDatePicker",
  props: {
    readonly: {
      type: Boolean,
      required: !1,
      default: !1
    },
    error: {
      type: Boolean,
      required: !1,
      default: null
    },
    errorMessage: {
      type: String,
      required: !1,
      default: null
    },
    modelValue: {
      type: String,
      required: !0
    },
    label: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: a }) {
    const t = o, s = a, p = c(), _ = c(t.modelValue);
    c(t.label), c(t.hint), z(
      () => t.modelValue,
      (w, b) => {
        _.value = w;
      }
    );
    function P(w) {
      p.value.hide(), s("update:modelValue", w);
    }
    function k() {
      p.value.hide(), s("update:modelValue", "");
    }
    return (w, b) => {
      const g = l("q-icon"), y = l("q-btn"), v = l("q-date"), r = l("q-popup-proxy"), m = l("q-field"), $ = te("close-popup");
      return L(), B(m, {
        "label-slot": "",
        "stack-label": "",
        outlined: "",
        "bottom-slots": t.hint != null && t.hint != "",
        readonly: t.readonly,
        error: t.error,
        "error-message": t.errorMessage
      }, {
        append: n(() => [
          e(g, { name: "event" })
        ]),
        label: n(() => [
          u("div", to, [
            le(E(t.label) + " ", 1),
            t.required ? (L(), re("div", ao, "*")) : se("", !0)
          ])
        ]),
        control: n(() => [
          u("div", lo, E(I(_e)(_.value)), 1)
        ]),
        hint: n(() => [
          u("div", null, E(t.hint), 1)
        ]),
        default: n(() => [
          e(r, {
            "no-parent-event": t.readonly,
            ref_key: "dateProxy",
            ref: p,
            "transition-show": "scale",
            "transition-hide": "scale"
          }, {
            default: n(() => [
              e(v, {
                modelValue: _.value,
                "onUpdate:modelValue": [
                  b[1] || (b[1] = (D) => _.value = D),
                  P
                ],
                mask: "YYYY-MM-DD"
              }, {
                default: n(() => [
                  u("div", so, [
                    M(e(y, {
                      label: w.$t("clear"),
                      color: "primary",
                      flat: "",
                      onClick: b[0] || (b[0] = (D) => k())
                    }, null, 8, ["label"]), [
                      [$]
                    ]),
                    M(e(y, {
                      label: w.$t("close"),
                      color: "primary",
                      flat: ""
                    }, null, 8, ["label"]), [
                      [$]
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["no-parent-event"])
        ]),
        _: 1
      }, 8, ["bottom-slots", "readonly", "error", "error-message"]);
    };
  }
}, no = { class: "row col" }, ro = {
  key: 0,
  class: "text-negative"
}, io = {
  class: "self-center full-width no-outline",
  tabindex: "0"
}, co = { class: "text-red" }, uo = { class: "row items-center justify-end" }, mo = { class: "row items-center justify-end" }, ve = {
  __name: "SfDatetimePicker",
  props: {
    readOnly: {
      type: Boolean,
      required: !1,
      default: !1
    },
    error: {
      type: Boolean,
      required: !1,
      default: null
    },
    errorMessage: {
      type: String,
      required: !1,
      default: ""
    },
    modelValue: {
      type: String,
      required: !0
    },
    label: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: a }) {
    const t = o, s = a, p = c(), _ = c(), P = c(t.modelValue);
    c(t.label);
    const k = c(t.hint);
    c(!0), z(
      () => t.modelValue,
      (y, v) => {
        P.value = y;
      }
    );
    function w(y) {
      p.value.hide(), _.value.show();
    }
    function b() {
      s("update:modelValue", ""), p.value.hide();
    }
    function g(y, v) {
      s("update:modelValue", y);
    }
    return (y, v) => {
      const r = l("q-icon"), m = l("q-btn"), $ = l("q-date"), D = l("q-popup-proxy"), R = l("q-time"), i = l("q-field"), d = te("close-popup");
      return L(), B(i, {
        "label-slot": "",
        "stack-label": "",
        outlined: "",
        "bottom-slots": k.value != null && k.value != "",
        readonly: t.readOnly,
        error: t.error,
        "error-message": t.errorMessage
      }, {
        append: n(() => [
          e(r, { name: "event" })
        ]),
        label: n(() => [
          u("div", no, [
            le(E(t.label) + " ", 1),
            t.required ? (L(), re("div", ro, "*")) : se("", !0)
          ])
        ]),
        control: n(() => [
          u("div", io, E(I(fe)(P.value)), 1)
        ]),
        hint: n(() => [
          u("div", co, E(k.value), 1)
        ]),
        default: n(() => [
          e(D, {
            "no-parent-event": t.readOnly,
            ref_key: "dateProxy",
            ref: p,
            "transition-show": "scale",
            "transition-hide": "scale"
          }, {
            default: n(() => [
              e($, {
                modelValue: P.value,
                "onUpdate:modelValue": [
                  v[1] || (v[1] = (q) => P.value = q),
                  w
                ],
                mask: "YYYY-MM-DD HH:mm:ss",
                "no-unset": ""
              }, {
                default: n(() => [
                  u("div", uo, [
                    M(e(m, {
                      label: y.$t("clear"),
                      color: "primary",
                      flat: "",
                      onClick: v[0] || (v[0] = (q) => b())
                    }, null, 8, ["label"]), [
                      [d]
                    ]),
                    M(e(m, {
                      label: y.$t("close"),
                      color: "primary",
                      flat: ""
                    }, null, 8, ["label"]), [
                      [d]
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["no-parent-event"]),
          e(D, {
            ref_key: "timeProxy",
            ref: _,
            "transition-show": "scale",
            "transition-hide": "scale"
          }, {
            default: n(() => [
              e(R, {
                modelValue: P.value,
                "onUpdate:modelValue": [
                  v[2] || (v[2] = (q) => P.value = q),
                  g
                ],
                format24h: "",
                mask: "YYYY-MM-DD HH:mm:ss",
                "with-seconds": "",
                color: "primary"
              }, {
                default: n(() => [
                  u("div", mo, [
                    M(e(m, {
                      label: y.$t("close"),
                      color: "primary",
                      flat: ""
                    }, null, 8, ["label"]), [
                      [d]
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }, 512)
        ]),
        _: 1
      }, 8, ["bottom-slots", "readonly", "error", "error-message"]);
    };
  }
}, po = { class: "row col" }, _o = {
  key: 0,
  class: "text-negative"
}, fo = {
  class: "self-center full-width no-outline",
  tabindex: "0"
}, go = { class: "text-red" }, vo = { class: "row items-center justify-end" }, we = {
  __name: "SfMonthPicker",
  props: {
    readOnly: {
      type: Boolean,
      required: !1,
      default: !1
    },
    error: {
      type: Boolean,
      required: !1,
      default: null
    },
    errorMessage: {
      type: String,
      required: !1,
      default: ""
    },
    modelValue: {
      type: String,
      required: !0
    },
    label: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: a }) {
    const t = o, s = a, p = c(), _ = c(t.modelValue);
    c(t.label);
    const P = c(t.hint);
    z(
      () => t.modelValue,
      (w, b) => {
        _.value = w;
      }
    );
    function k(w) {
      p.value.hide(), s("update:modelValue", w);
    }
    return (w, b) => {
      const g = l("q-icon"), y = l("q-btn"), v = l("q-date"), r = l("q-popup-proxy"), m = l("q-field"), $ = te("close-popup");
      return L(), B(m, {
        "label-slot": "",
        "stack-label": "",
        outlined: "",
        "bottom-slots": P.value != null && P.value != "",
        readonly: t.readOnly,
        error: t.error,
        "error-message": t.errorMessage
      }, {
        append: n(() => [
          e(g, { name: "event" })
        ]),
        label: n(() => [
          u("div", po, [
            le(E(t.label) + " ", 1),
            t.required ? (L(), re("div", _o, "*")) : se("", !0)
          ])
        ]),
        control: n(() => [
          u("div", fo, E(I(Fe)(_.value)), 1)
        ]),
        hint: n(() => [
          u("div", go, E(P.value), 1)
        ]),
        default: n(() => [
          e(r, {
            "no-parent-event": t.readOnly,
            ref_key: "dateProxy",
            ref: p,
            "transition-show": "scale",
            "transition-hide": "scale"
          }, {
            default: n(() => [
              e(v, {
                modelValue: _.value,
                "onUpdate:modelValue": [
                  b[0] || (b[0] = (D) => _.value = D),
                  k
                ],
                mask: "YYYY-MM",
                color: "primary",
                title: "",
                minimal: "",
                "years-in-month-view": !0,
                "default-view": "Months",
                "emit-immediately": !0
              }, {
                default: n(() => [
                  u("div", vo, [
                    M(e(y, {
                      label: w.$t("close"),
                      color: "primary",
                      flat: ""
                    }, null, 8, ["label"]), [
                      [$]
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["no-parent-event"])
        ]),
        _: 1
      }, 8, ["bottom-slots", "readonly", "error", "error-message"]);
    };
  }
}, wo = { class: "row col" }, bo = {
  key: 0,
  class: "text-negative"
}, yo = {
  class: "self-center full-width no-outline",
  tabindex: "0"
}, qo = { class: "row items-center justify-end" }, be = {
  __name: "SfTimePicker",
  props: {
    readOnly: {
      type: Boolean,
      required: !1,
      default: !1
    },
    error: {
      type: Boolean,
      required: !1,
      default: null
    },
    errorMessage: {
      type: String,
      required: !1,
      default: ""
    },
    modelValue: {
      type: String,
      required: !0
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: a }) {
    const t = o, s = a;
    c();
    const p = c(), _ = c(t.modelValue);
    c(t.label), z(
      () => t.modelValue,
      (w, b) => {
        _.value = w;
      }
    );
    function P(w) {
      s("update:modelValue", w);
    }
    function k() {
      p.value.hide(), s("update:modelValue", "");
    }
    return (w, b) => {
      const g = l("q-icon"), y = l("q-btn"), v = l("q-time"), r = l("q-popup-proxy"), m = l("q-field"), $ = te("close-popup");
      return L(), B(m, {
        "label-slot": "",
        "stack-label": "",
        outlined: "",
        readonly: t.readOnly,
        error: t.error,
        "error-message": t.errorMessage
      }, {
        append: n(() => [
          e(g, { name: "access_time" })
        ]),
        label: n(() => [
          u("div", wo, [
            le(E(t.label) + " ", 1),
            t.required ? (L(), re("div", bo, "*")) : se("", !0)
          ])
        ]),
        control: n(() => [
          u("div", yo, E(_.value), 1)
        ]),
        default: n(() => [
          e(r, {
            "no-parent-event": t.readOnly,
            "transition-show": "scale",
            "transition-hide": "scale",
            ref_key: "timePickerProxy",
            ref: p
          }, {
            default: n(() => [
              e(v, {
                modelValue: _.value,
                "onUpdate:modelValue": [
                  b[0] || (b[0] = (D) => _.value = D),
                  b[1] || (b[1] = (D) => P(_.value))
                ],
                format24h: "",
                color: "primary"
              }, {
                default: n(() => [
                  u("div", qo, [
                    M(e(y, {
                      onClick: k,
                      label: w.$t("clear"),
                      color: "primary",
                      flat: ""
                    }, null, 8, ["label"]), [
                      [$]
                    ]),
                    M(e(y, {
                      label: w.$t("close"),
                      color: "primary",
                      flat: ""
                    }, null, 8, ["label"]), [
                      [$]
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }, 8, ["no-parent-event"])
        ]),
        _: 1
      }, 8, ["readonly", "error", "error-message"]);
    };
  }
}, ho = { class: "text-h6" }, Po = { class: "row" }, So = { class: "col" }, $o = { class: "row" }, ko = { class: "col" }, Ro = { class: "row" }, Do = { class: "col" }, Vo = { class: "row" }, Uo = { class: "col" }, Ao = { class: "row" }, No = { class: "col" }, ye = {
  __name: "SfAddUserDlg",
  props: {
    modelValue: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...oe.emits
  ],
  setup(o, { emit: a }) {
    const t = o, s = a, { dialogRef: p, onDialogHide: _, onDialogOK: P, onDialogCancel: k } = oe();
    W(), X(), Z(), J();
    const w = x();
    ae();
    const b = F();
    c(t.flgDialog);
    const g = c({
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    async function y() {
      (await w.call({
        param: g.value,
        apiName: "user/addUser",
        loading: !0,
        showErrorNotification: !0
      })).success && (s("ok"), P(), b.success("Success"));
    }
    return z(
      () => {
      },
      (v, r) => {
      }
    ), Q(() => {
    }), (v, r) => {
      const m = l("q-space"), $ = l("q-dialog"), D = te("close-popup");
      return L(), B($, {
        ref_key: "dialogRef",
        ref: p,
        onHide: I(_),
        persistent: ""
      }, {
        default: n(() => [
          e(I(Be), null, {
            default: n(() => [
              e(I(me), { class: "row items-center q-pb-none" }, {
                default: n(() => [
                  u("div", ho, E(v.$t("add_user")), 1),
                  e(m),
                  M(e(I(ce), {
                    icon: "close",
                    flat: "",
                    round: "",
                    dense: ""
                  }, null, 512), [
                    [D]
                  ])
                ]),
                _: 1
              }),
              e(I(me), { class: "q-gutter-sm" }, {
                default: n(() => [
                  u("div", Po, [
                    u("div", So, [
                      e(I(ie), {
                        outlined: "",
                        label: v.$t("username"),
                        modelValue: g.value.username,
                        "onUpdate:modelValue": r[0] || (r[0] = (R) => g.value.username = R)
                      }, null, 8, ["label", "modelValue"])
                    ])
                  ]),
                  u("div", $o, [
                    u("div", ko, [
                      e(I(ie), {
                        outlined: "",
                        label: v.$t("name"),
                        modelValue: g.value.name,
                        "onUpdate:modelValue": r[1] || (r[1] = (R) => g.value.name = R)
                      }, null, 8, ["label", "modelValue"])
                    ])
                  ]),
                  u("div", Ro, [
                    u("div", Do, [
                      e(I(ie), {
                        outlined: "",
                        label: v.$t("email"),
                        modelValue: g.value.email,
                        "onUpdate:modelValue": r[2] || (r[2] = (R) => g.value.email = R),
                        autocomplete: "off"
                      }, null, 8, ["label", "modelValue"])
                    ])
                  ]),
                  u("div", Vo, [
                    u("div", Uo, [
                      e(I(ie), {
                        outlined: "",
                        label: v.$t("password"),
                        modelValue: g.value.password,
                        "onUpdate:modelValue": r[3] || (r[3] = (R) => g.value.password = R),
                        type: "password",
                        autocomplete: "off"
                      }, null, 8, ["label", "modelValue"])
                    ])
                  ]),
                  u("div", Ao, [
                    u("div", No, [
                      e(I(ie), {
                        outlined: "",
                        label: v.$t("confirm_password"),
                        modelValue: g.value.confirmPassword,
                        "onUpdate:modelValue": r[4] || (r[4] = (R) => g.value.confirmPassword = R),
                        type: "password"
                      }, null, 8, ["label", "modelValue"])
                    ])
                  ])
                ]),
                _: 1
              }),
              e(I(xe), null, {
                default: n(() => [
                  M(e(I(ce), {
                    label: v.$t("cancel"),
                    color: "warning"
                  }, null, 8, ["label"]), [
                    [D]
                  ]),
                  e(I(ce), {
                    label: v.$t("add"),
                    color: "primary",
                    onClick: r[5] || (r[5] = (R) => y())
                  }, null, 8, ["label"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
}, Co = { class: "text-h6 text-center" }, Oo = { class: "row" }, Lo = { class: "col" }, Eo = { class: "row" }, To = { class: "col" }, Yo = { class: "row" }, Bo = { class: "col" }, xo = { class: "row" }, Io = { class: "col" }, Mo = { class: "row" }, Fo = { class: "col" }, jo = { class: "row" }, Ho = { class: "col" }, qe = {
  __name: "SfEditUserDlg",
  props: {
    user: {
      type: Object,
      required: !1
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...oe.emits
  ],
  setup(o, { emit: a }) {
    const t = o, s = a, { dialogRef: p, onDialogHide: _, onDialogOK: P, onDialogCancel: k } = oe(), w = W();
    X(), Z(), J();
    const b = x(), g = ae(), y = F(), v = c("profile");
    c(20), c(t.user);
    const r = c({});
    r.value.width = w.screen.sizes.md + "px";
    const m = c({
      username: "",
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    async function $() {
      ee.show();
      const i = await b.call({
        param: { name: m.value.name },
        apiName: "user/editUser",
        loading: !0,
        showErrorNotification: !0
      });
      ee.hide(), i.success && (g.displayName = i.data.name, s("ok"), P(), y.success("Success"));
    }
    async function D() {
      ee.show();
      const i = await b.call({
        param: {
          old_password: m.value.oldPassword,
          new_password: m.value.newPassword,
          confirm_password: m.value.confirmPassword
        },
        apiName: "user/changePassword",
        loading: !0,
        showErrorNotification: !0
      });
      ee.hide(), i.success && (s("ok"), P(), y.success("Success"));
    }
    async function R() {
      const i = await b.call({
        param: {},
        apiName: "user/findCurrentUser",
        loading: !0,
        showErrorNotification: !0
      });
      i.success && (m.value.username = i.data.username, m.value.name = i.data.name, m.value.email = i.data.email);
    }
    return z(
      () => {
      },
      (i, d) => {
      }
    ), Q(() => {
      R();
    }), (i, d) => {
      const q = l("q-space"), h = l("q-btn"), f = l("q-card-section"), S = l("q-separator"), V = l("q-tab"), N = l("q-tabs"), Y = l("q-input"), A = l("q-tab-panel"), U = l("q-tab-panels"), T = l("q-card-actions"), O = l("q-card"), H = l("q-dialog"), j = te("close-popup");
      return L(), B(H, {
        ref_key: "dialogRef",
        ref: p,
        onHide: I(_),
        persistent: ""
      }, {
        default: n(() => [
          e(O, {
            style: pe(r.value)
          }, {
            default: n(() => [
              e(f, { class: "row items-center" }, {
                default: n(() => [
                  e(q),
                  u("div", Co, E(i.$t("profile")), 1),
                  e(q),
                  M(e(h, {
                    icon: "close",
                    flat: "",
                    round: "",
                    dense: ""
                  }, null, 512), [
                    [j]
                  ])
                ]),
                _: 1
              }),
              e(S),
              e(N, {
                modelValue: v.value,
                "onUpdate:modelValue": d[0] || (d[0] = (C) => v.value = C),
                dense: "",
                "left-icon": "",
                "active-color": "white",
                "indicator-color": "primary",
                "active-class": "bg-primary"
              }, {
                default: n(() => [
                  e(V, {
                    name: "profile",
                    icon: "fa-regular fa-user",
                    label: i.$t("profile")
                  }, null, 8, ["label"]),
                  e(V, {
                    name: "password",
                    icon: "fa-solid fa-lock",
                    label: i.$t("password")
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["modelValue"]),
              e(S),
              e(U, {
                modelValue: v.value,
                "onUpdate:modelValue": d[7] || (d[7] = (C) => v.value = C),
                animated: "",
                swipeable: "",
                vertical: "",
                "transition-prev": "jump-up",
                "transition-next": "jump-up"
              }, {
                default: n(() => [
                  e(A, {
                    name: "profile",
                    class: "q-gutter-sm"
                  }, {
                    default: n(() => [
                      u("div", Oo, [
                        u("div", Lo, [
                          e(Y, {
                            outlined: "",
                            label: i.$t("username"),
                            modelValue: m.value.username,
                            "onUpdate:modelValue": d[1] || (d[1] = (C) => m.value.username = C),
                            readonly: ""
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ]),
                      u("div", Eo, [
                        u("div", To, [
                          e(Y, {
                            outlined: "",
                            label: i.$t("email"),
                            modelValue: m.value.email,
                            "onUpdate:modelValue": d[2] || (d[2] = (C) => m.value.email = C),
                            readonly: ""
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ]),
                      u("div", Yo, [
                        u("div", Bo, [
                          e(Y, {
                            outlined: "",
                            label: i.$t("name"),
                            modelValue: m.value.name,
                            "onUpdate:modelValue": d[3] || (d[3] = (C) => m.value.name = C)
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  e(A, {
                    name: "password",
                    class: "q-gutter-sm"
                  }, {
                    default: n(() => [
                      u("div", xo, [
                        u("div", Io, [
                          e(Y, {
                            outlined: "",
                            label: i.$t("old_password"),
                            modelValue: m.value.oldPassword,
                            "onUpdate:modelValue": d[4] || (d[4] = (C) => m.value.oldPassword = C),
                            type: "password"
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ]),
                      u("div", Mo, [
                        u("div", Fo, [
                          e(Y, {
                            outlined: "",
                            label: i.$t("new_password"),
                            modelValue: m.value.newPassword,
                            "onUpdate:modelValue": d[5] || (d[5] = (C) => m.value.newPassword = C),
                            type: "password"
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ]),
                      u("div", jo, [
                        u("div", Ho, [
                          e(Y, {
                            outlined: "",
                            label: i.$t("confirm_password"),
                            modelValue: m.value.confirmPassword,
                            "onUpdate:modelValue": d[6] || (d[6] = (C) => m.value.confirmPassword = C),
                            type: "password"
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"]),
              e(T, null, {
                default: n(() => [
                  M(e(h, {
                    label: i.$t("cancel"),
                    color: "warning"
                  }, null, 8, ["label"]), [
                    [j]
                  ]),
                  v.value == "password" ? (L(), B(h, {
                    key: 0,
                    label: i.$t("save"),
                    color: "primary",
                    onClick: d[8] || (d[8] = (C) => D())
                  }, null, 8, ["label"])) : se("", !0),
                  v.value == "profile" ? (L(), B(h, {
                    key: 1,
                    label: i.$t("save"),
                    color: "primary",
                    onClick: d[9] || (d[9] = (C) => $())
                  }, null, 8, ["label"])) : se("", !0)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["style"])
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
}, zo = { class: "row" }, Ko = { class: "col" }, Go = { class: "row" }, Qo = { class: "col" }, Jo = { class: "row" }, Wo = { class: "col" }, Xo = { class: "row" }, Zo = { class: "col" }, et = { class: "row" }, ot = { class: "col" }, tt = { class: "row" }, at = { class: "col" }, lt = { class: "row" }, st = { class: "col" }, he = {
  __name: "SfEditUserForAdminDlg",
  props: {
    user: {
      type: Object,
      required: !0
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...oe.emits
  ],
  setup(o, { emit: a }) {
    const t = o, s = a, { dialogRef: p, onDialogHide: _, onDialogOK: P, onDialogCancel: k } = oe(), w = W();
    X(), Z(), J();
    const b = x();
    ae();
    const g = F(), y = c("profile");
    c(20);
    const v = c(t.user), r = c({});
    r.value.width = w.screen.sizes.md + "px";
    const m = c({
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      newPassword: ""
    });
    async function $() {
      ee.show();
      const i = await b.call({
        param: {
          name: m.value.name,
          user_id: v.value.user_id,
          active: m.value.active
        },
        apiName: "user/editUserForAdmin",
        loading: !0,
        showErrorNotification: !0
      });
      ee.hide(), i.success && (s("ok"), P(), g.success("Success"));
    }
    async function D() {
      ee.show();
      const i = await b.call({
        param: {
          new_password: m.value.newPassword,
          confirm_password: m.value.confirmPassword,
          user_id: v.value.user_id
        },
        apiName: "user/changePasswordForAdmin",
        loading: !0,
        showErrorNotification: !0
      });
      ee.hide(), i.success && (s("ok"), P(), g.success("Success"));
    }
    async function R() {
      var i;
      if ((i = v.value) != null && i.user_id) {
        const d = await b.call({
          param: { user_id: v.value.user_id },
          apiName: "user/findUserById",
          loading: !0,
          showErrorNotification: !0
        });
        d.success && (m.value.username = d.data.username, m.value.name = d.data.name, m.value.email = d.data.email, m.value.active = d.data.active);
      }
    }
    return z(
      () => {
      },
      (i, d) => {
      }
    ), Q(() => {
      R();
    }), (i, d) => {
      const q = l("q-card-section"), h = l("q-separator"), f = l("q-tab"), S = l("q-tabs"), V = l("q-input"), N = l("q-btn-toggle"), Y = l("q-tab-panel"), A = l("q-tab-panels"), U = l("q-btn"), T = l("q-card-actions"), O = l("q-card"), H = l("q-dialog"), j = te("close-popup");
      return L(), B(H, {
        ref_key: "dialogRef",
        ref: p,
        onHide: I(_),
        persistent: ""
      }, {
        default: n(() => [
          e(O, {
            style: pe(r.value)
          }, {
            default: n(() => [
              e(q, { class: "text-h5 text-weight-medium text-center" }, {
                default: n(() => [
                  le(E(i.$t("edit_user")), 1)
                ]),
                _: 1
              }),
              e(h),
              e(S, {
                modelValue: y.value,
                "onUpdate:modelValue": d[0] || (d[0] = (C) => y.value = C),
                dense: "",
                "left-icon": "",
                "active-color": "white",
                "indicator-color": "primary",
                "active-class": "bg-primary"
              }, {
                default: n(() => [
                  e(f, {
                    name: "profile",
                    icon: "fa-regular fa-user",
                    label: i.$t("profile")
                  }, null, 8, ["label"]),
                  e(f, {
                    name: "password",
                    icon: "fa-solid fa-lock",
                    label: i.$t("password")
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["modelValue"]),
              e(h),
              e(A, {
                modelValue: y.value,
                "onUpdate:modelValue": d[7] || (d[7] = (C) => y.value = C),
                animated: "",
                swipeable: "",
                vertical: "",
                "transition-prev": "jump-up",
                "transition-next": "jump-up"
              }, {
                default: n(() => [
                  e(Y, {
                    name: "profile",
                    class: "q-gutter-sm"
                  }, {
                    default: n(() => [
                      u("div", zo, [
                        u("div", Ko, [
                          e(V, {
                            outlined: "",
                            label: i.$t("username"),
                            modelValue: m.value.username,
                            "onUpdate:modelValue": d[1] || (d[1] = (C) => m.value.username = C),
                            readonly: ""
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ]),
                      u("div", Go, [
                        u("div", Qo, [
                          e(V, {
                            outlined: "",
                            label: i.$t("email"),
                            modelValue: m.value.email,
                            "onUpdate:modelValue": d[2] || (d[2] = (C) => m.value.email = C),
                            readonly: ""
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ]),
                      u("div", Jo, [
                        u("div", Wo, [
                          e(V, {
                            outlined: "",
                            label: i.$t("name"),
                            modelValue: m.value.name,
                            "onUpdate:modelValue": d[3] || (d[3] = (C) => m.value.name = C)
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ]),
                      u("div", Xo, [
                        u("div", Zo, E(i.$t("active")), 1)
                      ]),
                      u("div", et, [
                        u("div", ot, [
                          e(N, {
                            class: "bordered",
                            unelevated: "",
                            modelValue: m.value.active,
                            "onUpdate:modelValue": d[4] || (d[4] = (C) => m.value.active = C),
                            "toggle-color": "primary",
                            options: [
                              { label: i.$t("yes"), value: "Y" },
                              { label: i.$t("no"), value: "N" }
                            ]
                          }, null, 8, ["modelValue", "options"])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  e(Y, {
                    name: "password",
                    class: "q-gutter-sm"
                  }, {
                    default: n(() => [
                      u("div", tt, [
                        u("div", at, [
                          e(V, {
                            outlined: "",
                            label: i.$t("new_password"),
                            modelValue: m.value.newPassword,
                            "onUpdate:modelValue": d[5] || (d[5] = (C) => m.value.newPassword = C),
                            type: "password"
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ]),
                      u("div", lt, [
                        u("div", st, [
                          e(V, {
                            outlined: "",
                            label: i.$t("confirm_password"),
                            modelValue: m.value.confirmPassword,
                            "onUpdate:modelValue": d[6] || (d[6] = (C) => m.value.confirmPassword = C),
                            type: "password"
                          }, null, 8, ["label", "modelValue"])
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"]),
              e(T, null, {
                default: n(() => [
                  M(e(U, {
                    label: i.$t("cancel"),
                    color: "warning"
                  }, null, 8, ["label"]), [
                    [j]
                  ]),
                  y.value == "password" ? (L(), B(U, {
                    key: 0,
                    label: i.$t("save"),
                    color: "primary",
                    onClick: d[8] || (d[8] = (C) => D())
                  }, null, 8, ["label"])) : se("", !0),
                  y.value == "profile" ? (L(), B(U, {
                    key: 1,
                    label: i.$t("save"),
                    color: "primary",
                    onClick: d[9] || (d[9] = (C) => $())
                  }, null, 8, ["label"])) : se("", !0)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["style"])
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
}, nt = { class: "row q-pa-sm" }, rt = { class: "col" }, it = { class: "row q-pb-sm q-gutter-sm" }, dt = { class: "column" }, ct = { class: "column" }, ut = { class: "row" }, mt = { class: "col" }, Pe = {
  __name: "SfUserPage",
  setup(o) {
    const a = W();
    X(), Z(), J(), c({});
    const t = c();
    function s() {
      a.dialog({ component: "SfAddUserDlg" }).onOk(() => {
        t.value.refresh();
      });
    }
    return z(
      () => {
      },
      (p, _) => {
      }
    ), Q(() => {
    }), (p, _) => {
      const P = l("q-btn"), k = l("sf-user-table"), w = l("q-card-section"), b = l("q-card"), g = l("q-page");
      return L(), B(g, null, {
        default: n(() => [
          u("div", nt, [
            u("div", rt, [
              e(b, null, {
                default: n(() => [
                  e(w, null, {
                    default: n(() => [
                      u("div", it, [
                        u("div", dt, [
                          e(P, {
                            label: p.$t("search"),
                            color: "primary",
                            onClick: _[0] || (_[0] = (y) => t.value.refresh())
                          }, null, 8, ["label"])
                        ]),
                        u("div", ct, [
                          e(P, {
                            label: p.$t("add"),
                            color: "positive",
                            onClick: _[1] || (_[1] = (y) => s())
                          }, null, 8, ["label"])
                        ])
                      ]),
                      u("div", ut, [
                        u("div", mt, [
                          e(k, {
                            ref_key: "tableRef",
                            ref: t
                          }, null, 512)
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Se = {
  __name: "SfUserTable",
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
  ],
  setup(o, { expose: a, emit: t }) {
    const s = t, p = W(), { t: _ } = J();
    X(), Z();
    const P = x();
    F();
    const k = c(!1), w = c([]), b = c([
      { name: "index", align: "center", label: "#", field: "index" },
      {
        name: "username",
        align: "left",
        label: _("username"),
        field: "username",
        sortable: !0
      },
      {
        name: "name",
        align: "left",
        label: _("name"),
        field: "name"
      },
      {
        name: "email",
        align: "left",
        label: _("email"),
        field: "email"
      },
      {
        name: "login_session",
        align: "left",
        label: _("login_session"),
        field: "login_session"
      },
      {
        name: "active",
        align: "left",
        label: _("active"),
        field: "active"
      },
      {
        name: "action",
        align: "center",
        label: _("action"),
        field: "action",
        sortable: !1
      }
    ]), g = c([]), y = c({ keyword: "", active: "ALL" }), v = c({});
    c(!1), c();
    const r = c({
      sortBy: "username",
      descending: !1,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    async function m(i) {
      var T, O;
      const { page: d, rowsPerPage: q, sortBy: h, descending: f } = i.pagination, S = i.filter;
      k.value = !0;
      const V = q == 0 ? r.value.rowsNumber : q, N = (d - 1) * q, A = Object.assign({}, {
        limit: V,
        offset: N,
        order_by: h,
        order_by_type: f ? "DESC" : "ASC"
      }, S), U = await P.call({
        param: A,
        apiName: "user/getUserList",
        loading: !1,
        showErrorNotification: !0
      });
      U.success && (r.value.rowsNumber = U.data.total_rows, w.value.splice(0, w.value.length, ...U.data.datalist)), k.value = !1, r.value.page = d, r.value.rowsPerPage = q, !((T = U == null ? void 0 : U.data) != null && T.total_rows) && ((O = U == null ? void 0 : U.data) == null ? void 0 : O.total_rows) == 0 && (r.value.rowsPerPage = 10), r.value.sortBy = h, r.value.descending = f;
    }
    function $(i) {
      p.dialog({
        componentProps: {
          data: { username: i.username },
          msg: _("are_you_sure_logout_this_user")
        },
        component: "SfYesNoDlg"
      }).onOk(() => {
        console.log("anu"), console.log("anu :");
      }).hide();
    }
    function D(i) {
      v.value = i, p.dialog({
        component: "SfEditUserForAdminDlg",
        componentProps: { user: i }
      }).onOk(() => R());
    }
    function R() {
      m({
        pagination: r.value,
        filter: y.value
      });
    }
    return z(
      () => g.value,
      (i, d) => {
        s("update:selected", i[0] == null ? {} : i[0]);
      }
    ), Q(() => {
      R();
    }), a({ refresh: R }), (i, d) => {
      const q = l("q-icon"), h = l("q-input"), f = l("q-td"), S = l("q-item"), V = l("q-separator"), N = l("q-list"), Y = l("q-menu"), A = l("q-btn"), U = l("q-table"), T = te("ripple");
      return L(), B(U, {
        title: i.$t("user"),
        bordered: "",
        rows: w.value,
        columns: b.value,
        "row-key": (O) => O.user_id,
        "wrap-cells": !0,
        pagination: r.value,
        "onUpdate:pagination": d[1] || (d[1] = (O) => r.value = O),
        loading: k.value,
        filter: y.value,
        "virtual-scroll": "",
        separator: "horizontal",
        selection: "single",
        selected: g.value,
        "onUpdate:selected": d[2] || (d[2] = (O) => g.value = O),
        onRequest: m
      }, {
        "top-right": n(() => [
          e(h, {
            dense: "",
            outlined: "",
            debounce: "300",
            modelValue: y.value.keyword,
            "onUpdate:modelValue": d[0] || (d[0] = (O) => y.value.keyword = O),
            placeholder: i.$t("keyword")
          }, {
            append: n(() => [
              e(q, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder"])
        ]),
        "body-cell-index": n((O) => [
          e(f, { props: O }, {
            default: n(() => [
              u("div", null, E(O.rowIndex + 1), 1)
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        "body-cell-action": n((O) => [
          e(f, { props: O }, {
            default: n(() => [
              e(A, {
                label: i.$t("action"),
                size: "sm",
                color: "primary"
              }, {
                default: n(() => [
                  e(Y, { bordered: "" }, {
                    default: n(() => [
                      e(N, null, {
                        default: n(() => [
                          M((L(), B(S, {
                            clickable: "",
                            onClick: (H) => D(O.row)
                          }, {
                            default: n(() => [
                              le(E(i.$t("edit")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])), [
                            [T]
                          ]),
                          e(V),
                          M((L(), B(S, {
                            clickable: "",
                            onClick: (H) => $(O.row)
                          }, {
                            default: n(() => [
                              le(E(i.$t("logout")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])), [
                            [T]
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["label"])
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        _: 1
      }, 8, ["title", "rows", "columns", "row-key", "pagination", "loading", "filter", "selected"]);
    };
  }
}, $e = {
  __name: "SfUserForUserRoleTable",
  props: {
    selected: {
      type: Object,
      required: !0
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
  ],
  setup(o, { emit: a }) {
    const t = a;
    W();
    const { t: s } = J();
    X(), Z();
    const p = x();
    F();
    const _ = c(!1), P = c([]), k = c([
      { name: "index", align: "center", label: "#", field: "index" },
      {
        name: "username",
        align: "left",
        label: s("username"),
        field: "username"
      },
      {
        name: "name",
        align: "left",
        label: s("name"),
        field: "name"
      },
      {
        name: "email",
        align: "left",
        label: s("email"),
        field: "email"
      }
    ]), w = c([]), b = c({ keyword: "", active: "ALL" });
    c({}), c(!1), c(!1), c();
    const g = c({
      sortBy: "username",
      descending: !1,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    async function y(r) {
      var V, N;
      const { page: m, rowsPerPage: $, sortBy: D, descending: R } = r.pagination, i = r.filter;
      _.value = !0;
      const d = $ == 0 ? g.value.rowsNumber : $, q = (m - 1) * $, f = Object.assign({}, {
        limit: d,
        offset: q,
        order_by: D,
        order_by_type: R ? "DESC" : "ASC"
      }, i), S = await p.call({
        param: f,
        apiName: "user/getUserList",
        loading: !1,
        showErrorNotification: !0
      });
      S.success && (g.value.rowsNumber = S.data.total_rows, P.value.splice(0, P.value.length, ...S.data.datalist)), _.value = !1, g.value.page = m, g.value.rowsPerPage = $, !((V = S == null ? void 0 : S.data) != null && V.total_rows) && ((N = S == null ? void 0 : S.data) == null ? void 0 : N.total_rows) == 0 && (g.value.rowsPerPage = 10), g.value.sortBy = D, g.value.descending = R;
    }
    z(
      () => w.value,
      (r, m) => {
        t("update:selected", r[0] == null ? {} : r[0]);
      }
    ), Q(() => {
      v();
    });
    function v() {
      y({
        pagination: g.value,
        filter: b.value
      });
    }
    return (r, m) => {
      const $ = l("q-icon"), D = l("q-input"), R = l("q-td"), i = l("q-table");
      return L(), B(i, {
        title: r.$t("user"),
        bordered: "",
        rows: P.value,
        columns: k.value,
        "row-key": (d) => d.user_id,
        "wrap-cells": !0,
        pagination: g.value,
        "onUpdate:pagination": m[1] || (m[1] = (d) => g.value = d),
        loading: _.value,
        filter: b.value,
        "virtual-scroll": "",
        separator: "horizontal",
        selection: "single",
        selected: w.value,
        "onUpdate:selected": m[2] || (m[2] = (d) => w.value = d),
        onRequest: y
      }, {
        "top-right": n(() => [
          e(D, {
            dense: "",
            outlined: "",
            debounce: "300",
            modelValue: b.value.keyword,
            "onUpdate:modelValue": m[0] || (m[0] = (d) => b.value.keyword = d),
            placeholder: r.$t("keyword")
          }, {
            append: n(() => [
              e($, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder"])
        ]),
        "body-cell-index": n((d) => [
          e(R, { props: d }, {
            default: n(() => [
              u("div", null, E(d.rowIndex + 1), 1)
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        _: 1
      }, 8, ["title", "rows", "columns", "row-key", "pagination", "loading", "filter", "selected"]);
    };
  }
}, ke = {
  __name: "SfAvailableRoleListCombo",
  props: {
    modelValue: {
      type: Object
    }
  },
  emits: ["update:modelValue", "onChangeRole"],
  setup(o, { emit: a }) {
    const t = o, s = a, p = x(), _ = c([]), P = c(t.modelValue);
    async function k() {
      var b;
      const w = await p.call({
        param: { active: "Y" },
        apiName: "roleAndPermission/getAvailableRoleListForCombo",
        loading: !1,
        showErrorNotification: !1
      });
      if (w.success) {
        _.value = w.data;
        let g = w.data.find((y) => y.flg_current_role == "Y");
        P.value = g ?? (w.data.length > 0 ? (b = w.data) == null ? void 0 : b[0] : {});
      } else
        _.value = [];
    }
    return z(
      () => P.value,
      async (w, b) => {
        s("update:modelValue", w);
      }
    ), Q(() => {
      k();
    }), (w, b) => {
      const g = l("q-item-section"), y = l("q-item"), v = l("q-select");
      return L(), B(v, {
        dense: "",
        class: "bg-grey-2",
        outlined: "",
        modelValue: P.value,
        "onUpdate:modelValue": b[0] || (b[0] = (r) => P.value = r),
        "input-debounce": "300",
        label: w.$t("role"),
        options: _.value,
        "option-label": (r) => Object(r) === r && "role_name" in r ? r.role_name : null,
        "option-value": (r) => Object(r) === r && "role_id" in r ? r.role_id : -99
      }, {
        "no-option": n(() => [
          e(y, null, {
            default: n(() => [
              e(g, { class: "text-grey" }, {
                default: n(() => [
                  le("No results")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "label", "options", "option-label", "option-value"]);
    };
  }
}, pt = { class: "text-h6" }, _t = { class: "row" }, ft = { class: "col" }, Re = {
  __name: "SfAddRoleDlg",
  props: {
    modelValue: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...oe.emits
  ],
  setup(o, { emit: a }) {
    const t = o, s = a, { dialogRef: p, onDialogHide: _, onDialogOK: P, onDialogCancel: k } = oe();
    W(), X(), Z(), J();
    const w = x();
    ae();
    const b = F();
    c(t.flgDialog);
    const g = c({
      role_name: ""
    });
    async function y() {
      (await w.add({
        param: g.value,
        apiName: "roleAndPermission/addRole"
      })).success && (s("ok"), P(), b.success("Success"));
    }
    return z(
      () => {
      },
      (v, r) => {
      }
    ), Q(() => {
    }), (v, r) => {
      const m = l("q-space"), $ = l("q-btn"), D = l("q-card-section"), R = l("q-input"), i = l("q-card-actions"), d = l("q-card"), q = l("q-dialog"), h = te("close-popup");
      return L(), B(q, {
        ref_key: "dialogRef",
        ref: p,
        onHide: I(_),
        persistent: ""
      }, {
        default: n(() => [
          e(d, null, {
            default: n(() => [
              e(D, { class: "row items-center q-pb-none" }, {
                default: n(() => [
                  u("div", pt, E(v.$t("add_role")), 1),
                  e(m),
                  M(e($, {
                    icon: "close",
                    flat: "",
                    round: "",
                    dense: ""
                  }, null, 512), [
                    [h]
                  ])
                ]),
                _: 1
              }),
              e(D, { class: "q-gutter-sm" }, {
                default: n(() => [
                  u("div", _t, [
                    u("div", ft, [
                      e(R, {
                        outlined: "",
                        label: v.$t("role_name"),
                        modelValue: g.value.role_name,
                        "onUpdate:modelValue": r[0] || (r[0] = (f) => g.value.role_name = f)
                      }, null, 8, ["label", "modelValue"])
                    ])
                  ])
                ]),
                _: 1
              }),
              e(i, null, {
                default: n(() => [
                  M(e($, {
                    label: v.$t("cancel"),
                    color: "warning"
                  }, null, 8, ["label"]), [
                    [h]
                  ]),
                  e($, {
                    label: v.$t("add"),
                    color: "primary",
                    onClick: r[1] || (r[1] = (f) => y())
                  }, null, 8, ["label"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
}, gt = { class: "text-h6" }, vt = { class: "row" }, wt = { class: "col" }, De = {
  __name: "SfAvailablePermissionForRoleDlg",
  props: {
    role: {
      type: Object,
      required: !0
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...oe.emits
  ],
  setup(o, { emit: a }) {
    const t = o, { dialogRef: s, onDialogHide: p, onDialogOK: _, onDialogCancel: P } = oe();
    W(), X(), Z(), J(), x(), ae(), F();
    const k = c(t.role);
    return z(
      () => {
      },
      (w, b) => {
      }
    ), Q(() => {
    }), (w, b) => {
      const g = l("q-space"), y = l("q-btn"), v = l("q-card-section"), r = l("SfAvailablePermissionForRoleTable"), m = l("q-card-actions"), $ = l("q-card"), D = l("q-dialog"), R = te("close-popup");
      return L(), B(D, {
        ref_key: "dialogRef",
        ref: s,
        onHide: I(p),
        persistent: ""
      }, {
        default: n(() => [
          e($, null, {
            default: n(() => [
              e(v, { class: "row items-center q-pb-none" }, {
                default: n(() => [
                  u("div", gt, E(w.$t("available_permission")), 1),
                  e(g),
                  M(e(y, {
                    icon: "close",
                    flat: "",
                    round: "",
                    dense: ""
                  }, null, 512), [
                    [R]
                  ])
                ]),
                _: 1
              }),
              e(v, { class: "q-gutter-sm" }, {
                default: n(() => [
                  u("div", vt, [
                    u("div", wt, [
                      e(r, {
                        role: k.value,
                        onSuccess: b[0] || (b[0] = (i) => I(_)())
                      }, null, 8, ["role"])
                    ])
                  ])
                ]),
                _: 1
              }),
              e(m, null, {
                default: n(() => [
                  M(e(y, {
                    label: w.$t("cancel"),
                    color: "warning"
                  }, null, 8, ["label"]), [
                    [R]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
}, bt = { class: "text-h6" }, yt = { class: "row" }, qt = { class: "col" }, Ve = {
  __name: "SfAvailableRoleForUserRoleDlg",
  props: {
    user: {
      type: Object,
      required: !0
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...oe.emits
  ],
  setup(o, { emit: a }) {
    const t = o, { dialogRef: s, onDialogHide: p, onDialogOK: _, onDialogCancel: P } = oe();
    W(), X(), Z(), J(), x(), ae(), F();
    const k = c(t.user);
    return z(
      () => {
      },
      (w, b) => {
      }
    ), Q(() => {
    }), (w, b) => {
      const g = l("q-space"), y = l("q-btn"), v = l("q-card-section"), r = l("SfAvailableRoleForUserRoleTable"), m = l("q-card-actions"), $ = l("q-card"), D = l("q-dialog"), R = te("close-popup");
      return L(), B(D, {
        ref_key: "dialogRef",
        ref: s,
        onHide: I(p),
        persistent: ""
      }, {
        default: n(() => [
          e($, null, {
            default: n(() => [
              e(v, { class: "row items-center q-pb-none" }, {
                default: n(() => [
                  u("div", bt, E(w.$t("available_role")), 1),
                  e(g),
                  M(e(y, {
                    icon: "close",
                    flat: "",
                    round: "",
                    dense: ""
                  }, null, 512), [
                    [R]
                  ])
                ]),
                _: 1
              }),
              e(v, { class: "q-gutter-sm" }, {
                default: n(() => [
                  u("div", yt, [
                    u("div", qt, [
                      e(r, {
                        user: k.value,
                        onSuccess: b[0] || (b[0] = (i) => I(_)())
                      }, null, 8, ["user"])
                    ])
                  ])
                ]),
                _: 1
              }),
              e(m, null, {
                default: n(() => [
                  M(e(y, {
                    label: w.$t("cancel"),
                    color: "warning"
                  }, null, 8, ["label"]), [
                    [R]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
}, ht = { class: "text-h6" }, Pt = { class: "row" }, St = { class: "col" }, Ue = {
  __name: "SfChangeRoleDlg",
  props: {
    modelValue: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...oe.emits
  ],
  setup(o, { emit: a }) {
    const t = o, { dialogRef: s, onDialogHide: p, onDialogOK: _, onDialogCancel: P } = oe(), k = W();
    X(), Z(), J();
    const w = x(), b = ae(), g = F();
    c(t.flgDialog);
    const y = c({});
    c({
      role_name: ""
    });
    async function v() {
      const r = await w.call({
        param: { role_id: y.value.role_id },
        apiName: "roleAndPermission/changeRole",
        loading: !0,
        showErrorNotification: !0
      });
      r.success && (b.role = r.data.user.role_name, k.localStorage.set("permissions", r.data.user.permissions), k.cookies.set("role", r.data.user.role_name, {
        expires: b.cookiesExpire,
        sameSite: "Strict",
        secure: !0,
        path: "/"
      }), _(), g.showSuccess("Success"));
    }
    return z(
      () => {
      },
      (r, m) => {
      }
    ), Q(() => {
    }), (r, m) => {
      const $ = l("q-space"), D = l("q-btn"), R = l("q-card-section"), i = l("sf-available-role-list-combo"), d = l("q-card-actions"), q = l("q-card"), h = l("q-dialog"), f = te("close-popup");
      return L(), B(h, {
        ref_key: "dialogRef",
        ref: s,
        onHide: I(p),
        persistent: ""
      }, {
        default: n(() => [
          e(q, null, {
            default: n(() => [
              e(R, { class: "row items-center q-pb-none" }, {
                default: n(() => [
                  u("div", ht, E(r.$t("change_role")), 1),
                  e($),
                  M(e(D, {
                    icon: "close",
                    flat: "",
                    round: "",
                    dense: ""
                  }, null, 512), [
                    [f]
                  ])
                ]),
                _: 1
              }),
              e(R, { class: "q-gutter-sm" }, {
                default: n(() => [
                  u("div", Pt, [
                    u("div", St, [
                      e(i, {
                        modelValue: y.value,
                        "onUpdate:modelValue": m[0] || (m[0] = (S) => y.value = S)
                      }, null, 8, ["modelValue"])
                    ])
                  ])
                ]),
                _: 1
              }),
              e(d, null, {
                default: n(() => [
                  M(e(D, {
                    label: r.$t("cancel"),
                    color: "warning"
                  }, null, 8, ["label"]), [
                    [f]
                  ]),
                  e(D, {
                    label: r.$t("yes"),
                    color: "primary",
                    onClick: m[1] || (m[1] = (S) => v())
                  }, null, 8, ["label"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
}, $t = { class: "row" }, kt = { class: "col-6 q-pa-sm" }, Rt = { class: "row" }, Dt = { class: "col text-center text-h5 text-weight-medium" }, Vt = { class: "row" }, Ut = { class: "col" }, At = { class: "col-6 q-pa-sm" }, Nt = { class: "row" }, Ct = { class: "col text-center text-h5 text-weight-medium" }, Ot = { class: "row" }, Lt = { class: "col" }, Ae = {
  __name: "SfRolePage",
  setup(o) {
    W(), X(), Z(), J();
    const a = c({});
    return z(
      () => {
      },
      (t, s) => {
      }
    ), Q(() => {
    }), (t, s) => {
      const p = l("sf-role-table"), _ = l("sf-permission-of-role-table"), P = l("q-page");
      return L(), B(P, null, {
        default: n(() => [
          u("div", $t, [
            u("div", kt, [
              u("div", Rt, [
                u("div", Dt, E(t.$t("role")), 1)
              ]),
              u("div", Vt, [
                u("div", Ut, [
                  e(p, {
                    selected: a.value,
                    "onUpdate:selected": s[0] || (s[0] = (k) => a.value = k)
                  }, null, 8, ["selected"])
                ])
              ])
            ]),
            u("div", At, [
              u("div", Nt, [
                u("div", Ct, E(t.$t("permission_of_role")), 1)
              ]),
              u("div", Ot, [
                u("div", Lt, [
                  e(_, {
                    role: a.value,
                    "onUpdate:role": s[1] || (s[1] = (k) => a.value = k)
                  }, null, 8, ["role"])
                ])
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Et = { class: "row" }, Tt = { class: "col-6 q-pa-sm" }, Yt = { class: "row" }, Bt = { class: "col text-center text-h5 text-weight-medium" }, xt = { class: "row" }, It = { class: "col" }, Mt = { class: "col-6 q-pa-sm" }, Ft = { class: "row" }, jt = { class: "col text-center text-h5 text-weight-medium" }, Ht = { class: "row" }, zt = { class: "col" }, Ne = {
  __name: "SfUserVsRolePage",
  setup(o) {
    W(), X(), Z(), J();
    const a = c({});
    return z(
      () => {
      },
      (t, s) => {
      }
    ), Q(() => {
    }), (t, s) => {
      const p = l("sf-user-for-user-role-table"), _ = l("sf-user-role-table"), P = l("q-page");
      return L(), B(P, null, {
        default: n(() => [
          u("div", Et, [
            u("div", Tt, [
              u("div", Yt, [
                u("div", Bt, E(t.$t("user")), 1)
              ]),
              u("div", xt, [
                u("div", It, [
                  e(p, {
                    selected: a.value,
                    "onUpdate:selected": s[0] || (s[0] = (k) => a.value = k)
                  }, null, 8, ["selected"])
                ])
              ])
            ]),
            u("div", Mt, [
              u("div", Ft, [
                u("div", jt, E(t.$t("role")), 1)
              ]),
              u("div", Ht, [
                u("div", zt, [
                  e(_, {
                    user: a.value,
                    "onUpdate:user": s[1] || (s[1] = (k) => a.value = k)
                  }, null, 8, ["user"])
                ])
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
}, Ce = {
  __name: "SfAvailablePermissionForRoleTable",
  props: {
    role: { type: Object }
  },
  emits: ["success"],
  setup(o, { emit: a }) {
    const t = o, s = a;
    W();
    const { t: p } = J();
    X(), Z();
    const _ = x(), P = F(), k = c(!1), w = c([]), b = c([
      { name: "index", align: "center", label: "#", field: "index" },
      {
        name: "permission_group",
        align: "left",
        label: p("permission_group"),
        field: "permission_group",
        sortable: !0
      },
      {
        name: "permission_name",
        align: "left",
        label: p("permission_name"),
        field: "permission_name",
        sortable: !0
      },
      {
        name: "flg_system",
        align: "left",
        label: p("flg_system"),
        field: "flg_system"
      }
    ]), g = c([]);
    c({}), c(!1);
    const y = c(t.role), v = c({
      keyword: "",
      active: "ALL",
      role_id: y.value.role_id
    }), r = c({
      sortBy: "permission_group",
      descending: !1,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 0
    });
    async function m(R) {
      var U, T;
      const { page: i, rowsPerPage: d, sortBy: q, descending: h } = R.pagination, f = R.filter;
      k.value = !0;
      const S = d == 0 ? r.value.rowsNumber : d, V = (i - 1) * d, Y = Object.assign({}, {
        limit: S,
        offset: V,
        order_by: q,
        order_by_type: h ? "DESC" : "ASC"
      }, f);
      let A;
      (f == null ? void 0 : f.role_id) != null && (A = await _.call({
        param: Y,
        apiName: "roleAndPermission/getAvailablePermissionListForRole",
        loading: !1,
        showErrorNotification: !0
      }), A.success && (r.value.rowsNumber = A.data.total_rows, w.value.splice(0, w.value.length, ...A.data.datalist))), k.value = !1, r.value.page = i, r.value.rowsPerPage = d, !((U = A == null ? void 0 : A.data) != null && U.total_rows) && ((T = A == null ? void 0 : A.data) == null ? void 0 : T.total_rows) == 0 && (r.value.rowsPerPage = 10), r.value.sortBy = q, r.value.descending = h;
    }
    Q(() => {
      D();
    });
    async function $() {
      let R = [];
      g.value.forEach((q) => {
        R.push(q.permission_id);
      });
      const i = {
        role_id: y.value.role_id,
        permission_id_list: R
      };
      (await _.add({
        param: i,
        apiName: "roleAndPermission/addPermissionToRole"
      })).success && (P.success("Success"), s("success"));
    }
    function D() {
      m({
        pagination: r.value,
        filter: v.value
      });
    }
    return (R, i) => {
      const d = l("q-btn"), q = l("q-icon"), h = l("q-input"), f = l("q-td"), S = l("q-table");
      return L(), B(S, {
        title: R.$t("permission_of_role"),
        bordered: "",
        rows: w.value,
        columns: b.value,
        "row-key": (V) => V.permission_id,
        "wrap-cells": !0,
        pagination: r.value,
        "onUpdate:pagination": i[2] || (i[2] = (V) => r.value = V),
        loading: k.value,
        filter: v.value,
        "virtual-scroll": "",
        separator: "horizontal",
        selection: "multiple",
        selected: g.value,
        "onUpdate:selected": i[3] || (i[3] = (V) => g.value = V),
        onRequest: m
      }, {
        "top-left": n(() => [
          e(d, {
            label: R.$t("add"),
            size: "sm",
            color: "primary",
            onClick: i[0] || (i[0] = (V) => $()),
            disabled: g.value.length == 0
          }, null, 8, ["label", "disabled"])
        ]),
        "top-right": n(() => [
          e(h, {
            dense: "",
            outlined: "",
            debounce: "300",
            modelValue: v.value.keyword,
            "onUpdate:modelValue": i[1] || (i[1] = (V) => v.value.keyword = V),
            placeholder: R.$t("keyword")
          }, {
            append: n(() => [
              e(q, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder"])
        ]),
        "body-cell-index": n((V) => [
          e(f, { props: V }, {
            default: n(() => [
              u("div", null, E(V.rowIndex + 1), 1)
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        _: 1
      }, 8, ["title", "rows", "columns", "row-key", "pagination", "loading", "filter", "selected"]);
    };
  }
}, Oe = {
  __name: "SfAvailableRoleForUserRoleTable",
  props: {
    user: { type: Object }
  },
  emits: ["success"],
  setup(o, { emit: a }) {
    var R;
    const t = o, s = a;
    W();
    const { t: p } = J();
    X(), Z();
    const _ = x(), P = F(), k = c(!1), w = c([]), b = c([
      { name: "index", align: "center", label: "#", field: "index" },
      {
        name: "role_name",
        align: "left",
        label: p("role_name"),
        field: "role_name",
        sortable: !0
      },
      {
        name: "flg_system",
        align: "left",
        label: p("flg_system"),
        field: "flg_system"
      }
    ]), g = c([]), y = c(t.user), v = c({
      keyword: "",
      active: "ALL",
      user_id: (R = y.value) == null ? void 0 : R.user_id
    });
    c({}), c(!1);
    const r = c({
      sortBy: "role_name",
      descending: !1,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    async function m(i) {
      var T, O;
      const { page: d, rowsPerPage: q, sortBy: h, descending: f } = i.pagination, S = i.filter;
      k.value = !0;
      const V = q == 0 ? r.value.rowsNumber : q, N = (d - 1) * q, A = Object.assign({}, {
        limit: V,
        offset: N,
        order_by: h,
        order_by_type: f ? "DESC" : "ASC"
      }, S);
      let U;
      (S == null ? void 0 : S.user_id) != null && (U = await _.call({
        param: A,
        apiName: "roleAndPermission/getAvailableRoleForUserRole",
        loading: !1,
        showErrorNotification: !0
      }), U.success && (r.value.rowsNumber = U.data.total_rows, w.value.splice(0, w.value.length, ...U.data.datalist))), k.value = !1, r.value.page = d, r.value.rowsPerPage = q, !((T = U == null ? void 0 : U.data) != null && T.total_rows) && ((O = U == null ? void 0 : U.data) == null ? void 0 : O.total_rows) == 0 && (r.value.rowsPerPage = 10), r.value.sortBy = h, r.value.descending = f;
    }
    Q(() => {
      D();
    });
    async function $() {
      let i = [];
      g.value.forEach((h) => {
        i.push(h.role_id);
      });
      const d = {
        user_id: y.value.user_id,
        role_id_list: i
      };
      (await _.add({
        param: d,
        apiName: "roleAndPermission/addUserRole"
      })).success && (P.success("Success"), s("success"));
    }
    function D() {
      m({
        pagination: r.value,
        filter: v.value
      });
    }
    return (i, d) => {
      const q = l("q-btn"), h = l("q-icon"), f = l("q-input"), S = l("q-td"), V = l("q-table");
      return L(), B(V, {
        title: i.$t("role"),
        bordered: "",
        rows: w.value,
        columns: b.value,
        "row-key": (N) => N.role_id,
        "wrap-cells": !0,
        pagination: r.value,
        "onUpdate:pagination": d[2] || (d[2] = (N) => r.value = N),
        loading: k.value,
        filter: i.filterKeyword,
        "virtual-scroll": "",
        separator: "horizontal",
        selection: "multiple",
        selected: g.value,
        "onUpdate:selected": d[3] || (d[3] = (N) => g.value = N),
        onRequest: m
      }, {
        "top-left": n(() => [
          e(q, {
            label: i.$t("add"),
            size: "sm",
            color: "primary",
            onClick: d[0] || (d[0] = (N) => $()),
            disabled: g.value.length == 0
          }, null, 8, ["label", "disabled"])
        ]),
        "top-right": n(() => [
          e(f, {
            dense: "",
            outlined: "",
            debounce: "300",
            modelValue: i.filterKeyword,
            "onUpdate:modelValue": d[1] || (d[1] = (N) => i.filterKeyword = N),
            placeholder: i.$t("keyword")
          }, {
            append: n(() => [
              e(h, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder"])
        ]),
        "body-cell-index": n((N) => [
          e(S, { props: N }, {
            default: n(() => [
              u("div", null, E(N.rowIndex + 1), 1)
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        _: 1
      }, 8, ["title", "rows", "columns", "row-key", "pagination", "loading", "filter", "selected"]);
    };
  }
}, Le = {
  __name: "SfPermissionOfRoleTable",
  props: {
    role: { type: Object }
  },
  emits: ["onSuccess"],
  setup(o, { expose: a, emit: t }) {
    var h;
    const s = o, p = W(), { t: _ } = J(), P = c(!1), k = c([]);
    c([]), X(), Z();
    const w = x(), b = F(), g = c([
      { name: "index", align: "center", label: "#", field: "index" },
      {
        name: "permission_group",
        align: "left",
        label: _("permission_group"),
        field: "permission_group"
      },
      {
        name: "permission_name",
        align: "left",
        label: _("permission_name"),
        field: "permission_name"
      },
      {
        name: "action",
        align: "center",
        label: _("action"),
        field: "action",
        sortable: !1
      }
    ]), y = c({
      role_id: (h = s.role) == null ? void 0 : h.role_id,
      keyword: "",
      active: "ALL"
    }), v = c({});
    c(!1);
    const r = c(!1), m = c(s.role);
    c({
      height: p.screen.height * 0.6 + "px",
      width: p.screen.width * 0.6 + "px"
    });
    const $ = c({
      sortBy: "permission_group",
      descending: !1,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    async function D(f) {
      var C, ue;
      const { page: S, rowsPerPage: V, sortBy: N, descending: Y } = f.pagination, A = f.filter;
      P.value = !0;
      const U = V == 0 ? $.value.rowsNumber : V, T = (S - 1) * V, H = Object.assign({}, {
        limit: U,
        offset: T,
        order_by: N,
        order_by_type: Y ? "DESC" : "ASC"
      }, A);
      let j;
      (A == null ? void 0 : A.role_id) != null && (j = await w.call({
        param: H,
        apiName: "roleAndPermission/getPermissionOfRoleList",
        loading: !1,
        showErrorNotification: !0
      }), j.success && ($.value.rowsNumber = j.data.total_rows, k.value.splice(0, k.value.length, ...j.data.datalist))), P.value = !1, $.value.page = S, $.value.rowsPerPage = V, !((C = j == null ? void 0 : j.data) != null && C.total_rows) && ((ue = j == null ? void 0 : j.data) == null ? void 0 : ue.total_rows) == 0 && ($.value.rowsPerPage = 10), $.value.sortBy = N, $.value.descending = Y;
    }
    async function R() {
      (await w.delete({
        param: { id: v.value.id },
        apiName: "roleAndPermission/deletePermissionOfRole"
      })).success && (b.success("Success"), r.value = !1, q());
    }
    function i(f) {
      v.value = f;
      let S = Object.assign({}, f);
      delete S.id, delete S.role_name;
      const V = p.dialog({
        component: "SfYesNoDlg",
        componentProps: {
          msg: _("are_you_sure_delete_this_data"),
          data: S
        }
      }).onOk(() => {
        R(), V.hide();
      });
    }
    function d() {
      const f = p.dialog({
        component: "SfAvailablePermissionForRoleDlg",
        componentProps: {
          role: m
        }
      }).onOk(() => {
        f.hide(), q();
      });
    }
    Q(() => {
      q();
    }), z(
      () => s.role,
      (f, S) => {
        var V;
        m.value = f, y.value.role_id = (V = m.value) == null ? void 0 : V.role_id, q();
      }
    );
    function q() {
      D({
        pagination: $.value,
        filter: y.value
      });
    }
    return a({ refresh: q }), (f, S) => {
      const V = l("q-btn"), N = l("q-icon"), Y = l("q-input"), A = l("q-td"), U = l("q-table");
      return L(), B(U, {
        title: f.$t("permission_of_role"),
        bordered: "",
        rows: k.value,
        columns: g.value,
        "row-key": (T) => T.id,
        "wrap-cells": !0,
        pagination: $.value,
        "onUpdate:pagination": S[2] || (S[2] = (T) => $.value = T),
        loading: P.value,
        filter: y.value,
        "virtual-scroll": "",
        separator: "horizontal",
        onRequest: D
      }, {
        "top-left": n(() => [
          e(V, {
            label: f.$t("add"),
            size: "sm",
            color: "primary",
            onClick: S[0] || (S[0] = (T) => d()),
            disabled: !m.value.role_id
          }, null, 8, ["label", "disabled"])
        ]),
        "top-right": n(() => [
          e(Y, {
            dense: "",
            outlined: "",
            debounce: "300",
            modelValue: y.value.keyword,
            "onUpdate:modelValue": S[1] || (S[1] = (T) => y.value.keyword = T),
            placeholder: f.$t("keyword")
          }, {
            append: n(() => [
              e(N, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder"])
        ]),
        "body-cell-index": n((T) => [
          e(A, { props: T }, {
            default: n(() => [
              u("div", null, E(T.rowIndex + 1), 1)
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        "body-cell-action": n((T) => [
          e(A, { props: T }, {
            default: n(() => [
              e(V, {
                label: f.$t("delete"),
                size: "sm",
                color: "negative",
                onClick: (O) => i(T.row)
              }, null, 8, ["label", "onClick"])
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        _: 1
      }, 8, ["title", "rows", "columns", "row-key", "pagination", "loading", "filter"]);
    };
  }
}, Ee = {
  __name: "SfRoleTable",
  props: {
    selected: { type: Object }
  },
  emits: ["onSuccess", "update:selected"],
  setup(o, { expose: a, emit: t }) {
    const s = t, p = W(), { t: _ } = J();
    X(), Z();
    const P = x(), k = F(), w = c(!1), b = c([]), g = c([
      { name: "index", align: "center", label: "#", field: "index" },
      {
        name: "role_name",
        align: "left",
        label: _("role_name"),
        field: "role_name"
      },
      {
        name: "flg_system",
        align: "left",
        label: _("flg_system"),
        field: "flg_system"
      },
      {
        name: "active",
        align: "left",
        label: _("active"),
        field: "active"
      },
      {
        name: "action",
        align: "center",
        label: "ACTION",
        field: "action",
        sortable: !1
      }
    ]), y = c([]), v = c({ keyword: "", active: "ALL" }), r = c({});
    c(!1);
    const m = c(!1);
    c();
    const $ = c({
      sortBy: "role_name",
      descending: !1,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    async function D(h) {
      var j, C;
      const { page: f, rowsPerPage: S, sortBy: V, descending: N } = h.pagination, Y = h.filter;
      w.value = !0;
      const A = S == 0 ? $.value.rowsNumber : S, U = (f - 1) * S, O = Object.assign({}, {
        limit: A,
        offset: U,
        order_by: V,
        order_by_type: N ? "DESC" : "ASC"
      }, Y), H = await P.call({
        param: O,
        apiName: "roleAndPermission/getRoleList",
        loading: !1,
        showErrorNotification: !0
      });
      H.success && ($.value.rowsNumber = H.data.total_rows, b.value.splice(0, b.value.length, ...H.data.datalist)), w.value = !1, $.value.page = f, $.value.rowsPerPage = S, !((j = H == null ? void 0 : H.data) != null && j.total_rows) && ((C = H == null ? void 0 : H.data) == null ? void 0 : C.total_rows) == 0 && ($.value.rowsPerPage = 10), $.value.sortBy = V, $.value.descending = N;
    }
    async function R() {
      (await P.delete({
        param: { role_id: r.value.role_id },
        apiName: "roleAndPermission/deleteRole"
      })).success && (m.value = !1, k.success("Success"), q());
    }
    function i() {
      p.dialog({
        component: "SfAddRoleDlg",
        componentProps: {
          msg: _("are_you_sure_delete_this_data"),
          data: r.value
        }
      }).onOk(() => q());
    }
    function d(h) {
      r.value = h;
      let f = Object.assign({}, h);
      delete f.role_id;
      const S = p.dialog({
        component: "SfYesNoDlg",
        componentProps: {
          msg: _("are_you_sure_delete_this_data"),
          data: f
        }
      }).onOk(() => {
        R(), S.hide();
      });
    }
    z(
      () => y.value,
      (h, f) => {
        s("update:selected", h[0] == null ? {} : h[0]);
      }
    ), Q(() => {
      q();
    });
    function q() {
      D({
        pagination: $.value,
        filter: v.value
      });
    }
    return a({ refresh: q }), (h, f) => {
      const S = l("q-btn"), V = l("q-icon"), N = l("q-input"), Y = l("q-td"), A = l("q-table");
      return L(), B(A, {
        title: h.$t("role"),
        bordered: "",
        rows: b.value,
        columns: g.value,
        "row-key": (U) => U.role_id,
        "wrap-cells": !0,
        pagination: $.value,
        "onUpdate:pagination": f[2] || (f[2] = (U) => $.value = U),
        loading: w.value,
        filter: v.value,
        "virtual-scroll": "",
        separator: "horizontal",
        selection: "single",
        selected: y.value,
        "onUpdate:selected": f[3] || (f[3] = (U) => y.value = U),
        onRequest: D
      }, {
        "top-left": n(() => [
          e(S, {
            label: h.$t("add"),
            size: "sm",
            color: "primary",
            onClick: f[0] || (f[0] = (U) => i())
          }, null, 8, ["label"])
        ]),
        "top-right": n(() => [
          e(N, {
            dense: "",
            outlined: "",
            debounce: "300",
            modelValue: v.value.keyword,
            "onUpdate:modelValue": f[1] || (f[1] = (U) => v.value.keyword = U),
            placeholder: h.$t("keyword")
          }, {
            append: n(() => [
              e(V, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder"])
        ]),
        "body-cell-index": n((U) => [
          e(Y, { props: U }, {
            default: n(() => [
              u("div", null, E(U.rowIndex + 1), 1)
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        "body-cell-action": n((U) => [
          e(Y, { props: U }, {
            default: n(() => [
              e(S, {
                label: h.$t("delete"),
                size: "sm",
                color: "negative",
                onClick: (T) => d(U.row)
              }, null, 8, ["label", "onClick"])
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        _: 1
      }, 8, ["title", "rows", "columns", "row-key", "pagination", "loading", "filter", "selected"]);
    };
  }
}, Te = {
  __name: "SfUserRoleTable",
  props: {
    user: { type: Object }
  },
  emits: ["onSuccess", "update:selected"],
  setup(o, { emit: a }) {
    var d;
    const t = o, s = W(), { t: p } = J(), _ = c(!1), P = c([]);
    X(), Z();
    const k = x(), w = F(), b = c([
      { name: "index", align: "center", label: "#", field: "index" },
      {
        name: "role_name",
        align: "left",
        label: p("role_name"),
        field: "role_name"
      },
      {
        name: "action",
        align: "center",
        label: p("action"),
        field: "action",
        sortable: !1
      }
    ]), g = c(t.user);
    c([]);
    const y = c({
      keyword: "",
      active: "ALL",
      user_id: (d = g.value) == null ? void 0 : d.user_id
    }), v = c({});
    c(!1), c(!1), c({
      height: s.screen.height * 0.6 + "px",
      width: s.screen.width * 0.6 + "px"
    });
    const r = c({
      sortBy: "role_name",
      descending: !1,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    async function m(q) {
      var H, j;
      const { page: h, rowsPerPage: f, sortBy: S, descending: V } = q.pagination, N = q.filter;
      _.value = !0;
      const Y = f == 0 ? r.value.rowsNumber : f, A = (h - 1) * f, T = Object.assign({}, {
        limit: Y,
        offset: A,
        order_by: S,
        order_by_type: V ? "DESC" : "ASC"
      }, N);
      let O;
      (N == null ? void 0 : N.user_id) != null && (O = await k.call({
        param: T,
        apiName: "roleAndPermission/getUserRoleList",
        loading: !1,
        showErrorNotification: !0
      }), O.success && (r.value.rowsNumber = O.data.total_rows, P.value.splice(0, P.value.length, ...O.data.datalist))), _.value = !1, r.value.page = h, r.value.rowsPerPage = f, !((H = O == null ? void 0 : O.data) != null && H.total_rows) && ((j = O == null ? void 0 : O.data) == null ? void 0 : j.total_rows) == 0 && (r.value.rowsPerPage = 10), r.value.sortBy = S, r.value.descending = V;
    }
    async function $() {
      const q = await k.delete({
        param: { user_role_id: v.value.user_role_id },
        apiName: "roleAndPermission/deleteUserRole"
      });
      return q.success && (w.success("Success"), i()), q == null ? void 0 : q.success;
    }
    function D(q) {
      v.value = q;
      let h = { role_name: q.role_name };
      const f = s.dialog({
        component: "SfYesNoDlg",
        componentProps: {
          msg: p("are_you_sure_delete_this_data"),
          data: h
        }
      }).onOk(async () => {
        await $() && f.hide();
      });
    }
    function R() {
      const q = s.dialog({
        component: "SfAvailableRoleForUserRoleDlg",
        componentProps: {
          user: g
        }
      }).onOk(async () => {
        q.hide(), i();
      });
    }
    Q(() => {
      i();
    }), z(
      () => t.user,
      (q, h) => {
        g.value = q, y.value.user_id = q == null ? void 0 : q.user_id, i();
      }
    );
    function i() {
      m({
        pagination: r.value,
        filter: y.value
      });
    }
    return (q, h) => {
      const f = l("q-btn"), S = l("q-icon"), V = l("q-input"), N = l("q-td"), Y = l("q-table");
      return L(), B(Y, {
        title: q.$t("user_role"),
        bordered: "",
        rows: P.value,
        columns: b.value,
        "row-key": (A) => A.id,
        "wrap-cells": !0,
        pagination: r.value,
        "onUpdate:pagination": h[2] || (h[2] = (A) => r.value = A),
        loading: _.value,
        filter: y.value,
        "virtual-scroll": "",
        separator: "horizontal",
        onRequest: m
      }, {
        "top-left": n(() => {
          var A;
          return [
            e(f, {
              label: q.$t("add"),
              size: "sm",
              color: "primary",
              onClick: h[0] || (h[0] = (U) => R()),
              disabled: !((A = g.value) != null && A.user_id)
            }, null, 8, ["label", "disabled"])
          ];
        }),
        "top-right": n(() => [
          e(V, {
            dense: "",
            outlined: "",
            debounce: "300",
            modelValue: y.value.keyword,
            "onUpdate:modelValue": h[1] || (h[1] = (A) => y.value.keyword = A),
            placeholder: q.$t("keyword")
          }, {
            append: n(() => [
              e(S, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder"])
        ]),
        "body-cell-index": n((A) => [
          e(N, { props: A }, {
            default: n(() => [
              u("div", null, E(A.rowIndex + 1), 1)
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        "body-cell-action": n((A) => [
          e(N, { props: A }, {
            default: n(() => [
              e(f, {
                label: q.$t("delete"),
                size: "sm",
                color: "negative",
                onClick: (U) => D(A.row)
              }, null, 8, ["label", "onClick"])
            ]),
            _: 2
          }, 1032, ["props"])
        ]),
        _: 1
      }, 8, ["title", "rows", "columns", "row-key", "pagination", "loading", "filter"]);
    };
  }
}, Kt = { class: "text-h6" }, Gt = { class: "row" }, Qt = { class: "col text-subtitle1" }, Jt = {
  key: 0,
  class: "row q-pa-sm"
}, Wt = { class: "col" }, Ye = {
  __name: "SfYesNoDlg",
  props: {
    msg: {
      type: String,
      required: !0
    },
    data: {
      type: Object || Array || String,
      required: !1
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...oe.emits
  ],
  setup(o, { emit: a }) {
    const t = o, s = a, { dialogRef: p, onDialogHide: _, onDialogOK: P, onDialogCancel: k } = oe(), { t: w } = J(), b = c([]), g = c([]), y = c(t.msg);
    if (typeof t.data == "object" && t.data !== null) {
      b.value = [], g.value = [];
      for (var v of Object.keys(t.data))
        b.value.push({
          name: v,
          align: "left",
          label: w(v),
          field: v
        });
      b.value.reverse(), g.value.push(t.data), g.value.reverse();
    }
    if (Array.isArray(t.data) && t.data.length > 0) {
      b.value = [], g.value = [];
      for (var v of Object.keys(t.data[0]))
        b.value.push({
          name: v,
          align: "left",
          label: w(v),
          field: v
        });
      t.data.forEach(function(m, $) {
        g.value.push(m);
      });
    }
    (typeof t.data == "string" || t.data instanceof String) && (b.value = [], g.value = [], b.value.push({
      name: "data",
      align: "left",
      label: w("data"),
      field: "data"
    }), g.value.push({ data: t.data }), b.value.reverse(), g.value.reverse());
    function r() {
      s("ok");
    }
    return (m, $) => {
      const D = l("q-space"), R = l("q-btn"), i = l("q-card-section"), d = l("q-separator"), q = l("q-td"), h = l("q-tr"), f = l("q-table"), S = l("q-card-actions"), V = l("q-card"), N = l("q-dialog"), Y = te("close-popup");
      return L(), B(N, {
        ref_key: "dialogRef",
        ref: p,
        onHide: I(_)
      }, {
        default: n(() => [
          e(V, null, {
            default: n(() => [
              e(i, { class: "row items-center q-pb-none" }, {
                default: n(() => [
                  u("div", Kt, E(m.$t("confirmation")), 1),
                  e(D),
                  M(e(R, {
                    icon: "close",
                    flat: "",
                    round: "",
                    dense: ""
                  }, null, 512), [
                    [Y]
                  ])
                ]),
                _: 1
              }),
              e(d),
              e(i, { class: "q-pt-xm" }, {
                default: n(() => [
                  u("div", Gt, [
                    u("div", Qt, E(y.value), 1)
                  ]),
                  b.value.length > 0 ? (L(), re("div", Jt, [
                    u("div", Wt, [
                      e(f, {
                        rows: g.value,
                        columns: b.value,
                        dense: "",
                        "hide-pagination": "",
                        "wrap-cells": "",
                        flat: "",
                        bordered: ""
                      }, {
                        body: n((A) => [
                          e(h, {
                            props: A,
                            "no-hover": ""
                          }, {
                            default: n(() => [
                              (L(!0), re(Ie, null, Me(A.cols, (U) => (L(), B(q, {
                                props: A,
                                key: U.field
                              }, {
                                default: n(() => [
                                  le(E(A.row[U.field]), 1)
                                ]),
                                _: 2
                              }, 1032, ["props"]))), 128))
                            ]),
                            _: 2
                          }, 1032, ["props"])
                        ]),
                        _: 1
                      }, 8, ["rows", "columns"])
                    ])
                  ])) : se("", !0)
                ]),
                _: 1
              }),
              e(S, null, {
                default: n(() => [
                  M(e(R, {
                    label: m.$t("no"),
                    color: "warning"
                  }, null, 8, ["label"]), [
                    [Y]
                  ]),
                  e(R, {
                    label: m.$t("yes"),
                    color: "primary",
                    onClick: r
                  }, null, 8, ["label"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
}, Xt = "1";
function Zt(o) {
  o.component("SfDatePicker", ge), o.component("SfDateTimePicker", ve), o.component("SfMonthPicker", we), o.component("SfTimePicker", be), o.component("SfAddUserDlg", ye), o.component("SfEditUserDlg", qe), o.component("SfEditUserForAdminDlg", he), o.component("SfUserPage", Pe), o.component("SfUserTable", Se), o.component("SfUserForUserRoleTable", $e), o.component("SfAvailableRoleListCombo", ke), o.component("SfAddRoleDlg", Re), o.component(
    "SfAvailablePermissionForRoleDlg",
    De
  ), o.component("SfAvailableRoleForUserRoleDlg", Ve), o.component("SfChangeRoleDlg", Ue), o.component("SfRolePage", Ae), o.component("SfUserVsRolePage", Ne), o.component(
    "SfAvailablePermissionForRoleTable",
    Ce
  ), o.component(
    "SfAvailableRoleForUserRoleTable",
    Oe
  ), o.component("SfPermissionOfRoleTable", Le), o.component("SfRoleTable", Ee), o.component("SfUserRoleTable", Te), o.component("SfYesNoDlg", Ye);
}
const sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SfAddRoleDlg: Re,
  SfAddUserDlg: ye,
  SfAvailablePermissionForRoleDlg: De,
  SfAvailablePermissionForRoleTable: Ce,
  SfAvailableRoleForUserRoleDlg: Ve,
  SfAvailableRoleForUserRoleTable: Oe,
  SfAvailableRoleListCombo: ke,
  SfChangeRoleDlg: Ue,
  SfDatePicker: ge,
  SfDateTimePicker: ve,
  SfEditUserDlg: qe,
  SfEditUserForAdminDlg: he,
  SfMonthPicker: we,
  SfPermissionOfRoleTable: Le,
  SfRolePage: Ae,
  SfRoleTable: Ee,
  SfTimePicker: be,
  SfUserForUserRoleTable: $e,
  SfUserPage: Pe,
  SfUserRoleTable: Te,
  SfUserTable: Se,
  SfUserVsRolePage: Ne,
  SfYesNoDlg: Ye,
  authStore: Je,
  dateNow: Ke,
  datetimeNow: ze,
  displayDate: _e,
  displayDatetime: fe,
  displayIDR: Xe,
  enUS: eo,
  firstDayOfThisMonth: Ge,
  formatDatetime: je,
  idID: oo,
  install: Zt,
  lastDayOfThisMonth: Qe,
  notificationStore: F,
  permit: Ze,
  roleAndPermissionStore: We,
  sfapiStore: x,
  strToDate: He,
  userDataStore: ae,
  version: Xt
}, Symbol.toStringTag, { value: "Module" }));
export {
  Re as SfAddRoleDlg,
  ye as SfAddUserDlg,
  De as SfAvailablePermissionForRoleDlg,
  Ce as SfAvailablePermissionForRoleTable,
  Ve as SfAvailableRoleForUserRoleDlg,
  Oe as SfAvailableRoleForUserRoleTable,
  ke as SfAvailableRoleListCombo,
  Ue as SfChangeRoleDlg,
  ge as SfDatePicker,
  ve as SfDateTimePicker,
  qe as SfEditUserDlg,
  he as SfEditUserForAdminDlg,
  we as SfMonthPicker,
  Le as SfPermissionOfRoleTable,
  Ae as SfRolePage,
  Ee as SfRoleTable,
  be as SfTimePicker,
  $e as SfUserForUserRoleTable,
  Pe as SfUserPage,
  Te as SfUserRoleTable,
  Se as SfUserTable,
  Ne as SfUserVsRolePage,
  Ye as SfYesNoDlg,
  Je as authStore,
  Ke as dateNow,
  ze as datetimeNow,
  sa as default,
  _e as displayDate,
  fe as displayDatetime,
  Xe as displayIDR,
  eo as enUS,
  Ge as firstDayOfThisMonth,
  je as formatDatetime,
  oo as idID,
  Zt as install,
  Qe as lastDayOfThisMonth,
  F as notificationStore,
  Ze as permit,
  We as roleAndPermissionStore,
  x as sfapiStore,
  He as strToDate,
  ae as userDataStore,
  Xt as version
};
