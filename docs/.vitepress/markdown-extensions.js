// docs/.vitepress/markdown-extensions.js
// Alternativa a markdown-it-container sin require dinámico

export function customMarkdownContainers(md) {
  // Containers simples usando HTML directo
  const defaultRender = md.renderer.rules.fence;
  
  md.renderer.rules.fence = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    
    // Detectar bloques especiales
    if (token.info === 'warning') {
      return `<div class="custom-container warning">
                <p class="custom-container-title">⚠️ ADVERTENCIA</p>
                <div>${md.utils.escapeHtml(token.content)}</div>
              </div>`;
    }
    
    if (token.info === 'assumption') {
      return `<div class="custom-container assumption">
                <p class="custom-container-title">❓ SUPOSICIÓN</p>
                <div>${md.utils.escapeHtml(token.content)}</div>
              </div>`;
    }
    
    if (token.info === 'info') {
      return `<div class="custom-container info">
                <p class="custom-container-title">💡 INFORMACIÓN</p>
                <div>${md.utils.escapeHtml(token.content)}</div>
              </div>`;
    }
    
    // Comportamiento por defecto
    return defaultRender(tokens, idx, options, env, self);
  };
}
