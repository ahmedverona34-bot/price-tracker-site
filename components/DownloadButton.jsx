"use client";

/* The download button.
 *
 * It points at a file on this site, so it has to do three things GitHub's
 * release page used to do for it:
 *
 *   1. Give the browser a versioned filename. /downloads/latest.exe is a stable
 *      URL on the server; `download` renames it on save, so the file on disk is
 *      PriceTracker-Setup-1.2.11.exe and not "latest".
 *   2. Say how big the download is before the user commits to it. The size is
 *      read from info.json, which scripts/stage-installer.mjs writes from the
 *      staged file itself, so it cannot drift from what is actually served.
 *   3. Not navigate away. The page stays put, which is what someone comparing
 *      the version against the table below actually wants.
 *
 * The metadata is fetched after mount, so the server-rendered button carries
 * the size as a fallback and the link works with JavaScript off.
 */

import { useEffect, useState } from "react";

export default function DownloadButton({
  href,
  label,
  sizeLabel,
  showMeta = false,
  className = "btn btn-primary",
}) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch("/downloads/info.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && d.version) setInfo(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // The version comes from the file, so the name in the download and the build
  // the page describes are the same one.
  const fileName = info?.file ?? "PriceTracker-Setup.exe";
  const shown = sizeLabel ?? (info?.mb ? `${info.mb} MB` : null);

  return (
    <span className="dl">
      <a className={className} href={href} download={fileName}>
        {label}
      </a>
      {showMeta && shown ? (
        <span className="dl-meta num">
          {info?.version ? `${info.version} · ` : ""}
          {shown}
        </span>
      ) : null}
    </span>
  );
}
