# Orlando & Sofia

A static wedding site for 12 June 2027, Villa Zarri, Bologna. Rebuilt from the
Joy page so the look, the words and the hosting are all ours.

Live at: `https://ragingrolando.github.io/wedding-site/` (once Pages is on)

---

## Turning the site on

One-off, in the GitHub web UI:

**Settings → Pages → Build and deployment**
- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- Save

First build takes about a minute. Every push to `main` republishes.

---

## Editing the content

Everything you will ever want to change lives in **`assets/content.js`**. No HTML.

Edit it in the browser: open the file on GitHub, click the pencil, change the
text between the quotes, scroll down, **Commit changes**. The site updates in
about a minute.

Text can be bilingual:

```js
{ en: "The ceremony starts at 16:00", it: "La cerimonia comincerà alle 16:00" }
```

Leave `it` out and Italian readers see the English. Guests switch language with
the EN / IT toggle in the header; the choice is remembered.

### Common edits

| I want to...            | Where in `content.js`                                  |
|-------------------------|--------------------------------------------------------|
| Change a time or address| `when.events`                                           |
| Reorder the running order | `order.items`                                         |
| Add or remove a question| `faq.items`                                             |
| Add a Bologna tip       | `bologna.places` or `bologna.food`                      |
| Add bank details        | `gifts.bank` (rows left empty stay hidden)              |
| Hide a whole section    | delete its line from `nav`                              |
| Reorder sections        | reorder `nav`                                           |

### Adding the artwork

Three kinds, all optional, all listed in `content.js`:

| Setting | What it draws |
|---------|---------------|
| `heroImage` | the watercolour, shown whole under the names |
| `motifs` | single dancers, one beside each section heading |
| `dancerStrip` | the row of dancers, as a band above the footer |

Drop the files into `images/` and see [`images/README.md`](images/README.md)
for names and sizes. White backgrounds are blended away, so plain crops off the
painting work with no cutting out. Any file that is missing is skipped, so a
typo costs nothing.

---

## RSVPs

`content.js` has an `rsvp` block with two modes.

| Mode | What happens | Trade-off |
|------|--------------|-----------|
| `"link"` *(current)* | Button out to the Joy RSVP | Keeps Joy's guest list, meal choices, +1 rules and reminder emails |
| `"form"` | Styled form on this site, rows into your own Google Sheet | You own the data, but you manage the guest list by hand |

Setup for `"form"` is in [`apps-script/README.md`](apps-script/README.md).

The form **will not submit** while `endpoint` is empty. It says so instead of
faking a success. No reply can be silently lost.

---

## The soft gate

Visitors land on a password screen before they see anything. Password is `baci`,
set in the `gate` block of `content.js`. Case and spaces are ignored, and once
someone is in, their browser remembers it.

Guests who arrive on a link ending **`?k=baci`** skip the screen entirely. Put
that version of the link on the Joy invitation and nobody has to type anything:

```
https://ragingrolando.github.io/wedding-site/?k=baci
```

Set `gate.enabled` to `false` to turn it off.

### What "soft" means

The password lives in `assets/content.js`, which is a public file. Anyone can
open `.../assets/content.js` in a browser and read the password and every word
of the site. The gate stops crawlers and casual browsing. It is a closed door,
not a locked one. Do not put anything on this site you would mind a stranger
reading.

**Joy's hotel rates are gone.** The negotiated group prices and the booking
widget are a Joy product. `stay.hotels` is a plain list with map links. Keep the
Joy page alive if the group rates matter to your guests.

---

## Files

```
index.html            page shell, meta tags, font loading
assets/content.js     all the words          <- edit this
assets/styles.css     all the design         <- edit this for look and feel
assets/main.js        renders content into the page
images/               photos
apps-script/          optional Google Sheet RSVP backend
robots.txt            keeps the site out of search results
.nojekyll             stops GitHub Pages preprocessing the files
```

## Design tokens

Carried over from the Joy "Interlocked Rose" theme, set at the top of
`styles.css`:

| Token | Value | Used for |
|-------|-------|----------|
| `--page` | `#efe3df` | page background |
| `--card` | `#ecdcd4` | cards |
| `--line` | `#dbbdb1` | borders |
| `--ink` | `#5a2a04` | text |
| `--accent` | `#8f2c0e` | buttons, links |
| `--accent-bright` | `#f8712f` | RSVP section |

Fonts: DM Serif Display (names and headings), Raleway (body and nav),
Open Sans (dates and times), EB Garamond (italics).

## Running it locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly with `file://`
works too, though the calendar downloads behave better over http.
