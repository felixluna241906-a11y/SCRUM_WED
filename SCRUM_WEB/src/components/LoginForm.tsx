import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useToast } from '../context/ToastContext';
import type { AuthenticatedUser, LoginFormErrors, LoginFormValues } from '../types/auth';
import {
  detectIdentifierType,
  getPasswordRequirements,
  validateIdentifier,
  validateLoginForm,
  validatePassword,
} from '../utils/validation';

interface LoginFormProps {
  onSuccess: (user: AuthenticatedUser) => void;
}

const REMEMBERED_USER_KEY = 'scrum_planing_remembered_user';

function readRememberedIdentifier(): string {
  try {
    return window.localStorage.getItem(REMEMBERED_USER_KEY) ?? '';
  } catch {
    return '';
  }
}

function persistRememberedIdentifier(identifier: string, remember: boolean): void {
  try {
    if (remember) {
      window.localStorage.setItem(REMEMBERED_USER_KEY, identifier);
    } else {
      window.localStorage.removeItem(REMEMBERED_USER_KEY);
    }
  } catch {
    // Ignorar errores de almacenamiento si el navegador restringe localStorage
  }
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { showToast } = useToast();
  const submitTimerRef = useRef<number | null>(null);

  const [values, setValues] = useState<LoginFormValues>(() => ({
    identifier: readRememberedIdentifier(),
    password: '',
    rememberMe: true,
  }));

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [touched, setTouched] = useState<{ identifier: boolean; password: boolean }>({
    identifier: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const passwordRequirements = getPasswordRequirements(values.password);
  const detectedType = values.identifier.trim() ? detectIdentifierType(values.identifier) : null;

  const handleIdentifierChange = (nextValue: string) => {
    setValues((prev) => ({ ...prev, identifier: nextValue }));
    if (touched.identifier) {
      setErrors((prev) => ({ ...prev, identifier: validateIdentifier(nextValue) }));
    }
  };

  const handlePasswordChange = (nextValue: string) => {
    setValues((prev) => ({ ...prev, password: nextValue }));
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(nextValue) }));
    }
  };

  const handleBlur = (field: 'identifier' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'identifier') {
      setErrors((prev) => ({ ...prev, identifier: validateIdentifier(values.identifier) }));
    } else {
      setErrors((prev) => ({ ...prev, password: validatePassword(values.password) }));
    }
  };

  const handleFillDemo = () => {
    const demoValues: LoginFormValues = {
      identifier: 'scrum.master@scrumplaning.com',
      password: 'Sprint2026!',
      rememberMe: true,
    };
    setValues(demoValues);
    setTouched({ identifier: true, password: true });
    setErrors({});
    showToast({
      variant: 'info',
      title: 'Datos de ejemplo cargados',
      description: 'Pulsa "Iniciar sesión" para acceder a SCRUM PLANING.',
    });
  };

  const handleForgotPassword = () => {
    const trimmed = values.identifier.trim();
    if (trimmed && !validateIdentifier(trimmed)) {
      showToast({
        variant: 'info',
        title: 'Recuperación de contraseña',
        description: `Si ${trimmed} está registrado en SCRUM PLANING, enviaremos instrucciones a tu correo.`,
      });
      return;
    }

    showToast({
      variant: 'warning',
      title: 'Ingresa tu correo o usuario primero',
      description: 'Escribe un correo o usuario válido para enviarte el enlace de recuperación.',
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setTouched({ identifier: true, password: true });
    const validation = validateLoginForm(values);
    setErrors(validation.errors);

    if (!validation.isValid) {
      const firstError =
        validation.errors.identifier ||
        validation.errors.password ||
        'Revisa los campos marcados antes de continuar.';

      showToast({
        variant: 'error',
        title: 'Datos de acceso inválidos',
        description: firstError,
      });
      return;
    }

    setIsSubmitting(true);

    submitTimerRef.current = window.setTimeout(() => {
      const trimmedIdentifier = values.identifier.trim();
      const loginType = detectIdentifierType(trimmedIdentifier);
      const displayName =
        loginType === 'correo' ? trimmedIdentifier.split('@')[0] : trimmedIdentifier;

      persistRememberedIdentifier(trimmedIdentifier, values.rememberMe);
      setIsSubmitting(false);

      showToast({
        variant: 'success',
        title: '¡Sesión iniciada en SCRUM PLANING!',
        description: `Bienvenido de nuevo, ${displayName}.`,
      });

      onSuccess({
        identifier: trimmedIdentifier,
        displayName,
        loginType,
      });
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Campo: Correo electrónico o usuario */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="login-identifier"
            className="block text-sm font-medium text-slate-700"
          >
            Correo electrónico o usuario
          </label>
          {detectedType && (
            <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-medium text-sky-700 ring-1 ring-sky-200/70">
              {detectedType === 'correo' ? 'Correo' : 'Usuario'}
            </span>
          )}
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>

          <input
            id="login-identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            placeholder="tu@correo.com o nombre.usuario"
            value={values.identifier}
            onChange={(e) => handleIdentifierChange(e.target.value)}
            onBlur={() => handleBlur('identifier')}
            aria-invalid={Boolean(errors.identifier)}
            aria-describedby={errors.identifier ? 'identifier-error' : undefined}
            className={`w-full rounded-xl border bg-slate-50/70 py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-4 ${
              errors.identifier
                ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
                : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
            }`}
          />
        </div>

        {errors.identifier && (
          <p
            id="identifier-error"
            role="alert"
            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
          >
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
            </svg>
            {errors.identifier}
          </p>
        )}
      </div>

      {/* Campo: Contraseña */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="block text-sm font-medium text-slate-700"
          >
            Contraseña
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <rect x="4" y="11" width="16" height="10" rx="2.5" />
              <path strokeLinecap="round" d="M8 11V7a4 4 0 118 0v4" />
            </svg>
          </span>

          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            value={values.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            onBlur={() => handleBlur('password')}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={`w-full rounded-xl border bg-slate-50/70 py-2.5 pl-11 pr-11 text-sm text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-4 ${
              errors.password
                ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
                : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-colors hover:text-slate-600"
          >
            {showPassword ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 4.24A9.77 9.77 0 0112 4c5.52 0 9.5 4.5 10 8-.23 1.62-1.15 3.49-2.66 4.98M6.61 6.61C4.62 8.05 3.3 10.02 3 12c.5 3.5 4.48 8 10 8 1.46 0 2.84-.31 4.07-.86"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.5 12C3.7 7.9 7.5 5 12 5s8.3 2.9 9.5 7c-1.2 4.1-5 7-9.5 7s-8.3-2.9-9.5-7z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {errors.password && (
          <p
            id="password-error"
            role="alert"
            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
          >
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
            </svg>
            {errors.password}
          </p>
        )}

        {/* Indicadores suaves de requisitos de contraseña */}
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          {passwordRequirements.map((req) => (
            <div
              key={req.id}
              className={`flex items-center gap-1.5 text-[11px] transition-colors ${
                req.met ? 'font-medium text-emerald-600' : 'text-slate-400'
              }`}
            >
              <span
                className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                  req.met ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {req.label}
            </div>
          ))}
        </div>
      </div>

      {/* Recordar sesión */}
      <div className="flex items-center justify-between pt-0.5">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600 select-none">
          <input
            type="checkbox"
            checked={values.rememberMe}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, rememberMe: e.target.checked }))
            }
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-sky-300"
          />
          Mantener mi sesión iniciada
        </label>

        <button
          type="button"
          onClick={handleFillDemo}
          className="text-xs font-medium text-slate-500 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-sky-600 hover:decoration-sky-400"
        >
          Probar ejemplo
        </button>
      </div>

      {/* Botón principal */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/80 transition-all hover:from-sky-600 hover:via-indigo-600 hover:to-indigo-700 hover:shadow-lg hover:shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Validando acceso...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </button>
    </form>
  );
}
