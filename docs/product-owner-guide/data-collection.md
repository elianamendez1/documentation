---
title: Recopilación de Datos
description: Formatos, herramientas y técnicas para capturar necesidades de negocio
editLink: true
lastUpdated: true
---

# 📊 Recopilación de Datos

La recopilación efectiva de datos es el **primer paso crítico** en el ciclo de desarrollo. Documentar correctamente desde el inicio evita malentendidos y reproceso.

## 🎯 Objetivos de la Recopilación

1. **Entender el problema real** detrás de la solicitud
2. **Identificar a todos los stakeholders** involucrados
3. **Documentar el contexto completo** del negocio
4. **Capturar métricas y datos existentes**
5. **Establecer línea base** para medir éxito

## 🛠️ Formatos y Plantillas

### 1. Formato de Entrevista (Stakeholder Interview)

<div class="interview-template">
<h4># Entrevista con [Nombre/Rol]</h4>
<p><strong>Fecha:</strong> [DD/MM/AAAA]<br>
<strong>Participantes:</strong> [Lista]</p>

<h4>## Contexto Actual</h4>
<ul>
<li>[Descripción del problema/oportunidad]</li>
<li>[Proceso actual (si existe)]</li>
<li>[Pain points identificados]</li>
</ul>

<h4>## Necesidades Expresadas</h4>
<p><strong>1. Prioridad Alta:</strong></p>
<ul>
<li>[Necesidad 1]</li>
<li>[Necesidad 2]</li>
</ul>

<p><strong>2. Prioridad Media:</strong></p>
<ul>
<li>[Necesidad 3]</li>
</ul>

<p><strong>3. Deseos/Nice to have:</strong></p>
<ul>
<li>[Necesidad 4]</li>
</ul>

<h4>## Métricas Actuales</h4>
<table>
<tr><th>Métrica</th><th>Valor Actual</th><th>Meta Deseada</th></tr>
<tr><td>[Ej: Tiempo de proceso]</td><td>[X horas]</td><td>[Y horas]</td></tr>
<tr><td>[Ej: Tasa de error]</td><td>[X%]</td><td>[Y%]</td></tr>
</table>

<h4>## Restricciones Conocidas</h4>
<ul>
<li>[Técnicas, presupuesto, tiempo, etc.]</li>
</ul>
</div>

### 2. Formato de Observación (Shadowing)

<div class="observation-template">
<h4># Observación de Proceso</h4>
<p><strong>Proceso:</strong> [Nombre del proceso]<br>
<strong>Rol Observado:</strong> [Ej: Analista Comercial]<br>
<strong>Fecha:</strong> [DD/MM/AAAA]</p>

<h4>## Pasos Observados</h4>
<p><strong>1. Paso 1:</strong> [Descripción]</p>
<ul>
<li><strong>Tiempo estimado:</strong> [X minutos]</li>
<li><strong>Herramientas usadas:</strong> [Lista]</li>
<li><strong>Dificultades observadas:</strong> [Lista]</li>
</ul>

<p><strong>2. Paso 2:</strong> [Descripción]</p>
<ul>
<li>...</li>
</ul>

<h4>## Insights Clave</h4>
<ul>
<li>[Patrón repetitivo 1]</li>
<li>[Workaround observado 1]</li>
<li>[Oportunidad de automatización 1]</li>
</ul>

<h4>## Preguntas para Seguimiento</h4>
<ol>
<li>[Pregunta 1]</li>
<li>[Pregunta 2]</li>
</ol>
</div>

### 3. Plantilla de Requerimiento Inicial

<div class="excel-template">
<h4>📋 PLANTILLA - Requerimiento Inicial</h4>

<h4>## Información Básica</h4>
<ul>
<li><strong>ID:</strong> REQ-001</li>
<li><strong>Solicitante:</strong> [Nombre]</li>
<li><strong>Área:</strong> [Comercial/Operaciones/etc.]</li>
<li><strong>Fecha Solicitud:</strong> [DD/MM/AAAA]</li>
<li><strong>Prioridad:</strong> [Alta/Media/Baja]</li>
</ul>

<h4>## Descripción del Problema</h4>
<p>[2-3 párrafos describiendo el problema actual]</p>

<h4>## Impacto en el Negocio</h4>
<ul>
<li><strong>Usuarios afectados:</strong> [Número o roles]</li>
<li><strong>Frecuencia del problema:</strong> [Diario/Semanal/etc.]</li>
<li><strong>Costo estimado actual:</strong> [Si aplica]</li>
</ul>

<h4>## Solución Esperada</h4>
<p>[Descripción de lo que espera el solicitante]</p>

<h4>## Métricas de Éxito</h4>
<ol>
<li>[Métrica 1: Reducción del 50% en tiempo de proceso]</li>
<li>[Métrica 2: Eliminación de errores manuales]</li>
<li>[Métrica 3: Mejora en satisfacción de usuarios]</li>
</ol>

<h4>## Restricciones</h4>
<ul>
<li>[Presupuesto máximo]</li>
<li>[Fecha límite]</li>
<li>[Integraciones necesarias]</li>
</ul>
</div>

## 📝 Técnicas de Recopilación

### Entrevistas 1:1
**Cuándo usarla:** Para necesidades específicas de un rol  
**Duración recomendada:** 30-45 minutos  
**Checklist:**
- [ ] Preparar preguntas abiertas
- [ ] Grabar sesión (con permiso)
- [ ] Tomar notas estructuradas
- [ ] Enviar resumen por email

### Sesiones de Workshop
**Cuándo usarla:** Para procesos complejos con múltiples stakeholders  
**Duración recomendada:** 2-4 horas  
**Material necesario:**
- Pizarra virtual (Miro, FigJam)
- Templates predefinidos
- Cronómetro para timeboxing

### Análisis de Datos Existentes
**Fuentes comunes:**
- Logs del sistema actual
- Reportes de Excel/Google Sheets
- Tickets de soporte
- Grabaciones de sesiones de usuario (Hotjar, etc.)

## 🔍 Preguntas Clave por Tipo de Stakeholder

### Para Usuarios Finales
- "¿Qué es lo que más tiempo te toma en tu día a día?"
- "¿Qué workarounds o 'soluciones creativas' usas actualmente?"
- "Si tuvieras una varita mágica, ¿qué cambiarías?"

### Para Líderes de Área
- "¿Qué métricas usas para medir el éxito de esta área?"
- "¿Qué impacto tendría una mejora del X% en esta métrica?"
- "¿Qué restricciones presupuestarias/temporales tenemos?"

### Para Equipo Técnico
- "¿Qué limitaciones técnicas existen en el sistema actual?"
- "¿Qué integraciones serían más complejas?"
- "¿Qué datos históricos tenemos disponibles?"

## 📁 Estructura de Almacenamiento
```text
/documentacion-proyecto/
├── 01-recopilacion/
│ ├── entrevistas/
│ │ ├── 2024-01-15-juan-perez-comercial.md
│ │ └── 2024-01-16-maria-lopez-operaciones.md
│ ├── observaciones/
│ │ └── 2024-01-17-shadowing-analista.md
│ ├── datos-existente/
│ │ ├── reportes-excel/
│ │ └── logs-sistema/
│ └── requerimientos-iniciales/
│ └── REQ-001-proceso-cotizaciones.xlsx
```


## 🚫 Errores Comunes a Evitar

1. **Asumir** que entiendes el problema sin validar
2. **No documentar** el "por qué" detrás de cada necesidad
3. **Ignorar** a stakeholders secundarios
4. **No cuantificar** el impacto actual
5. **Saltarse** la observación del proceso real

## ✅ Checklist de Recopilación Completa

- [ ] Entrevistas con todos los roles principales realizadas
- [ ] Proceso actual documentado (diagrama o descripción)
- [ ] Métricas actuales cuantificadas
- [ ] Necesidades priorizadas (MoSCoW o similar)
- [ ] Restricciones identificadas (técnicas, presupuesto, tiempo)
- [ ] Datos históricos recolectados (si aplican)
- [ ] Resumen enviado a stakeholders para validación

## 📈 Siguiente Paso

Una vez completada la recopilación, procede a:  
**[Transformación a Requerimientos →](/product-owner-guide/requirements)**

---

<div class="resources">
<h3>📎 Recursos Adicionales</h3>

<h4>Plantillas Descargables</h4>
<ul>
<li><a href="#">Formato de Entrevista (Google Docs)</a></li>
<li><a href="#">Template de Observación (Notion)</a></li>
<li><a href="#">Checklist de Recopilación (PDF)</a></li>
</ul>

<h4>Herramientas Recomendadas</h4>
<ul>
<li><strong>Miro/FigJam:</strong> Para workshops colaborativos</li>
<li><strong>Otter.ai:</strong> Para transcripción de entrevistas</li>
<li><strong>Airtable:</strong> Para organización de hallazgos</li>
<li><strong>Loom:</strong> Para grabación de procesos</li>
</ul>

<h4>Lecturas Recomendadas</h4>
<ul>
<li><a href="#">The Mom Test - Rob Fitzpatrick</a></li>
<li><a href="#">Interviewing Users - Steve Portigal</a></li>
<li><a href="#">Escaping the Build Trap - Melissa Perri</a></li>
</ul>
</div>

<style>
.interview-template,
.observation-template,
.excel-template {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 0.9rem;
}

.interview-template h4,
.observation-template h4,
.excel-template h4 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.interview-template ul,
.observation-template ul,
.excel-template ul {
  padding-left: 1.5rem;
}

.interview-template table,
.observation-template table,
.excel-template table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.interview-template th,
.observation-template th,
.excel-template th,
.interview-template td,
.observation-template td,
.excel-template td {
  border: 1px solid var(--vp-c-border);
  padding: 0.5rem;
  text-align: left;
}

.resources {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.resources h3 {
  color: var(--vp-c-brand);
  margin-top: 0;
}

.resources h4 {
  margin-top: 1.5rem;
  color: var(--vp-c-text-1);
}
</style>