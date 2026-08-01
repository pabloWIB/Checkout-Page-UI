/**
 * cart.js — quantity steppers and live order totals.
 *
 * Prices live in the markup as `data-price` on each product line, so the
 * summary always reflects what is rendered instead of a hardcoded total.
 *
 * Loaded as a classic script (not an ES module) so the page also works when
 * index.html is opened straight from disk over file://.
 */
(function (namespace) {
  "use strict";

  var MIN_QUANTITY = 1;
  var MAX_QUANTITY = 99;

  var currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  function readNumber(value, fallback) {
    var parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
  }

  function clamp(value) {
    return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value));
  }

  function initCart(root) {
    if (!root) {
      return;
    }

    var products = Array.prototype.slice.call(
      root.querySelectorAll("[data-product]")
    );
    if (!products.length) {
      return;
    }

    var shipping = readNumber(root.getAttribute("data-shipping"), 0);
    var subtotalOutput = root.querySelector('[data-total="subtotal"]');
    var shippingOutput = root.querySelector('[data-total="shipping"]');
    var grandTotalOutput = root.querySelector('[data-total="grand"]');

    function quantityOf(product) {
      var value = product.querySelector("[data-quantity-value]");
      return value ? clamp(parseInt(value.textContent, 10) || MIN_QUANTITY) : MIN_QUANTITY;
    }

    function render() {
      var subtotal = products.reduce(function (sum, product) {
        var price = readNumber(product.getAttribute("data-price"), 0);
        return sum + price * quantityOf(product);
      }, 0);

      if (subtotalOutput) {
        subtotalOutput.textContent = currency.format(subtotal);
      }
      if (shippingOutput) {
        shippingOutput.textContent = currency.format(shipping);
      }
      if (grandTotalOutput) {
        grandTotalOutput.textContent = currency.format(subtotal + shipping);
      }

      products.forEach(function (product) {
        var quantity = quantityOf(product);
        var decrease = product.querySelector('[data-quantity-step="-1"]');
        var increase = product.querySelector('[data-quantity-step="1"]');

        if (decrease) {
          decrease.disabled = quantity <= MIN_QUANTITY;
        }
        if (increase) {
          increase.disabled = quantity >= MAX_QUANTITY;
        }
      });
    }

    /* One delegated listener for every stepper in the summary. */
    root.addEventListener("click", function (event) {
      var button = event.target.closest("[data-quantity-step]");
      if (!button || !root.contains(button)) {
        return;
      }

      var product = button.closest("[data-product]");
      var output = product && product.querySelector("[data-quantity-value]");
      if (!output) {
        return;
      }

      var step = readNumber(button.getAttribute("data-quantity-step"), 0);
      var next = clamp((parseInt(output.textContent, 10) || MIN_QUANTITY) + step);
      output.textContent = String(next);
      render();
    });

    render();
  }

  namespace.initCart = initCart;
})((window.Checkout = window.Checkout || {}));
