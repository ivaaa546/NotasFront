import API from "./api";

// Tipos para notas
export interface Note {
  id: string;
  titulo: string;
  texto: string;
  contenido: string;
  usuario_id: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface CreateNoteData {
  titulo: string;
  contenido: string;
}

export interface UpdateNoteData {
  titulo?: string;
  contenido?: string;
}

export interface NotesResponse {
  notes: Note[];
  total?: number;
}

// Servicio de notas
export const notesService = {
  // Obtener todas las notas del usuario
  async getAllNotes(): Promise<Note[]> {
    try {
      const response = await API.get("/notas");
      console.log("Notes response:", response.data);
      const backendNotes = response.data.data || [];
      
      // Mapear las notas del backend al formato esperado por el frontend
      const frontendNotes = backendNotes.map((note: any) => ({
        ...note,
        contenido: note.texto  // texto → contenido
      }));
      
      return frontendNotes;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al obtener las notas");
    }
  },

  // Obtener una nota por ID
  async getNoteById(id: string): Promise<Note> {
    try {
      const response = await API.get(`/notas/${id}`);
      const backendNote = response.data.data;
      
      // Mapear la respuesta del backend al formato esperado por el frontend
      const frontendNote = {
        ...backendNote,
        contenido: backendNote.texto  // texto → contenido
      };
      
      return frontendNote;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al obtener la nota");
    }
  },

  // Crear una nueva nota
  async createNote(data: CreateNoteData): Promise<Note> {
    try {
      // Convertir los datos al formato que espera el backend
      const noteData = {
        titulo: data.titulo,
        texto: data.contenido  // contenido → texto
      };
      console.log("Creating note with data:", noteData);
      const response = await API.post("/notas", noteData);
      console.log("Create note response:", response.data);
      
      // Mapear la respuesta del backend al formato esperado por el frontend
      const backendNote = response.data.data;
      const frontendNote = {
        ...backendNote,
        contenido: backendNote.texto  // texto → contenido
      };
      
      return frontendNote;
    } catch (error: any) {
      console.error("Error creating note:", error);
      throw new Error(error.response?.data?.message || "Error al crear la nota");
    }
  },

  // Actualizar una nota
  async updateNote(id: string, data: UpdateNoteData): Promise<Note> {
    try {
      // Convertir los datos al formato que espera el backend
      const updateData: any = {};
      if (data.titulo !== undefined) updateData.titulo = data.titulo;
      if (data.contenido !== undefined) updateData.texto = data.contenido;  // contenido → texto
      
      const response = await API.put(`/notas/${id}`, updateData);
      const backendNote = response.data.data;
      
      // Mapear la respuesta del backend al formato esperado por el frontend
      const frontendNote = {
        ...backendNote,
        contenido: backendNote.texto  // texto → contenido
      };
      
      return frontendNote;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al actualizar la nota");
    }
  },

  // Eliminar una nota
  async deleteNote(id: string): Promise<void> {
    try {
      await API.delete(`/notas/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al eliminar la nota");
    }
  },

  // Buscar notas por título o contenido
  async searchNotes(query: string): Promise<Note[]> {
    try {
      const allNotes = await this.getAllNotes();
      const searchTerm = query.toLowerCase();
      
      return allNotes.filter(note => 
        note.titulo.toLowerCase().includes(searchTerm) ||
        note.contenido.toLowerCase().includes(searchTerm)
      );
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al buscar notas");
    }
  },

  // Obtener notas recientes (últimas 10)
  async getRecentNotes(): Promise<Note[]> {
    try {
      const allNotes = await this.getAllNotes();
      return allNotes
        .sort((a, b) => new Date(b.fecha_actualizacion).getTime() - new Date(a.fecha_actualizacion).getTime())
        .slice(0, 10);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al obtener notas recientes");
    }
  },

  // Obtener estadísticas de notas
  async getNotesStats(): Promise<{
    total: number;
    recent: number;
    thisWeek: number;
  }> {
    try {
      const allNotes = await this.getAllNotes();
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const recent = allNotes.filter(note => 
        new Date(note.fecha_creacion) > new Date(now.getTime() - 24 * 60 * 60 * 1000)
      ).length;
      
      const thisWeek = allNotes.filter(note => 
        new Date(note.fecha_creacion) > oneWeekAgo
      ).length;
      
      return {
        total: allNotes.length,
        recent,
        thisWeek
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al obtener estadísticas");
    }
  }
};
