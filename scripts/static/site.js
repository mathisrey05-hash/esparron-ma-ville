// Petit script pour la version « pages HTML » du site (sans React) :
// menu Associations, menu mobile et formulaire de contact.
(function () {
  "use strict";

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    (children || []).forEach(function (c) { node.append(c); });
    return node;
  }

  // Liens des associations, repris dans le pied de page
  var assoLinks = Array.prototype.filter.call(
    document.querySelectorAll("footer a[href*='associations/']"),
    function (a) { return !/associations\/index\.html$/.test(a.getAttribute("href")); }
  );
  var mainNav = document.querySelector("nav[aria-label='Navigation principale']");
  var assoIndex = mainNav && Array.prototype.find.call(
    document.querySelectorAll("a[href$='associations/index.html']"), function () { return true; }
  );
  var assoIndexHref = assoIndex ? assoIndex.getAttribute("href") : null;
  if (!assoIndexHref && assoLinks[0]) {
    assoIndexHref = assoLinks[0].getAttribute("href").replace(/associations\/.*$/, "associations/index.html");
  }

  // ---------- Menu déroulant « Associations » (ordinateur) ----------
  var trigger = mainNav && mainNav.querySelector("button[aria-haspopup='menu']");
  if (trigger) {
    var wrap = el("div", { class: "es-dropdown" });
    trigger.parentNode.insertBefore(wrap, trigger);
    wrap.append(trigger);
    var panel = el("div", { class: "es-dropdown-panel", role: "menu", hidden: "" });
    if (assoIndexHref) panel.append(el("a", { href: assoIndexHref, role: "menuitem" }, ["Toutes les associations"]));
    assoLinks.forEach(function (a) {
      panel.append(el("a", { href: a.getAttribute("href"), role: "menuitem" }, [a.textContent.trim()]));
    });
    wrap.append(panel);
    var setOpen = function (open) {
      panel.hidden = !open;
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    };
    trigger.addEventListener("click", function (e) { e.stopPropagation(); setOpen(panel.hidden); });
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  // ---------- Menu mobile ----------
  var burger = document.querySelector("button[aria-label='Ouvrir le menu']");
  if (burger && mainNav) {
    var overlay = el("div", { class: "es-overlay", hidden: "" });
    var close = el("button", { type: "button", class: "es-close", "aria-label": "Fermer le menu" }, ["×"]);
    var list = el("nav", { class: "es-mobile-links", "aria-label": "Navigation mobile" });
    Array.prototype.forEach.call(mainNav.querySelectorAll(":scope > a"), function (a) {
      var label = a.textContent.trim();
      if (label === "Contact") return;
      list.append(el("a", { href: a.getAttribute("href") }, [label]));
    });
    if (assoIndexHref) list.append(el("a", { href: assoIndexHref }, ["Associations"]));
    assoLinks.forEach(function (a) {
      list.append(el("a", { href: a.getAttribute("href"), class: "es-sub" }, [a.textContent.trim()]));
    });
    var contact = mainNav.querySelector("a[href$='contact/index.html']");
    if (contact) list.append(el("a", { href: contact.getAttribute("href") }, ["Contact"]));
    var login = document.querySelector("header a[href$='connexion/index.html']");
    if (login) list.append(el("a", { href: login.getAttribute("href"), class: "es-cta" }, ["Espace personnel"]));

    var drawer = el("div", { class: "es-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Menu", hidden: "" }, [
      el("div", { class: "es-drawer-head" }, [el("span", {}, ["Menu"]), close]),
      list,
    ]);
    document.body.append(overlay, drawer);
    var setMobile = function (open) {
      overlay.hidden = drawer.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) close.focus();
    };
    burger.addEventListener("click", function () { setMobile(true); });
    close.addEventListener("click", function () { setMobile(false); });
    overlay.addEventListener("click", function () { setMobile(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMobile(false); });
  }

  // ---------- Formulaire de contact ----------
  var form = document.querySelector("form");
  if (form && form.querySelector("[name='message']")) {
    var box = el("p", { class: "es-form-msg", role: "status", hidden: "" });
    form.append(box);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (n) { var f = form.elements[n]; return f ? String(f.value || "").trim() : ""; };
      var missing = [];
      if (v("name").length < 2) missing.push("votre nom");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) missing.push("une adresse e-mail valide");
      if (form.elements.subject && v("subject").length < 3) missing.push("un objet");
      if (v("message").length < 10) missing.push("un message (10 caractères minimum)");
      if (form.elements.consent && !form.elements.consent.checked) missing.push("votre accord");
      box.hidden = false;
      if (missing.length) {
        box.className = "es-form-msg es-error";
        box.textContent = "Merci d'indiquer " + missing.join(", ") + ".";
      } else {
        box.className = "es-form-msg es-ok";
        box.textContent = "Formulaire valide. L'envoi des messages sera activé quand la base de données sera branchée.";
      }
    });
  }
})();
