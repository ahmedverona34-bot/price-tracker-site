#!/usr/bin/env node
/* Stage the installer into public/downloads/.
 *
 * The site's download button points at /downloads/latest.exe, a fixed name, so
 * publishing a new build is a file copy and nothing else — no URL to change, no
 * cached 404 in someone's browser.
 *
 * Usage:
 *   node scripts/stage-installer.js                     # newest in dist-installer
 *   node scripts/stage-installer.js path\to\setup.exe    # a specific file
 *
 * The version is read from the filename (PriceTracker-Setup-1.2.11.exe) and is
 * only used for the console output; the staged copy is always latest.exe.
 */

import { readdir, copyFile, stat, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = process.env.PRICE_TRACKER_REPO ?? "C:/price-tracker";
const SRC_DIR = join(REPO, "dist-installer");
const OUT_DIR = join(root, "public", "downloads");

const VERSION_RE = /PriceTracker-Setup-(\d+(?:\.\d+)*)\.exe$/i;

async function newestSetup() {
  const names = await readdir(SRC_DIR);
  const setups = names
    .map((n) => ({ name: n, m: n.match(VERSION_RE) }))
    .filter((x) => x.m);
  if (!setups.length) {
    throw new Error(
      `No PriceTracker-Setup-<ver>.exe in ${SRC_DIR}\n` +
      `Build one first:  cd ${REPO} && build_setup.bat`
    );
  }
  // Version sort, not mtime: 1.2.11 is newer than 1.2.8 even though the file
  // times may be in any order after a rebuild.
  setups.sort((a, b) => {
    const pa = a.m[1].split(".").map(Number);
    const pb = b.m[1].split(".").map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const d = (pa[i] ?? 0) - (pb[i] ?? 0);
      if (d) return d;
    }
    return 0;
  });
  return setups[setups.length - 1];
}

async function main() {
  const arg = process.argv[2];
  let srcPath;
  let version;

  if (arg) {
    srcPath = arg;
    if (!existsSync(srcPath)) throw new Error(`not found: ${srcPath}`);
    version = basename(srcPath).match(VERSION_RE)?.[1] ?? "unknown";
  } else {
    const pick = await newestSetup();
    srcPath = join(SRC_DIR, pick.name);
    version = pick.m[1];
  }

  // The app's own version is the authority; if the staged file says otherwise
  // the button would announce a version the payload does not report.
  const appSource = join(REPO, "price_tracker.py");
  let appVersion = null;
  if (existsSync(appSource)) {
    const src = await readFile(appSource, "utf8");
    appVersion = src.match(/^APP_VERSION\s*=\s*"([^"]+)"/m)?.[1] ?? null;
  }
  if (appVersion && appVersion !== version && !arg) {
    console.warn(
      `\n  WARNING: newest setup is ${version} but price_tracker.py says ` +
        `${appVersion}.\n  Run build_exe.bat and build_setup.bat before staging, ` +
        `or the site would offer a build that self-reports a different number.\n`
    );
  }

  await mkdir(OUT_DIR, { recursive: true });

  // The installer is served under its real versioned name, not as latest.exe.
  //
  // A stable latest.exe sounds tidier, but it makes the browser offer exactly
  // that name in the save dialog. The `download` attribute that would rename it
  // is applied once the response starts, and a Content-Disposition sent by the
  // host outranks the attribute entirely — so the rename either loses the race
  // or never happens, and the user is left with "latest.exe" on disk.
  // Serving the versioned name makes the URL itself the filename: nothing to
  // rename, no attribute to race, and the save dialog is right the first time.
  const staged = join(OUT_DIR, `PriceTracker-Setup-${version}.exe`);
  await copyFile(srcPath, staged);

  // Drop setups left by earlier stages. The directory should hold exactly the
  // build being published: a stale copy is dead weight in the deployed bundle
  // and makes it ambiguous which file the page is offering.
  for (const name of await readdir(OUT_DIR)) {
    const full = join(OUT_DIR, name);
    if (name.startsWith("PriceTracker-Setup-") && full !== staged) {
      await rm(full);
      console.log(`removed superseded ${name}`);
    }
  }

  const { size } = await stat(staged);
  const mb = (size / 1024 / 1024).toFixed(2);

  // What the page reads to render the button, so the name, version and size on
  // screen all describe the file that is actually being served.
  await writeFile(
    join(OUT_DIR, "info.json"),
    JSON.stringify({ version, size, mb, file: basename(staged), href: `/downloads/${basename(staged)}` }, null, 2)
  );

  console.log(`staged ${basename(srcPath)} -> public/downloads/${basename(staged)} (${mb} MB)`);
  console.log(`version ${version}${appVersion ? ` (app reports ${appVersion})` : ""}`);

  // The installer has to be committed: deployment builds from a git clone, so
  // an ignored installer means a deployed site with a button and no file.
  // Remind at stage time rather than discovering it as a 404 in production.
  try {
    const { execFileSync } = await import("node:child_process");
    const ignored = execFileSync("git", ["check-ignore", staged], {
      cwd: root,
      encoding: "utf8",
    });
    if (ignored.trim()) {
      console.warn(
        `\n  WARNING: ${basename(staged)} is git-ignored (${ignored.trim()}).\n` +
          `  A deployed build clones the repo, so the download would 404.\n` +
          `  Remove that rule from .gitignore and commit the file.\n`
      );
    }
  } catch {
    // Not a git repo, or git is unavailable: nothing to check.
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
