"use client";

/* Single page, both languages, rendered from lib/content.js.
 *
 * Section order is the argument: what it is, how you use it, what it does,
 * what the build actually weighs, then the download. One page means one file to
 * read and nothing to keep in sync.
 */

import { useCallback, useEffect, useState } from "react";
import LangToggle from "../components/LangToggle";
import DownloadButton from "../components/DownloadButton";
import { copy } from "../lib/content";

const REPO = "https://github.com/ahmedverona34-bot/price-tracker";

/* The installer is served from this site, not from GitHub.
 *
 * /downloads/latest.exe is a fixed name written by scripts/stage-installer.mjs,
 * so publishing a new build never changes this URL and never leaves a dead link
 * in someone's browser. The `download` attribute makes the browser save it
 * under the real versioned name, and keeps the visitor on this page instead of
 * navigating away to a release list they then have to read. */
const DOWNLOAD = "/downloads/latest.exe";

const KEY = "pt-lang";

export default function Page() {
  // Arabic renders on the server (the primary audience). A visitor who chose
  // English last time is switched over after mount rather than being handed a
  // blank frame, so there is no flash and no hydration mismatch.
  const [lang, setLang] = useState("ar");

  const choose = useCallback((next) => {
    const c = copy[next];
    document.documentElement.lang = c.locale;
    document.documentElement.dir = c.dir;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    setLang(next);
  }, []);

  // Restoring a saved language has to go through choose(), not setLang():
  // the copy is only half of a language switch. Without this the English text
  // would render inside an RTL document, which mirrors the punctuation and
  // puts the nav on the wrong side.
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (saved === "en") choose("en");
  }, [choose]);

  const t = copy[lang];

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <a className="brand" href="#top">
            <img src="/icons/app-128.png" alt="" width="22" height="22" />
            <span>{t.brand}</span>
          </a>
          <nav className="site-nav">
            <a href="#how">{t.nav.how}</a>
            <a href="#features">{t.nav.features}</a>
            <a href="#specs">{t.nav.specs}</a>
            <LangToggle lang={lang} onChange={choose} />
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero: the promise, then the download. No metric tiles. */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <h1>{t.hero.title}</h1>
              <p>{t.hero.lead}</p>
              <div className="hero-actions">
                <DownloadButton href={DOWNLOAD} label={t.hero.cta} showMeta />
                <a className="btn btn-quiet" href="#specs">
                  {t.hero.secondary}
                </a>
              </div>
              <p className="hero-note" style={{ marginTop: "var(--s-md)" }}>
                {t.hero.note}
              </p>
            </div>
            <div className="mark-panel">
              <img src="/icons/mark-256.png" alt="" width="96" height="96" />
              <strong>{t.markTitle}</strong>
              <p>{t.markBody}</p>
            </div>
          </div>
        </section>

        {/* Ordered steps — numbering here is earned by the sequence. */}
        <section className="section" id="how">
          <div className="wrap">
            <div className="section-head">
              <h2>{t.howTitle}</h2>
              <p>{t.howLead}</p>
            </div>
            <div className="steps">
              {t.steps.map((s) => (
                <div className="step" key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features as a definition list, not five identical icon cards. */}
        <section className="section" id="features">
          <div className="wrap">
            <div className="section-head">
              <h2>{t.featuresTitle}</h2>
              <p>{t.featuresLead}</p>
            </div>
            <dl className="features">
              {t.features.map((f) => (
                <div className="feature" key={f.title}>
                  <dt>{f.title}</dt>
                  <dd>{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Honest build numbers, read from the repo's build files. */}
        <section className="section" id="specs">
          <div className="wrap">
            <div className="section-head">
              <h2>{t.specsTitle}</h2>
              <p>{t.specsLead}</p>
            </div>
            <table className="spec">
              <tbody>
                {t.specs.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td className="ltr">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section" id="download">
          <div className="wrap">
            <div className="download">
              <div>
                <h2>{t.downloadTitle}</h2>
                <p>{t.downloadBody}</p>
              </div>
              <DownloadButton href={DOWNLOAD} label={t.ctaDownload} />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <span>{t.footerBuilt}</span>
          <a href={REPO}>{t.footerRepo}</a>
        </div>
      </footer>
    </>
  );
}
