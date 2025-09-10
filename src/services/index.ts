// Exportaciones centralizadas de servicios

// API principal
export { default as API } from './api';

// Servicios
export { authService } from './authService';
export { notesService } from './notesService';

// Tipos
export type {
  User,
  LoginData,
  RegisterData,
  AuthResponse,
  Note,
  CreateNoteData,
  UpdateNoteData,
  ApiResponse,
  ApiError,
  AuthState,
  NotesState,
  LoginFormData,
  RegisterFormData,
  NoteFormData,
  NoteCardProps,
  NoteEditorProps,
  UseAuthReturn,
  UseNotesReturn,
  ValidationError,
  FormErrors,
  RouteParams,
  NotesStats,
  NoteFilters,
  NoteEvent,
  NoteEventData,
} from './types';

// Constantes
export {
  API_BASE_URL,
  ENDPOINTS,
  STORAGE_KEYS,
  APP_CONFIG,
  AUTH_CONFIG,
  NOTES_CONFIG,
  UI_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_RULES,
  PAGINATION_CONFIG,
  SEARCH_CONFIG,
  SORT_CONFIG,
} from './constants';

// Utilidades
export {
  formatDate,
  formatRelativeDate,
  truncateText,
  generateId,
  isValidEmail,
  isValidPassword,
  capitalize,
  sanitizeText,
  extractKeywords,
  highlightSearchText,
  calculateReadingTime,
  generateNoteSummary,
  sortNotes,
  filterNotes,
  debounce,
  throttle,
  copyToClipboard,
  downloadFile,
  getNoteColor,
  getInitials,
} from './utils';
