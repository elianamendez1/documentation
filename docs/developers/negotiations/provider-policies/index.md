---
title: Políticas de proveedores
description: Documentación funcional del sistema de políticas de proveedores
---
 
# 📜 Políticas de proveedores
 
<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Sistema para definir las reglas comerciales que regulan la relación entre la empresa y los proveedores turísticos.
</div>

## 🎯 Descripción del módulo y alcance
 
### 1. Descripción del módulo

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo **Políticas de proveedores** permite definir y registrar las reglas comerciales que los proveedores aplican a los servicios turísticos ofrecidos por la empresa.
 
Estas políticas permiten estandarizar las condiciones bajo las cuales se comercializan los servicios y asegurar que los equipos de operaciones, ventas y contabilidad trabajen bajo los mismos criterios.
</div>

Las políticas gestionan principalmente:
 
- Condiciones de pago
- Penalidades de cancelación
- Reglas de reconfirmación
- Liberados para pasajeros
- Rangos de edad para pasajeros
 
Cada política puede aplicarse a distintos contextos comerciales dependiendo del mercado, cliente, temporada o tipo de servicio.
 
### 2. Alcance

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo permite gestionar políticas aplicables a distintos tipos de operación turística dentro del sistema Aurora.
</div>

El alcance incluye:
 
- Creación y configuración de políticas comerciales.
- Definición de reglas de pago para proveedores.
- Configuración de penalidades de cancelación.
- Reglas de reconfirmación de servicios.
- Gestión de liberados por número de pasajeros.
- Definición de rangos de edad para infantes y niños.
- Segmentación de políticas por mercados, clientes, series o temporadas.
 
<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Las políticas creadas en este módulo pueden ser utilizadas posteriormente por Cotizaciones, Files, Series y Operaciones para aplicar automáticamente las condiciones comerciales correspondientes.
</div>

## 🔄 Flujos de usuario principales
 
El siguiente diagrama muestra el flujo de creación y configuración de una política de proveedor.
 
<iframe 
 width="100%"
 height="600"
 style="border:1px solid #ddd"
 src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/board/yBt9rOQ7Gb1Mw6CFU8zDTt/AuroraBack---GDP--Gestión-de-proveedores-y-Producto-?node-id=2386-2210">
</iframe>
 
El proceso tiene **dos pasos principales**.
 
---
 
### Paso 1 — Configuración base de la política
 
En este paso se registran los **datos generales de la política**.
Estos datos definen **cuándo, a quién y en qué contexto comercial se aplicará la política**.
 
##### Campos principales:
 
- Nombre de política
- Aplica para (tipo de operación)
- Rango de cantidad (Desde / Hasta)
- Periodo de vigencia
- Segmentación de política
 
###### 📌Nombre de política:
 
El usuario puede ingresar un nombre manual o utilizar una convención sugerida:
 
```
Política + aplica para + segmento principal
```
 
Ejemplo:
 
```
Política FIT: USA
```

###### 📌Tipo de operación
 
Define el tipo de operación turística al que se aplicará la política.
 
| Tipo de operación | Descripción |
|---|---|
| FIT | Viajes individuales |
| GRUPOS | Operaciones grupales |
| SERIES | Programas recurrentes |
 
###### 📌Rango de cantidad (Desde / Hasta):
 
Define el rango de cantidad para los cuales la política será aplicada. Este rango permite que distintas políticas se apliquen según el tamaño de la reserva.
 
Ejemplo:

Desde: 1  
Hasta: 15  
 
La política aplicará únicamente a reservas que se encuentren dentro de ese rango.
 
###### 📌Periodo de vigencia:
 
Define el rango de fechas durante el cual la política estará activa.
 
Campos:
- Fecha desde
- Fecha hasta
 
Solo las reservas cuya fecha de servicio se encuentre dentro de este periodo utilizarán esta política.

###### 📌Segmentación de políticas:
 
Permite aplicar la política a distintos segmentos.
 
| Segmentación | Tipo | Descripción |
|---|---|---|
| Mercado | Multiselect | Mercado de origen del cliente |
| Clientes | Multiselect | Clientes específicos |
| Series | Input | Series o programas específicos |
| Fiestas | Multiselect | Festividades o eventos |
| Temporadas | Multiselect | Temporadas comerciales |
| Tipo de servicios | Multiselect | Tipo de servicio turístico |
 
Los valores disponibles en cada segmentación se obtienen de los catálogos configurados en el sistema.
 
---
 
### Paso 2 — Configuración de reglas
 
<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Una vez registrada la configuración base de la política, el usuario debe definir las **reglas operativas que componen la política**. Estas reglas determinan **cómo se comportará comercialmente el servicio frente a distintas situaciones**. Las políticas están compuestas por **cinco secciones de reglas**.
</div>

## ⚙️ Especificaciones funcionales
 
Las políticas están compuestas por **cinco secciones de reglas**.
 
### 1️⃣ Condiciones de pago
 
Define cuándo debe realizarse el pago al proveedor.
 
Tipos disponibles:
 
| Tipo | Código |
|---|---|
| Prepago | `prepaid` |
| Crédito | `credit` |
| Contado | `cash` |
 
Opciones:
 
- Antes del servicio
- Posterior a la facturación
- Al momento de la reserva
 
#### Pagos en partes
 
<div style="text-align: justify; line-height:1.7; margin-top:12px;">
Permite dividir el pago en varios plazos. Las condiciones de pago pueden dividirse en múltiples plazos configurables.
</div>

Ejemplo:
 
Reserva total **2500 USD**
 
Condiciones:
- 750 USD al momento de la reserva
- Saldo restante 90 días antes del servicio
 
---
 
### 2️⃣ Cancelación
 
<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Define las penalidades aplicables cuando un servicio es cancelado antes de la fecha de operación. Las penalidades se configuran mediante **reglas de cancelación**, las cuales se aplican dependiendo de la cercanía a la fecha del servicio.
</div>

Cada regla incluye:
 
- **Días antes del servicio**: momento a partir del cual aplica la penalidad.
- **Tipo de penalidad**: define cómo se calcula la penalidad.
  - Porcentaje
  - Monto fijo
- **Valor de penalidad**: cantidad aplicada según el tipo definido.
 
#### Ejemplo de reglas
 
Reserva total: **1000 USD**
 
| Días antes | Tipo | Penalidad |
|---|---|---|
| 30 días | Porcentaje | 20% |
| 7 días | Porcentaje | 100% |
 
Resultado:
 
- Cancelación **30 días antes** → Penalidad **200 USD**
- Cancelación **7 días antes** → Penalidad **1000 USD**
 
Consideraciones:
 
- Se pueden configurar múltiples reglas.
- Las reglas se evalúan en orden descendente de días antes del servicio.
- Se aplica la primera regla cuyo rango de días sea menor o igual a la diferencia entre la fecha de cancelación y la fecha del servicio.
 
---
 
### 3️⃣ Reconfirmación
 
Permite exigir confirmación previa del servicio.
 
Ejemplo:
 
```
Reconfirmación 48 horas antes del servicio.
```
 
Opciones adicionales:
- Lista preliminar de pasajeros
- Lista final de pasajeros
 
---
 
### 4️⃣ Liberados
 
Permite configurar gratuidades otorgadas por el proveedor según la cantidad de pasajeros. Un liberado representa un pasajero o recurso que no genera costo.
 
Ejemplo:
 
1 liberado cada 15 pasajeros.
 
Esto significa que por cada 15 pasajeros pagantes se otorga 1 liberado sin costo.
 
Tipos posibles:
- Liberado por persona
- Liberado por habitación
 
---
 
### 5️⃣ Edades
 
Permite definir rangos para:
- Infantes
- Niños
 
Incluye campo para **información adicional**.
 
---
### Finalización del proceso
 
<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Una vez configuradas todas las reglas, el sistema realiza una **validación final**. Si todos los campos requeridos están completos, el usuario puede: Guardar y activar política. Al completarse este proceso, la política queda **disponible para ser utilizada por otros módulos del sistema**.
</div>

## 🔗 Integraciones con otros módulos
 
Las políticas interactúan con otros módulos del sistema.
 
| Módulo | Uso |
|---|---|
| Proveedores | Asignación de políticas |
| Tarifarios | Aplicación de condiciones |
| Files | Generación de alertas |
| Series | Segmentación |
| Reservas | Cálculo de penalidades |
 
## ⚙️ Configuraciones y permisos
 
Las configuraciones dependen de:
 
- Configuración de IGV
- Tipos de servicio registrados
- Segmentaciones comerciales
 
Permisos principales:
 
| Rol | Permiso |
|---|---|
| Product Owner | Crear políticas |
| Operaciones | Consultar |
| Administración | Modificar |
| Finanzas | Visualizar condiciones de pago |
 
## 🎨 Diseño de interfaz
 
<div style="text-align: justify; line-height:1.7; margin-top:12px;">

La interfaz del módulo **Políticas de proveedores** permite a los usuarios configurar las condiciones comerciales aplicables a los servicios de un proveedor.
 
El diseño busca facilitar la configuración de reglas complejas mediante formularios estructurados y validaciones automáticas.
</div>

**Pantallas UI**
 
<iframe
 width="100%"
 height="600"
 style="border:1px solid #ddd"
 src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/X32biyjjLLibBdWgj4mnvy/AuroraBack---GDP--Gesti%C3%B3n-de-proveedores-y-Producto-?node-id=11196-85763&t=YZpnSekQNMc5lMc8-0">
</iframe>
 
### Copiar política
 
<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El sistema permite duplicar una política existente para facilitar la creación de nuevas configuraciones. Al utilizar la opción **Copiar política**, el sistema:
</div>

- Replica la configuración base
- Copia todas las reglas configuradas
- Permite modificar los valores antes de guardar la nueva política
