# Mini API de Notas - Frontend

Frontend básico para la aplicación de notas con autenticación JWT.

## 🚀 Características

- **Autenticación completa**: Login y registro de usuarios
- **Gestión de notas**: Crear, editar, ver y eliminar notas
- **Interfaz moderna**: Diseño responsive con Tailwind CSS
- **Navegación robusta**: React Router para rutas protegidas y navegación
- **Manejo de errores**: Feedback visual para el usuario

## 🛠️ Tecnologías

- **React 19** con TypeScript
- **React Router DOM** para navegación
- **Tailwind CSS** para estilos
- **Axios** para peticiones HTTP
- **Vite** como bundler

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/
│   │   ├── login-form.tsx      # Formulario de login
│   │   └── register-form.tsx   # Formulario de registro
│   ├── layout/
│   │   ├── navbar.tsx          # Barra de navegación
│   │   └── ProtectedRoute.tsx  # Componente para rutas protegidas
│   └── notes/
│       └── note-card.tsx       # Tarjeta de nota
├── pages/
│   ├── auth.tsx                # Página de autenticación
│   ├── dashboard.tsx           # Dashboard principal
│   ├── editor.tsx              # Editor de notas
│   └── profile.tsx             # Página de perfil
├── services/
│   ├── api.tsx                 # Configuración de Axios
│   ├── authService.ts          # Servicio de autenticación
│   ├── notesService.ts         # Servicio de notas
│   ├── types.ts                # Tipos TypeScript
│   ├── constants.ts            # Constantes
│   ├── utils.ts                # Utilidades
│   └── index.ts                # Exportaciones
├── App.tsx                     # Componente principal
└── main.tsx                    # Punto de entrada
```

## 🚀 Instalación y Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Asegúrate de que tu backend esté corriendo
```bash
# En otra terminal, en la carpeta backend
cd ../backend
npm run dev
```

### 3. Ejecutar el frontend
```bash
npm run dev
```

### 4. Abrir en el navegador
```
http://localhost:5173
```

## 📱 Funcionalidades

### Autenticación
- **Registro**: Crear nueva cuenta con nombre, email y contraseña
- **Login**: Iniciar sesión con email y contraseña
- **Logout**: Cerrar sesión y limpiar datos

### Gestión de Notas
- **Crear**: Nueva nota con título y contenido
- **Editar**: Modificar notas existentes
- **Ver**: Visualizar nota completa
- **Eliminar**: Borrar notas con confirmación
- **Listar**: Ver todas las notas en dashboard

### Perfil de Usuario
- **Ver perfil**: Información del usuario
- **Editar perfil**: Actualizar nombre
- **Eliminar cuenta**: Borrar cuenta permanentemente

## 🔧 Configuración

### Variables de Entorno
Asegúrate de que tu backend esté configurado con:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `JWT_SECRET`

### API Endpoints
El frontend se conecta a:
- `http://localhost:3000/api/usuarios/*` - Autenticación
- `http://localhost:3000/api/notas/*` - Gestión de notas

## 🎨 Diseño

- **Colores**: Paleta azul moderna con Tailwind CSS
- **Responsive**: Mobile-first design
- **Componentes**: Reutilizables y modulares
- **Estados**: Loading, error y success states

## 📝 Notas Importantes

1. **Autenticación**: Todas las rutas de notas requieren JWT token
2. **Navegación**: React Router con rutas protegidas
3. **Validación**: Validaciones básicas en frontend
4. **Errores**: Manejo de errores con feedback visual
5. **Persistencia**: Token y usuario en localStorage
6. **Rutas protegidas**: Componente ProtectedRoute para autenticación

## 🐛 Solución de Problemas

### Error de CORS
Si tienes problemas de CORS, asegúrate de que tu backend tenga CORS habilitado.

### Error 401
Si recibes errores 401, verifica que:
- El token esté en localStorage
- El backend esté corriendo
- Las credenciales sean correctas

### Error de conexión
Verifica que:
- El backend esté en `http://localhost:3000`
- No haya firewall bloqueando la conexión
- Las variables de entorno estén configuradas

## 🔄 Flujo de la Aplicación

1. **Usuario no autenticado** → Página de login/registro (`/login`)
2. **Login exitoso** → Dashboard con notas (`/dashboard`)
3. **Crear nota** → Editor de notas (`/editor`)
4. **Editar nota** → Editor con datos precargados (`/editor?id=123`)
5. **Ver perfil** → Página de perfil (`/profile`)
6. **Logout** → Volver a login (`/login`)

## 🛣️ Rutas de la Aplicación

- **`/`** - Redirige a `/dashboard` si está autenticado, sino a `/login`
- **`/login`** - Página de autenticación (login/registro)
- **`/dashboard`** - Dashboard principal con lista de notas (protegida)
- **`/editor`** - Editor para crear nueva nota (protegida)
- **`/editor?id=123`** - Editor para editar nota existente (protegida)
- **`/editor?id=123&view=true`** - Vista de solo lectura de nota (protegida)
- **`/profile`** - Página de perfil del usuario (protegida)
- **`/*`** - Página 404 para rutas no encontradas

## 📚 Próximos Pasos

Para mejorar la aplicación, podrías agregar:
- Context API para estado global
- Hooks personalizados
- Validación más avanzada
- Búsqueda de notas
- Categorías de notas
- Tema oscuro
- PWA capabilities
- Lazy loading de componentes
- Mejores animaciones