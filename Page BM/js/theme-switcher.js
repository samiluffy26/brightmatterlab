/**
 * BRIGHTMATTER LAB - THEME SWITCHER (Modo Oscuro)
 * Función para alternar entre modo claro y oscuro
 */

function switchTheme() {
    // Detectar la página actual
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    // Determinar si estamos en modo claro o oscuro
    const isDarkMode = currentPath.includes('/Page BM/');

    // Construir la URL del otro modo
    const baseUrl = window.location.origin + '/brightmatterlab';
    const targetMode = isDarkMode ? 'brightmatter-lab' : 'Page BM';
    const pagePath = currentPage === 'index.html' ? '' : 'pages/';

    const targetUrl = `${baseUrl}/${targetMode}/${pagePath}${currentPage}`;

    // Transición suave antes de redirigir
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.7';

    // Redirigir después de un breve delay
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 200);
}

// Función para crear y mostrar el botón del theme switcher
function createThemeSwitcher() {
    // Crear el botón
    const button = document.createElement('button');
    button.id = 'theme-switcher-btn';
    button.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    button.onclick = switchTheme;

    // Agregar estilos básicos
    button.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(224, 123, 223, 0.3);
        border-radius: 25px;
        padding: 10px 20px;
        color: white;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;

    // Agregar estilos de hover
    button.onmouseover = () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 5px 15px rgba(224, 123, 223, 0.3)';
    };

    button.onmouseout = () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    };

    // Agregar al DOM
    document.body.appendChild(button);

    console.log('🎨 Theme switcher button created for dark mode');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    createThemeSwitcher();
});