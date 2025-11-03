// Carrusel de imágenes para modales de proyectos
class ModalCarousel {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.currentIndex = 0;
        this.images = [];
        this.thumbnails = [];
        this.init();
    }

    init() {
        if (!this.modal) return;

        // Buscar todas las imágenes en la galería
        const gallery = this.modal.querySelector('.project-gallery');
        if (!gallery) return;

        // Obtener imágenes principales y miniaturas
        const mainImage = gallery.querySelector('.main-image img');
        const thumbnailImages = gallery.querySelectorAll('.thumbnail-gallery .thumbnail');

        // Solo usar las miniaturas como imágenes del carrusel
        thumbnailImages.forEach(thumb => {
            this.images.push(thumb.src);
            this.thumbnails.push(thumb);
        });

        // Si hay más de una imagen, crear controles del carrusel
        if (this.images.length > 1) {
            this.createCarouselControls();
            this.bindEvents();
        }

        // Marcar primera miniatura como activa
        if (this.thumbnails.length > 0) {
            this.thumbnails[0].classList.add('active');
            // Establecer la imagen principal inicial
            if (mainImage) {
                mainImage.src = this.images[0];
                mainImage.alt = this.thumbnails[0].alt;
            }
        }
    }

    createCarouselControls() {
        const gallery = this.modal.querySelector('.project-gallery');
        const mainImageContainer = gallery.querySelector('.main-image');

        // Crear contenedor de controles
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'carousel-controls';

        // Botón anterior
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-btn carousel-prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.setAttribute('aria-label', 'Imagen anterior');

        // Botón siguiente
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-btn carousel-next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.setAttribute('aria-label', 'Imagen siguiente');

        // Indicadores
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';

        for (let i = 0; i < this.images.length; i++) {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-index', i);
            indicator.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
            indicators.appendChild(indicator);
        }

        controlsContainer.appendChild(prevButton);
        controlsContainer.appendChild(indicators);
        controlsContainer.appendChild(nextButton);

        mainImageContainer.appendChild(controlsContainer);
    }

    bindEvents() {
        const prevBtn = this.modal.querySelector('.carousel-prev');
        const nextBtn = this.modal.querySelector('.carousel-next');
        const indicators = this.modal.querySelectorAll('.carousel-indicator');
        const thumbnails = this.modal.querySelectorAll('.thumbnail');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevImage());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextImage());
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToImage(index));
        });

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => this.goToImage(index));
        });
    }

    prevImage() {
        const newIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
        this.goToImage(newIndex);
    }

    nextImage() {
        const newIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
        this.goToImage(newIndex);
    }

    goToImage(index) {
        if (index < 0 || index >= this.images.length) return;

        this.currentIndex = index;
        const mainImage = this.modal.querySelector('.main-image img');

        if (mainImage) {
            mainImage.src = this.images[index];
            mainImage.alt = this.getImageAlt(index);
        }

        // Actualizar indicadores
        const indicators = this.modal.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        // Actualizar miniaturas
        const thumbnails = this.modal.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, i) => {
            thumbnail.classList.toggle('active', i === index);
        });
    }

    getImageAlt(index) {
        const thumbnails = this.modal.querySelectorAll('.thumbnail');
        if (thumbnails[index]) {
            return thumbnails[index].alt;
        }
        return `Imagen ${index + 1} del proyecto`;
    }
}

// Inicializar carruseles cuando se abre un modal
document.addEventListener('DOMContentLoaded', function() {
    // Crear instancias de carrusel para cada modal cuando se abren
    document.addEventListener('click', function(e) {
        if (e.target.closest('[data-modal]')) {
            const modalId = e.target.closest('[data-modal]').getAttribute('data-modal');
            let fullModalId;
            
            // Manejo flexible del formato del modalId
            if (modalId.startsWith('project-')) {
                fullModalId = `project-modal-${modalId.split('-')[1]}`;
            } else {
                fullModalId = `project-modal-${modalId}`;
            }

            // Pequeño delay para asegurar que el modal esté visible
            setTimeout(() => {
                const carousel = new ModalCarousel(fullModalId);
            }, 200);
        }
    });
});