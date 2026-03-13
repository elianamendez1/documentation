---
layout: home

title: Aurora Way
titleTemplate: Documentación Viva!
editLink: true
lastUpdated: true

hero:
  name: Aurora Way
  text: El camino que seguimos
  tagline: Un solo lugar para POs, y próximamente para desarrolladores y diseñadores
  actions:
    - theme: brand
      text: Comenzar aquí
      link: /modules/introduction/
    - theme: alt
      text: Ver en GitHub
      link: https://github.com/tu-org/aurora-docs
  image:
    src: /hero-aurora.jpg
    alt: Aurora

features:
  - title: Módulos Técnicos
    details: Documentación detallada de cada funcionalidad del sistema.
    link: /modules/introduction/
    icon: 📦
  - title: Guía para POs
    details: Espacio dedicado para la gestión y edición de contenidos.
    link: /guia-po/
    icon: 📖
  - title: Roadmap
    details: Seguimiento de fases y próximas mejoras del proyecto.
    link: /historial
    icon: 🚀
---

## Acceso Rápido

<div class="quick-links">
  <a href="/modules/negotiations/" class="quick-link">
    <h3>📋 Recopilación de Datos</h3>
    <p>Formatos y herramientas para POs</p>
  </a>
  
  <a href="/developers/design-system/" class="quick-link">
    <h3>🎨 Sistema de Diseño</h3>
    <p>Componentes y estándares UI</p>
  </a>
  
  <a href="/modules/negotiations/" class="quick-link">
    <h3>🤝 Módulo Negociaciones</h3>
    <p>Documentación técnica completa</p>
  </a>
</div>

<style>
.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.quick-link {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.quick-link:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.quick-link h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-brand);
}

.quick-link p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
</style>