import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services';
import AuthPage from './pages/auth';
import Dashboard from './pages/dashboard';
import Editor from './pages/editor';
import Profile from './pages/profile';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route 
          path="/login" 
          element={
            authService.isAuthenticated() ? 
            <Navigate to="/dashboard" replace /> : 
            <AuthPage />
          } 
        />
        <Route 
          path="/" 
          element={
            authService.isAuthenticated() ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/login" replace />
          } 
        />

        {/* Rutas protegidas */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/editor" 
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* Ruta 404 */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-6">Página no encontrada</p>
                <a 
                  href="/dashboard" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
                >
                  Ir al Dashboard
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
