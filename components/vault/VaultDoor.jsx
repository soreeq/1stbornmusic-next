'use client';

const RIVETS = 12;
const LOCKS = 8;
const SPOKES = [0, 120, 240];

/**
 * Animated platinum vault door.
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
              <stop offset="0%" stopColor="#f8f8fb" />
              <stop offset="32%" stopColor="#cbcbd5" />
              <stop offset="68%" stopColor="#8b8b97" />
              <stop offset="100%" stopColor="#45454e" />
            </radialGradient>
            <radialGradient id="vd-panel" cx="40%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#bcbcc7" />
              <stop offset="55%" stopColor="#7f7f8b" />
              <stop offset="100%" stopColor="#3a3a42" />
            </radialGradient>
            <linearGradient id="vd-wheel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fdfdfe" />
              <stop offset="45%" stopColor="#b2b2bd" />
              <stop offset="100%" stopColor="#565660" />
            </linearGradient>
            <radialGradient id="vd-bolt" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#f1f1f5" />
              <stop offset="60%" stopColor="#9a9aa5" />
              <stop offset="100%" stopColor="#4e4e57" />
            </radialGradient>
            <linearGradient id="vd-sheen-g" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.22)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
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
          <circle cx="220" cy="220" r="215" fill="#08080a" />
          <circle cx="220" cy="220" r="209" fill="none" stroke="#2a2a31" strokeWidth="2" />

          {/* locking bolts — protrude past the door edge, retract on open */}
          {Array.from({ length: LOCKS }).map((_, i) => (
            <g key={`lock-${i}`} transform={`rotate(${i * (360 / LOCKS)} 220 220)`}>
              <rect className="vault-lock" x="211" y="4" width="18" height="34" rx="4" fill="url(#vd-bolt)" stroke="#26262c" strokeWidth="1" />
            </g>
          ))}

          {/* door body */}
          <circle cx="220" cy="220" r="200" fill="url(#vd-rim)" stroke="#2c2c33" strokeWidth="3" />
          <circle cx="220" cy="220" r="179" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" />
          <circle cx="220" cy="220" r="173" fill="url(#vd-panel)" stroke="#33333b" strokeWidth="2" />

          {/* rivets */}
          {Array.from({ length: RIVETS }).map((_, i) => {
            const a = (i / RIVETS) * Math.PI * 2 - Math.PI / 2;
            const x = (220 + Math.cos(a) * 189).toFixed(2);
            const y = (220 + Math.sin(a) * 189).toFixed(2);
            return <circle key={`rivet-${i}`} cx={x} cy={y} r="6.5" fill="url(#vd-bolt)" stroke="#2c2c33" strokeWidth="1" />;
          })}

          {/* engraved ring text */}
          <text className="vault-ring-text">
            <textPath href="#vd-textring" startOffset="0">
              IRON FIST RECORDS · THE VAULT · DETROIT MI · RESERVED STOCK · 1STBORN ·
            </textPath>
          </text>

          {/* engraved circles */}
          <circle cx="220" cy="220" r="138" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="1.5" />
          <circle cx="220" cy="220" r="134" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

          {/* handle wheel */}
          <g className="vault-wheel">
            <circle cx="220" cy="220" r="96" fill="none" stroke="url(#vd-wheel)" strokeWidth="15" />
            <circle cx="220" cy="220" r="103.5" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
            <circle cx="220" cy="220" r="88.5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            {SPOKES.map(deg => (
              <g key={`spoke-${deg}`} transform={`rotate(${deg} 220 220)`}>
                <rect x="213" y="130" width="14" height="94" rx="6" fill="url(#vd-wheel)" stroke="rgba(0,0,0,0.28)" strokeWidth="1" />
              </g>
            ))}
            <circle cx="220" cy="220" r="30" fill="url(#vd-wheel)" stroke="#2c2c33" strokeWidth="2" />
            <circle cx="220" cy="220" r="12" fill="#33333b" />
            <circle cx="220" cy="220" r="12" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
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
