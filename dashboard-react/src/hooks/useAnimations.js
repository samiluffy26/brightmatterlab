import { useEffect, useRef } from 'react';

/**
 * Hook para manejar animaciones de scroll y entrada
 */
export const useScrollAnimations = () => {
  useEffect(() => {
    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observar elementos con clase 'animate-on-scroll'
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((el) => observer.observe(el));

      // Cleanup function
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);
};

/**
 * Hook para animaciones de entrada de página
 */
export const usePageTransition = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.classList.add('page-enter');
      
      const timer = setTimeout(() => {
        if (pageRef.current) {
          pageRef.current.classList.add('page-enter-active');
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, []);

  return pageRef;
};

/**
 * Hook para animaciones de hover en cards
 */
export const useHoverAnimations = () => {
  useEffect(() => {
    // Delay para asegurar que los elementos estén renderizados
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.card, .request-card, .stat-card');
      
      const handleMouseEnter = (e) => {
        e.currentTarget.classList.add('card-hover');
      };
      
      const handleMouseLeave = (e) => {
        e.currentTarget.classList.remove('card-hover');
      };
      
      cards.forEach(card => {
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      });

      // Cleanup function
      return () => {
        cards.forEach(card => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }, 150);

    return () => clearTimeout(timer);
  }, []);
};

/**
 * Hook para efectos de loading y transiciones suaves
 */
export const useLoadingEffects = () => {
  useEffect(() => {
    // Simular loading inicial
    document.body.classList.add('loading');
    
    const timer = setTimeout(() => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 300);

    return () => clearTimeout(timer);
  }, []);
};

/**
 * Hook para asegurar que las animaciones se ejecuten después del render completo
 */
export const useAnimationReady = (callback) => {
  useEffect(() => {
    // Esperar a que React termine de renderizar
    const timer = setTimeout(() => {
      if (callback) callback();
    }, 200);

    return () => clearTimeout(timer);
  }, [callback]);
};

/**
 * Hook combinado para todas las animaciones de componente
 */
export const useComponentAnimations = () => {
  const pageRef = usePageTransition();
  
  useEffect(() => {
    // Delay para asegurar que el DOM esté listo
    const initAnimations = setTimeout(() => {
      // Re-inicializar observadores y efectos
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observar elementos animables
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((el) => observer.observe(el));

      // Configurar hover effects
      const cards = document.querySelectorAll('.card, .request-card, .stat-card');
      
      const handleMouseEnter = (e) => {
        e.currentTarget.classList.add('card-hover');
      };
      
      const handleMouseLeave = (e) => {
        e.currentTarget.classList.remove('card-hover');
      };
      
      cards.forEach(card => {
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      });

      // Cleanup
      return () => {
        observer.disconnect();
        cards.forEach(card => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }, 250);

    return () => clearTimeout(initAnimations);
  }, []);

  return pageRef;
};