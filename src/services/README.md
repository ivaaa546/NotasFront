# Servicios de la API

Esta carpeta contiene todos los servicios necesarios para conectar el frontend con la API del backend.

## Archivos

### `api.tsx`
Configuración principal de Axios con interceptores para:
- Agregar automáticamente el token JWT a las peticiones
- Manejar errores de autenticación (401)
- Redirigir al login cuando el token expira

### `authService.ts`
Servicio de autenticación que incluye:
- `register(data)` - Registrar nuevo usuario
- `login(data)` - Iniciar sesión
- `getProfile()` - Obtener perfil del usuario
- `updateProfile(data)` - Actualizar perfil
- `deleteAccount()` - Eliminar cuenta
- `logout()` - Cerrar sesión
- `isAuthenticated()` - Verificar si está autenticado
- `getToken()` - Obtener token actual
- `getCurrentUser()` - Obtener usuario actual

### `notesService.ts`
Servicio de notas que incluye:
- `getAllNotes()` - Obtener todas las notas
- `getNoteById(id)` - Obtener nota por ID
- `createNote(data)` - Crear nueva nota
- `updateNote(id, data)` - Actualizar nota
- `deleteNote(id)` - Eliminar nota
- `searchNotes(query)` - Buscar notas
- `getRecentNotes()` - Obtener notas recientes
- `getNotesStats()` - Obtener estadísticas

### `types.ts`
Definiciones de tipos TypeScript para:
- Usuarios y autenticación
- Notas y operaciones CRUD
- Estados de la aplicación
- Props de componentes
- Respuestas de la API

### `constants.ts`
Constantes de la aplicación:
- URLs y endpoints
- Claves de localStorage
- Configuración de la app
- Mensajes de error y éxito
- Reglas de validación

### `utils.ts`
Utilidades para:
- Formateo de fechas
- Validación de datos
- Manipulación de texto
- Búsqueda y filtrado
- Funciones de UI

### `index.ts`
Archivo de exportaciones centralizadas para importar fácilmente todos los servicios.

## Uso

```typescript
// Importar servicios específicos
import { authService, notesService } from './services';

// Importar tipos
import type { User, Note, LoginData } from './services';

// Importar utilidades
import { formatDate, truncateText } from './services';

// Ejemplo de uso
const login = async (email: string, password: string) => {
  try {
    const result = await authService.login({ email, passwordd: password });
    console.log('Login exitoso:', result);
  } catch (error) {
    console.error('Error de login:', error);
  }
};
```

## Configuración

Asegúrate de que tu backend esté corriendo en `http://localhost:3000` y que las variables de entorno estén configuradas correctamente.

## Notas Importantes

- El backend usa `passwordd` (con doble 'd') en el modelo
- Todas las rutas de notas requieren autenticación JWT
- El token se almacena en localStorage
- Los errores 401 redirigen automáticamente al login
