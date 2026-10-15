/**
 * IDEAFEST 2026 – PROJECT EXPO
 * Official Frontend Application Script
 * SINCET Nagapattinam | ARINDASCI Association
 */

// ==========================================================================
// 1. OFFICIAL REGISTRATION FORM CONFIGURATION
// ==========================================================================
/**
 * CRITICAL CONFIGURATION:
 * Provide the official Google Form URL below.
 * Every registration trigger button across the website references this central URL.
 * If set to a placeholder, empty, or "#", the website will display an official
 * registration announcement modal rather than opening an invalid link.
 */
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeGZf8Qt3a4rHwVbEhPYZrEq5hJ8mbU3IkHmArtRPNEMz02Ww/viewform";

// Placeholder patterns that signify registration is not yet configured
const PLACEHOLDER_PATTERNS = [
  "",
  "#",
  "YOUR_FORM_ID",
  "YOUR_GOOGLE_FORM_URL",
  "PLACEHOLDER",
  "PENDING"
];

// ==========================================================================
// 2. CENTRAL REGISTRATION HELPER FUNCTION
// ==========================================================================
/**
 * Central function to handle all registration clicks across the site.
 * Validates the URL configuration before opening in a new tab.
 * @param {string} [selectedDomain] - Optional pre-selected domain name
 */
function handleRegistrationClick(selectedDomain = "") {
  const trimmedUrl = (GOOGLE_FORM_URL || "").trim();

  // Check if URL is invalid, empty, or still a placeholder
  const isPlaceholder = !trimmedUrl || 
    PLACEHOLDER_PATTERNS.some(pattern => trimmedUrl.toUpperCase().includes(pattern.toUpperCase())) ||
    trimmedUrl === "#";

  if (isPlaceholder) {
    showModal(
      "Registration Notice",
      "Registration will open soon. The official registration form link will be announced by the organizers."
    );
    return;
  }

  // If a valid Google Form URL is present, open in a new browser tab
  try {
    let finalUrl = trimmedUrl;
    // If domain was selected, we can inform the user via a quick toast
    if (selectedDomain) {
      showToast(`Proceeding with domain: ${selectedDomain}`);
    }
    
    // Safely open the Google Form in a new tab
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  } catch (err) {
    console.error("Error opening registration URL:", err);
    showModal(
      "Registration Portal",
      "Unable to open the registration form directly. Please check your browser popup settings."
    );
  }
}

// ==========================================================================
// 3. UI NOTIFICATIONS: TOAST & MODAL SYSTEM
// ==========================================================================
/**
 * Display a temporary floating toast message
 * @param {string} message
 */
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00F5FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Remove toast after animation completes (3 seconds total)
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}

/**
 * Display an accessible modal dialog with custom title and message
 * @param {string} title
 * @param {string} message
 */
function showModal(title, message) {
  const modal = document.getElementById("custom-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");

  if (!modal) return;

  if (modalTitle) modalTitle.textContent = title;
  if (modalMessage) modalMessage.textContent = message;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  // Focus confirm button for keyboard accessibility
  const confirmBtn = document.getElementById("modal-confirm-btn");
  if (confirmBtn) confirmBtn.focus();
}

/**
 * Close the modal dialog
 */
function closeModal() {
  const modal = document.getElementById("custom-modal");
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

// ==========================================================================
// 4. EVENT COUNTDOWN TIMER (TARGET: 4 NOVEMBER 2026)
// ==========================================================================
function initCountdown() {
  // Target: November 4, 2026 at 09:00:00 IST (+05:30)
  const targetDate = new Date("2026-11-04T09:00:00+05:30").getTime();

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// ==========================================================================
// 5. FAQ ACCORDION INTERACTION
// ==========================================================================
function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const isExpanded = header.getAttribute("aria-expanded") === "true";
      const targetId = header.getAttribute("aria-controls");
      const targetBody = document.getElementById(targetId);

      if (!targetBody) return;

      // Close all other accordions for clean single-view accordion
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute("aria-expanded", "false");
          const otherId = otherHeader.getAttribute("aria-controls");
          const otherBody = document.getElementById(otherId);
          if (otherBody) otherBody.hidden = true;
        }
      });

      // Toggle current accordion
      if (isExpanded) {
        header.setAttribute("aria-expanded", "false");
        targetBody.hidden = true;
      } else {
        header.setAttribute("aria-expanded", "true");
        targetBody.hidden = false;
      }
    });

    // Keyboard navigation (Enter / Space)
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        header.click();
      }
    });
  });
}

// ==========================================================================
// 6. DOMAIN SEARCH & LIVE FILTERING
// ==========================================================================
function initDomainSearch() {
  const searchInput = document.getElementById("domain-search");
  const clearBtn = document.getElementById("clear-search-btn");
  const countDisplay = document.getElementById("domain-count-display");
  const domainCards = document.querySelectorAll(".domain-card");

  if (!searchInput || !domainCards.length) return;

  function filterDomains() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    domainCards.forEach(card => {
      const title = (card.getAttribute("data-domain-title") || "").toLowerCase();
      const desc = (card.querySelector(".domain-description")?.textContent || "").toLowerCase();

      if (!query || title.includes(query) || desc.includes(query)) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Update clear button visibility
    if (clearBtn) {
      clearBtn.style.display = query ? "block" : "none";
    }

    // Update count display
    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCount} of ${domainCards.length} Domains`;
    }
  }

  searchInput.addEventListener("input", filterDomains);

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      filterDomains();
      searchInput.focus();
    });
  }
}

// ==========================================================================
// 7. NAVIGATION, SCROLLSPY & MOBILE MENU
// ==========================================================================
function initNavigation() {
  const navbarHeader = document.getElementById("navbar-header");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTopBtn = document.getElementById("back-to-top");

  // Sticky Navbar border effect & Back-to-top visibility on scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (navbarHeader) {
      if (scrollY > 50) {
        navbarHeader.classList.add("scrolled");
      } else {
        navbarHeader.classList.remove("scrolled");
      }
    }

    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  }, { passive: true });

  // Mobile menu toggle
  function toggleMobileMenu(forceClose = false) {
    if (!hamburgerBtn || !mobileDrawer) return;

    const isActive = forceClose ? true : hamburgerBtn.getAttribute("aria-expanded") === "true";

    if (isActive) {
      hamburgerBtn.setAttribute("aria-expanded", "false");
      mobileDrawer.classList.remove("active");
      mobileDrawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    } else {
      hamburgerBtn.setAttribute("aria-expanded", "true");
      mobileDrawer.classList.add("active");
      mobileDrawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => toggleMobileMenu());
  }

  // Close mobile drawer when clicking any navigation link
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => toggleMobileMenu(true));
  });

  // Back to top button action
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Active section scrollspy using IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  if ("IntersectionObserver" in window && sections.length) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href === `#${currentId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }
}

// ==========================================================================
// 8. COPY TO CLIPBOARD HELPER
// ==========================================================================
function initClipboardHelpers() {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const textToCopy = btn.getAttribute("data-copy");
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback method
          const tempInput = document.createElement("input");
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }
        showToast(`Copied to clipboard: ${textToCopy}`);
      } catch (err) {
        console.error("Clipboard copy failed", err);
        showToast("Unable to copy to clipboard.");
      }
    });
  });
}

// ==========================================================================
// 9. INTERACTIVE NEURAL CONSTELLATION CANVAS
// ==========================================================================
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let animationFrameId;
  let isCanvasVisible = true;

  // Mouse interaction tracker
  const mouse = { x: null, y: null, radius: 120 };

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    // Dynamic particle count based on screen width
    const count = Math.floor((width * height) / 18000);
    const particleCount = Math.min(Math.max(count, 35), 80);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? "rgba(0, 245, 255, 0.7)" : "rgba(168, 85, 247, 0.7)"
      });
    }
  }

  function draw() {
    if (!isCanvasVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Bounce off borders
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse subtle repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          p.x -= (dx / dist) * 1.5;
          p.y -= (dy / dist) * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = 1 - dist / 110;
          ctx.strokeStyle = `rgba(0, 245, 255, ${alpha * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();

  // Track pointer movements over hero section
  const heroSection = document.getElementById("home");
  if (heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Pause canvas animation when hero is off-screen to save battery & CPU
    if ("IntersectionObserver" in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isCanvasVisible = entry.isIntersecting;
          if (isCanvasVisible) {
            cancelAnimationFrame(animationFrameId);
            draw();
          }
        });
      }, { threshold: 0.05 });
      heroObserver.observe(heroSection);
    }
  }
}

// ==========================================================================
// 10. ATTACH ALL REGISTRATION TRIGGERS
// ==========================================================================
function initRegistrationTriggers() {
  // All buttons with class .register-trigger-btn trigger central helper
  const triggerButtons = document.querySelectorAll(".register-trigger-btn");

  triggerButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const domainAttr = btn.getAttribute("data-domain") || "";
      const selectEl = document.getElementById("register-domain-select");

      let selectedDomain = domainAttr;

      // If button has specific domain attribute, update dropdown
      if (domainAttr && selectEl) {
        selectEl.value = domainAttr;
      } else if (selectEl && selectEl.value) {
        selectedDomain = selectEl.value;
      }

      handleRegistrationClick(selectedDomain);
    });
  });

  // Modal close buttons
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalConfirmBtn = document.getElementById("modal-confirm-btn");
  const modalBackdrop = document.getElementById("custom-modal");

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Escape key closes modal & mobile drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      const hamburger = document.getElementById("hamburger-btn");
      if (hamburger && hamburger.getAttribute("aria-expanded") === "true") {
        hamburger.click();
      }
    }
  });
}

// ==========================================================================
// 11. APPLICATION INITIALIZATION ON DOM READY
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initCountdown();
  initFaqAccordion();
  initDomainSearch();
  initClipboardHelpers();
  initHeroCanvas();
  initRegistrationTriggers();
});
