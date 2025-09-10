import { useState, useEffect } from 'react';
import { authService } from '../services';
import Navbar from '../components/layout/navbar';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const userData = await authService.getProfile();
      setUser(userData);
      setFormData({
        nombre: userData.nombre,
        email: userData.email
      });
    } catch (err: any) {
      setError(err.message || 'Error al cargar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }

    try {
      setIsSaving(true);
      setError('');
      setSuccess('');

      await authService.updateProfile({
        nombre: formData.nombre
      });

      setSuccess('Perfil actualizado exitosamente');
      loadProfile(); // Recargar datos
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      authService.deleteAccount();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userName={user?.nombre} />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Cargando perfil...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.nombre} />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Mi Perfil</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-sm text-gray-500 mt-1">
                El email no se puede cambiar
              </p>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-200"
              >
                Eliminar Cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
