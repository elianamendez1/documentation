---
title: Configuración de producto genérico
description: Documentación funcional del sistema de configuración de servicios dentro del producto genérico
---

# ⚙️ Configuración de producto genérico
<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo **Configuración de producto genérico** permite definir el comportamiento operativo, logístico y comercial de un servicio turístico previamente creado.

Este módulo actúa como una etapa intermedia entre la **definición base del producto** y la **publicación de sus contenidos, imágenes y tarifas**, permitiendo que la configuración avance de forma progresiva incluso cuando aún no se dispone de toda la información final.

La configuración varía dependiendo del tipo de servicio:
- **Servicio simple:** configuración directa.
- **Servicio compuesto:** requiere estructura previa y lógica de cálculo.
</div>

## 🎯 Descripción del módulo y alcance
### 1. Descripción del módulo

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo permite configurar los **detalles operativos del servicio**, incluyendo horarios, duración, puntos logísticos, estado y reglas de operación.

Este módulo actúa como un **puente entre la definición conceptual del producto y su ejecución real**, asegurando que todos los equipos (negociación, operaciones, ventas) trabajen con información consistente.
</div>

#### El módulo gestiona:

- Configuración de datos base del servicio
- Definición de rangos operativos (horarios)
- Configuración de puntos logísticos (inicio y fin)
- Control de estado del servicio
- Configuración dependiente del tipo de servicio (simple / compuesto)
- Persistencia progresiva de datos

---

### 2. Alcance

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo cubre todo el proceso necesario para que un servicio pueda ser:
- Cotizado
- Vendido
- Ejecutado en operación

#### Incluye:

- Configuración de servicios simples y compuestos
- Gestión de horarios operativos por día
- Configuración de duración manual o automática
- Integración con catálogos de mantenimiento
- Validaciones de negocio en tiempo real
- Flujo flexible entre configuración, Contenido / Imágenes y tarifas

El módulo no bloquea el avance hacia tarifas o Contenido / Imágenes, permitiendo que el usuario avance mientras completa la información.
</div>

<div style="border-left:4px solid #f59e0b; padding:12px 16px; background:#fef9c3; color:#000000; border-radius:8px; margin:16px 0;">

⚠️ <strong>Paso previo obligatorio: Configuración de ciudad:</strong>
<ul>
Antes de ingresar al módulo de Configuración del servicio, se debe completar un paso previo en el flujo:
</ul>

<ul>

##### 📌Datos definidos previamente:
- Lugares de operación (zonas turísticas del proveedor)
- Categoría del proveedor

##### 📌Categorías disponibles:
Este valor es definido en el módulo de mantenimiento y representa la clasificación del proveedor.
- PC – Privado  
- SIM – Compartido  
- SIC – Semi privado  
- N – Ninguno  

##### 📌Uso en sistema:
- Este valor NO se muestra directamente al usuario final
- Se utiliza como base para definir la modalidad del servicio en la siguiente pantalla

##### 📌Consideraciones:
- Estos datos provienen del módulo de mantenimiento
- Son utilizados para habilitar configuraciones dentro del servicio
- El perfil del servicio (en caso de ser simple) se define en este paso previo
</ul>
</div>

## 🔄 Flujos de usuario principales

<iframe 
 width="100%"
 height="600"
 style="border:1px solid #ddd"
 src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/board/yBt9rOQ7Gb1Mw6CFU8zDTt/AuroraBack---GDP--Gesti%C3%B3n-de-proveedores-y-Producto-?node-id=2528-2076&t=6qLD809ytvm21jk2-0">
</iframe>

El flujo presenta una **decisión clave basada en el tipo de servicio**.

### Flujo general

1. Seleccionar proveedor  
2. Seleccionar ciudad  
3. Definir tipo de servicio  
4. Decisión del sistema:
- **Servicio simple:**
  → Detalles del servicio  
  → Configuración  
  → Contenido / Imágenes (módulo paralelo, no secuencial)  
  → Planes tarifarios  
  → Fin  
- **Servicio compuesto:**
  → Estructura + calculadora  
  → Detalles del servicio  
  → Configuración  
  → Contenido / Imágenes (módulo paralelo, no secuencial)  
  → Planes tarifarios  
  → Fin  

⚠️ Importante:

El módulo de **Contenido / Imágenes** no forma parte de un flujo secuencial obligatorio.
- Puede completarse en cualquier momento
- Está desacoplado de Configuración
- No bloquea el avance hacia tarifas
- El módulo de **Contenido / Imágenes** agrupa: contenido funcional (operatividad, inclusiones, requisitos) y gestión de imágenes del servicio.

Ambos componentes comparten el mismo nivel dentro del flujo y no bloquean la configuración ni las tarifas.
Esto se representa en el flujo mediante líneas punteadas.

### 🔀 Decisión: Tipo de servicio

#### Servicio simple

Flujo:
Detalles del servicio → Configuración → Planes tarifarios → Fin  

Módulos paralelos:
- Contenido / Imágenes puede completarse en cualquier momento

Características:
- Tiene perfil
- Configuración directa
- Menor complejidad operativa

#### Servicio compuesto

Flujo:
Estructura + calculadora → Detalles del servicio → Configuración → Planes tarifarios → Fin  

Módulos paralelos:
- Contenido / Imágenes puede completarse en cualquier momento

Características:
- No maneja perfil operativo directo
- La lógica del servicio se define a través de su estructura y calculadora
- Requiere estructura previa
- Puede involucrar múltiples componentes

## ⚙️ Especificaciones funcionales

### 1. Pantalla: Detalles del servicio

<iframe
 width="100%"
 height="600"
 style="border:1px solid #ddd"
 src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/X32biyjjLLibBdWgj4mnvy/AuroraBack---Negociaciones-2?node-id=9781-130017">
</iframe>

### 🧩 Campos y comportamiento

#### 📌Nombre del servicio

- Visible pero bloqueado
- Proviene del proceso de marketing
- No editable una vez aprobado

Comportamiento:
- Solo editable en etapas previas
- Se muestra como referencia informativa

#### 📌Modalidad del servicio (Compartido / Privado / Semi privado)

Define cómo se opera el servicio desde el punto de vista del cliente final.
Valores visibles:
- Compartido (SIM)
- Privado (PC)
- Semi privado (SIC)

Origen del dato:
- Este campo NO es editable
- Se genera automáticamente a partir de la **categoría del proveedor** definida en el paso previo (configuración de ciudad)

Transformación de datos:

| Categoría (backend) | Modalidad (UI) |
|--------------------|---------------|
| PC | Privado |
| SIM | Compartido |
| SIC | Semi privado |
| N | No aplica |

Comportamiento:
- Campo solo informativo
- No editable por el usuario
- Siempre consistente con la categoría seleccionada previamente

Regla de sistema:
- Categoría = dato técnico (mantenimiento)
- Modalidad = dato funcional (UI / negocio)

Impacto en sistema:
- Define comportamiento en tarifas.
- Define lógica operativa del servicio.
- Controla visibilidad de campos (ej: Perfil).
- Influye en reglas de negocio posteriores.

#### 📌Subtipo

- Campo dependiente del tipo de proveedor
- Actualmente NO disponible en producción

Estado:
- Pendiente de definición por MAPI

Comportamiento esperado:
- Será dinámico
- Alimentado desde mantenimiento
- Variará según tipo de proveedor

⚠️ Restricción actual:
- No bloquea el flujo
- Puede no mostrarse en algunas implementaciones

#### 📌Perfil

- Solo aplica para servicios simples
- No disponible para servicios compuestos

Origen:
- Configurado en paso previo (modal de ciudad)

Regla de negocio:

| Tipo de servicio | Perfil |
|-----------------|--------|
| Simple | ✅ Visible |
| Compuesto | ❌ No aplica |

Comportamiento:
- El campo se oculta automáticamente para servicios compuestos
- Su valor proviene del paso previo (configuración de ciudad)

#### 📌Puntos de inicio y fin

Fuente:
- Catálogo de mantenimiento

Uso en sistema:

| Módulo | Uso |
|------|------|
| Negociación | Definición del punto |
| File | Asignación de direcciones |
| Operaciones | Determinación de sede |

Ejemplo:
- Inicio: Aeropuerto Lima
- Fin: Hotel Miraflores
→ Operación asignada a Lima

#### 📌Duración

Reglas:

| Caso | Comportamiento |
|------|--------------|
| Operador Lima Tours | La duración es automática |
| Otros proveedores | La duración es manual |

Consideraciones:
- Campo editable según proveedor
- La lógica automática está definida a nivel de negocio
- Puede evolucionar a cálculos dinámicos en el futuro

Comportamiento adicional:
- Si el proveedor cambia:
  - La lógica de duración se recalcula (manual / automática)
- En servicios compuestos:
  - La duración puede calcularse a partir de la estructura definida
  - La duración manual puede quedar deshabilitada dependiendo de la lógica configurada

#### 📌Rangos operativos (horarios)

Define:
- Horas en las que inicia el servicio

Comportamiento clave:
- Generalmente se configuran 2 horarios:
  - Mañana
  - Tarde
- Input inteligente:
  - Escribir "9" → autocompleta "09:00"
- Replica automática:
  - Ocurre solo la primera vez que se ingresa un horario
  - Se toma como base el primer día configurado (generalmente lunes)
  - Replica hacia los demás días habilitados
  - Si el usuario modifica manualmente un día, se rompe la replicación automática

Configuración:

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

La configuración de rangos operativos se realiza por día de la semana, permitiendo definir horarios de inicio y fin para cada uno. El sistema permite una configuración individual o replicada según el comportamiento del usuario. El día Domingo puede configurarse como no disponible.
</div>

Opciones de configuración:
- Aplicar 24 horas
- Configuración por días:
  - Todos los días
  - Personalizado

Comportamientos adicionales:
- Permite activar/desactivar días específicos
- Permite múltiples rangos por día (futuro)
- Domingo puede marcarse como “No disponible”

#### 📌Estado del servicio

Valor por defecto:
- Activo

Otros estados:
- Inactivo
- Suspendido

Reglas:

- Si cambia de activo:
  - Se habilita campo de motivo
  - Máximo 150 caracteres

### Comportamientos clave del sistema

#### 📌Guardado progresivo

- El sistema guarda automáticamente la información.
- No es necesario completar todos los campos.
- Permite avanzar entre módulos sin bloqueo.
- El servicio solo se considera completo al finalizar todo el flujo.

#### 📌Regla de no bloqueo

El sistema permite avanzar en el flujo sin completar todos los módulos:
- Se puede ir a Tarifas sin completar Contenido / Imágenes
- Se puede ir a Contenido / Imágenes sin completar Configuración
- Se puede navegar libremente entre módulos

Condición:
- El servicio no se considera completo hasta finalizar todo el flujo

Motivo:
- Permitir carga progresiva de información
- Adaptarse a escenarios reales de negocio

#### 📌Validaciones

- Campos obligatorios controlados
- Validaciones no bloqueantes

## 🔗 Integraciones con otros módulos

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo de **Configuración de producto genérico** se integra de manera directa con múltiples componentes del sistema, ya que la información definida aquí no solo se utiliza en esta etapa, sino que se propaga a lo largo de todo el ciclo de vida del servicio. 

Cada dato configurado como puntos de inicio, horarios, estado o nombre es consumido por otros módulos que dependen de esta información para ejecutar procesos críticos como la cotización, operación del servicio o asignación logística. Por esta razón, cualquier cambio realizado en este módulo tiene un impacto transversal, lo que hace necesario que la configuración sea precisa, consistente y alineada con las reglas de negocio definidas.
</div>

| Módulo | Uso |
|------|------|
| Mantenimiento | Catálogos (puntos, categorías, contenidos) |
| Proveedores | Origen de datos operativos |
| Tarifarios | Definición de precios |
| Files | Uso de direcciones y horarios |
| Operaciones | Asignación logística |
| Marketing | Definición de nombre |

## ⚙️ Configuraciones y permisos

### 📌Configuraciones

Dependen de:
- Catálogo de puntos (inicio / fin)
- Categorías de proveedor:  
  Este es el mismo dato que define la modalidad del servicio en la pantalla. 
  Valores:
  - PC (Privado)
  - SIM (Compartido)
  - SIC (Semi privado)
  - N (Ninguno)

  Uso en sistema:
  - Define modalidad del servicio
  - Controla configuraciones disponibles
  - Impacta en tarifas y operación

- Catálogo de contenidos:
  - Operatividad
  - Inclusiones
  - Requisitos

### 📌Permisos

| Rol | Permiso |
|------|--------|
| Product Owner | Configurar catálogos |
| Negociaciones | Configurar servicios |
| Operaciones | Consultar |
| Marketing | Define nombre |
| Administración | Modificar |

## 🎨 Diseño de interfaz

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

La interfaz está diseñada como un formulario estructurado con navegación lateral, permitiendo una configuración progresiva y clara.

Se prioriza la visibilidad de información clave y la facilidad de ingreso de datos operativos complejos.
</div>

### Estructura visual

#### 📌Sidebar izquierdo

Secciones base:
- Detalles del servicio
- Configuración
- Contenido / Imágenes
- Planes tarifarios

Secciones dinámicas:
- Estructura (solo servicios compuestos)
- Imágenes (extensión futura o configuración adicional)

Comportamiento:
- Las secciones visibles dependen del tipo de servicio

#### 📌Panel principal

Contiene:
- Formularios dinámicos
- Inputs estructurados
- Selects conectados a catálogos
- Validaciones en tiempo real

### Consideraciones UX

- Inputs inteligentes (autocompletado de horas)
- Feedback visual inmediato
- Formularios no bloqueantes
- Flujo flexible
- Separación clara de secciones
- Navegación lateral persistente

### Relación con módulo de Contenido

- Los horarios configurados en "rangos operativos" son utilizados en operatividad
- Las opciones de contenido provienen de mantenimiento:
  - Operatividad
  - Inclusiones
  - Requisitos

Restricción:
- El contenido NO bloquea la creación de tarifas
- El sistema permite avanzar sin completar Contenido / Imágenes

### Estados de interfaz

- Loading (carga de catálogos)
- Empty (sin configuración)
- Error (fallo en guardado)
- Success (guardado correcto)

### Navegación entre módulos

El usuario puede moverse libremente entre:
- Configuración
- Contenido / Imágenes
- Tarifas

Sin perder información.

### Conclusión UX

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El diseño permite manejar configuraciones complejas sin fricción, adaptándose a distintos tipos de servicio y permitiendo una experiencia fluida incluso cuando la información no está completa.

Esto es clave en escenarios reales donde los datos se completan progresivamente.
</div>