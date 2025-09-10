import { useState, useEffect } from 'react';
import { type Note, type UpdateNoteData } from '../../services';

interface EditNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: UpdateNoteData) => Promise<void>;
  note: Note | null;
  isLoading?: boolean;
}

export default function EditNoteDialog({ isOpen, onClose, onSave, note, isLoading = false }: EditNoteDialogProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: ''
  });
  const [error, setError] = useState('');

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.titulo.trim() || !formData.contenido.trim()) {
      setError('El título y contenido son requeridos');
      return;
    }

    if (!note) return;

    try {
      await onSave(note.id, formData);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la nota');
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Editar Nota</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              disabled={isLoading}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Título de la nota"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-2">
                Contenido
              </label>
              <textarea
                id="contenido"
                name="contenido"
                rows={8}
                value={formData.contenido}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-vertical"
                placeholder="Escribe el contenido de tu nota aquí..."
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
