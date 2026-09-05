# Artwork

Drop files in this folder, then check the names match the `heroImage`,
`motifs` and `dancerStrip` entries in `assets/content.js`.

Anything missing is skipped silently. The page renders fine with none of it.

## What goes here

| File | What it is | Size to aim for |
|------|------------|-----------------|
| `wedding-hero.jpeg` | The watercolour of Villa Zarri with San Luca above | ~1600px on the long edge, under 600KB |
| `dancing-row.png` | The row of dancers from the bottom of the painting | ~1600px wide |
| `dancing-bride-groom.png` | motif | ~300px tall |
| `dancing-jump.png` | motif | ~300px tall |
| `dancing-kick.png` | motif | ~300px tall |
| `dancing-skank.png` | motif | ~300px tall |
| `dancing-upsidedown.png` | motif | ~300px tall |

Names are only a convention. Change them in `content.js` if you prefer others.

## Keep the files small

The originals off a camera or scanner run to several MB, which makes the page
crawl on a phone. macOS has `sips` built in, so no extra tools:

```
sips -Z 1600 -s formatOptions 70 wedding-hero.jpeg --out wedding-hero.jpeg
```

`-Z 1600` caps the longest edge at 1600px. Do this on a copy, not your master.

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

- `"plate"` (current): the whole painting, uncropped, under the names. Right
  choice for a detailed portrait piece.
- `"cover"`: fills the screen behind the names. Crops the top and bottom hard
  on a wide screen, which would lose San Luca and the dancers.

## Where the motifs land

One beside each section heading, alternating left and right, cycling through
the `motifs` list. They sit at 50% opacity and are hidden below 760px wide,
where they would crowd the text.

Fewer than five files is fine. The list just cycles sooner.
