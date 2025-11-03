import { useState, useEffect } from 'react'
import { useComponentAnimations } from '../hooks/useAnimations'
import '../styles/services.css'

export default function Services() {
  const pageRef = useComponentAnimations()
  const [services, setServices] = useState([
    {
      icon: '🌐',
      title: 'Desarrollo Web',
      subtitle: 'Web Development',
      description: 'Sitios web modernos, responsivos y optimizados para SEO. Desde landing pages hasta aplicaciones web complejas.',
      features: [
        'Diseño responsivo',
        'Optimización SEO',
        'Panel de administración',
        'Integración de APIs',
        'Hosting y dominio'
      ],
      price: '$800',
      onSale: false
    },
    {
      icon: '📱',
      title: 'Aplicaciones Móviles',
      subtitle: 'Mobile Apps',
      description: 'Apps nativas y multiplataforma para iOS y Android. Experiencias móviles intuitivas y de alto rendimiento.',
      features: [
        'iOS y Android',
        'UI/UX optimizada',
        'Push notifications',
        'Integración backend',
        'Publicación en stores'
      ],
      price: '$1,500',
      onSale: false
    },
    {
      icon: '🏢',
      title: 'Plataformas Empresariales',
      subtitle: 'Business Platforms',
      description: 'Sistemas internos robustos para empresas e instituciones. Gestión, reportes y automatización de procesos.',
      features: [
        'Gestión de usuarios',
        'Reportes avanzados',
        'Dashboards ejecutivos',
        'Integración ERP/CRM',
        'Seguridad empresarial'
      ],
      price: '$3,000',
      onSale: false
    },
    {
      icon: '🎓',
      title: 'Plataformas Educativas',
      subtitle: 'Educational Systems',
      description: 'Sistemas de gestión educativa y e-learning. Herramientas para instituciones educativas modernas.',
      features: [
        'LMS completo',
        'Gestión académica',
        'Portal estudiantes/padres',
        'Sistema de calificaciones',
        'Reportes estadísticos'
      ],
      price: '$2,500',
      onSale: false
    },
    {
      icon: '🛒',
      title: 'E-commerce',
      subtitle: 'Online Store',
      description: 'Tiendas online completas y funcionales. Desde catálogo hasta proceso de pago seguro.',
      features: [
        'Catálogo de productos',
        'Carrito de compras',
        'Pasarelas de pago',
        'Gestión de inventario',
        'Panel administrativo'
      ],
      price: '$1,200',
      onSale: false
    },
    {
      icon: '🔧',
      title: 'Mantenimiento & Soporte',
      subtitle: 'Support Services',
      description: 'Resolución de bugs, actualizaciones de seguridad y mejoras continuas para tus plataformas existentes.',
      features: [
        'Resolución de bugs',
        'Actualizaciones de seguridad',
        'Optimización de rendimiento',
        'Monitoreo 24/7',
        'Soporte técnico'
      ],
      price: '$300/mes',
      onSale: false
    }
  ])

  const [showEditModal, setShowEditModal] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [editPrice, setEditPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [offerActive, setOfferActive] = useState(false)

  // Cargar servicios del localStorage al montar el componente
  useEffect(() => {
    const savedServices = localStorage.getItem('dashboardServices')
    if (savedServices) {
      setServices(JSON.parse(savedServices))
    }
  }, [])

  // Guardar servicios en localStorage
  const saveServices = (updatedServices) => {
    localStorage.setItem('dashboardServices', JSON.stringify(updatedServices))
    setServices(updatedServices)
  }

  const editService = (index) => {
    const service = services[index]
    setEditingService(index)
    setEditPrice(service.price)
    setShowEditModal(true)
  }

  const savePrice = () => {
    if (editingService !== null && editPrice.trim() !== '') {
      const updatedServices = [...services]
      updatedServices[editingService].price = editPrice.trim()
      saveServices(updatedServices)
      setShowEditModal(false)
      setEditingService(null)
      setEditPrice('')
    }
  }

  const toggleOffer = (index) => {
    const service = services[index]
    if (service.onSale) {
      // Quitar oferta
      const updatedServices = [...services]
      updatedServices[index].onSale = false
      saveServices(updatedServices)
    } else {
      // Configurar oferta
      setEditingService(index)
      setOfferPrice('')
      setOfferActive(true)
      setShowOfferModal(true)
    }
  }

  const saveOffer = () => {
    if (editingService !== null && offerPrice.trim() !== '') {
      const updatedServices = [...services]
      updatedServices[editingService].onSale = offerActive
      if (offerActive) {
        updatedServices[editingService].originalPrice = updatedServices[editingService].price
        updatedServices[editingService].price = offerPrice.trim()
      }
      saveServices(updatedServices)
      setShowOfferModal(false)
      setEditingService(null)
      setOfferPrice('')
      setOfferActive(false)
    }
  }

  const closeModal = (modalType) => {
    if (modalType === 'edit') {
      setShowEditModal(false)
    } else if (modalType === 'offer') {
      setShowOfferModal(false)
    }
    setEditingService(null)
    setEditPrice('')
    setOfferPrice('')
    setOfferActive(false)
  }

  return (
    <div ref={pageRef} className="page-container">
      <div className="header">
        <div className="header-top">
          <div>
            <h1>Manage Services</h1>
            <p>Administra precios, ofertas y disponibilidad de servicios.</p>
          </div>
          <div className="header-right">
            <div className="profile-pic">
              <svg width="55" height="55" viewBox="0 0 55 55">
                <rect width="55" height="55" fill="#e5e7eb"/>
                <circle cx="27.5" cy="20" r="8" fill="#9ca3af"/>
                <path d="M10 45c0-8 7-12 17.5-12S45 37 45 45" fill="#9ca3af"/>
              </svg>
            </div>
            <div className="notification-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M18 8c0-3.3-2.7-6-6-6S6 4.7 6 8c0 4.5-2 6-2 6h16s-2-1.5-2-6z"/>
                <path d="M13.73 21c-.3.5-.8.9-1.4 1-.6.1-1.3-.1-1.7-.6-.2-.2-.3-.5-.4-.8"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="content-area">
        <button className="add-service-btn">
          <span>➕</span> Agregar Nuevo Servicio
        </button>

        <div className="services-grid animate-on-scroll">
          {services.map((service, index) => (
            <div key={index} className="service-card animate-on-scroll" data-service-index={index}>
              {service.onSale && <div className="offer-badge">Oferta</div>}
              
              <div className="service-header">
                <div className="service-icon">{service.icon}</div>
                <div className="service-title-section">
                  <div className="service-title">{service.title}</div>
                  <div className="service-subtitle">{service.subtitle}</div>
                </div>
              </div>

              <div className="service-description">
                {service.description}
              </div>

              <div className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="feature-item">
                    <span className="feature-check">✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="service-footer">
                <div className="service-price-section">
                  <div className="price-label">Precio Actual</div>
                  <div className="service-price">{service.price}</div>
                  {service.originalPrice && (
                    <div className="original-price">{service.originalPrice}</div>
                  )}
                </div>
                <div className="admin-controls">
                  <button className="admin-btn edit-btn" onClick={() => editService(index)} title="Editar precio">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Editar
                  </button>
                  <button 
                    className={`admin-btn ${service.onSale ? 'remove-offer-btn' : 'offer-btn'}`}
                    onClick={() => toggleOffer(index)} 
                    title={service.onSale ? 'Quitar oferta' : 'Agregar oferta'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {service.onSale ? 'Quitar Oferta' : 'Oferta'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Editar Precio */}
      {showEditModal && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-close" onClick={() => closeModal('edit')}>×</div>
            <h2 className="modal-title">Editar Precio</h2>
            
            <div className="form-group">
              <label className="form-label">Precio Actual</label>
              <input 
                type="text" 
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="form-input" 
                placeholder="Ej: 800"
              />
            </div>

            <div className="modal-actions">
              <button className="modal-btn modal-btn-cancel" onClick={() => closeModal('edit')}>
                Cancelar
              </button>
              <button className="modal-btn modal-btn-save" onClick={savePrice}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Configurar Oferta */}
      {showOfferModal && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-close" onClick={() => closeModal('offer')}>×</div>
            <h2 className="modal-title">Configurar Oferta</h2>
            
            <div className="form-group">
              <label className="form-label">Precio Original</label>
              <input 
                type="text" 
                value={editingService !== null ? services[editingService].price : ''}
                className="form-input" 
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Precio con Oferta</label>
              <input 
                type="text" 
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="form-input" 
                placeholder="Ej: 600"
              />
            </div>

            <div className="form-group">
              <label className="form-checkbox">
                <input 
                  type="checkbox" 
                  checked={offerActive}
                  onChange={(e) => setOfferActive(e.target.checked)}
                />
                <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>Activar oferta</span>
              </label>
            </div>

            <div className="modal-actions">
              <button className="modal-btn modal-btn-cancel" onClick={() => closeModal('offer')}>
                Cancelar
              </button>
              <button className="modal-btn modal-btn-save" onClick={saveOffer}>
                Aplicar Oferta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
