import * as esbuild from "esbuild";

let result = await esbuild.build({
  entryPoints: ["src/index.mjs"],
  bundle: true,
  outfile: "bin/index.js",
  platform: "node",
  external: ["@flybywiresim/msfs-nodejs", "systray2", "node-hide-console-window"],
});
