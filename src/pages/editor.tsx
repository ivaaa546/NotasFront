import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService, notesService, type Note, type CreateNoteData, type UpdateNoteData } from '../services';
import Navbar from '../components/layout/navbar';
import NoteEditorPage from '../components/notes/note-editor-page';

export default function Editor() {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    // Obtener parámetros de la URL
    const noteId = searchParams.get('id');
    const viewMode = searchParams.get('view') === 'true';

    setIsViewMode(viewMode);

    if (noteId) {
      loadNote(noteId);
    }
  }, [searchParams]);

  const loadNote = async (id: string) => {
    try {
      setIsLoading(true);
      const noteData = await notesService.getNoteById(id);
      setNote(noteData);
    } catch (err: any) {
      console.error('Error al cargar la nota:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: CreateNoteData | UpdateNoteData) => {
    try {
      setIsSaving(true);

      if (note) {
        // Actualizar nota existente
        await notesService.updateNote(note.id, data as UpdateNoteData);
      } else {
        // Crear nueva nota
        await notesService.createNote(data as CreateNoteData);
      }

      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (err: any) {
      throw err; // Re-lanzar el error para que lo maneje el componente
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userName={user?.nombre} />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Cargando nota...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.nombre} />
      
      <NoteEditorPage
        note={note || undefined}
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isSaving}
        isViewMode={isViewMode}
      />
    </div>
  );
}
