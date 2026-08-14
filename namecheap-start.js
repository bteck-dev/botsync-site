// Namecheap cPanel startup file. GitHub Actions points `current` at a verified
// release; the local build remains a fallback for the first manual deployment.
import { existsSync } from "node:fs";
import { URL } from "node:url";

const deployedEntry = new URL("./current/.output/server/index.mjs", import.meta.url);
const localEntry = new URL("./.output/server/index.mjs", import.meta.url);

await import(existsSync(deployedEntry) ? deployedEntry.href : localEntry.href);
