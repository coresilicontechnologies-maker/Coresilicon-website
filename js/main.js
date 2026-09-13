// ===================================================
// CoreSilicon Technologies — shared site behaviour
// ===================================================

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  // Highlight the current page in the nav
  var here = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a[data-page]").forEach(function (a) {
    if (a.getAttribute("data-page") === here) {
      a.classList.add("active");
    }
  });

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Render updates list if present on this page
  renderUpdates();

  // Wire up the quotation form if present on this page
  wireQuotationForm();
});

function formatDate(iso) {
  var d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function renderUpdates() {
  var list = document.getElementById("updates-list");
  if (!list) return;

  if (typeof UPDATES === "undefined" || !UPDATES.length) {
    var empty = document.getElementById("updates-empty");
    if (empty) empty.style.display = "block";
    return;
  }

  // Newest first
  var sorted = UPDATES.slice().sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  var limit = list.getAttribute("data-limit");
  if (limit) sorted = sorted.slice(0, parseInt(limit, 10));

  sorted.forEach(function (item) {
    var row = document.createElement("article");
    row.className = "update-item";
    row.innerHTML =
      '<div class="update-date">' + formatDate(item.date) + '</div>' +
      '<div>' +
        '<span class="update-tag">' + escapeHtml(item.tag || "Update") + '</span>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.body) + '</p>' +
      '</div>';
    list.appendChild(row);
  });
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str == null ? "" : str;
  return div.innerHTML;
}

function wireQuotationForm() {
  var form = document.getElementById("quotation-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    var status = document.getElementById("form-status");
    var endpoint = form.getAttribute("action") || "";

    // If the Formspree endpoint hasn't been configured yet,
    // fall back to opening the visitor's email client instead
    // of silently failing.
    if (endpoint.indexOf("YOUR_FORM_ID") !== -1) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = [];
      data.forEach(function (value, key) {
        lines.push(key + ": " + value);
      });
      var subject = encodeURIComponent("New enquiry — CoreSilicon website");
      var body = encodeURIComponent(lines.join("\n"));
      window.location.href = "mailto:enquiries@coresilicon.example?subject=" + subject + "&body=" + body;
      if (status) {
        status.textContent = "Opening your email app to send this enquiry — the form endpoint hasn't been connected yet (see README).";
        status.className = "ok";
      }
      return;
    }

    // Otherwise let it submit to Formspree normally, but show
    // a quick confirmation using fetch so the visitor stays on-page.
    e.preventDefault();
    fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          if (status) {
            status.textContent = "Thanks — your enquiry has been sent. We'll get back to you within 1–2 business days.";
            status.className = "ok";
          }
        } else {
          throw new Error("Submission failed");
        }
      })
      .catch(function () {
        if (status) {
          status.textContent = "Something went wrong sending the form. Please email enquiries@coresilicon.example directly.";
          status.className = "err";
        }
      });
  });
}
