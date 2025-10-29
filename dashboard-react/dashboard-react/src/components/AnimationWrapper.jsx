import { useState, useEffect } from 'react';

/**
 * Componente wrapper que asegura que las animaciones estén listas
 */
export default function AnimationWrapper({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Pequeño delay para asegurar que React haya terminado de renderizar
    const timer = setTimeout(() => {
      setIsReady(true);
      
      // Forzar una re-observación de elementos
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Pequeño delay adicional para la animación
              setTimeout(() => {
                entry.target.classList.add('animate-in');
              }, 50);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Re-observar todos los elementos animables
      setTimeout(() => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el) => {
          observer.observe(el);
        });
      }, 100);

      return () => observer.disconnect();
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`animation-wrapper ${isReady ? 'ready' : 'loading'}`}>
      {children}
    </div>
  );
}