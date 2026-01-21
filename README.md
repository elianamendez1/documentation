# 🚀 Documentación Viva - Proyecto Aurora

Documentación colaborativa para Product Owners, desarrolladores y diseñadores del Proyecto Aurora.

## 🎯 Objetivo

Crear un **único punto de verdad** para todo el equipo, eliminando documentación dispersa y asegurando consistencia en el desarrollo.

## 📖 Contenido Actual

### ✅ Completado
- 🏠 **Landing Page:** Vista general con acceso rápido
- 🚀 **Introducción:** Propósito y uso de esta documentación
- 📊 **Recopilación de Datos:** Guía completa para POs

### 🚧 En Desarrollo
- 🎯 **Guía de Product Owner:** Flujo completo (6 secciones)
- 📦 **Módulos:** Documentación por funcionalidad (6 módulos)
- 💻 **Para Desarrolladores:** Especificaciones técnicas
- 🎨 **Para Diseñadores:** Guías de diseño
- 📚 **Recursos:** Plantillas y herramientas

## 🛠️ Desarrollo Local

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/aurora-documentation.git
cd aurora-documentation

# Instalar dependencias
npm install

# Servidor de desarrollo (hot reload)
npm run docs:dev

# Build para producción
npm run docs:build

# Previsualizar build local
npm run docs:preview
```
## 📁 Estructura del Proyecto
```text

docs/
├── .vitepress/           # Configuración VitePress
│   └── config.js        # Configuración principal
├── src/                 # Contenido principal
│   ├── index.md         # Landing page
│   └── introduction/    # Sección introducción
├── modules/             # Documentación por módulo
│   ├── negotiations/    # Módulo negociaciones
│   ├── quotations/      # Módulo cotizaciones
│   └── ...              # Otros módulos
├── product-owner-guide/ # Guía completa para POs
├── developers/          # Documentación técnica
├── designers/           # Guías de diseño
├── resources/           # Recursos adicionales
└── public/              # Assets públicos
```

## 🔗 Enlaces Importantes

    🌐 Documentación Online: https://tu-usuario.github.io/aurora-documentation/ (próximamente)

    💾 Repositorio: https://github.com/tu-usuario/aurora-documentation

    📋 Issues/Mejoras: Reportar problemas

    🔄 GitHub Actions: Estado del despliegue

## 🤝 Cómo Contribuir
Para Product Owners

    Documentar nuevos requerimientos en /product-owner-guide/

    Crear especificaciones en /modules/[nombre-modulo]/

    Actualizar criterios de aceptación

# Para Desarrolladores

    Mantener especificaciones técnicas actualizadas

    Documentar APIs y componentes

    Actualizar sistema de diseño

# Para Diseñadores

    Vincular diseños de Figma

    Documentar componentes UI

    Actualizar guías de estilo

# Proceso General

    Fork el repositorio

    Crear rama: git checkout -b feature/descripcion

    Commit cambios: git commit -m 'Add: descripción clara'

    Push: git push origin feature/descripcion

    Pull Request con descripción detallada

## 📋 Convenciones
Estructura de Archivos

    Usar kebab-case para nombres de archivos

    Cada módulo tiene su propia carpeta

    Incluir index.md en cada carpeta principal

# Escritura

    Usar lenguaje claro y directo

    Incluir ejemplos prácticos

    Mantener consistencia en tono

# Commits

    Prefijos: feat:, fix:, docs:, style:, refactor:

    Mensajes en español o inglés (ser consistente)

    Describir el "qué" y "por qué"

## 🚀 Próximos Pasos

    Configurar GitHub Pages para despliegue automático

    Completar sección de Transformación a Requerimientos

    Documentar primer módulo (Negociaciones)

    Integrar búsqueda con Algolia

    Agregar sistema de versionado

## 📞 Soporte

    Issues: Usar GitHub Issues para reportar problemas

    Discusiones: GitHub Discussions para preguntas

    Email: lma@limatours.com
