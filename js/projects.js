 // Funcionalidad de filtros y animaciones
        document.addEventListener('DOMContentLoaded', function() {
            
            // Animación del contador de estadísticas
            function animateCounter() {
                const counters = document.querySelectorAll('.counter');
                
                const observerOptions = {
                    threshold: 0.5
                };

                const counterObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const counter = entry.target;
                            const target = parseInt(counter.getAttribute('data-target'));
                            const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                            
                            let start = 0;
                            const increment = target / (duration / 16); // 60fps
                            
                            const timer = setInterval(() => {
                                start += increment;
                                if (start >= target) {
                                    counter.textContent = target;
                                    clearInterval(timer);
                                } else {
                                    counter.textContent = Math.floor(start);
                                }
                            }, 16);
                            
                            counterObserver.unobserve(counter);
                        }
                    });
                }, observerOptions);

                counters.forEach(counter => {
                    counterObserver.observe(counter);
                });
            }

            // Inicializar animación de contadores
            animateCounter();
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectItems = document.querySelectorAll('.project-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Actualizar botones activos
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filtrar proyectos
                    projectItems.forEach(item => {
                        const categories = item.getAttribute('data-category').split(' ');
                        
                        if (filter === 'all' || categories.includes(filter)) {
                            item.style.display = 'block';
                            item.classList.add('show');
                        } else {
                            item.style.display = 'none';
                            item.classList.remove('show');
                        }
                    });
                });
            });
            
            // Funcionalidad de modales
            const modalButtons = document.querySelectorAll('[data-modal]');
            const modals = document.querySelectorAll('.modal');
            const closeButtons = document.querySelectorAll('.modal-close');
            
            modalButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const modalId = this.getAttribute('data-modal').replace('project-', 'project-modal-');
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        modal.classList.add('show');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    modal.classList.remove('show');
                    document.body.style.overflow = '';
                });
            });
            
            // Cerrar modal al hacer click fuera
            modals.forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.classList.remove('show');
                        document.body.style.overflow = '';
                    }
                });
            });
            
            // Cerrar modal con tecla Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    const activeModal = document.querySelector('.modal.show');
                    if (activeModal) {
                        activeModal.classList.remove('show');
                        document.body.style.overflow = '';
                    }
                }
            });

            // Galería de imágenes en modales
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    const mainImage = this.closest('.project-gallery').querySelector('.main-image img');
                    const allThumbs = this.closest('.thumbnail-gallery').querySelectorAll('.thumbnail');
                    
                    // Actualizar imagen principal
                    mainImage.src = this.src;
                    mainImage.alt = this.alt;
                    
                    // Actualizar thumbnail activo
                    allThumbs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Animación de entrada para proyectos
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const projectObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                    }
                });
            }, observerOptions);

            projectItems.forEach(item => {
                projectObserver.observe(item);
            });

            // Verificar si hay un modal pendiente por abrir
            checkPendingModalOnProjectsPage();
        });

        // Función para verificar y abrir modal pendiente
        function checkPendingModalOnProjectsPage() {
            const pendingModal = localStorage.getItem('openModal');
            
            if (pendingModal) {
                // Limpiar el storage
                localStorage.removeItem('openModal');
                
                // Esperar un poco para que todo se cargue
                setTimeout(() => {
                    // Buscar el modal y abrirlo
                    const modal = document.getElementById(pendingModal);
                    if (modal) {
                        modal.classList.add('show');
                        document.body.style.overflow = 'hidden';
                        
                        // Inicializar el carrusel del modal si existe la clase
                        if (typeof ModalCarousel !== 'undefined') {
                            new ModalCarousel(pendingModal);
                        }
                    }
                }, 800);
            }
        }