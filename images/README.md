# Artwork

Drop files in this folder, then check the names match the `heroImage`,
`brandMark`, `motifs`, `dancerStrip` and `bologna.image` entries in
`assets/content.js`.

Anything missing is skipped silently. The page renders fine with none of it.

## What goes here

| File | What it is | Size to aim for |
|------|------------|-----------------|
| `wedding-hero-with-text.jpeg` | The painting with the paper labels. Shown whole, holding the first screen | Portrait, ~2500px tall, under 1.2MB |
| `hero-extended-with-text.jpg` | **Not used by the site.** The same painting with the canvas extended left, right and bottom, for the printed invitation | Square, 2048px |
| `via-saragozza.webp` | The painting of Via Saragozza, shown beside the Bologna intro | ~1200px on the long edge, under 300KB |
| `dancing-row.png` | The row of dancers from the bottom of the painting | ~1600px wide |
| `wedding-san-luca-banner-wide.jpg` | The band across the very bottom of the page, edge to edge | 2048 x 528, under 500KB |
| `dancing-bride-groom.png` | motif | ~300px tall |
| `dancing-jump.png` | motif | ~300px tall |
| `dancing-kick.png` | motif | ~300px tall |
| `dancing-skank.png` | motif | ~300px tall |
| `dancing-upsidedown.png` | motif | ~300px tall |

Names are only a convention. Change them in `content.js` if you prefer others.

## Adding the bottom banner

It runs the full width of the browser, so it wants a wide, shallow crop. The
current file is 2048 x 528, near enough 4:1, which is shown whole at any
window width. Anything roughly 2.5:1 or wider is; closer to square and the
middle band is used and the rest cropped away. If the file goes missing the
footer simply starts at the initials, no gap and no broken icon.

```
cd ~/wedding-site && git add images/wedding-san-luca-banner-wide.jpg \
  && git commit -m "Add the San Luca banner" && git push
```

The filename is set in `bannerImage` in `assets/content.js`. Change it there
if you name the file something else.

---

## Adding the Via Saragozza painting

The file has a long generated name. Rename it as you copy it in, so
`content.js` does not have to carry a hash:

```
cp ~/Downloads/defa1040-*-via-saragozza-painting.webp ~/wedding-site/images/via-saragozza.webp
cd ~/wedding-site && git add images/via-saragozza.webp && git commit -m "Add the Via Saragozza painting" && git push
```

Until it is there the Bologna intro simply runs full width, no gap and no
broken icon.

## Keep the files small

The originals off a camera or scanner run to several MB, which makes the page
crawl on a phone. macOS has `sips` built in, so no extra tools:

```
sips -s formatOptions 80 wedding-hero-with-text.jpeg --out wedding-hero-with-text.jpeg
```

`formatOptions 80` re-encodes at the same size, which is usually enough on
its own: the hero came in at 4.8MB and left at 1.0MB with nothing visible
lost. Add `-Z 2048` to cap the longest edge as well. Do this on a copy, not
your master.

The hero and the bottom banner are the two that want the pixels, because
they are the only two shown large. Everything else is drawn small and
1600px is plenty.

## You do not need to cut out the background

Every one of these is drawn with `mix-blend-mode: multiply`, which makes white
disappear into the page colour. A plain rectangular JPG crop off the painting
works. A PNG with real transparency works too, and is slightly cleaner if the
paper has a grey cast.

## Uploading from the browser

Repo → `images` → **Add file** → **Upload files** → drag them in → Commit.
No git needed.

## The hero

`heroMode` in `content.js` controls how the painting is shown.

- `"overlay"` (current): the names sit in the sky at the top of the painting,
  over a light wash. Villa Zarri, the portico and the dancers stay untouched,
  and San Luca still reads through behind the lettering.
- `"plate"`: the whole painting below the names. Nothing overlaps at all.
- `"cover"`: fills the screen behind the names. Crops the top and bottom hard
  on a wide screen, which loses San Luca and the dancers.

## Where the motifs land

One beside each section heading, alternating left and right, cycling through
the `motifs` list. They sit at 50% opacity and are hidden below 760px wide,
where they would crowd the text.

Fewer than five files is fine. The list just cycles sooner.
