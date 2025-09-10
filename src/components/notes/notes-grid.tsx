import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Note } from '../../services';
import NoteCard from './note-card';
import CreateNoteDialog from './create-note-dialog';
import EditNoteDialog from './edit-note-dialog';
import { notesService, type CreateNoteData, type UpdateNoteData } from '../../services';

interface NotesGridProps {
  notes: Note[];
  onNotesChange: () => void;
  isLoading?: boolean;
}

export default function NotesGrid({ notes, onNotesChange, isLoading = false }: NotesGridProps) {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCreateNote = async (data: CreateNoteData) => {
    try {
      setIsCreating(true);
      await notesService.createNote(data);
      onNotesChange();
    } catch (error) {
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditDialogOpen(true);
  };

  const handleUpdateNote = async (id: string, data: UpdateNoteData) => {
    try {
      setIsUpdating(true);
      await notesService.updateNote(id, data);
      onNotesChange();
    } catch (error) {
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      try {
        await notesService.deleteNote(id);
        onNotesChange();
      } catch (error) {
        console.error('Error al eliminar la nota:', error);
        alert('Error al eliminar la nota');
      }
    }
  };

  const handleViewNote = (note: Note) => {
    // Aquí podrías implementar una vista de solo lectura o redirigir al editor
    console.log('Ver nota:', note);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">Cargando notas...</div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No tienes notas aún
        </h3>
        <p className="text-gray-600 mb-6">
          Crea tu primera nota para empezar
        </p>
        <button
          onClick={() => navigate('/editor')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
        >
          Crear Primera Nota
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onView={handleViewNote}
          />
        ))}
      </div>

      {/* Botón flotante para crear nota */}
      <button
        onClick={() => navigate('/editor')}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200 z-40"
        title="Crear nueva nota"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Diálogo para crear nota */}
      <CreateNoteDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateNote}
        isLoading={isCreating}
      />

      {/* Diálogo para editar nota */}
      <EditNoteDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedNote(null);
        }}
        onSave={handleUpdateNote}
        note={selectedNote}
        isLoading={isUpdating}
      />
    </>
  );
}
