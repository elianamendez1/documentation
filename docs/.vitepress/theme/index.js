// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './styles/custom.css'

// Si tienes componentes Vue
import FigmaEmbed from './components/FigmaEmbed.vue'
import StatusBadge from './components/StatusBadge.vue'
import BusinessRule from './components/BusinessRule.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registra componentes Vue globales
    app.component('FigmaEmbed', FigmaEmbed),
    app.component('StatusBadge', StatusBadge),
    app.component('BusinessRule', BusinessRule)
  }
}



