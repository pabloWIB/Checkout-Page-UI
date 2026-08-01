/**
 * checkout-form.js — client-side validation for the checkout form.
 *
 * Constraints are declared in the HTML (required, type, pattern, minlength);
 * this module only takes over the messaging so errors render inline instead of
 * as browser bubbles. With JavaScript disabled the native constraints still
 * apply, so the form degrades rather than breaks.
 *
 * There is no backend: on a valid submit the form reports that the details
 * passed validation and that nothing was sent. It does not pretend to place
 * an order.
 */
(function (namespace) {
  "use strict";

  var FIELD = ".field";
  var INVALID = "is-invalid";

  function fieldOf(input) {
    return input.closest(FIELD);
  }

  function messageFor(input) {
    var field = fieldOf(input);
    return field ? field.querySelector("[data-error]") : null;
  }

  function showError(input) {
    var field = fieldOf(input);
    var message = messageFor(input);
    if (!field || !message) {
      return;
    }

    field.classList.add(INVALID);
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", message.id);
  }

  function clearError(input) {
    var field = fieldOf(input);
    var message = messageFor(input);
    if (!field) {
      return;
    }

    field.classList.remove(INVALID);
    input.removeAttribute("aria-invalid");
    if (message) {
      input.removeAttribute("aria-describedby");
    }
  }

  function validate(input) {
    if (input.checkValidity()) {
      clearError(input);
      return true;
    }

    showError(input);
    return false;
  }

  function initCheckoutForm(form) {
    if (!form) {
      return;
    }

    var inputs = Array.prototype.slice.call(
      form.querySelectorAll("input[required]")
    );
    if (!inputs.length) {
      return;
    }

    var status = form.querySelector("[data-form-status]");

    function setStatus(state, text) {
      if (!status) {
        return;
      }
      status.setAttribute("data-state", state);
      status.textContent = text;
    }

    /* Take over messaging, but only once we know the script is running. */
    form.noValidate = true;

    /* Validate on blur, then keep correcting live once a field has failed. */
    form.addEventListener(
      "blur",
      function (event) {
        if (event.target.matches("input[required]")) {
          validate(event.target);
        }
      },
      true
    );

    form.addEventListener("input", function (event) {
      var input = event.target;
      var field = input.matches("input[required]") && fieldOf(input);
      if (field && field.classList.contains(INVALID)) {
        validate(input);
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var invalid = inputs.filter(function (input) {
        return !validate(input);
      });

      if (invalid.length) {
        setStatus(
          "error",
          invalid.length === 1
            ? "One field still needs attention. It is marked below."
            : invalid.length + " fields still need attention. They are marked below."
        );
        invalid[0].focus();
        return;
      }

      setStatus(
        "success",
        "Your details passed validation. This screen is a front-end demo: " +
          "no order was placed and nothing left your browser."
      );
    });

    form.addEventListener("reset", function () {
      inputs.forEach(clearError);
      setStatus("", "");
    });
  }

  namespace.initCheckoutForm = initCheckoutForm;
})((window.Checkout = window.Checkout || {}));
