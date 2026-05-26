(function () {
  const key = "kzrCookieConsent_v2";
  if (localStorage.getItem(key)) return;

  const shell = document.createElement("section");
  shell.className = "cookie-shell";
  shell.setAttribute("aria-label", "Cookie choices");
  shell.innerHTML = `
    <div class="cookie-panel" role="dialog" aria-modal="true" aria-labelledby="cookieTitle">
      <div>
        <p class="cookie-kicker">Privacy choices</p>
        <h2 id="cookieTitle">Your choices regarding cookies</h2>
      </div>
      <p class="cookie-copy">
        Choose how KZR uses cookies.
      </p>
      <ul class="cookie-points" aria-label="Cookie summary">
        <li><strong>Essential</strong> keeps the site working.</li>
        <li><strong>Analytics</strong> helps us improve the archive.</li>
      </ul>
      <div class="cookie-media" aria-hidden="true">
        <img class="cookie-media-main" src="assets/cookie.png" alt="" loading="lazy" decoding="async">
      </div>
      <div class="cookie-links">
        <a href="mailto:kongzirui2004@163.com">Privacy Contact</a>
        <a href="shop.html">Terms and Concept Shop</a>
      </div>
      <div class="cookie-preferences" id="cookiePreferences">
        <label class="cookie-toggle">
          <span>Essential cookies</span>
          <input type="checkbox" checked disabled>
        </label>
        <label class="cookie-toggle">
          <span>Analytics cookies</span>
          <input id="cookieAnalytics" type="checkbox">
        </label>
      </div>
      <div class="cookie-actions">
        <button class="cookie-button primary" type="button" data-cookie-action="all">Accept All</button>
        <button class="cookie-button" type="button" data-cookie-action="essential">Accept Essentials Only</button>
        <button class="cookie-button" type="button" data-cookie-action="preferences">Update Preferences</button>
      </div>
    </div>
  `;

  function save(choice) {
    localStorage.setItem(key, JSON.stringify({
      choice,
      analytics: choice === "all" || Boolean(document.getElementById("cookieAnalytics")?.checked),
      savedAt: new Date().toISOString()
    }));
    shell.classList.remove("is-open");
    window.setTimeout(() => shell.remove(), 420);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(shell);
    window.setTimeout(() => shell.classList.add("is-open"), 260);
  });

  shell.addEventListener("click", (event) => {
    const action = event.target?.dataset?.cookieAction;
    if (!action) return;
    if (action === "preferences") {
      const preferences = document.getElementById("cookiePreferences");
      preferences?.classList.toggle("is-open");
      event.target.textContent = preferences?.classList.contains("is-open") ? "Save Preferences" : "Update Preferences";
      if (!preferences?.classList.contains("is-open")) save("custom");
      return;
    }
    save(action);
  });
})();
