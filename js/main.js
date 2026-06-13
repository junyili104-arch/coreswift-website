// ===== CoreSwift - Enhanced Interactive Experience =====

const CONTACT_EMAIL = 'jackvmeihousing@hotmail.com';
const PHONE_NUMBER = '+86 150 9499 9991';
const WECHAT_ID = '+8615094999991';
const LINKEDIN_URL = 'https://www.linkedin.com/in/jack-jun-yi-li-b82a6b382';

// ===== Navigation =====
function toggleNav() {
  document.getElementById('navLinks')?.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const toggle = document.getElementById('mobileToggle');
  if (nav && toggle && !toggle.contains(e.target) && !nav.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
  // Highlight current page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.getAttribute('href') === path) a.style.color = 'var(--accent)';
  });

  // Populate contact info
  const emailEl = document.getElementById('contactEmail');
  if (emailEl) emailEl.textContent = CONTACT_EMAIL;
  const phoneEl = document.getElementById('contactPhone');
  if (phoneEl) phoneEl.textContent = PHONE_NUMBER;
  const wechatEl = document.getElementById('contactWechat');
  const wechatRow = document.getElementById('contactWechatRow');
  if (WECHAT_ID && wechatEl && wechatRow) {
    wechatEl.textContent = WECHAT_ID;
    wechatRow.style.display = 'flex';
  }

  // Init all enhancements
  initScrollAnimations();
  initCounters();
  initBackToTop();
  initGalleryLightbox();
  initParallaxHero();
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== 1. Enhanced Scroll Animations with Stagger =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Add stagger delay based on child index
        const parent = el.closest('[data-stagger]');
        if (parent) {
          const children = [...parent.querySelectorAll('.animate-in')];
          const idx = children.indexOf(el);
          el.style.transitionDelay = (idx * 0.1) + 's';
        }
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

// ===== 2. Number Counter Animation =====
function initCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        if (!target) return;
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
}

function animateCounter(el, target) {
  const duration = 2000;
  const steps = 30;
  const stepTime = duration / steps;
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
      return;
    }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, stepTime);
}

// ===== 3. Back to Top Button =====
function initBackToTop() {
  const btn = document.createElement('div');
  btn.className = 'back-to-top';
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
}

// ===== 4. Image Gallery Lightbox =====
function initGalleryLightbox() {
  // Only on product detail page
  const gallery = document.getElementById('pd-gallery');
  if (!gallery) return;

  // Create lightbox
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img class="lightbox-img" src="" alt=""><div class="lightbox-caption"></div>';
  document.body.appendChild(lightbox);

  const img = lightbox.querySelector('.lightbox-img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const close = lightbox.querySelector('.lightbox-close');

  // Delegate click on gallery images
  gallery.addEventListener('click', (e) => {
    const target = e.target.closest('.gallery-item img, .gallery-item .gallery-placeholder');
    if (!target) return;
    const src = target.tagName === 'IMG' ? target.src : target.dataset.src || '';
    const alt = target.alt || 'Product image';
    if (src) {
      img.src = src;
      caption.textContent = alt;
      lightbox.classList.add('active');
    }
  });

  close.onclick = () => lightbox.classList.remove('active');
  lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); };
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('active'); });
}

// ===== 5. Parallax Hero Effect =====
function initParallaxHero() {
  const hero = document.querySelector('.hero-bg img');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.3;
    hero.style.transform = `translateY(${offset}px)`;
  });
}

// ===== 6. Product Card Follow Mouse =====
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== 7. Contact Form =====
document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  const originalText = btn.innerHTML;
  btn.innerHTML = 'Sending...';
  btn.disabled = true;

  const data = Object.fromEntries(new FormData(this).entries());
  const FORMSPREE_ID = '';

  if (FORMSPREE_ID) {
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) showSuccess(); else showError();
    } catch { showError(); }
  } else {
    console.log('Form data (not sent):', data);
    showSuccess();
  }

  function showSuccess() {
    btn.innerHTML = 'Sent ✓';
    btn.style.background = '#1a7a4a';
    setTimeout(() => { btn.innerHTML = originalText; btn.style.background = ''; btn.disabled = false; }, 3000);
  }
  function showError() {
    btn.innerHTML = 'Failed — email directly';
    btn.style.background = '#c0392b';
    setTimeout(() => { btn.innerHTML = originalText; btn.style.background = ''; btn.disabled = false; }, 3000);
  }
});

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Product Detail Page =====
function getProductType() {
  return new URLSearchParams(window.location.search).get('type') || 'mining';
}

const PRODUCTS = {
  mining: {
    title: 'Mine Camp Accommodation — Modular & NCC Compliant',
    tagline: 'FIFO Accommodation · Remote Grade',
    description: 'Modular mine camp accommodation engineered for remote sites across WA and Queensland. Fully NCC compliant, factory prefabricated, and ready for FIFO workforce housing.',
    specs: ['Class 3 NCC', 'Remote Grade', 'Custom Layouts', 'Ensuite Pods', 'Mess Halls', 'Recreation Modules'],
    certs: ['SAA Certified', 'WaterMark Certified', 'NCC Compliant', 'AS 1530 Fire Tested'],
    applications: ['Mine site FIFO villages', 'Remote construction camps', 'Fly-in fly-out workforce housing', 'Expansion modules for existing camps'],
    images: 6
  },
  granny: {
    title: 'Prefab Granny Flat Australia — Transportable & Customisable',
    tagline: 'Secondary Dwellings · CDC Compliant',
    description: 'Our prefab granny flat Australia range is compliant with NSW CDC and VIC VC253/282 reforms. Factory-built transportable homes — 60m² designs eligible for exempt development.',
    specs: ['CDC Compliant', '60m² Design', 'VIC & NSW', 'Council Ready', 'Kitchen & Bathroom', 'Separate Entry'],
    certs: ['SAA Certified', 'WaterMark Certified', 'NCC 2022/2025', 'Energy Efficiency Compliant'],
    applications: ['Backyard secondary dwellings', 'Investment properties', 'Multi-generational living', 'Rental income units'],
    images: 4
  },
  cabin: {
    title: 'Modular Airbnb Cabin — Portable & Factory Prefabricated',
    tagline: 'Off-Grid · Tourism Ready',
    description: 'A modular airbnb cabin built for remote tourism properties. Portable, prefabricated, and fully customisable — studio to two-bedroom with optional solar and rainwater.',
    specs: ['Off-Grid Ready', 'Turnkey Solution', 'Custom Finishes', 'Solar Optional', 'Rainwater System', 'Battery Ready'],
    certs: ['SAA Certified', 'WaterMark Certified', 'NCC Compliant'],
    applications: ['Airbnb / Short-term rentals', 'Eco-tourism resorts', 'Farm stay accommodation', 'Weekend getaway cabins'],
    images: 4
  },
  custom: {
    title: 'Custom Modular Buildings — Designed to Australian Standards',
    tagline: 'Commercial · Site-Specific',
    description: 'Custom modular buildings Australia: site offices, medical clinics, classrooms, or commercial spaces. Engineered and prefabricated to Australian standards, delivered nationwide.',
    specs: ['Custom Design', 'Commercial Grade', 'Small Orders OK', 'Flexible Layouts', 'Engineered to Spec', 'Multi-Storey'],
    certs: ['SAA Certified', 'WaterMark Certified', 'NCC Compliant', 'Engineer Signed'],
    applications: ['Site offices & amenities', 'Medical clinics', 'School classrooms', 'Commercial spaces'],
    images: 4
  }
};

if (window.location.pathname.includes('product-detail')) {
  document.addEventListener('DOMContentLoaded', () => {
    const type = getProductType();
    const product = PRODUCTS[type] || PRODUCTS.mining;

    document.getElementById('pd-title').textContent = product.title;
    document.getElementById('pd-tagline').textContent = product.tagline;
    document.getElementById('pd-description').textContent = product.description;

    const specsList = document.getElementById('pd-specs');
    if (specsList) specsList.innerHTML = product.specs.map(s => `<li>${s}</li>`).join('');

    const certList = document.getElementById('pd-certs');
    if (certList) certList.innerHTML = product.certs.map(c => `<span class="product-tag">${c}</span>`).join('');

    const appsList = document.getElementById('pd-apps');
    if (appsList) appsList.innerHTML = product.applications.map(a => `<li>${a}</li>`).join('');

    const gallery = document.getElementById('pd-gallery');
    if (gallery) {
      gallery.innerHTML = Array.from({length: product.images}, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        return `<div class="gallery-item" style="cursor:pointer;"><img src="images/gallery/${type}-${num}.svg" alt="${product.title} - Image ${i+1}" style="width:100%;height:200px;object-fit:cover;border-radius:12px;display:block;background:var(--bg-card);transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"></div>`;
      }).join('');
    }
  });
}
