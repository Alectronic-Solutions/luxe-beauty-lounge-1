const NOISE_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

interface NoiseOverlayProps {
  opacity?: number;
  size?: number;
  className?: string;
}

export function NoiseOverlay({ opacity = 0.03, size = 128, className = "" }: NoiseOverlayProps) {
  return (
    <div
      className={`absolute inset-0 mix-blend-overlay pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundSize: `${size}px ${size}px`,
      }}
      aria-hidden
    />
  );
}
