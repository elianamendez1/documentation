---
title: Políticas de proveedores (Dev)
description: Documentación técnica del módulo de políticas de proveedores
---

# 💻 Políticas de proveedores — Dev

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Este documento describe la implementación técnica del módulo **Políticas de proveedores**, incluyendo arquitectura, APIs, modelos de datos, endpoints y lineamientos de desarrollo. Está orientado al equipo de desarrollo para asegurar consistencia, escalabilidad y correcta implementación dentro del sistema Aurora.
</div>

---
# 🧱 Contenido Planeado
---
## 🎨 Sistema de Diseño

### Componentes UI reutilizables

El módulo utiliza componentes estándar del sistema de diseño:
- `FormContainer`
- `FormSection`
- `InputText`
- `Select`
- `SelectMulti`
- `DateRangePicker`
- `NumberRangeInput`
- `Tabs`
- `DynamicTable`
- `Modal`
- `Toast / Alerts`

### Componentes específicos del módulo

Estructurados según el flujo de 2 pasos:
#### Paso 1 — Configuración base
- `PolicyForm`
- `PolicyBaseStep`
- `PolicySegmentation`
#### Paso 2 — Configuración de reglas
- `PolicyRulesStep`

### Builders de reglas
Cada sección de reglas es desacoplada y reutilizable:

- `PaymentConditionsBuilder`
- `CancellationRulesTable`
- `ReconfirmationConfig`
- `FreePolicyConfig`
- `AgeRangeConfig`

Estos componentes manejan:
- Estado local independiente
- Validaciones propias
- Emisión de datos normalizados

### Guías de estilo y tokens

- Grid base: **8px**
- Inputs uniformes
- Separación clara por secciones
- Estados:
  - Default
  - Error
  - Disabled
  - Loading
- Colores:
  - Primary → acciones principales  
  - Success → confirmación  
  - Warning → validaciones  
  - Danger → errores  

### Integración con Figma

El diseño sigue exactamente el flujo definido:
- Flujo dividido en **2 pasos**.
- Uso de **tabs para reglas**.
- Tablas dinámicas configurables.
- Validaciones progresivas
- Botón final: **Guardar y activar política**

## ⚙️ Especificaciones Técnicas

### Arquitectura del sistema

El módulo sigue una arquitectura en capas:

```txt
UI (Vue)
↓
Application Layer (Services / Composables)
↓
Domain (Entities / Business Rules)
↓
Infrastructure (API REST / DB)
```

#### Frontend

- Vue 3 + Composition API
- Manejo de estado: Pinia 
- Formularios reactivos  
- Validación en cliente + backend  

##### Manejo de estado

- Estado de política en creación (draft)
- Persistencia progresiva
- Separación entre:
  - Base config
  - Rules config

#### Backend

- API REST
- Validaciones de negocio centralizadas
- Base de datos relacional

### Flujo técnico del módulo

#### 1. Creación (Configuración base)

POST /provider-policies

- Se crea política en estado draft
- Se guardan:
  - Datos base
  - Segmentación

#### 2. Configuración de reglas

POST /provider-policies/:id/rules

- Se registran reglas por tipo:
  - payment_conditions
  - cancellation_rules
  - reconfirmation_rules
  - free_policies
  - age_ranges

#### 3. Activación y activación

PATCH /provider-policies/:id/activate

Validaciones:
- Datos base completos
- Al menos una regla válida
- Fechas correctas
Resultado:
- status → `active`

### Estructura de carpetas

```txt
/provider-policies
  /components
    PolicyForm.vue
    PolicyBaseStep.vue
    PolicySegmentation.vue
    PolicyRulesStep.vue
    /rules
      PaymentConditionsBuilder.vue
      CancellationRulesTable.vue
      ReconfirmationConfig.vue
      FreePolicyConfig.vue
      AgeRangeConfig.vue
  /views
    PolicyCreateView.vue
    PolicyEditView.vue
  /services
    providerPolicies.service.ts
  /store
    providerPolicies.store.ts
  /composables
    usePolicyForm.ts
    usePolicyRules.ts
  /types
    policy.types.ts
```

### APIs y endpoints

#### Base URL

```md
/api/provider-policies
```

#### Endpoints

##### 📌Crear política

POST /api/provider-policies

Body:

~~~json
{
  "name": "Política FIT USA",
  "operation_type": "FIT",
  "min_pax": 1,
  "max_pax": 15,
  "valid_from": "2025-01-01",
  "valid_to": "2025-12-31",
  "segments": {
    "markets": [],
    "clients": [],
    "seasons": [],
    "services": []
  }
}
~~~

Response:

~~~json
{
  "id": "uuid",
  "name": "Política FIT USA",
  "status": "draft"
}
~~~

##### 📌Obtener listado

GET /api/provider-policies

##### 📌Obtener detalle

GET /api/provider-policies/:id

##### 📌Actualizar política

PUT /api/provider-policies/:id

##### 📌Eliminar política

DELETE /api/provider-policies/:id

##### 📌Configurar reglas

POST /api/provider-policies/:id/rules

#### 📌Manejo de errores API

| Código | Descripción |
|------|------------|
| 400 | Datos inválidos |
| 404 | Política no encontrada |
| 500 | Error interno |

##### 📌Activar política

PATCH /api/provider-policies/:id/activate

Solo se puede activar si:
- Tiene configuración base completa
- Tiene al menos una regla válida

### 🗄️ Base de datos y modelos

#### Tabla: provider_policies

| Campo | Tipo |
|------|------|
| id | UUID |
| name | string |
| operation_type | enum |
| min_pax | int |
| max_pax | int |
| valid_from | date |
| valid_to | date |
| status | enum |

##### Estados de política

- Draft
- Activa
- Inactiva

#### Tabla: policy_segments

| Campo | Tipo |
|------|------|
| id | UUID |
| policy_id | FK |
| type | enum |
| value | string |

#### Tabla: payment_conditions

| Campo | Tipo |
|------|------|
| id | UUID |
| policy_id | FK |
| payment_type | enum |
| trigger | enum |
| amount | decimal |
| currency | string |
| due_days | int |
| order | int |

#### Tabla: cancellation_rules

| Campo | Tipo |
|------|------|
| id | UUID |
| policy_id | FK |
| days_before | int |
| penalty_type | enum |
| value | decimal |

#### Tabla: reconfirmation_rules

| Campo | Tipo |
|------|------|
| id | UUID |
| policy_id | FK |
| hours_before | int |

#### Tabla: free_policies

| Campo | Tipo |
|------|------|
| id | UUID |
| policy_id | FK |
| pax_required | int |
| free_pax | int |

#### Tabla: age_ranges

| Campo | Tipo |
|------|------|
| id | UUID |
| policy_id | FK |
| type | enum (infant/child) |
| min_age | int |
| max_age | int |
| description | text |

## ⚙️ Lógica de negocio clave

### Evaluación de cancelaciones

1. Ordenar reglas por days_before DESC.  
2. Seleccionar la primera regla que cumpla:  
   days_before <= diferencia entre fechas  
3. Aplicar penalidad correspondiente.

### Pagos en partes

- Permitir múltiples registros en payment_conditions.  
- Validar suma total = monto esperado (opcional).  
- Ordenados por order

### Liberados
```md
floor(total_pax / pax_required)
```

### Validaciones importantes

- min_pax <= max_pax  
- valid_from <= valid_to  
- No solapamiento de políticas activas (futuro)  
- Reglas de cancelación sin conflictos  

## 🛠️ Guías de Desarrollo

### Estándares de código

- camelCase → variables  
- PascalCase → componentes  
- Archivos organizados por dominio  

### Buenas prácticas

- No colocar lógica de negocio en componentes  
- Usar servicios/composables  
- Reutilizar componentes  
- Manejo centralizado de errores 

### Proceso de code review

Checklist:
 
✔ Código limpio y legible   
✔ Validaciones completas    
✔ Manejo de errores  
✔ Sin lógica duplicada    
✔ Tipado correcto    

### 🧪 Pruebas y QA

#### Pruebas unitarias

- Cálculo de penalidades  
- Validación de reglas  
- Cálculo de liberados  

#### Pruebas de integración

- APIs
- Persistencia correcta  
- Relaciones entre tablas  

#### Pruebas E2E

- Creación completa de política  
- Edición de política  
- Activación de política  
- Evaluación de cancelación  

#### Casos críticos

- Penalidad aplicada correctamente  
- Fechas válidas  
- Segmentación correcta  
- Reglas múltiples funcionando  
- Pagos en partes consistentes  
