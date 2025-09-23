"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-[var(--toast-success-bg)]",
    textColor: "text-[var(--toast-success-text)]",
    borderColor: "border-[var(--toast-success-border)]",
    iconColor: "text-[var(--toast-success-icon)]",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-[var(--toast-error-bg)]",
    textColor: "text-[var(--toast-error-text)]",
    borderColor: "border-[var(--toast-error-border)]",
    iconColor: "text-[var(--toast-error-icon)]",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-[var(--toast-warning-bg)]",
    textColor: "text-[var(--toast-warning-text)]",
    borderColor: "border-[var(--toast-warning-border)]",
    iconColor: "text-[var(--toast-warning-icon)]",
  },
  info: {
    icon: Info,
    bgColor: "bg-[var(--toast-info-bg)]",
    textColor: "text-[var(--toast-info-text)]",
    borderColor: "border-[var(--toast-info-border)]",
    iconColor: "text-[var(--toast-info-icon)]",
  },
};

export default function Toast({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); 
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div
        className={`
          ${config.bgColor} ${config.borderColor}
          border rounded-lg shadow-lg p-4
          flex items-start gap-3
        `}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="flex-1 min-w-0">
          <div className={`font-semibold text-sm ${config.textColor}`}>{title}</div>
          {message && (
            <div className={`text-sm mt-1 text-gray-700`}>{message}</div>
          )}
        </div>
        <button
          onClick={handleClose}
          className={`flex-shrink-0 ml-2 hover:opacity-70 transition-opacity ${config.iconColor}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Toast Container Component
export interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, "id" | "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: removeToast,
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (title: string, message?: string) => {
    addToast({ type: "success", title, message });
  };

  const showError = (title: string, message?: string) => {
    addToast({ type: "error", title, message });
  };

  const showWarning = (title: string, message?: string) => {
    addToast({ type: "warning", title, message });
  };

  const showInfo = (title: string, message?: string) => {
    addToast({ type: "info", title, message });
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}
