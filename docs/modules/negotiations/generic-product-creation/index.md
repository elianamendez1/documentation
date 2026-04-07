---
title: Creación de producto genérico
description: Documentación funcional del sistema de creación de productos genéricos
---

# 🧩 Creación de producto genérico

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo de **Creación de producto genérico** permite definir la estructura base de los servicios turísticos dentro del sistema, desacoplándolos de proveedores específicos.

Este enfoque permite estandarizar productos, facilitar la negociación con múltiples proveedores y reutilizar configuraciones en distintos contextos comerciales.

El flujo está diseñado como un proceso guiado en dos etapas: 
- Configuración base del producto,
- Asignación de proveedores.

</div>

## 🎯 Descripción del módulo y alcance

### 1. Descripción del módulo

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo permite:

- Crear productos sin proveedor inicial.
- Validar datos en tiempo real.
- Sugerir información inteligente.
- Asignar múltiples proveedores posteriormente.
- Gestionar estados de proveedores.
- Flujo con decisiones condicionadas (validaciones que pueden permitir continuar bajo advertencia)
- Confirmación explícita antes de la asignación final de proveedores
</div>

### 2. Alcance

Incluye:

- Creación de productos genéricos.
- Validación en tiempo real (código y nombre).
- Sugerencias automáticas.
- Flujo guiado por pasos.
- Asignación de proveedores.
- Filtros dinámicos.
- Gestión de estados de proveedores.

## 🔄 Flujos de usuario principales

<iframe 
 width="100%"
 height="600"
 style="border:1px solid #ddd"
 src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/board/yBt9rOQ7Gb1Mw6CFU8zDTt/AuroraBack---GDP--Gestión-de-proveedores-y-Producto-?node-id=2391-3070">
</iframe>

El flujo consta de **dos pasos principales**:

### Paso 1 — Configuración base del producto

El usuario registra la información principal del producto.

#### Flujo real:

1. Seleccionar tipo de servicio  
2. Ingresar código genérico  
3. Validación en tiempo real  
4. Decisión del sistema:
- ✅ Si no existe → continúa  
- ⚠️ Si existe:
  - Mostrar alerta
  - Sugerir códigos disponibles
  - Permitir continuar o corregir
5. Ingresar de nombre genérico  
6. Validación en tiempo real  
7. Decisión del sistema:
- Detectar similitud
- Mostrar sugerencias
- Permitir continuar bajo advertencia
8. Guardar datos  
9. Habilitación del paso de proveedores
10. Habilitar botón “Continuar” hacia paso de proveedores 

#### 📌 Tipo de servicio

Se obtiene desde la tabla `service_types`.

| Tipo | Código | Subtipos |
|------|--------|----------|
| Alimentación | AL | Desayuno (`breakfast`), Almuerzo (`lunch`), Cena (`dinner`) |
| Actividades | AT | - |
| Excursiones | EX | Full day (`full_day- fd`), Half day (`half_day - hd`), Mid day (`mid_day - md`) |
| Traslados | TF | - |
| Asistencia | AS | - |
| Multidías (Paquetes) | PQ | - |
| Entradas | EN | Evento (`event`), Show (`show`), Atractivo turístico (`tourist_attraction`) |
| Guía | GU | Guía (`guide`), Trasladista(`transfer`), TC (`tc`) |
| Cruceros | CR | - |
| Transporte | TP | Ruta turística (`tourist_route`), Maletero (`porter`) |
| Ticket Bus | TB | Interprovincial |
| Ticket Aéreo | TA | Doméstico, Local, Internacional |
| Ticket Tren | TT | - |
| Otros | OT | - |

#### 📌 Código genérico

<div style="text-align: justify;">

El código del producto es **alfanumérico** y sigue una estructura definida por negocio.
</div>

<div style="border-left:4px solid #f59e0b; padding:12px 16px; background:#fef9c3; color:#000000; border-radius:8px; margin:16px 0;">

⚠️ <strong>PENDIENTE:</strong>
<ul>
<li>Definir estructura de codificación</li>
<li>Códigos serán definidos por negocio (Mapi / Mafer)</li>
<li>Generación de códigos consecutivos (6 espacios inicialmente)</li>
<li>Documentar reglas en Figma</li>
</ul>
</div>

- El sistema valida la unicidad del código
- La estructura será definida por negocio
- Se deberá soportar:
  - Generación manual
  - Sugerencias automáticas futuras

Comportamiento:
- Input manual
- Validación en tiempo real
- Detección de duplicados
- Flujo con decisión:

| Caso | Acción |
|------|--------|
| Código válido | Continúa |
| Código existente | Mostrar alerta + sugerencias |

#### 📌 Nombre genérico

<div style="text-align: justify;">

El sistema valida coincidencias con nombres existentes para evitar duplicidad.
</div>

Comportamiento:
- Validación en tiempo real.
- Comparación por similitud (no solo exacta).
- Sugerencias dinámicas.
- Flujo:

| Caso | Acción |
|------|--------|
| Nombre único | Continúa |
| Nombre similar | Mostrar alerta + sugerencias |

#### 📊 Estado del formulario

El proceso de creación del producto maneja un indicador visual de avance.

#### Indicador de progreso

- Se muestra un porcentaje de avance del formulario:
  - **0%** → sin datos
  - **50%** → información base válida y guardada
  - **100%** → producto completo con proveedores asignados y confirmados.
- Se actualiza dinámicamente según el progreso del usuario.
- Adicionalmente, se muestra un indicador de campos completados:
  - Ejemplo: **“0 de 3 completados”**
- Este indicador guía al usuario sobre los campos obligatorios pendientes

#### Comportamiento:

- El botón **"Guardar datos"** se habilita solo cuando los campos obligatorios están completos.
- El usuario no puede avanzar a la asignación de proveedores (Paso 2) si el formulario no está validado.

#### ✏️ Edición de información base

- El usuario puede editar la información general del producto desde el paso de asignación de proveedores.
- Esta acción se realiza mediante el botón **“Editar”** en la sección de información general.

Comportamiento:
- Mantiene la información previamente ingresada.
- Revalida los campos modificados.
- No pierde los proveedores ya seleccionados.
- El botón “Editar” está visible en la cabecera del bloque de información general.
- No interrumpe el flujo de asignación.

### Paso 2 — Asignación de proveedores

El usuario asigna proveedores al producto creado mediante un flujo interactivo basado en filtros y selección múltiple.

#### 📌 Flujo de asignación

1. Cargar lista de proveedores  
2. Aplicar filtros:
   - Tipo de proveedor
   - Ubicación (ciudad/departamento)
3. Decisión del sistema:
   - ¿Existen proveedores?
     - ✅ Sí → mostrar listado
     - ❌ No → mostrar empty state
4. Búsqueda adicional:
   - Por nombre
   - Por código
5. Acción intermedia obligatoria:
   - Click en botón **“Continuar”**
6. Selección de proveedores:
   - Selección múltiple (checkbox)
   - Asignación individual (botón “Asignar”)
7. Vista previa de selección:
   - Lista de proveedores seleccionados
8. Confirmación:
   - Usuario confirma asignación
9. Guardar producto

#### 📌 Filtros disponibles

- Tipo de proveedor  
- Ciudad / Departamento (state_id)
Fuente de datos:
- Tabla `supplier_place_operations`
- Tabla `suppliers`

#### 📌 Búsqueda de proveedores

- Permite buscar proveedores por:
  - Nombre
  - Código
- Funciona en tiempo real
- Se combina con los filtros aplicados

#### 📌 Comportamiento de filtros

- Los filtros son **combinables**
- Se aplican de forma **dinámica (sin recarga)**
- Permiten refinar resultados antes de seleccionar proveedores

#### 📌 Listado de proveedores (panel izquierdo)

Incluye:
- Checkbox individual
- Checkbox “Seleccionar todos”
- Código de proveedor
- Nombre
- Estado
- Botón **Asignar**

#### 📌 Métodos de asignación

El sistema permite dos formas de asignar proveedores:
- Selección mediante checkbox (individual o múltiple)
- Botón **“Asignar”** por cada proveedor (acción directa)

#### 📌 Vista de proveedores asignados (panel derecho)

Incluye:
- Lista de proveedores seleccionados
- Estado inicial vacío
- Actualización en tiempo real

Comportamiento:
- Permite **desasignar proveedores**
- Refleja selección múltiple
- Sincronización automática con la lista principal
- Mensaje inicial:
  - “Aún no has seleccionado proveedores”
- Se muestra como estado vacío del panel

#### 📌 Vista previa de selección (según flujo)

Antes de confirmar la asignación, el sistema muestra una vista previa de los proveedores seleccionados.

Incluye:
- Lista consolidada de proveedores elegidos
- Validación visual antes del guardado final

Comportamiento:
- Permite revisar antes de confirmar
- Reduce errores de asignación

#### 📌 Empty state (proveedores asignados)

- Cuando no hay proveedores seleccionados:
  - Mostrar mensaje: **“Aún no has seleccionado proveedores”**

#### 📌 Empty state (listado de proveedores)

Cuando no existen resultados en la búsqueda o filtros aplicados:
- Mostrar mensaje:
  - “No se encontraron proveedores”
- Mantener visibles:
  - Filtros
  - Buscador
- Permitir continuar en el flujo mediante el botón “Continuar”

#### 📌 Lógica de selección

- Selección individual y múltiple
- Persistencia de selección al aplicar filtros
- Acciones masivas (seleccionar todos)

#### 📌 Estados de proveedor

| Estado | Visible en listado | Seleccionable | Notas |
|--------|------------------|--------------|------|
| Activo | Sí | Sí | Estado normal |
| En evaluación | Sí | Sí | Estado por defecto |
| Inactivo | No (por defecto) | No | Visible solo con filtro |
| Suspendido | No | No | Solo visible en backend/finanzas |

#### 📌 Comportamiento en UI

- Los proveedores inactivos:
  - No aparecen por defecto
  - Se muestran solo si el usuario activa el filtro
- Los proveedores suspendidos:
  - No aparecen en frontend
  - Se mantienen para procesos internos
- El estado impacta:
  - Visibilidad
  - Disponibilidad de selección

#### 📌 Reglas de visualización

- Proveedores **inactivos no se muestran por defecto**
- Se visualizan solo al activar filtro
- Proveedores **suspendidos no aparecen en frontend**
- Estados afectan disponibilidad en selección
- Los estados impactan directamente en:
  - Visibilidad en listas
  - Disponibilidad para asignación
  
#### 📌 Consideraciones de negocio

- Validar comportamiento cuando proveedor cambia de estado.
- Confirmar reglas con negocio (Mapi / Yamir).
- Evaluar impacto en facturación y reportes.

#### 📌 Acciones finales

1. Confirmar asignación de proveedores  
2. Validar información final  
3. Guardar producto  
4. Mostrar estado “Producto creado”  

#### 📌 Confirmación de asignación

Antes de guardar el producto:
- El sistema muestra un resumen de proveedores seleccionados
- El usuario debe confirmar explícitamente
Validaciones:
- Puede existir producto sin proveedores (pendiente negocio)
- Si hay selección:
  → Confirmación obligatoria
Acción:
- Confirmar → guarda asignación
- Cancelar → regresa a selección

#### 📌 Botón “Continuar”

- Es un paso obligatorio del flujo (según Figma)
- Aparece después de aplicar filtros o realizar búsqueda

Comportamiento:
- Permite pasar de la fase de búsqueda a la selección
- No depende de que existan resultados
- Funciona como transición lógica del flujo

Importante:
- No asigna proveedores
- Solo habilita la siguiente etapa (selección)

## ⚙️ Especificaciones funcionales

### 1. Validaciones

#### 🔴 Validaciones en tiempo real

El sistema valida los datos mientras el usuario escribe:

**Código genérico:**
- Validación de unicidad
- Validación de formato (alfanumérico)
- Mensajes:
  - "Código disponible"
  - "Código ya existe"

**Nombre genérico:**
- Detección de similitud con productos existentes
- Sugerencias automáticas
- Mensajes:
  - "Nombre similar encontrado"
  - "Este producto ya existe"

#### 🟡 Comportamiento ante errores

- Se muestran alertas visuales en el campo
- No bloquea la escritura
- Puede permitir continuar bajo advertencia (según negocio)

#### 🔵 Comportamiento UX (alertas y decisiones)

- El sistema muestra alertas sin bloquear el flujo
- Puede sugerir alternativas (códigos o nombres)
- El usuario puede:
  - Corregir
  - Continuar bajo advertencia

Esto aplica tanto para código como para nombre genérico.

#### 🟢 Validación final

Antes de guardar:
- Todos los campos obligatorios completos
- Sin errores críticos

#### 🟣 Estados de interfaz (UI)

El sistema debe contemplar los siguientes estados visuales:
- **Loading:** carga de proveedores  
  - Se activa al ingresar al paso 2 (Asignación de proveedores)  
  - Se muestra un loader mientras se consultan las tablas:  
    - `suppliers`  
    - `supplier_place_operations`
- **Empty state:** sin resultados en la búsqueda  
- **Error state:** fallo en carga de datos  
- **Success state:** producto creado correctamente

#### 🔵 Flujo de decisiones del sistema

El sistema utiliza validaciones con decisiones tipo:
- Sí → continúa flujo
- No → muestra alerta y permite corrección o continuar
Esto aplica para:
- Código genérico
- Nombre genérico

### 🔵 Flujo de interacción (según Figma)

El proceso de asignación de proveedores está dividido en **tres fases claras**:

1. **Fase de búsqueda**
   - Aplicación de filtros
   - Búsqueda por texto
   - Visualización de resultados

2. **Fase de transición**
   - Uso obligatorio del botón **“Continuar”**
   - No depende de resultados
   - Define cambio de estado en la UI

3. **Fase de selección**
   - Selección múltiple o individual
   - Vista previa
   - Confirmación final

Este comportamiento asegura:
- Separación clara de responsabilidades
- Mejor control del usuario
- Menor probabilidad de error

### 2. Comportamientos del sistema

- Validación en tiempo real
- Sugerencias inteligentes
- Persistencia parcial (guardado progresivo)
- Manejo de estados de proveedores

### 3. Listado de productos genéricos

Incluye:
- Filtros tipo Excel
- Búsqueda avanzada
- Visualización por estado
- Edición de productos existentes

## 🔗 Integraciones con otros módulos

| Módulo | Uso |
|------|------|
| Proveedores | Fuente de datos |
| Tarifarios | Asociación de costos |
| Cotizaciones | Uso en armado de propuestas |
| Operaciones | Ejecución de servicios |

## ⚙️ Configuraciones y permisos

### Configuraciones

- Tipos de servicio (`service_types`)
- Tipos de proveedor
- Ubicaciones (departamentos)

### Permisos

| Rol | Permiso |
|----|--------|
| Product Owner | Crear y editar productos |
| Operaciones | Consultar |
| Administración | Modificar |
| Finanzas | Visualizar |

## 🎨 Diseño de interfaz

<div style="text-align: justify;">

La interfaz está diseñada para guiar al usuario en un flujo progresivo, asegurando que primero se defina correctamente el producto antes de asociarlo a proveedores.
</div>

### Consideraciones UX

- Feedback inmediato en inputs
- Alertas no bloqueantes
- Flujo guiado paso a paso
- Separación visual en dos paneles (disponibles / seleccionados)
- Interacción dinámica sin recargas

### Pantalla: Creación de producto

<iframe
  width="100%"
  height="600"
  style="border:1px solid #ddd"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/X32biyjjLLibBdWgj4mnvy/AuroraBack---GDP--Gesti%C3%B3n-de-proveedores-y-Producto-?node-id=9763-39745&t=VRNSllnxUGu84key-0">
</iframe>

### Pantalla: Flujo completo

<iframe
 width="100%"
 height="600"
 style="border:1px solid #ddd"
 src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/X32biyjjLLibBdWgj4mnvy/AuroraBack---Negociaciones-2?node-id=9680-9553">
</iframe>

### Composición de la pantalla de proveedores

La interfaz se divide en tres zonas:
1. Zona superior:
   - Filtros (tipo de proveedor, ubicación)
   - Buscador
2. Panel izquierdo:
   - Listado de proveedores
   - Checkboxes
   - Botón "Asignar"
3. Panel derecho:
   - Proveedores seleccionados
   - Vista en tiempo real
4. Acciones:
   - Botón “Continuar”
   - Confirmación final