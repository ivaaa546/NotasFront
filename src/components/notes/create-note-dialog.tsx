import { useState } from 'react';
import { type CreateNoteData } from '../../services';

interface CreateNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateNoteData) => Promise<void>;
  isLoading?: boolean;
}

export default function CreateNoteDialog({ isOpen, onClose, onSave, isLoading = false }: CreateNoteDialogProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: ''
  });
  const [error, setError] = useState('');

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

    try {
      await onSave(formData);
      setFormData({ titulo: '', contenido: '' });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al crear la nota');
    }
  };

  const handleClose = () => {
    setFormData({ titulo: '', contenido: '' });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Nueva Nota</h2>
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
                {isLoading ? 'Creando...' : 'Crear Nota'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
