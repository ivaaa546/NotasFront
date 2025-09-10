import API from "./api";

// Tipos para autenticación
export interface LoginData {
  email: string;
  passwordd: string;
}

export interface RegisterData {
  nombre: string;
  email: string;
  passwordd: string;
}

export interface User {
  id: string;
  nombre: string;
  email: string;
  passwordd?: string; // Solo para respuestas del servidor
}

export interface AuthResponse {
  token: string;
  user?: User;
}

// Servicio de autenticación
export const authService = {
  // Registrar nuevo usuario
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      // Convertir los datos al formato que espera el backend
      const registerData = {
        nombre: userData.nombre,
        correo: userData.email,
        password: userData.passwordd
      };
      const response = await API.post("/usuarios/registro", registerData);
      const { data: responseData } = response.data;
      const { token, usuario } = responseData;
      
      // Guardar token en localStorage
      localStorage.setItem("token", token);
      
      // Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify(usuario));
      
      return { token, user: usuario };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Error al registrar usuario");
    }
  },

  // Iniciar sesión
  async login(userData: LoginData): Promise<AuthResponse> {
    try {
      // Convertir los datos al formato que espera el backend
      const loginData = {
        correo: userData.email,
        password: userData.passwordd
      };
      const response = await API.post("/usuarios/login", loginData);
      console.log("Login response:", response.data);
      
      const { data: responseData } = response.data;
      const { token, usuario } = responseData;
      
      console.log("Token:", token);
      console.log("Usuario:", usuario);
      
      // Guardar token en localStorage
      localStorage.setItem("token", token);
      
      // Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify(usuario));
      
      return { token, user: usuario };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Error al iniciar sesión");
    }
  },

  // Obtener perfil del usuario
  async getProfile(): Promise<User> {
    try {
      const response = await API.get("/usuarios/perfil");
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al obtener perfil");
    }
  },

  // Actualizar perfil
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await API.put("/usuarios/perfil", data);
      const updatedUser = response.data.data;
      
      // Actualizar usuario en localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al actualizar perfil");
    }
  },

  // Eliminar cuenta
  async deleteAccount(): Promise<void> {
    try {
      await API.delete("/usuarios/perfil");
      this.logout();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al eliminar cuenta");
    }
  },

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  },

  // Obtener token actual
  getToken(): string | null {
    return localStorage.getItem("token");
  },

  // Obtener usuario actual
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Verificar si el token es válido (opcional)
  async validateToken(): Promise<boolean> {
    try {
      await this.getProfile();
      return true;
    } catch {
      this.logout();
      return false;
    }
  }
};
