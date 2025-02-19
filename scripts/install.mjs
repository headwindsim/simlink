import fs from "node:fs";

fs.cpSync("./vendor/msfs-nodejs", "./node_modules/@flybywiresim/msfs-nodejs", {recursive: true});