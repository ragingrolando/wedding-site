/* ==========================================================================
   content.js  —  Everything you will ever need to edit lives in this file.
   No HTML knowledge required. Change the text between the quotes, commit,
   and the site updates in about a minute.

   Every piece of text can be bilingual:
       { en: "English text", it: "Testo italiano" }
   If you leave `it` out, the English is shown to Italian readers too.
   ========================================================================== */

const SITE = {

  /* ---------------------------------------------------------------- basics */
  couple:   "Orlando & Sofia",
  names:    { first: "Orlando", second: "Sofia" },
  date:     { iso: "2027-06-12", display: "12 June 2027", displayIt: "12 Giugno 2027" },
  place:    { en: "Bologna, Italy", it: "Bologna, Italia" },

  /* Hero photo. Drop a file into images/ and put its name here.
     Leave as "" to fall back to a plain colour wash. */
  heroImage: "",

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
    deadline: { en: "Please RSVP by 1 November",
                it: "Ti chiediamo di confermare entro l'1 Novembre" }
  },

  /* -------------------------------------------------------------- nav order
     Each id must match a section id below. Reorder or delete freely.        */
  nav: [
    { id: "when",      label: { en: "When & Where", it: "Quando e Dove" } },
    { id: "order",     label: { en: "Schedule",     it: "Programma" } },
    { id: "dress",     label: { en: "Dress Code",   it: "Dress Code" } },
    { id: "transport", label: { en: "Transport",    it: "Trasporti" } },
    { id: "stay",      label: { en: "Stay",         it: "Dormire" } },
    { id: "faq",       label: { en: "Q & A",        it: "Domande" } },
    { id: "gifts",     label: { en: "Gifts",        it: "Regali" } },
    { id: "bologna",   label: { en: "Bologna",      it: "Bologna" } }
  ],

  /* --------------------------------------------------------- when and where */
  when: {
    title: { en: "When and Where", it: "Quando e Dove" },
    events: [
      {
        day:     { en: "Friday, 11 June 2027", it: "Venerdì 11 Giugno 2027" },
        name:    { en: "Pre-Game Drinks",      it: "Aperitivo di Benvenuto" },
        time:    "16:00 to 21:00",
        address: "Via Santo Stefano, 40125 Bologna BO, Italy",
        dress:   { en: "Casual, whatever your heart desires",
                   it: "Casual, come desideri" },
        note: {
          en: "For those of you travelling from out of town, we're hosting a small welcome drinks in the heart of Bologna. There will be some food (!) but we would not count this as dinner.",
          it: "Per chi arriva da fuori città, organizziamo un piccolo aperitivo di benvenuto nel centro di Bologna. Ci sarà qualcosa da mangiare (!) ma non consideratelo una cena."
        },
        cal: { start: "2027-06-11T16:00:00", end: "2027-06-11T21:00:00" }
      },
      {
        day:     { en: "Saturday, 12 June 2027", it: "Sabato 12 Giugno 2027" },
        name:    { en: "Ceremony and Reception", it: "Cerimonia e Ricevimento" },
        time:    "15:30 to 23:30",
        venue:   "Villa Zarri",
        address: "Via Ronco, 1, 40013 Castel Maggiore BO, Italy",
        dress:   { en: "Summer Chic & Colourful", it: "Chic Estivo & Colorato" },
        note: {
          en: "The ceremony will be kicking off at 16:00.",
          it: "La cerimonia comincerà alle 16:00."
        },
        cal: { start: "2027-06-12T15:30:00", end: "2027-06-12T23:30:00" }
      }
    ]
  },

  /* --------------------------------------------------------- order of events */
  order: {
    title:    { en: "Order of Events", it: "Programma" },
    subtitle: { en: "Saturday, 12 June 2027 · Villa Zarri",
                it: "Sabato 12 Giugno 2027 · Villa Zarri" },
    items: [
      { time: "16:00", name: { en: "Arrival",           it: "Arrivo" },
        note: { en: "Guests are welcome from 15:30.", it: "Gli ospiti sono benvenuti dalle 15:30." } },
      { time: "16:30", name: { en: "Ceremony",          it: "Cerimonia" },
        note: { en: "The bit where we say \"sì\".", it: "Quando diciamo \"sì\"." } },
      { time: "18:00", name: { en: "Aperitivo",         it: "Aperitivo" },
        note: { en: "Aperol, nibbles and \"ciao\" to the newly married couple.", it: "Aperol, stuzzichini e chiacchiere con gli sposi." } },
      { time: "19:30", name: { en: "Dinner",            it: "Cena" },
        note: { en: "La cena is served!", it: "La cena è servita!" } },
      { time: "21:00", name: { en: "Dance Floor",       it: "Si Balla" },
        note: { en: "Dance to the moon and back!", it: "Si balla fino alla luna e ritorno!" } },
      { time: "00:00", name: { en: "Late Night Snacks", it: "Spuntino di Mezzanotte" },
        note: { en: "A little something to fuel more dancing before saying good night.", it: "Uno spuntino per ricaricare le danze prima della buonanotte." } },
      { time: "03:00", name: { en: "Carriages",         it: "Si Torna a Casa" },
        note: { en: "Sweet dreams", it: "Sogni d'oro" } }
    ]
  },

  /* ---------------------------------------------------------------- dress code */
  dress: {
    title: { en: "Dress Code", it: "Dress Code" },
    lead:  { en: "Summer Chic & Colourful", it: "Chic Estivo & Colorato" },
    body: {
      en: [
        "The guide dress code is Summer Chic & Colourful. Think linen suits and summer dresses on a hot italian summer day. We want everyone to be comfortable, colourful, and happy. We honestly don't mind if you wear a tie or not, or if you don't want to wear heels. We only ask that you don't wear T-shirt, trainers or blue jeans.",
        "A few things to keep in mind: it is likely to be very hot and the floor is mainly grass, so consider this when choosing your fabric and shoes.",
        "If you're not sure, drop us a text."
      ],
      it: [
        "Il dress code consigliato è: Chic Estivo & Colorato. Immaginate completi in lino e abiti estivi da indossare durante una calda giornata d'estate italiana. Vogliamo che tutti si sentano a proprio agio, eleganti, colorati e felici.",
        "Non ci importa se scegliete di indossare la cravatta oppure no, o se preferite evitare i tacchi. Vi chiediamo solo di non indossare magliette, scarpe da ginnastica o jeans.",
        "Alcune cose da tenere a mente: è molto probabile che faccia caldo e gran parte della location sarà su prato, quindi vi consigliamo di tenerne conto nella scelta dei tessuti e delle scarpe.",
        "Se avete dubbi, scriveteci pure un messaggio."
      ]
    }
  },

  /* ----------------------------------------------------------------- transport */
  transport: {
    title: { en: "Transport", it: "Come Muoversi" },
    blocks: [
      {
        heading: { en: "Shuttle", it: "Navetta" },
        body: {
          en: ["We are looking to organise a few shuttles, more information to follow."],
          it: ["Stiamo organizzando alcune navette, seguiranno maggiori informazioni."]
        }
      },
      {
        heading: { en: "Taxis", it: "Taxi" },
        body: {
          en: ["We would encourage you to book a taxi in advance, but there are also apps that will let you call one at the time you need it."],
          it: ["Vi consigliamo di prenotare il taxi in anticipo, ma potete anche utilizzare alcune app per richiederne uno direttamente al momento del bisogno."]
        },
        phones: [
          { name: "Taxi Co.Ta.Bo",    number: "+39 051372727" },
          { name: "Radio Taxi",       number: "+39 0514590"   },
          { name: "Autoblu Cosepuri", number: "+39 051519090" }
        ],
        apps: ["BTaxi", "IT Taxi"]
      }
    ]
  },

  /* ------------------------------------------------------------ places to stay */
  stay: {
    title: { en: "Places to Stay", it: "Dove Dormire" },
    intro: {
      en: ["We have pulled together a shortlist of places we like, all within easy reach of the city centre. Distances below are to Villa Zarri."],
      it: ["Abbiamo raccolto una lista di posti che ci piacciono, tutti facilmente raggiungibili dal centro. Le distanze indicate sono rispetto a Villa Zarri."]
    },
    hotels: [
      { name: "Hotel Cavour",             km: 7.1 },
      { name: "Hotel Metropolitan",       km: 6.9 },
      { name: "Art Hotel Orologio",       km: 7.4 },
      { name: "Hotel Brunelli",           km: 7.6 },
      { name: "Hotel Touring Bologna",    km: 8.0 },
      { name: "Turati Apartments",        km: 8.0 },
      { name: "Saragozza Apartments",     km: 8.2 },
      { name: "Residence Porta Saragozza",km: 8.2 },
      { name: "Hotel Porta San Mamolo",   km: 8.2 }
    ]
  },

  /* ----------------------------------------------------------------------- faq */
  faq: {
    title: { en: "Q & A", it: "Domande e Risposte" },
    items: [
      {
        q: { en: "What's the RSVP deadline?", it: "Entro quando bisogna dare conferma?" },
        a: { en: ["Please RSVP by 1 November."],
             it: ["Ti chiediamo di confermare la tua presenza entro l'1 Novembre."] }
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
        a: { en: ["There's free parking inside the entrance to Villa Zarri."],
             it: ["Villa Zarri offre un parcheggio gratuito all'interno."] }
      },
      {
        q: { en: "What will the weather be like?", it: "Come sarà il tempo?" },
        a: { en: ["Italy in June is likely to be generally warm (25°C to 35°C). But it should be much cooler by the afternoon. Maybe."],
             it: ["In Italia a Giugno fa generalmente caldo (25°C - 35°C). Ma dovrebbe rinfrescarsi nel tardo pomeriggio. Forse."] }
      },
      {
        q: { en: "Is the wedding indoors or outdoors?", it: "L'evento sarà all'interno o all'esterno?" },
        a: { en: ["Our ceremony, reception and dinner will be outdoors. Should it rain, we have a plan B to be inside."],
             it: ["Cerimonia, aperitivo e cena saranno all'aperto. Il piano B è all'interno qualora piovesse."] }
      },
      {
        q: { en: "How do I get to and from the venue?", it: "Come raggiungere la location e come rientrare dopo l'evento?" },
        a: {
          en: [
            "Villa Zarri is located just outside Bologna, a short journey from the city centre. Via Ronco 1, 40013 Castel Maggiore, BO.",
            "By taxi: a taxi from Bologna city centre to Villa Zarri takes around 15 to 20 minutes, depending on traffic.",
            "Uber: Uber is available in Bologna, but only Uber Black (a high-end, premium service) operates in the city. It is therefore more expensive than a standard taxi."
          ],
          it: [
            "Villa Zarri si trova appena fuori Bologna, a pochi minuti dal centro città. Via Ronco 1, 40013 Castel Maggiore, BO.",
            "In taxi: dal centro di Bologna, il tragitto in taxi dura circa 15-20 minuti, a seconda del traffico.",
            "Uber: Uber è disponibile a Bologna, ma offre esclusivamente il servizio Uber Black, un'opzione premium e quindi più costosa rispetto a un normale taxi."
          ]
        }
      },
      {
        q: { en: "Which airport should I fly into?", it: "Qual è l'aeroporto più comodo per arrivare?" },
        a: { en: ["Bologna Guglielmo Marconi Airport, a 20 minute drive to the city centre."],
             it: ["Bologna Guglielmo Marconi Airport, 20 minuti in macchina per arrivare in centro."] }
      }
    ]
  },

  /* ----------------------------------------------------------------- gift list */
  gifts: {
    title: { en: "Gift List", it: "Lista Nozze" },
    body: {
      en: [
        "People say this. But we really do mean it: having you with us on the day is a gift in itself and we don't expect any additional contributions. We appreciate the efforts and resources you are investing to celebrate with us in Bologna.",
        "However, if you still feel like this is not enough and wish to contribute to our honeymoon, our details are as follows:"
      ],
      it: [
        "È una cosa che si dice. Ma davvero lo pensiamo: avervi con noi in questa giornata è il regalo di per sé e non ci aspettiamo altro. Apprezziamo lo sforzo e le risorse impiegate per festeggiarci a Bologna.",
        "Se però desiderate comunque farci un regalo, e contribuire al nostro viaggio di nozze, qui sotto trovate i nostri riferimenti:"
      ]
    },
    /* Fill these in when you are ready. Any row left empty is hidden. */
    bank: [
      { label: { en: "Account name", it: "Intestatario" }, value: "" },
      { label: { en: "IBAN",         it: "IBAN"         }, value: "" },
      { label: { en: "BIC / SWIFT",  it: "BIC / SWIFT"  }, value: "" }
    ]
  },

  /* ------------------------------------------------------------------- bologna */
  bologna: {
    title:   { en: "Spending time in Bologna", it: "Passare del tempo a Bologna" },
    kicker:  { en: "Living like a local",      it: "Vivere come un local" },
    intro: {
      en: [
        "Bologna is a very special place for us. We come back regularly during the year, it's a second home and we are lucky to have many friends there. It's also the place where Orlando proposed.",
        "Immerse yourself in the portici, walk around with a gelato, do a coffee crawl through the bars of the city centre. We would love for you to enjoy the city as much as we do."
      ],
      it: [
        "Bologna è un posto molto speciale per noi. Ci torniamo regolarmente durante l'anno, è una seconda casa e siamo fortunati ad avere tanti amici lì. È anche il posto dove Orlando ha fatto la proposta.",
        "Perdetevi sotto i portici, passeggiate con un gelato in mano, fate un giro di caffè per i bar del centro. Ci farebbe piacere che godeste la città quanto la godiamo noi."
      ]
    },
    places: [
      { icon: "🍝", name: "Quadrilatero",
        text: { en: "The old market at the centre of Bologna. Explore Via Pescherie Vecchie, Via Clavature and Via degli Orefici for fresh pasta shops, delis, wine bars and tiny food stalls." } },
      { icon: "🥖", name: "Atti",
        text: { en: "A true Bolognese institution for bread, focaccia and traditional baked goods." } },
      { icon: "🍫", name: "Gilberto",
        text: { en: "For something a little more unexpected: chocolate tortellini. A playful Bolognese speciality." } },
      { icon: "🏛️", name: "Piazza Santo Stefano & Le Sette Chiese",
        text: { en: "Probably one of the most magical corners of Bologna. Sit on the steps, wander through the Sette Chiese, and take your time." } },
      { icon: "🌿", name: "Via d'Azeglio",
        text: { en: "An elegant porticoed street leading from Piazza Maggiore towards the hills." } },
      { icon: "✡️", name: "The Jewish Ghetto",
        text: { en: "Wander through the narrow streets around Via dell'Inferno, Via de' Giudei and Vicolo San Giobbe. One of the quietest and most atmospheric parts of the historic centre." } },
      { icon: "❤️", name: "Piazza Maggiore & Piazza del Nettuno",
        text: { en: "The very heart of Bologna. Start here, admire San Petronio, then simply wander into the streets around it." } },
      { icon: "📚", name: "Libreria.coop Ambasciatori",
        text: { en: "A beautiful old market space turned into a bookshop, food hall and cultural spot." } },
      { icon: "💧", name: "La Finestrella di Via Piella",
        text: { en: "A tiny window onto Bologna's hidden canals." } },
      { icon: "🗼", name: "Torre Prendiparte",
        text: { en: "One of Bologna's medieval towers, tucked quietly into the historic centre." } },
      { icon: "🏰", name: "Le Due Torri",
        text: { en: "The symbol of Bologna. Walk around Piazza di Porta Ravegnana and look up, then get lost in the streets beyond." } },
      { icon: "🍷", name: "Via del Pratello",
        text: { en: "A favourite for an aperitivo, an informal dinner or a late-night drink. Less polished, more lively, and very Bolognese." } },
      { icon: "🌺", name: "The hidden courtyards",
        text: { en: "One of the best things to do in Bologna is to look through open doorways. Behind the facades you'll find quiet courtyards, little gardens, cloisters and unexpected pockets of green." } },
      { icon: "🌅", name: "San Luca",
        text: { en: "A little outside the centre, but absolutely worth the journey. Walk from Porta Saragozza beneath the world's longest portico, all the way up to the sanctuary. At the top, Bologna unfolds below you. But more importantly it's where Orlando popped the question 💍" } },
      { icon: "📚", name: "The Archiginnasio Courtyard",
        text: { en: "Step inside the beautiful courtyard of the Archiginnasio, Bologna's historic university building, and look up at the walls and ceilings covered in hundreds of painted and carved coats of arms." } },
      { icon: "🌿", name: "I Colli, the Bologna Hills",
        text: { en: "If you have a car, take a drive through the hills around Bologna: winding roads, greenery and stunning views over the city. Explore around San Luca, Via di Casaglia and San Michele in Bosco." } }
    ],
    foodTitle: { en: "Our favourite food & drink spots", it: "I nostri posti preferiti per mangiare e bere" },
    food: [
      { name: "Bottega Ranocchi",             note: "Old deli style shop serving aperitivo from their grocery" },
      { name: "Mercato di Mezzo",             note: "Market style food hall" },
      { name: "Antica Osteria Romagnola",     note: "Traditional osteria, proudly Bolognese, classic local dishes" },
      { name: "Va Mo Là",                     note: "An old library turned restaurant" },
      { name: "Berberè",                      note: "Good pizza!" },
      { name: "Cremeria Santo Stefano",       note: "Gelato!!" },
      { name: "Corner Bar",                   note: "Favourite coffee and breakfast" },
      { name: "Trattoria da me nella torre",  note: "Revisited traditional dishes inside an old tower" },
      { name: "Sorbole Que Tapas",            note: "Lively aperitivo spot" },
      { name: "Le Moline",                    note: "Eating traditional Bolognese food al fresco" },
      { name: "Le Stanze",                    note: "For a drink immersed in history" },
      { name: "Fienile Fluò",                 note: "For a meal on the hills of Bologna" },
      { name: "Le Serre dei Giardini Margherita", note: "Coffee or drinks in a greenhouse of the city park" },
      { name: "Spaccio Belfiore",             note: "For a drink on the hills" },
      { name: "Ristorante Biagi",             note: "For a super traditional Bolognese meal and a secret garden" },
      { name: "Casa Minghetti",               note: "Coffee or aperitivo, you go for the square!" }
    ]
  },

  /* ---------------------------------------------------------------- ui strings */
  ui: {
    rsvpNow:     { en: "RSVP",              it: "Conferma la presenza" },
    appsLabel:   { en: "Apps to download", it: "App da scaricare" },
    addToCal:    { en: "Add to calendar",   it: "Aggiungi al calendario" },
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
