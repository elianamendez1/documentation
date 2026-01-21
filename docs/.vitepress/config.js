import { defineConfig } from "vitepress"

export default defineConfig({
  // ========== CONFIGURACIÓN BÁSICA ==========
  title: "AURORA | Documentación viva",
  description: "Documentación centralizada para Product Owners, Desarrolladores y Diseñadores",
  base: "/",
  lang: "es-ES",

  // ========== METADATOS ==========
  head: [
    ["meta", { name: "theme-color", content: "#BD0D12" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["meta", {
      name: "description",
      content: "Repositorio de conocimiento para proyecto AURORA - Guías para POs, desarrolladores y diseñadores"
    }]
  ],

  // ========== TEMA ==========
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "AURORA",

    // ========== NAVEGACIÓN PRINCIPAL ==========
    nav: [
      { text: '🏠 Inicio', link: '/' },
      { text: '🎯 Guía PO', link: '/product-owner-guide/' },
      { text: '📦 Módulos', link: '/modules/' },  // ← Así está bien
      { text: '💻 Devs', link: '/developers/' },
      { text: '🎨 Diseñadores', link: '/designers/' },
      { text: '📚 Recursos', link: '/resources/' },
    ],

    // ========== SIDEBAR COMPLETA ==========
    sidebar: {
      // Sidebar para la página principal
      "/": [
        {
          text: '🚀 Introducción',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '¿Para qué es este repositorio?', link: '/src/introduction/' }
          ]
        },

        {
          text: "👥 Guía de Product Owner",
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'Descripción', link: '/product-owner-guide/' },
            { text: "📊 Recopilación de datos", link: "/product-owner-guide/data-collection" },
            { text: "🔄 Transformación a requerimientos 🚧", link: "/product-owner-guide/requirements" },

            { text: "🎨 Análisis y diseño UX 🚧", link: "/product-owner-guide/ux-analysis" },
            { text: "⚙️ Flujo de desarrollo 🚧", link: "/product-owner-guide/development-flow" },
            { text: "✅ Fases de pruebas 🚧", link: "/product-owner-guide/testing-phases" },
            { text: "📝 Guía de documentación 🚧", link: "/product-owner-guide/documentation-guide" }
          ]
        },
        {
          text: '📦 Módulos 🚧',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'Descripción de Módulos', link: '/modules/' },
            { 
              text: '🤝 Negociaciones 🚧', 
              link: '/modules/negotiations/',
              badge: { text: '🚧', variant: 'tip' }, 
            },
            { 
              text: '💰 Cotizaciones 🚧', 
              link: '/modules/quotations/',
              badge: { text: '🚧', variant: 'tip' }
            },
            { 
              text: '📁 Files 🚧', 
              link: '/modules/files/',
              badge: { text: '🚧', variant: 'tip' } 
            },
            { 
              text: '📊 Series 🚧', 
              link: '/modules/series/',
              badge: { text: '🚧', variant: 'tip' } 
            },
            { 
              text: '⚙️ Operaciones 🚧', 
              link: '/modules/operations/',
              badge: { text: '🚧', variant: 'tip' }
            },
            { 
              text: '📈 MASI 🚧', 
              link: '/modules/masi/',
              badge: { text: '🚧', variant: 'tip' } 
            }
          ]
        },
        /*{
          text: "👨‍💻 Para Desarrolladores",
          collapsed: true,
            items: [
              { text: "📋 Introducción", link: "/developers/" },
              { text: "🎨 Sistema de diseño", link: "/developers/design-system/" },
              { text: "⚙️ Especificaciones técnicas", link: "/developers/technical-specs" },
              { text: "🔧 Guía de contribución", link: "/developers/contribution-guide" }
            ]
        },
        {
          text: "🎨 Para Diseñadores",
          collapsed: true,
          items: [
            { text: "📋 Introducción al negocio", link: "/designers/" },
            { text: "🎨 Sistema de diseño", link: "/designers/design-system-intro" },
            { text: "🤝 Guía de colaboración", link: "/designers/collaboration-guide" },
            { text: "🔄 Workflow de diseño", link: "/designers/design-workflow" }
          ]
        },
        {
          text: "📊 Estado y Procesos",
          collapsed: true,
          items: [
            { text: "⚠️ Estado del Proyecto", link: "/estado/" },
            { text: "🔄 Procesos de Negocio", link: "/procesos/" },
            { text: "📋 Guías y Plantillas", link: "/guias/" }
          ]
        }*/
      ],
      '/src/introduction/': [
        {
          text: 'Introducción',
          items: [
            { text: '¿Para qué es este repositorio?', link: '/src/introduction/' }
          ]
        }
      ]
    },



    // ========== FOOTER ==========
    footer: {
      message: "AURORA Knowledge Repository",
      copyright: `© ${new Date().getFullYear()} AURORA`
    },

    // ========== BÚSQUEDA ==========
    search: {
      provider: "local",
      options: {
        placeholder: "Buscar en documentación..."
      }
    },

    // ========== SOCIAL LINKS ==========
    socialLinks: [
      { icon: "github", link: "https://github.com/aurora-project" },
      { icon: "figma", link: "https://figma.com/team/aurora" }
    ],

    // ========== DOC FOOTER ==========
    docFooter: {
      prev: "Página anterior",
      next: "Página siguiente"
    },

    // ========== LAST UPDATED ==========
    lastUpdated: {
      text: "Última actualización",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short"
      }
    }
  },

  // ========== MARKDOWN CONFIG ==========
  markdown: {
    lineNumbers: true
  }
})
