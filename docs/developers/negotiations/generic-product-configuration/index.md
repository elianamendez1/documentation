---
title: Configuración de producto genérico (Dev)
description: Documentación técnica del módulo de configuración de servicios para desarrolladores
---

# 💻 Configuración de producto genérico – Dev

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Este documento describe la implementación técnica del módulo **Configuración de producto genérico**, incluyendo arquitectura, componentes, modelo de datos, APIs y reglas de negocio.

Este módulo representa una capa crítica dentro del flujo de creación de servicios, ya que traduce la definición funcional en configuraciones operativas consumibles por múltiples sistemas.

Se basa en tres principios clave:
- **Desacoplamiento:** Configuración independiente de contenido e imágenes  
- **Guardado progresivo (autosave):** Persistencia parcial sin bloqueo  
- **Flujo no bloqueante:** El usuario puede avanzar sin completar toda la información  
</div>

---
# 🧱 Contenido Planeado
---
## 🎨 Sistema de Diseño

### 🧩 Componentes UI reutilizables

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

La interfaz sigue el patrón **Sidebar + Panel dinámico**, como se observa en Figma.

El formulario es **reactivo y condicional**, adaptándose al tipo de servicio:
- **Simple:** configuración directa
- **Compuesto:** depende de estructura previa
</div>

#### Componentes principales

- **FormContainer**
  - Maneja estados globales (loading, error, success)
  - Control de autosave (debounce 500ms – 1000ms recomendado)
  - Maneja dirty state
  - Orquestador de validaciones

- **InputText**
  - Soporta estados:
    - disabled (solo lectura)
    - readonly
  - Validación en tiempo real

- **SelectAsync**
  - Integrado con catálogos backend
  - Lazy loading
  - Caching por sesión

- **TimeInput**
  - Input inteligente
  - Normalización automática:
    - `"9"` → `"09:00"`
    - `"14"` → `"14:00"`
  - Validación de formato HH:mm

- **ScheduleMatrix** ⚠️ (CRÍTICO)

  Representa la grilla de horarios por día.
  Funcionalidad:
  - Activación/desactivación por día
  - Rango horario (inicio / fin)
  - Replica automática inicial
  - Ruptura de replicación al editar manualmente
  Regla clave:
  - La primera configuración se replica automáticamente
  - Si el usuario edita un día manualmente → se rompe la replicación
  - Permite marcar días como “No disponible”

- **OperativeModeSelector**
  - Opciones:
    - Todos los días
    - Personalizado

- **StatusSelector**
  - Estados:
    - active
    - inactive
    - suspended
  - Habilita dinámicamente `status_reason`

### 🎯 Guías de estilo y tokens

- Espaciado: escala 8px
- Inputs: 40px altura
- Estados visuales:
  - Warning → validaciones no bloqueantes
  - Disabled → campos informativos
- Tipografía:
  - Labels: 12px
  - Inputs: 14px

### 🔗 Integración con Figma

- El diseño sigue estructura:
  - Sidebar fijo
  - Panel dinámico
- Estados definidos:
  - Loading
  - Empty
  - Error
  - Success

## ⚙️ Especificaciones Técnicas

### Arquitectura del sistema

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

El módulo sigue una arquitectura desacoplada basada en servicios, permitiendo persistencia parcial y consumo transversal.
</div>

#### Capas

- **Frontend**
  - Vite + Vue
  - Manejo de estado (Pinia)
  - Formularios controlados

- **Backend**
  - API REST
  - Validaciones de negocio
  - Soporte para autosave

- **Base de datos**
  - Modelo relacional
  - Soporte para datos incompletos (nullable fields)

### 🔌 APIs y endpoints

#### 📌 Obtener configuración

```http
GET /api/services/{serviceId}/configuration
```

**Response:**
```json
{
  "serviceId": "uuid",
  "type": "simple | composed",
  "name": "City Tour Lima",
  "mode": "SIM",
  "profile": "opcional",
  "startPointId": "uuid",
  "endPointId": "uuid",
  "duration": 240,
  "isAutomaticDuration": false,
  "status": "active",
  "schedules": []
}
```
#### 📌 Guardado progresivo (autosave)

```http
PATCH /api/services/{serviceId}/configuration
```

Características:
- Partial update
- No requiere payload completo
- Idempotente
- No bloqueante

Ejemplo:
```json
{
  "duration": 180
}
```

#### 📌 Obtener catálogos

```http
GET /api/catalogs/points
```

```http
GET /api/catalogs/service-status
```

## 🧠 Lógica de negocio clave

### 📌 Tipo de servicio

| Tipo       | Comportamiento                          |
|------------|----------------------------------------|
| simple     | Configuración directa                  |
| compuesto  | Depende de estructura + calculadora    |

### 📌 Modalidad (derivada)

```text
category (DB) → mode (UI)
```
| category      | mode                        |
|------------|--------------------------------|
| PC    | Privado                 |
| SIM   | Compartido                 |
| SIC   | Semi privado                 |
| N    | No aplica                 |

Reglas:
- No editable en frontend
- Derivado automáticamente
- Impacta en:
  - Tarifas
  - Lógica operativa
  - Visibilidad de campos

###  📌 Perfil

| Tipo de servicio | Comportamiento |
|------------------|----------------|
| Simple | Visible |
| Compuesto | Oculto |

- Proviene de configuración de ciudad
- No editable en este módulo

### 📌 Duración
| Caso | Regla |
|------|-------|
| Lima Tours | Automático |
| Otros | Manual |
 
Reglas:
- Se recalcula si cambia proveedor
- En servicios compuestos puede depender de estructura

### 📌 Estado
- Default: active

Regla:
- Si estado ≠ active → requiere status_reason (máx 150 caracteres)

### 📌 Rangos operativos (CRÍTICO)
- Configuración por día
- Replica automática inicial
- Domingo puede ser “No disponible”

Reglas:
- Permite múltiples horarios (futuro)
- Configuración flexible:
  - 24 horas
  - Personalizado

## 🗄️ Base de datos y modelos

### 📌 Tabla: `services`

| Campo | Tipo |
|-------|------|
| id | uuid |
| name | varchar |
| type | enum |
| category | enum |

### 📌 Tabla: `service_configuration`

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Tabla principal que almacena la configuración operativa del servicio. Existe una relación 1:1 con la tabla `services`.
</div>

| Campo | Tipo |
|------|------|
| id | uuid |
| service_id | uuid |
| start_point_id | uuid |
| end_point_id | uuid |
| duration | int |
| is_auto_duration | boolean |
| status | enum |
| status_reason | varchar |

### 📌 Tabla: `service_schedule`

<div style="text-align: justify; line-height:1.7; margin-top:12px;">

Permite configurar los horarios operativos del servicio por día de la semana.
</div>

| Campo | Tipo |
|------|------|
| id | uuid |
| service_id | uuid |
| day_of_week | int |
| start_time | time |
| end_time | time |
| is_active | boolean |

#### 🔁 Relaciones clave

- `services → service_configuration (1:1)`
- `services → service_schedule (1:N)`

## 🧑‍💻 Guías de Desarrollo

### 📏 Estándares de código
- Uso de TypeScript obligatorio
- Naming:
  - camelCase (frontend)
  - snake_case (DB)
- Separación por capas:
  - services
  - repositories
  - controllers

### 🔄 Proceso de code review

Checklist obligatorio:

✔ Validaciones de negocio implementadas  
✔ Manejo de errores  
✔ Pruebas unitarias  
✔ No hardcode de catálogos  
✔ Consistencia con modelo funcional  
✔ Cobertura mínima de prueba  
### 🧪 Pruebas y QA

Tipos de pruebas
- Unitarias:
  - Validación de horarios
  - Reglas de duración
  - Estado del servicio
- Integración:
  - Persistencia parcial
  - Autosave
- E2E:
  - Flujo completo:
    - Creación → Configuración → Tarifas