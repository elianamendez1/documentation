---
title: Creación de producto genérico (Dev)
description: Documentación técnica del módulo de creación de productos genéricos
---

# 💻 Creación de producto genérico — Dev 🚧

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Documentación técnica del módulo **Creación de producto genérico**, orientada al equipo de desarrollo.
Este módulo permite la creación desacoplada de productos turísticos y su posterior asociación con múltiples proveedores mediante un flujo guiado en dos etapas.

El objetivo técnico es garantizar:
- Escalabilidad del modelo de productos
- Reutilización de configuraciones
- Separación clara entre producto y proveedor
- Validaciones en tiempo real sin bloquear UX
</div>

---
# 🧱 Contenido Planeado
---

## 🎨 Sistema de Diseño

### Componentes UI reutilizables

Componentes necesarios según el flujo:

- `Stepper / Progress indicator`
- `Input con validación en tiempo real`
- `Autocomplete / Suggestions`
- `Alert (warning / error / success)`
- `DataTable con selección múltiple`
- `Checkbox (individual / select all)`
- `Dual panel selector (disponibles vs seleccionados)`
- `Empty state`
- `Loader / Skeleton`
- `Modal de confirmación`
- `Tag / Badge de estado`

### Guías de estilo y tokens

- Colores:
  - Warning → Amarillo
  - Error → Rojo
  - Success → Verde
- Estados visuales UI:
  - **Default**
  - **Focus**
  - **Error**
  - **Warning**
  - **Disabled**
  - **Loading**
- Reglas UX clave:
  - Validaciones NO bloquean escritura
  - Alertas permiten continuar
  - Feedback inmediato en inputs
- Tipografía consistente con sistema base
- Espaciados definidos por design tokens

### Integración con Figma

Claves del flujo:
- Flujo dividido en:
  - Paso 1: Configuración
  - Paso 2: Proveedores
- Subdivisión del paso 2 en **3 fases internas**:
  1. Búsqueda (filtros + search)
  2. Transición (**botón "Continuar" obligatorio**)
  3. Selección
- Layout:
  - Panel izquierdo → proveedores disponibles
  - Panel derecho → seleccionados
- Regla crítica:
  - El botón **“Continuar” NO depende de resultados**
  - Solo cambia el estado del flujo

## ⚙️ Especificaciones Técnicas

### Arquitectura del sistema

**Patrón sugerido:**
- Frontend: Vue 3 / React
- Backend: API REST
- Patrón: Clean Architecture / Modular Architecture

**Capas:**
- UI → Componentes
- Application → flujo del wizard
- Domain → reglas de negocio
- Infrastructure → API / DB

### APIs y endpoints

#### Producto genérico

##### 📌Crear producto base
```http
POST /generic-products
```
Body:

```json
{
  "service_type_id": 1,
  "code": "EX123456",
  "name": "Excursión Valle Sagrado"
}
```
##### 📌Validar nombre (similitud)

```http
GET /generic-products/validate-name?name=Valle Sagrado
```

Response:

```json
{
  "similar": true,
  "matches": ["Excursión Valle Sagrado Full Day"]
}
```
##### 📌Validar código (tiempo real)
```http
GET /generic-products/validate-code?code=EX123456
```

Response:
```json
{
  "exists": true,
  "suggestions": ["EX123457", "EX123458"]
}
```

#### Proveedores

##### 📌Listar proveedores
```http
GET /suppliers
```

Query params:
- `type`
- `state_id`
- `search`

##### 📌Asignar proveedores

```http
POST /generic-products/{id}/suppliers
```

Body:

```json
{
  "suppliers": [1, 2, 3]
}
```

## 🗄️ Base de datos y modelos

### Tabla: `generic_products`

| Campo | Tipo |
|------|------|
| id | PK |
| service_type_id | FK |
| code | string (unique) |
| name | string |
| created_at | timestamp |

### Tabla: `service_types`

| Campo | Tipo |
|------|------|
| id | PK |
| name | string |
| code | string |

### Tabla: `suppliers`

| Campo | Tipo |
|------|------|
| id | PK |
| name | string |
| code | string |
| status | enum |

### Tabla: `supplier_place_operations`

| Campo | Tipo |
|------|------|
| id | PK |
| supplier_id | FK |
| state_id | FK |

### Tabla pivote: `generic_product_suppliers`

| Campo | Tipo |
|------|------|
| id | PK |
| generic_product_id | FK |
| supplier_id | FK |

## 🧠 Lógica de negocio clave

### Validación de código

- Debe ser único
- Validación en tiempo real
- No bloquea flujo
- Puede sugerir alternativas

### Validación de nombre

- Comparación por similitud (LIKE / fuzzy search)
- Retorna coincidencias
- Permite continuar bajo advertencia

### Flujo del sistema

Paso 1:
- Input datos
- Validación
- Guardar → estado = PARTIAL

Paso 2:
Fase 1 → Filtros + búsqueda
Fase 2 → Click en "Continuar"
Fase 3 → Selección
Fase 4 → Confirmación
→ Guardar → estado = COMPLETE

### Estados del producto

| Estado | Descripción |
|------|------------|
| Draft | Producto sin proveedores |
| Partial | Datos base completos |
| Complete | Con proveedores asignados |

### Lógica de proveedores

- Filtros combinables
- Persistencia de selección
- Estados:
  - Activo → visible
  - En evaluación → visible
  - Inactivo → oculto por defecto
  - Suspendido → no visible

### Reglas críticas del frontend
- Persistir selección al filtrar
- No perder estado entre fases
- Separar:
  - búsqueda
  - selección
  - Botón Continuar = cambio de estado UI

### Flujo obligatorio

1. Crear producto base
2. Guardar
3. Cargar proveedores
4. Aplicar filtros
5. Click en **Continuar**
6. Selección
7. Confirmación
8. Guardado final

## 🧪 Guías de Desarrollo

### Estándares de código

- Uso de TypeScript
- Componentización
- Naming consistente:
  - `genericProduct`
  - `supplierSelection`
- Separación de responsabilidades

### Manejo de estado (frontend)

Estado del módulo en el cliente:

```js
{
  step: 1,
  phase: "search", // search | transition | selection
  product: {},
  suppliers: [],
  filteredSuppliers: [],
  selectedSuppliers: [],
  filters: {},
  loading: false
}
```

### Proceso de code review

Checklist:

✔ Validaciones implementadas  
✔ Estados UI correctos  
✔ Performance en filtros  
✔ Manejo de errores  
✔ Alineación con Figma  

### Pruebas y QA

#### Unit tests

- Validación de código
- Validación de nombre
- Selección de proveedores

#### Integration tests

- Flujo completo:
  - Crear producto
  - Asignar proveedores
  - Guardar

#### Casos críticos

- Código duplicado
- Nombre similar
- Sin proveedores
- Filtros sin resultados
- Cambio de estado de proveedor
- Click en “Continuar” sin resultados

#### Estados a probar

- Loading
- Empty (sin proveedores)
- Error (API fail)
- Success (producto creado)
