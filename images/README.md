# Artwork

Drop files in this folder, then check the names match the `heroImage`,
`motifs` and `dancerStrip` entries in `assets/content.js`.

Anything missing is skipped silently. The page renders fine with none of it.

## What goes here

| File | What it is | Size to aim for |
|------|------------|-----------------|
| `hero.jpg` | The watercolour of Villa Zarri with San Luca above | ~1400px on the long edge, under 600KB |
| `dancers.png` | The row of dancers from the bottom of the painting | ~1600px wide |
| `motif-1.png` … `motif-5.png` | Single dancers, cut out one per file | ~300px tall each |

Names are only a convention. Change them in `content.js` if you prefer others.

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
