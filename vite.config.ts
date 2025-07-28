import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {

    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.esm.js"),
      name: "sfwu",
      // the proper extensions will be added

      fileName: "sfwu-frontend",
      formats: ["es", "cjs"],
    },
    outDir: "dist",
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "quasar", "pinia", "vue-router", "vue-i18n"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        minifyInternalExports: false,
        exports: "named",
        name: "Bundle",
        globals: {
          vue: "Vue",
          quasar: "Quasar",
          pinia: "Pinia",
          "vue-router": "vue-router",
          "vue-i18n": "vue-i18n",
        },
      },
    },
  },
});
