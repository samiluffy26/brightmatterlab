/**
 * BRIGHTMATTER LAB - SISTEMA DE FORMULARIOS
 * Archivo: form.js
 * Descripción: Sistema centralizado para manejo de formularios y validación
 */

// =============================================================================
// CONFIGURACIÓN DE FORMULARIOS
// =============================================================================

const FORM_CONFIG = {
    // Configuración EmailJS
    emailjs: {
        serviceID: 'service_kg07xsq',
        publicKey: '8ViUteLHPS_5nrML6',
        templates: {
            contact: 'template_contact',
            services: 'template_services',
            newsletter: 'template_newsletter'
        }
    },
    
    // Configuración de validación
    validation: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\+]?[1-9][\d]{0,15}$/,
        name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
        url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
    },
    
    // Configuración de auto-save
    autoSave: {
        enabled: false, // Deshabilitado para artifacts
        prefix: 'brightmatter_form_',
        interval: 30000 // 30 segundos
    },
    
    // Mensajes de error
    errorMessages: {
        required: 'Este campo es obligatorio',
        email: 'Por favor ingresa un email válido',
        phone: 'Por favor ingresa un teléfono válido',
        name: 'El nombre debe tener entre 2 y 50 caracteres',
        minLength: 'Debe tener al menos {min} caracteres',
        maxLength: 'No puede exceder {max} caracteres',
        url: 'Por favor ingresa una URL válida'
    }
};

// =============================================================================
// CLASE PRINCIPAL DE FORMULARIOS
// =============================================================================

class FormManager {
    constructor() {
        this.forms = new Map();
        this.validators = new Map();
        this.autoSaveTimers = new Map();
        this.init();
    }
    
    init() {
        // Inicializar EmailJS
        this.initEmailJS();
        
        // Detectar y configurar formularios
        this.detectForms();
        
        // Configurar validación global
        this.setupGlobalValidation();
        
        // Configurar eventos globales
        this.setupGlobalEvents();
        
        console.log('📝 Sistema de formularios inicializado');
    }
    
    initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(FORM_CONFIG.emailjs.publicKey);
            console.log('📧 EmailJS inicializado');
        } else {
            console.warn('⚠️ EmailJS no disponible');
        }
    }
    
    detectForms() {
        // Formularios principales
        const forms = document.querySelectorAll('form[id]');
        
        forms.forEach(form => {
            const formId = form.id;
            const formType = this.determineFormType(formId, form);
            
            this.registerForm(formId, formType, form);
        });
    }
    
    determineFormType(formId, form) {
        if (formId.includes('contact')) return 'contact';
        if (formId.includes('service')) return 'services';
        if (formId.includes('newsletter')) return 'newsletter';
        if (form.querySelector('[name="project"]')) return 'services';
        return 'generic';
    }
    
    registerForm(formId, type, element) {
        const formConfig = {
            id: formId,
            type: type,
            element: element,
            fields: this.extractFields(element),
            templateId: FORM_CONFIG.emailjs.templates[type] || 'template_generic'
        };
        
        this.forms.set(formId, formConfig);
        this.setupForm(formConfig);
        
        console.log(`📋 Formulario registrado: ${formId} (${type})`);
    }
    
    extractFields(form) {
        const fields = new Map();
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const field = {
                element: input,
                name: input.name || input.id,
                type: input.type || input.tagName.toLowerCase(),
                required: input.hasAttribute('required'),
                validation: this.getFieldValidation(input)
            };
            
            fields.set(field.name, field);
        });
        
        return fields;
    }
    
    getFieldValidation(input) {
        const validations = [];
        
        // Validaciones por tipo
        if (input.type === 'email') {
            validations.push({ type: 'email', regex: FORM_CONFIG.validation.email });
        }
        if (input.type === 'tel') {
            validations.push({ type: 'phone', regex: FORM_CONFIG.validation.phone });
        }
        if (input.type === 'url') {
            validations.push({ type: 'url', regex: FORM_CONFIG.validation.url });
        }
        
        // Validaciones por nombre de campo
        if (input.name.includes('name')) {
            validations.push({ type: 'name', regex: FORM_CONFIG.validation.name });
        }
        
        // Validaciones por atributos
        if (input.minLength) {
            validations.push({ type: 'minLength', value: input.minLength });
        }
        if (input.maxLength) {
            validations.push({ type: 'maxLength', value: input.maxLength });
        }
        
        return validations;
    }
    
    setupForm(formConfig) {
        const { element, fields } = formConfig;
        
        // Setup submit handler
        element.addEventListener('submit', (e) => this.handleSubmit(e, formConfig));
        
        // Setup field validation
        fields.forEach(field => {
            this.setupFieldValidation(field, formConfig);
        });
        
        // Setup auto-save if enabled
        if (FORM_CONFIG.autoSave.enabled) {
            this.setupAutoSave(formConfig);
        }
        
        // Setup special field behaviors
        this.setupSpecialFields(formConfig);
    }
    
    setupFieldValidation(field, formConfig) {
        const { element } = field;
        
        // Real-time validation
        element.addEventListener('blur', () => {
            this.validateField(field, formConfig);
        });
        
        // Clear errors on input
        element.addEventListener('input', () => {
            this.clearFieldError(field);
        });
        
        // Special formatting
        if (element.type === 'tel') {
            element.addEventListener('input', (e) => this.formatPhone(e.target));
        }
    }
    
    setupSpecialFields(formConfig) {
        const { element, fields } = formConfig;
        
        // Auto-complete sugerencias
        this.setupAutoComplete(formConfig);
        
        // Dependent fields
        this.setupDependentFields(formConfig);
        
        // Character counters
        this.setupCharacterCounters(formConfig);
    }
    
    setupAutoComplete(formConfig) {
        // Email domain suggestions
        const emailField = formConfig.fields.get('email');
        if (emailField) {
            this.setupEmailSuggestions(emailField.element);
        }
        
        // Phone country code detection
        const phoneField = formConfig.fields.get('phone');
        if (phoneField) {
            this.setupPhoneFormatting(phoneField.element);
        }
    }
    
    setupDependentFields(formConfig) {
        // Por ejemplo, mostrar campos adicionales basados en selecciones
        const typeField = formConfig.fields.get('projectType') || formConfig.fields.get('subject');
        
        if (typeField) {
            typeField.element.addEventListener('change', (e) => {
                this.handleDependentFields(e.target.value, formConfig);
            });
        }
    }
    
    setupCharacterCounters(formConfig) {
        formConfig.fields.forEach(field => {
            if (field.element.tagName === 'TEXTAREA' && field.element.maxLength) {
                this.addCharacterCounter(field.element);
            }
        });
    }
    
    // Validación de campo individual
    validateField(field, formConfig) {
        const { element, required, validation } = field;
        const value = element.value.trim();
        
        // Reset previous errors
        this.clearFieldError(field);
        
        // Required field validation
        if (required && !value) {
            this.showFieldError(field, FORM_CONFIG.errorMessages.required);
            return false;
        }
        
        // Skip other validations if empty and not required
        if (!value && !required) return true;
        
        // Run specific validations
        for (const rule of validation) {
            if (!this.runValidationRule(value, rule)) {
                const message = this.getValidationMessage(rule, value);
                this.showFieldError(field, message);
                return false;
            }
        }
        
        return true;
    }
    
    runValidationRule(value, rule) {
        switch (rule.type) {
            case 'email':
            case 'phone':
            case 'url':
            case 'name':
                return rule.regex.test(value);
            case 'minLength':
                return value.length >= rule.value;
            case 'maxLength':
                return value.length <= rule.value;
            default:
                return true;
        }
    }
    
    getValidationMessage(rule, value) {
        let message = FORM_CONFIG.errorMessages[rule.type] || 'Valor inválido';
        
        // Replace placeholders
        message = message.replace('{min}', rule.value);
        message = message.replace('{max}', rule.value);
        
        return message;
    }
    
    showFieldError(field, message) {
        const errorElement = this.getErrorElement(field);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        field.element.classList.add('error');
        field.hasError = true;
    }
    
    clearFieldError(field) {
        const errorElement = this.getErrorElement(field);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
        
        field.element.classList.remove('error');
        field.hasError = false;
    }
    
    getErrorElement(field) {
        const errorId = `${field.name}-error`;
        return document.getElementById(errorId);
    }
    
    // Validación completa del formulario
    validateForm(formConfig) {
        let isValid = true;
        const errors = [];
        
        formConfig.fields.forEach(field => {
            if (!this.validateField(field, formConfig)) {
                isValid = false;
                errors.push(field.name);
            }
        });
        
        return { isValid, errors };
    }
    
    // Manejo de envío de formulario
    async handleSubmit(event, formConfig) {
        event.preventDefault();
        
        console.log(`📤 Enviando formulario: ${formConfig.id}`);
        
        // Validar formulario
        const validation = this.validateForm(formConfig);
        
        if (!validation.isValid) {
            this.handleValidationErrors(validation.errors, formConfig);
            return;
        }
        
        // Mostrar loading
        this.setFormLoading(formConfig, true);
        
        try {
            // Preparar datos
            const formData = this.prepareFormData(formConfig);
            
            // Enviar email
            const result = await this.sendEmail(formData, formConfig);
            
            // Manejar éxito
            this.handleSubmitSuccess(formConfig, result);
            
        } catch (error) {
            // Manejar error
            this.handleSubmitError(formConfig, error);
        } finally {
            // Quitar loading
            this.setFormLoading(formConfig, false);
        }
    }
    
    prepareFormData(formConfig) {
        const data = {};
        const formData = new FormData(formConfig.element);
        
        // Datos básicos del formulario
        for (let [key, value] of formData.entries()) {
            if (key.endsWith('[]')) {
                // Múltiples valores (checkboxes)
                const cleanKey = key.slice(0, -2);
                if (!data[cleanKey]) data[cleanKey] = [];
                data[cleanKey].push(value);
            } else {
                data[key] = value;
            }
        }
        
        // Convertir arrays a strings
        Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
                data[key] = data[key].join(', ');
            }
        });
        
        // Datos adicionales
        data.timestamp = new Date().toLocaleString();
        data.formType = formConfig.type;
        data.userAgent = navigator.userAgent;
        data.referrer = document.referrer || 'Direct';
        data.currentUrl = window.location.href;
        
        return data;
    }
    
    async sendEmail(formData, formConfig) {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS no está disponible');
        }
        
        const emailData = this.formatEmailData(formData, formConfig);
        
        const response = await emailjs.send(
            FORM_CONFIG.emailjs.serviceID,
            formConfig.templateId,
            emailData
        );
        
        console.log('✅ Email enviado exitosamente:', response);
        return response;
    }
    
    formatEmailData(formData, formConfig) {
        // Formato base para todos los emails
        const emailData = {
            to_name: 'Brightmatter Lab',
            from_name: formData.name || formData.firstName + ' ' + (formData.lastName || ''),
            from_email: formData.email,
            subject: this.getEmailSubject(formData, formConfig),
            timestamp: formData.timestamp,
            form_type: formConfig.type,
            ...formData
        };
        
        // Formateos específicos por tipo
        switch (formConfig.type) {
            case 'services':
                emailData.project_summary = this.createProjectSummary(formData);
                break;
            case 'contact':
                emailData.contact_summary = this.createContactSummary(formData);
                break;
        }
        
        return emailData;
    }
    
    getEmailSubject(formData, formConfig) {
        switch (formConfig.type) {
            case 'services':
                return `Nueva solicitud de servicio: ${formData.projectType || 'No especificado'}`;
            case 'contact':
                return `Nuevo mensaje de contacto: ${formData.subject || 'Consulta general'}`;
            case 'newsletter':
                return `Nueva suscripción al newsletter`;
            default:
                return 'Nuevo mensaje desde el sitio web';
        }
    }
    
    createProjectSummary(data) {
        const lines = [
            'NUEVA SOLICITUD DE SERVICIO',
            '========================',
            `Cliente: ${data.firstName || ''} ${data.lastName || ''}`,
            `Email: ${data.email || ''}`,
            `Proyecto: ${data.projectTitle || ''}`,
            `Tipo: ${data.projectType || ''}`,
            `Presupuesto: ${data.budget || 'No especificado'}`,
            `Timeline: ${data.timeline || 'No especificado'}`,
            '',
            'DESCRIPCIÓN:',
            data.projectDescription || '',
            '',
            `Fecha: ${data.timestamp}`
        ];
        
        return lines.join('\n');
    }
    
    createContactSummary(data) {
        const lines = [
            'NUEVO MENSAJE DE CONTACTO',
            '========================',
            `Nombre: ${data.name || ''}`,
            `Email: ${data.email || ''}`,
            `Asunto: ${data.subject || ''}`,
            '',
            'MENSAJE:',
            data.message || '',
            '',
            `Fecha: ${data.timestamp}`
        ];
        
        return lines.join('\n');
    }
    
    handleValidationErrors(errors, formConfig) {
        // Scroll al primer error
        const firstErrorField = formConfig.fields.get(errors[0]);
        if (firstErrorField) {
            this.scrollToField(firstErrorField.element);
        }
        
        // Mostrar notificación general
        this.showNotification('Por favor corrige los errores en el formulario', 'error');
    }
    
    handleSubmitSuccess(formConfig, result) {
        // Limpiar formulario
        formConfig.element.reset();
        
        // Limpiar errores
        formConfig.fields.forEach(field => this.clearFieldError(field));
        
        // Mostrar modal de éxito o notificación
        this.showSuccessMessage(formConfig);
        
        // Analytics
        this.trackFormSubmission(formConfig, 'success');
        
        // Limpiar auto-save si existe
        if (FORM_CONFIG.autoSave.enabled) {
            this.clearAutoSave(formConfig);
        }
    }
    
    handleSubmitError(formConfig, error) {
        console.error('❌ Error enviando formulario:', error);
        
        // Mostrar error al usuario
        this.showNotification(
            'Hubo un error al enviar el formulario. Por favor intenta nuevamente o contáctanos por WhatsApp.',
            'error'
        );
        
        // Analytics
        this.trackFormSubmission(formConfig, 'error', error.message);
    }
    
    // Utilidades de UI
    setFormLoading(formConfig, loading) {
        const submitBtn = formConfig.element.querySelector('[type="submit"]');
        
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Cambiar texto y agregar spinner
            const originalText = submitBtn.innerHTML;
            submitBtn.dataset.originalText = originalText;
            submitBtn.innerHTML = `
                <div class="spinner"></div>
                Enviando...
            `;
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // Restaurar texto original
            const originalText = submitBtn.dataset.originalText;
            if (originalText) {
                submitBtn.innerHTML = originalText;
            }
        }
    }
    
    showSuccessMessage(formConfig) {
        // Buscar modal específico para el tipo de formulario
        const modalId = `${formConfig.type}SuccessModal` || 'successModal';
        let modal = document.getElementById(modalId);
        
        // Si no existe un modal específico, usar notificación
        if (!modal) {
            modal = document.getElementById('successModal');
        }
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            this.showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
        }
    }
    
    showNotification(message, type = 'info') {
        // Usar el sistema de toasts si está disponible
        if (typeof window.BrightmatterLab?.showToast === 'function') {
            window.BrightmatterLab.showToast(message, type);
        } else {
            // Fallback a alert
            alert(message);
        }
    }
    
    scrollToField(field) {
        const headerHeight = document.getElementById('header')?.offsetHeight || 80;
        const fieldTop = field.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
            top: fieldTop,
            behavior: 'smooth'
        });
        
        // Focus después del scroll
        setTimeout(() => field.focus(), 500);
    }
    
    // Funciones de formateo
    formatPhone(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length <= 10) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else {
            value = value.replace(/(\d{1,3})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
        }
        
        input.value = value;
    }
    
    setupEmailSuggestions(emailField) {
        const commonDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
        
        emailField.addEventListener('input', (e) => {
            const value = e.target.value;
            const atIndex = value.indexOf('@');
            
            if (atIndex > 0 && atIndex < value.length - 1) {
                const domain = value.substring(atIndex + 1);
                
                // Sugerir dominio si hay coincidencia parcial
                const suggestion = commonDomains.find(d => d.startsWith(domain) && d !== domain);
                
                if (suggestion) {
                    // Mostrar sugerencia (implementar UI)
                    this.showEmailSuggestion(emailField, value.substring(0, atIndex + 1) + suggestion);
                }
            }
        });
    }
    
    showEmailSuggestion(field, suggestion) {
        // Crear elemento de sugerencia si no existe
        let suggestionEl = field.parentNode.querySelector('.email-suggestion');
        
        if (!suggestionEl) {
            suggestionEl = document.createElement('div');
            suggestionEl.className = 'email-suggestion';
            suggestionEl.style.cssText = `
                position: absolute;
                background: var(--bg-color);
                border: 1px solid var(--primary-color);
                border-radius: 5px;
                padding: 5px 10px;
                font-size: 0.9rem;
                color: var(--text-gray);
                cursor: pointer;
                z-index: 1000;
                margin-top: 5px;
            `;
            field.parentNode.appendChild(suggestionEl);
        }
        
        suggestionEl.textContent = suggestion;
        suggestionEl.onclick = () => {
            field.value = suggestion;
            suggestionEl.style.display = 'none';
            field.focus();
        };
        
        suggestionEl.style.display = 'block';
        
        // Ocultar después de unos segundos
        setTimeout(() => {
            suggestionEl.style.display = 'none';
        }, 5000);
    }
    
    setupPhoneFormatting(phoneField) {
        phoneField.addEventListener('input', (e) => {
            this.formatPhone(e.target);
        });
        
        phoneField.setAttribute('placeholder', '+1 (809) 000-0000');
    }
    
    addCharacterCounter(textarea) {
        const maxLength = textarea.maxLength;
        if (!maxLength) return;
        
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            font-size: 0.8rem;
            color: var(--text-gray);
            text-align: right;
            margin-top: 5px;
        `;
        
        const updateCounter = () => {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${textarea.value.length}/${maxLength}`;
            
            if (remaining < 50) {
                counter.style.color = '#ff6b6b';
            } else {
                counter.style.color = 'var(--text-gray)';
            }
        };
        
        textarea.addEventListener('input', updateCounter);
        textarea.parentNode.appendChild(counter);
        updateCounter();
    }
    
    handleDependentFields(value, formConfig) {
        // Lógica específica para campos dependientes
        if (formConfig.type === 'services') {
            this.handleServicesDependentFields(value, formConfig);
        }
    }
    
    handleServicesDependentFields(projectType, formConfig) {
        // Ejemplo: Mostrar campos específicos según el tipo de proyecto
        const additionalFields = formConfig.element.querySelector('.additional-fields');
        
        if (additionalFields) {
            if (projectType === 'ecommerce') {
                // Mostrar campos específicos de e-commerce
                additionalFields.style.display = 'block';
            } else {
                additionalFields.style.display = 'none';
            }
        }
    }
    
    // Analytics y tracking
    trackFormSubmission(formConfig, status, error = null) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Forms',
                event_label: formConfig.type,
                custom_parameters: {
                    form_id: formConfig.id,
                    status: status,
                    error: error
                }
            });
        }
        
        console.log(`📊 Form tracking: ${formConfig.id} - ${status}`);
    }
    
    // Auto-save (deshabilitado para artifacts)
    setupAutoSave(formConfig) {
        if (!FORM_CONFIG.autoSave.enabled) return;
        
        const saveKey = FORM_CONFIG.autoSave.prefix + formConfig.id;
        
        // Cargar datos guardados
        this.loadAutoSaveData(formConfig, saveKey);
        
        // Configurar guardado automático
        const timer = setInterval(() => {
            this.saveFormData(formConfig, saveKey);
        }, FORM_CONFIG.autoSave.interval);
        
        this.autoSaveTimers.set(formConfig.id, timer);
    }
    
    loadAutoSaveData(formConfig, saveKey) {
        try {
            const savedData = localStorage.getItem(saveKey);
            if (savedData) {
                const data = JSON.parse(savedData);
                this.populateFormData(formConfig, data);
            }
        } catch (error) {
            console.error('Error cargando auto-save:', error);
        }
    }
    
    saveFormData(formConfig, saveKey) {
        try {
            const data = this.prepareFormData(formConfig);
            localStorage.setItem(saveKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error guardando auto-save:', error);
        }
    }
    
    clearAutoSave(formConfig) {
        const saveKey = FORM_CONFIG.autoSave.prefix + formConfig.id;
        
        try {
            localStorage.removeItem(saveKey);
        } catch (error) {
            console.error('Error limpiando auto-save:', error);
        }
        
        // Limpiar timer
        const timer = this.autoSaveTimers.get(formConfig.id);
        if (timer) {
            clearInterval(timer);
            this.autoSaveTimers.delete(formConfig.id);
        }
    }
    
    populateFormData(formConfig, data) {
        formConfig.fields.forEach(field => {
            const value = data[field.name];
            if (value !== undefined) {
                if (field.element.type === 'checkbox') {
                    field.element.checked = !!value;
                } else {
                    field.element.value = value;
                }
            }
        });
    }
    
    // API pública
    getForm(formId) {
        return this.forms.get(formId);
    }
    
    validateFormById(formId) {
        const formConfig = this.forms.get(formId);
        return formConfig ? this.validateForm(formConfig) : null;
    }
    
    resetFormById(formId) {
        const formConfig = this.forms.get(formId);
        if (formConfig) {
            formConfig.element.reset();
            formConfig.fields.forEach(field => this.clearFieldError(field));
        }
    }
}

// =============================================================================
// INICIALIZACIÓN GLOBAL
// =============================================================================

let formManager;

document.addEventListener('DOMContentLoaded', function() {
    formManager = new FormManager();
    
    // Exponer API global
    window.BrightmatterForms = {
        manager: formManager,
        getForm: (id) => formManager.getForm(id),
        validateForm: (id) => formManager.validateFormById(id),
        resetForm: (id) => formManager.resetFormById(id),
        config: FORM_CONFIG
    };
    
    // Agregar estilos CSS para formularios
    addFormStyles();
});

// Agregar estilos CSS específicos para formularios
function addFormStyles() {
    if (document.querySelector('#form-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'form-styles';
    style.textContent = `
        /* Estilos para campos con error */
        .form-input.error,
        .form-select.error,
        .form-textarea.error {
            border-color: #ff6b6b !important;
            background: rgba(255, 107, 107, 0.1) !important;
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        /* Spinner para botones de carga */
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin-right: 8px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Estados de loading para formularios */
        .form-loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        /* Sugerencias de email */
        .email-suggestion {
            font-size: 0.85rem;
            transition: all 0.3s ease;
        }
        
        .email-suggestion:hover {
            background: var(--primary-color) !important;
            color: white !important;
        }
        
        /* Contador de caracteres */
        .character-counter {
            transition: color 0.3s ease;
        }
        
        /* Checkmarks animados */
        .form-success .checkmark {
            animation: checkmark 0.6s ease-in-out;
        }
        
        @keyframes checkmark {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% {
                transform: scale(1.2);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        /* Mejoras visuales para campos focus */
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(224, 123, 223, 0.3);
        }
        
        /* Progress bar para formularios largos */
        .form-progress {
            position: sticky;
            top: 80px;
            z-index: 100;
            background: var(--bg-color);
            padding: 10px 0;
            border-bottom: 1px solid rgba(224, 123, 223, 0.2);
        }
        
        .progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(224, 123, 223, 0.2);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--gradient-primary);
            border-radius: 2px;
            transition: width 0.3s ease;
            width: 0%;
        }
        
        /* Tooltips para campos de formulario */
        .field-tooltip {
            position: absolute;
            background: var(--bg-color);
            color: var(--text-light);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            border: 1px solid var(--primary-color);
            z-index: 1000;
            max-width: 200px;
            word-wrap: break-word;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .field-tooltip.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Responsive form improvements */
        @media (max-width: 768px) {
            .form-grid {
                grid-template-columns: 1fr !important;
            }
            
            .form-input,
            .form-select,
            .form-textarea {
                font-size: 16px; /* Prevent zoom on iOS */
            }
            
            .email-suggestion {
                position: relative;
                margin-top: 10px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Export para uso global
window.FormManager = FormManager;

console.log('📝 Sistema de formularios Brightmatter Lab cargado');