// Color palette
export const COLORS = {
  primary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    600: '#7C3AED',
    700: '#6D28D9',
  },
  accent: {
    500: '#10B981',
    600: '#059669',
  },
  ink: '#0F172A',
} as const

// Company info
export const COMPANY = {
  name: 'Brightmatter Lab',
  email: 'brightmatter.lab@outlook.com',
  phone: '+1 809-657-2939',
  instagram: 'https://instagram.com/brightmatter.lab',
  description: 'Transformamos ideas en soluciones digitales profesionales.',
} as const

// Navigation items
export const NAVIGATION = [
  { name: 'Inicio', href: '/' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Equipo', href: '/equipo' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Contacto', href: '/contacto' },
] as const

// Services data
export const SERVICES = [
  {
    id: 'web',
    title: 'Landing Page',
    description: 'LandingPage, Portafolios, al gusto del cliente.',
    features: [
      'Diseño responsivo',
      'Optimización SEO',
      'Actualizaciones',
      'Formulario',
      'WhatsApp directo'

    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    pricing: 'Desde $150 USD',
  },
  {
    id: 'mobile',
    title: 'Website',
    description: 'Sitios web profesionales, responsivos y optimizados para SEO.',
    features: [
      'Diseño responsive',
      'Push notifications',
      'Integración API',
      'Dashboard Admin'
    ],
    technologies: ['React', '.NET', 'SQL server', 'Azure', 'Docker'],
    pricing: 'Desde $400 USD',
  },
  {
    id: 'platforms',
    title: 'E-Commerce',
    description: 'Tienda online a la medida, con metodos de pago e inventario.',
    features: [
      'Arquitectura escalable',
      'Gestión de usuarios',
      'Reportes avanzados',
      'Integraciones',
      'Optimización SEO'
    ],
    technologies: ['Strapi', 'Stripe', 'React', 'Next.js'],
    pricing: 'Desde $800 USD',
  },
  {
    id: 'maintenance',
    title: 'Mantenimiento & Bugs',
    description: 'Reestructuración y resolución de problemas técnicos.',
    features: [
      'Auditoría de código',
      'Refactoring',
      'Bug fixing',
      'Actualizaciones',
    ],
    technologies: ['Cualquier stack', 'CI/CD', 'Testing', 'Monitoring'],
    pricing: 'Desde $50/mes USD',
  },
] as const

// Projects data
export const PROJECTS = [
  {
    slug: 'donate-platform',
    title: 'Donate Platform',
    shortDescription: 'Plataforma de donaciones con gestión de campañas.',
    description: 'Sistema completo de gestión de donaciones con pasarela de pagos integrada, reportes en tiempo real y gestión de campañas.',
    category: 'Plataforma Web',
    tags: ['Css', 'Python', 'Stripe', 'MongoDB', 'Html', 'Javascripts'],
    image: '/images/projects/Donate/preview.jpg',
    images: [ 
      '/images/projects/Donate/preview.jpg',
      '/images/projects/Donate/donate1.jpg',
      '/images/projects/Donate/donate2.jpg',
      '/images/projects/Donate/donate4.jpg',
      '/images/projects/Donate/donate5.jpg',
      '/images/projects/Donate/donate6.jpg',
      '/images/projects/Donate/donate7.jpg',
      '/images/projects/Donate/donate8.jpg',
      '/images/projects/Donate/donate9.jpg',
      '/images/projects/Donate/donate10.jpg'
    ],
    year: '2024',
    client: 'ONG Internacional',
    results: [
      '50% aumento en donaciones',
      '10,000+ usuarios visitantes',
      'Procesamiento',
    ],
    features: [
      'Pasarela de pagos Stripe',
      'Reportes en tiempo real',
      'Sistema de campañas',
      'Gestión de donantes',
    ],
    testimonial: {
      text: 'Brightmatter Lab transformó nuestra visión en una plataforma robusta que superó nuestras expectativas.',
      author: 'María González',
      role: 'Directora Ejecutiva',
    },
  },
  {
    slug: 'eduvisor',
    title: 'EduVisor',
    shortDescription: 'Plataforma educativa con gestión académica integral.',
    description: 'Sistema completo para instituciones educativas que incluye gestión de estudiantes, docentes, calificaciones y comunicación.',
    category: 'Educación',
    tags: ['Node.js', 'Mongodb', 'Html', 'CSS', 'Azure'],
    image: '/images/projects/eDUvISOR/preview.jpg',
    images: [
      '/images/projects/eDUvISOR/preview.jpg',
      '/images/projects/eDUvISOR/preview2.jpg',
      '/images/projects/eDUvISOR/preview3.jpg',
      '/images/projects/eDUvISOR/preview4.jpg',
     
    ],
    year: '2025',
    client: 'Ministerio de Educacion',
    results: [
      '100+ Docentes activos',
      '95% satisfacción docente',
      '60% reducción tiempo administrativo',
    ],
    features: [
      'Gestión de escuealas',
      'Portal de Directores',
      'Asistencia digital',
      'Comunicación en tiempo real',
      'Reportes',
    ],
  },
  {
    slug: 'sevane-ecommerce',
    title: 'Sevane E-commerce',
    shortDescription: 'Tienda online con inventario y pagos integrados.',
    description: 'Plataforma de comercio electrónico completa con gestión de inventario, carrito de compras y múltiples métodos de pago.',
    category: 'E-commerce',
    tags: ['Next.js', 'Express', 'Bootstraps', 'MongoDb', 'Azure'],
    image: '/images/projects/Sevane/preview.jpg',
    images: [
      '/images/projects/Sevane/preview.jpg',
      '/images/projects/Sevane/preview2.jpg',
      '/images/projects/Sevane/preview3.jpg',
      '/images/projects/Sevane/preview4.jpg',
      '/images/projects/Sevane/preview5.jpg',
      '/images/projects/Sevane/preview6.jpg',
      '/images/projects/Sevane/preview7.jpg',
      '/images/projects/Sevane/preview8.jpg',
      '/images/projects/Sevane/preview9.jpg',

    ],
    year: '2024',
    client: 'Se Va Negocios SRL',
    results: [
      '300% aumento ventas online',
      '5,000+ productos gestionados',
      'Tiempo de carga: 1.2s',
    ],
    features: [
      'Catálogo de productos',
      'Checkout optimizado',
      'Gestión de inventario',
      'Panel de analytics',
    ],
  },
  {
    slug: 'sistema-facturacion',
    title: 'Sistema de Facturación',
    shortDescription: 'Sistema de facturación electrónica para PYMES.',
    description: 'Solución completa de facturación electrónica con integración DGII, generación de reportes y gestión de clientes.',
    category: 'Finanzas',
    tags: ['React', 'ASP.NET', 'SQL SERVER', 'PDF', '.NET Core', 'Entity Framework Core'],
    image: '/images/projects/Sistema-Facturacion/preview.jpg',
    images: [
      '/images/projects/Sistema-Facturacion/preview.jpg',
      '/images/projects/Sistema-Facturacion/preview2.jpg',
      '/images/projects/Sistema-Facturacion/preview3.jpg',
      '/images/projects/Sistema-Facturacion/preview4.jpg',
      '/images/projects/Sistema-Facturacion/preview5.jpg',
      '/images/projects/Sistema-Facturacion/preview6.jpg',
      '/images/projects/Sistema-Facturacion/preview7.jpg',
      '/images/projects/Sistema-Facturacion/preview8.jpg',
      '/images/projects/Sistema-Facturacion/preview9.jpg',

    ],
    year: '2023',
    client: 'Empresa Privada Dominicana',
    results: [
      '1,000+ facturas mensuales',
      '100% cumplimiento DGII',
      '40% ahorro tiempo facturación',
    ],
    features: [
      'Facturación electrónica',
      'Integración DGII',
      'Gestión de clientes',
      'Reportes contables',
      'Exportación PDF/Excel',
    ],
  },
  {
    slug: 'yiras-gourmet',
    title: 'Yiras Gourmet',
    shortDescription: 'Plataforma de pedidos online para restaurante.',
    description: 'Sistema de pedidos online con menú interactivo, carrito de compras y seguimiento de entregas en tiempo real.',
    category: 'Gastronomía',
    tags: ['React', 'Vite', 'Tailwind', 'Node.js'],
    image: '/images/projects/yiras-gourmet/preview.jpg',
    images: [
      '/images/projects/yiras-gourmet/preview.jpg',
      '/images/projects/yiras-gourmet/yiras1.jpg',
      '/images/projects/yiras-gourmet/yiras2.jpg',
      '/images/projects/yiras-gourmet/yiras3.jpg',
      '/images/projects/yiras-gourmet/yiras4.jpg',
      '/images/projects/yiras-gourmet/yiras5.jpg',
      '/images/projects/yiras-gourmet/yiras6.jpg',
      '/images/projects/yiras-gourmet/yiras7.jpg',
      '/images/projects/yiras-gourmet/yiras8.jpg'
    ],
    year: '2024',
    client: 'Restaurante Gourmet',
    results: [
      '200+ pedidos diarios',
      '4.8/5 rating web',
      '35% aumento ventas',
    ],
    features: [
      'Menú interactivo',
      'Programa de fidelidad',
      'Notificaciones push',
    ],
  },
] as const

// Team members
export const TEAM_MEMBERS = [
  {
    name: 'Samuel Guance Santi',
    role: 'CEO & Full Stack Developer',
    bio: 'Más de 4 años de experiencia en desarrollo web y liderazgo de equipos técnicos.',
    image: '/images/team/samuel.jpg',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
    skills: ['React', 'Node.js', 'Azure', 'ASP.NET', '.NET', 'BLAZOR WEBASSEMBLY/SERVER', 'MongoDb', 'SQL'],
  },
  {
    name: 'Alanna Ferreras',
    role: 'Graphic Designer',
    bio: 'Especialista en diseño y experiencias digitales.',
    image: '/images/team/alanna.jpg',
    social: {
      linkedin: '#',
      behance: '#',
      dribbble: '#',
    },
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'Canva', 'PowerPoint'],
  },
  {
    name: 'Jodrell Polanco',
    role: 'Founder & DataBase Developer',
    bio: 'Especializado en arquitecturas escalables y optimización de bases de datos.',
    image: '/images/team/jodrell.jpg',
    social: {
      linkedin: '#',
      github: '#',
    },
    skills: ['SQL', 'C#', 'Java', 'Figma', 'Flutter'],
  },
  {
    name: 'Fernando Cambero',
    role: 'Founder & UI/UX Developer',
    bio: 'Disenador UI/UX.',
    image: '/images/team/fernando.jpg',
    social: {
      linkedin: '#',
      github: '#',
    },
    skills: ['Python', 'HTML', 'CSS', 'JAVA'],
  },
  {
    name: 'Cesar Gil',
    role: 'Frontend Developer',
    bio: 'Desarrollador de frontend con un año de experiencia.',
    image: '/images/team/gil.jpg',
    social: {
      linkedin: '#',
      github: '#',
    },
    skills: ['React', 'Next', 'PostgreSQL ', 'Typescript'],
  },
  {
    name: 'Leonardo de la Cruz',
    role: 'Frontend Developer',
    bio: 'Desarrollador y disenador UI/UX, con grandes ideas.',
    image: '/images/team/leonardo.jpg',
    social: {
      github: '#',
    },
    skills: ['React', 'Astro', 'Javascript', 'CSS3', 'HTML'],
  },
  {
    name: 'Sebastian Ferreras',
    role: 'Junior Developer',
    bio: 'Junior en proceso.',
    image: '/images/team/seba.jpg',
    social: {
      linkedin: '#',
      github: '#',
    },
    skills: ['Html', 'CSS', 'Canva'],
  },
] as const

// FAQ data
export const FAQ_DATA = [
  {
    question: '¿Cuánto tiempo toma desarrollar un proyecto?',
    answer: 'El tiempo varía según la complejidad. Un sitio web básico toma 2-4 semanas, mientras que una plataforma completa puede tomar 2-6 meses. Proporcionamos un cronograma detallado en la cotización.',
  },
  {
    question: '¿Ofrecen mantenimiento post-lanzamiento?',
    answer: 'Sí, ofrecemos planes de mantenimiento mensuales que incluyen actualizaciones, corrección de bugs, hosting y soporte técnico 24/7.',
  },
  {
    question: '¿Trabajan con clientes internacionales?',
    answer: 'Absolutamente. Trabajamos con clientes de toda Latinoamérica y Estados Unidos. Nos adaptamos a diferentes zonas horarias para facilitar la comunicación.',
  },
  {
    question: '¿Qué tecnologías utilizan?',
    answer: 'Trabajamos con tecnologías modernas y probadas: React, Next.js, Node.js, React Native, Flutter, PostgreSQL, MongoDB, AWS, entre otras. Seleccionamos el stack según las necesidades del proyecto.',
  },
  {
    question: '¿Incluyen el diseño en sus servicios?',
    answer: 'Sí, contamos con diseñadores UI/UX que crean interfaces modernas y funcionales. El diseño está incluido en todos nuestros paquetes de desarrollo.',
  },
] as const

// Stats for homepage
export const STATS = [
  { value: '10+', label: 'Proyectos Completados' },
  { value: '100%', label: 'Satisfacción' },
  { value: '24/7', label: 'Soporte' },
  { value: '5', label: 'Años de Experiencia' },
] as const