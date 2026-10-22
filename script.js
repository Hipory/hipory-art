/* ─────────────────────────────────────────────────
   script.js — Hipory.Art
───────────────────────────────────────────────── */

/* ── Page Transitions ───────────────────────────── */
const pageTransition = document.getElementById('pageTransition');

// Fade in on page load
window.addEventListener('DOMContentLoaded', () => {
  if (pageTransition) {
    // Small delay for smooth entry
    setTimeout(() => {
      pageTransition.classList.remove('active');
    }, 80);
  }
});

// Handle smooth page exit on transition links
document.querySelectorAll('.transition-link').forEach(link => {
  link.addEventListener('click', e => {
    const targetUrl = link.getAttribute('href');
    // If it's an anchor on current page, let browser handle normal scroll
    if (!targetUrl || targetUrl.startsWith('#')) return;

    e.preventDefault();
    if (pageTransition) {
      pageTransition.classList.add('active');
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 350);
    } else {
      window.location.href = targetUrl;
    }
  });
});

/* ── Typewriter ─────────────────────────────────── */
const phrases = [
  'full of wonder ✨',
  'with wild colors 🎨',
  'you can feel 🌸',
  'that spark joy 💫',
  'beyond imagination 🌙',
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  if (!typeEl) return;
  const current = phrases[phraseIndex];
  if (!deleting) {
    typeEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}
if (typeEl) {
  type();
}

/* ── Dark mode toggle ───────────────────────────── */
const html         = document.documentElement;
const themeToggle  = document.getElementById('themeToggle');
const saved        = localStorage.getItem('hipory-theme') || 'light';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('hipory-theme', next);
});

/* ── Navbar scroll ──────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

/* ── Burger / mobile drawer ─────────────────────── */
const burger      = document.getElementById('burger');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerLinks  = document.querySelectorAll('.drawer-link');

burger.addEventListener('click', () => {
  mobileDrawer.classList.toggle('open');
});
drawerLinks.forEach(link => link.addEventListener('click', () => {
  mobileDrawer.classList.remove('open');
}));

/* ── Scroll reveal ──────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── Category filter ────────────────────────────── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      const cats = (item.dataset.cat || '').split(' ');
      const match = filter === 'all' || cats.includes(filter);
      item.classList.toggle('hidden', !match);
      // Re-trigger reveal animation
      if (match) {
        item.classList.remove('visible');
        setTimeout(() => item.classList.add('visible'), 50);
      }
    });
  });
});

/* ── Lightbox ───────────────────────────────────── */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.lightbox-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Try the actual src first; fall back to placeholder data-img
    const src = btn.dataset.src || btn.dataset.img;
    lightboxImg.src = src;
    lightboxImg.alt = btn.dataset.title;
    lightboxTitle.textContent = btn.dataset.title;

    // If the real asset fails, swap to placeholder
    lightboxImg.onerror = () => { lightboxImg.src = btn.dataset.img; };

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ── Back to top ────────────────────────────────── */
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
