// Orden de las páginas para saber dirección
const pageOrder = ['dashboard', 'requests', 'services'];
const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'dashboard';
let currentPageIndex = pageOrder.indexOf(currentPage);

// Función para cambiar de página con animación
function navigateToPage(targetPage) {
    const targetIndex = pageOrder.indexOf(targetPage);
    const direction = targetIndex > currentPageIndex ? 'down' : 'up';
    
    const mainContent = document.querySelector('.main-content');
    
    // Aplicar animación de salida
    mainContent.style.animation = `slide${direction === 'down' ? 'Down' : 'Up'}Exit 0.5s ease-out forwards`;
    
    // Esperar a que termine la animación antes de navegar
    setTimeout(() => {
        localStorage.setItem('pageDirection', direction);
        window.location.href = targetPage + '.html';
    }, 500);
}

// Al cargar la página, aplicar animación de entrada
window.addEventListener('DOMContentLoaded', function() {
    const direction = localStorage.getItem('pageDirection');
    const mainContent = document.querySelector('.main-content');
    
    if (direction) {
        mainContent.style.animation = `slide${direction === 'down' ? 'Down' : 'Up'}Enter 0.5s ease-out forwards`;
        localStorage.removeItem('pageDirection');
    }
    
    // Actualizar menú activo
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`.menu-item[data-page="${currentPage}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
    
    // Agregar event listeners a los botones del menú
    document.querySelectorAll('.menu-item[data-page]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage !== currentPage) {
                navigateToPage(targetPage);
            }
        });
    });
});