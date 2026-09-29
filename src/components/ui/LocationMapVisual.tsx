import { useId } from "react";

interface LocationMapVisualProps {
  className?: string;
  mapHeightClass?: string;
  showBadges?: boolean;
}

export function LocationMapVisual({
  className = "",
  mapHeightClass = "h-40 sm:h-48",
  showBadges = true,
}: LocationMapVisualProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const beaconGlowId = `beacon-glow-${uniqueId}`;
  const roadGlowId = `road-glow-${uniqueId}`;
  const nightGridId = `night-grid-${uniqueId}`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-[#090a0d] border border-white/[0.08] ${mapHeightClass} ${className}`}
    >
      {/* SVG Night Grid & Road Map Visual */}
      <svg
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={beaconGlowId} cx="62%" cy="46%" r="50%">
            <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#c9a96e" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={roadGlowId} x1="0%" y1="100%" x2="62%" y2="46%">
            <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#c9a96e" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#f5e6c8" stopOpacity="1" />
          </linearGradient>
          <pattern id={nightGridId} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Night Grid pattern */}
        <rect width="100%" height="100%" fill="#0a0b0e" />
        <rect width="100%" height="100%" fill={`url(#${nightGridId})`} />

        {/* Ambient glow centered on Skybliss */}
        <circle cx="248" cy="92" r="90" fill={`url(#${beaconGlowId})`} />

        {/* Muted Secondary City Roads */}
        <path d="M-20 40 Q 120 70, 200 45 T 420 30" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="4" />
        <path d="M-20 160 Q 150 140, 280 170 T 420 150" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="3" />
        <path d="M 120 -20 Q 135 90, 110 220" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="3.5" />
        <path d="M 340 -20 Q 325 110, 350 220" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="3" />
        <path d="M 60 120 L 248 92 L 380 110" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="2.5" />

        {/* Primary Arterial: Villianur Main Road */}
        <path
          d="M -20 115 C 80 110, 160 102, 248 92 C 310 85, 370 75, 420 68"
          fill="none"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Glowing Route to Skybliss */}
        <path
          d="M 15 113 C 90 108, 170 101, 248 92"
          fill="none"
          stroke={`url(#${roadGlowId})`}
          strokeWidth="3.5"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />

        {/* Road Label: Villianur Main Road */}
        <text
          x="58"
          y="98"
          fill="rgba(201, 169, 110, 0.65)"
          fontSize="7"
          fontFamily="sans-serif"
          letterSpacing="0.18em"
          fontWeight="600"
          transform="rotate(-3 58 98)"
        >
          VILLIANUR MAIN ROAD
        </text>
        <text
          x="290"
          y="74"
          fill="rgba(255, 255, 255, 0.35)"
          fontSize="6.5"
          fontFamily="sans-serif"
          letterSpacing="0.14em"
        >
          REDDIARPALAYAM
        </text>

        {/* Start Point / "You are here" indicator */}
        <g transform="translate(25, 113)">
          <circle r="4" fill="#c9a96e" opacity="0.4" />
          <circle r="2" fill="#fff" />
          <text
            x="8"
            y="3"
            fill="rgba(255,255,255,0.7)"
            fontSize="6"
            fontFamily="sans-serif"
            letterSpacing="0.1em"
          >
            YOU ARE HERE
          </text>
        </g>

        {/* Animated radar rings at Skybliss Pin */}
        <circle
          cx="248"
          cy="92"
          r="18"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="1"
          opacity="0.35"
          className="animate-ping"
          style={{ transformOrigin: "248px 92px", animationDuration: "3s" }}
        />
        <circle cx="248" cy="92" r="8" fill="none" stroke="#c9a96e" strokeWidth="1.5" opacity="0.7" />

        {/* Premium Location Pin at Skybliss */}
        <g transform="translate(248, 92)">
          <path
            d="M 0 0 C -4 -4, -7 -9, -7 -13 A 7 7 0 1 1 7 -13 C 7 -9, 4 -4, 0 0 Z"
            fill="#c9a96e"
            filter="drop-shadow(0 2px 6px rgba(201,169,110,0.6))"
          />
          <circle cx="0" cy="-13" r="2.8" fill="#000" />
          <circle cx="0" cy="-13" r="1.4" fill="#c9a96e" />
        </g>
      </svg>

      {/* Floating Badges */}
      {showBadges && (
        <>
          {/* Floating Skybliss Rooftop Badge over Map */}
          <div className="absolute top-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-gold/40 shadow-lg flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-sans text-[10px] text-white font-medium tracking-wide">
              4th Floor · Skybliss
            </span>
          </div>

          {/* Live Route Callout Pill */}
          <div className="absolute bottom-2.5 left-2.5 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5 pointer-events-none">
            <span className="font-sans text-[9px] text-white/60 tracking-wider uppercase">Destination</span>
            <span className="font-sans text-[9px] text-gold font-medium">Hotel Aishwarya Grand</span>
          </div>
        </>
      )}
    </div>
  );
}
