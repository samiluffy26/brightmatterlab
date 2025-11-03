import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeApp } from '../utils/appUtils'
import { useLoadingEffects, useScrollAnimations } from '../hooks/useAnimations'

export default function Layout({ children }) {
  const location = useLocation()
  
  // Inicializar efectos y animaciones
  useLoadingEffects()
  useScrollAnimations()
  
  // Inicializar app y crear estrellas animadas
  useEffect(() => {
    const initializeAll = async () => {
      // Inicializar utilidades principales
      await initializeApp()
      
      const createStars = () => {
        const starsContainer = document.getElementById('stars')
        if (starsContainer) {
          // Limpiar estrellas existentes
          starsContainer.innerHTML = ''
          
          // Crear 100 estrellas
          for (let i = 0; i < 100; i++) {
            const star = document.createElement('div')
            star.className = 'star'
            const size = Math.random() * 2 + 1
            star.style.width = size + 'px'
            star.style.height = size + 'px'
            star.style.left = Math.random() * 100 + '%'
            star.style.top = Math.random() * 100 + '%'
            star.style.opacity = Math.random() * 0.5 + 0.3
            starsContainer.appendChild(star)
          }
        }
      }
      
      // Delay para asegurar que el DOM esté listo
      setTimeout(createStars, 100)
    }
    
    initializeAll()
  }, [])
  
  return (
    <>
      {/* Background y estrellas */}
      <div className="background"></div>
      <div className="stars" id="stars"></div>
      
      <div className="container">
        {/* Sidebar con navegación */}
        <div className="sidebar">
          <div className="logo">BRIGHT<br />MATTER</div>
          
          <Link to="/" style={{textDecoration: 'none'}}>
            <div className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
              <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              Dashboard
            </div>
          </Link>
          
          <Link to="/requests" style={{textDecoration: 'none'}}>
            <div className={`menu-item ${location.pathname === '/requests' ? 'active' : ''}`}>
              <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="6" width="18" height="3" rx="1"/>
                <rect x="3" y="11" width="18" height="3" rx="1"/>
                <rect x="3" y="16" width="18" height="3" rx="1"/>
              </svg>
              Requests
            </div>
          </Link>

          <Link to="/services" style={{textDecoration: 'none'}}>
            <div className={`menu-item ${location.pathname === '/services' ? 'active' : ''}`}>
              <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
                <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Services
            </div>
          </Link>

          <div className="bottom-menu">
            <div className="menu-item">
              <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/>
              </svg>
              Profile
            </div>
            
            <div className="menu-item">
              <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </div>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="main-content">
          {children}
        </div>
      </div>
    </>
  )
}