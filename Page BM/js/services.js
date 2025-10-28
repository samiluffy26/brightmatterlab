// Test script - minimal version v4
console.log('🚀 Services.js loaded successfully - v4');

// Función para toggle del FAQ
function toggleFaq(button) {
    console.log('🔄 toggleFaq called');

    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');

    faqItem.classList.toggle('active');

    if (faqItem.classList.contains('active')) {
        // Usar altura dinámica del contenido
        answer.style.maxHeight = answer.scrollHeight + 'px';
        console.log('📈 Expanded answer, height:', answer.scrollHeight);
    } else {
        answer.style.maxHeight = '0';
        console.log('📉 Collapsed answer');
    }
}

console.log('✅ toggleFaq function defined');

// Inicializar FAQ
function initFAQ() {
    console.log('🎯 Initializing FAQ...');
    const faqButtons = document.querySelectorAll('.faq-question');
    console.log('📋 Found FAQ buttons:', faqButtons.length);

    faqButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            console.log('🖱️ FAQ button clicked:', index + 1);
            toggleFaq(this);
        });
    });

    console.log('✅ FAQ initialized');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('📧 EmailJS inicializado para servicios');
    } else {
        console.error('❌ EmailJS no está disponible');
    }
}

// — Formulario de servicios —
function initServiceForm() {
    const form = document.getElementById('serviceForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);
    fillFormFromURL();
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');

    if (!validateForm(form)) {
        showFormErrors();
        return;
    }

    toggleFormLoading(submitBtn, true);

    try {
        const formData = prepareFormData(form);
        await sendServiceEmail(formData);
        showSuccessModal();
        form.reset();
        clearFormErrors();
        trackFormSubmission(formData);
    } catch (error) {
        console.error('Error enviando formulario:', error);
        showFormError('Hubo un error al enviar tu solicitud. Por favor intenta nuevamente.');
    } finally {
        toggleFormLoading(submitBtn, false);
    }
}

function prepareFormData(form) {
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        if (key === 'features') {
            if (!data[key]) data[key] = [];
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }

    if (data.features && Array.isArray(data.features)) {
        data.features = data.features.join(', ');
    } else {
        data.features = 'Ninguna especificada';
    }

    data.timestamp = new Date().toLocaleString();
    data.userAgent = navigator.userAgent;
    data.referrer = document.referrer || 'Directo';
    data.currentUrl = window.location.href;
    data.projectSummary = createProjectSummary(data);

    return data;
}

// — Crear resumen del proyecto —
function createProjectSummary(data) {
    const summary = [];
    summary.push(`NUEVA SOLICITUD DE SERVICIO - BRIGHTMATTER LAB`);
    summary.push(`=====================================`);
    summary.push(`Cliente: ${data.firstName || ''} ${data.lastName || ''}`);
    summary.push(`Email: ${data.email || ''}`);
    summary.push(`Teléfono: ${data.phone || 'No proporcionado'}`);
    summary.push(`Empresa: ${data.company || 'No especificada'}`);
    summary.push(``);
    summary.push(`PROYECTO:`);
    summary.push(`Tipo: ${getProjectTypeText(data.projectType || '')}`);
    summary.push(`Título: ${data.projectTitle || ''}`);
    summary.push(`Descripción: ${data.projectDescription || ''}`);
    summary.push(``);
    summary.push(`REQUERIMIENTOS:`);
    summary.push(`Funcionalidades: ${data.features || 'Ninguna especificada'}`);
    summary.push(`Usuarios objetivo: ${data.targetUsers || 'No especificado'}`);
    summary.push(`Plataformas: ${getPlatformText(data.platforms || '')}`);
    summary.push(``);
    summary.push(`PRESUPUESTO Y TIMELINE:`);
    summary.push(`Presupuesto: ${getBudgetText(data.budget || '')}`);
    summary.push(`Timeline: ${getTimelineText(data.timeline || '')}`);
    summary.push(``);
    if (data.inspiration) {
        summary.push(`INSPIRACIÓN/REFERENCIAS:`);
        summary.push(data.inspiration);
        summary.push(``);
    }
    if (data.additionalInfo) {
        summary.push(`INFORMACIÓN ADICIONAL:`);
        summary.push(data.additionalInfo);
        summary.push(``);
    }
    summary.push(`Fecha de solicitud: ${data.timestamp}`);
    return summary.join('\n');
}

// — Funciones auxiliares para textos —
function getProjectTypeText(type) {
    const types = {
        'web-development': 'Desarrollo Web',
        'mobile-app': 'Aplicación Móvil',
        'enterprise-platform': 'Plataforma Empresarial',
        'educational-platform': 'Plataforma Educativa',
        'ecommerce': 'E-commerce',
        'maintenance': 'Mantenimiento/Soporte',
        'landing-page': 'Landing Page',
        'portfolio': 'Portafolio',
        'other': 'Otro'
    };
    return types[type] || type;
}

function getPlatformText(platform) {
    const platforms = {
        'web-only': 'Solo Web',
        'mobile-only': 'Solo Móvil',
        'web-mobile': 'Web + Móvil',
        'desktop': 'Aplicación de Escritorio',
        'all-platforms': 'Todas las Plataformas'
    };
    return platforms[platform] || platform;
}

function getBudgetText(budget) {
    const budgets = {
        '500-1000': '$500 - $1,000',
        '1000-2500': '$1,000 - $2,500',
        '2500-5000': '$2,500 - $5,000',
        '5000-10000': '$5,000 - $10,000',
        '10000-25000': '$10,000 - $25,000',
        '25000+': '$25,000+',
        'to-discuss': 'A discutir'
    };
    return budgets[budget] || budget;
}

function getTimelineText(timeline) {
    const timelines = {
        'urgent': 'Urgente (1-2 semanas)',
        'fast': 'Rápido (1 mes)',
        'normal': 'Normal (2-3 meses)',
        'extended': 'Extendido (3-6 meses)',
        'longterm': 'Largo plazo (6+ meses)',
        'flexible': 'Flexible'
    };
    return timelines[timeline] || timeline;
}

// — Envío de email —
async function sendServiceEmail(data) {
    try {
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            data
        );

        if (response.status !== 200) {
            throw new Error('Error en el envío del email');
        }

        console.log('✅ Email enviado exitosamente:', response);
        return response;
    } catch (error) {
        console.error('❌ Error enviando email:', error);
        throw error;
    }
}

// =============================================================================
// VALIDACIÓN DE FORMULARIO
// =============================================================================

function initFormValidation() {
    const form = document.getElementById('serviceForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Validaciones específicas
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Este campo debe tener al menos 2 caracteres';
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un email válido';
            }
            break;

        case 'phone':
            if (field.hasAttribute('required') && value.length < 7) {
                isValid = false;
                errorMessage = 'Por favor ingresa un teléfono válido';
            }
            break;

        case 'projectType':
            if (!value) {
                isValid = false;
                errorMessage = 'Por favor selecciona el tipo de proyecto';
            }
            break;

        case 'projectTitle':
            if (value.length < 5) {
                isValid = false;
                errorMessage = 'El título debe tener al menos 5 caracteres';
            }
            break;

        case 'projectDescription':
            if (value.length < 20) {
                isValid = false;
                errorMessage = 'La descripción debe tener al menos 20 caracteres';
            }
            break;

        case 'budget':
        case 'timeline':
            if (!value) {
                isValid = false;
                errorMessage = 'Este campo es obligatorio';
            }
            break;

        case 'consent':
            if (!field.checked) {
                isValid = false;
                errorMessage = 'Debes aceptar los términos para continuar';
            }
            break;
    }

    showFieldError(field, isValid ? '' : errorMessage);
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none';
    }

    field.classList.toggle('error', !!message);
}

function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    field.classList.remove('error');
}

function showFormErrors() {
    const firstError = document.querySelector('.form-error[style*="block"]');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function clearFormErrors() {
    const errors = document.querySelectorAll('.form-error');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });

    const fields = document.querySelectorAll('.error');
    fields.forEach(field => field.classList.remove('error'));
}

function showFormError(message) {
    // Mostrar error general (podrías implementar un toast o modal)
    console.error('Error del formulario:', message);
    alert(message);
}

// =============================================================================
// INTERACCIONES DE UI
// =============================================================================

function initFAQInteractions() {
    console.log('🎯 Initializing FAQ interactions...');
    // Agregar event listeners a los botones del FAQ
    const faqButtons = document.querySelectorAll('.faq-question');
    console.log('📋 Found FAQ buttons:', faqButtons.length);

    faqButtons.forEach((button, index) => {
        console.log(`🔗 Adding event listener to FAQ button ${index + 1}`);
        button.addEventListener('click', function() {
            console.log('🖱️ FAQ button clicked, calling toggleFaq');
            toggleFaq(this);
        });
    });

    console.log('✅ FAQ interactions initialized');
}

function initScrollAnimations() {
    // Scroll suave para enlaces internos
    const scrollLinks = document.querySelectorAll('.scroll-to');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupServiceAnimations() {
    // Animaciones específicas de servicios
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos animables
    const animatableElements = document.querySelectorAll('.service-card, .faq-item, .cta-content');
    animatableElements.forEach(element => {
        observer.observe(element);
    });
}

// — Funciones de UI auxiliares —
function toggleFormLoading(button, loading) {
    const icon = button.querySelector('i');
    const text = button.querySelector('span') || button;

    if (loading) {
        button.disabled = true;
        if (icon) icon.className = 'fas fa-spinner fa-spin';
        if (text && text !== button) text.textContent = 'Enviando...';
        else if (text === button) button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    } else {
        button.disabled = false;
        if (icon) icon.className = 'fas fa-paper-plane';
        if (text && text !== button) text.textContent = 'Enviar Solicitud';
        else if (text === button) button.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Solicitud';
    }
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// — Funciones de tracking y analytics —
function trackFormSubmission(data) {
    // Implementar tracking si es necesario
    console.log('📊 Formulario enviado:', data);
}

function fillFormFromURL() {
    // Llenar formulario desde parámetros URL si existen
    const urlParams = new URLSearchParams(window.location.search);

    const projectType = urlParams.get('type');
    if (projectType) {
        const select = document.getElementById('projectType');
        if (select) select.value = projectType;
    }
}

// =============================================================================
// FUNCIONES DE ANIMACIÓN ADICIONALES
// =============================================================================

function addServiceAnimations() {
    // Animaciones adicionales específicas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function initTooltips() {
    // Tooltips para elementos interactivos
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const element = event.target;
    const tooltipText = element.dataset.tooltip;

    if (!tooltipText) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

function setupErrorScrolling() {
    // Scroll automático a errores de formulario
    const errorLinks = document.querySelectorAll('.error-link');
    errorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                targetElement.focus();
            }
        });
    });
}

// Función para toggle del FAQ
function toggleFaq(button) {
    console.log('🔄 toggleFaq called with button:', button);

    const faqItem = button.closest('.faq-item');
    console.log('📦 faqItem found:', faqItem);

    const answer = faqItem.querySelector('.faq-answer');
    console.log('📝 answer found:', answer);

    faqItem.classList.toggle('active');
    console.log('🎨 Toggled active class, now active:', faqItem.classList.contains('active'));

    // Toggle la visibilidad de la respuesta
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
        console.log('📈 Expanded answer, height:', answer.scrollHeight);
    } else {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        console.log('📉 Collapsed answer');
    }
}

console.log('✅ toggleFaq function defined:', typeof toggleFaq);

// Inicializar FAQ inmediatamente si el DOM ya está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('📄 DOM Content Loaded, initializing FAQ');
        initFAQInteractions();
    });
} else {
    // DOM ya está listo
    console.log('📄 DOM already ready, initializing FAQ immediately');
    initFAQInteractions();
}

// =============================================================================
// INICIALIZACIÓN FINAL
// =============================================================================

window.addEventListener('load', function() {
    addServiceAnimations();
    initTooltips();
    setupErrorScrolling();
    console.log('🚀 Página de servicios completamente cargada');
});