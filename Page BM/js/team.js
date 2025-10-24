/**
 * BRIGHTMATTER LAB - EQUIPO
 * Archivo: team.js
 * Descripción: JavaScript específico para la página del equipo
 */

// =============================================================================
// DATOS DEL EQUIPO
// =============================================================================

const teamData = {
    ceo: {
        id: 'samuel-guance',
        name: 'Samuel Guance',
        role: 'Chief Executive Officer',
        title: 'CEO & Fundador',
        image: '../images/team/samuel-guance-ceo.jpg',
        description: `Visionario tecnológico con 1 año de experiencia en desarrollo de software y liderazgo de equipos. 
                     Samuel fundó Brightmatter Lab con la misión de transformar ideas innovadoras en soluciones digitales 
                     que impulsen el crecimiento empresarial.`,
        fullDescription: `Su experiencia abarca desde el desarrollo full-stack hasta la arquitectura de sistemas escalables, 
                         especializado en tecnologías modernas como React, Node.js, .NET, Blazor, ASP.NET, SQL, Vue y cloud computing. 
                         Ha liderado proyectos para el sector gubernamental, educativo y privado.`,
        specialties: [
            'Arquitectura de Software',
            'Liderazgo Técnico',
            'Full-Stack Development',
            'DevOps',
            'Gestión de Proyectos'
        ],
        achievements: [
            { number: '8+', label: 'Proyectos Completados exitosamente' },
            { number: '7', label: 'Profesionales liderados' },
            { number: 'Ing. de Software', label: 'Udemy / Microsoft' }
        ],
        contact: {
            email: 'samuel@brightmatter.lab',
            linkedin: '#',
            github: '#'
        }
    },
    
    cofounders: [
        {
            id: 'jodrell-polanco',
            name: 'Jodrell Polanco',
            role: 'Chief Technology Officer',
            title: 'Co-Fundador',
            image: '../images/team/jodrell-polanco-cto.jpg',
            description: `Experto en arquitectura de software y desarrollo backend con amplia experiencia en sistemas escalables. 
                         Jodrell se especializa en tecnologías cloud y ha sido fundamental en el desarrollo de las plataformas 
                         más complejas de nuestro portafolio.`,
            skills: [
                'Node.js', 'Java', 'C#', 'Flutter', 'SQL', 
                'UI/UX Design', 'Figma', 'Adobe Creative', 'Prototyping', 'Branding'
            ],
            contact: {
                email: 'jodrell@brightmatter.lab',
                linkedin: '#',
                github: '#'
            }
        },
        {
            id: 'fernando-cambero',
            name: 'Fernando Cambero',
            role: 'Chief Design Officer',
            title: 'Co-Fundador',
            image: '../images/team/fernando-cambero-cdo.jpg',
            description: `Diseñador UX/UI apasionado por crear experiencias digitales excepcionales. Fernando lidera el equipo 
                         de diseño y se asegura de que cada interfaz sea intuitiva, atractiva y centrada en el usuario. 
                         Su visión creativa ha definido la identidad visual de nuestros proyectos.`,
            skills: [
                'Java', 'Python', 'Javascript', 'HTML', 'CSS', 'Creative Design'
            ],
            contact: {
                email: 'fernando@brightmatter.lab',
                linkedin: '#',
                github: '#'
            }
        }
    ],
    
    members: [
        {
            id: 'leonardo-delacruz',
            name: 'Leonardo De la Cruz',
            role: 'Junior Frontend Developer',
            title: 'Desarrollador Frontend',
            image: '../images/team/leonardo-delacruz.jpg',
            description: `Especialista en React y Astro con pasión por crear interfaces de usuario dinámicas y responsivas. 
                         Leonardo se encarga de transformar los diseños en código limpio y optimizado.`,
            skills: ['React', 'Astro', 'TypeScript', 'CSS3'],
            contact: {
                email: 'leonardo@brightmatter.lab',
                linkedin: '#',
                github: '#'
            }
        },
        {
            id: 'cesar-gil',
            name: 'Cesar Gil',
            role: 'Junior Full-stack',
            title: 'Desarrollador Backend',
            image: '../images/team/cesar-gil.jpg',
            description: `Experto en arquitectura de APIs y bases de datos. Cesar se especializa en crear sistemas 
                         robustos y escalables que soporten el crecimiento de nuestros clientes.`,
            skills: ['Node.js', 'React', 'PostgreSQL', 'MongoDB'],
            contact: {
                email: 'cesar@brightmatter.lab',
                linkedin: '#',
                github: '#'
            }
        },
        {
            id: 'alanna-ferreras',
            name: 'Alanna Ferreras',
            role: 'Community Manager',
            title: 'Desarrolladora Full-Stack',
            image: '../images/team/alanna-ferreras.jpg',
            description: `Nuestra encargada de redes sociales y diseñadora gráfica, dando vida a cada uno de 
                         nuestros pensamientos y conectando con nuestra comunidad.`,
            skills: ['Canva', 'Social Media', 'Content Creation', 'Branding'],
            contact: {
                email: 'alanna@brightmatter.lab',
                instagram: '@brightmatter.lab',
                linkedin: '#'
            }
        },
        {
            id: 'alejandro-ferreras',
            name: 'Alejandro Ferreras',
            role: 'Junior Developer',
            title: 'Desarrollador Mobile',
            image: '../images/team/alejandro-ferreras.jpg',
            description: `Junior en proceso de aprendizaje de desarrollo web con gran entusiasmo por las tecnologías 
                         emergentes y el desarrollo móvil.`,
            skills: ['HTML', 'CSS', 'JavaScript', 'Mobile Development'],
            contact: {
                email: 'alejandro@brightmatter.lab',
                linkedin: '#',
                github: '#'
            }
        }
    ]
};

// =============================================================================
// INICIALIZACIÓN
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initTeamAnimations();
    setupMemberInteractions();
    initSkillsAnimations();
    setupContactButtons();
    
    // Llamar función global si existe
    if (typeof window.teamPageInit === 'function') {
        window.teamPageInit();
    }
    
    console.log('👥 Página del equipo inicializada');
});

// =============================================================================
// ANIMACIONES DEL EQUIPO
// =============================================================================

/**
 * Inicializar animaciones específicas del equipo
 */
function initTeamAnimations() {
    // Observer para animaciones on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                teamObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar cards de miembros
    document.querySelectorAll('.member-card, .value-card').forEach((card, index) => {
        // Agregar delay escalonado
        card.style.animationDelay = `${index * 0.1}s`;
        teamObserver.observe(card);
    });
    
    // Animación especial para CEO card
    const ceoCard = document.querySelector('.ceo-card');
    if (ceoCard) {
        teamObserver.observe(ceoCard);
    }
}

/**
 * Configurar interacciones de miembros
 */
function setupMemberInteractions() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click para mostrar más información (opcional)
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.social-link') && !e.target.closest('.contact-btn')) {
                expandMemberCard(this);
            }
        });
    });
}

/**
 * Expandir card de miembro para mostrar más información
 */
function expandMemberCard(card) {
    const isExpanded = card.classList.contains('expanded');
    
    // Cerrar otras cards expandidas
    document.querySelectorAll('.member-card.expanded').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('expanded');
        }
    });
    
    // Toggle expansión
    card.classList.toggle('expanded');
    
    // Analytics
    if (typeof gtag !== 'undefined') {
        const memberName = card.querySelector('.member-name')?.textContent || 'Unknown';
        gtag('event', isExpanded ? 'collapse_member_card' : 'expand_member_card', {
            'event_category': 'Team',
            'event_label': memberName
        });
    }
}

// =============================================================================
// ANIMACIONES DE HABILIDADES
// =============================================================================

/**
 * Inicializar animaciones de habilidades
 */
function initSkillsAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag, .specialty');
    
    // Observer para animación de habilidades
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skills = entry.target.querySelectorAll('.skill-tag, .specialty');
                animateSkills(skills);
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observar contenedores de habilidades
    document.querySelectorAll('.skills-grid, .specialties-grid').forEach(container => {
        skillsObserver.observe(container);
    });
}

/**
 * Animar habilidades con efecto escalonado
 */
function animateSkills(skills) {
    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.animation = 'zoomIn 0.5s ease forwards';
            skill.style.animationDelay = `${index * 0.1}s`;
        }, index * 100);
    });
}

// =============================================================================
// BOTONES DE CONTACTO
// =============================================================================

/**
 * Configurar botones de contacto
 */
function setupContactButtons() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const memberCard = this.closest('.member-card');
            const memberName = memberCard.querySelector('.member-name')?.textContent || '';
            
            // Redireccionar a página de contacto con parámetro
            const contactUrl = `contact.html?member=${encodeURIComponent(memberName)}`;
            window.location.href = contactUrl;
            
            // Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_team_member', {
                    'event_category': 'Team',
                    'event_label': memberName
                });
            }
        });
    });
}

// =============================================================================
// EFECTOS VISUALES ADICIONALES
// =============================================================================

/**
 * Crear efecto de partículas específico para la página del equipo
 */
function createTeamParticles() {
    const heroSection = document.querySelector('.team-hero');
    if (!heroSection || window.innerWidth <= 768) return;
    
    // Crear contenedor de partículas
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'team-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    heroSection.style.position = 'relative';
    heroSection.appendChild(particlesContainer);
    
    // Crear partículas con iconos relacionados al equipo
    const teamIcons = ['fas fa-users', 'fas fa-lightbulb', 'fas fa-rocket', 'fas fa-star'];
    
    for (let i = 0; i < 20; i++) {
        createTeamParticle(particlesContainer, teamIcons);
    }
}

/**
 * Crear partícula individual para el equipo
 */
function createTeamParticle(container, icons) {
    const particle = document.createElement('div');
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    particle.innerHTML = `<i class="${randomIcon}"></i>`;
    particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 15}px;
        color: rgba(224, 123, 223, ${Math.random() * 0.3 + 0.1});
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: teamFloat ${Math.random() * 10 + 15}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
}

// Agregar keyframe para animación de partículas del equipo
function addTeamAnimations() {
    if (document.querySelector('#team-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'team-animations';
    style.textContent = `
        @keyframes teamFloat {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-20px) rotate(90deg);
                opacity: 0.7;
            }
            50% {
                transform: translateY(-40px) rotate(180deg);
                opacity: 1;
            }
            75% {
                transform: translateY(-20px) rotate(270deg);
                opacity: 0.7;
            }
        }
        
        .member-card.expanded {
            transform: scale(1.05);
            z-index: 10;
            box-shadow: 0 20px 40px rgba(224, 123, 223, 0.3);
        }
        
        .member-card.expanded .member-description {
            max-height: none;
            overflow: visible;
        }
        
        .skill-tag, .specialty {
            opacity: 0;
            transform: scale(0.8);
        }
        
        @keyframes zoomIn {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// =============================================================================
// FILTROS Y BÚSQUEDA DEL EQUIPO
// =============================================================================

/**
 * Inicializar filtros del equipo (para futuras expansiones)
 */
function initTeamFilters() {
    // Esta función está preparada para cuando se agreguen más miembros
    // y se necesite filtrado por departamento, rol, etc.
    
    const filterButtons = document.querySelectorAll('.team-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterTeamMembers(filter);
        });
    });
}

/**
 * Filtrar miembros del equipo
 */
function filterTeamMembers(filter) {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        const memberRole = card.dataset.role || '';
        const memberDepartment = card.dataset.department || '';
        
        const shouldShow = filter === 'all' || 
                          memberRole.includes(filter) || 
                          memberDepartment.includes(filter);
        
        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.add('visible');
            }, 100);
        } else {
            card.classList.remove('visible');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// =============================================================================
// MANEJO DE IMÁGENES Y FALLBACKS
// =============================================================================

/**
 * Configurar manejo de errores de imágenes del equipo
 */
function setupTeamImageHandling() {
    const teamImages = document.querySelectorAll('.member-image img');
    
    teamImages.forEach(img => {
        img.addEventListener('error', function() {
            // Fallback para imágenes no encontradas
            this.src = '../images/team/placeholder-avatar.jpg';
            this.alt = 'Imagen no disponible';
            
            // Agregar clase para estilos especiales de placeholder
            this.classList.add('placeholder-image');
        });
        
        img.addEventListener('load', function() {
            // Animar carga de imagen
            this.style.animation = 'fadeIn 0.5s ease forwards';
        });
    });
}

// =============================================================================
// BÚSQUEDA DE MIEMBROS
// =============================================================================

/**
 * Inicializar búsqueda de miembros (para futuras expansiones)
 */
function initMemberSearch() {
    const searchInput = document.querySelector('#team-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.toLowerCase().trim();
        searchTeamMembers(query);
    }, 300));
}

/**
 * Buscar miembros del equipo
 */
function searchTeamMembers(query) {
    const memberCards = document.querySelectorAll('.member-card');
    let visibleCount = 0;
    
    memberCards.forEach(card => {
        const memberName = card.querySelector('.member-name')?.textContent.toLowerCase() || '';
        const memberRole = card.querySelector('.member-role')?.textContent.toLowerCase() || '';
        const memberSkills = Array.from(card.querySelectorAll('.skill-tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
        
        const matchesSearch = !query || 
                             memberName.includes(query) || 
                             memberRole.includes(query) || 
                             memberSkills.includes(query);
        
        if (matchesSearch) {
            card.style.display = 'block';
            card.classList.add('visible');
            visibleCount++;
        } else {
            card.classList.remove('visible');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Mostrar mensaje si no hay resultados
    showSearchResults(visibleCount, query);
}

/**
 * Mostrar resultados de búsqueda
 */
function showSearchResults(count, query) {
    let resultsElement = document.querySelector('.search-results');
    
    if (!resultsElement) {
        resultsElement = document.createElement('div');
        resultsElement.className = 'search-results';
        resultsElement.style.cssText = `
            text-align: center;
            padding: 20px;
            color: var(--text-gray);
            font-style: italic;
        `;
        
        const teamGrid = document.querySelector('.team-grid');
        if (teamGrid) {
            teamGrid.parentNode.insertBefore(resultsElement, teamGrid.nextSibling);
        }
    }
    
    if (query && count === 0) {
        resultsElement.textContent = `No se encontraron miembros que coincidan con "${query}"`;
        resultsElement.style.display = 'block';
    } else if (query && count > 0) {
        resultsElement.textContent = `Se encontraron ${count} miembro(s) que coinciden con "${query}"`;
        resultsElement.style.display = 'block';
    } else {
        resultsElement.style.display = 'none';
    }
}

// =============================================================================
// EFECTOS DE HABILIDADES
// =============================================================================

/**
 * Crear efecto de hover mejorado para habilidades
 */
function enhanceSkillsInteraction() {
    const skillTags = document.querySelectorAll('.skill-tag, .specialty');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.zIndex = '10';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
        
        // Click para mostrar información adicional (futuras expansiones)
        tag.addEventListener('click', function() {
            showSkillInfo(this.textContent);
        });
    });
}

/**
 * Mostrar información de habilidad (placeholder para futuras expansiones)
 */
function showSkillInfo(skillName) {
    if (typeof window.BrightmatterLab?.showToast === 'function') {
        window.BrightmatterLab.showToast(`Habilidad: ${skillName}`, 'info');
    }
    
    // Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'skill_info_click', {
            'event_category': 'Team',
            'event_label': skillName
        });
    }
}

// =============================================================================
// GENERACIÓN DINÁMICA DE CONTENIDO
// =============================================================================

/**
 * Generar tarjeta de miembro dinámicamente (para futuras expansiones)
 */
function generateMemberCard(memberData) {
    const skillsHtml = memberData.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');
    
    const socialLinksHtml = Object.entries(memberData.contact)
        .filter(([key, value]) => value && value !== '#')
        .map(([platform, url]) => {
            const iconMap = {
                email: 'fas fa-envelope',
                linkedin: 'fab fa-linkedin',
                github: 'fab fa-github',
                instagram: 'fab fa-instagram',
                twitter: 'fab fa-twitter'
            };
            
            const icon = iconMap[platform] || 'fas fa-link';
            const href = platform === 'email' ? `mailto:${url}` : url;
            
            return `
                <a href="${href}" class="social-link" aria-label="${platform}" target="_blank">
                    <i class="${icon}"></i>
                </a>
            `;
        }).join('');
    
    return `
        <div class="member-card fade-in-up" data-member-id="${memberData.id}">
            <div class="member-image">
                <img src="${memberData.image}" alt="${memberData.name}" loading="lazy">
                <div class="image-overlay">
                    <div class="social-links">
                        ${socialLinksHtml}
                    </div>
                </div>
            </div>
            
            <div class="member-info">
                <div class="member-header">
                    <h3 class="member-name">${memberData.name}</h3>
                    <span class="member-role">${memberData.role}</span>
                    <div class="member-badge">${memberData.title}</div>
                </div>
                
                <p class="member-description">${memberData.description}</p>
                
                <div class="member-skills">
                    <h4>Tecnologías:</h4>
                    <div class="skills-grid">
                        ${skillsHtml}
                    </div>
                </div>
                
                <div class="member-contact">
                    <button class="contact-btn">
                        <i class="fas fa-envelope"></i>
                        Contactar
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Agregar nuevo miembro al equipo (función para escalabilidad futura)
 */
function addTeamMember(memberData, targetContainer = '.team-grid') {
    const container = document.querySelector(targetContainer);
    if (!container) {
        console.error('Container no encontrado:', targetContainer);
        return;
    }
    
    const memberHtml = generateMemberCard(memberData);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = memberHtml;
    const memberCard = tempDiv.firstElementChild;
    
    // Agregar al DOM
    container.appendChild(memberCard);
    
    // Inicializar interacciones para el nuevo miembro
    setupMemberCardInteractions(memberCard);
    
    // Animar entrada
    setTimeout(() => {
        memberCard.classList.add('visible');
    }, 100);
    
    console.log(`Miembro agregado: ${memberData.name}`);
}

/**
 * Configurar interacciones para una card específica
 */
function setupMemberCardInteractions(card) {
    // Hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Contact button
    const contactBtn = card.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const memberName = card.querySelector('.member-name')?.textContent || '';
            window.location.href = `contact.html?member=${encodeURIComponent(memberName)}`;
        });
    }
    
    // Skill tags
    const skillTags = card.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => showSkillInfo(tag.textContent));
    });
}

// =============================================================================
// UTILITIES ESPECÍFICAS DEL EQUIPO
// =============================================================================

/**
 * Obtener información de miembro por ID
 */
function getMemberById(memberId) {
    // Buscar en CEO
    if (teamData.ceo.id === memberId) {
        return teamData.ceo;
    }
    
    // Buscar en cofundadores
    const cofounder = teamData.cofounders.find(member => member.id === memberId);
    if (cofounder) return cofounder;
    
    // Buscar en miembros
    const member = teamData.members.find(member => member.id === memberId);
    if (member) return member;
    
    return null;
}

/**
 * Obtener estadísticas del equipo
 */
function getTeamStats() {
    const totalMembers = 1 + teamData.cofounders.length + teamData.members.length; // CEO + cofounders + members
    const totalSkills = new Set();
    
    // Recopilar todas las habilidades
    if (teamData.ceo.specialties) {
        teamData.ceo.specialties.forEach(skill => totalSkills.add(skill));
    }
    
    teamData.cofounders.forEach(member => {
        if (member.skills) {
            member.skills.forEach(skill => totalSkills.add(skill));
        }
    });
    
    teamData.members.forEach(member => {
        if (member.skills) {
            member.skills.forEach(skill => totalSkills.add(skill));
        }
    });
    
    return {
        totalMembers,
        totalSkills: totalSkills.size,
        departments: ['Desarrollo', 'Diseño', 'Marketing', 'Liderazgo']
    };
}

/**
 * Función de debounce para optimización
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

// =============================================================================
// ACCESIBILIDAD
// =============================================================================

/**
 * Mejorar accesibilidad de la página del equipo
 */
function enhanceTeamAccessibility() {
    // Agregar descripciones ARIA para lectores de pantalla
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        const memberName = card.querySelector('.member-name')?.textContent || '';
        const memberRole = card.querySelector('.member-role')?.textContent || '';
        
        card.setAttribute('aria-label', `Perfil de ${memberName}, ${memberRole}`);
        card.setAttribute('tabindex', '0');
        
        // Navegación por teclado
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                expandMemberCard(this);
            }
        });
    });
    
    // Mejorar navegación de habilidades
    const skillTags = document.querySelectorAll('.skill-tag, .specialty');
    skillTags.forEach(tag => {
        tag.setAttribute('tabindex', '0');
        tag.setAttribute('aria-label', `Habilidad: ${tag.textContent}`);
        
        tag.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                showSkillInfo(this.textContent);
            }
        });
    });
}

// =============================================================================
// EXPORTAR FUNCIONES GLOBALES
// =============================================================================

// Hacer funciones disponibles globalmente
window.addTeamMember = addTeamMember;
window.getMemberById = getMemberById;
window.getTeamStats = getTeamStats;

// =============================================================================
// INICIALIZACIÓN FINAL
// =============================================================================

// Configurar cuando la página esté cargada
window.addEventListener('load', function() {
    // Agregar animaciones específicas del equipo
    addTeamAnimations();
    
    // Crear partículas del equipo
    createTeamParticles();
    
    // Configurar manejo de imágenes
    setupTeamImageHandling();
    
    // Mejorar accesibilidad
    enhanceTeamAccessibility();
    
    // Inicializar efectos adicionales
    enhanceSkillsInteraction();
    
    console.log('👥 Página del equipo completamente cargada');
    console.log('📊 Estadísticas del equipo:', getTeamStats());
});