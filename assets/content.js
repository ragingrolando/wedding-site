/* ==========================================================================
   content.js  —  Everything you will ever need to edit lives in this file.
   No HTML knowledge required. Change the text between the quotes, commit,
   and the site updates in about a minute.

   Every piece of text can be bilingual:
       { en: "English text", it: "Testo italiano" }
   If you leave `it` out, the English is shown to Italian readers too.

   The wording below is copied verbatim from the Joy site, typos and all,
   in both languages. Where Joy only ever had English, there is no `it`
   key and Italian readers see the English.
   ========================================================================== */

const SITE = {

  /* ---------------------------------------------------------------- basics */
  couple:   "Orlando & Sofia",
  names:    { first: "Orlando", second: "Sofia" },
  date:     { iso: "2027-06-12", display: "12 June 2027", displayIt: "12 Giugno 2027" },
  place:    { en: "Bologna, Italy", it: "Bologna, Italia" },

  /* ----------------------------------------------------------- artwork
     Drop files into images/ and name them here. Anything missing is
     skipped silently, so a wrong filename breaks nothing.

     heroMode "overlay" puts the names in the sky at the top of the
                painting, with a light wash behind them. Nothing is cropped.
              "plate"   shows the whole painting below the names instead.
              "cover"   fills the screen behind the names, which crops San
                        Luca and the dancers away on a wide screen.       */
  /* "plate" rather than "overlay". The painting now carries its own paper
     labels: ENGAGED HERE over San Luca, MARRYING HERE (YOU ARE INVITED) over
     the villa, and 12th JUNE VILLA ZARRI along the bottom. Type laid over
     that would land on top of somebody's handwriting, so the painting is
     shown whole and the names sit above it. No caption either: the picture
     names itself now. */
  heroImage: "wedding-hero-with-text.jpeg",
  heroMode:  "plate",
  heroCaption: null,

  /* true  -> the painting has the first screen to itself and the names
              arrive as you scroll down to them
     false -> the names sit above the painting, both visible on landing   */
  heroTextBelow: true,

  /* The bride and groom, cut out of the painting, sat beside the names in
     the top bar. Small: it is drawn at 30px, so a busy crop turns to mush. */
  brandMark: "dancing-bride-groom.png",

  /* Single dancers, cut out of the painting. One sits beside each section
     heading, cycling through this list. A white background is fine: it is
     blended away against the page, so plain crops work.                  */
  motifs: [
    "dancing-bride-groom.png",
    "dancing-jump.png",
    "dancing-kick.png",
    "dancing-skank.png",
    "dancing-upsidedown.png"
  ],

  /* The row of dancers. Shown twice: closing the running order, and again
     under the RSVP button. */
  dancerStrip: "dancing-row.png",

  /* The band that closes the page, under the RSVP section. Full width of
     the browser, edge to edge, so give it a wide crop. Leave the name here
     and drop the file into images/; until it is there the footer simply
     starts at the initials. */
  bannerImage: "wedding-san-luca-banner-wide.jpg",
  bannerAlt:   { en: "San Luca above Bologna", it: "San Luca sopra Bologna" },

  /* ------------------------------------------------------------------ GATE
     A soft gate. It stops casual browsing and search engines, nothing more:
     the password sits in this file, which anyone can read via View Source.
     Treat it as a "not for strangers" sign, not as security.

     enabled         false turns the gate off entirely
     password        what most guests type (case and spaces are ignored)
     fridayPassword  same, and also shows the Friday pre-drinks card
     hint            shown under the field, optional, leave "" to hide

     Guests who arrive on a link ending ?k=baci or ?k=spritz skip the gate,
     with whatever that password carries. Put the right one on each invite
     and nobody has to type anything.                                       */
  gate: {
    enabled:  true,
    /* Two passwords, both opening the same site. `password` is what most
       guests get. `fridayPassword` opens the site AND shows the Friday
       pre-drinks card in When and Where, so the one word you send decides
       which version of the day someone sees. Change either freely.
       Neither is a secret: this file is public. */
    password:       "baci",
    fridayPassword: "spritz",
    /* title, blurb and hint were removed on request. main.js omits each of
       them when the key is absent, so the card closes up cleanly. Add any
       of them back as { en: "...", it: "..." } and it reappears. */
    label:    { en: "Password", it: "Password" },
    /* Not shown. The button renders an arrow; this is its accessible name,
       so a screen reader announces "Enter", not "button". */
    button:   { en: "Enter", it: "Entra" },
    wrong:    { en: "Not quite. Try again, or text us.",
                it: "Non è questa. Riprova, o scrivici." }
  },

  /* ------------------------------------------------------------------ RSVP
     mode: "link"  -> a button pointing at joyUrl (keeps Joy's guest list,
                      meal choices, reminders and +1 logic working)
     mode: "form"  -> the built-in form on this site, posting to your own
                      Google Sheet. Read apps-script/README.md first, then
                      paste the deployed Web App URL into endpoint.
     The form refuses to submit while endpoint is empty, so no reply can
     ever be silently lost.                                                  */
  rsvp: {
    mode:     "link",
    joyUrl:   "https://withjoy.com/orlando-and-sofia/rsvp",
    endpoint: "",
    deadline: { en: "Please RSVP by 31 January 2027",
                it: "Ti chiediamo di confermare entro il 31 Gennaio 2027" }
  },

  /* -------------------------------------------------------------- nav order
     Each id must match a section id below. Reorder or delete freely.        */
  nav: [
    { id: "when",      label: { en: "When & Where", it: "Quando e Dove" } },
    { id: "order",     label: { en: "Schedule",     it: "Programma" } },
    { id: "dress",     label: { en: "Dress Code",   it: "Dress Code" } },
    { id: "transport", label: { en: "Transport",    it: "Trasporti" } },
    { id: "stay",      label: { en: "Stay",         it: "Dormire" } },
    { id: "faq",       label: { en: "Q & A",        it: "Q & A" } },
    { id: "gifts",     label: { en: "Gifts",        it: "Regali" } },
    { id: "bologna",   label: { en: "Bologna",      it: "Bologna" } }
  ],

  /* --------------------------------------------------------- when and where */
  when: {
    title: { en: "When and Where", it: "Quando e Dove" },
    events: [
      {
        /* Hidden by default. Shown to whoever came in on gate.fridayPassword,
           or on a link carrying ?f=11. See the Friday block in main.js. */
        id:      "friday",
        day:     { en: "Friday, 11 June 2027", it: "Venerdì 11 Giugno 2027" },
        name:    { en: "Welcome Drinks",       it: "Aperitivo di benvenuto" },
        time:    { en: "16:00 to 21:00", it: "dalle 16:00 alle 21:00" },
        address: { en: "Via Santo Stefano, 40125 Bologna BO, Italy",
                   it: "Via Santo Stefano, 40125 Bologna BO, Italia" },
        dress:   { en: "Casual, whatever your heart desires",
                   it: "Casual, come desideri" },
        note: {
          en: "For those of you travelling from out of town, we're hosting a small welcome drinks in the heart of Bologna. There will be some food (!) but we would not count this as dinner.",
          it: "Per chi arriva da fuori città, organizziamo un piccolo aperitivo di benvenuto nel cuore di Bologna. Ci sarà qualcosa da mangiare (!) ma non consideratelo una cena."
        },
        cal: { start: "2027-06-11T16:00:00", end: "2027-06-11T21:00:00" }
      },
      {
        day:     { en: "Saturday, 12 June 2027", it: "Sabato 12 Giugno 2027" },
        name:    { en: "Ceremony and Reception", it: "Cerimonia e ricevimento" },
        time:    { en: "From 15:30", it: "Dalle 15:30" },
        venue:   "Villa Zarri",
        address: { en: "Via Ronco, 1, 40013 Castel Maggiore BO, Italy",
                   it: "Via Ronco, 1, 40013 Castel Maggiore BO, Italia" },
        dress:   { en: "Summer Chic & Colourful", it: "Chic Estivo & Colorato" },
        /* The end time is off the card on purpose. The calendar file still
           runs to 23:30 so the .ics blocks out the whole evening. */
        cal: { start: "2027-06-12T15:30:00", end: "2027-06-12T23:30:00" }
      }
    ]
  },

  /* --------------------------------------------------------- order of events
     Joy wrote the event names in English only. Where an Italian line
     existed under one, it is kept below.                                   */
  order: {
    title:    { en: "Order of Events", it: "Programma della giornata" },
    subtitle: { en: "Saturday, 12 June 2027 · Villa Zarri",
                it: "Sabato 12 Giugno 2027 · Villa Zarri" },
    items: [
      { time: "16:00", name: { en: "Arrival", it: "Arrivo" },
        note: { en: "Guests are welcome from 15:30.",
                it: "Gli ospiti sono benvenuti dalle 15:30." } },
      { time: "16:30", name: { en: "Ceremony", it: "Cerimonia" },
        note: { en: "The bit where we say “sì”.",
                it: "Quando diciamo “sì”." } },
      { time: "18:00", name: { en: "Aperitivo", it: "Aperitivo" },
        note: { en: "Aperol, nibbles and “ciao” to the newly married couple.",
                it: "Aperol, stuzzichini e chiacchiere con gli sposi." } },
      { time: "19:30", name: { en: "Dinner", it: "Cena" },
        note: { en: "La cena is served!", it: "La cena è servita!" } },
      { time: "21:00", name: { en: "Dance Floor", it: "Pista da ballo" },
        /* English in both. The line does not survive translation. */
        note: { en: "Dance to the moon and back!",
                it: "Dance to the moon and back!" } },
      { time: "00:00", name: { en: "Late Night Snacks", it: "Spuntino di mezzanotte" },
        note: { en: "A little something to fuel more dancing before saying good night.",
                it: "Uno spuntino per ricaricare le danze prima della buonanotte." } },
      { time: "03:00", name: { en: "Carriages", it: "Si torna a casa" },
        note: { en: "Sweet dreams", it: "Sogni d'oro" } }
    ]
  },

  /* ---------------------------------------------------------------- dress code */
  dress: {
    title: { en: "Dress Code", it: "Dress Code" },
    lead:  { en: "Summer Chic & Colourful", it: "Chic Estivo & Colorato" },
    body: {
      en: [
        "The guide dress code is Summer Chic & Colourful. Think linen suits and summer dresses on a hot Italian summer day. We want everyone to be comfortable, colourful, and happy. We honestly don't mind if you wear a tie or not, or if you don't want to wear heels. We only ask that you don't wear T-shirts, trainers or blue jeans.",
        "A few things to keep in mind: It is likely to be very hot and the floor is mainly grass, so consider this when choosing your fabric and shoes.",
        "If you're not sure, drop us a text."
      ],
      it: [
        "Il dress code consigliato è: Chic Estivo & Colorato. Immaginate completi in lino e abiti estivi da indossare durante una calda giornata d’estate italiana. Vogliamo che tutti si sentano a proprio agio, eleganti, colorati e felici.",
        "Non ci importa se scegliete di indossare la cravatta oppure no, o se preferite evitare i tacchi. Vi chiediamo solo di non indossare magliette, scarpe da ginnastica o jeans .",
        "Alcune cose da tenere a mente: È molto probabile che faccia caldo e gran parte della location sarà su prato, quindi vi consigliamo di tenerne conto nella scelta dei tessuti e delle scarpe.",
        "Se avete dubbi, scriveteci pure un messaggio."
      ]
    }
  },

  /* ----------------------------------------------------------------- transport */
  transport: {
    title: { en: "Transport", it: "Trasporti" },
    blocks: [
      {
        heading: { en: "Shuttle:", it: "Navetta:" },
        body: {
          en: ["We are looking to organize a few shuttles, more information to follow..."],
          it: ["Stiamo organizzando alcune navette, seguiranno maggiori informazioni..."]
        }
      },
      {
        heading: { en: "Taxis:", it: "Taxi:" },
        body: {
          en: ["We would encourage you to book a taxi in advance, but there are also available apps that will allow you to call it at the time you need it."],
          it: ["Vi consigliamo di prenotare taxi in anticipo utilizzando i numeri di telefono qui sotto. Altrimenti, potete utilizzare alcune app per chiamare un taxi direttamente al momento del bisogno."]
        },
        phones: [
          { name: "Taxi Co.Ta.Bo",    number: "+39 051372727" },
          { name: "Radio Taxi",       number: "+39 0514590"   },
          { name: "Autoblu Cosepuri", number: "+39 051519090" }
        ],
        apps: [
          { name: "BTaxi",   url: "https://www.cotabo.it/clienti/servizi/btaxi/" },
          { name: "IT Taxi", url: "https://ittaxi.it/" }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------ places to stay
     The hotel links go to the Joy accommodation pages, which is where the
     group rate and the ORLANDO-SOFIA code actually live.                    */
  stay: {
    title: { en: "Places to Stay", it: "Dove alloggiare" },
    intro: {
      en: ["We've sorted guest accommodation through Joy. To ensure your stay is included with the wedding group, please book one of the hotel options below using the wedding code ORLANDO-SOFIA."],
      it: ["Abbiamo organizzato gli alloggi tramite Joy. Per essere inseriti nel gruppo del matrimonio, prenotate una delle strutture qui sotto usando il codice ORLANDO-SOFIA."]
    },
    hotels: [
      { name: "Hotel Brun",                km: 7.6, url: "https://withjoy.com/orlando-and-sofia/accommodation-place/96d47209-7d34-465e-826f-daa324b47ddc" },
      { name: "Hotel Touring Bologna",     km: 8.0, url: "https://withjoy.com/orlando-and-sofia/accommodation-place/8c21ca0c-f5f4-43b9-9cce-958410b7df87" },
      { name: "Saragozza Apartments",      km: 8.0, url: "https://withjoy.com/orlando-and-sofia/accommodation-place/c7d95b56-0339-47bf-9799-0e860990a09a" },
      { name: "Residence Porta Saragozza", km: 8.2, url: "https://withjoy.com/orlando-and-sofia/accommodation-place/0f0d8688-9300-4298-b171-162b4a656488" },
      { name: "Hotel Porta San Mamolo",    km: 8.2, url: "https://withjoy.com/orlando-and-sofia/accommodation-place/743384be-52f2-4cae-b74f-ca43629975c8" },
      { name: "Hotel Cavour",              km: 7.1, url: "https://withjoy.com/orlando-and-sofia/accommodation-place/fe46fe94-33a3-4720-91ce-cb5bd18c66e1" },
      { name: "Art Hotel Orologio",        km: 7.4, url: "https://withjoy.com/orlando-and-sofia/accommodation-place/832b2412-5321-47b8-a29a-39c0b1edf59f" },
      { name: "Hotel Metropolitan",        km: 6.9, url: "https://withjoy.com/orlando-and-sofia/accommodation-place/465e7038-b3f2-46fe-9f21-a2b328b353d6" }
    ]
  },

  /* ----------------------------------------------------------------------- faq */
  faq: {
    title: { en: "Q & A", it: "Q & A" },
    items: [
      {
        q: { en: "What’s the RSVP deadline?", it: "Entro quando bisogna dare conferma?" },
        a: { en: ["Please RSVP by November 1."],
             it: ["Ti chiediamo di confermare la tua presenza entro l'1 Novembre."] },
        /* Joy's answer ended "Click here to RSVP" as a link. */
        link: { en: "Click here to RSVP", it: "Clicca qui per rispondere all’invito" }
      },
      {
        q: { en: "Can I bring a plus one?", it: "Posso portare un plus one?" },
        a: { en: ["We're sadly unable to welcome additional guests beyond those mentioned with your invitation."],
             it: ["Purtroppo non possiamo accogliere ulteriori ospiti oltre a quelli già indicati nel tuo invito."] }
      },
      {
        q: { en: "Can I bring my children?", it: "Posso portare bambini?" },
        a: { en: ["As much as we adore your little ones, we are unable to accommodate children on our wedding day with the exception of babes in arms."],
             it: ["Per quanto adoriamo i vostri piccoli, non potremo accogliere bambini il giorno del nostro matrimonio, fatta eccezione per i neonati in braccio."] }
      },
      {
        q: { en: "Where should I park?", it: "Dove posso parcheggiare?" },
        a: { en: ["There’s free parking inside the entrance to Zarri."],
             it: ["Villa Zarri offre un parcheggio all'interno."] }
      },
      {
        q: { en: "What will the weather be like?", it: "Come sarà il tempo?" },
        a: { en: ["Italy in June is likely to be generally warm (25°C - 35°C). But it should be much cooler by the afternoon. Maybe..."],
             it: ["In italia in Giugno è generalmente caldo (25°C - 35°C). Ma dovrebbe rinfrescarsi nel tardo pomeriggio. Forse..."] }
      },
      {
        q: { en: "Is the wedding indoors or outdoors?", it: "L'evento sarà all'interno o all'esterno?" },
        a: { en: ["Our ceremony, reception and dinner will be outdoors. Should it rain, we have a plan B to be inside."],
             it: ["Cerimonia, aperitivo e cena saranno all'aperto. Il piano B è all'interno qualora piovesse."] }
      },
      {
        q: { en: "How do I get to and from the venue?", it: "Come raggiungere la location e come rientrare dopo l’evento?" },
        a: {
          en: [
            "Villa Zarri is located just outside Bologna, a short journey from the city centre.",
            "[Via Ronco 1, 40013, Castel Maggiore, BO]",
            "By taxi: A taxi from Bologna city centre to Villa Zarri takes around 15-20 minutes, depending on traffic.",
            "Uber: Uber is available in Bologna, but only Uber Black (a high-end, premium service) operates in the city. It is therefore more expensive than a standard taxi."
          ],
          it: [
            "Villa Zarri si trova appena fuori Bologna, a pochi minuti dal centro città.",
            "[Via Ronco 1, 40013, Castel Maggiore, BO]",
            "In taxi: dal centro di Bologna, il tragitto in taxi dura circa 15-20 minuti, a seconda del traffico.",
            "Uber: Uber è disponibile a Bologna, ma offre esclusivamente il servizio Uber Black, un’opzione premium e quindi più costosa rispetto a un normale taxi."
          ]
        }
      },
      {
        q: { en: "Which airport should I fly into?", it: "Qual è l’aeroporto più comodo per arrivare?" },
        a: { en: ["Bologna Guglielmo Marconi Airport - 20 mins drive to the city centre."],
             it: ["Bologna Guglielmo Marconi Airport - 20 mins in macchina per arrivare in centro."] }
      }
    ]
  },

  /* ----------------------------------------------------------------- gift list */
  gifts: {
    title: { en: "Gift List", it: "Regali" },
    body: {
      en: [
        "We mean this: having you with us on the day is a gift in itself and we don't expect any additional contributions. We appreciate the efforts and resources you are investing to celebrate in Bologna.",
        "However, if you still feel like this is not enough and wish to contribute to our honeymoon, our details are as follows:"
      ],
      it: [
        "Lo diciamo davvero: avervi con noi in questa giornata è il regalo di per sé e non ci aspettiamo altro. Apprezziamo lo sforzo e le risorse impiegate per festeggiarci a Bologna.",
        "Se però pensate che questo non sia abbastanza davvero e desiderate contribuire al nostro viaggio di nozze, qui sotto trovate i nostri riferimenti:"
      ]
    },
    /* Fill these in when you are ready. Any row left empty is hidden. */
    bank: [
      { label: { en: "Account name", it: "Intestatario" }, value: "" },
      { label: { en: "IBAN",         it: "IBAN"         }, value: "" },
      { label: { en: "BIC / SWIFT",  it: "BIC / SWIFT"  }, value: "" }
    ]
  },

  /* ------------------------------------------------------------------- bologna
     Joy wrote this page in English only.                                     */
  bologna: {
    title:   { en: "Spending time in Bologna", it: "Passare del tempo a Bologna" },
    kicker:  { en: "Living like a local", it: "Vivere come un bolognese" },

    /* The painting of Via Saragozza, shown beside the heading. Drop the
       file into images/ under this name. Missing file = quietly skipped. */
    image:        "via-saragozza.webp",
    imageCaption: { en: "Via Saragozza, Orlando & Sofia on the way up to San Luca",
                    it: "Via Saragozza, Orlando & Sofia salendo verso San Luca" },

    intro: {
      en: [
        "Bologna is a very special place for us. We come back regularly during the year, it's a second home and we are lucky to have many friends there. It's also the place where Orlando proposed.",
        "Immerse through the “portici”, walk around with a gelato, do a coffee scroll through bars of the city centre. We would love for you to enjoy the city as much as we do."
      ],
      it: [
        "Bologna è un posto molto speciale per noi. Ci torniamo spesso durante l'anno, è una seconda casa e siamo fortunati ad avere tanti amici ad accoglierci. È anche il posto dove Orlando ha fatto la proposta.",
        "Perdetevi sotto i portici, passeggiate con un gelato in mano, fate il giro dei bar del centro per un caffè. Ci piacerebbe che vi godeste la città quanto noi."
      ]
    },
    /* A strip of squares under the intro. Auto-scrolls, drags and swipes,
       and nothing is clickable. Drop your own photos in over these files,
       keeping the names, and nothing else needs changing. Square crops:
       anything else is centre-cropped to a square by CSS. A missing file
       drops out of the strip rather than showing a broken icon, and an
       empty list removes the strip altogether. */
    carousel: {
      alt:    { en: "Orlando and Sofia", it: "Orlando e Sofia" },
      images: ["story-1.png", "story-2.png", "story-3.png",
               "story-4.png", "story-5.png", "story-6.png"]
    },

    places: [
      { icon: "🍝", name: "Quadrilatero",
        text: { en: "The old market at the centre of Bologna. Explore Via Pescherie Vecchie, Via Clavature and Via degli Orefici for fresh pasta shops, delis, wine bars and tiny food stalls.",
               it: "L'antico mercato nel cuore di Bologna. Esplorate Via Pescherie Vecchie, Via Clavature e Via degli Orefici tra pastifici, salumerie, enoteche e piccoli banchi di cibo." } },
      { icon: "🥖", name: "Atti",
        text: { en: "A true Bolognese institution for bread, focaccia and traditional baked goods.",
               it: "Una vera istituzione bolognese per pane, focaccia e prodotti da forno tradizionali." } },
      { icon: "🍫", name: "Gilberto",
        text: { en: "For something a little more unexpected: chocolate tortellini. A playful Bolognese specialty.",
               it: "Per qualcosa di più inaspettato: i tortellini di cioccolato." } },
      { icon: "🏛️", name: "Piazza Santo Stefano & Le Sette Chiese",
        text: { en: "Probably one of the most magical corners of Bologna. Sit on the steps, wander through the Sette Chiese, and take your time.",
               it: "Probabilmente uno degli angoli più magici di Bologna. Sedetevi sui gradini, girate tra le Sette Chiese." } },
      { icon: "🌿", name: "Via d’Azeglio",
        text: { en: "An elegant porticoed street leading from Piazza Maggiore towards the hills.",
               it: "Un'elegante strada porticata che da Piazza Maggiore porta verso i colli." } },
      { icon: "✡️", name: { en: "The Jewish Ghetto", it: "Il Ghetto Ebraico" },
        text: { en: "Wander through the narrow streets around Via dell'Inferno, Via de' Giudei and Vicolo San Giobbe. One of the quietest and most atmospheric parts of the historic centre.",
               it: "Girate tra le vie strette attorno a Via dell'Inferno, Via de' Giudei e Vicolo San Giobbe. Una delle zone più tranquille e suggestive del centro storico." } },
      { icon: "❤️", name: "Piazza Maggiore & Piazza del Nettuno",
        text: { en: "The very heart of Bologna. Start here, admire San Petronio, then simply wander into the streets around it.",
               it: "Il cuore di Bologna. Partite da qui, ammirate San Petronio, poi perdetevi nelle strade intorno." } },
      { icon: "📚", name: "Libreria.coop Ambasciatori",
        text: { en: "A beautiful old market space turned into a bookshop, food hall and cultural spot.",
               it: "Un vecchio e bellissimo mercato trasformato in libreria, spazio gastronomico e luogo di cultura." } },
      { icon: "💧", name: "La Finestrella di Via Piella",
        text: { en: "A tiny window onto Bologna's hidden canals.",
               it: "Una piccola finestra sui canali nascosti di Bologna." } },
      { icon: "🗼", name: "Torre Prendiparte",
        text: { en: "One of Bologna's medieval towers, tucked quietly into the historic centre.",
               it: "Una delle torri medievali di Bologna, nascosta nel centro storico." } },
      { icon: "🏰", name: "Le Due Torri",
        text: { en: "The symbol of Bologna. Walk around Piazza di Porta Ravegnana and look up - then get lost in the streets beyond.",
               it: "Il simbolo di Bologna. Fate il giro di Piazza di Porta Ravegnana e guardate in alto." } },
      { icon: "🍷", name: "Via del Pratello",
        text: { en: "A favourite for an aperitivo or a late-night drink. Less polished, more lively, and very Bolognese.",
               it: "Una via piena di vita (e un po’ alternativa). Perfetta per un aperitivo o un bicchiere a tarda notte." } },
      { icon: "🌺", name: { en: "The hidden courtyards", it: "I cortili nascosti" },
        text: { en: "One of the best things to do in Bologna is to look through open doorways. Behind the façades you'll find quiet courtyards, little gardens, cloisters and unexpected pockets of green.",
               it: "Una delle cose più belle da fare a Bologna è sbirciare dai portoni aperti. Dietro le facciate trovate cortili silenziosi, piccoli giardini, chiostri e angoli di verde inaspettati." } },
      /* `flourish` is drawn as its own pull-quote, with the ring animated.
         Delete the key and it becomes an ordinary sentence again. */
      { icon: "🌅", name: "San Luca", feature: true,
        text: { en: "A little outside the centre, but absolutely worth the journey. Make sure to wear trainers and walk from Porta Saragozza beneath the world's longest portico, all the way up to the sanctuary. At the top, Bologna unfolds below you. (About 1h round trip walking)",
               it: "Un po' fuori dal centro, ma vale assolutamente la camminata. Munitevi di scarpe da ginnastica e salite da Porta Saragozza sotto il portico più lungo del mondo, fino al santuario. In cima, Bologna si apre sotto di voi. (Circa un’oretta andata e ritorno)" },
        flourish: { en: "But more importantly it's where Orlando popped the question 💍 👰🏻‍♀️",
               it: "Ma soprattutto è dove Orlando ha fatto la fatidica domanda 💍 👰🏻‍♀️" } },
      { icon: "📚", name: { en: "The Archiginnasio Courtyard", it: "Il cortile dell'Archiginnasio" },
        text: { en: "Step inside the beautiful courtyard of the Archiginnasio, Bologna's historic university building, and look up at the walls and ceilings covered in hundreds of painted and carved coats of arms.",
               it: "Entrate nel bellissimo cortile dell'Archiginnasio, l'antica sede dell'università di Bologna, e guardate in alto: pareti e soffitti sono coperti da centinaia di stemmi dipinti e scolpiti." } },
      { icon: "🌿", name: { en: "I Colli, The Bologna Hills", it: "I Colli" },
        text: { en: "If you have a car, take a drive through the hills around Bologna - winding roads, greenery and stunning views over the city. Explore around San Luca, Via di Casaglia, Parco Cavaioni and San Michele in Bosco.",
               it: "Se avete la macchina, fate un giro sui colli intorno a Bologna: strade tortuose, verde e viste bellissime sulla città. Esplorate tra San Luca, Via di Casaglia, Parco Cavaioni e San Michele in Bosco." } }
    ],

    foodTitle: { en: "Our Favourite Food & Drinks Spots",
                it: "I nostri posti preferiti per mangiare e bere" },

    /* Three of these had real links on Joy and they are kept below.
       Anything without a `url` falls back to a Google Maps search for the
       name in Bologna, which is what a guest wants anyway. Paste a real
       URL over the top whenever you have one.                            */
    food: [
      { name: "Bottega Ranocchi",            note: { en: "Old deli style shop serving aperitif from their grocery",
                                              it: "Antica bottega in un angolo storico della città, per un aperitivo servito con prodotti locali." } },
      { name: "Mercato di Mezzo",            note: { en: "Market style food hall",
                                              it: "Mercato coperto con diversi tavoli e diversi tipi di cibo." } },
      { name: "Antica Osteria Romagnola",    note: { en: "Traditional osteria, proudly Bolognese, classic local dishes",
                                              it: "Osteria tradizionale, orgogliosamente bolognese, piatti classici del posto" } },
      { name: "Va Mo Là",                    note: { en: "An old library become restaurant",
                                              it: "Una vecchia libreria diventata ristorante" } },
      { name: "Berberè",                     note: { en: "Good pizza!",
                                              it: "Ottima pizza!" } },
      { name: "Cremeria Santo Stefano",      note: { en: "Gelato!!",
                                              it: "Gelato!!" },
        url: "https://www.instagram.com/cremeriasantostefano/" },
      { name: "Corner Bar",                  note: { en: "Favourite coffee and breakfast",
                                              it: "Caffè e colazione preferiti" } },
      { name: "Trattoria da me nella torre", note: { en: "Revisited traditional dishes inside an old tower",
                                              it: "Piatti tradizionali rivisitati dentro un'antica torre" } },
      { name: "Sorbole Que Tapas",           note: { en: "Lively aperitif spot",
                                              it: "Posto vivace per l'aperitivo" } },
      { name: "Le Moline",                   note: { en: "Eating traditional bolognese food al fresco",
                                              it: "Cucina bolognese tradizionale all'aperto" } },
      { name: "Le Stanze",                   note: { en: "For a drink immersed in history",
                                              it: "Per un drink immersi nella storia" } },
      { name: "Fienile Fluò",                note: { en: "For a meal on the hills of Bologna",
                                              it: "Per una cena sui colli di Bologna" } },
      { name: "Le Serre dei Giardini Margherita", note: { en: "Coffee or drinks in a greenhouse of the city park",
                                              it: "Caffè o drink in una serra nel parco della città" } },
      { name: "Spaccio Belfiore",            note: { en: "For a drink on the hills",
                                              it: "Per un drink sui colli" },
        url: "https://www.instagram.com/lospaccio_belfiore/" },
      { name: "Ristorante Biagi",            note: { en: "For a super traditional Bolognese meal and a secret garden",
                                              it: "Per un pasto bolognese super tradizionale e un giardino segreto" } },
      { name: "Casa Minghetti",              note: { en: "Coffee or aperitif - you go for the square!",
                                              it: "Caffè o aperitivo, ci vai per la piazza!" },
        url: "https://www.instagram.com/casaminghettibologna/" }
    ]
  },

  /* ---------------------------------------------------------------- ui strings */
  ui: {
    /* RSVP in both. "Conferma la presenza" is correct Italian and three times
       the width, which pushed the nav into a scroll on every Italian phone.
       The initialism is understood either way. */
    rsvpNow:     { en: "RSVP",              it: "RSVP" },
    appsLabel:   { en: "Apps to download on your smartphone:",
                   it: "App da scaricare sullo smartphone:" },
    addToCal:    { en: "Add to Calendar",   it: "Aggiungi al calendario" },
    directions:  { en: "Directions",        it: "Indicazioni" },
    dressLabel:  { en: "Dress code",        it: "Dress code" },
    searchStay:  { en: "Search rooms",      it: "Cerca camere" },
    formName:    { en: "Full name",         it: "Nome e cognome" },
    formEmail:   { en: "Email",             it: "Email" },
    formAttend:  { en: "Will you be there?",it: "Ci sarai?" },
    formYes:     { en: "Joyfully accept",   it: "Ci sarò" },
    formNo:      { en: "Regretfully decline", it: "Non potrò esserci" },
    formGuests:  { en: "Number in your party", it: "Quante persone" },
    formDiet:    { en: "Dietary requirements", it: "Esigenze alimentari" },
    formMessage: { en: "Anything else?",    it: "Altro?" },
    formSend:    { en: "Send",              it: "Invia" },
    formSending: { en: "Sending",           it: "Invio in corso" },
    formThanks:  { en: "Thank you, we have it.", it: "Grazie, ricevuto." },
    formError:   { en: "That did not send. Please text us instead.", it: "Invio non riuscito. Scriveteci un messaggio." },
    formOff:     { en: "This form is not connected yet. Please text us and we will add you.", it: "Questo modulo non è ancora attivo. Scriveteci un messaggio e vi aggiungiamo." }
  }
};
