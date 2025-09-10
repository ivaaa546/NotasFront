// Tipos globales para la aplicación

// Tipos de autenticación
export interface User {
  id: string;
  nombre: string;
  email: string;
  passwordd?: string; // Solo para respuestas del servidor
}

export interface LoginData {
  email: string;
  passwordd: string;
}

export interface RegisterData {
  nombre: string;
  email: string;
  passwordd: string;
}

export interface AuthResponse {
  token: string;
  user?: User;
}

// Tipos de notas
export interface Note {
  id: string;
  titulo: string;
  contenido: string;
  usuario_id: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface CreateNoteData {
  titulo: string;
  contenido: string;
}

export interface UpdateNoteData {
  titulo?: string;
  contenido?: string;
}

// Tipos de API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  error: string;
  message?: string;
  status?: number;
}

// Tipos de estado
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filteredNotes: Note[];
}

// Tipos de formularios
export interface LoginFormData {
  email: string;
  passwordd: string;
}

export interface RegisterFormData {
  nombre: string;
  email: string;
  passwordd: string;
  confirmPassword: string;
}

export interface NoteFormData {
  titulo: string;
  contenido: string;
}

// Tipos de componentes
export interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onView: (note: Note) => void;
}

export interface NoteEditorProps {
  note?: Note;
  onSave: (data: CreateNoteData | UpdateNoteData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// Tipos de hooks
export interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export interface UseNotesReturn {
  notes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filteredNotes: Note[];
  createNote: (data: CreateNoteData) => Promise<void>;
  updateNote: (id: string, data: UpdateNoteData) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getNoteById: (id: string) => Promise<Note>;
  searchNotes: (query: string) => void;
  clearSearch: () => void;
}

// Tipos de validación
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Tipos de navegación
export interface RouteParams {
  id?: string;
}

// Tipos de estadísticas
export interface NotesStats {
  total: number;
  recent: number;
  thisWeek: number;
}

// Tipos de filtros
export interface NoteFilters {
  search: string;
  sortBy: 'fecha_creacion' | 'fecha_actualizacion' | 'titulo';
  sortOrder: 'asc' | 'desc';
}

// Tipos de eventos
export type NoteEvent = 'created' | 'updated' | 'deleted' | 'viewed';

export interface NoteEventData {
  note: Note;
  event: NoteEvent;
  timestamp: string;
}
