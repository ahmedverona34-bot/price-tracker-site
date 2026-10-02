"use client";

/* The download button.
 *
 * It links straight to the versioned installer. Two things were learned the hard
 * way here:
 *
 * 1. The filename comes from the URL, not from a `download` attribute. An
 *    attribute only renames the file after the response has started, and a
 *    Content-Disposition from the host outranks it anyway, so the save dialog
 *    showed "latest.exe" even though the markup asked for the versioned name.
 *    Staging the file as PriceTracker-Setup-<ver>.exe removes the rename
 *    entirely: the path already is the filename, so the dialog is right the
 *    first time and there is no second request to wait for.
 *
 * 2. Everything it needs arrives as props. Reading the metadata here would mean
 *    the button rendering before the data, which is the race that let a click
 *    download a placeholder.
 */

export default function DownloadButton({ href, version, mb, label, meta = true, className = "btn btn-primary" }) {
  return (
    <span className="dl">
      <a className={className} href={href}>
        {label}
      </a>
      {meta ? (
        <span className="dl-meta num">
          {version} · {mb} MB
        </span>
      ) : null}
    </span>
  );
}
