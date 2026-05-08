---
title: Planes tarifarios (Dev)
description: Documentación técnica del módulo de planes tarifarios para desarrolladores
---

# 💻 Planes tarifarios – Dev

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Este documento describe la implementación técnica del módulo **Planes tarifarios**, incluyendo arquitectura, componentes, modelo de datos, APIs, reglas de negocio y validaciones críticas.

El módulo de Planes tarifarios es responsable de transformar la configuración operativa del servicio en **estructuras económicas vendibles**, siendo consumido directamente por cotizaciones, files, operación y contabilidad.

Se basa en cuatro principios técnicos clave:

- **Motor temporal centralizado:** todas las fechas viven en este módulo  
- **Guardado progresivo (autosave):** persistencia por bloques de fechas  
- **Flujo no bloqueante:** el usuario puede avanzar sin completar todo  
- **Validaciones de negocio estrictas en backend:** no solapamientos ni vacíos  

</div>

---

# 🧱 Contenido Planeado
---

## 🎨 Sistema de Diseño

### 🧩 Componentes UI reutilizables

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

La interfaz sigue un patrón **Stepper (Wizard) de 4 pasos**, visible en Figma y alineado al flujo funcional:

- Datos básicos  
- Staff e impuestos  
- Montos  
- Cupos  

Cada paso es independiente, no bloqueante y soporta autosave por secciones.
</div>

#### Componentes principales

- **StepperContainer**
  - Maneja navegación libre entre pasos
  - Estados visuales: incomplete / complete / error
  - No bloquea avance

- **RatePlanBasicForm**
  - Tipo de tarifa
  - Periodo de viaje / reserva
  - Moneda compra / venta
  - Toggles de días diferenciados y festivos

- **DateRangeManager** ⚠️ (CRÍTICO)
  - Manejo de rangos de fechas
  - Bloqueo de fechas ya utilizadas
  - Detección de solapamientos y vacíos
  - Validación en tiempo real

- **PeriodSeasonBuilder**
  - Construcción de temporadas
  - Cortes múltiples por temporada
  - Validación de continuidad

- **WeekdaySelector**
  - Selección manual de días
  - Lógica automática de fin de semana

- **HolidayRateMatrix**
  - Integración con calendario festivo
  - Generación automática de excepciones

- **TaxAndStaffPanel**
  - Configuración de IGV / IVA
  - Service fee
  - Staff dinámico

- **RateAmountMatrix** ⚠️ (CRÍTICO)
  - Ingreso de montos por bloque de fechas
  - Autosave por bloque
  - Estados comerciales de tarifa

- **QuotaManager**
  - Cupos por fecha
  - Validación contra reservas existentes

---

## ⚙️ Especificaciones Técnicas

### 🏗️ Arquitectura del sistema
#### Capas
- **Frontend**
  - Vue + Vite
  - State management (Pinia)
  - Formularios reactivos

- **Backend**
  - API REST
  - Motor de validación temporal
  - Autosave por entidades parciales

- **Base de datos**
  - Modelo relacional
  - Integridad referencial estricta

### 🔌 APIs y endpoints

#### 📌 Obtener planes tarifarios
```text
GET /api/services/{serviceId}/rate-plans?status=confirmed&type=flat
```
#### 📌 Crear / actualizar tarifa

```http
POST /api/rate-plans
PATCH /api/rate-plans/{ratePlanId} 
```
Características:
- Partial update
- Validación completa en backend
- Idempotente

#### 📌 Obtener calendario festivo

```http
GET /api/calendar/holidays
```

#### 📌 Tipo de cambio

```http
GET /api/exchange-rate
```
## 🧠 Lógica de negocio clave

### 📌 Tipo de tarifa

| Tipo | Código | Comportamiento |
|----|------|----------------|
| Plana | flat | Cobertura continua sin vacíos |
| Periodos | periods | Temporadas con cortes |
| Promocional | promo | Sin festivos |
| Específica | specific | Segmentación avanzada |

### 📌 Regla de unicidad (CRÍTICA)

```text
product_supplier_id
+ service_detail_id
+ rango de fechas
```

Reglas:
- No duplicados
- No solapamientos
- Validación obligatoria antes de persistir

### 📌 Validación de fechas

```text
function validateRanges(ranges) {
  checkOverlap(ranges);
  checkContinuity(ranges);
}
```

Resultados:
- Solapamiento → error de negocio
- Vacío → tarifa NO vendible

### 📌 Lógica de fin de semana

```text
const isWeekendRate = (days) =>
  days.includes("SAT") || days.includes("SUN");
```
Cualquier combinación con sábado o domingo se considera tarifa fin de semana.

### 📌 Tarifas festivas

Prioridad de cálculo:
```text
festivo > fin_de_semana > estándar
```

- Solo aplica a tarifas planas y por periodos
- Integración directa con calendario

### 📌 Restricción de edición de fechas

```text
if (amountsExist && !hasAdminRole) {
  blockDateEdition();
}
```

Usuarios con permisos especiales:
- Recalcular bloques
- Marcar tarifas como "requiere revisión"

### 📌 Moneda y tipo de cambio

- No se persiste tipo de cambio
- Se consulta en tiempo real desde contabilidad

```text
finalAmount = baseAmount * exchangeRate;
```

### 📌 Concepto: Bloques de tarifa (rate blocks) ⚠️

Los bloques de tarifa son unidades generadas automáticamente a partir de la configuración definida en el Paso 1. Se construyen combinando:
- Rangos de fechas
- Días diferenciados
- Festivos

Cada bloque representa una unidad independiente que requiere ingreso de tarifa en el Paso 3.

📌 Ejemplo:
- 01 Ene – 31 Mar (Lunes a Viernes) → Bloque 1  
- 01 Ene – 31 Mar (Fin de semana) → Bloque 2  
- 14 Feb (Festivo) → Bloque 3  

📌 Reglas:
- El usuario NO crea bloques manualmente
- El sistema los genera automáticamente
- Cada bloque debe tener al menos una tarifa configurada
- Si un bloque no tiene tarifa → el servicio NO es vendible

📌 Impacto técnico:
- Define la estructura de `RateAmountMatrix`
- Determina las filas dinámicas en UI

### 📌 Cálculo de vendibilidad (isSellable)

El sistema no persiste el estado de vendibilidad, se calcula en tiempo real.

#### Condiciones:
- Sin solapamientos
- Sin vacíos en fechas
- Todas las fechas tienen montos
- Cupos definidos
- Contenido aprobado (externo al módulo)

```ts
function isSellable(ratePlan) {
  return (
    noDateGaps &&
    noOverlaps &&
    hasAllAmounts &&
    hasQuota
  );
}
```
📌 Resultado:
- true → servicio visible en cotización
- false → servicio oculto

## 🗄️ Base de datos y modelos

### 📌 Tabla: `rate_plans` 
| Campo | Tipo |
|-------|------|
| id | uuid |
| product_supplier_id | uuid |
| service_detail_id | uuid |
| type | enum |
| currency_purchase | varchar |
| currency_sale | varchar |
| reservation_code | varchar |
| is_reservation_required | boolean |
| status | enum |

### 📌 Tabla: `rate_plan_dates`
| Campo | Tipo |
|-------|------|
| id | uuid |
| rate_plan_id | uuid |
| start_date | date |
| end_date | date |
| rate_type | enum (standard / weekend / holiday) |

### 📌 Tabla: `rate_plan_amounts`
| Campo | Tipo |
|-------|------|
| id | uuid |
| rate_plan_date_id | uuid |
| base_amount | decimal |
| final_amount | decimal |
| currency | varchar |
| staff_id | uuid |
| status | enum |

### 📌 Tabla: `rate_plan_taxes`
| Campo | Tipo |
|-------|------|
| id | uuid |
| rate_plan_id | uuid |
| fee_id | uuid |
| percentage | decimal |

### 📌 Tabla: `rate_plan_quotas`
| Campo | Tipo |
|-------|------|
| id | uuid |
| rate_plan_date_id | uuid |
| available_quota | int |

### 📌 Tabla: `rate_plan_staff`

| Campo | Tipo |
|------|------|
| id | uuid |
| rate_plan_id | uuid |
| staff_type | enum |

📌 Uso:
- Define qué staff impactan en la tarifa
- Permite cálculo dinámico en Paso 3

### 📌 Tabla: `client_rate_plans`

| Campo | Tipo |
|------|------|
| id | uuid |
| client_id | uuid |
| rate_plan_id | uuid |

📌 Relación:
- rate_plans → rate_plan_dates (1:N)
- rate_plan_dates → rate_plan_amounts (1:N)
- rate_plan_dates → rate_plan_quotas (1:N)
- rate_plans → rate_plan_taxes (1:N)
- rate_plans → rate_plan_staff (1:N)
- rate_plans → client_rate_plans (1:N)

📌 Regla:
- No puede existir un rate_plan sin relación en esta tabla

## ⚠️ Reglas críticas del sistema

### 📌 Reglas de fechas
- Toda configuración de fechas debe realizarse en este módulo
- No permitir solapamientos
- No permitir vacíos en fechas

### 📌 Reglas de integridad
- No permitir duplicidad por clave de negocio
- No permitir tarifas sin cliente
- No permitir tarifas sin montos completos

### 📌 Reglas de cálculo
- No persistir tipo de cambio
- El cálculo siempre debe usar valores en tiempo real

### 📌 Reglas de validación
- Validaciones críticas siempre deben ejecutarse en backend

## 🧑‍💻 Guías de Desarrollo

### 📏 Estándares

- TypeScript obligatorio
- Validaciones críticas en backend
- No lógica de fechas solo en frontend

 ### 🔄 Checklist de code review

✔ Validación de fechas
✔ No solapamientos
✔ Manejo correcto de estados
✔ Autosave por bloque
✔ Integración con contabilidad
✔ Pruebas de cálculo

### 🧪 Pruebas y QA
- Unitarias
  - Continuidad de fechas
  - Cálculo de tarifas
  - Lógica de fin de semana

- Integración
  - Creación completa de tarifa
  - Autosave parcial
  - Staff + impuestos

- E2E
```http
  Configuración → Tarifas → Cotización → File
```