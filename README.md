# Rick & Morty App - Prueba Técnica Frontend Junior

🚀 Aplicación web desarrollada con **Angular 17** que consume la API pública de Rick and Morty, permitiendo explorar personajes con búsqueda y paginación.

## 📑 Tabla de Contenidos

- [Características](#-características)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Decisiones Técnicas](#-decisiones-técnicas)
- [Mejoras Futuras de Performance](#-mejoras-futuras-de-performance)
- [Tests Unitarios](#testing)
- [Checklist Definition of Done](#-checklist-definition-of-done)
- [Trade-offs y Limitaciones](#-trade-offs-y-limitaciones)

## ✨ Características

- 🏘️ **Landing responsive** con hero section, features grid y formulario de contacto
- 👽 **Listado de personajes** consumiendo Rick and Morty API
- 🔍 **Búsqueda en tiempo real** por nombre de personaje
- 📝 **Paginación** usando next/prev de la API
- 🚨 **Estados de UI**: cargando, error con reintentar, sin resultados
- ♿ **Accesibilidad**: navegación por teclado, aria-labels, foco visible
- 📱 **Mobile-first** con diseño completamente responsive
- 📝 **TypeScript** con tipado completo de la API
- 🖼️ **Lazy-loading** de imágenes para mejor performance
- 🧪 **Tests unitarios** con Jasmine/Karma (34 tests, 100% passing)

## 🛠️ Instalación

### Prerequisitos

- Node.js >= 18.x
- npm >= 9.x

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/rodriharo/test-front-jr.git
cd test-front-jr

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

## 🚀 Uso

### Comandos disponibles

```bash
# Desarrollo
npm start          # Inicia servidor de desarrollo
npm run build      # Build de producción
ng lint       # Ejecuta ESLint
npm test           # Ejecuta tests unitarios
```

### Navegación

- **Home (/)**: Landing page con hero, features y formulario de contacto
- **Personajes (/characters)**: Lista de personajes con búsqueda y paginación

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                  # Servicios y modelos centrales
│   │   ├── models/            # Interfaces TypeScript (Character, ApiResponse)
│   │   └── services/          # RickMortyService
│   ├── features/              # Módulos de funcionalidades
│   │   ├── characters/        # Vista de personajes
│   │   │   ├── character-card/   # Tarjeta de personaje
│   │   │   ├── search-bar/       # Barra de búsqueda
│   │   │   ├── paginator/        # Componente de paginación
│   │   │   └── characters-list/  # Lista principal
│   │   ├── home/              # Landing page
│   │   │   ├── hero/            # Sección hero
│   │   │   └── features-grid/   # Grid de características
│   │   └── contact/           # Formulario de contacto
│   └── layout/                # Componentes de layout
│       ├── header/
│       ├── nav/
│       └── footer/
└── assets/                # Imágenes, fuentes, videos
```

## 🧠 Decisiones Técnicas

### Framework y Tooling

- **Angular 17 Standalone Components**: Elegido por su arquitectura moderna sin NgModules, mejor tree-shaking y simplicidad
- **TypeScript**: Tipado estricto para prevenir errores en tiempo de desarrollo
- **ESLint + Prettier**: Configurados para mantener consistencia en el código

### Arquitectura

- **Estructura por features**: Organización modular que facilita escalabilidad
- **Componentes standalone**: Reduces boilerplate y mejora el bundle size
- **Reactive programming**: RxJS para manejo de llamadas asíncronas a la API
- **Dependency Injection**: Uso de `inject()` en lugar de constructor injection (Angular 14+)

### Estilos

- **CSS puro**: Sin frameworks para demostrar fundamentos, cumplir con requisitos y control total
- **Mobile-first**: Media queries que escalan desde mobile (320px) hasta desktop
- **Custom properties CSS**: Variables para colores y espaciados reutilizables

### Performance

- **Lazy-loading**: Imágenes con `loading="lazy"` nativo de HTML
- **TrackBy**: En ngFor para evitar re-renders innecesarios
- **OnPush Change Detection** (futuro): No implementado aún por simplicidad

### Accesibilidad

- **Semántica HTML5**: header, nav, main, section, article, footer
- **ARIA attributes**: labels, roles, live regions para estados dinámicos
- **Navegación por teclado**: Tab order lógico y foco visible en todos los elementos interactivos
- **Contraste**: WCAG AA compliant con colores de texto y fondo

### Testing

Se implementaron **tests unitarios** con **Jasmine y Karma** para los componentes y servicios principales:

#### 📊 Cobertura de Tests

- ✅ **ButtonComponent** (13 tests)
  - Renderizado condicional de enlace/botón
  - Aplicación correcta de clases CSS
  - Manejo del estado disabled
  - Validación de aria-labels para accesibilidad

- ✅ **RickMortyService** (9 tests)
  - Consumo correcto de la API
  - Búsqueda de personajes por nombre
  - Paginación usando URLs next/prev
  - Manejo de errores HTTP (404, 500)

- ✅ **ContactFormComponent** (12 tests)
  - Validaciones de formulario (required, minLength, email)
  - Envío solo con formulario válido
  - Reseteo correcto después de enviar
  - Manejo de estados (submitted, pristine)

**Resultado:** 34/34 tests pasando (100% ✅)

#### Ejecutar tests

```bash
# Todos los tests
npm test

# Solo los tests implementados
npm test -- --include='**/button.component.spec.ts' --include='**/rick-morty.service.spec.ts' --include='**/contact-form.component.spec.ts'

# Tests en modo watch
npm test -- --watch
```

## ⚡ Mejoras Futuras de Performance

1. **Code-splitting por rutas**: Implementar lazy-loading de módulos con `loadChildren` para reducir el bundle inicial

2. **Caché de respuestas HTTP**: Implementar un interceptor para cachear llamadas a la API y evitar requests duplicados

3. **Virtual scrolling**: Usar `@angular/cdk/scrolling` para renderizar solo elementos visibles en listas largas

4. **OnPush Change Detection**: Cambiar estrategia de detección de cambios para reducir ciclos innecesarios

5. **Service Worker**: Implementar PWA con caché offline de assets estáticos y respuestas de API

## ✅ Checklist Definition of Done

- [x] UI responsive funciona correctamente en mobile (320px), tablet (768px) y desktop (1024px+)
- [x] Consumo de API con búsqueda por nombre funcional
- [x] Paginación usando next/prev de la API
- [x] Estados de UI implementados: loading, error, empty state
- [x] Lazy-loading de imágenes habilitado
- [x] Formulario de contacto con validaciones del lado del cliente
- [x] Accesibilidad: tab order, aria-labels, foco visible verificados
- [x] TypeScript: sin errores de compilación
- [x] ESLint: sin errores ni warnings
- [x] Build de producción exitoso (`npm run build`)
- [x] **Tests unitarios**: 34/34 tests pasando (ButtonComponent, RickMortyService, ContactFormComponent)
- [x] Testing manual completado en Chrome, Firefox y Safari
- [x] README con instrucciones y decisiones técnicas
- [x] Commits con Conventional Commits

## ⚠️ Trade-offs y Limitaciones

### Trade-offs

1. **CSS puro vs Framework CSS**: Se optó por CSS puro para demostrar fundamentos, pero en un proyecto real consideraría Tailwind CSS por velocidad de desarrollo

2. **Componentes standalone vs NgModules**: Los componentes standalone simplifican el código pero requieren Angular 14+, limitando compatibilidad con proyectos legacy

3. **Client-side rendering**: La app es CSR pura. Para SEO y performance inicial, SSR con Angular Universal sería ideal

### Limitaciones Conocidas

1. **Búsqueda**: La API de Rick and Morty no soporta búsqueda parcial (fuzzy search), solo coincidencias exactas de substring

2. **Paginación**: Solo permite next/prev, no salto directo a página específica (limitación de la API)

3. **Formulario de contacto**: No envía datos reales, solo validaciones client-side y console.log



