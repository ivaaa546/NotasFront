# Arquitectura de Hooks

## Estructura de la Carpeta Hooks

```
src/hooks/
├── index.ts              # Exportaciones centralizadas
├── useAuth.ts            # Autenticación y usuario
├── useNotes.ts           # Gestión de notas
├── useForm.ts            # Formularios genéricos
├── useDialog.ts          # Diálogos modales
├── README.md             # Documentación de uso
└── ARCHITECTURE.md       # Este archivo
```

## Flujo de Datos

### Antes (Componentes con lógica dispersa)
```
Componente
├── useState (múltiples estados)
├── useEffect (efectos secundarios)
├── Funciones de manejo
└── Lógica de negocio mezclada
```

### Después (Con hooks personalizados)
```
Componente
├── useAuth() → Estado de autenticación
├── useNotes() → Estado de notas
├── useForm() → Estado de formulario
└── useDialog() → Estado de diálogos
```

## Hooks y sus Responsabilidades

### 🔐 useAuth
**Responsabilidad**: Gestión completa de autenticación
- Estado del usuario
- Login/Logout
- Registro
- Actualización de perfil
- Eliminación de cuenta

**Estados que maneja**:
- `user`: Usuario actual
- `isAuthenticated`: Estado de autenticación
- `isLoading`: Estado de carga

### 📝 useNotes
**Responsabilidad**: Operaciones CRUD de notas
- Cargar notas
- Crear nota
- Actualizar nota
- Eliminar nota
- Obtener nota por ID

**Estados que maneja**:
- `notes`: Lista de notas
- `isLoading`: Estado de carga
- `error`: Errores de operaciones

### 📋 useForm
**Responsabilidad**: Manejo genérico de formularios
- Estado del formulario
- Validación
- Manejo de errores
- Estados de carga
- Reset del formulario

**Estados que maneja**:
- `data`: Datos del formulario
- `errors`: Errores de validación
- `isLoading`: Estado de carga
- `isDirty`: Cambios sin guardar

### 💬 useDialog
**Responsabilidad**: Control de diálogos modales
- Estado de apertura/cierre
- Datos del diálogo
- Funciones de control

**Estados que maneja**:
- `isOpen`: Estado de apertura
- `data`: Datos del diálogo

## Beneficios de la Arquitectura

### 1. **Separación de Responsabilidades**
- Cada hook tiene una responsabilidad específica
- Lógica de negocio separada de la presentación
- Fácil mantenimiento y testing

### 2. **Reutilización**
- Hooks pueden ser usados en múltiples componentes
- Lógica común centralizada
- Consistencia en el comportamiento

### 3. **Testabilidad**
- Hooks pueden ser probados independientemente
- Mocking más fácil
- Tests más enfocados

### 4. **Mantenibilidad**
- Cambios centralizados
- Menos duplicación de código
- Estructura más clara

## Patrones de Uso

### Combinación de Hooks
```tsx
function Dashboard() {
  const { user } = useAuth();           // Estado de usuario
  const { notes, loadNotes } = useNotes(); // Estado de notas
  const { isOpen, openDialog } = useDialog(); // Estado de diálogo
  
  // Lógica del componente simplificada
}
```

### Hooks con Validación
```tsx
const form = useForm({
  initialData: { email: '', password: '' },
  validate: (data) => {
    // Validación personalizada
  },
  onSubmit: async (data) => {
    // Lógica de envío
  }
});
```

## Migración de Componentes

### Antes
```tsx
function LoginForm() {
  const [formData, setFormData] = useState({...});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => { /* lógica */ };
  const handleSubmit = async (e) => { /* lógica */ };
  
  // Mucho código repetitivo
}
```

### Después
```tsx
function LoginForm() {
  const { login } = useAuth();
  const { data, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialData: { email: '', password: '' },
    onSubmit: async (data) => {
      await login(data);
    }
  });
  
  // Código limpio y enfocado
}
```

## Consideraciones de Performance

### 1. **useCallback y useMemo**
- Hooks internos usan `useCallback` para optimizar re-renders
- Funciones estables para evitar re-renders innecesarios

### 2. **Dependencias de useEffect**
- Dependencias correctas para evitar loops infinitos
- Cleanup de efectos secundarios

### 3. **Estado Mínimo**
- Solo el estado necesario en cada hook
- Evitar estado redundante

## Extensibilidad

### Agregar Nuevos Hooks
1. Crear archivo en `src/hooks/`
2. Implementar la lógica del hook
3. Exportar en `index.ts`
4. Documentar en `README.md`

### Ejemplo: useTheme
```tsx
// src/hooks/useTheme.ts
export function useTheme() {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  return { theme, toggleTheme };
}
```

## Testing de Hooks

### Estrategia de Testing
1. **Unit Tests**: Cada hook individualmente
2. **Integration Tests**: Hooks combinados
3. **Component Tests**: Componentes usando hooks

### Ejemplo de Test
```tsx
import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';

test('should login user', async () => {
  const { result } = renderHook(() => useAuth());
  
  await act(async () => {
    await result.current.login({ email: 'test@test.com', password: '123456' });
  });
  
  expect(result.current.isAuthenticated).toBe(true);
});
```
