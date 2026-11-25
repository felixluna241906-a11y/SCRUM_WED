interface BrandLogoProps {
  showSlogan?: boolean;
  size?: 'md' | 'lg';
}

export const BRAND_NAME = 'SCRUM PLANING';
export const BRAND_SLOGAN = 'Planifica tus sprints con claridad, impulsa cada entrega.';
export const BRAND_SUBTITLE =
  'Organiza tu backlog, estima historias de usuario y coordina a tu equipo en un entorno ligero y moderno.';

export function BrandLogo({ showSlogan = true, size = 'lg' }: BrandLogoProps) {
  const iconSize = size === 'lg' ? 'h-12 w-12' : 'h-10 w-10';
  const titleSize = size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-3.5">
        <div
          className={`relative flex ${iconSize} shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-500 p-2.5 shadow-lg shadow-indigo-200/70 ring-1 ring-white/70`}
        >
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full text-white"
            aria-hidden="true"
          >
            {/* Columnas del tablero Scrum + flecha de avance de sprint */}
            <rect
              x="4"
              y="6"
              width="7.5"
              height="15"
              rx="2.2"
              fill="currentColor"
              fillOpacity="0.95"
            />
            <rect
              x="14.25"
              y="6"
              width="7.5"
              height="10.5"
              rx="2.2"
              fill="currentColor"
              fillOpacity="0.75"
            />
            <rect
              x="24.5"
              y="6"
              width="7.5"
              height="7"
              rx="2.2"
              fill="currentColor"
              fillOpacity="0.55"
            />
            <path
              d="M6 27.5C11.5 27.5 14 23 20.5 23H29.5"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M26 19.5L30.5 23L26 26.5"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="text-left">
          <span className={`block font-extrabold tracking-tight text-slate-800 ${titleSize}`}>
            SCRUM{' '}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
              PLANING
            </span>
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Agile &amp; Sprint Hub
          </span>
        </div>
      </div>

      {showSlogan && (
        <p className="mt-3 max-w-xs text-sm font-medium text-slate-600">{BRAND_SLOGAN}</p>
      )}
    </div>
  );
}
