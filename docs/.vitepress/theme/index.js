// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './styles/custom.css'
import mermaid from 'mermaid'

// Si tienes componentes Vue
import FigmaEmbed from './components/FigmaEmbed.vue'
import StatusBadge from './components/StatusBadge.vue'
import BusinessRule from './components/BusinessRule.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      mermaid.initialize({ startOnLoad: false })
    }

    app.mixin({
      mounted() {
        setTimeout(async () => {
          const pres = document.querySelectorAll('pre')

          for (const pre of pres) {
            const codeEl = pre.querySelector('code')
            if (!codeEl) continue
            const code = codeEl.textContent.trim()

            // DETECTA SI ES MERMAID POR CONTENIDO
            if (!code.startsWith('graph') && !code.startsWith('flowchart')) continue

            const container = document.createElement('div')
            container.className = 'mermaid'

            const { svg } = await mermaid.render(
              'm-' + Math.random().toString(36).slice(2),
               code
            )

            container.innerHTML = svg

            pre.replaceWith(container)
            }

          }, 500)
        }
      })
    // Registra componentes Vue globales
    app.component('FigmaEmbed', FigmaEmbed),
    app.component('StatusBadge', StatusBadge),
    app.component('BusinessRule', BusinessRule)
  }
}



