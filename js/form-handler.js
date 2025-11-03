/* ========================================
   BRIGHTMATTER LAB - FORM HANDLER
   ========================================
   
   Manejo de formularios con EmailJS
   Email destino: samuel.guance@hotmail.com
   
   CONFIGURACIÓN REQUERIDA:
   1. Crear cuenta en EmailJS.com
   2. Configurar servicio de email
   3. Crear templates (códigos incluidos abajo)
   4. Actualizar SERVICE_ID, TEMPLATE_IDs y PUBLIC_KEY
   ======================================== */

// === CONFIGURACIÓN EMAILJS ===
// ✅ CONFIGURADO CON TUS CREDENCIALES REALES
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '8ViUteLHPS_5nrML6',    // ✅ Tu Public Key
    SERVICE_ID: 'service_kg07xsq',       // ✅ Tu Service ID
    TEMPLATES: {
        CONTACT_FORM: 'contact_form_template',    // Para formulario de contacto
        QUOTE_FORM: 'quote_form_template'         // Para formulario de cotización
    }
};

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS con tu clave pública
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('📧 EmailJS inicializado correctamente');
    } else {
        console.error('❌ EmailJS no está cargado. Verifica que el script esté incluido.');
    }
    
    // Configurar formularios
    setupContactForm();
    setupQuoteForm();
});

// === CONFIGURAR FORMULARIO DE CONTACTO ===
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            // Mostrar estado de carga
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Recopilar datos del formulario
            const formData = {
                // Información personal
                from_name: `${contactForm.firstName.value} ${contactForm.lastName.value}`.trim(),
                from_email: contactForm.email.value,
                phone: contactForm.phone.value || 'No proporcionado',
                company: contactForm.company.value || 'No especificado',
                
                // Tipo de proyecto
                project_type: getSelectedProjectType(),
                project_type_description: getProjectTypeDescription(getSelectedProjectType()),
                
                // Presupuesto y timeline
                budget: contactForm.budget.value || 'No especificado',
                timeline: contactForm.timeline.value || 'No especificado',
                
                // Mensaje principal
                message: contactForm.message.value,
                
                // Información adicional
                how_found: contactForm.howFound.value || 'No especificado',
                contact_preference: getContactPreference(),
                newsletter: contactForm.newsletter.checked ? 'Sí' : 'No',
                
                // Datos técnicos
                submission_date: new Date().toLocaleString('es-ES', {
                    timeZone: 'America/Santo_Domingo',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                user_agent: navigator.userAgent.substring(0, 100), // Para detectar dispositivo
                page_url: window.location.href,
                
                // Para el email de destino
                to_email: 'samuel.guance@hotmail.com'
            };
            
            console.log('📤 Enviando formulario de contacto:', formData);
            
            // Enviar email
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATES.CONTACT_FORM,
                formData
            );
            
            console.log('✅ Email enviado exitosamente:', response);
            
            // Mostrar éxito
            showSuccessMessage(contactForm, {
                title: '¡Mensaje Enviado!',
                message: 'Gracias por contactarnos. Te responderemos en menos de 24 horas.',
                icon: 'fas fa-check-circle'
            });
            
            // Limpiar formulario después del éxito
            setTimeout(() => {
                contactForm.reset();
                resetFormSelections();
            }, 1000);
            
        } catch (error) {
            console.error('❌ Error enviando formulario:', error);
            
            // Mostrar error
            showErrorMessage(contactForm, {
                title: 'Error al Enviar',
                message: 'Hubo un problema enviando tu mensaje. Por favor intenta nuevamente o contáctanos por WhatsApp.',
                whatsappLink: 'https://wa.me/18096572939'
            });
            
        } finally {
            // Restaurar botón
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// === CONFIGURAR FORMULARIO DE COTIZACIÓN ===
function setupQuoteForm() {
    const quoteForm = document.getElementById('serviceQuoteForm');
    if (!quoteForm) return;
    
    quoteForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = quoteForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando Cotización...';
            submitBtn.disabled = true;
            
            // Recopilar datos del formulario de cotización
            const formData = {
                // Información personal
                from_name: quoteForm.fullName.value,
                from_email: quoteForm.email.value,
                phone: quoteForm.phone.value || 'No proporcionado',
                company: quoteForm.company.value || 'No especificado',
                
                // Detalles del proyecto
                service_type: quoteForm.serviceType.value,
                service_type_name: getServiceTypeName(quoteForm.serviceType.value),
                project_title: quoteForm.projectTitle.value,
                budget: quoteForm.budget.value || 'No especificado',
                timeline: quoteForm.timeline.value || 'No especificado',
                
                // Descripción detallada
                project_description: quoteForm.projectDescription.value,
                
                // Características requeridas
                required_features: getSelectedFeatures(),
                
                // Referencias e información adicional
                references: quoteForm.references.value || 'Ninguna',
                additional_info: quoteForm.additionalInfo.value || 'Ninguna',
                contact_preference: getContactPreferenceQuote(),
                
                // Datos técnicos
                submission_date: new Date().toLocaleString('es-ES', {
                    timeZone: 'America/Santo_Domingo',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                page_url: window.location.href,
                
                // Para el email de destino
                to_email: 'brightmatter.lab@outlook.com'
            };
            
            console.log('📤 Enviando formulario de cotización:', formData);
            
            // Enviar email
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATES.QUOTE_FORM,
                formData
            );
            
            console.log('✅ Cotización enviada exitosamente:', response);
            
            // Mostrar éxito
            showSuccessMessage(quoteForm, {
                title: '¡Cotización Solicitada!',
                message: 'Hemos recibido tu solicitud. Te enviaremos una propuesta personalizada en menos de 24 horas.',
                icon: 'fas fa-paper-plane'
            });
            
            // Limpiar formulario
            setTimeout(() => {
                quoteForm.reset();
            }, 1000);
            
        } catch (error) {
            console.error('❌ Error enviando cotización:', error);
            
            showErrorMessage(quoteForm, {
                title: 'Error al Enviar Cotización',
                message: 'Hubo un problema enviando tu solicitud. Por favor intenta nuevamente o contáctanos directamente.',
                whatsappLink: 'https://wa.me/18096572939'
            });
            
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// === FUNCIONES AUXILIARES ===

// Obtener tipo de proyecto seleccionado
function getSelectedProjectType() {
    const selectedRadio = document.querySelector('input[name="projectType"]:checked');
    return selectedRadio ? selectedRadio.value : 'No especificado';
}

// Obtener descripción del tipo de proyecto
function getProjectTypeDescription(type) {
    const descriptions = {
        'website': 'Sitio Web - Landing pages, sitios corporativos, portfolios',
        'webapp': 'Aplicación Web - Sistemas complejos, dashboards, plataformas',
        'mobile': 'App Móvil - iOS, Android, aplicaciones híbridas',
        'ecommerce': 'E-commerce - Tiendas online, marketplaces, pagos',
        'maintenance': 'Mantenimiento - Soporte, actualizaciones, mejoras',
        'consultation': 'Consultoría - Asesoramiento técnico, auditorías'
    };
    return descriptions[type] || 'Tipo de proyecto no especificado';
}

// Obtener preferencia de contacto
function getContactPreference() {
    const selectedRadio = document.querySelector('input[name="contactPreference"]:checked');
    const preferences = {
        'email': '📧 Email',
        'whatsapp': '📱 WhatsApp',
        'phone': '☎️ Teléfono',
        'video': '📹 Videollamada'
    };
    return selectedRadio ? preferences[selectedRadio.value] : 'Email (por defecto)';
}

// Obtener preferencia de contacto para cotización
function getContactPreferenceQuote() {
    const selectedRadio = document.querySelector('#serviceQuoteForm input[name="contactPreference"]:checked');
    const preferences = {
        'email': '📧 Email',
        'phone': '☎️ Teléfono',
        'whatsapp': '📱 WhatsApp',
        'video-call': '📹 Videollamada'
    };
    return selectedRadio ? preferences[selectedRadio.value] : 'Email (por defecto)';
}

// Obtener nombre del tipo de servicio
function getServiceTypeName(type) {
    const services = {
        'web-development': '🌐 Desarrollo Web',
        'mobile-apps': '📱 Aplicaciones Móviles',
        'platforms': '🏢 Plataformas Empresariales',
        'maintenance': '🛠️ Mantenimiento & Soporte',
        'custom': '🎯 Proyecto Personalizado'
    };
    return services[type] || 'Servicio no especificado';
}

// Obtener características seleccionadas
function getSelectedFeatures() {
    const checkboxes = document.querySelectorAll('input[name="features"]:checked');
    if (checkboxes.length === 0) return 'Ninguna característica específica seleccionada';
    
    const featureNames = {
        'responsive-design': '📱 Diseño Responsive',
        'user-authentication': '👤 Sistema de Usuarios',
        'payment-integration': '💳 Pagos Online',
        'admin-panel': '⚙️ Panel Administrativo',
        'api-integration': '🔗 Integración APIs',
        'database': '🗄️ Base de Datos',
        'cms': '📝 Gestión de Contenido',
        'analytics': '📊 Analytics/Reportes',
        'social-integration': '📲 Redes Sociales',
        'multilanguage': '🌍 Multi-idioma',
        'seo-optimization': '🔍 Optimización SEO',
        'cloud-hosting': '☁️ Hosting en la Nube'
    };
    
    const selectedFeatures = Array.from(checkboxes).map(cb => 
        featureNames[cb.value] || cb.value
    );
    
    return selectedFeatures.join('\n• ');
}

// Resetear selecciones visuales del formulario
function resetFormSelections() {
    // Resetear tarjetas de tipo de proyecto
    document.querySelectorAll('.project-type-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Resetear preferencias de contacto
    document.querySelectorAll('.preference-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Seleccionar email por defecto
    const emailPref = document.querySelector('input[name="contactPreference"][value="email"]');
    if (emailPref) {
        emailPref.closest('.preference-item').classList.add('selected');
    }
}

// Mostrar mensaje de éxito
function showSuccessMessage(form, options) {
    const existingMessage = form.querySelector('.success-message, .error-message');
    if (existingMessage) existingMessage.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="message-content">
            <i class="${options.icon}"></i>
            <h3>${options.title}</h3>
            <p>${options.message}</p>
        </div>
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Mostrar mensaje de error
function showErrorMessage(form, options) {
    const existingMessage = form.querySelector('.success-message, .error-message');
    if (existingMessage) existingMessage.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>${options.title}</h3>
            <p>${options.message}</p>
            ${options.whatsappLink ? `
                <a href="${options.whatsappLink}" class="btn btn-success btn-sm" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    Contactar por WhatsApp
                </a>
            ` : ''}
        </div>
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto-remove después de 8 segundos
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 8000);
}

// === VALIDACIONES ADICIONALES ===

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar teléfono (opcional, formato básico)
function isValidPhone(phone) {
    if (!phone) return true; // Es opcional
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Exportar funciones para uso global
window.BrightmatterForms = {
    setupContactForm,
    setupQuoteForm,
    isValidEmail,
    isValidPhone
};

// === ESTILOS CSS PARA MENSAJES ===
const messageStyles = `
<style>
.success-message, .error-message {
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    animation: slideDown 0.3s ease;
    text-align: center;
}

.success-message {
    background: linear-gradient(135deg, #10b981, #34d399);
    color: white;
}

.error-message {
    background: linear-gradient(135deg, #ef4444, #f87171);
    color: white;
}

.message-content i {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.message-content h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.message-content p {
    margin-bottom: 1rem;
}

.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`;

// Inyectar estilos
if (!document.getElementById('form-message-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'form-message-styles';
    styleElement.innerHTML = messageStyles;
    document.head.appendChild(styleElement);
}