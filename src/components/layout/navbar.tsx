import { Link } from 'react-router-dom';
import { authService } from '../../services';

interface NavbarProps {
  userName?: string;
}

export default function Navbar({ userName }: NavbarProps) {
  const handleLogout = () => {
    authService.logout();
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/dashboard" className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-200">
                📝 Mini API de Notas
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Perfil
              </Link>
            </div>
            
            {userName && (
              <span className="text-gray-700 text-sm">
                Hola, <span className="font-medium">{userName}</span>
              </span>
            )}
            
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
