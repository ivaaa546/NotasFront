// Exportar todos los hooks personalizados
export { useAuth } from './useAuth';
export { useNotes } from './useNotes';
export { useForm } from './useForm';
export { useDialog } from './useDialog';

// Exportar tipos
export type { User, AuthState, LoginData, RegisterData } from './useAuth';
export type { NotesState } from './useNotes';
export type { FormState, UseFormOptions } from './useForm';
export type { DialogState } from './useDialog';
