import {
  displayDate,
  dateNow,
  datetimeNow,
  displayDatetime,
  firstDayOfThisMonth,
  formatDatetime,
  lastDayOfThisMonth,
  strToDate,
} from "./utils/dateutil.js";


import { authStore } from "./stores/auth.js";
import { notificationStore } from "./stores/notification.js";
import { roleAndPermissionStore } from "./stores/roleAndPermission.js";
import { sfapiStore } from "./stores/sfapi.js";
import { userDataStore } from "./stores/userData.js";
import { displayIDR } from "./utils/format-idr.js";
import { permit } from "./utils/is-permit.js";
import enUS from "./i18n/en-US/index.js";
import idID from "./i18n/id-ID/index.js";
//import { version as ver } from "../package.json";
import SfDatePicker from "./components/datetime/SfDatePicker.vue";
import SfDateTimePicker from "./components/datetime/SfDateTimePicker.vue";
import SfMonthPicker from "./components/datetime/SfMonthPicker.vue";
import SfTimePicker from "./components/datetime/SfTimePicker.vue";

import SfAddUserDlg from "./components/user/dialog/SfAddUserDlg.vue";
import SfEditUserDlg from "./components/user/dialog/SfEditUserDlg.vue";
import SfEditUserForAdminDlg from "./components/user/dialog/SfEditUserForAdminDlg.vue";

import SfUserPage from "./components/user/page/SfUserPage.vue";
import SfUserTable from "./components/user/table/SfUserTable.vue";
import SfUserForUserRoleTable from "./components/user/table/SfUserForUserRoleTable.vue";

import SfAvailableRoleListCombo from "./components/role-permission/combo/SfAvailableRoleListCombo.vue";
import SfAddRoleDlg from "./components/role-permission/dialog/SfAddRoleDlg.vue";
import SfAvailablePermissionForRoleDlg from "./components/role-permission/dialog/SfAvailablePermissionForRoleDlg.vue";
import SfAvailableRoleForUserRoleDlg from "./components/role-permission/dialog/SfAvailableRoleForUserRoleDlg.vue";
import SfChangeRoleDlg from "./components/role-permission/dialog/SfChangeRoleDlg.vue";


import SfRolePage from "./components/role-permission/page/SfRolePage.vue";
import SfUserVsRolePage from "./components/role-permission/page/SfUserVsRolePage.vue";

import SfAvailablePermissionForRoleTable from "./components/role-permission/table/SfAvailablePermissionForRoleTable.vue";
import SfAvailableRoleForUserRoleTable from "./components/role-permission/table/SfAvailableRoleForUserRoleTable.vue";
import SfPermissionOfRoleTable from "./components/role-permission/table/SfPermissionOfRoleTable.vue";
import SfRoleTable from "./components/role-permission/table/SfRoleTable.vue";
import SfUserRoleTable from "./components/role-permission/table/SfUserRoleTable.vue";

import SfYesNoDlg from "./components/SfYesNoDlg.vue";
import '@vue/runtime-core'

export {
  displayDate,
  dateNow,
  datetimeNow,
  displayDatetime,
  firstDayOfThisMonth,
  formatDatetime,
  lastDayOfThisMonth,
  strToDate,
  displayIDR,
  permit,
  authStore,
  notificationStore,
  roleAndPermissionStore,
  sfapiStore,
  userDataStore,
  enUS,
  idID
};

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SfDatePicker: typeof SfDatePicker;
    SfDateTimePicker: typeof SfDateTimePicker;
    SfMonthPicker: typeof SfMonthPicker;
    SfTimePicker: typeof SfTimePicker;
    SfAddUserDlg: typeof SfAddUserDlg;
    SfEditUserDlg: typeof SfEditUserDlg;
    SfEditUserForAdminDlg: typeof SfEditUserForAdminDlg;
    SfUserPage: typeof SfUserPage;
    SfUserTable: typeof SfUserTable;
    SfUserForUserRoleTable: typeof SfUserForUserRoleTable;

    SfAvailableRoleListCombo: typeof SfAvailableRoleListCombo;
    SfAddRoleDlg: typeof SfAddRoleDlg;
    SfAvailablePermissionForRoleDlg: typeof SfAvailablePermissionForRoleDlg;
    SfAvailableRoleForUserRoleDlg: typeof SfAvailableRoleForUserRoleDlg;
    SfChangeRoleDlg: typeof SfChangeRoleDlg;
    SfRolePage: typeof SfRolePage;
    SfUserVsRolePage: typeof SfUserVsRolePage;
    SfAvailablePermissionForRoleTable: typeof SfAvailablePermissionForRoleTable;
    SfAvailableRoleForUserRoleTable: typeof SfAvailableRoleForUserRoleTable;
    SfPermissionOfRoleTable: typeof SfPermissionOfRoleTable;
    SfRoleTable: typeof SfRoleTable;
    SfUserRoleTable: typeof SfUserRoleTable;
    SfYesNoDlg: typeof SfYesNoDlg;
  }
}
declare module "quasar-ui-sfwu";

