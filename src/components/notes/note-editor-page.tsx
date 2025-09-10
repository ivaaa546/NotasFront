import { useState, useEffect } from 'react';
import { type Note, type CreateNoteData, type UpdateNoteData } from '../../services';

interface NoteEditorPageProps {
  note?: Note;
  onSave: (data: CreateNoteData | UpdateNoteData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  isViewMode?: boolean;
}

export default function NoteEditorPage({ 
  note, 
  onSave, 
  onCancel, 
  isLoading = false, 
  isViewMode = false 
}: NoteEditorPageProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: ''
  });
  const [error, setError] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (note) {
      setFormData({
        titulo: note.titulo,
        contenido: note.contenido
      });
    }
  }, [note]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!formData.titulo.trim() || !formData.contenido.trim()) {
      setError('El título y contenido son requeridos');
      return;
    }

    try {
      setError('');
      await onSave(formData);
      setHasChanges(false);
    } catch (err: any) {
      setError(err.message || 'Error al guardar la nota');
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('¿Estás seguro de que quieres descartar los cambios?')) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      if (!isViewMode) {
        handleSave();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {note ? (isViewMode ? 'Ver Nota' : 'Editar Nota') : 'Nueva Nota'}
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </button>
            {!isViewMode && (
              <button
                onClick={handleSave}
                disabled={isLoading || !hasChanges}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6" onKeyDown={handleKeyDown}>
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              disabled={isViewMode || isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Título de la nota"
            />
          </div>

          <div>
            <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-2">
              Contenido
            </label>
            <textarea
              id="contenido"
              name="contenido"
              rows={15}
              value={formData.contenido}
              onChange={handleChange}
              disabled={isViewMode || isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
              placeholder="Escribe el contenido de tu nota aquí..."
            />
          </div>

          {hasChanges && !isViewMode && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Tienes cambios sin guardar. Presiona Ctrl+S para guardar.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
