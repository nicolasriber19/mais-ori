// Búzio desenhado em SVG: aberto mostra a fenda com os dentes; fechado mostra o dorso.

const DENTES = [18, 24, 30, 36, 42, 48, 54, 60];

export function Buzio({ aberto, style, className }: { aberto: boolean; style?: React.CSSProperties; className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} style={style} aria-hidden="true">
      <ellipse cx="30" cy="40" rx="25" ry="35" fill={aberto ? "#efe3c8" : "#e4d3ae"} stroke="#9c845a" strokeWidth="1.5" />
      {aberto ? (
        <>
          <ellipse cx="30" cy="40" rx="18" ry="29" fill="#f7eedb" />
          <path d="M30 9 C25 25 25 55 30 71 C35 55 35 25 30 9 Z" fill="#3a2717" />
          {DENTES.map((y) => (
            <g key={y} stroke="#e9dcc0" strokeWidth="2" strokeLinecap="round">
              <line x1="27.5" y1={y} x2="23.5" y2={y + 1} />
              <line x1="32.5" y1={y} x2="36.5" y2={y + 1} />
            </g>
          ))}
        </>
      ) : (
        <>
          <ellipse cx="30" cy="40" rx="21" ry="31" fill="#d8c393" />
          <ellipse cx="24" cy="28" rx="7" ry="12" fill="#f3e7cc" opacity="0.65" />
          <circle cx="36" cy="50" r="2" fill="#b49a69" />
          <circle cx="30" cy="58" r="1.5" fill="#b49a69" />
          <circle cx="38" cy="38" r="1.3" fill="#b49a69" />
        </>
      )}
    </svg>
  );
}
