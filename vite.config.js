import { resolve } from "path";
import { defineConfig } from "vite-plus";

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        docs: resolve(__dirname, "docs.html"),
      },
    },
  },
});
