document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var form = document.querySelector(".contact-form form");
  var status = document.querySelector(".form-status");

  if (form && status) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      if (action.indexOf("YOUR_FORM_ID") !== -1) {
        e.preventDefault();
        status.textContent =
          "現在フォーム送信先(Formspree)が未設定です。設定後にご利用いただけます。";
        status.classList.remove("is-success");
        status.classList.add("is-error");
        return;
      }

      e.preventDefault();
      status.textContent = "送信中です…";
      status.classList.remove("is-error");
      status.classList.add("is-success");

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = "お問い合わせを送信しました。ご連絡ありがとうございます。";
            form.reset();
          } else {
            status.textContent = "送信に失敗しました。時間をおいて再度お試しください。";
            status.classList.remove("is-success");
            status.classList.add("is-error");
          }
        })
        .catch(function () {
          status.textContent = "送信に失敗しました。時間をおいて再度お試しください。";
          status.classList.remove("is-success");
          status.classList.add("is-error");
        });
    });
  }
});
