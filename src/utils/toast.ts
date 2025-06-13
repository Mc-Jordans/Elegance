import { toast as hotToast } from 'react-hot-toast';

// Wrapper for toast functions to prevent React state updates during render
export const toast = {
  success: (message: string, options?: any) => {
    setTimeout(() => {
      hotToast.success(message, options);
    }, 0);
  },
  
  error: (message: string, options?: any) => {
    setTimeout(() => {
      hotToast.error(message, options);
    }, 0);
  },
  
  loading: (message: string, options?: any) => {
    return hotToast.loading(message, options);
  },
  
  custom: (message: any, options?: any) => {
    setTimeout(() => {
      hotToast.custom(message, options);
    }, 0);
  },
  
  dismiss: (toastId?: string) => {
    hotToast.dismiss(toastId);
  }
};