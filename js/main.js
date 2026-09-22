(() => {
  "use strict";
  const data = window.SITE_DATA;
  if (!data) return;

  /* ---------- helpers ---------- */
  const el = (tag, className, html) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  };
  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-7.6 8.7L23.3 22H16.7l-5.2-6.8L5.6 22H2.5l8.2-9.3L1.5 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.7L6.4 3.9H4.6L17.7 20Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 2h3a5.5 5.5 0 0 0 4 4v3a8.5 8.5 0 0 1-4-1.1V15a6 6 0 1 1-6-6c.34 0 .67.03 1 .08v3.1a3 3 0 1 0 2 2.83V2Z"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  };

  /* ---------- profile / hero / about ---------- */
  function renderProfile() {
    const p = data.profile;
    document.title = `${p.name} \u2014 ${p.role}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", p.summary);

    document.querySelectorAll("[data-bind='brand-name']").forEach((n) => (n.textContent = p.name));
    document.querySelectorAll("[data-bind='hero-name']").forEach((n) => (n.textContent = p.greeting));
    document.querySelectorAll("[data-bind='hero-tagline']").forEach((n) => (n.textContent = p.tagline));
    document.querySelectorAll("[data-bind='hero-photo']").forEach((n) => {
      n.src = p.photo;
      n.alt = p.name;
    });
    document.querySelectorAll("[data-bind='panel-name']").forEach((n) => (n.textContent = p.name));
    document.querySelectorAll("[data-bind='panel-role']").forEach((n) => (n.textContent = p.role));
    document.querySelectorAll("[data-bind='about-summary']").forEach((n) => (n.textContent = p.summary));
    document.querySelectorAll("[data-bind='about-photo']").forEach((n) => {
      n.src = p.aboutPhoto;
      n.alt = `${p.name}, portrait`;
    });

    const stackEl = document.getElementById("hero-stack");
    if (stackEl) {
      const stackItems = Array.from(
        new Set(data.skills.flatMap((g) => g.items))
      ).slice(0, 6);
      stackEl.innerHTML = stackItems.map((s) => `<span class="tag">${escapeHtml(s)}</span>`).join("");
    }
  }

  function renderFocus() {
    const list = document.getElementById("focus-list");
    if (!list) return;
    list.innerHTML = data.focus
      .map(
        (f) => `<div class="focus-row"><dt>${escapeHtml(f.label)}</dt><dd>${escapeHtml(f.detail)}</dd></div>`
      )
      .join("");
  }

  function renderSkills() {
    const grid = document.getElementById("skills-grid");
    if (!grid) return;
    grid.innerHTML = data.skills
      .map(
        (group) => `
        <div class="skill-card">
          <h3>${escapeHtml(group.category)}</h3>
          <div class="skill-tags">
            ${group.items.map((i) => `<span class="tag">${escapeHtml(i)}</span>`).join("")}
          </div>
        </div>`
      )
      .join("");
  }

  /* ---------- projects ---------- */
  function projectLinks(p) {
    let out = "";
    if (p.github) out += `<a href="${p.github}" target="_blank" rel="noopener noreferrer">${ICONS.github} GitHub</a>`;
    if (p.demo) out += `<a href="${p.demo}" target="_blank" rel="noopener noreferrer">${ICONS.external} Live demo</a>`;
    return out;
  }

  function renderProjects() {
    const featured = data.projects.filter((p) => p.featured);
    const rest = data.projects.filter((p) => !p.featured);

    const featuredWrap = document.getElementById("projects-featured");
    if (featuredWrap) {
      featuredWrap.innerHTML = featured
        .map(
          (p) => `
          <div class="project-card">
            <div class="thumb"><img src="${p.image}" alt="${escapeHtml(p.title)} screenshot" loading="lazy" width="900" height="562"></div>
            <div class="body">
              <div class="category">${escapeHtml(p.category)}</div>
              <h3>${escapeHtml(p.title)}</h3>
              <p>${escapeHtml(p.description)}</p>
              <div class="tags">${p.stack.map((s) => `<span class="tag">${escapeHtml(s)}</span>`).join("")}</div>
              <div class="links">${projectLinks(p)}</div>
            </div>
          </div>`
        )
        .join("");
    }

    const listWrap = document.getElementById("projects-list");
    if (listWrap) {
      listWrap.innerHTML = rest
        .map((p, i) => {
          const num = String(i + 1).padStart(2, "0");
          const href = p.github || p.demo || "#";
          return `
          <a class="project-row" href="${href}" target="_blank" rel="noopener noreferrer">
            <span class="project-row-index">${num}</span>
            <span class="project-row-main">
              <span class="project-row-title">${escapeHtml(p.title)}</span>
              <span class="project-row-meta">${p.stack.map(escapeHtml).join(" \u00b7 ")}</span>
            </span>
            <span class="project-row-desc">${escapeHtml(p.description)}</span>
          </a>`;
        })
        .join("");
    }
  }

  function renderAchievements() {
    const wrap = document.getElementById("achievements-list");
    if (!wrap) return;
    const section = document.getElementById("achievements");
    if (!data.achievements.length) {
      if (section) section.style.display = "none";
      return;
    }
    wrap.innerHTML = data.achievements
      .map(
        (a) => `
        <a class="achievement-card" href="${a.url}" target="_blank" rel="noopener noreferrer">
          <img src="${a.image}" alt="${escapeHtml(a.title)} certificate" loading="lazy">
          <div class="body">
            <div class="eyebrow">Certificate</div>
            <h3>${escapeHtml(a.title)}</h3>
            <p>${escapeHtml(a.issuer)}</p>
          </div>
        </a>`
      )
      .join("");
  }

  function renderSocial() {
    const targets = document.querySelectorAll("[data-bind='social-list']");
    const html = data.social
      .map(
        (s) => `<a class="icon-btn" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(s.platform)}">${ICONS[s.icon] || ""}</a>`
      )
      .join("");
    targets.forEach((t) => (t.innerHTML = html));
  }

  function renderContact() {
    const form = document.getElementById("contact-form");
    if (form) form.action = data.contact.formAction;
    document.querySelectorAll("[data-bind='contact-note']").forEach((n) => (n.textContent = data.contact.note));
  }

  /* ---------- nav / theme / menu ---------- */
  function initTheme() {
    const stored = localStorage.getItem("theme");
    if (stored) document.documentElement.setAttribute("data-theme", stored);
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  function initNavScroll() {
    const nav = document.getElementById("site-nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const scrim = document.getElementById("scrim");
    const openBtn = document.getElementById("menu-open");
    const closeBtn = document.getElementById("menu-close");
    if (!menu || !openBtn) return;
    const open = () => { menu.classList.add("is-open"); scrim.classList.add("is-open"); };
    const close = () => { menu.classList.remove("is-open"); scrim.classList.remove("is-open"); };
    openBtn.addEventListener("click", open);
    closeBtn?.addEventListener("click", close);
    scrim?.addEventListener("click", close);
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  function initActiveSection() {
    const links = document.querySelectorAll(".nav-links a[href^='#']");
    if (!links.length) return;
    const sections = Array.from(links)
      .map((l) => document.querySelector(l.getAttribute("href")))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }

  function initYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- contact form ---------- */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const status = document.getElementById("form-status");
    const submitBtn = form.querySelector(".submit-btn");

    const validators = {
      name: (v) => v.trim().length > 0 || "Please enter your name.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Please enter a valid email.",
      message: (v) => v.trim().length > 0 || "Please enter a message.",
    };

    function setFieldError(field, message) {
      const wrap = field.closest(".field");
      const errorEl = wrap.querySelector(".field-error");
      if (message) {
        wrap.classList.add("has-error");
        if (errorEl) errorEl.textContent = message;
      } else {
        wrap.classList.remove("has-error");
      }
    }

    function validateField(field) {
      const rule = validators[field.name];
      if (!rule) return true;
      const result = rule(field.value);
      setFieldError(field, result === true ? "" : result);
      return result === true;
    }

    form.querySelectorAll("input[name], textarea[name]").forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fields = Array.from(form.querySelectorAll("input[name], textarea[name]"));
      const allValid = fields.map(validateField).every(Boolean);
      if (!allValid) {
        status.textContent = "Please fix the fields above.";
        status.dataset.state = "error";
        return;
      }

      submitBtn.setAttribute("data-loading", "true");
      status.textContent = "Sending\u2026";
      status.dataset.state = "";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        if (response.ok) {
          status.textContent = "Thanks \u2014 your message is on its way.";
          status.dataset.state = "success";
          form.reset();
        } else {
          status.textContent = "Something went wrong. Please try again or email me directly.";
          status.dataset.state = "error";
        }
      } catch (err) {
        status.textContent = "Network error \u2014 please try again.";
        status.dataset.state = "error";
      } finally {
        submitBtn.removeAttribute("data-loading");
      }
    });
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderProfile();
    renderFocus();
    renderSkills();
    renderProjects();
    renderAchievements();
    renderSocial();
    renderContact();
    initTheme();
    initNavScroll();
    initMobileMenu();
    initActiveSection();
    initYear();
    initContactForm();
  });
})();
