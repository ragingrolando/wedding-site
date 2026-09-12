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
| Live at | `https://orlando-and-sofia.com` |

---

## How it is built

Plain HTML, CSS and JS. No build step, no framework, no dependencies. GitHub
Pages serves `main` from the repository root, so a push is a deploy and it is
live in about a minute.

The custom domain `orlando-and-sofia.com` (registered at GoDaddy) points at
Pages: four A records on `@` to GitHub's 185.199.108-111.153, and a `www`
CNAME to `ragingrolando.github.io`. The root-level `CNAME` file is what tells
Pages to answer on that domain. **Deleting it unsets the custom domain and the
site 404s until it is put back.** The old `ragingrolando.github.io/wedding-site/`
address redirects to the domain, so links sent before the move still work.

Because the site is served from the domain root and not `/wedding-site/`, every
path in the source is relative. Keep it that way. A leading slash would work on
the domain and break on the github.io fallback.

```
CNAME                 The custom domain. Do not delete. See below
index.html            37 lines. Loads fonts, then content.js, then main.js
assets/content.js    Every word and filename on the site. Edit this.
assets/main.js       Renders the page from content.js. Rarely needs touching.
assets/styles.css    All styling. Tokens at the top.
images/              Artwork. See images/README.md
tools/plaster.js     Regenerates the wall-texture tile. Not a build step
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
Saturday only, English     https://orlando-and-sofia.com/?k=baci
Saturday only, Italian     https://orlando-and-sofia.com/?k=baci&lang=it
Friday and Saturday, EN    https://orlando-and-sofia.com/?k=spritz
Friday and Saturday, IT    https://orlando-and-sofia.com/?k=spritz&lang=it
```

### The gate card is deliberately bare

Its title, blurb and password hint were removed on request. `main.js` omits
each of the three when the key is absent from `gate`, so the card closes up
rather than leaving a gap. Add any of them back as `{ en, it }` and it
reappears.

The submit button is an arrow, not a word. `gate.button` is **not printed**
any more; it is the button's `aria-label`, so a screen reader hears "Enter"
or "Entra" instead of "button". Change the word there, the glyph in
`buildGate`. A guest arriving on the bare domain now sees a name, a date, a
password box and an arrow, and nothing telling them what to type, so send the
`?k=` links rather than the bare URL.

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
--portico    #c05b3c   the arches. NOT the plaster pigment, see The plaster
--plaster    the wall texture, a generated SVG tile. tools/plaster.js
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

### The nav is a scroller, not a menu

There is no burger. The nav is a flex row with `overflow-x:auto` and a mask
that fades its last stretch when there is more to scroll to. `main.js` toggles
`.fade-start` / `.fade-end` so nothing is dimmed at either end.

Below **1200px** it drops to its own full-width row, and its gap and label size
taper with the viewport. That number is set by Italian, not English: eight
Italian labels need 684px and the inline bar offers 584 at 1100px, so at the
old 1080px breakpoint "Bologna" sat behind the fade on any laptop. Every label
is now fully visible down to 768px in both languages; below that it scrolls,
which is the intent on a phone. **Check Italian at 1100 and 768 before
touching this block.** English fits in less and will not show the problem.

### The photo strip

Six prints at the foot of the RSVP section, from `SITE.carousel`. That
section reads: dancers, heading, deadline, button, photos. Each print is a
Polaroid: white mount, deeper at the foot, 3px corners, soft shadow, turned a
few degrees and lapping over the one before it. It drifts left on its own,
drags with a mouse and swipes on touch, and nothing in it is a link. It
pauses on hover, focus and drag, and never animates under
`prefers-reduced-motion`.

**Every tilt, lift and overlap is keyed off the index in the original image
list** (`cellStyle(i)` in `main.js`), not off the position in the rendered
track. The track holds the list twice and the keyframe travels exactly
`-50%`, so print *i* of the copy lands exactly where print *i* of the
original was. Key off anything else, `nth-child` or `Math.random` included,
and the two halves disagree and the loop visibly jumps once per cycle.

`images/story-1.png` … `story-6.png` are placeholders: flat squares in the
page palette. **Overwrite the files, keep the names**, and nothing else needs
touching. Square crops are best; anything else is centre-cropped by
`object-fit`. A missing file drops out; if every file is missing the strip
removes itself after four seconds rather than leaving an empty band.

`buildStrip` and `dragScroll` live at their own scope, not inside a section
builder, so the strip can be called from anywhere. Move the
`buildStrip(SITE.carousel)` call to relocate it. It has already been in the
Bologna section and under the Gift List; it is in RSVP now.

**`.dancer-strip-rsvp` was dead for the life of the file.** It sat above
`.dancer-strip` with the same specificity, so the base rule won and the RSVP
dancers rendered at the base 820px, never the 700 that rule asked for. It now
sits below `.dancer-strip`, beside `.dancer-strip-inline`, where it applies.
**Keep it there.** Any new `.dancer-strip-*` variant goes below the base rule
too, or it will silently do nothing.

### The plaster

**Every section carries the same terracotta wall texture.** Only the ground
colour under it changes: `--paper` normally, `--wash` on `section.alt`. That
is one token, `--band`, so a new band variant only has to set it. It is three
turbulences in one 560px SVG tile, no file to download: a broad mottle, a
coarse grain in terracotta that darkens, and a second grain in warm near-white
that lifts.

Earlier builds put it on `section:not(.alt)` only, so the `--wash` bands stayed
flat. That was not really a choice (see the z-index note below).

#### It reads pink when the two grounds disagree

The first warm build used `--portico` as the pigment. `--portico` is `#c05b3c`,
hue 14. At texture strength it dragged the ground to **hue 25**, and the flat
`--wash` band next to it sat at **hue 42**. Two grounds seventeen degrees apart,
the redder one directly above the yellower one, is what read as pink: nothing
on the page was pink on its own, the comparison made it pink.

The fix was the pigment, not the strength. It is now `#c87328`, hue 28, and
both bands measure **hue 36-37**, so neither band is the red one any more.

| | old build | now |
|---|---|---|
| pigment | `#c05b3c` (`--portico`), hue 14 | `#c87328`, hue 28 |
| paper band | (245,230,219) hue 25 | (246,232,211) hue 36 |
| wash band | (239,234,222) hue 42, **flat** | (243,228,206) hue 36, textured |
| worst ink-52 | 4.735 | 4.701 |

**If it ever reads pink again, measure both bands' hue before touching
anything.** A single band's colour tells you nothing; the gap is the bug.

#### Grain size lives in two numbers, and one is a trap

```
baseFrequency   INVERSE. Lower is coarser. .14 is roughly 7px features.
numOctaves      each octave adds a layer at DOUBLE the frequency, so MORE
                octaves makes the grain FINER, not richer.
```

The old build ran `.85` with 3 octaves. Measured, that has a lag-1
autocorrelation of **-0.07**: adjacent pixels uncorrelated, which is per-pixel
noise and reads as sensor grain, not as a wall. It is now `.14` with 2
octaves, which measures **0.88**. Past about `.10` it stops reading as plaster
and starts reading as damp.

**Standard deviation does not measure grain size.** It was 4.93 before and
4.85 after, while the feature size went up roughly sevenfold. Use the
autocorrelation, or amplify a screenshot's contrast and look at it; at the real
amplitude (sd 4 of 255, about 1.6%) the structure is invisible in a screenshot
that has been downscaled at all.

The tile is 560px rather than 280px only to halve how often it repeats across a
wide screen. It is free: the whole tile paints in about 20ms at every size
tried, and the data URI is the same 1047 bytes either way.

#### Regenerate the tile, do not hand-edit it

```
node tools/plaster.js                 the tile exactly as committed
node tools/plaster.js --grain=0.10    coarser
```

Paste the whole `url("...")` into `--plaster`. `tools/plaster.js` is not a
build step; its output is committed and nothing runs at deploy time. It exists
because the tile is a URL-encoded SVG and hand-editing one is how you get a
texture that silently fails to parse.

#### Strength, and what it costs

`--plaster-opacity` is the only live knob: `.75` now, `1` is the ceiling of
this tile.

| `--plaster-opacity` | paper band | wash band | warmth | sd | worst ink-52 |
|---|---|---|---|---|---|
| 0 (off) | (247,244,236) h44 | (239,234,222) h42 | 0 | 0.1 | 4.78 |
| .4 | (246,238,223) h39 | (241,231,213) h39 | 13 / 9 | 2.6 | 4.73 |
| .6 | (246,235,217) h37 | (242,230,209) h38 | 19 / 13 | 3.9 | 4.70 |
| **.75 (current)** | **(246,233,212) h37** | **(243,229,206) h37** | **24 / 16** | **4.8** | **4.70** |
| 1 (ceiling) | (246,229,204) h36 | (244,227,201) h36 | 32 / 21 | 6.4 | 4.66 |

*warmth* is how many levels of blue the plaster pulls out of each band. Note
the hues converge as the knob comes up: at `0` the two bands sit at 44 and 42
with the texture off, and the pigment brings both to 36-37. Measured on a
120px patch; a small patch lands a little differently depending on where the
mottle falls, so the worst single sample seen anywhere on the page is 4.70,
not 4.73.

**Warming the ground costs contrast, and the `--wash` band is the worst case**
because it starts darker. `--ink-52` there is 4.701 at the current setting.
That clears the 4.6 floor above and WCAG's 4.5, but not by much: anything
warmer or stronger means measuring the ink, not eyeballing it.

It no longer works by `opacity` on a pseudo-element. The texture is a
background layer on the section itself, and the knob veils it with the band's
own colour at `1 - opacity`, which is arithmetically identical. Verified live:
forcing the knob to `0` takes the measured variance to sd 0.12, i.e. flat.
The veil uses `color-mix()`. On a browser too old for that (pre-2023) the
declaration drops and the bands render as flat colour, which is the old look,
not a broken one.

#### What putting it on every band cost

The plaster is a partly-opaque layer. Solved from the two measured band pairs
it is **alpha .656, colour (245,226,198)**, and that model reproduces both
bands exactly. Being partly opaque, it pulls the two grounds towards each
other: whatever is underneath contributes only a third.

So the bands now separate far less than they used to. As a contrast ratio,
paper against wash:

| | separation | as a fraction of the old |
|---|---|---|
| flat paper vs flat wash (old) | 1.0922 | 100% |
| textured paper vs textured wash (now) | 1.0359 | **39%** |

The arch run at every change of ground is doing that work now, which was
always its job. But if the bands should read as two again, the lever is
`--wash`, and it runs straight into the ink:

| `--wash` | separation | ink-52 |
|---|---|---|
| `#efeade` (current) | 1.036 | 4.73 |
| `#e9e2d6` | 1.055 | 4.62 |
| `#e6ded3` | 1.066 | 4.64 |
| `#e1d6cb` (restores the old separation) | 1.093 | **4.58, under the floor** |

**You cannot have the old band separation and the 4.6 floor at once.**
`#e6ded3` is the darkest that keeps both. Not applied: the brief was the same
grain on every section, and changing `--wash` is a palette decision.

#### Why it is not a pseudo-element any more

It used to be `section:not(.alt)::after` at `z-index:-1`. **A negative-z
pseudo-element paints behind its parent's own `background-color`**, so that
rule could never have shown through a section that painted one, which is the
real reason it was restricted to `:not(.alt)`: `section.alt` sets
`background:var(--wash)` and would have hidden it. The old note that it
"works only because `html` has no background" was describing the same
fragility. Painting it as a background layer on the section removes all of it,
and frees `::after` besides.

#### Measuring it

If you retune it, measure it. Three things will wreck the measurement, and all
three have:

- `html{scroll-behavior:smooth}` means a `scrollIntoView` is still moving when
  the first screenshot fires. Force `scroll-behavior:auto`.
- The scroll-reveal animation changes the pixels between shots. Pin
  `.reveal{opacity:1;transform:none}`.
- Take the `0` baseline **twice, once at each end**. If the two do not match
  exactly, everything between them is meaningless.

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
The copy is Joy's, with one exception: **nine typos Joy carried have been
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
| 9 | "...or blue jeans" (no full stop) | full stop added | 207 |

Everything else is verbatim. The dress code appears three times (lines 162,
204, 207) and all three now read "Chic".

### The Italian is now complete

Joy never had Italian for the Friday drinks note, four of the seven
running-order names, the shuttle paragraph, the Places to Stay intro, or the
whole Bologna section, and six section headings carried English in their `it`
slot. Those were all translated on request. Nothing falls back to English any
more except by choice.

Left in English deliberately: proper nouns (hotels, restaurants, street
names) and the words Italian uses unchanged (Password, Aperitivo, Gelato,
Dress Code, IBAN, BIC, RSVP, Email).

**Centred is two things.** `.subhead` had `text-align:center` and still sat
282px left of the column: `p` carries `max-width:var(--measure)`, so the box
was narrower than its parent, and the rule set its side margins to `0`.
Centring text inside a box is not centring the box. It is `auto` now.

**`t()` is not applied everywhere.** Place names, restaurant names and notes,
event times and addresses were once rendered as raw strings, so making one
bilingual printed `[object Object]`. They now go through `t()`. If you make
any other plain string bilingual, check `main.js` runs it through `t()` first.
The translations are mine, not a native speaker's. Worth Sofia reading once.

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
4. Nothing outstanding on the artwork. **The Via Saragozza painting is
   Orlando's.** He commissioned it; it is signed *Ramesh Jhawar* because
   Jhawar painted it to commission. Publishing it is his to decide and he
   has decided. Do not raise this again, and do not replace or crop the
   image on rights grounds.
