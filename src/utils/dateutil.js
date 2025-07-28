import { date } from "quasar";

export const displayDate = function displayDate(datestr, format) {
  if (datestr != null && datestr.length >= 10) {
    const timeStamp = new Date(datestr);
    return date.formatDate(timeStamp, "DD-MM-YYYY");
  } else {
    return "";
  }
};
export const displayMonth = function displayDate(datestr, format) {
  if (datestr != null && datestr.length >= 7) {
    const timeStamp = new Date(datestr);
    return date.formatDate(timeStamp, "MM-YYYY");
  } else {
    return "";
  }
};

export const displayDatetime = function displayDatetime(datetimestr, format) {
  if (datetimestr != null && datetimestr.length >= 10) {
    const timeStamp = new Date(datetimestr);
    const formattedString = date.formatDate(timeStamp, "DD-MM-YYYY HH:mm:ss");
    return formattedString;
  } else {
    return "";
  }
};

export const formatDatetime = function formatDatetime(datetimestr, format) {
  if (datetimestr != null && datetimestr.length >= 10) {
    const timeStamp = new Date(datetimestr);
    const formattedString = date.formatDate(timeStamp, format);
    return formattedString;
  } else {
    return "";
  }
};

export const strToDate = function strToDate(datestring) {
  const dateArr = datestring.split("-");
  return dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
};

export const datetimeNow = function datetimeNow() {
  const timeStamp = new Date();
  const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");
  return formattedString;
};

export const dateNow = function dateNow() {
  const timeStamp = new Date();
  const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD");
  return formattedString;
};
export const firstDayOfThisMonth = function firstDayOfThisMonth() {
  const dateNow = new Date();
  const firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
  const formattedString = date.formatDate(firstDay, "YYYY-MM-DD");
  return formattedString;
};

export const lastDayOfThisMonth = function lastDayOfThisMonth() {
  const dateNow = new Date();
  const firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0);
  const formattedString = date.formatDate(firstDay, "YYYY-MM-DD");
  return formattedString;
};
