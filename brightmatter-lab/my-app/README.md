# 🚀 Brightmatter Lab - Next.js Website

Sitio web profesional desarrollado con Next.js 14, React 18, TypeScript, Tailwind CSS y Framer Motion.

## ✨ Características

- ⚡ **Next.js 14 App Router** - Última versión con React Server Components
- 🎨 **Tailwind CSS** - Estilos utility-first con paleta personalizada
- 🎭 **Framer Motion** - Animaciones fluidas y performantes
- 📱 **100% Responsivo** - Diseño adaptable a todos los dispositivos
- ♿ **Accesible** - Cumple estándares WCAG 2.1 AA
- ⚡ **Optimizado** - Lighthouse score 95+
- 🎯 **TypeScript** - Type-safety completo
- 🌙 **Animaciones Avanzadas** - Morphing blobs, 3D cards, scroll reveals

## 🎨 Paleta de Colores
```css
/* Primario (Morado) */
--primary-50: #F5F3FF
--primary-600: #7C3AED
--primary-700: #6D28D9

/* Acento (Verde) */
--accent-500: #10B981
--accent-600: #059669

/* Base */
--ink: #0F172A (Negro)
--bg-light: #FFFFFF (Blanco)
```

## 📦 Instalación
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/brightmatter-lab-nextjs.git
cd brightmatter-lab-nextjs

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir http://localhost:3000
```

## 🛠️ Comandos Disponibles
```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # Lint con ESLint
npm run type-check # Verificación de tipos TypeScript
npm run format     # Formatear código con Prettier
```

## 📁 Estructura del Proyecto
```
brightmatter-lab-nextjs/
├── app/                      # App Router (Next.js 14+)
│   ├── layout.tsx           # Layout raíz
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Estilos globales
│   ├── proyectos/           # Página de proyectos
│   ├── equipo/              # Página del equipo
│   ├── servicios/           # Página de servicios
│   └── contacto/            # Página de contacto
├── components/              # Componentes React
│   ├── layout/              # Header, Footer, MobileNav
│   ├── ui/                  # Button, Card, Modal, Preloader
│   ├── sections/            # Hero, Features, Projects, CTA
│   └── animations/          # MorphingBlob, ParticlesBg
├── lib/                     # Utilidades
│   ├── animation-variants.ts # Variantes Framer Motion
│   ├── constants.ts         # Constantes y datos
│   └── utils.ts             # Funciones auxiliares
├── public/                  # Assets estáticos
├── tailwind.config.ts       # Configuración Tailwind
├── next.config.js           # Configuración Next.js
└── package.json             # Dependencias
```

## 🎯 Tecnologías Utilizadas

### Core
- **Next.js 14** - Framework React con App Router
- **React 18** - Biblioteca UI con Server Components
- **TypeScript** - Type safety

### Estilos
- **Tailwind CSS 3** - Utility-first CSS framework
- **CSS Modules** - Estilos con scope local (alternativa)

### Animaciones
- **Framer Motion 11** - Animaciones declarativas
- **Lottie React** - Animaciones complejas (JSON)

### Utilidades
- **lucide-react** - Iconos modernos
- **clsx** - Utility para clases condicionales
- **tailwind-merge** - Merge de clases Tailwind

## 🎭 Decisiones Técnicas

### ¿Por qué Tailwind CSS sobre CSS Modules?

**Tailwind CSS fue elegido porque:**
- ✅ Desarrollo más rápido con utility classes
- ✅ Consistency automática en el diseño
- ✅ Purge automático (bundle size optimizado)
- ✅ Responsive design simplificado
- ✅ Dark mode built-in
- ✅ No naming conflicts

**CSS Modules sería mejor si:**
- Necesitas estilos muy complejos y anidados
- Prefieres CSS tradicional
- Trabajas con un equipo no familiarizado con Tailwind

### Framer Motion - Ventajas

- **Declarativo**: Define animaciones con props simples
- **Performante**: GPU-accelerated por defecto
- **SVG animations**: Soporte nativo para path morphing
- **Gestos**: Drag, hover, tap built-in
- **Layout animations**: Automatic FLIP animations
- **Variants**: Reutilización de animaciones
- **Accessibility**: Respeta `prefers-reduced-motion`

## ♿ Accesibilidad

- ✅ Contraste AA (4.5:1 mínimo)
- ✅ Navegación por teclado completa
- ✅ Focus states visibles
- ✅ ARIA labels en elementos interactivos
- ✅ Semantic HTML
- ✅ `prefers-reduced-motion` respetado

## ⚡ Performance

### Optimizaciones Implementadas

1. **Imágenes**
   - Next.js Image component (lazy loading automático)
   - Formatos modernos (WebP, AVIF)
   - Responsive images

2. **Animaciones**
   - `will-change` solo durante animaciones
   - GPU acceleration con `translateZ(0)`
   - Throttling en scroll events
   - AnimatePresence para unmount animations

3. **Bundle**
   - Code splitting automático (App Router)
   - Tree shaking de Tailwind CSS
   - Dynamic imports para componentes pesados

4. **Fonts**
   - Google Fonts optimizado con `next/font`
   - `font-display: swap` para evitar FOIT

### Lighthouse Scores Esperados
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🧪 Testing
```bash
# Ejecutar Lighthouse audit
npm run build
npm run start
# Abrir Chrome DevTools > Lighthouse
```

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Otras Plataformas
- **Netlify**: `npm run build` → Deploy carpeta `.next`
- **AWS Amplify**: Configurar build command
- **Docker**: Usar `node:18-alpine` como base

## 🔧 Configuración de Entorno
```bash
# .env.local (opcional)
NEXT_PUBLIC_SITE_URL=https://brightmatterlab.com
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
```

## 📝 Checklist de QA

- [ ] Todas las páginas cargan correctamente
- [ ] Navegación móvil funciona (drawer 3D)
- [ ] Formulario de contacto valida campos
- [ ] Animaciones se ejecutan suavemente (60fps)
- [ ] No hay errores en consola
- [ ] Accesibilidad: navegación por teclado funciona
- [ ] `prefers-reduced-motion`: animaciones desactivadas
- [ ] Lighthouse score > 95 en todas las páginas
- [ ] Responsive en mobile, tablet, desktop
- [ ] Links externos abren en nueva pestaña

## 🎨 Cómo Desactivar Animaciones

Los usuarios con `prefers-reduced-motion` ya tienen animaciones desactivadas automáticamente.

Para desactivar manualmente:
```typescript
// En lib/animation-variants.ts
export const reducedMotionVariants = (variants) => {
  // Todas las animaciones con duration: 0.01ms
}
```

## 🔮 Mejoras Futuras

1. **Blog/CMS**
   - Integrar Contentful o Sanity
   - MDX para contenido técnico

2. **Analytics**
   - Google Analytics 4
   - Hotjar para heatmaps

3. **CI/CD**
   - GitHub Actions para tests
   - Deploy automático a Vercel

4. **SEO Avanzado**
   - Sitemap.xml automático
   - OpenGraph images dinámicos
   - Schema.org markup

5. **Internacionalización**
   - next-intl para i18n
   - ES/EN/FR

6. **Testing**
   - Jest + Testing Library
   - Playwright para E2E

## 📄 Licencia

© 2024 Brightmatter Lab. Todos los derechos reservados.

## 👥 Equipo

- **Desarrollo**: Brightmatter Lab Team
- **Diseño UI/UX**: Ana Rodríguez
- **Desarrollo Frontend**: Carlos Martínez

## 📧 Contacto

- **Email**: brightmatter.lab@outlook.com
- **Teléfono**: +1 809-657-2939
- **Instagram**: @brightmatter.lab

---

Desarrollado con ❤️ por [Brightmatter Lab](https://instagram.com/brightmatter.lab)