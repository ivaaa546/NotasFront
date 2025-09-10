// Utilidades para la aplicación

// Función para formatear fechas
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Función para formatear fecha relativa
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Hace un momento';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `Hace ${days} día${days > 1 ? 's' : ''}`;
  } else {
    return formatDate(dateString);
  }
};

// Función para truncar texto
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Función para generar ID único
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Función para validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para validar contraseña
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Función para capitalizar texto
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Función para limpiar texto
export const sanitizeText = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};

// Función para extraer palabras clave de búsqueda
export const extractKeywords = (text: string): string[] => {
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter((word, index, array) => array.indexOf(word) === index);
};

// Función para resaltar texto de búsqueda
export const highlightSearchText = (text: string, searchQuery: string): string => {
  if (!searchQuery) return text;
  
  const regex = new RegExp(`(${searchQuery})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// Función para calcular tiempo de lectura
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Función para generar resumen de nota
export const generateNoteSummary = (content: string, maxLength: number = 150): string => {
  const cleanContent = content.replace(/<[^>]*>/g, ''); // Remover HTML
  return truncateText(cleanContent, maxLength);
};

// Función para ordenar notas
export const sortNotes = (notes: any[], sortBy: string, sortOrder: 'asc' | 'desc' = 'desc') => {
  return [...notes].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Convertir fechas a timestamps para comparación
    if (sortBy.includes('fecha')) {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

// Función para filtrar notas
export const filterNotes = (notes: any[], searchQuery: string): any[] => {
  if (!searchQuery) return notes;

  const query = searchQuery.toLowerCase();
  return notes.filter(note => 
    note.titulo.toLowerCase().includes(query) ||
    note.contenido.toLowerCase().includes(query)
  );
};

// Función para debounce
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Función para throttle
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Función para copiar al portapapeles
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
    return false;
  }
};

// Función para descargar archivo
export const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Función para obtener color basado en el título
export const getNoteColor = (title: string): string => {
  const colors = [
    'bg-blue-50 border-blue-200',
    'bg-green-50 border-green-200',
    'bg-yellow-50 border-yellow-200',
    'bg-purple-50 border-purple-200',
    'bg-pink-50 border-pink-200',
    'bg-indigo-50 border-indigo-200',
  ];
  
  const hash = title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

// Función para obtener iniciales del nombre
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
