/**
 * BRIGHTMATTER LAB - FUNCIONALIDAD PRINCIPAL
 * Archivo: main.js
 * Descripción: JavaScript principal para interactividad y funcionalidad
 */

// =============================================================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// =============================================================================

// Configuración de EmailJS
const EMAILJS_CONFIG = {
    serviceID: 'service_kg07xsq',
    publicKey: '8ViUteLHPS_5nrML6'
};

// Variables globales
let isScrolling = false;
let lastScrollTop = 0;

// =============================================================================
// INICIALIZACIÓN
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    initEmailJS();
    
    // Inicializar componentes
    initNavigation();
    initScrollEffects();
    initAnimations();
    initParticles();
    initSmoothScroll();
    initLazyLoading();
    
    console.log('🚀 Brightmatter Lab - Página cargada correctamente');
});

// =============================================================================
// NAVEGACIÓN
// =============================================================================

/**
 * Inicializar la navegación y menú móvil
 */
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');
    
    // Toggle menú móvil
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Crear menú móvil si no existe
            let mobileNav = document.querySelector('.mobile-nav');
            if (!mobileNav) {
                createMobileNav();
                mobileNav = document.querySelector('.mobile-nav');
            }
            
            // Toggle clases activas
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Crear menú móvil dinámicamente
    function createMobileNav() {
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        // Clonar el menú de navegación
        const navMenuClone = navMenu.cloneNode(true);
        mobileNav.appendChild(navMenuClone);
        
        // Agregar botón de cerrar
        const closeBtn = document.createElement('div');
        closeBtn.className = 'mobile-nav-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', closeMobileNav);
        
        mobileNav.insertBefore(closeBtn, mobileNav.firstChild);
        document.body.appendChild(mobileNav);
        
        // Cerrar menú al hacer clic en un enlace
        const mobileLinks = mobileNav.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }
    
    // Cerrar menú móvil
    function closeMobileNav() {
        const hamburger = document.getElementById('hamburger');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (hamburger) hamburger.classList.remove('active');
        if (mobileNav) mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        const mobileNav = document.querySelector('.mobile-nav');
        const hamburger = document.getElementById('hamburger');
        
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileNav();
            }
        }
    });
    
    // Navegación activa basada en scroll
    updateActiveNavigation();
}

/**
 * Actualizar navegación activa basada en la sección visible
 */
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', debounce(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.clientHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// =============================================================================
// EFECTOS DE SCROLL
// =============================================================================

/**
 * Inicializar efectos relacionados con el scroll
 */
function initScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de header al hacer scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animaciones on scroll
        handleScrollAnimations();
        
        lastScrollTop = scrollTop;
    }, 16)); // ~60fps
}

/**
 * Manejar animaciones basadas en scroll
 */
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

/**
 * Verificar si un elemento está en el viewport
 */
function isElementInViewport(element, offset = 100) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight - offset) &&
        rect.bottom >= offset
    );
}

// =============================================================================
// ANIMACIONES
// =============================================================================

/**
 * Inicializar animaciones y efectos visuales
 */
function initAnimations() {
    // Aplicar clases de animación a elementos
    applyAnimationClasses();
    
    // Inicializar efectos de hover mejorados
    initHoverEffects();
    
    // Animaciones de texto typewriter (si se necesitan)
    initTypewriterEffects();
}

/**
 * Aplicar clases de animación a elementos específicos
 */
function applyAnimationClasses() {
    // Servicios con animación escalonada
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Cards de acceso rápido
    const accessCards = document.querySelectorAll('.access-card');
    accessCards.forEach((card, index) => {
        card.classList.add('fade-in-up', `delay-${(index + 1) * 100}`);
    });
    
    // Elementos del about
    const aboutElements = document.querySelectorAll('.about-text h3, .about-text p');
    aboutElements.forEach((element, index) => {
        element.classList.add('fade-in-left', `delay-${index * 100}`);
    });
}

/**
 * Inicializar efectos de hover mejorados
 */
function initHoverEffects() {
    // Efecto ripple para botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // Efecto de hover para cards
    const cards = document.querySelectorAll('.service-card, .access-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Crear efecto ripple en botones
 */
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    button.appendChild(ripple);
    
    // Remover el efecto después de la animación
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Efectos de escritura tipo typewriter
 */
function initTypewriterEffects() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                // Hacer parpadear el cursor
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' 
                        ? '2px solid var(--primary-color)' 
                        : 'none';
                }, 500);
            }
        }, 100);
    });
}

// =============================================================================
// SISTEMA DE PARTÍCULAS
// =============================================================================

/**
 * Inicializar sistema de partículas en el hero
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth > 768 ? 50 : 20; // Menos partículas en móvil
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

/**
 * Crear una partícula individual
 */
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición y propiedades aleatorias
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    // Diferentes tamaños y opacidades
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.opacity = Math.random() * 0.8 + 0.2;
    
    container.appendChild(particle);
    
    // Recrear la partícula cuando termine su animación
    particle.addEventListener('animationend', () => {
        particle.remove();
        createParticle(container);
    });
}

// =============================================================================
// SMOOTH SCROLL
// =============================================================================

/**
 * Inicializar scroll suave para enlaces internos
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar smooth scroll a enlaces de ancla válidos
            if (href === '#' || href.length <= 1) return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// =============================================================================
// LAZY LOADING
// =============================================================================

/**
 * Inicializar lazy loading para imágenes
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sin IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// =============================================================================
// EMAILJS
// =============================================================================

/**
 * Inicializar EmailJS
 */
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('📧 EmailJS inicializado correctamente');
    } else {
        console.warn('⚠️ EmailJS no está disponible');
    }
}

/**
 * Enviar formulario usando EmailJS
 */
function sendEmail(formData, templateId) {
    return new Promise((resolve, reject) => {
        if (typeof emailjs === 'undefined') {
            reject(new Error('EmailJS no está disponible'));
            return;
        }
        
        emailjs.send(EMAILJS_CONFIG.serviceID, templateId, formData)
            .then(response => {
                console.log('✅ Email enviado:', response);
                resolve(response);
            })
            .catch(error => {
                console.error('❌ Error enviando email:', error);
                reject(error);
            });
    });
}

// =============================================================================
// UTILIDADES
// =============================================================================

/**
 * Debounce function para optimizar eventos
 */
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

/**
 * Throttle function para optimizar eventos de scroll
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Mostrar notificación toast
 */
function showToast(message, type = 'success') {
    // Crear elemento toast si no existe
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // Crear toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Estilos según el tipo
    switch(type) {
        case 'success':
            toast.style.background = 'linear-gradient(135deg, #93ebbd, #e07bdf)';
            break;
        case 'error':
            toast.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
            break;
        case 'warning':
            toast.style.background = 'linear-gradient(135deg, #ffa726, #ff7043)';
            break;
        default:
            toast.style.background = 'linear-gradient(135deg, #d8c7fa, #93ebbd)';
    }
    
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

/**
 * Formatear datos del formulario para EmailJS
 */
function formatFormData(formElement) {
    const formData = new FormData(formElement);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Agregar timestamp
    data.timestamp = new Date().toLocaleString();
    data.user_agent = navigator.userAgent;
    
    return data;
}

/**
 * Validar email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validar teléfono
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Mostrar/ocultar loading spinner
 */
function toggleLoading(element, show) {
    if (show) {
        element.classList.add('loading');
        element.disabled = true;
        
        // Agregar spinner si no existe
        if (!element.querySelector('.spinner')) {
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            spinner.style.cssText = `
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-right: 8px;
            `;
            element.insertBefore(spinner, element.firstChild);
        }
    } else {
        element.classList.remove('loading');
        element.disabled = false;
        
        // Remover spinner
        const spinner = element.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
    }
}

/**
 * Agregar animación de spin para loading
 */
function addSpinAnimation() {
    if (!document.querySelector('#spin-animation')) {
        const style = document.createElement('style');
        style.id = 'spin-animation';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// =============================================================================
// MANEJO DE ERRORES Y LOGS
// =============================================================================

/**
 * Manejar errores globales
 */
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
    
    // En producción, podrías enviar esto a un servicio de logging
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error?.message || 'Unknown error',
            fatal: false
        });
    }
});

/**
 * Manejar promesas rechazadas
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rechazada:', e.reason);
    
    // En producción, logging
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.reason?.message || 'Unhandled promise rejection',
            fatal: false
        });
    }
});

// =============================================================================
// FUNCIONES ESPECÍFICAS PARA PÁGINAS
// =============================================================================

/**
 * Funciones específicas para la página de proyectos
 */
window.projectsPageInit = function() {
    console.log('🎯 Inicializando página de proyectos');
    
    // Aquí se inicializarán carruseles, filtros, etc.
    // Se implementará en el archivo de proyectos
};

/**
 * Funciones específicas para la página del equipo
 */
window.teamPageInit = function() {
    console.log('👥 Inicializando página del equipo');
    
    // Inicializar efectos específicos del equipo
    // Se implementará en el archivo del equipo
};

/**
 * Funciones específicas para la página de servicios
 */
window.servicesPageInit = function() {
    console.log('🛠️ Inicializando página de servicios');
    
    // Inicializar formularios y validaciones
    // Se implementará en el archivo de servicios
};

/**
 * Funciones específicas para la página de contacto
 */
window.contactPageInit = function() {
    console.log('📞 Inicializando página de contacto');
    
    // Inicializar mapas, formularios, etc.
    // Se implementará en el archivo de contacto
};

// =============================================================================
// EVENTOS DE REDIMENSIONAMIENTO Y ORIENTACIÓN
// =============================================================================

/**
 * Manejar cambios de tamaño de ventana
 */
window.addEventListener('resize', debounce(function() {
    // Reinicializar partículas con nuevo conteo
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        initParticles();
    }
    
    // Ajustar navegación móvil
    const mobileNav = document.querySelector('.mobile-nav');
    if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
        const hamburger = document.getElementById('hamburger');
        if (hamburger) hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250));

/**
 * Manejar cambios de orientación en móviles
 */
window.addEventListener('orientationchange', function() {
    // Esperar a que se complete el cambio de orientación
    setTimeout(() => {
        // Recalcular alturas y posiciones
        window.scrollTo(0, window.pageYOffset);
        
        // Reinicializar efectos si es necesario
        handleScrollAnimations();
    }, 500);
});

// =============================================================================
// ACCESIBILIDAD
// =============================================================================

/**
 * Mejorar accesibilidad con navegación por teclado
 */
document.addEventListener('keydown', function(e) {
    // Escape para cerrar menú móvil
    if (e.key === 'Escape') {
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            const hamburger = document.getElementById('hamburger');
            if (hamburger) hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Tab navigation para elementos focusables
    if (e.key === 'Tab') {
        // Asegurar que los elementos enfocados sean visibles
        const focusedElement = document.activeElement;
        if (focusedElement && !isElementInViewport(focusedElement)) {
            focusedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

/**
 * Anunciar cambios dinámicos para lectores de pantalla
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remover después de que el lector de pantalla lo haya procesado
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// =============================================================================
// OPTIMIZACIÓN DE RENDIMIENTO
// =============================================================================

/**
 * Usar RequestAnimationFrame para animaciones suaves
 */
function smoothAnimation(callback) {
    return function(...args) {
        requestAnimationFrame(() => callback.apply(this, args));
    };
}

/**
 * Verificar soporte para funcionalidades modernas
 */
function checkBrowserSupport() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        webp: false, // Se verificará dinámicamente
        cssGrid: CSS.supports('display', 'grid'),
        customProperties: CSS.supports('--custom', 'property')
    };
    
    // Verificar soporte para WebP
    const webpTest = new Image();
    webpTest.onload = webpTest.onerror = function() {
        features.webp = webpTest.height === 2;
    };
    webpTest.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    
    // Aplicar fallbacks si es necesario
    if (!features.cssGrid) {
        document.body.classList.add('no-grid');
    }
    
    if (!features.customProperties) {
        document.body.classList.add('no-custom-props');
    }
    
    return features;
}

// Verificar soporte al cargar
const browserSupport = checkBrowserSupport();

// =============================================================================
// INICIALIZACIÓN FINAL
// =============================================================================

// Agregar estilos de animación necesarios
addSpinAnimation();

// Log de carga completa
window.addEventListener('load', function() {
    console.log('✨ Brightmatter Lab - Todos los recursos cargados');
    console.log('🔧 Soporte del navegador:', browserSupport);
    
    // Ocultar cualquier loader si existe
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Anunciar carga completa para accesibilidad
    announceToScreenReader('Página cargada completamente');
});

// Exportar funciones principales para uso global
window.BrightmatterLab = {
    showToast,
    sendEmail,
    toggleLoading,
    formatFormData,
    isValidEmail,
    isValidPhone,
    smoothAnimation,
    announceToScreenReader
};