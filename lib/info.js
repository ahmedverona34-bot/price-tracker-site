/* Build-time installer metadata.
 *
 * Read from public/downloads/info.json during the build, not fetched from the
 * browser at runtime. The download button used to read it after mount, which
 * left the first render pointing at a placeholder URL — a click in that window
 * downloaded the wrong file, and the filename in the save dialog was whatever
 * the URL happened to say.
 *
 * This runs on the server only (it touches node:fs). The page reads it here and
 * passes the result to the client button as a prop; the browser bundle never
 * sees the filesystem import.
 *
 * The fallback is a deliberate dead end: if info.json is missing, the build
 * stops rather than advertising a version that may not be the file on disk.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const INFO = join(process.cwd(), "public", "downloads", "info.json");

function load() {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(INFO, "utf8"));
  } catch (e) {
    throw new Error(
      `Could not read public/downloads/info.json: ${e.message}\n` +
        `Run "npm run stage" before "npm run build" so the site knows which\n` +
        `installer it is offering.`
    );
  }
  for (const key of ["version", "file", "href"]) {
    if (!parsed[key]) {
      throw new Error(
        `public/downloads/info.json is missing "${key}". Re-run "npm run stage".`
      );
    }
  }
  return {
    version: parsed.version,
    file: parsed.file,
    href: parsed.href,
    mb: parsed.mb ?? "12.59",
  };
}

export const info = load();
