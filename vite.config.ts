import adapter from '@sveltejs/adapter-static';
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter({
        // default options are shown. On some platforms

        // these options are set automatically — see below
        pages: 'build',
        assets: 'build',
        fallback: "200.html",
        precompress: false,
        strict: true,

      }),
      paths: {
        base: "/~derycke/platon-viewer",
      },
    })
  ],
});
