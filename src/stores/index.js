import { store } from "quasar/wrappers";
import { createPinia } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  pinia.use(async ({ store }) => {
    store.api = api;
    store.Notify = Notify;
  });
  return pinia;
});
