# 🌟 Brightmatter Lab

![Brightmatter Lab](images/logo/brightmatter-logo.png)

**Desarrollo de Software Profesional** - Páginas web, apps móviles y plataformas empresariales de alta calidad.

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Páginas del Sitio](#-páginas-del-sitio)
- [Funcionalidades](#-funcionalidades)
- [Modo Oscuro](#-modo-oscuro)
- [Diseño Responsive](#-diseño-responsive)
- [Colores Corporativos](#-colores-corporativos)
- [Contacto](#-contacto)
- [Guía de Migración a React](#-guía-de-migración-a-react)

---

## 🎯 Descripción

**Brightmatter Lab** es un sitio web profesional que muestra los servicios de desarrollo de software, proyectos realizados y el equipo de trabajo. El sitio está construido con HTML5, CSS3 y JavaScript vanilla, ofreciendo una experiencia moderna, interactiva y totalmente responsive.

### Características Principales:
- ✅ Diseño moderno y profesional
- ✅ Modo oscuro con persistencia (localStorage)
- ✅ Animaciones fluidas y atractivas
- ✅ Totalmente responsive (breakpoint personalizado: 965px)
- ✅ Galería de proyectos con modal y lightbox
- ✅ Formulario de contacto funcional
- ✅ Optimizado para SEO
- ✅ Navegación intuitiva con menú hamburguesa en móvil

---

## ✨ Características

### 🎨 Diseño Visual
- Colores corporativos únicos (lila/magenta, lila clásico, aqua turquesa)
- Tipografía profesional (Inter)
- Iconos Font Awesome 6.0
- Animaciones CSS personalizadas
- Efectos hover y transiciones suaves

### 🌓 Modo Oscuro
- Toggle de tema claro/oscuro
- Persistencia en localStorage
- Transiciones suaves entre temas
- Iconos animados (sol/luna)

### 📱 Responsive Design
- Breakpoint personalizado: **965px**
- Menú hamburguesa en móvil
- Layout adaptable para todas las pantallas
- Imágenes optimizadas

### ⚡ Interactividad
- Animaciones de scroll con Intersection Observer
- Modal para detalles de proyectos
- Lightbox para galería de imágenes
- Carrusel de imágenes con navegación
- Validación de formularios

---

## 📁 Estructura del Proyecto

```
brightmatter-lab/
│
├── index.html                 # Página principal
├── MODO_OSCURO_README.md     # Documentación del modo oscuro
├── README.md                 # Este archivo
│
├── css/                      # Hojas de estilo
│   ├── styles.css            # Estilos principales
│   ├── animations.css        # Animaciones personalizadas
│   ├── responsive.css        # Media queries
│   ├── dark-mode.css         # Estilos del modo oscuro
│   ├── buttons.css           # Estilos de botones
│   ├── contact.css           # Estilos del formulario de contacto
│   ├── projects.css          # Estilos de la página de proyectos
│   ├── services.css          # Estilos de servicios
│   └── team.css              # Estilos del equipo
│
├── js/                       # Scripts JavaScript
│   ├── main.js               # Script principal
│   ├── dark-mode.js          # Funcionalidad modo oscuro
│   ├── animations.js         # Animaciones de scroll
│   ├── navigation.js         # Navegación y menú
│   ├── modal-carousel.js     # Modal y carrusel de proyectos
│   ├── projects.js           # Lógica de proyectos
│   ├── services.js           # Lógica de servicios
│   ├── contact.js            # Validación formulario
│   └── form-handler.js       # Manejo de envío de formulario
│
├── images/                   # Recursos visuales
│   ├── logo/                 # Logotipo de la empresa
│   ├── projects/             # Imágenes de proyectos
│   │   ├── Donate/
│   │   ├── eDUvISOR/
│   │   ├── Sevane/
│   │   ├── Sistema-Facturacion/
│   │   └── yiras-gourmet/
│   └── team/                 # Fotos del equipo
│
└── pages/                    # Páginas secundarias
    ├── projects.html         # Galería de proyectos
    ├── services.html         # Servicios ofrecidos
    ├── team.html             # Presentación del equipo
    └── contact.html          # Formulario de contacto
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos
  - CSS Grid
  - Flexbox
  - CSS Variables (Custom Properties)
  - Animations & Transitions
- **JavaScript (ES6+)** - Interactividad
  - Modules
  - Intersection Observer API
  - LocalStorage API
  - Fetch API

### Bibliotecas Externas
- **Font Awesome 6.0** - Iconos
- **Google Fonts (Inter)** - Tipografía

### Metodología CSS
- **BEM Naming Convention** - Nomenclatura de clases
- **Mobile First Approach** - Diseño responsive
- **CSS Modules Pattern** - Organización modular

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (opcional, para desarrollo)

### Opción 1: Apertura Directa
1. Clona el repositorio:
```bash
git clone https://github.com/samiluffy26/brightmatterlab.git
```

2. Abre `index.html` en tu navegador

### Opción 2: Servidor Local (Recomendado)

#### Con Python:
```bash
# Python 3
python -m http.server 8000

# Luego abre: http://localhost:8000
```

#### Con Node.js (live-server):
```bash
npm install -g live-server
live-server
```

#### Con VS Code:
- Instala la extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

---

## 📄 Páginas del Sitio

### 🏠 Inicio (`index.html`)
- **Hero Section**: Presentación principal con animaciones
- **Servicios Preview**: Tarjetas de 4 servicios principales
- **Proyectos Destacados**: Muestra de 2 proyectos principales
- **¿Por Qué Elegirnos?**: 4 características clave

### 📂 Proyectos (`pages/projects.html`)
- Galería de proyectos completados
- Sistema de filtrado por categoría
- Modal con detalles de cada proyecto
- Lightbox con carrusel de imágenes
- Tecnologías utilizadas en cada proyecto

**Proyectos Destacados:**
1. **Donate** - Plataforma de donaciones
2. **eDUvISOR** - Sistema educativo
3. **Sevane** - E-commerce
4. **Sistema de Facturación** - Software empresarial
5. **Yira's Gourmet** - Plataforma gastronómica

### 👥 Equipo (`pages/team.html`)
- Perfiles del equipo de desarrollo
- Fotos y roles de cada miembro
- Enlaces a redes sociales profesionales
- Especialidades y habilidades

### 🔧 Servicios (`pages/services.html`)
- **Desarrollo Web**: Sitios web modernos y responsive
- **Aplicaciones Móviles**: Apps nativas e híbridas
- **Plataformas Empresariales**: Sistemas a medida
- **Consultoría IT**: Asesoría tecnológica

### 📞 Contacto (`pages/contact.html`)
- Formulario de contacto funcional
- Validación en tiempo real
- Información de contacto:
  - 📧 Email: brightmatter.lab@outlook.com
  - 📱 WhatsApp: +1 809-657-2939
  - 📷 Instagram: @brightmatter.lab
- Mapa de ubicación (si aplica)

---

## 🎯 Funcionalidades

### 1. Sistema de Navegación
```javascript
// navigation.js
- Menú sticky con scroll
- Highlight de sección activa
- Smooth scroll a secciones
- Menú hamburguesa responsive
- Cierre automático al navegar
```

### 2. Modo Oscuro
```javascript
// dark-mode.js
- Toggle entre tema claro/oscuro
- Persistencia con localStorage
- Transiciones suaves
- Icono animado (sol/luna)
- Atributo [data-theme] en <html>
```

### 3. Animaciones de Scroll
```javascript
// animations.js
- Intersection Observer API
- Animaciones de entrada por scroll
- Clases CSS dinámicas
- Performance optimizado
```

### 4. Modal de Proyectos
```javascript
// modal-carousel.js
- Apertura de modal con detalles
- Carrusel de imágenes navegable
- Cierre con ESC o click fuera
- Navegación con teclado (←/→)
- Bloqueo de scroll del body
```

### 5. Lightbox de Imágenes
```javascript
// Dentro de modal-carousel.js
- Vista ampliada de imágenes
- Navegación prev/next
- Indicador de posición
- Cierre con ESC o botón
```

### 6. Validación de Formulario
```javascript
// contact.js
- Validación de campos en tiempo real
- Mensajes de error personalizados
- Validación de formato de email
- Validación de teléfono
- Prevención de envío vacío
```

---

## 🌓 Modo Oscuro

### Implementación

El modo oscuro utiliza CSS Variables y JavaScript para cambiar el tema:

```css
/* CSS Variables en dark-mode.css */
:root {
  --bg-color: #ffffff;
  --text-color: #1a1a1a;
  --primary-color: #e07bdf;
  --secondary-color: #d8c7fa;
  --accent-color: #93ebbd;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --primary-color: #e07bdf;
  --secondary-color: #d8c7fa;
  --accent-color: #93ebbd;
}
```

```javascript
// JavaScript (dark-mode.js)
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Toggle de tema
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
```

### Características del Modo Oscuro
- ✅ Persistencia con `localStorage`
- ✅ Sin parpadeo al cargar (FOUC prevention)
- ✅ Transiciones suaves (300ms)
- ✅ Contraste optimizado para legibilidad
- ✅ Iconos animados con rotación

📚 **Documentación completa**: Ver [MODO_OSCURO_README.md](MODO_OSCURO_README.md)

---

## 📱 Diseño Responsive

### Breakpoint Principal: **965px**

Este proyecto utiliza un breakpoint personalizado de **965px** (en lugar del estándar 768px) para optimizar la experiencia en tablets y pantallas medianas.

```css
/* Desktop First */
@media (max-width: 965px) {
  /* Estilos para tablets y móviles */
}

@media (max-width: 480px) {
  /* Estilos específicos para móviles pequeños */
}
```

### Adaptaciones por Dispositivo

#### 🖥️ Desktop (> 965px)
- Menú de navegación completo
- Grid de 4 columnas para servicios
- Proyectos en grid de 2-3 columnas
- Hero con animaciones complejas

#### 📱 Tablet (481px - 965px)
- Menú hamburguesa
- Grid de 2 columnas
- Imágenes adaptadas
- Navegación optimizada

#### 📱 Mobile (≤ 480px)
- Menú hamburguesa expandido
- Layout de 1 columna
- Imágenes full-width
- Botones táctiles amplios

---

## 🎨 Colores Corporativos

### Paleta Principal

```css
:root {
  /* Primarios */
  --primary-color: #e07bdf;      /* Lila/Magenta - Color principal */
  --secondary-color: #d8c7fa;    /* Lila Clásico - Color secundario */
  --accent-color: #93ebbd;       /* Aqua Turquesa - Acento */
  
  /* Fondos */
  --bg-color: #ffffff;           /* Fondo claro */
  --card-background: #f8f9fa;    /* Fondo de tarjetas */
  
  /* Textos */
  --text-color: #1a1a1a;         /* Texto principal */
  --text-light: #666666;         /* Texto secundario */
  
  /* Bordes */
  --border-color: #e0e0e0;       /* Bordes generales */
}
```

### Modo Oscuro

```css
[data-theme="dark"] {
  /* Fondos */
  --bg-color: #1a1a1a;           /* Fondo oscuro */
  --card-background: #2a2a2a;    /* Tarjetas oscuras */
  
  /* Textos */
  --text-color: #ffffff;         /* Texto claro */
  --text-light: #b3b3b3;         /* Texto secundario claro */
  
  /* Bordes */
  --border-color: #404040;       /* Bordes oscuros */
  
  /* Los colores corporativos se mantienen */
  --primary-color: #e07bdf;
  --secondary-color: #d8c7fa;
  --accent-color: #93ebbd;
}
```

### Uso de Colores

- **Primary (Lila/Magenta)**: Botones principales, enlaces, highlights
- **Secondary (Lila Clásico)**: Fondos de secciones, hover states
- **Accent (Aqua Turquesa)**: CTAs secundarios, iconos, badges

---

## 📞 Contacto

### Brightmatter Lab

- 🌐 **Website**: [brightmatterlab.com](https://samiluffy26.github.io/brightmatterlab/)
- 📧 **Email**: brightmatter.lab@outlook.com
- 📱 **WhatsApp**: +1 809-657-2939
- 📷 **Instagram**: [@brightmatter.lab](https://instagram.com/brightmatter.lab)

### Equipo de Desarrollo

Visita la página de [Equipo](pages/team.html) para conocer a nuestros desarrolladores.

---

## 🔄 Guía de Migración a React

¿Quieres migrar este proyecto a React + Vite?

📚 **Guía completa disponible**: Ver [MIGRACION_DETALLADA.md](MIGRACION_DETALLADA.md)

La guía incluye:
- ✅ Configuración de Vite + React
- ✅ Estructura de carpetas recomendada
- ✅ Migración de componentes
- ✅ Context API para tema
- ✅ React Router para navegación
- ✅ CSS Modules
- ✅ Hooks personalizados
- ✅ Optimizaciones de performance

---

## 📝 Scripts de Desarrollo

### Comandos Útiles

```bash
# Servidor local con Python
python -m http.server 8000

# Servidor con Node.js
npx http-server -p 8000

# Live Server con recarga automática
npx live-server
```

### Validación de Código

```bash
# Validar HTML (con validator.w3.org)
# Validar CSS (con jigsaw.w3.org)
# Lighthouse para performance y SEO
```

---

## 🎯 Mejores Prácticas Implementadas

### SEO
- ✅ Meta tags descriptivos
- ✅ Estructura semántica HTML5
- ✅ Alt text en todas las imágenes
- ✅ URLs amigables
- ✅ Sitemap (recomendado añadir)

### Performance
- ✅ CSS y JS minificados (para producción)
- ✅ Imágenes optimizadas
- ✅ Lazy loading de imágenes
- ✅ Caché de assets
- ✅ Intersection Observer para animaciones

### Accesibilidad
- ✅ Contraste de colores WCAG AA
- ✅ Navegación por teclado
- ✅ Atributos ARIA donde aplica
- ✅ Focus visible
- ✅ Textos alternativos

### Seguridad
- ✅ Validación de formularios
- ✅ Sanitización de inputs
- ✅ CSP headers (recomendado)
- ✅ HTTPS (para producción)

---

## 🐛 Solución de Problemas

### Problema: El modo oscuro no persiste
**Solución**: Verifica que `localStorage` esté habilitado en tu navegador.

### Problema: Animaciones no funcionan
**Solución**: Asegúrate de que `animations.js` esté cargado correctamente.

### Problema: Menú hamburguesa no abre
**Solución**: Verifica que `navigation.js` se ejecute después del DOM.

### Problema: Modal no cierra
**Solución**: Revisa la consola por errores de JavaScript.

---

## 📈 Roadmap Futuro

- [ ] Migración a React + TypeScript
- [ ] Backend con Node.js + Express
- [ ] Base de datos para proyectos dinámicos
- [ ] Panel de administración
- [ ] Blog integrado
- [ ] Multilanguaje (ES/EN)
- [ ] PWA (Progressive Web App)
- [ ] Optimización de imágenes con WebP
- [ ] Tests unitarios y E2E

---

## 📜 Licencia

Este proyecto es propiedad de **Brightmatter Lab**. Todos los derechos reservados.

---

## 🙏 Agradecimientos

- **Font Awesome** - Por los iconos
- **Google Fonts** - Por la tipografía Inter
- **Comunidad de desarrolladores** - Por la inspiración

---

## 📚 Recursos Adicionales

### Documentación
- [MODO_OSCURO_README.md](MODO_OSCURO_README.md) - Guía detallada del modo oscuro
- [MIGRACION_DETALLADA.md](MIGRACION_DETALLADA.md) - Guía de migración a React

### Enlaces Útiles
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/)

---

<div align="center">

**Hecho con ❤️ por Brightmatter Lab**

[⬆ Volver arriba](#-brightmatter-lab)

</div>
