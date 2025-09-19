import { useState, useEffect } from 'react';
import { notesService, type Note, type CreateNoteData, type UpdateNoteData } from '../services';

export interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: string;
}

export function useNotes() {
  const [notesState, setNotesState] = useState<NotesState>({
    notes: [],
    isLoading: false,
    error: ''
  });

  const loadNotes = async () => {
    try {
      setNotesState(prev => ({ ...prev, isLoading: true, error: '' }));
      const userNotes = await notesService.getAllNotes();
      setNotesState({
        notes: Array.isArray(userNotes) ? userNotes : [],
        isLoading: false,
        error: ''
      });
    } catch (err: any) {
      setNotesState({
        notes: [],
        isLoading: false,
        error: err.message || 'Error al cargar las notas'
      });
    }
  };

  const createNote = async (data: CreateNoteData) => {
    try {
      setNotesState(prev => ({ ...prev, isLoading: true, error: '' }));
      await notesService.createNote(data);
      await loadNotes(); // Recargar las notas
    } catch (err: any) {
      setNotesState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || 'Error al crear la nota' 
      }));
      throw err;
    }
  };

  const updateNote = async (id: string, data: UpdateNoteData) => {
    try {
      setNotesState(prev => ({ ...prev, isLoading: true, error: '' }));
      await notesService.updateNote(id, data);
      await loadNotes(); // Recargar las notas
    } catch (err: any) {
      setNotesState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || 'Error al actualizar la nota' 
      }));
      throw err;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      setNotesState(prev => ({ ...prev, isLoading: true, error: '' }));
      await notesService.deleteNote(id);
      await loadNotes(); // Recargar las notas
    } catch (err: any) {
      setNotesState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || 'Error al eliminar la nota' 
      }));
      throw err;
    }
  };

  const getNoteById = async (id: string): Promise<Note | null> => {
    try {
      setNotesState(prev => ({ ...prev, isLoading: true, error: '' }));
      const note = await notesService.getNoteById(id);
      setNotesState(prev => ({ ...prev, isLoading: false }));
      return note;
    } catch (err: any) {
      setNotesState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || 'Error al cargar la nota' 
      }));
      return null;
    }
  };

  const clearError = () => {
    setNotesState(prev => ({ ...prev, error: '' }));
  };

  return {
    ...notesState,
    loadNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById,
    clearError
  };
}
