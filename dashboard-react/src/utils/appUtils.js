/**
 * Utilidades principales para el dashboard
 * Equivalente al main.js y index.js originales
 */

// === VARIABLES GLOBALES ===
export const APP_CONFIG = {
  pages: ['dashboard', 'requests', 'services'],
  animationDuration: 500,
  scrollThreshold: 100
};

// === SMOOTH SCROLL ===
export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// === NAVBAR EFFECTS ===
export const initNavbarEffects = () => {
  let lastScrollY = window.scrollY;
  
  const handleScroll = () => {
    const navbar = document.querySelector('.sidebar');
    const currentScrollY = window.scrollY;
    
    if (navbar) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add('navbar-hidden');
      } else {
        navbar.classList.remove('navbar-hidden');
      }
    }
    
    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

// === SCROLL ANIMATIONS ===
export const setupScrollAnimations = () => {
  // Delay para asegurar que el DOM esté listo
  return new Promise((resolve) => {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              
              // Agregar delay a elementos hermanos para efecto cascada
              const siblings = Array.from(entry.target.parentElement?.children || []);
              siblings.forEach((sibling, index) => {
                if (sibling !== entry.target && sibling.classList.contains('animate-on-scroll')) {
                  setTimeout(() => {
                    sibling.classList.add('animate-in');
                  }, index * 150);
                }
              });
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observar elementos animables
      const animatedElements = document.querySelectorAll(
        '.stat-card, .request-card, .chart-container, .filters-bar, .animate-on-scroll'
      );
      
      animatedElements.forEach((el) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
      });

      resolve(() => observer.disconnect());
    }, 300);
  });
};

// === HOVER EFFECTS ===
export const setupHoverEffects = () => {
  const interactiveElements = document.querySelectorAll(
    '.stat-card, .request-card, .menu-item, .filter-btn, .modal-btn'
  );
  
  interactiveElements.forEach(element => {
    // Efecto ripple en click
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
};

// === LAZY LOADING ===
export const initLazyLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
  return () => imageObserver.disconnect();
};

// === THEME MANAGEMENT ===
export const initThemeManager = () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  return {
    setTheme: (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    },
    getTheme: () => localStorage.getItem('theme') || 'dark',
    toggleTheme: () => {
      const current = localStorage.getItem('theme') || 'dark';
      const newTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      return newTheme;
    }
  };
};

// === PERFORMANCE UTILITIES ===
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// === INICIALIZACIÓN PRINCIPAL ===
export const initializeApp = async () => {
  console.log('🚀 Dashboard React - Inicializando...');
  
  // Esperar un poco para que React termine de renderizar
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Inicializar todas las funcionalidades
  initSmoothScroll();
  initNavbarEffects();
  await setupScrollAnimations();
  setupHoverEffects();
  initLazyLoading();
  initThemeManager();
  
  console.log('✅ Dashboard React - Inicialización completa');
};