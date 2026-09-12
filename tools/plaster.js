#!/usr/bin/env node
/* Regenerates the --plaster tile in assets/styles.css.

   This is NOT a build step. The site still has none: the output of this
   script is pasted into styles.css and committed, and nothing runs at deploy
   time. It exists because the tile is a URL-encoded SVG data URI, and
   hand-editing one is how you get a texture that silently fails to parse.

     node tools/plaster.js                      current tile, as committed
     node tools/plaster.js --grain=0.10         coarser grain
     node tools/plaster.js --pig=.8,.45,.15     a different terracotta

   Paste the whole url("...") into the --plaster token. If you change the
   tile size, change --plaster-tile beside it to match.

   Three layers, painted in this order:
     m  broad mottle, the wall itself
     d  grain in terracotta, darkens
     l  grain in warm near-white, lifts

   Two knobs decide grain size and one of them is a trap:
     grain (baseFrequency)  INVERSE. Lower is coarser. .14 ~ 7px features.
     goct  (numOctaves)     each octave adds a layer at DOUBLE the frequency,
                            so MORE octaves means FINER grain, not richer.

   Measured lag-1 autocorrelation, as a sanity check on "is this grain or is
   this noise": .85/3 (the build this replaced) = -0.07, i.e. adjacent pixels
   uncorrelated, which is per-pixel noise. .14/2 = 0.88. Below about .10 it
   stops reading as plaster and starts reading as damp.

   The pigment is deliberately not --portico. See CLAUDE.md, "The plaster". */

const arg = (k, d) => {
  const m = process.argv.find(a => a.startsWith('--' + k + '='));
  return m ? m.slice(k.length + 3) : d;
};

const TILE   = +arg('tile',   560);
const MOTTLE = +arg('mottle', 0.014);  // broad cloud, ~70px features
const GRAIN  = +arg('grain',  0.14);   // speckle, ~7px features
const GOCT   = +arg('goct',   2);      // grain octaves
const A_MOT  = +arg('amot',   0.45);
const A_DARK = +arg('adark',  0.93);
const A_LIFT = +arg('alift',  1);
const PIG    = arg('pig',  '.784,.451,.157').split(',').map(Number); // #c87328
const LIFT   = arg('lift', '1,.984,.933').split(',').map(Number);

/* feColorMatrix: flat colour, alpha driven by the turbulence's red channel. */
const mat = ([r, g, b], a) =>
  `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} ${a} 0 0 0 0`.replace(/0\./g, '.');

const filter = (id, freq, oct, seed, col, a) =>
  `<filter id='${id}' x='0' y='0' width='100%' height='100%'>` +
  `<feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${oct}' ` +
  `stitchTiles='stitch' seed='${seed}'/>` +
  `<feColorMatrix values='${mat(col, a)}'/></filter>`;

const svg =
  `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE}' height='${TILE}'>` +
  filter('m', MOTTLE, 4,    3,  PIG,  A_MOT)  +
  filter('d', GRAIN,  GOCT, 7,  PIG,  A_DARK) +
  filter('l', GRAIN,  GOCT, 19, LIFT, A_LIFT) +
  ['m', 'd', 'l'].map(id => `<rect width='${TILE}' height='${TILE}' filter='url(%23${id})'/>`).join('') +
  `</svg>`;

/* %23 above is already an encoded '#', so protect it before encoding the rest. */
const enc = svg
  .replace(/%/g, '%25').replace(/%2523/g, '%23')
  .replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23');

process.stdout.write(`url("data:image/svg+xml,${enc}")\n`);
