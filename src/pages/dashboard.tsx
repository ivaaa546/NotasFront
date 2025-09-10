import { useState, useEffect } from 'react';
import { authService, notesService, type Note } from '../services';
import Navbar from '../components/layout/navbar';
import NotesGrid from '../components/notes/notes-grid';

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Obtener usuario actual
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    // Cargar notas
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const userNotes = await notesService.getAllNotes();
      console.log("Notes loaded:", userNotes);
      // Asegurar que userNotes sea un array
      setNotes(Array.isArray(userNotes) ? userNotes : []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las notas');
      setNotes([]); // Asegurar que notes sea un array vacío en caso de error
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotesChange = () => {
    loadNotes();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userName={user?.nombre} />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Cargando notas...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.nombre} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Notas</h1>
            <p className="text-gray-600 mt-2">
              Tienes {notes.length} nota{notes.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <NotesGrid 
          notes={notes} 
          onNotesChange={handleNotesChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
