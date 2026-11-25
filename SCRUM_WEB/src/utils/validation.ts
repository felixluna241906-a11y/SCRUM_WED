import type { LoginFormErrors, LoginFormValues } from '../types/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9._-]+$/;

/**
 * Valida el campo de correo electrónico o nombre de usuario.
 */
export function validateIdentifier(rawValue: string): string | undefined {
  const value = rawValue.trim();

  if (!value) {
    return 'Ingresa tu correo electrónico o nombre de usuario.';
  }

  if (value.includes('@')) {
    if (!EMAIL_REGEX.test(value)) {
      return 'El formato del correo electrónico no es válido (ej. nombre@empresa.com).';
    }
    return undefined;
  }

  if (/\s/.test(value)) {
    return 'El nombre de usuario no puede contener espacios.';
  }

  if (value.length < 3) {
    return 'El usuario debe tener al menos 3 caracteres.';
  }

  if (value.length > 30) {
    return 'El usuario no puede superar los 30 caracteres.';
  }

  if (!USERNAME_REGEX.test(value)) {
    return 'El usuario solo puede incluir letras, números, ".", "_" o "-".';
  }

  return undefined;
}

/**
 * Valida la contraseña con requisitos mínimos de seguridad.
 */
export function validatePassword(value: string): string | undefined {
  if (!value) {
    return 'Ingresa tu contraseña.';
  }

  if (value.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }

  if (!/[A-Z]/.test(value)) {
    return 'Incluye al menos una letra mayúscula.';
  }

  if (!/[a-z]/.test(value)) {
    return 'Incluye al menos una letra minúscula.';
  }

  if (!/\d/.test(value)) {
    return 'Incluye al menos un número.';
  }

  return undefined;
}

export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

/**
 * Evalúa cada regla individual de la contraseña para mostrar retroalimentación visual.
 */
export function getPasswordRequirements(password: string): PasswordRequirement[] {
  return [
    { id: 'length', label: 'Mínimo 8 caracteres', met: password.length >= 8 },
    { id: 'upper', label: 'Una mayúscula', met: /[A-Z]/.test(password) },
    { id: 'lower', label: 'Una minúscula', met: /[a-z]/.test(password) },
    { id: 'number', label: 'Un número', met: /\d/.test(password) },
  ];
}

/**
 * Valida todo el formulario de inicio de sesión.
 */
export function validateLoginForm(values: LoginFormValues): {
  isValid: boolean;
  errors: LoginFormErrors;
} {
  const identifierError = validateIdentifier(values.identifier);
  const passwordError = validatePassword(values.password);

  const errors: LoginFormErrors = {};
  if (identifierError) errors.identifier = identifierError;
  if (passwordError) errors.password = passwordError;

  return {
    isValid: !identifierError && !passwordError,
    errors,
  };
}

/**
 * Determina si el identificador ingresado corresponde a un correo o a un usuario.
 */
export function detectIdentifierType(value: string): 'correo' | 'usuario' {
  return value.trim().includes('@') ? 'correo' : 'usuario';
}
