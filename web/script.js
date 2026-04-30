/**
 * Nusantara Energy - Main JavaScript
 * Fitur: Mobile Nav, Modal Login, Animated Stats, Smooth Scroll, Header Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== Mobile Navigation Toggle =====
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
    });
    
    // Close nav when clicking a link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // ===== Login Modal Functionality =====
  const loginModal = document.getElementById('loginModal');
  const loginBtns = document.querySelectorAll('#loginBtn, #footerLoginBtn');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  const loginForm = document.querySelector('.login-form');
  
  function openModal() {
    if (loginModal) {
      loginModal.classList.add('active');
      loginModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.getElementById('email')?.focus();
      }, 300);
    }
  }
  
  function closeModal() {
    if (loginModal) {
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }
  
  loginBtns.forEach(btn => {
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });
  
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal?.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Handle form submission
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value;
    
    if (email?.includes('@nusantaraenergy.co.id')) {
      alert('✅ Login berhasil! Mengalihkan ke portal...');
      closeModal();
      loginForm.reset();
      // window.location.href = '/portal';
    } else {
      alert('⚠️ Gunakan email perusahaan @nusantaraenergy.co.id untuk akses portal.');
    }
  });
  
  // ===== Animated Counter for Stats =====
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateStats = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        const duration = 2000;
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.textContent = Math.floor(current).toLocaleString('id-ID');
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target.toLocaleString('id-ID');
          }
        };
        
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  };
  
  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(animateStats, {
      threshold: 0.5
    });
    statNumbers.forEach(num => statsObserver.observe(num));
  }
  
  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== Header Scroll Effect =====
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      header.style.padding = '0.75rem 0';
    } else {
      header.style.boxShadow = 'var(--shadow-sm)';
      header.style.padding = '1rem 0';
    }
  }, { passive: true });
  
  // ===== Active Navigation Link =====
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // ===== Initialize Modal =====
  if (loginModal) {
    loginModal.setAttribute('aria-hidden', 'true');
  }
  
  // ===== Console Welcome =====
  console.log(
    '%c⚡ Nusantara Energy',
    'font-size: 18px; font-weight: bold; color: #0d3b66;'
  );
  console.log(
    '%cPowering The Nation - Built with commitment to sustainability',
    'font-size: 12px; color: #6c757d;'
  );
});