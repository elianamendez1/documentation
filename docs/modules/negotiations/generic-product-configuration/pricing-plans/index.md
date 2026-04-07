---
title: Planes tarifarios
description: Configuración funcional de tarifas dentro del producto genérico
---

# 💰 Planes tarifarios
<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo de **Planes tarifarios** permite definir la lógica económica de un servicio turístico, incluyendo la estructura de tarifas, impuestos, segmentación, vigencias, y reglas comerciales.

Este módulo traduce la configuración operativa del servicio en **valores monetarios vendibles**, asegurando consistencia entre negociación, cotización y operación.

Las tarifas se construyen en base a:
- Fechas de viaje
- Tipo de tarifa
- Impuestos
- Staff (opcional)
- Políticas comerciales
</div>

📌 Regla obligatoria del sistema:

Toda configuración de fechas del servicio debe realizarse exclusivamente en el módulo de Planes tarifarios. No está permitido definir en otros módulos del sistema:
- Temporadas
- Festivos
- Fechas comerciales

## 🎯 Descripción del módulo y alcance

### 1. Descripción del módulo

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo permite configurar tarifas de manera estructurada en **4 pasos progresivos**, asegurando que cada componente del precio esté correctamente definido. Cada configuración de tarifa corresponde a un registro de tipo **rate_plan** en el sistema.

Este módulo es clave para:
- Definir precios vendibles
- Controlar disponibilidad comercial
- Aplicar reglas de negocio por temporada, cliente o mercado
</div>

El módulo gestiona:
- Configuración de tipos de tarifa (Plana, Periodos, Promocional, Específica)
- Definición de vigencias de viaje y reserva
- Configuración de días diferenciados y festivos
- Gestión de monedas (compra / venta)
- Configuración de impuestos
- Aplicación de staff (opcional)
- Definición de montos por fecha
- Estado de tarifas
- Cupos del servicio

### 2. Alcance

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Este módulo cubre todo lo necesario para que un servicio pueda ser:
- Cotizado
- Vendido
- Procesado en files
- Ejecutado en operación
</div>

#### Incluye:

- Configuración completa de estructura tarifaria.
- Validaciones de negocio en tiempo real.
- Integración con calendario festivo.
- Integración con políticas de proveedores.
- Flujo progresivo y no bloqueante.

## 🔄 Flujos de usuario principales

<iframe 
 width="100%"
 height="600"
 style="border:1px solid #ddd"
 src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/board/yBt9rOQ7Gb1Mw6CFU8zDTt/AuroraBack---GDP--Gesti%C3%B3n-de-proveedores-y-Producto-?node-id=2452-1670">
</iframe>

### Flujo de contenido (Marketing)

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El contenido del servicio (textos, traducciones e imágenes) forma parte del producto vendible y debe estar alineado con la configuración tarifaria.
</div>

#### Flujo

1. Ingreso de textos enviados por proveedor  
2. Notificación automática a Marketing  
3. Revisión de textos  
4. Traducción automática  
5. Corrección manual (opcional)  
6. Aprobación de contenido  
7. Carga de imágenes  
8. Guardado final  

📌 Comportamiento del sistema:
- El contenido puede ser editado en paralelo a tarifas  
- La traducción puede ser:
  - Automática
  - Manual
- El sistema debe permitir aprobación parcial  

📌 Impacto:
- El contenido afecta directamente:
  - Cotización
  - Experiencia del usuario final

📌 Relación entre contenido y tarifas:
- El contenido NO afecta el cálculo de tarifas
- Pero SÍ afecta la visibilidad comercial del servicio

📌 Regla del sistema:
- Si el contenido NO está aprobado:
  → El servicio puede tener tarifas configuradas
  → No debe mostrarse en cotización ni canales de venta

📌 Condición para servicio vendible:
- Tarifas completas
- Contenido aprobado
→ Solo en este estado el servicio puede ser comercializado

📌 Impacto:
- Evita mostrar productos incompletos al cliente final
- Asegura coherencia entre contenido y precio

### Flujo general

1. Seleccionar proveedor  
2. Seleccionar ciudad  
3. Definir tipo de servicio  
4. Decisión de flujo:
   - **Servicio simple:**
     → Detalles del servicio  
     → Configuración  
     → Contenido  
     → Planes tarifarios  
     → Fin  
   - **Servicio compuesto:**
     → Estructura  
     → Calculadora  
     → Restricciones  
     → Planes tarifarios  
     → Fin  

📌 Importante:
- Planes tarifarios **no es el inicio del flujo**, depende del tipo de producto.
- La configuración previa impacta directamente en tarifas.

⚠️ Importante:

- El flujo es **progresivo pero no bloqueante**.
- El usuario puede guardar parcialmente.
- La tarifa solo es válida cuando está completa.

## ⚙️ Especificaciones funcionales

### Modelo de datos relacionado

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

La configuración de planes tarifarios se almacena en estructuras del sistema que permiten su persistencia, relación con clientes y aplicación en procesos comerciales.
</div>

#### 📌 Entidades principales

| Entidad | Descripción |
|--------|------------|
| rate_plan | Define la configuración base de la tarifa |
| client_rate_plans | Relaciona la tarifa con un cliente |
| client_services | Relación del servicio configurado |
| client_service_settings | Configuración operativa del servicio |

#### 🔗 Relaciones clave

- Un **cliente (clients)** puede tener múltiples tarifas  
→ 1:N con `client_rate_plans`
- Cada tarifa pertenece a un cliente  
→ FK: `client_rate_plans.client_id`
- Cada tarifa está asociada a un servicio  
→ FK: `rate_plan_id` dentro de `client_rate_plans`

#### ⚙️ Reglas técnicas del modelo

- Toda tarifa debe tener:
  - `client_id`
  - `rate_plan_id`

📌 Regla de unicidad (clave de negocio):

Una tarifa se identifica por la combinación de:
- `product_supplier_id`
- `service_detail_id` (ciudad + categoría / temporada / tipo de servicio)
- rango de fechas

📌 Donde:
- service_detail_id incluye:
  - ciudad  
  - categoría / temporada / tipo de servicio (ej: tren)  

📌 Reglas:
- No pueden existir tarifas duplicadas con la misma combinación.
- No pueden existir tarifas con rangos de fechas superpuestos.
- El sistema debe validar esta restricción antes de persistir.

### 🧩 PASO 1: Datos básicos

#### 📌 Nombre de tarifa

- Generado automáticamente según el tipo seleccionado

📌 Estructura:
"Tarifa" + especificación

📌 Ejemplos:
- Tarifa plana: con días diferenciados y festivos  
- Tarifa periodos: temporada baja / media / alta  
- Tarifa promocional: Multipropiedad  
- Tarifa específica: LATINOAMERICA, EUROPA, CLIENTE X  

📌 Ejemplos reales de negocio:
- Tarifa específica: LATINOAMERICA 1  
- Tarifa específica: EUROPA (ES/IT/PT)  
- Tarifa específica: Cliente TEGEVIMATOURS  
- Tarifa promocional: 1ST 4 CRUISING  

📌 Comportamiento:
- El nombre define la lógica comercial
- No es editable manualmente

#### 📌 Código de reserva

- Campo configurable según proveedor
- Permite identificar la tarifa negociada

📌 Comportamiento:
- Si está activo → el campo es obligatorio
- Debe enviarse automáticamente en:
  - Cotizaciones
  - Files
  - Reservas

📌 Fuente:
- Proveedor (negociación)

📌 Regla:
- No puede generarse una reserva sin este código si es requerido

#### 📌 Tipo de tarifa

Existen 4 tipos:

##### 1. Plana
- Permite definir múltiples rangos de fechas dentro de un año.
- Debe cubrir completamente el periodo definido.

📌 Reglas:
- No puede haber superposición de fechas.
- Puede incluir:
  - Días diferenciados
  - Tarifas festivas
- Los rangos de fechas deben cubrir completamente el periodo definido (ej: todo el año).
- No pueden existir vacíos entre rangos.
- Si existen vacíos → el servicio no será vendible.

##### 2. Periodos
- Basado en temporadas (baja, media, alta).
- Debe poder alinearse con políticas de proveedor.

📌 Configuración:
- Tipo de periodo
- Fecha inicio / fin

#### 📅 Estructura interna de periodos

Cada periodo (temporada) puede contener múltiples cortes de fechas.

📌 Estructura:
- Temporada (ej: Alta, Media, Baja)
  - Corte 1: Rango de fechas
  - Corte 2: Rango de fechas
  - ...

📌 Comportamiento:
- Cada corte representa una unidad independiente de tarifa
- Permite segmentar una misma temporada en múltiples rangos

📌 Reglas:
- No pueden existir:
  - Cortes superpuestos dentro de la misma temporada
  - Cortes superpuestos entre temporadas
- No pueden existir vacíos entre cortes

📌 Validación:
- El sistema debe:
  - Bloquear fechas ya utilizadas
  - Validar continuidad completa

##### 3. Promocional
- Permite definir promociones comerciales específicas.

📌 Configuración:
- Nombre libre (ej: Multipropiedad)

📌 Reglas:
- No incluye tarifas festivas.
- Puede incluir días diferenciados.

##### 4. Específica
- Permite segmentación avanzada.

📌 Configuración:
- Mercados
- Clientes
- Series

📌 Reglas:
- No incluye tarifas festivas.
- Permite múltiples combinaciones simultáneas.

#### 📌 Estructura temporal

Define la base para:
- Políticas
- Montos
- Disponibilidad

📌 Comportamiento del sistema:
- El sistema debe bloquear automáticamente fechas ya utilizadas.
- No se pueden reutilizar rangos existentes.
- La validación es en tiempo real.

📌 Regla funcional:
Las fechas específicas del servicio (ej: verano, feriados, eventos especiales)
se definen exclusivamente en el módulo de planes tarifarios.

Esto incluye:
- Temporadas
- Festivos
- Fechas comerciales específicas
No deben configurarse en otros módulos.

<div style="border-left:8px solid #7c3aed; padding:12px 16px; background:#f5f3ff; color:#000000; border-radius:8px; margin:16px 0;">

❗ <strong>Regla crítica del sistema</strong>

No deben superponerse tarifas que tengan la misma combinación de:
<ul>
<li>Proveedor</li>
<li>Ciudad</li>
<li>Categoría / Temporada / Tipo de servicio</li>
</ul>

📌 Clave técnica:
La llave se compone de:
- <code>product_supplier_id</code>  
- <code>service_detail_id</code>
</div>

#### 📌 Apertura automática de tarifas

Las tarifas se aperturan automáticamente en base a la configuración definida en el Paso 1.

📌 Se generan considerando:
- Tipo de tarifa seleccionado
- Rangos de fechas
- Días diferenciados (si aplica)
- Tarifas festivas (si aplica)

📌 Comportamiento del sistema:
- Cada combinación genera un bloque independiente de ingreso de tarifas.
- El usuario no crea manualmente las fechas en el Paso 3.
- El sistema agrupa automáticamente las fechas según:
   - Rango continuo
   - Fin de semana
   - Festivo

📌 Objetivo:
Garantizar consistencia entre configuración temporal y tarifas.

📌 Regla adicional:
La apertura de tarifas debe respetar:
- Temporadas definidas  
- Cortes de fechas dentro de cada temporada  
- Días diferenciados  
- Tarifas festivas  
Cada combinación genera una unidad independiente de tarifa.

#### Restricción de modificación de fechas

📌 Regla definitiva del sistema:
- Si existen tarifas configuradas en el Paso 3 (Montos):
  → ❌ Un usuario estándar NO puede modificar:
  - Periodo de viaje
  - Rangos de fechas
  - Estructura temporal

📌 Excepción controlada:
- Usuarios con permisos especiales (Administración / roles autorizados):
  → ✅ Pueden modificar fechas

📌 Comportamiento obligatorio del sistema:
Si un usuario autorizado modifica fechas:
- El sistema debe:
  - Recalcular automáticamente los bloques de tarifas afectados
  - Marcar las tarifas como:
    → "Requieren revisión"
  - Mostrar alerta:
    → "Las fechas han sido modificadas. Es necesario revisar las tarifas"

📌 Impacto:
- Evita inconsistencias entre fechas y montos
- Mantiene integridad en cotización y files

<div style="border-left:4px solid #f59e0b; padding:12px 16px; background:#fff7ed; color:#000000; border-radius:8px; margin:16px 0;">

⚠️ <strong>PENDIENTE FUNCIONAL</strong>

Si se modifican tarifas ya configuradas (Paso 3 - Montos):
<ul>
<li>¿Debe permitirse modificar el periodo de viaje?</li>
<li>Usuario estándar: no debería poder</li>
<li>Usuario con permisos especiales: podría permitirse bajo control</li>
</ul>

📌 Estado:
- Requiere validación con negocio
- No es una regla cerrada
</div>

#### 📌 Periodo de viaje

Define cuándo viaja el pasajero.

#### 📌 Periodo de reserva

Define cuándo se puede reservar.

Comportamiento:
- Inactivo → sin restricción
- Activo → restringe fechas

#### 📌 Validación del sistema

El sistema debe validar automáticamente la continuidad de fechas. Si existen periodos no cubiertos dentro del rango definido:

Ejemplo:
- Periodo A: Ene – Mar
- Periodo B: May – Jun

Resultado:
→ Existe un vacío en Abril

El sistema debe:
- Detectar automáticamente el intervalo faltante.
- Mostrar alerta:
  "Atención: Hay un vacío de tarifas. El servicio no será vendible en esas fechas"
- Marcar la tarifa como NO vendible.

#### 📌 Días diferenciados

Permite definir tarifas especiales por día.

<div style="border-left:8px solid #7c3aed; padding:12px 16px; background:#f5f3ff; color:#000000; border-radius:8px; margin:16px 0;">

💡 <strong>Regla global de fin de semana</strong>

Siempre que la selección incluya:
<ul>
<li>Sábado</li>
<li>Domingo</li>
</ul>
→ Se considera automáticamente tarifa de fin de semana.
</div>

#### 📌 Lógica clave:

- Si incluye sábado o domingo → tarifa fin de semana.
- Si no → tarifa estándar

#### 📌 Días con tarifa diferenciada.

Permite seleccionar días específicos de la semana.

📌 Lógica de fin de semana:
Se considera tarifa de fin de semana si incluye:
- Sábado
- Domingo
- Combinaciones como:
  - Viernes + sábado
  - Domingo + lunes

📌 Casos de lógica:
- Solo sábado → fin de semana  
- Solo domingo → fin de semana  
- Viernes + sábado → fin de semana  
- Domingo + lunes → fin de semana  
- Lunes a viernes → tarifa estándar

📌 Comportamiento:
- Selección manual
- Impacta directamente en el cálculo de tarifas

#### 📌 Tarifas festivas

Integración directa con el calendario festivo del sistema

📌 Comportamiento del sistema:
- Las fechas festivas se cargan automáticamente según el calendario configurado
- Cada fecha festiva genera una excepción sobre la tarifa estándar
- El usuario puede modificar la tarifa específica para cada fecha festiva

📌 Reglas:
- Aplica solo a:
  - Tarifa plana
  - Tarifa por periodos
- No aplica a:
  - Promocional
  - Específica

#### 📌 Eliminación de festivos (opcional)

Existe una opción para eliminar la aplicación de tarifas festivas.

📌 Comportamiento:
- Al activarse:
  - Se eliminan todas las tarifas festivas configuradas previamente
  - Se elimina cualquier excepción basada en calendario festivo
  - El sistema fuerza el uso exclusivo de tarifa estándar (lunes a viernes)

📌 Impacto:
El sistema elimina completamente cualquier excepción tarifaria y fuerza el uso exclusivo de tarifa estándar (lunes a viernes).

#### 📌 Moneda

| Tipo | Uso |
|------|-----|
| Compra | Proveedor |
| Venta | Cliente |

Por defecto:
- Venta → USD

📌 Tipo de cambio:
- Se obtiene desde el módulo de contabilidad.
- Se actualiza de forma diaria.

📌 Uso:
- Se aplica al momento de:
  - Cotización
  - Cálculo de márgenes
  - Reportes financieros

📌 Regla:
- No se almacena como valor fijo en la tarifa.
- Siempre debe utilizarse el valor vigente al momento del cálculo.

#### ⚠️ Reglas importantes

- No deben existir tarifas superpuestas con la misma combinación de:
  - Proveedor
  - Servicio (detalle: ciudad, categoría, temporada o tipo como tren)
  - Rango de fechas
- La combinación:
  cliente + servicio + proveedor + categoría + rango de fechas debe ser única
- No pueden existir fechas superpuestas dentro de una misma tarifa
- Tarifas incompletas → servicio no vendible
- Cada tarifa debe estar asociada a:
  - `client_id`
  - `service_id`
- Toda tarifa debe existir previamente en:
  - `client_rate_plans`
- No puede existir una tarifa sin relación a cliente (integridad referencial)

📌 Regla adicional:
- La moneda de compra debe calcularse usando el tipo de cambio diario definido por contabilidad
- Este tipo de cambio impacta directamente en:
  - Cotizaciones
  - Márgenes
  - Reportes financieros

### 🧩 PASO 2: Staff e impuestos

#### 📌 Impuesto principal (IGV / IVA)

📌 Estado por defecto:
- A nivel sistema: Desactivado
- A nivel servicio:
  - Activado por defecto (excepto guías)

📌 Configuración:
- Editable según país.
- Porcentaje configurable.

📌 Comportamiento:
- Si está activo:
  → Se incluye en el cálculo según configuración

#### 📌 Lógica de cálculo

- IGV recuperable:
- Tarifa → SIN IGV
- IGV no recuperable:
- Tarifa → CON IGV

#### 📌 Otros cargos

- % Servicios
- Porcentajes adicionales (dinámicos)

#### 📌 Staff (opcional)

- Multi-selección:
- Guía
- Chofer
- Tour leader

📌 Comportamiento:

- Activa matriz dinámica de impuestos
- Define impacto en montos

#### 📌 Estructura técnica

```json
{
  "taxAndStaffConfig": {
    "globalDefinitions": {
      "mainTax": {
        "isAffected": true,
        "label": "IGV",
        "value": 18,
        "hasRecovery": true
      },
      "serviceFee": {
        "isAffected": true,
        "value": 5
      },
      "additionalFees": []
    },
    "staffRules": []
  }
}
```

📌 Reglas técnicas:
- feeId es la única referencia válida para cálculos  
- Nunca usar nombres para cálos  
- Los cargos se definen globalmente y se activan por staff  

📌 Algoritmo de cálculo:
1. Iterar `taxSettings`  
2. Si `isAffected = true`  
3. Buscar valor en `globalDefinitions`  
4. Sumar porcentajes activos  

#### 📌 Relación con Paso 3 - Montos

- Todo staff que tenga al menos un impuesto o cargo activo:
  → Debe aparecer en el Paso 3 (Montos)
- Si un staff no tiene ningún cargo activo:
  → No debe mostrarse en Montos

📌 Objetivo:
- Evitar configuraciones inconsistentes entre impuestos y cálculo final

### 🧩 PASO 3: Montos

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

En este paso se define el valor económico final del servicio, en base a la configuración previa de fechas, impuestos y staff.

Las tarifas se construyen por cada fecha o grupo de fechas definido en el Paso 1.
</div>

#### 📌 Fechas

Son las configuradas previamente en el Paso 1.

Tipos:

| Tipo | Descripción |
|------|------------|
| Plana | Rango continuo de fechas |
| Fin de semana | Días diferenciados |
| Festivo | Fechas específicas del calendario |

📌 Comportamiento:
- El sistema agrupa automáticamente las fechas
- Cada grupo genera una estructura de ingreso de tarifas

#### 📌 Ingreso de tarifas

Para cada fecha se debe ingresar:
- Tarifa base
- Configuración de impuestos (Paso 2)
- Aplicación de staff (si existe)

📌 Reglas:
- No pueden existir tarifas superpuestas
- Deben respetar la estructura definida en Paso 1
- Cada monto debe estar asociado a un `rate_plan_id`
- Solo tarifas persistidas en base de datos pueden ser utilizadas en cotización

#### 📌 Estatus de tarifa

Campo obligatorio que define el comportamiento comercial:

| Estado | Descripción |
|------|-------------|
| Confirmada | Tarifa activa |
| Protegida | Uso restringido |
| Cerrada | No usable |
| Finalizada | Uso parcial |
| Dinámica | Editable |

#### 🚫 Black Out (ausencia de tarifa)

Representa periodos donde el servicio NO está disponible para la venta.

📌 Comportamiento:
- Se configura como:
  → Estado "Cerrada"

📌 Reglas:
- No debe mostrarse en:
  - Cotizaciones
  - Files
- Bloquea completamente la venta del servicio en esas fechas

📌 Uso:
- Fechas no operativas
- Mantenimiento
- Bloqueos comerciales

#### 📌 Cálculo de tarifas

<div style="background:#FFF4CC; color:#000000; padding:14px 16px; border-radius:8px; margin:14px 0; border:6px solid #eaed3aff;">

<strong>Tarifa neta:</strong><br>
- Caso 1: IGV recuperable<br>
Tarifa base × (1 + % servicios)<br>

- Caso 2: IGV NO recuperable<br>
Tarifa base × (1 + IGV + % servicios)<br>

- Caso 3: Reverso de cálculo (ajuste)<br>
(Tarifa / (1 + IGV)) × (1 + % servicios)
</div>

#### ⚠️ Consideración sobre % de servicios

El porcentaje de servicios tiene un comportamiento diferenciado:

📌 Persistencia:
- No necesariamente forma parte de la tarifa base almacenada

📌 Uso:
- Se aplica principalmente en:
  - Cotizaciones
  - Cálculo comercial

📌 Impacto:
- Puede afectar:
  - Precio final al cliente
  - Margen

<div style="border-left:8px solid #7c3aed; padding:12px 16px; background:#f5f3ff; color:#000000; border-radius:8px; margin:16px 0;">

💡 <strong>Regla técnica</strong>

El porcentaje de servicios:
<ul>
<li>No debe asumirse como parte fija de la tarifa base almacenada</li>
<li>Se aplica principalmente en procesos de cotización</li>
</ul>
</div>

#### 📌 Variaciones por tipo de servicio

| Tipo | Comportamiento |
|------|---------------|
| Guías | Tarifas por idioma |
| Trenes | Sin temporadas |
| Paquetes | Configuración combinada |

#### Tarifas por idioma (Guías)

Para servicios de tipo guía, las tarifas deben segmentarse por idioma.

📌 Origen:
- Los idiomas provienen de la configuración de Staff (Paso 2)

📌 Relación técnica:
- Cada tarifa por idioma debe estar vinculada mediante:
  - staff_id
  - language_id

📌 Comportamiento:
- Cada idioma genera una variación independiente de tarifa
- El usuario puede definir:
  - Tarifa específica por idioma
  - Condiciones diferenciadas

📌 Reglas:
- Si no se configura idioma:
  → Se aplica tarifa base general
- Debe permitir:
  - Edición en cotización
  - Edición en files

📌 Impacto:
- El idioma afecta:
  - Precio final
  - Disponibilidad de staff

<div style="border-left:4px solid #f59e0b; padding:12px 16px; background:#fff7ed; color:#000000; border-radius:8px; margin:16px 0;">

⚠️ <strong>PENDIENTE</strong>

Validar la forma de vinculación entre:
<ul>
<li>Tarifas</li>
<li>Staff</li>
<li>Idiomas</li>
</ul>

📌 Opciones:
<ol>
<li>Asociación directa → tarifa → staff_id + language_id</li>
<li>Asociación desacoplada → idioma como atributo independiente</li>
</ol>

📌 Impacto:
- Cotización  
- Files  
- Disponibilidad de staff  
- Cálculo de tarifas  

📌 Estado:
- En validación con negocio y arquitectura
</div>

#### Políticas para niños e infantes

Permite definir cómo se aplican las tarifas a pasajeros según rango de edad.

📌 Configuración:

| Tipo | Comportamiento |
|------|---------------|
| Infante | Puede no pagar o pagar porcentaje mínimo |
| Niño | Puede tener tarifa diferenciada |
| Adulto | Tarifa completa |

📌 Reglas:

- Las políticas pueden:
  - Aplicarse como porcentaje de la tarifa base
  - Ser valores fijos
- Deben poder combinarse con:
  - Temporadas
  - Tarifas específicas
- Si no existe configuración:
  → Se aplica tarifa de adulto por defecto

📌 Consideración técnica:

- Estas políticas deben evaluarse en:
  - Cotización
  - Files
- No necesariamente afectan la tarifa base persistida

#### 📌 Políticas

Orden de aplicación:
1. Servicio específico  
2. General  
3. Temporadas  
4. Segmentación  

📌 Regla:
- Si existe política específica → se usa esa  
- Si no → se usa política general  

#### 📌 Comportamiento UX

- Posibilidad de guardar por fecha
- Flujo continuo sin necesidad de botón global

#### 📌 Comportamiento UX de guardado

📌 Guardado desacoplado:
- Cada fecha o grupo de fechas se guarda de forma independiente  
- No existe un botón global de guardado  

📌 Comportamiento:
- El usuario puede avanzar sin completar todas las fechas  
- Cada cambio se persiste automáticamente  

📌 Impacto:
- Flujo continuo hacia Paso 4 (Cupos).  
- Mejora la experiencia de usuario.
- Reduce pérdida de información.

📌 Flujo UX real en Montos:
- El usuario configura tarifas por bloques de fechas.
- Cada bloque se guarda automáticamente al ser editado.
- No existe un botón global de “Guardar datos”.

📌 Navegación:
- El usuario puede avanzar directamente al Paso 4 (Cupos).
- El flujo es continuo y no requiere completar todas las fechas.

📌 Beneficio:
- Reduce fricción en la experiencia.
- Permite configuración parcial sin pérdida de información.

📌 Regla UX clave:
- Cada bloque de fechas es independiente.
- El guardado se realiza automáticamente por bloque.
- No existe persistencia global de toda la tarifa.

📌 Resultado:
- El usuario puede configurar parcialmente.
- Reduce riesgo de pérdida de información.
- Permite flujo continuo hacia Cupos.

### 🧩 PASO 4: Cupos del servicio

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Define la disponibilidad del servicio, permitiendo controlar la venta en función de la capacidad operativa.
</div>

#### 📌 Funcionalidad

- Definir cantidad de cupos disponibles
- Controlar disponibilidad en tiempo real
- Limitar ventas según capacidad

#### 📌 Comportamiento del sistema

- Los cupos impactan directamente en:
  - Cotizaciones
  - Files
  - Operaciones

#### 📌 Reglas

- Si no hay cupos disponibles:
  → El servicio no debe poder venderse  
- Los cupos pueden variar por:
  - Fecha
  - Tipo de servicio
  - Configuración operativa  
- Los cupos deben validarse en tiempo real contra reservas existentes
- La disponibilidad se reduce automáticamente al confirmar una venta

## 🔗 Integraciones con otros módulos

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo de Planes tarifarios se conecta directamente con otros módulos del sistema, ya que las tarifas definidas aquí son utilizadas en múltiples procesos del negocio.

</div>

| Módulo | Uso |
|------|------|
| Configuración | Define base del servicio |
| Políticas de proveedores | Define temporadas |
| Cotizaciones | Usa tarifas calculadas |
| Files | Usa tarifas finales |
| Operaciones | Define ejecución |
| Contabilidad | Tipo de cambio |

## ⚙️ Configuraciones y permisos

### 📌 Configuraciones

Dependen de:
- Calendario festivo
- Políticas de proveedor
- Tipo de tarifa
- Configuración de staff

### 📌 Permisos

| Rol | Permiso |
|------|--------|
| Negociaciones | Configurar tarifas |
| Product Owner | Definir reglas |
| Operaciones | Consultar |
| Administración | Modificar |

## 🎨 Diseño de interfaz

<iframe
 width="100%"
 height="600"
 style="border:1px solid #ddd"
 src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/X32biyjjLLibBdWgj4mnvy/AuroraBack---GDP--Gesti%C3%B3n-de-proveedores-y-Producto-?node-id=17249-42954">
</iframe>

### Estructura visual

#### 📌 Comportamiento del Stepper (flujo por pasos)
El flujo se presenta como un wizard de 4 pasos:
- Datos básicos
- Staff e impuestos
- Montos
- Cupos

#### 📌 Navegación:
- El usuario puede moverse libremente entre pasos
- No es obligatorio completar un paso para avanzar
- El flujo es progresivo pero no bloqueante

#### 📌 Estados visuales por paso:
- Incompleto
- Completo
- Con errores

#### 📌 Validaciones en interfaz:
- Campos obligatorios → marcados con (*)
- Errores → borde rojo + mensaje contextual
- Toggles → activan o desactivan inputs en tiempo real

#### 📌 Regla clave:
- El usuario puede avanzar sin completar todo
- Pero:
→ ❌ El servicio NO será vendible si la tarifa está incompleta

### Consideraciones UX

- Flujo tipo wizard
- Guardado progresivo
- Validaciones no bloqueantes
- Navegación libre entre pasos

### Estados de interfaz

- Loading  
- Empty  
- Error  
- Success  

### ⚠️ Observaciones clave

- Fechas incompletas → servicio no vendible  
- Tarifas superpuestas → error de negocio  
- Mala configuración de impuestos → errores de pricing  

### Validaciones de interfaz

- Campos obligatorios deben indicarse visualmente (ej: *)
- Inputs deben activarse/desactivarse según toggles:
  - Periodo de reserva desactivado → inputs bloqueados
  - Días diferenciados desactivado → selección oculta
  - Festivos desactivado → no se muestran tarifas festivas

📌 Comportamiento:
- Validaciones en tiempo real
- Feedback inmediato al usuario

### Conclusión UX

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo permite gestionar estructuras tarifarias complejas de forma controlada y flexible, asegurando consistencia entre configuración, cotización y operación.
</div>