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

Visitors land on a password screen before they see anything. Two passwords open
it, `baci` and `spritz`, both set in the `gate` block of `content.js`. Case and
spaces are ignored, and the browser remembers which one was used.

Guests who arrive on a link ending **`?k=baci`** or **`?k=spritz`** skip the
screen entirely. Put the right one on each invitation and nobody has to type
anything. Which password a guest gets also decides whether they see the Friday
drinks: see **Guest links** below.

Set `gate.enabled` to `false` to turn it off.

---

## Guest links

Two things vary between guests: the language, and whether they see the Friday
pre-drinks card. **Both default to off.** No parameter and no previous visit
means English, no Friday.

### Friday: use the password

There are two passwords, both in the `gate` block of `content.js`:

| Password | Opens the site | Shows Friday |
|---|---|---|
| `baci` | yes | no |
| `spritz` | yes | yes |

Send each guest the one that matches their invitation. The gate remembers
which password opened it, so the Friday card follows that guest to every
later visit, on a bookmark, a retyped address, or a link that lost its query
string on the way through WhatsApp.

This is the robust mechanism. Prefer it.

### The parameters

| Option | Does |
|---|---|
| `?k=baci` / `?k=spritz` | Skips the password screen, carrying that password's entitlement |
| `?lang=it` | Opens in Italian. `?lang=en` forces English |
| `?f=11` | Shows Friday. Any other value of `f` takes it away again |

`?f=11` is an override for one-off links, so you can give somebody Friday
without changing their password. It is remembered like the password is. It
cannot take Friday away from someone holding `spritz`, because the password
is the stronger statement of the two.

**Ready to send**

```
Saturday only, English
https://ragingrolando.github.io/wedding-site/?k=baci

Saturday only, Italian
https://ragingrolando.github.io/wedding-site/?k=baci&lang=it

Friday and Saturday, English
https://ragingrolando.github.io/wedding-site/?k=spritz

Friday and Saturday, Italian
https://ragingrolando.github.io/wedding-site/?k=spritz&lang=it
```

### What this does not do

**It hides a card. It does not keep a secret.** Both passwords are written in
`assets/content.js`, which anyone can open in a browser. `?f=11` is guessable
in one try, because it is the date. A Saturday guest who is curious, or who is
forwarded the wrong link by a friend, will see the Friday details.

If the Friday guest list must not be inferable, the drinks details cannot live
on this site at all. Put the address in the invitation instead.

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
