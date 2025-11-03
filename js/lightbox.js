// Lightbox para imágenes de proyectos
class ImageLightbox {
    constructor() {
        this.lightbox = null;
        this.lightboxImage = null;
        this.lightboxCaption = null;
        this.closeBtn = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.currentImages = [];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        // Obtener elementos del lightbox
        this.lightbox = document.getElementById('image-lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.closeBtn = document.getElementById('lightbox-close');
        this.prevBtn = document.getElementById('lightbox-prev');
        this.nextBtn = document.getElementById('lightbox-next');

        // Bind eventos
        this.bindEvents();
    }

    bindEvents() {
        // Evento de cierre
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Cerrar con click en el overlay
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.close();
                }
            });
        }

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
                this.close();
            }
            if (e.key === 'ArrowLeft' && this.lightbox.classList.contains('active')) {
                this.prev();
            }
            if (e.key === 'ArrowRight' && this.lightbox.classList.contains('active')) {
                this.next();
            }
        });

        // Navegación
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Agregar evento click a todas las imágenes de galería
        this.bindImageClicks();
    }

    bindImageClicks() {
        // Esperar a que el DOM esté listo y los modales se hayan cargado
        const bindToImages = () => {
            // Buscar todas las imágenes en galerías de proyectos
            const galleryImages = document.querySelectorAll('.project-gallery .main-image img, .project-gallery .thumbnail');
            
            galleryImages.forEach(img => {
                // Remover listeners existentes para evitar duplicados
                img.removeEventListener('click', this.handleImageClick);
                // Agregar el listener
                img.addEventListener('click', (e) => this.handleImageClick(e));
            });
        };

        // Bind inicial
        bindToImages();

        // Re-bind cuando se abran modales (para imágenes cargadas dinámicamente)
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-modal]')) {
                setTimeout(() => {
                    bindToImages();
                }, 300); // Delay para permitir que el modal se abra
            }
        });
    }

    handleImageClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const clickedImage = e.target;
        const gallery = clickedImage.closest('.project-gallery');
        
        if (!gallery) return;

        // Obtener todas las imágenes de la galería actual
        const mainImage = gallery.querySelector('.main-image img');
        const thumbnails = gallery.querySelectorAll('.thumbnail');
        
        // Crear array con todas las imágenes
        this.currentImages = [];
        
        // Agregar imagen principal si existe
        if (mainImage) {
            this.currentImages.push({
                src: mainImage.src,
                alt: mainImage.alt
            });
        }
        
        // Agregar thumbnails (evitar duplicados)
        thumbnails.forEach(thumb => {
            const isDuplicate = this.currentImages.some(img => img.src === thumb.src);
            if (!isDuplicate) {
                this.currentImages.push({
                    src: thumb.src,
                    alt: thumb.alt
                });
            }
        });

        // Encontrar el índice de la imagen clickeada
        this.currentIndex = this.currentImages.findIndex(img => img.src === clickedImage.src);
        if (this.currentIndex === -1) this.currentIndex = 0;

        // Abrir lightbox
        this.open();
    }

    open() {
        if (!this.lightbox || this.currentImages.length === 0) return;

        // Mostrar lightbox
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Cargar imagen actual
        this.loadImage();
        
        // Actualizar controles de navegación
        this.updateNavigation();
    }

    close() {
        if (!this.lightbox) return;

        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
        this.currentImages = [];
        this.currentIndex = 0;
    }

    prev() {
        if (this.currentImages.length <= 1) return;
        
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.currentImages.length - 1;
        this.loadImage();
        this.updateNavigation();
    }

    next() {
        if (this.currentImages.length <= 1) return;
        
        this.currentIndex = this.currentIndex < this.currentImages.length - 1 ? this.currentIndex + 1 : 0;
        this.loadImage();
        this.updateNavigation();
    }

    loadImage() {
        if (!this.lightboxImage || !this.currentImages[this.currentIndex]) return;

        const currentImg = this.currentImages[this.currentIndex];
        
        // Crear nueva imagen para precargar
        const img = new Image();
        img.onload = () => {
            this.lightboxImage.src = currentImg.src;
            this.lightboxImage.alt = currentImg.alt;
            
            if (this.lightboxCaption) {
                this.lightboxCaption.textContent = currentImg.alt || `Imagen ${this.currentIndex + 1} de ${this.currentImages.length}`;
            }
        };
        
        // Iniciar carga
        img.src = currentImg.src;
    }

    updateNavigation() {
        if (!this.prevBtn || !this.nextBtn) return;

        // Habilitar/deshabilitar botones según la cantidad de imágenes
        if (this.currentImages.length <= 1) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = 'flex';
            this.nextBtn.style.display = 'flex';
            
            // Los botones siempre están habilitados en un carrusel circular
            this.prevBtn.disabled = false;
            this.nextBtn.disabled = false;
        }
    }
}

// Inicializar lightbox cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = new ImageLightbox();
});