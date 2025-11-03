/* ========================================
   BRIGHTMATTER LAB - JAVASCRIPT PRINCIPAL
   ========================================
   
   Funcionalidades principales:
   - Scroll animations
   - Smooth scrolling
   - Navbar effects
   - Loading animations
   - Intersection Observer
   - Utilities
   ======================================== */

// Verificar que el JS se carga
console.log('📄 main.js cargado correctamente');

// === VARIABLES GLOBALES ===
let isScrolling = false;
let ticking = false;
let currentPage = 'home';

// === DOM READY ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Brightmatter Lab - Inicializando...');
    
    initializeApp();
    setupEventListeners();
    startAnimations();
    
    console.log('✅ Brightmatter Lab - Inicialización completa');
});

// === INICIALIZACIÓN PRINCIPAL ===
function initializeApp() {
    // Detectar página actual
    detectCurrentPage();
    
    // Inicializar observador de scroll
    initScrollObserver();
    
    // Configurar animaciones on scroll
    setupScrollAnimations();
    
    // Inicializar efectos de navbar
    initNavbarEffects();
    
    // Configurar smooth scroll
    setupSmoothScroll();
    
    // Inicializar efectos de hover
    setupHoverEffects();
    
    // Configurar lazy loading de imágenes
    setupLazyLoading();
    
    // Inicializar modo oscuro
    initDarkMode();
    
    // Crear botón de toggle del tema
    createThemeToggleButton();
    
    // Inicializar contador de estadísticas (si existe)
    initCounters();
}

// === DETECCIÓN DE PÁGINA ACTUAL ===
function detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    if (filename.includes('projects')) currentPage = 'projects';
    else if (filename.includes('team')) currentPage = 'team';
    else if (filename.includes('services')) currentPage = 'services';
    else if (filename.includes('contact')) currentPage = 'contact';
    else currentPage = 'home';
    
    // Actualizar navegación activa
    updateActiveNavigation();
}

// === ACTUALIZAR NAVEGACIÓN ACTIVA ===
function updateActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if ((currentPage === 'home' && href === '#home') ||
            href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// === CONFIGURAR EVENT LISTENERS ===
function setupEventListeners() {
    // Scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Resize events
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Click events para botones
    document.addEventListener('click', handleClicks);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyboard);
    
    // Mouse events para efectos parallax
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
}

// === INICIALIZAR EFECTOS DE NAVBAR ===
function initNavbarEffects() {
    console.log('🌙 MODO OSCURO: Inicializando efectos de navbar');
    
    const navbar = document.getElementById('navbar');
    if (navbar) {
        // Agregar clase inicial
        navbar.classList.add('navbar-initialized');
        console.log('🌙 MODO OSCURO: Navbar inicializado correctamente');
    } else {
        console.log('🌙 MODO OSCURO: Navbar no encontrado');
    }
}

// === INICIALIZACIÓN PRINCIPAL ===
function initializeApp() {
    // Detectar página actual
    detectCurrentPage();
    
    // Inicializar observador de scroll
    initScrollObserver();
    
    // Configurar animaciones on scroll
    setupScrollAnimations();
    
    // Inicializar efectos de navbar
    initNavbarEffects();
    
    // Configurar smooth scroll
    setupSmoothScroll();
    
    // Inicializar efectos de hover
    setupHoverEffects();
    
    // Configurar lazy loading de imágenes
    setupLazyLoading();
    
    // Inicializar modo oscuro
    initDarkMode();
    
    // Pequeño delay para asegurar que el DOM esté completamente listo
    setTimeout(() => {
        createThemeToggleButton();
    }, 100);
    
    // Inicializar contador de estadísticas (si existe)
    initCounters();
}
function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateNavbarOnScroll();
            updateScrollIndicator();
            checkElementsInView();
            ticking = false;
        });
        ticking = true;
    }
}

// === EFECTOS DE NAVBAR EN SCROLL ===
function updateNavbarOnScroll() {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// === ACTUALIZAR INDICADOR DE SCROLL ===
function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    const scrollY = window.scrollY;
    const opacity = Math.max(0, 1 - (scrollY / 300));
    
    scrollIndicator.style.opacity = opacity;
    
    if (scrollY > 100) {
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.pointerEvents = 'auto';
    }
}

// === CONFIGURAR ANIMACIONES DE SCROLL ===
function setupScrollAnimations() {
    // Crear Intersection Observer para elementos animados
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Agregar delay si tiene atributo data-aos-delay
                const delay = entry.target.getAttribute('data-aos-delay');
                if (delay) {
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar todos los elementos con data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        animationObserver.observe(el);
    });
}

// === INICIALIZAR OBSERVADOR DE SCROLL ===
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger custom animations
                triggerElementAnimation(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observar elementos con clase animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// === TRIGGER ANIMACIONES PERSONALIZADAS ===
function triggerElementAnimation(element) {
    // Animación de contadores
    if (element.classList.contains('counter')) {
        animateCounter(element);
    }
    
    // Animación de barras de progreso
    if (element.classList.contains('progress-bar')) {
        animateProgressBar(element);
    }
    
    // Animación de texto typewriter
    if (element.classList.contains('typewriter-text')) {
        animateTypewriter(element);
    }
}

// === ANIMACIÓN DE CONTADORES ===
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target') || '0');
    const duration = parseInt(element.getAttribute('data-duration') || '2000');
    const increment = target / (duration / 16);
    
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// === ANIMACIÓN DE BARRAS DE PROGRESO ===
function animateProgressBar(element) {
    const percentage = element.getAttribute('data-percentage') || '0';
    const progressFill = element.querySelector('.progress-fill');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

// === ANIMACIÓN TYPEWRITER ===
function animateTypewriter(element) {
    const text = element.getAttribute('data-text') || element.textContent;
    const speed = parseInt(element.getAttribute('data-speed') || '100');
    
    element.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    };
    
    typeWriter();
}

// === CONFIGURAR SMOOTH SCROLL ===
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Offset para navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === CONFIGURAR EFECTOS DE HOVER ===
function setupHoverEffects() {
    // Efecto parallax en hero animation
    const heroAnimation = document.querySelector('.hero-animation');
    if (heroAnimation) {
        heroAnimation.addEventListener('mousemove', (e) => {
            const rect = heroAnimation.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Mover elementos tech basado en posición del mouse
            document.querySelectorAll('.tech-element').forEach((element, index) => {
                const moveX = (x - 0.5) * 20 * (index + 1);
                const moveY = (y - 0.5) * 20 * (index + 1);
                
                element.style.transform += ` translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    // Efecto ripple en botones
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRippleEffect);
    });
}

// === CREAR EFECTO RIPPLE ===
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: translate(${x}px, ${y}px);
        width: ${size}px;
        height: ${size}px;
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// === CONFIGURAR LAZY LOADING ===
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.setAttribute('src', src);
                    img.removeAttribute('data-src');
                    img.classList.remove('image-loading');
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.classList.add('image-loading');
        imageObserver.observe(img);
    });
}

// === INICIALIZAR CONTADORES ===
function initCounters() {
    // Agregar contadores a elementos que los necesiten
    const counterElements = document.querySelectorAll('.counter');
    counterElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
}

// === MANEJO DE CLICKS ===
function handleClicks(e) {
    const target = e.target;
    
    // Cerrar menú móvil al hacer click en un enlace
    if (target.classList.contains('nav-link') && window.innerWidth <= 767) {
        const mobileMenu = document.getElementById('nav-menu');
        const toggle = document.getElementById('mobile-menu');
        
        mobileMenu.classList.remove('active');
        toggle.classList.remove('active');
    }
    
    // Manejar clicks en botones CTA
    if (target.classList.contains('btn') || target.closest('.btn')) {
        handleCTAClick(target.closest('.btn') || target);
    }
}

// === MANEJAR CLICKS EN CTA ===
function handleCTAClick(button) {
    // Agregar clase de loading si es necesario
    button.classList.add('loading');
    
    // Remover loading después de un delay
    setTimeout(() => {
        button.classList.remove('loading');
    }, 1000);
}

// === MANEJO DE TECLADO ===
function handleKeyboard(e) {
    // Cerrar menú móvil con Escape
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('nav-menu');
        const toggle = document.getElementById('mobile-menu');
        
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            toggle.classList.remove('active');
        }
    }
}

// === MANEJO DE MOUSE MOVE ===
function handleMouseMove(e) {
    // Efecto parallax sutil en elementos
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// === MANEJO DE RESIZE ===
function handleResize() {
    // Recalcular animaciones si es necesario
    checkElementsInView();
    
    // Ajustar altura de elementos si es necesario
    adjustElementHeights();
}

// === VERIFICAR ELEMENTOS EN VISTA ===
function checkElementsInView() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('aos-animate')) {
            element.classList.add('aos-animate');
        }
    });
}

// === VERIFICAR SI ELEMENTO ESTÁ EN VIEWPORT ===
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// === AJUSTAR ALTURAS DE ELEMENTOS ===
function adjustElementHeights() {
    // Ajustar altura de hero section si es necesario
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth <= 767) {
        const minHeight = window.innerHeight * 0.9;
        hero.style.minHeight = minHeight + 'px';
    }
}

// === INICIAR ANIMACIONES ===
function startAnimations() {
    // Inicializar partículas de fondo si existe el elemento
    const particlesContainer = document.querySelector('.particles-background');
    if (particlesContainer) {
        createParticles(particlesContainer);
    }
    
    // Inicializar animaciones automáticas
    startAutoAnimations();
}

// === CREAR PARTÍCULAS ===
function createParticles(container) {
    const particleCount = window.innerWidth > 767 ? 50 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (6 + Math.random() * 4) + 's';
        
        // Color aleatorio entre los colores corporativos
        const colors = ['#e07bdf', '#d8c7fa', '#93ebbd'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}

// === INICIAR ANIMACIONES AUTOMÁTICAS ===
function startAutoAnimations() {
    // Animación de elementos tecnológicos en hero
    const techElements = document.querySelectorAll('.tech-element');
    techElements.forEach((element, index) => {
        element.style.animationDelay = (index * 2) + 's';
    });
}

// === UTILIDADES ===

// Función debounce para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función throttle para optimizar scroll
function throttle(func, limit) {
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
}

// Función para obtener posición de scroll
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

// Función para scroll suave a elemento
function scrollToElement(element, offset = 80) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    if (element) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// === MANEJO DE ERRORES ===
window.addEventListener('error', function(e) {
    console.error('💥 Error en Brightmatter Lab:', e.error);
});

// === LOG DE PERFORMANCE ===
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Brightmatter Lab cargado en ${loadTime.toFixed(2)}ms`);
});

// === MODO OSCURO ===

/**
 * Función principal para cambiar entre modo claro y oscuro
 * @param {boolean} isDark - Si es true, activa modo oscuro. Si es false, modo claro. Si es undefined, alterna
 */
function toggleDarkMode(isDark) {
    console.log('� MODO OSCURO: toggleDarkMode ejecutado');
    
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = isDark === undefined ? (currentTheme === 'dark' ? 'light' : 'dark') : (isDark ? 'dark' : 'light');
    
    console.log('� MODO OSCURO: Cambiando de', currentTheme, 'a', newTheme);
    
    // Aplicar el tema
    html.setAttribute('data-theme', newTheme);
    
    // Guardar preferencia en localStorage
    localStorage.setItem('brightmatter-theme', newTheme);
    
    // Actualizar el botón del toggle si existe
    updateThemeToggleButton(newTheme);
    
    // Animación de transición suave
    applyThemeTransition();
    
    console.log('� MODO OSCURO: Tema aplicado correctamente');
}

/**
 * Inicializa el modo oscuro basado en la preferencia guardada o preferencia del sistema
 */
function initDarkMode() {
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('brightmatter-theme');
    
    if (savedTheme) {
        // Usar la preferencia guardada
        toggleDarkMode(savedTheme === 'dark');
    } else {
        // Verificar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        toggleDarkMode(prefersDark);
    }
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo cambiar si no hay preferencia guardada
        if (!localStorage.getItem('brightmatter-theme')) {
            toggleDarkMode(e.matches);
        }
    });
}

/**
 * Actualiza el estado visual del botón de toggle del tema
 * @param {string} theme - El tema actual ('light' o 'dark')
 */
function updateThemeToggleButton(theme) {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        const icon = toggleButton.querySelector('i');
        
        if (theme === 'dark') {
            toggleButton.classList.add('dark-mode');
            if (icon) icon.className = 'fas fa-sun';
        } else {
            toggleButton.classList.remove('dark-mode');
            if (icon) icon.className = 'fas fa-moon';
        }
    }
}

/**
 * Aplica una transición suave al cambiar de tema
 */
function applyThemeTransition() {
    const body = document.body;
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Remover la transición después de que termine
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

/**
 * Inicializa el botón de toggle del tema (ya existe en el HTML)
 */
function createThemeToggleButton() {
    console.log('🌙 MODO OSCURO: Buscando botón...');
    
    const toggleButton = document.getElementById('theme-toggle');
    
    if (toggleButton) {
        console.log('🌙 MODO OSCURO: Botón encontrado, agregando evento click');
        
        toggleButton.addEventListener('click', (e) => {
            console.log('🌙 MODO OSCURO: ¡Botón clickeado!');
            e.preventDefault();
            toggleDarkMode();
        });
        
        // Actualizar el estado inicial
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        updateThemeToggleButton(currentTheme);
        
        console.log('� MODO OSCURO: Botón inicializado correctamente');
    } else {
        console.log('🌙 MODO OSCURO: ❌ Botón NO encontrado');
        
        // Intentar de nuevo en 500ms
        setTimeout(() => {
            console.log('🌙 MODO OSCURO: Reintentando...');
            createThemeToggleButton();
        }, 500);
    }
}

// === FUNCIONALIDAD DE ENLACES A MODALES ===
function initProjectModalLinks() {
    // Buscar todos los enlaces con data-project-modal
    const modalLinks = document.querySelectorAll('[data-project-modal]');
    
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const modalId = this.getAttribute('data-project-modal');
            const projectsUrl = this.getAttribute('href');
            
            // Guardar el ID del modal en localStorage para abrirlo en la página de proyectos
            localStorage.setItem('openModal', modalId);
            
            // Navegar a la página de proyectos
            window.location.href = projectsUrl;
        });
    });
}

// Función para abrir modal si hay uno pendiente
function checkPendingModal() {
    const pendingModal = localStorage.getItem('openModal');
    
    if (pendingModal) {
        // Limpiar el storage
        localStorage.removeItem('openModal');
        
        // Esperar un poco para que la página se cargue completamente
        setTimeout(() => {
            // Buscar el modal y abrirlo
            const modal = document.getElementById(pendingModal);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                
                // Inicializar el carrusel del modal si existe
                if (typeof ModalCarousel !== 'undefined') {
                    new ModalCarousel(pendingModal);
                }
            }
        }, 500);
    }
}

// === EXPORTAR FUNCIONES GLOBALES ===
window.BrightmatterLab = {
    scrollToElement,
    createRippleEffect,
    animateCounter,
    debounce,
    throttle,
    toggleDarkMode,
    initDarkMode,
    createThemeToggleButton,
    initProjectModalLinks,
    checkPendingModal,
    // Función de test para verificar funcionamiento
    testDarkMode: function() {
        console.log('🧪 Test de Modo Oscuro');
        console.log('📋 Tema actual:', document.documentElement.getAttribute('data-theme'));
        console.log('🔘 Botón encontrado:', !!document.getElementById('theme-toggle'));
        this.toggleDarkMode();
        setTimeout(() => {
            console.log('📋 Tema después del cambio:', document.documentElement.getAttribute('data-theme'));
        }, 100);
    }
};