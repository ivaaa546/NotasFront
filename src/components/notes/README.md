# Componentes de Notas

Esta carpeta contiene todos los componentes relacionados con la gestión de notas.

## Componentes

### `note-card.tsx`
Tarjeta individual para mostrar una nota con acciones básicas.

**Props:**
- `note: Note` - Datos de la nota
- `onEdit: (note: Note) => void` - Función para editar la nota
- `onDelete: (id: string) => void` - Función para eliminar la nota
- `onView: (note: Note) => void` - Función para ver la nota

**Características:**
- Muestra título y contenido truncado
- Botones de acción (Ver, Editar, Eliminar)
- Fechas de creación y actualización
- Confirmación antes de eliminar

### `create-note-dialog.tsx`
Modal para crear una nueva nota.

**Props:**
- `isOpen: boolean` - Estado de apertura del modal
- `onClose: () => void` - Función para cerrar el modal
- `onSave: (data: CreateNoteData) => Promise<void>` - Función para guardar la nota
- `isLoading?: boolean` - Estado de carga

**Características:**
- Formulario con validación
- Manejo de errores
- Estado de carga
- Limpieza automática al cerrar

### `edit-note-dialog.tsx`
Modal para editar una nota existente.

**Props:**
- `isOpen: boolean` - Estado de apertura del modal
- `onClose: () => void` - Función para cerrar el modal
- `onSave: (id: string, data: UpdateNoteData) => Promise<void>` - Función para guardar cambios
- `note: Note | null` - Nota a editar
- `isLoading?: boolean` - Estado de carga

**Características:**
- Pre-carga los datos de la nota
- Formulario con validación
- Manejo de errores
- Estado de carga

### `notes-grid.tsx`
Componente principal para mostrar la grilla de notas con funcionalidades completas.

**Props:**
- `notes: Note[]` - Array de notas
- `onNotesChange: () => void` - Función para refrescar las notas
- `isLoading?: boolean` - Estado de carga

**Características:**
- Grilla responsive de notas
- Botón flotante para crear nota
- Integración con diálogos de crear/editar
- Estado vacío personalizado
- Manejo completo de CRUD

### `note-editor-page.tsx`
Página completa para editar/crear notas con funcionalidades avanzadas.

**Props:**
- `note?: Note` - Nota a editar (opcional para nueva nota)
- `onSave: (data: CreateNoteData | UpdateNoteData) => Promise<void>` - Función para guardar
- `onCancel: () => void` - Función para cancelar
- `isLoading?: boolean` - Estado de carga
- `isViewMode?: boolean` - Modo de solo lectura

**Características:**
- Editor de texto completo
- Atajos de teclado (Ctrl+S para guardar)
- Indicador de cambios sin guardar
- Modo de solo lectura
- Validación de formulario
- Manejo de errores

## Uso

### Dashboard con grilla completa
```tsx
import NotesGrid from '../components/notes/notes-grid';

<NotesGrid 
  notes={notes} 
  onNotesChange={handleNotesChange}
  isLoading={isLoading}
/>
```

### Editor de página completa
```tsx
import NoteEditorPage from '../components/notes/note-editor-page';

<NoteEditorPage
  note={note}
  onSave={handleSave}
  onCancel={handleCancel}
  isLoading={isSaving}
  isViewMode={isViewMode}
/>
```

### Diálogos modales
```tsx
import CreateNoteDialog from '../components/notes/create-note-dialog';
import EditNoteDialog from '../components/notes/edit-note-dialog';

<CreateNoteDialog
  isOpen={isCreateOpen}
  onClose={() => setIsCreateOpen(false)}
  onSave={handleCreateNote}
  isLoading={isCreating}
/>

<EditNoteDialog
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  onSave={handleUpdateNote}
  note={selectedNote}
  isLoading={isUpdating}
/>
```

## Características Técnicas

- **TypeScript** - Tipado completo
- **Tailwind CSS** - Estilos modernos y responsive
- **Manejo de estado** - Estado local en cada componente
- **Validación** - Validación de formularios
- **Manejo de errores** - Feedback visual para errores
- **Loading states** - Estados de carga
- **Accesibilidad** - Labels y navegación por teclado
- **Responsive** - Diseño adaptable a diferentes pantallas

## Flujo de Trabajo

1. **Dashboard** muestra `NotesGrid`
2. **NotesGrid** maneja la lista y botón de crear
3. **Crear nota** abre `CreateNoteDialog`
4. **Editar nota** abre `EditNoteDialog`
5. **Editor completo** usa `NoteEditorPage`
6. **Acciones** se comunican con el servicio de notas
