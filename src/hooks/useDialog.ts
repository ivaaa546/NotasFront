import { useState, useCallback } from 'react';

export interface DialogState {
  isOpen: boolean;
  data: any;
}

export function useDialog<T = any>(initialData?: T) {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    data: initialData || null
  });

  const openDialog = useCallback((data?: T) => {
    setDialogState({
      isOpen: true,
      data: data || initialData || null
    });
  }, [initialData]);

  const closeDialog = useCallback(() => {
    setDialogState({
      isOpen: false,
      data: null
    });
  }, []);

  const setDialogData = useCallback((data: T) => {
    setDialogState(prev => ({
      ...prev,
      data
    }));
  }, []);

  return {
    isOpen: dialogState.isOpen,
    data: dialogState.data,
    openDialog,
    closeDialog,
    setDialogData
  };
}
