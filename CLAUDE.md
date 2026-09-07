# Orlando & Sofia, 12 June 2027

A static wedding site on GitHub Pages, rebuilt from a Joy site the couple no
longer wanted to depend on. This file is the handover: what it is, what was
decided and why, and what is still open.

---

## The wedding

| | |
|---|---|
| Couple | Orlando Wethered & Sofia Mutinelli |
| Date | Saturday 12 June 2027 |
| Venue | Villa Zarri, Via Ronco 1, 40013 Castel Maggiore BO, Italy |
| Ceremony | 16:00, guests welcome from 15:30 |
| Friday drinks | 11 June, 16:00–21:00, Via Santo Stefano, Bologna |
| Languages | English and Italian |
| Live at | `https://ragingrolando.github.io/wedding-site/` |

---

## How it is built

Plain HTML, CSS and JS. No build step, no framework, no dependencies. GitHub
Pages serves `main` from the repository root, so a push is a deploy and it is
live in about a minute.

```
index.html            37 lines. Loads fonts, then content.js, then main.js
assets/content.js    Every word and filename on the site. Edit this.
assets/main.js       Renders the page from content.js. Rarely needs touching.
assets/styles.css    All styling. Tokens at the top.
images/              Artwork. See images/README.md
apps-script/         Unused. A Google Sheet RSVP backend, for if Joy is dropped
joy-example/         The saved original Joy page. Reference only, never served
```

`content.js` defines one object, `SITE`. Every string can be `"plain"` or
`{ en: "...", it: "..." }`. A missing `it` falls back to English, which is
deliberate and used in several places.

`main.js` builds the DOM from `SITE`. Missing images remove themselves rather
than showing a broken icon, so a wrong filename degrades quietly.

### Running it locally

```
cd ~/wedding-site && python3 -m http.server 8000
```

Then `http://localhost:8000/?k=baci`.

---

## Guest links

Two things vary per guest: language, and whether they see the Friday drinks.
**Both are off by default.** No parameter and no previous visit means English,
Saturday only. The browser's own language is deliberately not consulted.

### Friday is on the password

Two passwords open the gate, both in `SITE.gate`:

| Password | Opens the site | Shows Friday |
|---|---|---|
| `baci` | yes | no |
| `spritz` | yes | yes |

The gate stores which password opened it, so the Friday card follows that
guest to every later visit: a bookmark, a retyped address, a link that lost
its query string through WhatsApp. **This is the mechanism. Prefer it over
the parameter**, which is the only thing a URL cannot do.

### Parameters

| Option | Does |
|---|---|
| `?k=baci` / `?k=spritz` | Skips the password screen, carrying that password's entitlement |
| `?lang=it` | Opens in Italian. `?lang=en` forces English |
| `?f=11` | Shows Friday. Any other value of `f` removes it |

`?f=11` is an override for one-off links, remembered like the password is. It
cannot take Friday away from someone holding `spritz`: the password is the
stronger statement.

### Ready to send

```
Saturday only, English     ...?k=baci
Saturday only, Italian     ...?k=baci&lang=it
Friday and Saturday, EN    ...?k=spritz
Friday and Saturday, IT    ...?k=spritz&lang=it
```

### It hides a card, it does not keep a secret

Both passwords are written in `assets/content.js`, which anyone can open in a
browser. `?f=11` is guessable in one try because it is the date. A curious
Saturday guest, or one forwarded the wrong link, will see the Friday details.

Orlando's position: *"it doesn't really need to be that secure."* If that ever
changes, the drinks details cannot live on this site at all.

---

## Design

Everything is derived from the watercolour of Villa Zarri with San Luca above
it. The palette was sampled from the painting; the arch motif is the Bologna
portico that runs through it.

### Tokens (top of `styles.css`)

```
--paper      #f7f4ec   the ground
--wash       #efeade   alternating band
--card       #e9e3d1
--ink        #1d3320   the pen line, verbatim from the painting
--portico    #c05b3c   the arches
--verdigris  #136d5f   darkened from the study's #20A98D for contrast
--ochre      #d2aa2e
--display    Fraunces      variable: opsz, SOFT, WONK
--body       Newsreader
--util       Instrument Sans
--arch       an inline SVG of one portico bay, tiled as a mask
```

`--ink-52` and `--ink-72` were raised from `.56`/`.72` to `.70`/`.78` after a
WCAG audit: at the old values the nav labels and the restaurant notes were
running at 3.2:1. Nothing on the page is now under 4.6:1. **Do not lower them.**

### The arch is the signature

A run of arches marks every change of ground (`section.alt::before`), sits
above When and Where, and above the RSVP section. Each event card in When and
Where is drawn as a bay of the portico: a hairline arch, the date inscribed in
the head, an impost where it springs, and two piers that fade out at the foot
rather than closing. A bay you cannot walk through is a tombstone.

The arch head is a separate element, not a `border-radius` on the card. A
percentage radius keys off the card's height, so two cards of different lengths
would stand under two different arches.

### The ampersand

Only two on the page get the Fraunces italic "et": the nav wordmark and the
hero. Everywhere else it is the plain character. This took four attempts:

- Different faces, because `.amp` never set `font-family` and inherited
- Different **`opsz`**, which was the real culprit. Fraunces redraws the italic
  ampersand along the optical-size axis: solid and compact at 21, thin and
  spidery by 56. It is now pinned to 21.
- It grew the nav row by 7px, because it is set larger and carries a descender.
  It has `line-height: 0` so it cannot vote on line height.

### The hero

`heroTextBelow: true` in `content.js`. The painting holds the first screen on
its own; the names arrive on scroll, using the same reveal every section uses.
**No pinning and no scroll hijacking.** Set to `false` to put the names back
above the painting.

The image is fitted to viewport height, not width, because its paper labels
run to all four edges and filling a wide screen sideways would crop them.

This does not work on a phone and cannot: a portrait image on a 390 × 844
screen cannot fill it without cropping. It degrades to painting-then-names.

---

## Images

| File | Used | What |
|---|---|---|
| `wedding-hero-with-text.jpeg` | hero | 1845 × 2505. Paper labels are part of the JPEG |
| `wedding-san-luca-banner-wide.jpg` | footer | 2048 × 528, edge to edge |
| `hero-extended-with-text.jpg` | **no** | The print version for the invitation, canvas extended for bleed. Kept deliberately |
| `dancing-row.png` | twice | Under the RSVP button, and the footer |
| `dancing-*.png` (4 more) | motifs | Cycled beside section headings |
| `dancing-bride-groom.png` | nav + motif | 30px beside the names in the top bar |
| `via-saragozza.webp` | Bologna | 2100 × 2082, beside the intro |
| `moka-pot.png` / `tea-cup.png` | language toggle | IT and EN |

Keep the hero and the banner large: they are the only two shown big. Compress
before committing. The hero arrived at 4.8MB and was re-encoded at the same
dimensions to 1.0MB with nothing visible lost:

```
sips -s formatOptions 80 file.jpeg --out file.jpeg
```

More in `images/README.md`.

---

## Content decisions

### The copy is Joy's, verbatim

Orlando asked for the exact original wording: *"I want you to copy it
exactly."* It was reverse-engineered out of `joy-example/joy-example.html`.
The copy is Joy's, with one exception: **eight typos Joy carried have been
corrected**, on Orlando's word. Line numbers are `assets/content.js`:

| | Was | Now | Line |
|---|---|---|---|
| 1 | "Summer **Chich** & Colourful" | Chic | 207 |
| 2 | "Apps to download on your **smarpthone**" | smartphone | 443 |
| 3 | "resources you are investing **to be celebrate** in Bologna" | to celebrate | 336 |
| 4 | "benvenuti dalle **15;30**" | 15:30 | 182 |
| 5 | "dovrebbe **rinferscarsi**" | rinfrescarsi | 299 |
| 6 | "il regalo **di per sè**" | di per sé | 340 |
| 7 | "a hot **italian** summer day" | Italian | 207 |
| 8 | "don't wear **T-shirt**, trainers" | T-shirts | 207 |

Everything else is verbatim. The dress code appears three times (lines 162,
204, 207) and all three now read "Chic".

### Italian is thinner in places

Joy never had Italian for: the Friday drinks note, four of the seven
running-order names, the shuttle paragraph, the Places to Stay intro, or the
whole Bologna section. Those keys have no `it` and fall back to English. That
is faithful, not a bug.

### The restaurant links are mostly Google Maps

Joy rendered them as `<button>` with no `href` and attached URLs in script, so
**13 of 16 died** when the page was saved. Three Instagram links survived and
are kept verbatim (Cremeria Santo Stefano, Spaccio Belfiore, Casa Minghetti).
The rest fall back to a Google Maps search for the name plus ", Bologna,
Italy", which cannot rot. Paste a real URL into `content.js` to override.

### RSVP still goes to Joy

`rsvp.mode: "link"` points at `withjoy.com/orlando-and-sofia/rsvp`, keeping
Joy's guest list, meal choices and +1 logic. `apps-script/` holds a Google
Sheet backend for `mode: "form"` if that changes; the form fields are styled
for paper and ready, just unused.

---

## Working practices

- **Orlando works on `main`.** His local clone was once branched off a feature
  branch, which silently pushed his files where Pages could not see them. If
  something he pushed "isn't showing", check which branch it landed on first.
- He has `core.mergeoptions --no-edit` and `core.editor nano` set, so `git pull`
  no longer opens pico at him.
- **Renaming an image breaks the site** unless `content.js` is updated in the
  same commit. This has happened twice.
- Claude pushes to both `main` and `claude/recreate-wedding-site-rw52wx`.

### Verifying a change

There is no test suite. The checks that have caught real bugs:

- `scrollWidth <= clientWidth` at 1440 / 1100 / 820 / 390 / 320, both languages
- No failed requests, no page errors
- Screenshot the section you changed and actually look at it

Google Fonts is unreachable from the Claude container, so Fraunces has to be
fetched with curl and served through a Playwright route, or everything falls
back to Georgia and typography changes cannot be judged.

---

## Still open

1. **`gifts.bank`** has empty `value` fields for account name, IBAN and BIC.
   The section renders without them.
2. **The teal.** `--verdigris` is the only cool colour on the page and the
   choice most likely to be wrong. Never resolved.
3. Never started, and would need confirming first: splitting the long Bologna
   section, an "Our Story" section.
4. The Via Saragozza painting is signed *Ramesh Jhawar*. Worth confirming the
   right to publish it before the site is shared widely.
