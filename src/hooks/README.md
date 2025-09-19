# Hooks Personalizados

Esta carpeta contiene hooks personalizados que encapsulan lógica reutilizable y simplifican el manejo de estado en los componentes.

## Hooks Disponibles

### `useAuth`
Hook para manejo de autenticación y estado del usuario.

**Funcionalidades:**
- Estado de autenticación
- Login y registro
- Logout
- Actualización de perfil
- Eliminación de cuenta

**Uso:**
```tsx
import { useAuth } from '../hooks';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Usar el estado y funciones de autenticación
}
```

### `useNotes`
Hook para manejo de notas y operaciones CRUD.

**Funcionalidades:**
- Cargar todas las notas
- Crear nueva nota
- Actualizar nota existente
- Eliminar nota
- Obtener nota por ID
- Manejo de estados de carga y errores

**Uso:**
```tsx
import { useNotes } from '../hooks';

function NotesComponent() {
  const { notes, isLoading, error, loadNotes, createNote } = useNotes();
  
  // Usar el estado y funciones de notas
}
```

### `useForm`
Hook genérico para manejo de formularios con validación.

**Funcionalidades:**
- Estado del formulario
- Validación personalizada
- Manejo de errores
- Estados de carga
- Reset del formulario
- Manejo de cambios

**Uso:**
```tsx
import { useForm } from '../hooks';

function MyForm() {
  const {
    data,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    setError
  } = useForm({
    initialData: { name: '', email: '' },
    validate: (data) => {
      // Lógica de validación
    },
    onSubmit: async (data) => {
      // Lógica de envío
    }
  });
}
```

### `useDialog`
Hook para manejo de diálogos modales.

**Funcionalidades:**
- Estado de apertura/cierre
- Datos del diálogo
- Funciones de control

**Uso:**
```tsx
import { useDialog } from '../hooks';

function MyComponent() {
  const { isOpen, data, openDialog, closeDialog } = useDialog();
  
  // Usar el estado del diálogo
}
```

## Beneficios

1. **Reutilización**: Lógica común extraída y reutilizable
2. **Separación de responsabilidades**: Cada hook tiene una responsabilidad específica
3. **Facilidad de testing**: Hooks pueden ser probados independientemente
4. **Mantenibilidad**: Cambios en la lógica se centralizan en un lugar
5. **Consistencia**: Comportamiento uniforme en toda la aplicación

## Patrones de Uso

### Combinación de Hooks
```tsx
function Dashboard() {
  const { user } = useAuth();
  const { notes, loadNotes } = useNotes();
  const { isOpen, openDialog, closeDialog } = useDialog();
  
  // Combinar funcionalidades de múltiples hooks
}
```

### Hooks con Validación
```tsx
const form = useForm({
  initialData: { email: '', password: '' },
  validate: (data) => {
    const errors = {};
    if (!data.email) errors.email = 'Email requerido';
    if (!data.password) errors.password = 'Contraseña requerida';
    return errors;
  },
  onSubmit: async (data) => {
    // Lógica de envío
  }
});
```

## Estructura de Archivos

```
hooks/
├── index.ts          # Exportaciones principales
├── useAuth.ts        # Hook de autenticación
├── useNotes.ts       # Hook de notas
├── useForm.ts        # Hook de formularios
├── useDialog.ts      # Hook de diálogos
└── README.md         # Documentación
```
