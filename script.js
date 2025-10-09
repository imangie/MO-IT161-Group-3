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

// Back to Top Button
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('backToTop');

  // make the link if it doesn't exist
  if (!btn) {
    btn = document.createElement('a');
    btn.id = 'backToTop';
    btn.href = '#top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '↑'; // icon instead of text
    document.body.appendChild(btn);
  }

  var parent = btn.parentElement;
  if (parent && parent.classList && parent.classList.contains('backtop-row')) {
    parent.parentNode.insertBefore(btn, parent.nextSibling);
    parent.remove();
  }

  btn.innerHTML = '↑'; 
  btn.style.fontSize = '22px';
  btn.style.lineHeight = '1';
  btn.style.padding = '10px 14px';
  btn.style.width = '45px';
  btn.style.height = '45px';
  btn.style.display = 'flex';
  btn.style.justifyContent = 'center';
  btn.style.alignItems = 'center';

  btn.style.cursor = 'pointer';
  btn.style.transition = 'all 0.3s ease';

  // place it on the RIGHT
  btn.style.position = 'fixed';
  btn.style.right = '24px';   
  btn.style.left = 'auto';    
  btn.style.bottom = '28px';
  btn.style.zIndex = '9999';
  btn.style.display = 'none';

  // simple look (remove if you style in CSS)
  btn.style.background = '#405B41';
  btn.style.color = '#F2ECE0';
  btn.style.padding = '10px 14px';
  btn.style.borderRadius = '30px';
  btn.style.textDecoration = 'none';
  btn.style.boxShadow = '0 2px 6px rgba(0,0,0,.15)';

    // --- Hover Effect ---
  btn.addEventListener('mouseenter', function () {
    btn.style.background = '#6B8E67'; // lighter green hover
    btn.style.transform = 'translateY(-3px)';
  });

  btn.addEventListener('mouseleave', function () {
    btn.style.background = '#405B41';
    btn.style.transform = 'translateY(0)';
  });

  // show/hide when scrolling
  window.addEventListener('scroll', function () {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    if (y > 800) {
      btn.style.display = 'inline-block';
    } else {
      btn.style.display = 'none';
    }
  });

  // click = smooth scroll to top
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});





