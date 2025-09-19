import { useState, useCallback } from 'react';

export interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isLoading: boolean;
  isDirty: boolean;
}

export interface UseFormOptions<T> {
  initialData: T;
  validate?: (data: T) => Record<string, string>;
  onSubmit?: (data: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, any>>({
  initialData,
  validate,
  onSubmit
}: UseFormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    data: initialData,
    errors: {},
    isLoading: false,
    isDirty: false
  });

  const setField = useCallback((name: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value
      },
      isDirty: true,
      errors: {
        ...prev.errors,
        [name]: '' // Limpiar error del campo al cambiar
      }
    }));
  }, []);

  const setFields = useCallback((newData: Partial<T>) => {
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        ...newData
      },
      isDirty: true
    }));
  }, []);

  const setError = useCallback((name: keyof T | string, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [name]: error
      }
    }));
  }, []);

  const setErrors = useCallback((errors: Record<string, string>) => {
    setFormState(prev => ({
      ...prev,
      errors
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      errors: {}
    }));
  }, []);

  const reset = useCallback(() => {
    setFormState({
      data: initialData,
      errors: {},
      isLoading: false,
      isDirty: false
    });
  }, [initialData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setField(name as keyof T, value);
  }, [setField]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!onSubmit) return;

    // Validar si hay función de validación
    if (validate) {
      const validationErrors = validate(formState.data);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    try {
      setFormState(prev => ({ ...prev, isLoading: true, errors: {} }));
      await onSubmit(formState.data);
    } catch (error: any) {
      setFormState(prev => ({ 
        ...prev, 
        isLoading: false,
        errors: { general: error.message || 'Error al procesar el formulario' }
      }));
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  }, [formState.data, validate, onSubmit, setErrors]);

  const setLoading = useCallback((loading: boolean) => {
    setFormState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  return {
    ...formState,
    setField,
    setFields,
    setError,
    setErrors,
    clearErrors,
    reset,
    handleChange,
    handleSubmit,
    setLoading
  };
}
