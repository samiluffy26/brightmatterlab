/* ========================================
   BRIGHTMATTER LAB - SISTEMA DE NAVEGACIÓN
   ========================================
   
   Funcionalidades:
   - Menú móvil responsive
   - Navegación activa
   - Smooth scroll
   - Detección de sección actual
   ======================================== */

// === VARIABLES DE NAVEGACIÓN ===
let currentSection = '';
let isMenuOpen = false;
let scrollTimeout;

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    
    // Asegurar que el menú tenga el display correcto según el tamaño de pantalla
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        if (window.innerWidth > 965) {
            navMenu.style.display = '';
            navMenu.classList.remove('active', 'mobile-active');
        }
    }
    
    console.log('🧭 Sistema de navegación inicializado');
});

// === INICIALIZAR NAVEGACIÓN ===
function initNavigation() {
    setupMobileMenu();
    setupActiveNavigation();
    setupScrollNavigation();
    setupNavigationEffects();
}

// === CONFIGURAR MENÚ MÓVIL ===
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    // Toggle del menú móvil
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Cerrar menú al hacer click en enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 965) {
                closeMobileMenu();
            }
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Cerrar menú al redimensionar ventana
    window.addEventListener('resize', function() {
        const navMenu = document.getElementById('nav-menu');
        
        if (window.innerWidth > 965 && isMenuOpen) {
            closeMobileMenu();
        }
        
        // Restaurar display para desktop
        if (window.innerWidth > 965) {
            if (navMenu) {
                navMenu.style.display = '';
                navMenu.classList.remove('active', 'mobile-active');
            }
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

// === TOGGLE MENÚ MÓVIL ===
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu');
    
    if (isMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// === ABRIR MENÚ MÓVIL ===
function openMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const body = document.body;
    
    if (!navMenu || !mobileMenuToggle) return;
    
    // Forzar estilos directamente si es necesario
    navMenu.style.display = 'flex';
    navMenu.classList.add('active', 'mobile-active');
    mobileMenuToggle.classList.add('active');
    body.style.overflow = 'hidden';
    
    isMenuOpen = true;
    
    // Animar entrada de enlaces
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.3s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 100 + 100);
    });
    
    // Event personalizado
    document.dispatchEvent(new CustomEvent('mobileMenuOpened'));
}

// === CERRAR MENÚ MÓVIL ===
function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const body = document.body;
    
    if (!navMenu || !mobileMenuToggle) return;
    
    navMenu.classList.remove('active', 'mobile-active');
    mobileMenuToggle.classList.remove('active');
    body.style.overflow = '';
    
    // Limpiar estilos inline solo en mobile
    if (window.innerWidth <= 965) {
        navMenu.style.display = '';
    } else {
        // En desktop, asegurar que se vea el menú
        navMenu.style.display = '';
    }
    
    isMenuOpen = false;
    
    // Limpiar estilos de animación
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.transition = '';
        link.style.opacity = '';
        link.style.transform = '';
    });
    
    // Event personalizado
    document.dispatchEvent(new CustomEvent('mobileMenuClosed'));
}

// === CONFIGURAR NAVEGACIÓN ACTIVA ===
function setupActiveNavigation() {
    // Solo para página principal (index.html)
    if (!isHomePage()) return;
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Crear observer para detectar sección activa
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                updateActiveSection(entry.target.id);
            }
        });
    }, {
        threshold: [0.3, 0.7],
        rootMargin: '-80px 0px -60% 0px'
    });
    
    // Observar todas las secciones
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Actualizar navegación inicial
    updateActiveSection('home');
}

// === ACTUALIZAR SECCIÓN ACTIVA ===
function updateActiveSection(sectionId) {
    if (currentSection === sectionId) return;
    
    currentSection = sectionId;
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        
        // Verificar si el enlace corresponde a la sección actual
        if (href === `#${sectionId}` || 
            (sectionId === 'home' && href === '#home')) {
            link.classList.add('active');
        }
    });
    
    // Event personalizado
    document.dispatchEvent(new CustomEvent('sectionChanged', {
        detail: { sectionId, previousSection: currentSection }
    }));
}

// === CONFIGURAR NAVEGACIÓN POR SCROLL ===
function setupScrollNavigation() {
    // Solo para página principal
    if (!isHomePage()) return;
    
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                handleScrollNavigation();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
}

// === MANEJAR NAVEGACIÓN EN SCROLL ===
function handleScrollNavigation() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Actualizar progreso de scroll
    updateScrollProgress(scrollPosition, documentHeight, windowHeight);
    
    // Detectar si está en el top
    updateNavbarState(scrollPosition);
}

// === ACTUALIZAR PROGRESO DE SCROLL ===
function updateScrollProgress(scrollPosition, documentHeight, windowHeight) {
    const progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
    
    // Si existe barra de progreso, actualizarla
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = Math.min(progress, 100) + '%';
    }
    
    // Event personalizado
    document.dispatchEvent(new CustomEvent('scrollProgress', {
        detail: { progress: Math.min(progress, 100) }
    }));
}

// === ACTUALIZAR ESTADO DEL NAVBAR ===
function updateNavbarState(scrollPosition) {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    // Agregar clase scrolled después de 50px
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Efecto hide/show en scroll rápido
    if (window.innerWidth > 767) { // Solo en desktop
        handleNavbarAutoHide(scrollPosition);
    }
}

// === MANEJAR AUTO-HIDE DEL NAVBAR ===
let lastScrollPosition = 0;
let scrollDirection = 'down';

function handleNavbarAutoHide(scrollPosition) {
    const navbar = document.getElementById('navbar');
    const threshold = 100; // Mínimo scroll para activar efecto
    
    if (scrollPosition < threshold) {
        navbar.classList.remove('navbar-hidden');
        return;
    }
    
    // Determinar dirección del scroll
    if (scrollPosition > lastScrollPosition && scrollDirection !== 'down') {
        scrollDirection = 'down';
        // Ocultar navbar al hacer scroll hacia abajo
        navbar.classList.add('navbar-hidden');
    } else if (scrollPosition < lastScrollPosition && scrollDirection !== 'up') {
        scrollDirection = 'up';
        // Mostrar navbar al hacer scroll hacia arriba
        navbar.classList.remove('navbar-hidden');
    }
    
    lastScrollPosition = scrollPosition;
}

// === CONFIGURAR EFECTOS DE NAVEGACIÓN ===
function setupNavigationEffects() {
    setupHoverEffects();
    setupClickEffects();
    setupKeyboardNavigation();
}

// === CONFIGURAR EFECTOS HOVER ===
function setupHoverEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efecto hover en logo
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            const logoImg = this.querySelector('.logo-img');
            if (logoImg) {
                logoImg.style.transform = 'rotate(5deg) scale(1.1)';
            }
        });
        
        logo.addEventListener('mouseleave', function() {
            const logoImg = this.querySelector('.logo-img');
            if (logoImg) {
                logoImg.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    }
}

// === CONFIGURAR EFECTOS DE CLICK ===
function setupClickEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Efecto de ripple
            createNavRippleEffect(this, e);
            
            // Smooth scroll para enlaces internos
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScrollToSection(href);
            }
        });
    });
}

// === CREAR EFECTO RIPPLE EN NAV ===
function createNavRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(224, 123, 223, 0.3);
        transform: translate(${x}px, ${y}px);
        width: ${size}px;
        height: ${size}px;
        animation: navRipple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// === SMOOTH SCROLL A SECCIÓN ===
function smoothScrollToSection(sectionId) {
    const targetElement = document.querySelector(sectionId);
    if (!targetElement) return;
    
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    const targetPosition = targetElement.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // Cerrar menú móvil si está abierto
    if (isMenuOpen) {
        closeMobileMenu();
    }
    
    // Event personalizado
    document.dispatchEvent(new CustomEvent('smoothScrollStarted', {
        detail: { targetId: sectionId, targetPosition }
    }));
}

// === CONFIGURAR NAVEGACIÓN POR TECLADO ===
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Navegación con teclas de flecha (solo en página principal)
        if (!isHomePage()) return;
        
        const sections = ['home', 'services-preview', 'projects-preview', 'why-choose-us'];
        let currentIndex = sections.indexOf(currentSection);
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    navigateToNextSection(sections, currentIndex);
                }
                break;
                
            case 'ArrowUp':
            case 'PageUp':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    navigateToPrevSection(sections, currentIndex);
                }
                break;
                
            case 'Home':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    smoothScrollToSection('#home');
                }
                break;
        }
    });
    
    // Focus trap para menú móvil
    setupMobileFocusTrap();
}

// === NAVEGAR A SIGUIENTE SECCIÓN ===
function navigateToNextSection(sections, currentIndex) {
    if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        smoothScrollToSection(`#${nextSection}`);
    }
}

// === NAVEGAR A SECCIÓN ANTERIOR ===
function navigateToPrevSection(sections, currentIndex) {
    if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        smoothScrollToSection(`#${prevSection}`);
    }
}

// === CONFIGURAR FOCUS TRAP PARA MÓVIL ===
function setupMobileFocusTrap() {
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu');
    
    if (!navMenu || !mobileMenuToggle) return;
    
    document.addEventListener('keydown', function(e) {
        if (!isMenuOpen) return;
        
        if (e.key === 'Tab') {
            const focusableElements = navMenu.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// === UTILIDADES DE NAVEGACIÓN ===

// === VERIFICAR SI ES PÁGINA PRINCIPAL ===
function isHomePage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename === 'index.html' || filename === '';
}

// === OBTENER SECCIÓN ACTUAL ===
function getCurrentSection() {
    return currentSection;
}

// === FORZAR ACTUALIZACIÓN DE NAVEGACIÓN ===
function updateNavigation() {
    if (isHomePage()) {
        const sections = document.querySelectorAll('section[id]');
        let currentSectionId = 'home';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom > 100) {
                currentSectionId = section.id;
            }
        });
        
        updateActiveSection(currentSectionId);
    }
}

// === CONFIGURAR BREADCRUMBS (PARA PÁGINAS INTERNAS) ===
function setupBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumbs');
    if (!breadcrumbContainer) return;
    
    const path = window.location.pathname;
    const pathArray = path.split('/').filter(segment => segment);
    
    let breadcrumbHTML = '<a href="/">Inicio</a>';
    
    pathArray.forEach((segment, index) => {
        const isLast = index === pathArray.length - 1;
        const segmentName = formatSegmentName(segment);
        
        if (isLast) {
            breadcrumbHTML += ` <span class="separator">/</span> <span class="current">${segmentName}</span>`;
        } else {
            const href = '/' + pathArray.slice(0, index + 1).join('/');
            breadcrumbHTML += ` <span class="separator">/</span> <a href="${href}">${segmentName}</a>`;
        }
    });
    
    breadcrumbContainer.innerHTML = breadcrumbHTML;
}

// === FORMATEAR NOMBRE DE SEGMENTO ===
function formatSegmentName(segment) {
    const segmentMap = {
        'projects': 'Proyectos',
        'team': 'Equipo',
        'services': 'Servicios',
        'contact': 'Contacto'
    };
    
    return segmentMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
}

// === CONFIGURAR NAVEGACIÓN DE PÁGINAS ===
function setupPageNavigation() {
    // Para páginas internas, configurar navegación de regreso
    if (!isHomePage()) {
        setupBackNavigation();
        setupBreadcrumbs();
    }
}

// === CONFIGURAR NAVEGACIÓN DE REGRESO ===
function setupBackNavigation() {
    const backButtons = document.querySelectorAll('.back-btn, .btn-back');
    
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Si hay historial, ir atrás
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Si no hay historial, ir a inicio
                window.location.href = '/';
            }
        });
    });
}

// === INICIALIZAR NAVEGACIÓN DE PÁGINA ===
function initPageNavigation() {
    setupPageNavigation();
    updateActivePageNavigation();
}

// === ACTUALIZAR NAVEGACIÓN ACTIVA DE PÁGINA ===
function updateActivePageNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        
        // Verificar si el enlace corresponde a la página actual
        if (href && (currentPath.includes(href) || 
            (currentPath === '/' && href === '#home'))) {
            link.classList.add('active');
        }
    });
}

// === EVENTOS PERSONALIZADOS ===
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegación de página
    initPageNavigation();
    
    // Event listeners para eventos personalizados
    document.addEventListener('sectionChanged', function(e) {
        console.log('📍 Sección cambiada:', e.detail.sectionId);
    });
    
    document.addEventListener('mobileMenuOpened', function() {
        console.log('📱 Menú móvil abierto');
    });
    
    document.addEventListener('mobileMenuClosed', function() {
        console.log('📱 Menú móvil cerrado');
    });
});

// === CSS DINÁMICO PARA ANIMACIONES ===
const navAnimationCSS = `
    @keyframes navRipple {
        from {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 1;
        }
        to {
            transform: translate(var(--x), var(--y)) scale(4);
            opacity: 0;
        }
    }
    
    .navbar-hidden {
        transform: translateY(-100%);
        transition: transform 0.3s ease-in-out;
    }
    
    .nav-link {
        transition: transform 0.2s ease;
    }
    
    .logo-img {
        transition: transform 0.3s ease;
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 9999;
        transition: width 0.1s ease;
    }
`;

// Inyectar CSS dinámico
const styleElement = document.createElement('style');
styleElement.textContent = navAnimationCSS;
document.head.appendChild(styleElement);

// === EXPORTAR FUNCIONES ===
window.BrightmatterNavigation = {
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu,
    smoothScrollToSection,
    getCurrentSection,
    updateNavigation,
    isMenuOpen: () => isMenuOpen
};