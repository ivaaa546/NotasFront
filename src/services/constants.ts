// Constantes de la aplicación

// URLs de la API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Endpoints
export const ENDPOINTS = {
  // Autenticación
  AUTH: {
    REGISTER: "/usuarios/registro",
    LOGIN: "/usuarios/login",
    PROFILE: "/usuarios/perfil",
    USERS: "/usuarios",
  },
  // Notas
  NOTES: {
    BASE: "/notas",
    BY_ID: (id: string) => `/notas/${id}`,
  },
} as const;

// Claves de localStorage
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  THEME: "theme",
  NOTES_FILTER: "notes_filter",
} as const;

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: "Mini API de Notas",
  VERSION: "1.0.0",
  DESCRIPTION: "Aplicación de notas con autenticación JWT",
  AUTHOR: "Tu Nombre",
} as const;

// Configuración de autenticación
export const AUTH_CONFIG = {
  TOKEN_EXPIRY: "1h", // Tiempo de expiración del token
  REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutos antes de expirar
} as const;

// Configuración de notas
export const NOTES_CONFIG = {
  MAX_TITLE_LENGTH: 100,
  MAX_CONTENT_LENGTH: 10000,
  SEARCH_DEBOUNCE: 300, // ms
  AUTO_SAVE_INTERVAL: 30 * 1000, // 30 segundos
} as const;

// Configuración de UI
export const UI_CONFIG = {
  ANIMATION_DURATION: 200, // ms
  TOAST_DURATION: 3000, // ms
  MODAL_ANIMATION: "fade",
  CARD_HOVER_EFFECT: true,
} as const;

// Mensajes de error
export const ERROR_MESSAGES = {
  // Autenticación
  INVALID_CREDENTIALS: "Credenciales inválidas",
  USER_NOT_FOUND: "Usuario no encontrado",
  EMAIL_ALREADY_EXISTS: "El email ya está registrado",
  PASSWORD_TOO_SHORT: "La contraseña debe tener al menos 6 caracteres",
  TOKEN_EXPIRED: "Sesión expirada, por favor inicia sesión nuevamente",
  
  // Notas
  NOTE_NOT_FOUND: "Nota no encontrada",
  INVALID_NOTE_DATA: "Datos de nota inválidos",
  NOTE_SAVE_ERROR: "Error al guardar la nota",
  NOTE_DELETE_ERROR: "Error al eliminar la nota",
  
  // Red
  NETWORK_ERROR: "Error de conexión, verifica tu internet",
  SERVER_ERROR: "Error del servidor, intenta más tarde",
  TIMEOUT_ERROR: "Tiempo de espera agotado",
  
  // General
  UNKNOWN_ERROR: "Error desconocido",
  VALIDATION_ERROR: "Error de validación",
} as const;

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  // Autenticación
  LOGIN_SUCCESS: "¡Bienvenido!",
  REGISTER_SUCCESS: "¡Cuenta creada exitosamente!",
  LOGOUT_SUCCESS: "Sesión cerrada",
  PROFILE_UPDATED: "Perfil actualizado",
  
  // Notas
  NOTE_CREATED: "Nota creada exitosamente",
  NOTE_UPDATED: "Nota actualizada",
  NOTE_DELETED: "Nota eliminada",
  NOTE_SAVED: "Nota guardada",
  
  // General
  OPERATION_SUCCESS: "Operación completada",
} as const;

// Validaciones
export const VALIDATION_RULES = {
  // Usuario
  USER: {
    NOMBRE_MIN_LENGTH: 2,
    NOMBRE_MAX_LENGTH: 50,
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 100,
  },
  // Nota
  NOTE: {
    TITULO_MIN_LENGTH: 1,
    TITULO_MAX_LENGTH: 100,
    CONTENIDO_MIN_LENGTH: 1,
    CONTENIDO_MAX_LENGTH: 10000,
  },
} as const;

// Configuración de paginación
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
} as const;

// Configuración de búsqueda
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 100,
  SEARCH_FIELDS: ['titulo', 'contenido'],
} as const;

// Configuración de ordenamiento
export const SORT_CONFIG = {
  DEFAULT_SORT_BY: 'fecha_actualizacion',
  DEFAULT_SORT_ORDER: 'desc',
  SORT_OPTIONS: [
    { value: 'fecha_creacion', label: 'Fecha de creación' },
    { value: 'fecha_actualizacion', label: 'Fecha de actualización' },
    { value: 'titulo', label: 'Título' },
  ],
} as const;
