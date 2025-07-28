import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import { install } from "src/vue-plugin";

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(install);
});
