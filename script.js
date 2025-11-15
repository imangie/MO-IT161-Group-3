// ===== Smooth page cross-fade + loader =====
document.addEventListener('DOMContentLoaded', () => {
  // Ensure the loader element exists on every page
  let loader = document.querySelector('.page-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="spinner" role="status" aria-label="Loading"></div>';
    document.body.appendChild(loader);
  }

  const showLoader = () => loader.classList.add('visible');
  const hideLoader = () => loader.classList.remove('visible');

  // Fade-in on page load (and hide loader just in case)
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove('page-enter');
      hideLoader();
    });
  });

  // Intercept nav clicks to fade + show spinner
  const navLinks = document.querySelectorAll('nav a[href], a.js-page[href]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (!href) return;

      const url = new URL(href, window.location.href);

      // 1) Same-page hash (e.g. "#CONTACT-US")
      const isHashOnly = href.trim().startsWith('#');

      // 2) Any link with #CONTACT-US (case-insensitive, even cross-page)
      const isContactHash = (url.hash || '').toLowerCase() === '#contact-us';
      if (isHashOnly || isContactHash) {
        return;
      }

      const isSamePage = url.pathname === window.location.pathname;
      if (isSamePage && url.hash) return;
      e.preventDefault();
      document.body.classList.add('page-fade-out');

      showLoader();
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
});

// Best Sellers Image Hover Effect //
const bestSellerImages = document.querySelectorAll("#bestsellers img");

bestSellerImages.forEach(img => {
  img.addEventListener("mouseover", () => {
    img.classList.add("hovered");
  });

  img.addEventListener("mouseout", () => {
    img.classList.remove("hovered");
  });
});

// Specials Image Hover Effect //
const specialsImages = document.querySelectorAll("#specials img");

specialsImages.forEach(img => {
  img.addEventListener("mouseover", () => {
    img.classList.add("hovered");
  });

  img.addEventListener("mouseout", () => {
    img.classList.remove("hovered");
  });
});

// Navigation Highlight
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  let currentPage = window.location.pathname.split('/').pop();

  // Default to index.html if nothing in the path
  if (currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Skip all hash (#) links so they never highlight
    if (href.startsWith('#')) return;

    if (href === currentPage) {
      link.classList.add('active');
    }
  });
});

// Best sellers carousel controls
document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.querySelector('.carousel-viewport');
  const track = document.querySelector('#bestsellers');
  const prevBtn = document.querySelector('[data-carousel="prev"]');
  const nextBtn = document.querySelector('[data-carousel="next"]');

  if (!viewport || !track || !prevBtn || !nextBtn) return;

  const mediaQuery = window.matchMedia('(max-width: 768px)');

  const getSlideWidth = () => {
    const firstCard = track.querySelector('.carousel-card');
    if (!firstCard) return viewport.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0);
    return firstCard.getBoundingClientRect().width + gap;
  };

  const scrollBySlide = (direction) => {
    const distance = getSlideWidth();
    viewport.scrollBy({
      left: direction * distance,
      behavior: 'smooth'
    });
  };

  const updateControls = () => {
    if (!mediaQuery.matches) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    prevBtn.disabled = viewport.scrollLeft <= 0;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth - 1;
    nextBtn.disabled = viewport.scrollLeft >= maxScroll;
  };

  prevBtn.addEventListener('click', () => scrollBySlide(-1));
  nextBtn.addEventListener('click', () => scrollBySlide(1));

  viewport.addEventListener('scroll', updateControls);
  window.addEventListener('resize', () => {
    if (!mediaQuery.matches) {
      viewport.scrollTo({ left: 0 });
    }
    updateControls();
  });
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', updateControls);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(updateControls);
  }

  updateControls();
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinksWrapper = document.getElementById('primary-nav');

  if (!nav || !toggle || !navLinksWrapper) return;

  const setExpanded = (expanded) => {
    toggle.setAttribute('aria-expanded', String(expanded));
    navLinksWrapper.classList.toggle('open', expanded);
  };

  toggle.addEventListener('click', () => {
    const currentlyExpanded = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!currentlyExpanded);
  });

  navLinksWrapper.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        setExpanded(false);
      }
    });
  });
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', () => {
  let btn = document.getElementById('backToTop');

  if (!btn) {
    btn = document.createElement('a');
    btn.id = 'backToTop';
    btn.href = '#top';
    document.body.appendChild(btn);
  }

  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<span aria-hidden="true">&#8593;</span>';

  const toggleVisibility = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    btn.classList.toggle('show', y > 800);
  };

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility);

  btn.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
