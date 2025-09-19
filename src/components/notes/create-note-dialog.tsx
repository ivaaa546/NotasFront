import { useForm } from '../../hooks';
import { type CreateNoteData } from '../../services';

interface CreateNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateNoteData) => Promise<void>;
  isLoading?: boolean;
}

export default function CreateNoteDialog({ isOpen, onClose, onSave, isLoading = false }: CreateNoteDialogProps) {
  const {
    data: formData,
    errors,
    isLoading: isFormLoading,
    handleChange,
    handleSubmit,
    reset
  } = useForm({
    initialData: {
      titulo: '',
      contenido: ''
    },
    validate: (data) => {
      const errors: Record<string, string> = {};
      
      if (!data.titulo.trim()) {
        errors.titulo = 'El título es requerido';
      }
      
      if (!data.contenido.trim()) {
        errors.contenido = 'El contenido es requerido';
      }
      
      return errors;
    },
    onSubmit: async (data) => {
      try {
        await onSave(data);
        reset();
        onClose();
      } catch (err: any) {
        throw err;
      }
    }
  });

  const handleClose = () => {
    reset();
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
                disabled={isLoading || isFormLoading}
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
                disabled={isLoading || isFormLoading}
              />
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {errors.general}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                disabled={isLoading || isFormLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading || isFormLoading}
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
