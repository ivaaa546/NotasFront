import { type Note, formatRelativeDate, truncateText } from '../../services';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onView: (note: Note) => void;
}

export default function NoteCard({ note, onEdit, onDelete, onView }: NoteCardProps) {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      onDelete(note.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {note.titulo}
        </h3>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onView(note)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Ver
          </button>
          <button
            onClick={() => onEdit(note)}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
  {truncateText(note.texto, 150)}
</p>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>
          Creada: {formatRelativeDate(note.fecha_creacion)}
        </span>
        {note.fecha_actualizacion !== note.fecha_creacion && (
          <span>
            Actualizada: {formatRelativeDate(note.fecha_actualizacion)}
          </span>
        )}
      </div>
    </div>
  );
}
