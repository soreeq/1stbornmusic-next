'use client';

function gearPath(rOuter, rInner, teeth) {
  const step = (Math.PI * 2) / teeth;
  const toothArc = step * 0.42;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step, a1 = a0 + toothArc, a2 = a0 + step * 0.5, a3 = a2 + toothArc;
    [[rInner, a0], [rOuter, a0], [rOuter, a1], [rInner, a1], [rInner, a2], [rInner, a3]].forEach(([r, a], idx) => {
      const x = (r * Math.cos(a)).toFixed(2);
      const y = (r * Math.sin(a)).toFixed(2);
      d += (i === 0 && idx === 0 ? 'M' : 'L') + x + ',' + y + ' ';
    });
  }
  return d + 'Z';
}

const RIVETS = 12;
const LOCKS = 8;
const WHEEL_GEAR_D = gearPath(84, 64, 14);
const BIG_GEAR_D = gearPath(30, 22, 10);
const SMALL_GEAR_D = gearPath(18, 13, 8);

/**
 * Animated brass vault door.
 * state: 'closed' (idle, wheel slowly turning) | 'opening' (spin → bolts retract → swing)
 */
export default function VaultDoor({ state = 'closed' }) {
  return (
    <div className={`vault-door-wrap ${state}`}>
      <div className="vault-door-glow" />
      <div className="vault-door-3d">
        <svg className="vault-door-svg" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <radialGradient id="vd-rim" cx="35%" cy="28%" r="90%">
              <stop offset="0%" stopColor="#e8c374" />
              <stop offset="32%" stopColor="#c99a4c" />
              <stop offset="68%" stopColor="#8a6c3c" />
              <stop offset="100%" stopColor="#3a2e1e" />
            </radialGradient>
            <radialGradient id="vd-panel" cx="40%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#4a3c28" />
              <stop offset="55%" stopColor="#2e2416" />
              <stop offset="100%" stopColor="#160f09" />
            </radialGradient>
            <linearGradient id="vd-wheel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f6dea0" />
              <stop offset="45%" stopColor="#c99a4c" />
              <stop offset="100%" stopColor="#6b5330" />
            </linearGradient>
            <radialGradient id="vd-bolt" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#e8c374" />
              <stop offset="60%" stopColor="#a8783e" />
              <stop offset="100%" stopColor="#4a3c28" />
            </radialGradient>
            <linearGradient id="vd-sheen-g" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,235,200,0)" />
              <stop offset="50%" stopColor="rgba(255,235,200,0.22)" />
              <stop offset="100%" stopColor="rgba(255,235,200,0)" />
            </linearGradient>
            <clipPath id="vd-clip">
              <circle cx="220" cy="220" r="200" />
            </clipPath>
            <path
              id="vd-textring"
              d="M 220,220 m -155,0 a 155,155 0 1,1 310,0 a 155,155 0 1,1 -310,0"
              fill="none"
            />
          </defs>

          {/* frame */}
          <circle cx="220" cy="220" r="215" fill="#0d0a08" />
          <circle cx="220" cy="220" r="209" fill="none" stroke="#3a2e1e" strokeWidth="2" />

          {/* locking bolts — protrude past the door edge, retract on open */}
          {Array.from({ length: LOCKS }).map((_, i) => (
            <g key={`lock-${i}`} transform={`rotate(${i * (360 / LOCKS)} 220 220)`}>
              <rect className="vault-lock" x="211" y="4" width="18" height="34" rx="4" fill="url(#vd-bolt)" stroke="#2e2416" strokeWidth="1" />
            </g>
          ))}

          {/* door body */}
          <circle cx="220" cy="220" r="200" fill="url(#vd-rim)" stroke="#2e2416" strokeWidth="3" />
          <circle cx="220" cy="220" r="179" fill="none" stroke="rgba(255,235,200,0.28)" strokeWidth="1.5" />
          <circle cx="220" cy="220" r="173" fill="url(#vd-panel)" stroke="#3a2e1e" strokeWidth="2" />

          {/* rivets */}
          {Array.from({ length: RIVETS }).map((_, i) => {
            const a = (i / RIVETS) * Math.PI * 2 - Math.PI / 2;
            const x = (220 + Math.cos(a) * 189).toFixed(2);
            const y = (220 + Math.sin(a) * 189).toFixed(2);
            return <circle key={`rivet-${i}`} cx={x} cy={y} r="6.5" fill="url(#vd-bolt)" stroke="#2e2416" strokeWidth="1" />;
          })}

          {/* engraved ring text */}
          <text className="vault-ring-text">
            <textPath href="#vd-textring" startOffset="0">
              IRON FIST RECORDS · THE VAULT · DETROIT MI · PRESSURE-SEALED · 1STBORN ·
            </textPath>
          </text>

          {/* engraved circles */}
          <circle cx="220" cy="220" r="138" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
          <circle cx="220" cy="220" r="134" fill="none" stroke="rgba(255,235,200,0.12)" strokeWidth="1" />

          {/* manometer */}
          <g transform="translate(130,322)">
            <circle r="26" fill="#1a140d" stroke="url(#vd-wheel)" strokeWidth="3.5" />
            <circle r="20" fill="#221b15" />
            <g stroke="#7a5f34" strokeWidth="1.3">
              <line x1="0" y1="-17" x2="0" y2="-13" />
              <line x1="12" y1="-12" x2="9.5" y2="-9.5" />
              <line x1="17" y1="0" x2="13" y2="0" />
            </g>
            <g className="vd-needle">
              <line x1="0" y1="3" x2="0" y2="-13" stroke="#f2d691" strokeWidth="2" />
              <circle r="3" fill="#f2d691" />
            </g>
          </g>

          {/* small gear cluster */}
          <g transform="translate(316,316)">
            <path d={BIG_GEAR_D} className="vd-gear-cw" fill="url(#vd-wheel)" stroke="#3a2e1e" strokeWidth="1.3" />
            <circle r="8" fill="#1a140d" />
          </g>
          <g transform="translate(350,286)">
            <path d={SMALL_GEAR_D} className="vd-gear-ccw" fill="url(#vd-bolt)" stroke="#3a2e1e" strokeWidth="1.2" />
            <circle r="5" fill="#1a140d" />
          </g>

          {/* handle wheel — gear-toothed valve */}
          <g className="vault-wheel">
            <circle cx="220" cy="220" r="96" fill="none" stroke="url(#vd-wheel)" strokeWidth="15" />
            <circle cx="220" cy="220" r="103.5" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
            <circle cx="220" cy="220" r="88.5" fill="none" stroke="rgba(255,235,200,0.2)" strokeWidth="1" />
            <g transform="translate(220,220)">
              <path d={WHEEL_GEAR_D} fill="url(#vd-wheel)" stroke="#3a2e1e" strokeWidth="1.5" />
            </g>
            <circle cx="220" cy="220" r="30" fill="url(#vd-wheel)" stroke="#3a2e1e" strokeWidth="2" />
            <circle cx="220" cy="220" r="12" fill="#1a140d" />
            <circle cx="220" cy="220" r="12" fill="none" stroke="rgba(255,235,200,0.2)" strokeWidth="1" />
          </g>

          {/* sheen sweep */}
          <g clipPath="url(#vd-clip)">
            <g transform="rotate(24 220 220)">
              <rect className="vault-sheen" x="-340" y="-140" width="200" height="720" fill="url(#vd-sheen-g)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
