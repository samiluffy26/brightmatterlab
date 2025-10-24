/**
 * BRIGHTMATTER LAB - SISTEMA DE ANIMACIONES
 * Archivo: animations.js
 * Descripción: Sistema centralizado de animaciones y efectos visuales
 */

// =============================================================================
// CONFIGURACIÓN DE ANIMACIONES
// =============================================================================

const ANIMATION_CONFIG = {
    // Duraciones estándar
    durations: {
        fast: 300,
        normal: 500,
        slow: 800,
        verySlow: 1200
    },
    
    // Delays escalonados
    staggerDelay: 100,
    
    // Configuración del observer
    observerOptions: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    },
    
    // Configuración de performance
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// =============================================================================
// INTERSECTION OBSERVER MANAGER
// =============================================================================

class AnimationObserver {
    constructor() {
        this.observers = new Map();
        this.init();
    }
    
    init() {
        // Observer principal para animaciones de entrada
        this.createObserver('main', {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observer para animaciones de parallax
        this.createObserver('parallax', {
            threshold: 0,
            rootMargin: '0px'
        });
        
        // Observer para contadores
        this.createObserver('counters', {
            threshold: 0.5,
            rootMargin: '0px'
        });
    }
    
    createObserver(name, options) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => this.handleIntersection(entry, name));
        }, options);
        
        this.observers.set(name, observer);
        return observer;
    }
    
    handleIntersection(entry, observerType) {
        if (!entry.isIntersecting) return;
        
        const element = entry.target;
        const observer = this.observers.get(observerType);
        
        switch (observerType) {
            case 'main':
                this.handleMainAnimation(element);
                observer.unobserve(element);
                break;
            case 'parallax':
                this.handleParallaxAnimation(element, entry);
                break;
            case 'counters':
                this.handleCounterAnimation(element);
                observer.unobserve(element);
                break;
        }
    }
    
    handleMainAnimation(element) {
        const animationType = element.dataset.animation || 'fade-in-up';
        const delay = parseInt(element.dataset.delay) || 0;
        
        setTimeout(() => {
            element.classList.add('animate-in');
            this.triggerAnimation(element, animationType);
        }, delay);
    }
    
    handleParallaxAnimation(element, entry) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
    }
    
    handleCounterAnimation(element) {
        const target = parseInt(element.dataset.target) || 0;
        const duration = parseInt(element.dataset.duration) || 2000;
        this.animateCounter(element, target, duration);
    }
    
    observe(element, type = 'main') {
        const observer = this.observers.get(type);
        if (observer) {
            observer.observe(element);
        }
    }
    
    triggerAnimation(element, type) {
        element.classList.add('animated', `animate-${type}`);
        
        // Dispatch custom event
        element.dispatchEvent(new CustomEvent('animationstart', {
            detail: { type, element }
        }));
    }
    
    animateCounter(element, target, duration) {
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOutCubic);
            
            element.textContent = this.formatNumber(current);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = this.formatNumber(target);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    formatNumber(num) {
        return num.toLocaleString();
    }
}

// =============================================================================
// SISTEMA DE PARTÍCULAS
// =============================================================================

class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            count: options.count || 50,
            colors: options.colors || ['#e07bdf', '#d8c7fa', '#93ebbd'],
            sizes: options.sizes || [2, 3, 4, 5],
            speed: options.speed || 1,
            direction: options.direction || 'up',
            ...options
        };
        this.particles = [];
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        if (ANIMATION_CONFIG.prefersReducedMotion) return;
        
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        
        this.createParticles();
        this.start();
    }
    
    createParticles() {
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = this.getRandomItem(this.options.sizes);
        const color = this.getRandomItem(this.options.colors);
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.8 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: -1;
        `;
        
        // Propiedades de movimiento
        particle.velocity = {
            x: (Math.random() - 0.5) * this.options.speed,
            y: this.options.direction === 'up' ? -Math.random() * this.options.speed : Math.random() * this.options.speed
        };
        
        this.container.appendChild(particle);
        this.particles.push(particle);
        
        return particle;
    }
    
    updateParticles() {
        this.particles.forEach((particle, index) => {
            const rect = particle.getBoundingClientRect();
            const containerRect = this.container.getBoundingClientRect();
            
            // Actualizar posición
            const currentX = parseFloat(particle.style.left) || 0;
            const currentY = parseFloat(particle.style.top) || 0;
            
            particle.style.left = (currentX + particle.velocity.x) + '%';
            particle.style.top = (currentY + particle.velocity.y) + '%';
            
            // Resetear si sale del contenedor
            if (currentY < -10 || currentY > 110 || currentX < -10 || currentX > 110) {
                this.resetParticle(particle);
            }
        });
    }
    
    resetParticle(particle) {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = this.options.direction === 'up' ? '110%' : '-10%';
        particle.velocity = {
            x: (Math.random() - 0.5) * this.options.speed,
            y: this.options.direction === 'up' ? -Math.random() * this.options.speed : Math.random() * this.options.speed
        };
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.updateParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    destroy() {
        this.stop();
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
    }
}

// =============================================================================
// ANIMACIONES ESPECÍFICAS
// =============================================================================

class SpecialAnimations {
    constructor() {
        this.activeAnimations = new Set();
    }
    
    // Animación de escritura tipo typewriter
    typewriter(element, text, options = {}) {
        const {
            speed = 50,
            cursor = true,
            cursorChar = '|',
            onComplete = null
        } = options;
        
        element.textContent = '';
        element.style.borderRight = cursor ? `2px solid var(--primary-color)` : 'none';
        
        let i = 0;
        const timer = setInterval(() => {
            element.textContent = text.substring(0, i + 1);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                if (cursor) {
                    this.blinkCursor(element, cursorChar);
                }
                if (onComplete) onComplete();
            }
        }, speed);
        
        return timer;
    }
    
    blinkCursor(element, char = '|') {
        setInterval(() => {
            const currentText = element.textContent;
            if (currentText.endsWith(char)) {
                element.textContent = currentText.slice(0, -1);
            } else {
                element.textContent = currentText + char;
            }
        }, 500);
    }
    
    // Animación de morfeo (transformación suave entre formas)
    morphShape(element, fromPath, toPath, duration = 1000) {
        if (!element.querySelector('path')) return;
        
        const path = element.querySelector('path');
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Interpolación simple entre paths (requiere paths compatibles)
            const easeProgress = this.easeInOutCubic(progress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                path.setAttribute('d', toPath);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Animación de ondas
    createWaveEffect(element, options = {}) {
        const {
            amplitude = 20,
            frequency = 0.02,
            speed = 0.01,
            color = 'rgba(224, 123, 223, 0.3)'
        } = options;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        
        element.style.position = 'relative';
        element.appendChild(canvas);
        
        let time = 0;
        
        const resizeCanvas = () => {
            canvas.width = element.offsetWidth;
            canvas.height = element.offsetHeight;
        };
        
        const drawWave = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            
            for (let x = 0; x <= canvas.width; x++) {
                const y = canvas.height / 2 + amplitude * Math.sin(frequency * x + time);
                ctx.lineTo(x, y);
            }
            
            ctx.lineTo(canvas.width, canvas.height);
            ctx.closePath();
            ctx.fill();
            
            time += speed;
            requestAnimationFrame(drawWave);
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        drawWave();
        
        return canvas;
    }
    
    // Animación de brillo que se desplaza
    createScanlineEffect(element, options = {}) {
        const {
            duration = 2000,
            color = 'rgba(255, 255, 255, 0.3)',
            width = 2,
            repeat = true
        } = options;
        
        const scanline = document.createElement('div');
        scanline.style.cssText = `
            position: absolute;
            top: 0;
            left: -${width}px;
            width: ${width}px;
            height: 100%;
            background: linear-gradient(90deg, transparent, ${color}, transparent);
            z-index: 2;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(scanline);
        
        const animate = () => {
            scanline.style.transition = `left ${duration}ms ease-in-out`;
            scanline.style.left = element.offsetWidth + width + 'px';
            
            if (repeat) {
                setTimeout(() => {
                    scanline.style.transition = 'none';
                    scanline.style.left = -width + 'px';
                    setTimeout(animate, 100);
                }, duration);
            }
        };
        
        animate();
        return scanline;
    }
    
    // Easing functions
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    easeOutBounce(t) {
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
    }
}

// =============================================================================
// ANIMACIONES DE PÁGINA ESPECÍFICAS
// =============================================================================

class PageAnimations {
    constructor() {
        this.currentPage = this.detectCurrentPage();
        this.init();
    }
    
    detectCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('projects')) return 'projects';
        if (path.includes('team')) return 'team';
        if (path.includes('services')) return 'services';
        if (path.includes('contact')) return 'contact';
        return 'home';
    }
    
    init() {
        switch (this.currentPage) {
            case 'home':
                this.initHomeAnimations();
                break;
            case 'projects':
                this.initProjectsAnimations();
                break;
            case 'team':
                this.initTeamAnimations();
                break;
            case 'services':
                this.initServicesAnimations();
                break;
            case 'contact':
                this.initContactAnimations();
                break;
        }
    }
    
    initHomeAnimations() {
        // Animación del hero title con efectos especiales
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            this.animateHeroTitle(heroTitle);
        }
        
        // Animación de las estadísticas
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach((stat, index) => {
            setTimeout(() => {
                this.animateStatNumber(stat);
            }, index * 200);
        });
    }
    
    initProjectsAnimations() {
        // Animación de filtros de proyectos
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach((btn, index) => {
            btn.style.animationDelay = `${index * 100}ms`;
            btn.classList.add('animate-slide-in');
        });
        
        // Animación de cards de proyectos con stagger
        const projectCards = document.querySelectorAll('.project-card');
        this.staggerAnimation(projectCards, 'fade-in-up');
    }
    
    initTeamAnimations() {
        // Animación especial para el CEO
        const ceoCard = document.querySelector('.ceo-card');
        if (ceoCard) {
            ceoCard.classList.add('animate-zoom-in');
        }
        
        // Animación de miembros del equipo
        const memberCards = document.querySelectorAll('.member-card');
        this.staggerAnimation(memberCards, 'fade-in-scale');
    }
    
    initServicesAnimations() {
        // Animación de precios con contadores
        const prices = document.querySelectorAll('.price');
        prices.forEach(price => {
            this.animatePriceValue(price);
        });
        
        // Animación del timeline del proceso
        const processSteps = document.querySelectorAll('.process-step');
        this.animateProcessTimeline(processSteps);
    }
    
    initContactAnimations() {
        // Animación de elementos flotantes de contacto
        const floatingElements = document.querySelectorAll('.floating-contact');
        floatingElements.forEach((element, index) => {
            this.createFloatingAnimation(element, index);
        });
    }
    
    // Utilidades de animación
    animateHeroTitle(element) {
        const lines = element.querySelectorAll('.title-line');
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
                
                // Efecto de brillo en texto destacado
                if (line.classList.contains('highlight')) {
                    this.addTextShimmer(line);
                }
            }, index * 200);
        });
    }
    
    addTextShimmer(element) {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: shimmer 3s ease-in-out infinite;
        `;
        
        element.appendChild(shimmer);
    }
    
    staggerAnimation(elements, animationType, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in', `animate-${animationType}`);
            }, index * delay);
        });
    }
    
    animateStatNumber(element) {
        const finalValue = element.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (isNaN(numericValue)) return;
        
        let currentValue = 0;
        const increment = numericValue / 60; // 1 segundo a 60fps
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= numericValue) {
                element.textContent = finalValue;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue).toString();
            }
        }, 1000 / 60);
    }
    
    animatePriceValue(element) {
        // Similar a animateStatNumber pero específico para precios
        const text = element.textContent;
        const match = text.match(/\$?([\d,]+)/);
        
        if (match) {
            const value = parseInt(match[1].replace(/,/g, ''));
            this.animateCounter(element, 0, value, 1500, (current) => {
                return text.replace(/\$?([\d,]+)/, `$${current.toLocaleString()}`);
            });
        }
    }
    
    animateCounter(element, start, end, duration, formatter) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOutCubic);
            
            element.textContent = formatter ? formatter(current) : current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    animateProcessTimeline(steps) {
        const timeline = document.querySelector('.process-timeline');
        if (!timeline) return;
        
        // Animar línea del timeline
        setTimeout(() => {
            timeline.style.setProperty('--timeline-height', '100%');
        }, 500);
        
        // Animar steps
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('animate-in');
                
                // Efecto especial en el número del step
                const stepNumber = step.querySelector('.step-number');
                if (stepNumber) {
                    stepNumber.style.animation = 'pulse 0.5s ease-out';
                }
            }, 800 + (index * 300));
        });
    }
    
    createFloatingAnimation(element, index) {
        const baseDelay = index * 500;
        const duration = 4000 + Math.random() * 2000;
        
        element.style.animation = `float ${duration}ms ease-in-out infinite`;
        element.style.animationDelay = `${baseDelay}ms`;
        
        // Movimiento adicional aleatorio
        setInterval(() => {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            
            element.style.transform += ` translate(${x}px, ${y}px)`;
        }, 3000 + Math.random() * 2000);
    }
}

// =============================================================================
// PERFORMANCE Y OPTIMIZACIÓN
// =============================================================================

class AnimationPerformance {
    constructor() {
        this.isVisible = true;
        this.reducedMotion = ANIMATION_CONFIG.prefersReducedMotion;
        this.init();
    }
    
    init() {
        // Pausar animaciones cuando la página no está visible
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
            this.toggleAnimations(this.isVisible);
        });
        
        // Monitorear cambios en preferencias de movimiento
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', (e) => {
            this.reducedMotion = e.matches;
            this.handleReducedMotion();
        });
    }
    
    toggleAnimations(enable) {
        const animatedElements = document.querySelectorAll('.animated, .particle, [data-animation]');
        
        animatedElements.forEach(element => {
            if (enable) {
                element.style.animationPlayState = 'running';
            } else {
                element.style.animationPlayState = 'paused';
            }
        });
    }
    
    handleReducedMotion() {
        if (this.reducedMotion) {
            // Desactivar animaciones complejas
            const complexAnimations = document.querySelectorAll('.particle, .floating-element');
            complexAnimations.forEach(el => {
                el.style.animation = 'none';
                el.style.transition = 'none';
            });
            
            // Reducir duración de animaciones esenciales
            document.documentElement.style.setProperty('--animation-duration-fast', '0.1s');
            document.documentElement.style.setProperty('--animation-duration-normal', '0.2s');
        }
    }
}

// =============================================================================
// INICIALIZACIÓN GLOBAL
// =============================================================================

// Instancias globales
let animationObserver;
let specialAnimations;
let pageAnimations;
let animationPerformance;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Crear instancias principales
    animationObserver = new AnimationObserver();
    specialAnimations = new SpecialAnimations();
    pageAnimations = new PageAnimations();
    animationPerformance = new AnimationPerformance();
    
    // Configurar elementos animados
    setupAnimatedElements();
    
    // Agregar estilos CSS dinámicos
    addAnimationStyles();
    
    console.log('✨ Sistema de animaciones inicializado');
});

// Configurar elementos con animaciones
function setupAnimatedElements() {
    // Elementos con fade-in básico
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    fadeElements.forEach(element => {
        animationObserver.observe(element, 'main');
    });
    
    // Elementos con parallax
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        animationObserver.observe(element, 'parallax');
    });
    
    // Contadores animados
    const counterElements = document.querySelectorAll('[data-counter]');
    counterElements.forEach(element => {
        element.dataset.target = element.textContent.replace(/\D/g, '');
        animationObserver.observe(element, 'counters');
    });
}

// Agregar estilos CSS para animaciones
function addAnimationStyles() {
    if (document.querySelector('#animation-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
        /* Estilos base para elementos animados */
        .fade-in, .fade-in-up, .fade-in-left, .fade-in-right {
            opacity: 0;
            transition: all 0.6s ease;
        }
        
        .fade-in-up { transform: translateY(30px); }
        .fade-in-left { transform: translateX(-30px); }
        .fade-in-right { transform: translateX(30px); }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) translateX(0) !important;
        }
        
        /* Animaciones específicas */
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes bounce-in {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-bounce-in {
            animation: bounce-in 0.6s ease-out;
        }
        
        .animate-slide-in {
            animation: slideInUp 0.5s ease-out;
        }
        
        .animate-zoom-in {
            animation: zoomIn 0.8s ease-out;
        }
        
        .animate-fade-in-scale {
            animation: fadeInScale 0.6s ease-out;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        /* Variables CSS para duraciones */
        :root {
            --animation-duration-fast: ${ANIMATION_CONFIG.durations.fast}ms;
            --animation-duration-normal: ${ANIMATION_CONFIG.durations.normal}ms;
            --animation-duration-slow: ${ANIMATION_CONFIG.durations.slow}ms;
        }
        
        /* Timeline animation */
        .process-timeline {
            --timeline-height: 0%;
        }
        
        .process-timeline::before {
            height: var(--timeline-height);
            transition: height 2s ease-in-out;
        }
        
        /* Respeto por preferencias de movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `};