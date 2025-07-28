import { LocalStorage, Cookies } from "quasar";
export const permit = function isPermit(permissionList) {
  const userPermissionList = LocalStorage.getItem("permissions");
  if (Array.isArray(permissionList) && Array.isArray(userPermissionList)) {
    let isPermited = permissionList.some((value, index, array) => {
      return userPermissionList.includes(value);
    });
    isPermited =
      isPermited ||
      permissionList.includes("ALL") ||
      permissionList.length == 0;
    return Cookies.get("role") == "SUPERADMIN" || isPermited;
  } else {
    return false;
  }
};
