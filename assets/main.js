/* ==========================================================================
   main.js — renders the page from assets/content.js.
   You should not need to touch this file to change wording or ordering.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------ language */
  var LANGS = ["en", "it"];
  var lang = (function () {
    try { var s = localStorage.getItem("os-lang"); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    return (navigator.language || "en").toLowerCase().indexOf("it") === 0 ? "it" : "en";
  })();

  /* t() takes either a plain string or {en,it} and returns the right one,
     falling back to English when a translation is missing. */
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang] || v.en || "";
  }
  function tList(v) {
    var out = t(v);
    return Array.isArray(out) ? out : (Array.isArray(v) ? v : [out]).filter(Boolean);
  }
  /* Returns the Italian variant only when we are showing English, so bilingual
     blocks can optionally show both. Currently unused but kept for later. */

  /* ----------------------------------------------------------- utilities */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k === "html") n.innerHTML = v;
      else n.setAttribute(k, v);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function paras(list, cls) {
    return tList(list).map(function (s) { return el("p", { class: cls, text: s }); });
  }
  /* An <img> from images/ that quietly removes itself if the file is
     missing, so a typo or a not-yet-uploaded file never shows a broken icon. */
  function art(file, cls, alt) {
    if (!file) return null;
    /* Deliberately not lazy. These images carry no width/height attributes,
       so they lay out at zero height until decoded, and a lazy image with no
       reserved space never enters the viewport to trigger its own load. It
       also means a missing file fires error immediately and removes itself
       instead of flashing a broken icon halfway down the page. */
    var img = el("img", { class: cls, src: "images/" + file, alt: alt || "",
                          loading: "eager", decoding: "async" });
    if (!alt) img.setAttribute("aria-hidden", "true");
    img.addEventListener("error", function () {
      if (img.parentNode) img.parentNode.removeChild(img);
    });
    return img;
  }

  /* Motifs cycle through SITE.motifs and alternate sides down the page. */
  var motifTurn = 0;
  function nextMotif() {
    var list = SITE.motifs || [];
    if (!list.length) return null;
    var side = motifTurn % 2 ? "right" : "left";
    var file = list[motifTurn % list.length];
    motifTurn++;
    return art(file, "motif motif-" + side);
  }

  function mapsUrl(q) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }

  /* Builds an .ics file in the browser and hands it to the visitor. */
  function icsHref(title, startLocal, endLocal, location, description) {
    function stamp(s) { return s.replace(/[-:]/g, ""); }
    var body = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//orlando-and-sofia//EN",
      "BEGIN:VEVENT",
      "UID:" + stamp(startLocal) + "@orlando-and-sofia",
      "DTSTAMP:" + stamp(new Date().toISOString().slice(0, 19)) + "Z",
      "DTSTART;TZID=Europe/Rome:" + stamp(startLocal),
      "DTEND;TZID=Europe/Rome:" + stamp(endLocal),
      "SUMMARY:" + title,
      "LOCATION:" + (location || "").replace(/,/g, "\\,"),
      "DESCRIPTION:" + (description || "").replace(/,/g, "\\,"),
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    return "data:text/calendar;charset=utf-8," + encodeURIComponent(body);
  }

  /* noMotif skips the decoration where it would not read, rather than
     hiding it in CSS, which would still burn a slot in the cycle. */
  function sectionHead(title, sub, noMotif) {
    return el("div", { class: "sec-head" }, [
      noMotif ? null : nextMotif(),
      el("h2", { text: t(title) }),
      sub ? el("p", { class: "sec-sub", text: t(sub) }) : null,
      el("div", { class: "rule" })
    ]);
  }
  function section(id, kids, cls) {
    var inner = el("div", { class: "wrap" }, kids);
    return el("section", { id: id, class: "reveal" + (cls ? " " + cls : "") }, [inner]);
  }

  /* ================================================================ header */
  /* ------------------------------------------------------- language toggle
     A teacup for English, a moka pot for Italian. Drawn inline rather than
     set as emoji: there is no moka pot emoji, and these inherit the page
     colour so they invert correctly on the active pill.                     */
  var LANG_ICON = {
    en:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M5.2 9.4h11.1v3.1a5.55 5.55 0 0 1-11.1 0z"/>' +      /* cup */
      '<path d="M16.3 10.4h1.4a2.1 2.1 0 0 1 0 4.2h-1.4"/>' +        /* handle */
      '<path d="M3.4 19.2h14.7"/>' +                                 /* saucer */
      '<path d="M9 6.6c0-.9 1-1.1 1-2s-1-1.1-1-2"/>' +               /* steam */
      '<path d="M12.5 6.6c0-.9 1-1.1 1-2s-1-1.1-1-2"/>' +
      '</svg>',
    it:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      /* A Bialetti is an hourglass: both chambers widen away from the waist.
         Drawn chunky, because at 17px a thin outline reads as nothing. */
      '<path d="M6.6 21.3 9.4 13.1h5.2l2.8 8.2z"/>' +      /* boiler, widens down */
      '<path d="M9.4 13.1 8.1 6.7h7.8l-1.3 6.4z"/>' +      /* top, widens up */
      '<path d="M9.1 13.1h5.8"/>' +                        /* waist band */
      '<path d="M8.1 6.7h7.8"/>' +                         /* lid */
      '<circle cx="12" cy="5" r="1.05"/>' +                /* knob */
      '<path d="M15.9 8.1c2.9.5 3.3 3.3-.7 4.3"/>' +       /* handle */
      '<path d="M8.1 7.6 5.9 6.4"/>' +                     /* pour lip */
      '</svg>'
  };
  var LANG_NAME = { en: "English", it: "Italiano" };

  function langToggle() {
    return el("div", { class: "lang", role: "group", "aria-label": "Language" },
      LANGS.map(function (code) {
        var b = el("button", {
          type: "button",
          "aria-pressed": String(code === lang),
          "aria-label": LANG_NAME[code],
          title: LANG_NAME[code]
        });
        b.innerHTML = LANG_ICON[code];
        /* The two-letter code stays: a teacup does not obviously read as
           "English" to someone who has not been told. */
        b.appendChild(el("span", { class: "lang-code", text: code.toUpperCase() }));
        b.addEventListener("click", function () {
          if (code === lang) return;
          try { localStorage.setItem("os-lang", code); } catch (e) {}
          lang = code;
          render();
        });
        return b;
      })
    );
  }

  function buildHeader() {
    var nav = el("nav", { class: "nav", "aria-label": "Sections" },
      SITE.nav.map(function (n) {
        return el("a", { href: "#" + n.id, text: t(n.label) });
      })
    );
    var rsvpLink = el("a", { class: "nav-rsvp", href: "#rsvp", text: t(SITE.ui.rsvpNow) });

    var toggle = langToggle();

    return el("header", { class: "topbar" }, [
      el("div", { class: "wrap topbar-inner" }, [
        el("a", { class: "brand", href: "#top", text: SITE.couple }),
        nav, rsvpLink, toggle
      ])
    ]);
  }

  /* ================================================================== hero */
  function buildHero() {
    var mode  = SITE.heroImage ? (SITE.heroMode || "plate") : "none";
    var cover = mode === "cover";
    var plate = mode === "plate";
    var over  = mode === "overlay";
    var hero = el("div", {
      class: "hero" + (cover ? "" : " no-photo") + (plate ? " has-plate" : "") + (over ? " is-overlay" : ""),
      id: "top"
    }, [
      cover ? el("div", { class: "hero-photo",
                          style: "background-image:url('images/" + SITE.heroImage + "')" }) : null,
      el("div", { class: "hero-veil" }),
      el("div", {}, [
        el("p", { class: "hero-kicker",
                  text: lang === "it" ? "Ci sposiamo" : "We're getting married" }),
        el("h1", { class: "hero-names" }, [
          document.createTextNode(SITE.names.first),
          el("span", { class: "amp", text: "&" }),
          document.createTextNode(SITE.names.second)
        ]),
        el("p", { class: "hero-meta" }, [
          el("span", { text: lang === "it" ? SITE.date.displayIt : SITE.date.display }),
          el("span", { text: t(SITE.place) })
        ]),
        el("div", { class: "hero-cta" }, [
          el("a", { class: "btn", href: "#rsvp", text: t(SITE.ui.rsvpNow) })
        ])
      ])
    ]);

    /* overlay: the whole painting, with the names sitting on it */
    if (over) {
      var oimg = art(SITE.heroImage, "hero-over-img", SITE.couple + ", " + t(SITE.place));
      return el("div", { class: "hero-wrap" }, [
        el("div", { class: "hero-over" }, [oimg, hero]),
        /* The RSVP button moves below the painting: over it, it lands on
           the villa's front door. */
        el("div", { class: "hero-under-cta" }, [
          el("a", { class: "btn", href: "#rsvp", text: t(SITE.ui.rsvpNow) })
        ])
      ]);
    }

    if (!plate) return hero;

    /* The painting is portrait and full of detail, so it is shown whole
       beneath the names rather than cropped behind them. */
    var img = art(SITE.heroImage, "hero-plate-img", SITE.couple + ", " + t(SITE.place));
    var figure = el("figure", { class: "hero-plate" }, [
      img,
      t(SITE.heroCaption) ? el("figcaption", { text: t(SITE.heroCaption) }) : null
    ]);
    return el("div", { class: "hero-wrap" }, [hero, figure]);
  }

  /* ========================================================= when and where */
  function buildWhen() {
    var cards = SITE.when.events.map(function (ev) {
      var where = ev.venue ? ev.venue + ", " + ev.address : ev.address;
      var acts = el("div", { class: "event-acts" }, [
        el("a", { class: "btn ghost small", href: icsHref(t(ev.name), ev.cal.start, ev.cal.end, where, t(ev.note)),
                  download: "orlando-sofia-" + ev.cal.start.slice(0, 10) + ".ics",
                  text: t(SITE.ui.addToCal) }),
        el("a", { class: "btn ghost small", href: mapsUrl(where),
                  target: "_blank", rel: "noopener", text: t(SITE.ui.directions) })
      ]);
      return el("article", { class: "event" }, [
        el("p", { class: "event-day", text: t(ev.day) }),
        el("h3", { text: t(ev.name) }),
        el("p", { class: "event-time", text: ev.time }),
        el("p", { class: "event-addr" }, [
          ev.venue ? el("strong", { text: ev.venue }) : null,
          document.createTextNode(ev.address)
        ]),
        el("span", { class: "tag", text: t(SITE.ui.dressLabel) + ": " + t(ev.dress) }),
        el("p", { class: "event-note", text: t(ev.note) }),
        acts
      ]);
    });
    return section("when", [
      sectionHead(SITE.when.title),
      el("div", { class: "events" }, cards)
    ]);
  }

  /* ======================================================= order of events */
  function buildOrder() {
    var items = SITE.order.items.map(function (i) {
      return el("div", { class: "tl-item" }, [
        el("div", { class: "tl-time", text: i.time }),
        el("div", { class: "tl-body" }, [
          el("p", { class: "tl-name", text: t(i.name) }),
          el("p", { class: "tl-note", text: t(i.note) })
        ])
      ]);
    });
    return section("order", [
      sectionHead(SITE.order.title, SITE.order.subtitle),
      el("div", { class: "timeline" }, items)
    ]);
  }

  /* ============================================================ dress code */
  function buildDress() {
    return section("dress", [
      sectionHead(SITE.dress.title, SITE.dress.lead),
      el("div", { class: "narrow", style: "margin:0 auto" }, paras(SITE.dress.body))
    ]);
  }

  /* ============================================================= transport */
  function buildTransport() {
    var blocks = SITE.transport.blocks.map(function (b) {
      var kids = [el("h3", { text: t(b.heading) })].concat(paras(b.body));
      if (b.phones) {
        kids.push(el("ul", { class: "phones" }, b.phones.map(function (p) {
          return el("li", {}, [
            el("a", { href: "tel:" + p.number.replace(/\s/g, "") }, [
              el("span", { text: p.name }),
              el("span", { class: "num", text: p.number })
            ])
          ]);
        })));
      }
      if (b.apps) {
        kids.push(el("p", { class: "chips-label", text: t(SITE.ui.appsLabel) }));
        kids.push(el("ul", { class: "chips" }, b.apps.map(function (a) {
          return el("li", { text: a });
        })));
      }
      return el("div", {}, kids);
    });
    return section("transport", [
      sectionHead(SITE.transport.title),
      el("div", { class: "cols" }, blocks)
    ]);
  }

  /* ======================================================== places to stay */
  function buildStay() {
    var list = el("ul", { class: "hotels" }, SITE.stay.hotels.map(function (h) {
      return el("li", {}, [
        el("a", { href: mapsUrl(h.name + ", Bologna, Italy"), target: "_blank", rel: "noopener" }, [
          el("span", { text: h.name }),
          el("span", { class: "km", text: h.km + " km" })
        ])
      ]);
    }));
    return section("stay", [
      sectionHead(SITE.stay.title),
      el("div", { class: "narrow", style: "margin:0 auto 32px" }, paras(SITE.stay.intro)),
      list
    ]);
  }

  /* =================================================================== faq */
  function buildFaq() {
    var items = SITE.faq.items.map(function (f) {
      return el("details", {}, [
        el("summary", { text: t(f.q) }),
        el("div", { class: "answer" }, paras(f.a))
      ]);
    });
    return section("faq", [
      sectionHead(SITE.faq.title),
      el("div", { class: "faq" }, items)
    ]);
  }

  /* ============================================================= gift list */
  function buildGifts() {
    var rows = SITE.gifts.bank.filter(function (r) { return r.value; });
    var kids = [
      sectionHead(SITE.gifts.title),
      el("div", { class: "narrow", style: "margin:0 auto" }, paras(SITE.gifts.body))
    ];
    if (rows.length) {
      var dl = el("dl", {});
      rows.forEach(function (r) {
        dl.appendChild(el("dt", { text: t(r.label) }));
        dl.appendChild(el("dd", { text: r.value }));
      });
      kids.push(el("div", { class: "bank" }, [dl]));
    }
    return section("gifts", kids);
  }

  /* =============================================================== bologna */
  function buildBologna() {
    var places = el("ul", { class: "places" }, SITE.bologna.places.map(function (p) {
      return el("li", { class: "place" }, [
        el("span", { class: "ic", "aria-hidden": "true", text: p.icon }),
        el("div", {}, [
          el("p", { class: "nm", text: p.name }),
          el("p", { class: "tx", text: t(p.text) })
        ])
      ]);
    }));
    var food = el("ul", { class: "food" }, SITE.bologna.food.map(function (f) {
      return el("li", {}, [
        el("span", { class: "nm", text: f.name }),
        el("span", { class: "nt", text: f.note })
      ]);
    }));
    return section("bologna", [
      sectionHead(SITE.bologna.title, SITE.bologna.kicker),
      el("div", { class: "narrow", style: "margin:0 auto 44px" }, paras(SITE.bologna.intro)),
      places,
      el("p", { class: "subhead", text: t(SITE.bologna.foodTitle) }),
      food
    ]);
  }

  /* ================================================================== rsvp */
  function buildRsvp() {
    var cfg = SITE.rsvp;
    var inner = [
      /* No motif here: the band is dark, and a multiplied watercolour
         figure just muddies into the brown. */
      sectionHead(SITE.ui.rsvpNow, cfg.deadline, true)
    ];

    if (cfg.mode === "form") {
      inner.push(buildRsvpForm(cfg));
    } else {
      inner.push(el("div", { class: "rsvp-inner" }, [
        el("a", { class: "btn", href: cfg.joyUrl, target: "_blank", rel: "noopener",
                  text: t(SITE.ui.rsvpNow) })
      ]));
    }
    var s = section("rsvp", inner, "rsvp");
    return s;
  }

  function buildRsvpForm(cfg) {
    var ui = SITE.ui;
    var status = el("p", { class: "form-status", role: "status", "aria-live": "polite" });

    function field(name, label, node) {
      return el("div", { class: "field" }, [
        el("label", { for: name, text: t(label) }), node
      ]);
    }
    var name   = el("input",  { id: "f-name", name: "name", type: "text", required: "required", autocomplete: "name" });
    var email  = el("input",  { id: "f-email", name: "email", type: "email", autocomplete: "email" });
    var attend = el("select", { id: "f-attend", name: "attending", required: "required" });
    [["yes", ui.formYes], ["no", ui.formNo]].forEach(function (o) {
      attend.appendChild(el("option", { value: o[0], text: t(o[1]) }));
    });
    var guests = el("input", { id: "f-guests", name: "guests", type: "number", min: "1", max: "10", value: "1" });
    var diet   = el("input", { id: "f-diet", name: "dietary", type: "text" });
    var msg    = el("textarea", { id: "f-message", name: "message", rows: "3" });

    var form = el("form", { class: "rsvp-form", novalidate: "novalidate" }, [
      field("f-name", ui.formName, name),
      field("f-email", ui.formEmail, email),
      el("div", { class: "row" }, [
        field("f-attend", ui.formAttend, attend),
        field("f-guests", ui.formGuests, guests)
      ]),
      field("f-diet", ui.formDiet, diet),
      field("f-message", ui.formMessage, msg),
      el("button", { class: "btn", type: "submit", text: t(ui.formSend) }),
      status
    ]);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      /* Guard: never pretend to send when there is nowhere to send to. */
      if (!cfg.endpoint) { status.textContent = t(ui.formOff); return; }
      if (!name.value.trim()) { status.textContent = t(ui.formName); name.focus(); return; }

      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      status.textContent = t(ui.formSending) + "...";

      var payload = new URLSearchParams({
        name: name.value.trim(), email: email.value.trim(),
        attending: attend.value, guests: guests.value,
        dietary: diet.value.trim(), message: msg.value.trim(),
        submittedAt: new Date().toISOString()
      });

      fetch(cfg.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: payload.toString()
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        form.querySelectorAll("input,select,textarea,button").forEach(function (n) { n.disabled = true; });
        status.textContent = t(ui.formThanks);
      }).catch(function () {
        btn.disabled = false;
        status.textContent = t(ui.formError);
      });
    });

    return form;
  }

  /* ================================================================ footer */
  function buildFooter() {
    return el("footer", {}, [
      art(SITE.dancerStrip, "dancer-strip"),
      el("div", { class: "wrap" }, [
        el("p", { class: "mono", text: SITE.names.first.charAt(0) + " & " + SITE.names.second.charAt(0) }),
        el("p", { text: (lang === "it" ? SITE.date.displayIt : SITE.date.display) + " · " + t(SITE.place) })
      ])
    ]);
  }

  /* ================================================================== gate
     Soft only. The password is in content.js and readable via View Source.
     It keeps strangers and crawlers out, not anyone determined.             */
  var GATE_KEY = "os-gate";
  var gateOpen = false;   /* this tab, even if localStorage is unavailable */

  function normalise(v) {
    return String(v || "").trim().toLowerCase().replace(/\s+/g, "");
  }

  function gatePassed() {
    var g = SITE.gate;
    if (!g || !g.enabled || !g.password) return true;
    if (gateOpen) return true;
    var want = normalise(g.password);
    /* A link ending ?k=baci lets guests in without typing anything. */
    try {
      var k = new URLSearchParams(location.search).get("k");
      if (k && normalise(k) === want) {
        gateOpen = true;
        localStorage.setItem(GATE_KEY, want);
        history.replaceState(null, "", location.pathname + location.hash);
        return true;
      }
    } catch (e) {}
    try { return localStorage.getItem(GATE_KEY) === want; } catch (e) { return false; }
  }

  function buildGate(onPass) {
    var g = SITE.gate;
    var input = el("input", { id: "gate-pw", type: "password", autocomplete: "off",
                              autocapitalize: "off", spellcheck: "false" });
    var error = el("p", { class: "gate-error", role: "alert" });

    var form = el("form", { class: "gate-form" }, [
      el("div", { class: "field" }, [
        el("label", { for: "gate-pw", text: t(g.label) }), input
      ]),
      el("button", { class: "btn", type: "submit", text: t(g.button) }),
      t(g.hint) ? el("p", { class: "gate-hint", text: t(g.hint) }) : null,
      error
    ]);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (normalise(input.value) !== normalise(g.password)) {
        error.textContent = t(g.wrong);
        form.classList.remove("shake");
        void form.offsetWidth;
        form.classList.add("shake");
        input.select();
        return;
      }
      gateOpen = true;
      try { localStorage.setItem(GATE_KEY, normalise(g.password)); } catch (err) {}
      onPass();
    });

    var toggle = langToggle();

    return el("div", { class: "gate" }, [
      el("div", { class: "gate-card" }, [
        el("p", { class: "gate-kicker", text: SITE.couple }),
        el("p", { class: "gate-date",
                  text: (lang === "it" ? SITE.date.displayIt : SITE.date.display)
                        + " · " + t(SITE.place) }),
        el("h1", { class: "gate-title", text: t(g.title) }),
        el("p", { class: "gate-blurb", text: t(g.blurb) }),
        form,
        toggle
      ])
    ]);
  }

  /* ================================================================ render */
  function render() {
    document.documentElement.lang = lang;
    document.title = SITE.couple + " · " + (lang === "it" ? SITE.date.displayIt : SITE.date.display);

    var root = document.getElementById("app");
    root.textContent = "";
    motifTurn = 0;

    if (!gatePassed()) {
      root.appendChild(buildGate(function () { render(); window.scrollTo(0, 0); }));
      document.getElementById("gate-pw").focus();
      return;
    }

    var builders = {
      when: buildWhen, order: buildOrder, dress: buildDress, transport: buildTransport,
      stay: buildStay, faq: buildFaq, gifts: buildGifts, bologna: buildBologna
    };

    root.appendChild(buildHeader());
    root.appendChild(buildHero());
    SITE.nav.forEach(function (n) {
      var b = builders[n.id];
      if (b) root.appendChild(b());
    });
    root.appendChild(buildRsvp());
    root.appendChild(buildFooter());

    wireObservers();
  }

  /* -------------------------------------------- scroll reveal + active nav */
  function wireObservers() {
    var bar = document.querySelector(".topbar");
    var onScroll = function () { bar.classList.toggle("stuck", window.scrollY > 8); };
    window.removeEventListener("scroll", window.__osScroll || function () {});
    window.__osScroll = onScroll;
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var reveals = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (n) { io.observe(n); });

    var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("section[id]").forEach(function (s) { spy.observe(s); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
