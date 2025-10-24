/**
 * BRIGHTMATTER LAB - SERVICIOS
 * Archivo: services.js
 * Descripción: JavaScript para la página de servicios con formulario EmailJS
 */

// =============================================================================
// CONFIGURACIÓN EMAILJS
// =============================================================================

const EMAILJS_CONFIG = {
    serviceID: 'service_kg07xsq',
    templateID: 'template_services',
    publicKey: '8ViUteLHPS_5nrML6'
};

// =============================================================================
// INICIALIZACIÓN
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();
    initServiceForm();
    initFormValidation();
    initFAQInteractions();
    initScrollAnimations();
    setupServiceAnimations();

    if (typeof window.servicesPageInit === 'function') {
        window.servicesPageInit();
    }

    console.log('🛠 Página de servicios inicializada');
});

// =============================================================================
// FUNCIONES PRINCIPALES (EmailJS, Formulario, Validación, UI, Animaciones)
// =============================================================================

// — EmailJS —
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
    
    summary.push(`Fecha de solicitud: ${data.timestamp}`);
    return summary.join('\n');
}

}
// =============================================================================
// — Las demás funciones (getProjectTypeText, getPlatformText, getBudgetText, 
// getTimelineText, sendServiceEmail, validación, UI, animaciones, etc.) 
// permanecen igual que tu versión original
// =============================================================================

// =============================================================================
// INICIALIZACIÓN FINAL
// =============================================================================
window.addEventListener('load', function() {
    addServiceAnimations();
    initTooltips();
    setupErrorScrolling();
    console.log('🚀 Página de servicios completamente cargada');
});