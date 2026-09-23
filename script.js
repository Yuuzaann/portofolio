/**
 * Arya Permadi (Sadutzz) - Portfolio JavaScript
 * Modern, accessible, modular frontend interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initPageLoadAnimation();
    initScrollReveal();
    initAmbientCursorGlow();
    initNavbarScroll();
    initActiveNavSpy();
    initMobileDrawer();
    initLightbox();
    initEmailCopy();
    initContactForm();
    initYearAndBackToTop();
});

/* ================= 1. THEME MANAGER ================= */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Check initial preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
        });
    }

    // Listen to system changes if user hasn't explicitly set theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!('theme' in localStorage)) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    });
}

/* ================= 2. PAGE LOAD ANIMATION ================= */
function initPageLoadAnimation() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('page-loaded');
        return;
    }

    const triggerLoad = () => {
        requestAnimationFrame(() => {
            document.body.classList.add('page-loaded');
        });
    };

    if (document.readyState === 'complete') {
        triggerLoad();
    } else {
        window.addEventListener('load', triggerLoad, { once: true });
    }
}

/* ================= 3. SCROLL REVEAL (INTERSECTION OBSERVER) ================= */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');
    if (!revealElements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ================= 4. AMBIENT CURSOR GLOW (DESKTOP THROTTLED RAF) ================= */
function initAmbientCursorGlow() {
    const glow = document.getElementById('ambientCursorGlow');
    if (!glow) return;

    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
        glow.style.display = 'none';
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isTracking = false;
    let rafId = null;

    const render = () => {
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;

        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

        if (isTracking) {
            rafId = requestAnimationFrame(render);
        }
    };

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isTracking) {
            isTracking = true;
            glow.classList.remove('opacity-0');
            glow.classList.add('opacity-100');
            rafId = requestAnimationFrame(render);
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        isTracking = false;
        glow.classList.remove('opacity-100');
        glow.classList.add('opacity-0');
        if (rafId) cancelAnimationFrame(rafId);
    });
}

/* ================= 5. NAVBAR SCROLL EFFECT ================= */
function initNavbarScroll() {
    const navbarHeader = document.getElementById('navbarHeader');
    const navbar = document.getElementById('navbar');
    if (!navbarHeader || !navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('shadow-md', 'bg-white/90', 'dark:bg-[#0f172a]/90');
            navbar.classList.remove('shadow-sm', 'bg-white/70', 'dark:bg-[#0f172a]/70');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/90', 'dark:bg-[#0f172a]/90');
            navbar.classList.add('shadow-sm', 'bg-white/70', 'dark:bg-[#0f172a]/70');
        }
    }, { passive: true });
}

/* ================= 3. ACTIVE NAV LINK SPY ================= */
function initActiveNavSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    if (!sections.length || !navItems.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navItems.forEach((link) => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentId}`) {
                        link.classList.add('text-emerald-500', 'dark:text-emerald-400', 'bg-slate-100', 'dark:bg-white/5');
                        link.classList.remove('text-slate-600', 'dark:text-slate-300');
                    } else {
                        link.classList.remove('text-emerald-500', 'dark:text-emerald-400', 'bg-slate-100', 'dark:bg-white/5');
                        link.classList.add('text-slate-600', 'dark:text-slate-300');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));
}

/* ================= 4. MOBILE DRAWER ================= */
function initMobileDrawer() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerPanel = document.getElementById('drawerPanel');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileMenuBtn || !mobileDrawer || !drawerPanel) return;

    function openDrawer() {
        mobileDrawer.classList.remove('pointer-events-none', 'opacity-0');
        mobileDrawer.classList.add('pointer-events-auto', 'opacity-100');
        drawerPanel.classList.remove('translate-x-full');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawerPanel.classList.add('translate-x-full');
        mobileDrawer.classList.remove('pointer-events-auto', 'opacity-100');
        mobileDrawer.classList.add('pointer-events-none', 'opacity-0');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    mobileNavLinks.forEach((link) => {
        link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileDrawer.classList.contains('pointer-events-none')) {
            closeDrawer();
        }
    });
}

/* ================= 8. LIGHTBOX MODAL ================= */
function initLightbox() {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const modalTitle = document.getElementById('lightboxTitle');
    const closeBtn = document.getElementById('lightboxCloseBtn');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    if (!modal || !modalImg) return;

    function openModal(imgSrc, title) {
        modalImg.src = imgSrc;
        modalImg.alt = title || 'Preview Image';
        if (modalTitle) modalTitle.textContent = title || 'Preview';
        modal.classList.remove('pointer-events-none', 'opacity-0');
        modal.classList.add('pointer-events-auto', 'opacity-100');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('pointer-events-auto', 'opacity-100');
        modal.classList.add('pointer-events-none', 'opacity-0');
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = '';
        document.body.style.overflow = '';
    }

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgSrc = trigger.getAttribute('data-img');
            const title = trigger.getAttribute('data-title');
            if (imgSrc) {
                openModal(imgSrc, title);
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'lightboxModal') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
            closeModal();
        }
    });
}

/* ================= 7. 1-CLICK EMAIL COPY ================= */
function initEmailCopy() {
    const emailToCopy = 'arya.permadi.dev@gmail.com';

    // Hero button
    const heroBtn = document.getElementById('heroCopyEmailBtn');
    const heroTooltip = document.getElementById('heroCopyTooltip');

    if (heroBtn && heroTooltip) {
        heroBtn.addEventListener('click', () => {
            copyTextToClipboard(emailToCopy, () => {
                heroTooltip.classList.remove('opacity-0', 'pointer-events-none');
                heroTooltip.classList.add('opacity-100');
                setTimeout(() => {
                    heroTooltip.classList.remove('opacity-100');
                    heroTooltip.classList.add('opacity-0', 'pointer-events-none');
                }, 2000);
            });
        });
    }

    // Contact card button
    const contactBtn = document.getElementById('contactCopyEmailBtn');
    const contactBtnLabel = document.getElementById('contactCopyBtnLabel');

    if (contactBtn && contactBtnLabel) {
        contactBtn.addEventListener('click', () => {
            copyTextToClipboard(emailToCopy, () => {
                const originalText = contactBtnLabel.textContent;
                contactBtnLabel.textContent = 'Copied! ✓';
                contactBtn.classList.remove('bg-emerald-500', 'hover:bg-emerald-600');
                contactBtn.classList.add('bg-emerald-600');
                setTimeout(() => {
                    contactBtnLabel.textContent = originalText;
                    contactBtn.classList.remove('bg-emerald-600');
                    contactBtn.classList.add('bg-emerald-500', 'hover:bg-emerald-600');
                }, 2000);
            });
        });
    }
}

function copyTextToClipboard(text, onSuccess) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
            fallbackCopyText(text, onSuccess);
        });
    } else {
        fallbackCopyText(text, onSuccess);
    }
}

function fallbackCopyText(text, onSuccess) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
        document.execCommand('copy');
        if (onSuccess) onSuccess();
    } catch (err) {
        console.error('Copy fallback failed', err);
    }
    document.body.removeChild(textarea);
}

/* ================= 8. CONTACT FORM (FORMSPREE AJAX) ================= */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('formSubmitBtn');
    const submitLabel = document.getElementById('formSubmitLabel');
    const statusMsg = document.getElementById('formStatusMsg');

    if (!form || !submitBtn || !statusMsg) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // UI Feedback: Loading
        submitBtn.disabled = true;
        const originalLabel = submitLabel ? submitLabel.textContent : 'Send Message';
        if (submitLabel) submitLabel.textContent = 'Sending...';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                statusMsg.className = 'p-4 rounded-xl text-xs sm:text-sm font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 block';
                statusMsg.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
                form.reset();
            } else {
                const data = await response.json();
                const errorMessage = data.errors ? data.errors.map(err => err.message).join(', ') : 'Oops! There was a problem submitting your form.';
                statusMsg.className = 'p-4 rounded-xl text-xs sm:text-sm font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 block';
                statusMsg.textContent = errorMessage;
            }
        } catch (error) {
            statusMsg.className = 'p-4 rounded-xl text-xs sm:text-sm font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 block';
            statusMsg.textContent = 'Network error: Please check your connection or contact directly via email.';
        } finally {
            submitBtn.disabled = false;
            if (submitLabel) submitLabel.textContent = originalLabel;
        }
    });
}

/* ================= 9. YEAR & BACK TO TOP ================= */
function initYearAndBackToTop() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

