import { useState } from 'react';
import {
  BRAND_NAME,
  BRAND_SLOGAN,
  BRAND_SUBTITLE,
  BrandLogo,
} from '../components/BrandLogo';
import { LoginForm } from '../components/LoginForm';
import { useToast } from '../context/ToastContext';
import type { AuthenticatedUser } from '../types/auth';

const SCRUM_HIGHLIGHTS = [
  {
    title: 'Backlog priorizado',
    detail: 'Ordena historias de usuario y criterios de aceptación sin fricción.',
  },
  {
    title: 'Planning Poker y Sprints',
    detail: 'Estima esfuerzos en equipo y define metas claras por iteración.',
  },
  {
    title: 'Seguimiento diario',
    detail: 'Visualiza bloqueos, avances y velocidad del equipo en tiempo real.',
  },
];

const SPRINT_SUMMARY = [
  { label: 'Por hacer', value: '6', badge: 'bg-sky-50 text-sky-700 ring-sky-200/70' },
  { label: 'En curso', value: '4', badge: 'bg-indigo-50 text-indigo-700 ring-indigo-200/70' },
  { label: 'Completadas', value: '9', badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200/70' },
];

export function LoginPage() {
  const { showToast } = useToast();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const handleLogout = () => {
    setUser(null);
    showToast({
      variant: 'info',
      title: 'Sesión cerrada',
      description: `Has salido de ${BRAND_NAME} de forma segura.`,
    });
  };

  const handleRequestAccess = () => {
    showToast({
      variant: 'info',
      title: 'Solicitud de cuenta',
      description: `Contacta al Scrum Master de tu equipo para unirte a ${BRAND_NAME}.`,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/80 to-indigo-50/90 text-slate-800">
      {/* Degradados suaves decorativos en tonos claros */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-[28rem] w-[28rem] rounded-full bg-indigo-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-100/45 blur-3xl"
      />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        {user ? (
          /* Vista de bienvenida posterior al inicio de sesión */
          <section className="w-full max-w-lg rounded-3xl border border-white/90 bg-white/85 p-8 text-center shadow-xl shadow-indigo-100/60 backdrop-blur-xl">
            <BrandLogo showSlogan={false} size="md" />

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/80">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Sesión activa ({user.loginType})
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
              ¡Bienvenido, {user.displayName}!
            </h1>
            <p className="mt-1.5 text-sm text-slate-600">
              Accediste a <span className="font-semibold text-slate-800">{BRAND_NAME}</span> con{' '}
              <span className="font-medium text-indigo-600">{user.identifier}</span>.
            </p>

            {/* Resumen rápido del Sprint */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {SPRINT_SUMMARY.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-3 shadow-sm"
                >
                  <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${stat.badge}`}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-sky-50/60 p-4 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {BRAND_NAME}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700">{BRAND_SLOGAN}</p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  showToast({
                    variant: 'success',
                    title: 'Tablero sincronizado',
                    description: 'Las historias del Sprint actual están actualizadas.',
                  })
                }
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Probar Toast
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/70 transition-all hover:from-sky-600 hover:to-indigo-700"
              >
                Cerrar sesión
              </button>
            </div>
          </section>
        ) : (
          /* Contenedor principal de inicio de sesión */
          <div className="grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Columna izquierda: identidad, logo, slogan y propuesta de valor */}
            <section className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">
              <div className="lg:hidden">
                <BrandLogo />
              </div>

              <div className="hidden lg:block">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  Plataforma ágil de planificación Scrum
                </div>

                <div className="mt-6 flex items-start">
                  <BrandLogo showSlogan={false} />
                </div>

                <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-800">
                  {BRAND_SLOGAN}
                </h1>
                <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600">
                  {BRAND_SUBTITLE}
                </p>

                <div className="mt-8 space-y-3">
                  {SCRUM_HIGHLIGHTS.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/65 p-3.5 shadow-sm backdrop-blur-md"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 to-indigo-100 text-indigo-600">
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <div>
                        <h2 className="text-sm font-semibold text-slate-800">{item.title}</h2>
                        <p className="text-xs text-slate-600">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Columna derecha: tarjeta de inicio de sesión */}
            <section className="mx-auto w-full max-w-md lg:col-span-6">
              <div className="rounded-3xl border border-white/90 bg-white/85 p-6 shadow-xl shadow-indigo-100/60 backdrop-blur-xl sm:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                    Iniciar sesión
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Accede a <span className="font-semibold text-slate-700">{BRAND_NAME}</span> con
                    tu correo o nombre de usuario.
                  </p>
                </div>

                <LoginForm onSuccess={setUser} />

                <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                  <p className="text-xs text-slate-500">
                    ¿Tu equipo aún no tiene cuenta?{' '}
                    <button
                      type="button"
                      onClick={handleRequestAccess}
                      className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                    >
                      Solicitar acceso
                    </button>
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
