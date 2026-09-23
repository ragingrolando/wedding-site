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
--paper      #f7f4ec   NOT a ground any more. Button text, fields, hover fills
--tone-1..4  four warm section grounds, cycled. See The section grounds
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

`--ink-52` and `--ink-72` have been raised twice: `.56`/`.72` to `.70`/`.78`
after a WCAG audit, then to **`.74`/`.82`** to pay for the wall texture, which
darkens the ground. Nothing on the page is under 4.9:1. **Do not lower them**,
and if the texture is ever removed they can come back down.

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

### The section grounds

**Four warm tones, cycled 1-3-2-4 so no two neighbouring sections share one.**
Not nine. They are the colour UNDER the wall texture, not what you see.

```
--tone-1 #faf5e7  palest      when, stay, rsvp
--tone-2 #f7ecd2  ochre       dress, gifts
--tone-3 #efe9e5  soft clay   order, faq
--tone-4 #f8e5d9  apricot     transport, bologna
```

**These are much paler than they render.** The wall is tinted terracotta and
does most of the colouring; the tones only steer it. Judge them rendered, not
as hex values.

Assigned by `#id`, not `nth-child`, so reordering the nav cannot silently
reshuffle the palette. `.alt` is still what `main.js` alternates and what
draws the arch run; it no longer carries a colour. The arch run therefore
still lands exactly on every change of ground.

| | rendered ground | hue | chroma | `--ink-52` |
|---|---|---|---|---|
| tone 1 | (243,216,186) | 32 | 57 | 4.980 |
| tone 2 | (241,210,171) | 33 | 70 | 4.863 |
| tone 3 | (235,208,184) | 28 | 51 | 4.761 |
| tone 4 | (241,205,176) | 27 | 65 | 4.764 |

Worst section boundary measures dE 4.04. The arch run is unaffected: `--portico`
at `.5` scores 1.68-1.73 against these grounds, against 1.71-1.79 before.

#### Why four and not nine

One per section was asked for, built, and does not work. Two limits collide:

1. **The ink sets a floor.** The deepest ground `--ink-52` at `.74` can carry
   is about HSL lightness `.87`.
2. **The wall compresses what is left.** It composites as a `.2835`-alpha
   layer of grey 180, pulling every ground towards grey.

What survives is a range spanning **1.16 in contrast**, which is three or four
visible steps. Nine needs eight steps of 1.019 each, far below the 1.069 that
read as a change in the old two-band design.

Forcing nine means pushing hue instead of lightness, and **at these low
saturations a small hue shift reads as a different hue, not a different
orange**. The nine-tone attempt scored well on paper and rendered a green FAQ
section, a pink RSVP and a khaki Bologna. Look at it before rebuilding it.

#### Measure separation as dE, not contrast ratio

Contrast ratio scores two grounds of equal lightness and different hue as
**1.00** while the eye plainly sees two colours. It is the wrong tool for
this and it is what sent the first two attempts wrong.

Use CIE dE against this calibration: **the old `--paper`/`--wash` pair, which
read as two grounds, scores dE 2.96.** The four tones here are 4.67 apart at
worst, and the worst section boundary on the page measures **3.97**.

### The wall texture

Every section is the same photographed wall over a different ground colour.
`--band` is that colour and the only thing that differs between an `.alt` band
and a normal one, so a new band variant only has to set it.

```css
body    { --band:var(--paper); background-color:var(--band);
          background-image:url("../images/concrete-wall.webp") }
section { --band:var(--paper); background-color:var(--band);
          background-image:url("../images/concrete-wall.webp") }
#order  { --band:var(--tone-3) }   /* and so on, see The section grounds */
```

`body` and `.gate` carry the same two lines, so the wall runs behind the hero,
the footer and the password screen too, and is continuous everywhere. Sections
paint their own `--band` over it; the hero and footer are transparent and show
the body's.

**`--paper` is not a page ground any more.** It is the old neutral cream, hue
44, against a page that now runs 27-33. Three places were still painting it
flat and each read as a cool patch on a warm page:

| | was | now |
|---|---|---|
| `body` | `--band:var(--paper)` | `--band:var(--tone-1)` |
| `.gate` | `background:var(--paper)`, no texture | tone-1 plus the wall |
| `.topbar` | hardcoded `rgba(247,244,236,.93)` | `rgba(250,238,226,.93)`, hue 31 |

They all now measure (243,219,190)-(243,220,192) against the first section's
(243,219,190). `--paper` survives only for things that want a light chip:
button text, form fields, hover fills. **If the palette moves again, grep for
`--paper` and for hardcoded `247,244,236` before assuming it followed.**

`url()` in `assets/styles.css` resolves against the stylesheet, so the path is
`../images/`, not `images/`.

#### The image is a transparent mask, not a picture

**`concrete-wall.webp` is a flat TERRACOTTA (223,143,73, hue 28) whose entire
image lives in its ALPHA channel**, averaging 61 of 255. That is why it needs
no blend mode: it composites straight over `--band`, the transparent parts
being the ground colour and the opaque parts the wall.

**Do not add `background-blend-mode`.** There is nothing to blend. The RGB is a
featureless terracotta rectangle, so any blend mode throws the texture away
and tints the band with flat orange.

#### The wall's own colour is the main lever on the palette

It shipped as neutral grey (180,180,180), and grey is a bleach: at `.2835`
alpha it cut every ground's chroma by about a quarter and held the page pale.
Tinting the wall terracotta instead was **nearly free warmth**. On the same
band colour:

| wall | ground | hue | chroma | `--ink-52` |
|---|---|---|---|---|
| neutral grey 180 | (224,216,197) | 42 | 27 | 4.862 |
| terracotta 223,143,73 | (232,212,186) | 34 | 46 | 4.823 |

Chroma up 70%, contrast down 0.04. Deepening the *bands* to chase the same
warmth costs ten times as much contrast and fails the floor. **If the page
should be warmer or cooler, retint the wall before touching the tones.**

Its hue is 28 deliberately. The search wanted 22, which delivers identical
chroma and sits in the zone that read as pink in the rejected builds. 28 is
free insurance.

#### What was done to Orlando's original

The file he supplied was `images/concrete-wall-2.png`, 597x545, 292KB. Recover
it with `git show dce74ab:images/concrete-wall-2.png > orig.png`. Two changes:

1. **Cropped 50px off each side**, to 497x545. The left and right edges of the
   photograph averaged alpha 74 against 65 in the middle, about 14% denser, so
   tiling put two dense strips together and drew a darker vertical line every
   597px. At a 50px crop the edges are within 2.7 of the centre. Verified on
   the rendered page: the column-to-column step at the tile seams scores
   **z = 0.02 and 0.22**, i.e. indistinguishable from ordinary variation.
2. **Re-encoded PNG to WebP at quality 80**, 292KB to 182KB. Safe because
   **lossy WebP stores alpha losslessly**: measured RMSE against the source
   alpha is exactly 0 at every quality from 70 to 95. Only the RGB is lossy,
   and after alpha weighting that error lands as **1.1 levels of 255**.

To retint or restrength it, re-encode from the ORIGINAL, not from the shipped
file, so tints do not compound: `git show dce74ab:images/concrete-wall-2.png`.
Crop 50px off each side, then for each pixel take its grey `g` and write
`RGB = tint * g/180`, which keeps the wall's own light and dark variation
instead of flattening it. Keep the alpha untouched and check its mean is still
**61.26**. Export with `canvas.toDataURL('image/webp', 0.8)`. That needs
Chromium, which the repo deliberately does not carry, so there is no tool
checked in for it.

#### The texture was paid for out of the ink

It darkens the ground from (247,244,236) to (228,226,220), and the `--wash`
band from (239,234,222) to (222,219,210). At the old ink values that put
`--ink-52` at **4.49 on the wash band, which fails WCAG's 4.5 outright**.

So `--ink-52` went `.70` to `.74` and `--ink-72` went `.78` to `.82`, keeping
the same step between the two tiers. That buys more than it spends:

| | flat, no texture | textured |
|---|---|---|
| paper band | (247,244,236) h44 | (228,226,220) h45 |
| wash band | (239,234,222) h42 | (222,219,210) h45 |
| worst `--ink-52` | 4.779 | **4.926** |
| worst `--ink-72` | 6.044 | 6.144 |
| band separation | 1.092 | 1.069 |

**Contrast is better with the wall than without it**, because the ink went up
further than the ground came down. Band separation costs 2%, against the 61%
the rejected generated plaster cost. **Do not lower the ink values.**

#### Two rejected attempts, and what they taught

A generated SVG plaster was built twice and rejected twice: the first read
pink, the second read as bad grain. `tools/plaster.js` generated it; recover it
with `git show c323a99:tools/plaster.js`. Worth keeping:

- **Two grounds of different hue next to each other is what reads as wrong.**
  The pink build put a hue-25 ground directly above a hue-42 one, and it read
  pink although neither colour was pink alone. If the wall ever looks off,
  measure both bands' hue before changing anything.
- **Standard deviation does not measure grain size.** Use the lag-1
  autocorrelation, or amplify a screenshot's contrast and look at it. At these
  amplitudes the structure is invisible in any screenshot that has been
  downscaled at all.
- **A partly-opaque layer pulls the two grounds together**, because whatever is
  underneath contributes less. It cost the generated plaster 61% of its band
  separation. This wall is lighter-handed and costs 2%.

#### Measuring it

Three things will wreck the measurement, and all three have:

- `html{scroll-behavior:smooth}` means a `scrollIntoView` is still moving when
  the first screenshot fires. Force `scroll-behavior:auto`.
- The scroll-reveal animation changes the pixels between shots. Pin
  `.reveal{opacity:1;transform:none}`.
- Take the baseline **twice, once at each end**. If the two do not match
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
| `concrete-wall.webp` | everywhere | 497 × 545, 178KB. A terracotta whose image is all in its alpha. See The wall texture |
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
- Claude works on a per-session `claude/...` branch and pushes there first,
  then fast-forwards `main` once you have seen the change. **Pushing `main`
  is the deploy**, so that second push is the one that changes the live site.
  Session branches so far: `claude/recreate-wedding-site-rw52wx`,
  `claude/wedding-site-handover-dmugik`.

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
