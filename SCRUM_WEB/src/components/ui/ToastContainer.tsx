import { useToast, type ToastItem, type ToastVariant } from '../../context/ToastContext';

interface VariantStyle {
  container: string;
  iconBg: string;
  progress: string;
}

const VARIANT_STYLES: Record<ToastVariant, VariantStyle> = {
  success: {
    container: 'border-emerald-200/90 bg-white/95 shadow-emerald-100/70',
    iconBg: 'bg-emerald-50 text-emerald-600',
    progress: 'bg-emerald-500',
  },
  error: {
    container: 'border-rose-200/90 bg-white/95 shadow-rose-100/70',
    iconBg: 'bg-rose-50 text-rose-600',
    progress: 'bg-rose-500',
  },
  warning: {
    container: 'border-amber-200/90 bg-white/95 shadow-amber-100/70',
    iconBg: 'bg-amber-50 text-amber-600',
    progress: 'bg-amber-500',
  },
  info: {
    container: 'border-sky-200/90 bg-white/95 shadow-sky-100/70',
    iconBg: 'bg-sky-50 text-sky-600',
    progress: 'bg-sky-500',
  },
};

function ToastIcon({ variant }: { variant: ToastVariant }) {
  if (variant === 'success') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (variant === 'error') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
      </svg>
    );
  }
  if (variant === 'warning') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
    </svg>
  );
}

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  const styles = VARIANT_STYLES[toast.variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-2xl border backdrop-blur-md shadow-lg animate-toast-in ${styles.container}`}
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${styles.iconBg}`}
        >
          <ToastIcon variant={toast.variant} />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold text-slate-800">{toast.title}</p>
          {toast.description && (
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{toast.description}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          aria-label="Cerrar notificación"
          className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {toast.duration > 0 && (
        <div className="h-1 w-full bg-slate-100">
          <div
            className={`h-full animate-shrink-bar ${styles.progress}`}
            style={{ animationDuration: `${toast.duration}ms` }}
          />
        </div>
      )}
    </div>
  );
}

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
