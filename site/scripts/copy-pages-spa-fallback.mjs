import { copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const distDirectory = resolve(scriptDirectory, "../dist");

copyFileSync(resolve(distDirectory, "index.html"), resolve(distDirectory, "404.html"));
