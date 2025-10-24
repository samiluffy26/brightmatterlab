/**
 * BRIGHTMATTER LAB - PROYECTOS
 * Archivo: projects.js
 * Descripción: JavaScript específico para la página de proyectos
 */

// =============================================================================
// DATOS DE PROYECTOS
// =============================================================================

const projectsData = {
    ecommerce: {
        title: "Plataforma E-commerce",
        category: "E-commerce",
        status: "Completado",
        year: "2024",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
        description: "Plataforma de comercio electrónico completa con sistema de pagos integrado, gestión de inventario en tiempo real, panel administrativo avanzado y experiencia de usuario optimizada para conversiones.",
        features: [
            "Sistema de pagos con Stripe y PayPal",
            "Gestión de inventario en tiempo real",
            "Panel administrativo completo",
            "Sistema de reviews y ratings",
            "Carrito de compras persistente",
            "Notificaciones push",
            "Analytics y reportes",
            "SEO optimizado"
        ],
        images: [
            "../images/projects/ecommerce-1.jpg",
            "../images/projects/ecommerce-2.jpg",
            "../images/projects/ecommerce-3.jpg"
        ],
        challenges: "Integración con múltiples pasarelas de pago y optimización para alta concurrencia",
        solution: "Implementamos una arquitectura de microservicios con cache distribuido y balanceador de carga",
        results: "Aumento del 40% en conversiones y reducción del 60% en tiempo de carga"
    },
    
    eduvisor: {
        title: "EduVisor - Ministerio de Educación",
        category: "Plataforma Gubernamental",
        status: "Completado",
        year: "2024",
        technologies: [".NET Core", "Blazor", "SQL Server", "Azure", "SignalR"],
        description: "Sistema integral de gestión educativa para el Ministerio de Educación con módulos de seguimiento estudiantil, gestión académica, reportes administrativos y comunicación institucional.",
        features: [
            "Gestión de estudiantes y docentes",
            "Sistema de calificaciones",
            "Reportes estadísticos avanzados",
            "Comunicación institucional",
            "Gestión de horarios y materias",
            "Portal para padres de familia",
            "Dashboard ejecutivo",
            "Integración con MINERD"
        ],
        images: [
            "../images/projects/eduvisor-1.jpg",
            "../images/projects/eduvisor-2.jpg",
            "../images/projects/eduvisor-3.jpg"
        ],
        challenges: "Manejo de grandes volúmenes de datos estudiantiles y cumplimiento de normativas gubernamentales",
        solution: "Arquitectura escalable con políticas de seguridad robustas y backup automático",
        results: "Digitalización exitosa de 200+ instituciones educativas"
    },

    "kids-edu": {
        title: "Plataforma Educativa Infantil",
        category: "Educación",
        status: "Completado",
        year: "2024",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "WebRTC"],
        description: "Aplicación interactiva de aprendizaje para niños con juegos educativos, seguimiento de progreso, contenido multimedia y herramientas para padres y educadores.",
        features: [
            "Juegos educativos interactivos",
            "Sistema de gamificación",
            "Seguimiento de progreso",
            "Contenido multimedia adaptativo",
            "Portal para padres",
            "Reportes de aprendizaje",
            "Sistema de recompensas",
            "Modo offline"
        ],
        images: [
            "../images/projects/kids-edu-1.jpg",
            "../images/projects/kids-edu-2.jpg",
            "../images/projects/kids-edu-3.jpg"
        ],
        challenges: "Crear una experiencia atractiva para niños mientras se mantiene el valor educativo",
        solution: "Diseño UX especializado para niños con elementos de gamificación respaldados por pedagogía",
        results: "95% de retención de usuarios y mejora del 30% en métricas de aprendizaje"
    },

    portfolios: {
        title: "Portafolios Profesionales",
        category: "Desarrollo Web",
        status: "Completado",
        year: "2024",
        technologies: ["Vue.js", "Nuxt.js", "TailwindCSS", "Netlify", "Strapi"],
        description: "Conjunto de sitios web personalizados para profesionales y empresas, con diseño moderno, optimización SEO avanzada y sistema de gestión de contenido.",
        features: [
            "Diseño responsive moderno",
            "Optimización SEO avanzada",
            "Sistema de blog integrado",
            "Galería de proyectos",
            "Formulario de contacto",
            "Integración con redes sociales",
            "Analytics integrado",
            "Velocidad de carga optimizada"
        ],
        images: [
            "../images/projects/portfolio-1.jpg",
            "../images/projects/portfolio-2.jpg",
            "../images/projects/portfolio-3.jpg"
        ],
        challenges: "Crear diseños únicos que reflejen la personalidad de cada cliente",
        solution: "Proceso de diseño colaborativo con prototipado iterativo y feedback continuo",
        results: "Aumento del 200% en consultas profesionales para nuestros clientes"
    },

    netflix: {
        title: "Plataforma de Streaming",
        category: "Entretenimiento",
        status: "Completado",
        year: "2024",
        technologies: ["React", "Redux", "Express.js", "MongoDB", "AWS S3"],
        description: "Plataforma de streaming inspirada en Netflix con funcionalidades de reproducción de video, categorización de contenido, sistema de usuarios y recomendaciones personalizadas.",
        features: [
            "Reproductor de video avanzado",
            "Sistema de recomendaciones",
            "Perfiles múltiples de usuario",
            "Categorización inteligente",
            "Lista de favoritos",
            "Historial de reproducción",
            "Búsqueda avanzada",
            "Modo offline para móviles"
        ],
        images: [
            "../images/projects/netflix-1.jpg",
            "../images/projects/netflix-2.jpg",
            "../images/projects/netflix-3.jpg"
        ],
        challenges: "Optimización de streaming de video y algoritmo de recomendaciones efectivo",
        solution: "CDN global para distribución de contenido y ML para recomendaciones personalizadas",
        results: "Experiencia de streaming fluida con 99.9% de uptime"
    },

    "pet-adoption": {
        title: "Plataforma de Adopción de Mascotas",
        category: "Social",
        status: "Completado",
        year: "2024",
        technologies: ["Laravel", "Vue.js", "MySQL", "Cloudinary", "Twilio"],
        description: "Sistema integral para facilitar la adopción de perros y gatos, con perfiles detallados de mascotas, proceso de adopción digitalizado y comunicación entre refugios y adoptantes.",
        features: [
            "Perfiles detallados de mascotas",
            "Proceso de adopción digital",
            "Sistema de mensajería",
            "Geolocalización de refugios",
            "Calendario de eventos",
            "Sistema de donaciones",
            "Notificaciones SMS/Email",
            "Panel para refugios"
        ],
        images: [
            "../images/projects/pet-adoption-1.jpg",
            "../images/projects/pet-adoption-2.jpg",
            "../images/projects/pet-adoption-3.jpg"
        ],
        challenges: "Crear un proceso de adopción que sea seguro tanto para mascotas como adoptantes",
        solution: "Sistema de verificación multicapa con seguimiento post-adopción",
        results: "Aumento del 150% en adopciones exitosas y reducción del 80% en tiempo de procesamiento"
    },

    "tax-platform": {
        title: "Plataforma de Impuestos Internos",
        category: "Gubernamental",
        status: "Completado",
        year: "2024",
        technologies: ["ASP.NET Core", "Angular", "SQL Server", "Azure", "Crystal Reports"],
        description: "Sistema integral para la gestión de impuestos internos con cálculos automáticos, reportes fiscales, declaraciones en línea y portal para contribuyentes.",
        features: [
            "Cálculos fiscales automáticos",
            "Declaraciones en línea",
            "Portal del contribuyente",
            "Reportes fiscales avanzados",
            "Integración bancaria",
            "Auditoría digital",
            "Notificaciones automáticas",
            "Dashboard ejecutivo"
        ],
        images: [
            "../images/projects/tax-platform-1.jpg",
            "../images/projects/tax-platform-2.jpg",
            "../images/projects/tax-platform-3.jpg"
        ],
        challenges: "Manejar complejas regulaciones fiscales y garantizar exactitud en cálculos",
        solution: "Motor de reglas fiscales configurable con validaciones automáticas multicapa",
        results: "Reducción del 70% en errores de declaración y aumento del 90% en declaraciones digitales"
    }
};

// =============================================================================
// INICIALIZACIÓN
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
    initProjectAnimations();
    setupProjectModal();
    initTechStackAnimations();
    
    // Llamar función global si existe
    if (typeof window.projectsPageInit === 'function') {
        window.projectsPageInit();
    }
    
    console.log('🎯 Página de proyectos inicializada');
});

// =============================================================================
// FILTROS DE PROYECTOS
// =============================================================================

/**
 * Inicializar filtros de proyectos
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos
            filterProjects(filter, projectCards);
            
            // Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'filter_projects', {
                    'event_category': 'Projects',
                    'event_label': filter
                });
            }
        });
    });
}

/**
 * Filtrar proyectos basado en categoría
 */
function filterProjects(filter, projectCards) {
    projectCards.forEach((card, index) => {
        const categories = card.dataset.category || '';
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        } else {
            card.classList.remove('visible');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Anunciar cambios para accesibilidad
    const visibleCount = document.querySelectorAll('.project-card[style="display: block"], .project-card:not([style*="display: none"])').length;
    if (typeof window.BrightmatterLab?.announceToScreenReader === 'function') {
        window.BrightmatterLab.announceToScreenReader(`Mostrando ${visibleCount} proyectos`);
    }
}

// =============================================================================
// ANIMACIONES DE PROYECTOS
// =============================================================================

/**
 * Inicializar animaciones específicas de proyectos
 */
function initProjectAnimations() {
    // Animación de aparición escalonada para cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                projectObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar cards de proyectos
    document.querySelectorAll('.project-card').forEach(card => {
        projectObserver.observe(card);
    });
    
    // Animación para elementos flotantes del hero
    animateFloatingElements();
}

/**
 * Animar elementos flotantes del hero
 */
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-code, .floating-mobile, .floating-web');
    
    floatingElements.forEach((element, index) => {
        // Movimiento aleatorio
        setInterval(() => {
            const x = Math.random() * 20 - 10;
            const y = Math.random() * 20 - 10;
            element.style.transform = `translate(${x}px, ${y}px)`;
        }, 2000 + (index * 500));
    });
}

// =============================================================================
// MODAL DE PROYECTOS
// =============================================================================

/**
 * Configurar modal de proyectos
 */
function setupProjectModal() {
    const modal = document.getElementById('projectModal');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    // Cerrar modal al hacer clic en backdrop
    backdrop.addEventListener('click', closeProjectModal);
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

/**
 * Abrir modal de proyecto
 */
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) {
        console.error('Proyecto no encontrado:', projectId);
        return;
    }
    
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // Generar contenido del modal
    modalBody.innerHTML = generateModalContent(project);
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Inicializar galería si hay múltiples imágenes
    if (project.images && project.images.length > 1) {
        initImageGallery();
    }
    
    // Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_project_details', {
            'event_category': 'Projects',
            'event_label': project.title
        });
    }
    
    // Accesibilidad
    modal.querySelector('.modal-close').focus();
}

/**
 * Cerrar modal de proyecto
 */
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Generar contenido HTML del modal
 */
function generateModalContent(project) {
    const techTags = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    const featuresList = project.features.map(feature => `<li><i class="fas fa-check"></i>${feature}</li>`).join('');
    
    let imagesHTML = '';
    if (project.images && project.images.length > 0) {
        if (project.images.length === 1) {
            imagesHTML = `<img src="${project.images[0]}" alt="${project.title}" class="modal-image-single">`;
        } else {
            const imageSlides = project.images.map((img, index) => 
                `<div class="gallery-slide ${index === 0 ? 'active' : ''}">
                    <img src="${img}" alt="${project.title} ${index + 1}">
                </div>`
            ).join('');
            
            imagesHTML = `
                <div class="image-gallery">
                    <div class="gallery-container">
                        ${imageSlides}
                    </div>
                    <button class="gallery-prev" onclick="changeSlide(-1)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="gallery-next" onclick="changeSlide(1)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <div class="gallery-indicators">
                        ${project.images.map((_, index) => 
                            `<button class="indicator ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></button>`
                        ).join('')}
                    </div>
                </div>
            `;
        }
    }
    
    return `
        <div class="modal-project">
            <div class="modal-header">
                <h2 class="modal-title">${project.title}</h2>
                <div class="modal-meta">
                    <span class="project-category">${project.category}</span>
                    <span class="project-year">${project.year}</span>
                    <span class="project-status">${project.status}</span>
                </div>
            </div>
            
            ${imagesHTML}
            
            <div class="modal-content-body">
                <div class="project-description">
                    <h3>Descripción del Proyecto</h3>
                    <p>${project.description}</p>
                </div>
                
                <div class="project-technologies">
                    <h3>Tecnologías Utilizadas</h3>
                    <div class="tech-tags">
                        ${techTags}
                    </div>
                </div>
                
                <div class="project-features">
                    <h3>Características Principales</h3>
                    <ul class="features-list">
                        ${featuresList}
                    </ul>
                </div>
                
                ${project.challenges ? `
                    <div class="project-challenges">
                        <h3>Desafíos</h3>
                        <p>${project.challenges}</p>
                    </div>
                ` : ''}
                
                ${project.solution ? `
                    <div class="project-solution">
                        <h3>Solución</h3>
                        <p>${project.solution}</p>
                    </div>
                ` : ''}
                
                ${project.results ? `
                    <div class="project-results">
                        <h3>Resultados</h3>
                        <p>${project.results}</p>
                    </div>
                ` : ''}
                
                <div class="modal-cta">
                    <a href="contact.html" class="btn btn-primary">
                        <i class="fas fa-envelope"></i>
                        Solicitar Proyecto Similar
                    </a>
                </div>
            </div>
        </div>
        
        <style>
            .modal-project {
                padding: 30px;
            }
            
            .modal-header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 1px solid rgba(224, 123, 223, 0.2);
                padding-bottom: 20px;
            }
            
            .modal-title {
                font-family: var(--font-tech);
                font-size: 1.8rem;
                color: var(--text-light);
                margin-bottom: 15px;
            }
            
            .modal-meta {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .modal-meta span {
                padding: 6px 12px;
                background: var(--gradient-primary);
                color: white;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .modal-image-single {
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 15px;
                margin-bottom: 30px;
            }
            
            .image-gallery {
                position: relative;
                margin-bottom: 30px;
            }
            
            .gallery-container {
                position: relative;
                height: 300px;
                border-radius: 15px;
                overflow: hidden;
            }
            
            .gallery-slide {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            .gallery-slide.active {
                opacity: 1;
            }
            
            .gallery-slide img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .gallery-prev,
            .gallery-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
                transition: var(--transition-fast);
                z-index: 2;
            }
            
            .gallery-prev {
                left: 15px;
            }
            
            .gallery-next {
                right: 15px;
            }
            
            .gallery-prev:hover,
            .gallery-next:hover {
                background: var(--primary-color);
            }
            
            .gallery-indicators {
                display: flex;
                justify-content: center;
                gap: 8px;
                margin-top: 15px;
            }
            
            .indicator {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background: rgba(224, 123, 223, 0.3);
                cursor: pointer;
                transition: var(--transition-fast);
            }
            
            .indicator.active {
                background: var(--primary-color);
            }
            
            .modal-content-body h3 {
                font-family: var(--font-tech);
                color: var(--primary-color);
                margin: 25px 0 15px;
                font-size: 1.2rem;
            }
            
            .modal-content-body p {
                color: var(--text-gray);
                line-height: 1.7;
                margin-bottom: 20px;
            }
            
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 20px;
            }
            
            .tech-tag {
                padding: 6px 12px;
                background: var(--gradient-secondary);
                color: white;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .features-list {
                list-style: none;
                padding: 0;
            }
            
            .features-list li {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--text-gray);
                margin-bottom: 8px;
                line-height: 1.5;
            }
            
            .features-list i {
                color: var(--accent-color);
                font-size: 0.9rem;
                width: 16px;
            }
            
            .modal-cta {
                text-align: center;
                margin-top: 30px;
                padding-top: 25px;
                border-top: 1px solid rgba(224, 123, 223, 0.2);
            }
            
            @media (max-width: 768px) {
                .modal-project {
                    padding: 20px;
                }
                
                .modal-title {
                    font-size: 1.5rem;
                }
                
                .modal-meta {
                    gap: 10px;
                }
                
                .gallery-container {
                    height: 200px;
                }
            }
        </style>
    `;
}

// =============================================================================
// GALERÍA DE IMÁGENES
// =============================================================================

let currentSlide = 0;
let totalSlides = 0;

/**
 * Inicializar galería de imágenes
 */
function initImageGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    totalSlides = slides.length;
    currentSlide = 0;
    
    // Auto-play opcional (comentado por defecto)
    // setInterval(() => {
    //     changeSlide(1);
    // }, 5000);
}

/**
 * Cambiar slide de la galería
 */
function changeSlide(direction) {
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remover clase activa del slide actual
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Calcular nuevo índice
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    // Activar nuevo slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

/**
 * Ir a slide específico
 */
function goToSlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remover clase activa
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Establecer nuevo slide
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// =============================================================================
// ANIMACIONES TECH STACK
// =============================================================================

/**
 * Inicializar animaciones del tech stack
 */
function initTechStackAnimations() {
    const techItems = document.querySelectorAll('.tech-item');
    
    // Observer para animaciones on scroll
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                }, index * 100);
                techObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    techItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        techObserver.observe(item);
    });
}

// =============================================================================
// UTILIDADES Y HELPERS
// =============================================================================

/**
 * Función para manejar errores de carga de imágenes
 */
function handleImageError(img) {
    img.src = '../images/placeholder/project-placeholder.jpg';
    img.alt = 'Imagen no disponible';
}

/**
 * Función para lazy loading de imágenes de proyectos
 */
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
}

// =============================================================================
// EXPORTAR FUNCIONES GLOBALES
// =============================================================================

// Hacer funciones disponibles globalmente para uso en HTML
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;

// =============================================================================
// INICIALIZACIÓN FINAL
// =============================================================================

// Configurar lazy loading cuando la página esté lista
window.addEventListener('load', setupLazyLoading);