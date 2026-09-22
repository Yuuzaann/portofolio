/* =========================================================
   Arya Permadi — Developer Portfolio
   Vanilla JS. No dependencies, no backend.
   ========================================================= */
(function () {
  "use strict";

  var html = document.documentElement;

  /* ---------- In-page navigation without leaving a #hash in the URL ---------- */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function scrollToIdWithoutHash(id, sourceEl) {
    var target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    // Move focus to the section for keyboard/screen-reader users, without
    // letting the browser write a #hash into the address bar.
    var hadTabIndex = target.hasAttribute("tabindex");
    if (!hadTabIndex) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (!hadTabIndex) {
      window.setTimeout(function () {
        target.removeAttribute("tabindex");
      }, 1000);
    }
    return true;
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href || href === "#") return;
    link.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      var id = href.slice(1);
      if (scrollToIdWithoutHash(id, link)) {
        e.preventDefault();
      }
    });
  });

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", function () {
    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  });

  /* ---------- Page-load sequence ---------- */
  // Runs on DOMContentLoaded rather than window.load so the site stays
  // fast/usable even if images are still finishing.
  document.addEventListener("DOMContentLoaded", function () {
    requestAnimationFrame(function () {
      html.classList.add("is-loaded");
    });
  });
  // Safety net in case DOMContentLoaded already fired before this ran.
  if (document.readyState === "interactive" || document.readyState === "complete") {
    requestAnimationFrame(function () {
      html.classList.add("is-loaded");
    });
  }

  /* ---------- Navbar scrolled state (no scroll listener) ---------- */
  var navbar = document.getElementById("navbar");
  var sentinel = document.getElementById("top-sentinel");
  if ("IntersectionObserver" in window && navbar && sentinel) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          navbar.classList.toggle("scrolled", !entry.isIntersecting);
        });
      },
      { rootMargin: "-1px 0px 0px 0px", threshold: 0 }
    );
    navObserver.observe(sentinel);
  }

  /* ---------- Mobile menu ---------- */
  var menuOpenBtn = document.getElementById("menuOpen");
  var menuCloseBtn = document.getElementById("menuClose");
  var mobileMenu = document.getElementById("mobileMenu");
  var backdrop = document.getElementById("backdrop");
  var lastFocused = null;

  function getFocusable() {
    return Array.prototype.slice.call(
      mobileMenu.querySelectorAll('a[href], button:not([disabled])')
    );
  }

  function openMenu() {
    lastFocused = document.activeElement;
    mobileMenu.classList.add("open");
    backdrop.classList.add("open");
    menuOpenBtn.setAttribute("aria-expanded", "true");
    var focusable = getFocusable();
    if (focusable.length) focusable[0].focus();
    document.addEventListener("keydown", handleMenuKeydown);
  }

  function closeMenu(restoreFocus) {
    mobileMenu.classList.remove("open");
    backdrop.classList.remove("open");
    menuOpenBtn.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", handleMenuKeydown);
    if (restoreFocus !== false && lastFocused) lastFocused.focus();
  }

  function handleMenuKeydown(e) {
    if (e.key === "Escape") {
      closeMenu();
      return;
    }
    if (e.key === "Tab") {
      var focusable = getFocusable();
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  menuOpenBtn.addEventListener("click", openMenu);
  menuCloseBtn.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);
  document.querySelectorAll("[data-mobile-nav]").forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu(false);
    });
  });

  /* ---------- Lightbox (achievement/certificate preview) ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightboxImage");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxTriggers = document.querySelectorAll("[data-lightbox]");
  var lightboxLastFocused = null;

  function getLightboxFocusable() {
    return Array.prototype.slice.call(
      lightbox.querySelectorAll('a[href], button:not([disabled])')
    );
  }

  function openLightbox(trigger) {
    var href = trigger.getAttribute("href");
    var caption = trigger.getAttribute("data-lightbox-caption") || "";
    var altSource = trigger.querySelector("img");
    var altText = altSource ? altSource.getAttribute("alt") : caption;

    lightboxImage.src = href;
    lightboxImage.alt = altText || "";
    lightboxCaption.textContent = caption;

    lightboxLastFocused = document.activeElement;
    lightbox.hidden = false;
    // Force layout so the transition runs, then add the open state.
    requestAnimationFrame(function () {
      lightbox.classList.add("open");
    });

    var focusable = getLightboxFocusable();
    if (focusable.length) focusable[0].focus();
    document.addEventListener("keydown", handleLightboxKeydown);
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.removeEventListener("keydown", handleLightboxKeydown);
    window.setTimeout(function () {
      if (!lightbox.classList.contains("open")) {
        lightbox.hidden = true;
        lightboxImage.src = "";
      }
    }, 460);
    if (lightboxLastFocused) lightboxLastFocused.focus();
  }

  function handleLightboxKeydown(e) {
    if (e.key === "Escape") {
      closeLightbox();
      return;
    }
    if (e.key === "Tab") {
      var focusable = getLightboxFocusable();
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  lightboxTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      // Let modifier-key clicks and middle-clicks behave normally
      // (open in a new tab) instead of hijacking them into the modal.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      openLightbox(trigger);
    });
  });

  if (lightbox) {
    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (el) {
      el.addEventListener("click", closeLightbox);
    });
  }

  /* ---------- Active section nav highlighting ---------- */
  var navLinks = document.querySelectorAll("[data-nav]");
  var sections = Array.prototype.slice
    .call(navLinks)
    .map(function (link) {
      var id = link.getAttribute("href").replace("#", "");
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var isMatch = link.getAttribute("href") === "#" + id;
      if (isMatch) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );

  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

    // Stagger children of grouped lists (skills, info cards, projects).
    [".info-cards", ".chip-row", ".projects-list"].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (group) {
        Array.prototype.forEach.call(group.children, function (child, i) {
          if (!child.style.getPropertyValue("--i")) {
            child.style.setProperty("--i", i);
          }
        });
      });
    });
  } else {
    // No IntersectionObserver support: show content immediately.
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
