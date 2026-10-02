"use client";

/* Language toggle.
 *
 * Two text buttons, not a globe icon or a dropdown: there are only two options,
 * both are named, and showing both at once says "this page has two languages"
 * without needing to be opened.
 *
 * Direction is not handled here. The page sets lang/dir on <html>, which is what
 * flips the whole layout, so no component carries its own RTL logic.
 */

import { copy } from "../lib/content";

export default function LangToggle({ lang, onChange }) {
  return (
    <div className="lang" role="group" aria-label="Language">
      {Object.keys(copy).map((code) => (
        <button
          key={code}
          type="button"
          lang={copy[code].locale}
          aria-pressed={lang === code}
          onClick={() => onChange(code)}
        >
          {copy[code].langName}
        </button>
      ))}
    </div>
  );
}
