/**
 * main.js — single entry point.
 *
 * Modules in assets/js/modules/ attach their initialisers to the shared
 * `Checkout` namespace; this file wires them to the DOM. Scripts are deferred,
 * so the document is already parsed by the time this runs.
 */
(function (namespace) {
  "use strict";

  function init() {
    if (typeof namespace.initCart === "function") {
      namespace.initCart(document.querySelector("[data-cart]"));
    }

    if (typeof namespace.initCheckoutForm === "function") {
      namespace.initCheckoutForm(document.querySelector("[data-checkout-form]"));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})((window.Checkout = window.Checkout || {}));
