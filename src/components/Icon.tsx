import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
});

/** Custom drawn icon set — architectural, restrained, single-weight. */
export function IconFormation({ size = 28, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M4 27h24" />
      <path d="M7 27V13l9-6 9 6v14" />
      <path d="M13 27v-7h6v7" />
      <path d="M16 7V3" />
      <path d="M11 16h2M19 16h2" />
    </svg>
  );
}

export function IconStrategy({ size = 28, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="16" cy="16" r="12" />
      <path d="m21 11-3.2 7.2L11 21l3.2-7.2z" />
      <path d="M16 4v3M16 25v3M4 16h3M25 16h3" />
    </svg>
  );
}

export function IconFunding({ size = 28, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M7 4h13l5 5v19H7z" />
      <path d="M20 4v5h5" />
      <path d="M12 22v-6M16 22v-9M20 22v-4" />
      <path d="M11 13.5 16 9l5 3" />
    </svg>
  );
}

export function IconGrowth({ size = 28, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M4 28V4" />
      <path d="M4 28h24" />
      <path d="M8 22h5v6H8zM15 16h5v12h-5zM22 9h5v19h-5z" />
      <path d="m7 15 6-6 4 3 8-8" />
      <path d="M21 4h4v4" />
    </svg>
  );
}

export function IconCompass({ size = 28, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="16" cy="16" r="12" />
      <path d="m20.5 11.5-2.6 6-6 2.6 2.6-6z" />
      <circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconGrid({ size = 28, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="4" y="4" width="10" height="10" />
      <rect x="18" y="4" width="10" height="10" />
      <rect x="4" y="18" width="10" height="10" />
      <path d="M18 18h10v10h-10z" />
      <path d="M23 18v10M18 23h10" />
    </svg>
  );
}

export function IconLayers({ size = 28, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="m16 4 12 6-12 6L4 10z" />
      <path d="m4 16 12 6 12-6" />
      <path d="m4 22 12 6 12-6" />
    </svg>
  );
}

export function IconTarget({ size = 28, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="16" cy="16" r="12" />
      <circle cx="16" cy="16" r="7" />
      <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
      <path d="M16 2v4M16 26v4M2 16h4M26 16h4" />
    </svg>
  );
}

export function IconArrow({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M5 16h21" />
      <path d="m19 9 7 7-7 7" />
    </svg>
  );
}

export function IconChevron({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="m8 12 8 8 8-8" />
    </svg>
  );
}

export function IconCheck({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="m6 17 6.5 6L26 9" />
    </svg>
  );
}

export function IconClose({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M8 8 24 24M24 8 8 24" />
    </svg>
  );
}

export function IconMenu({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M4 10h24M4 17h24M4 24h16" />
    </svg>
  );
}

export function IconAlert({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 10v8" />
      <circle cx="16" cy="22.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCalendar({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="4" y="7" width="24" height="21" />
      <path d="M4 13h24M10 4v6M22 4v6" />
      <path d="M10 18h4v4h-4z" />
    </svg>
  );
}

export function IconClock({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 9v7.5l5 3" />
    </svg>
  );
}

export function IconDoc({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M7 4h13l5 5v19H7z" />
      <path d="M20 4v5h5" />
      <path d="M11 15h10M11 19h10M11 23h6" />
    </svg>
  );
}

export function IconSearch({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="14" cy="14" r="9" />
      <path d="m21 21 7 7" />
    </svg>
  );
}

export const iconMap = {
  formation: IconFormation,
  strategy: IconStrategy,
  funding: IconFunding,
  growth: IconGrowth,
  compass: IconCompass,
  grid: IconGrid,
  layers: IconLayers,
  target: IconTarget,
} as const;

export type IconName = keyof typeof iconMap;

export function Icon({ name, ...rest }: IconProps & { name: IconName }) {
  const Cmp = iconMap[name];
  return <Cmp {...rest} />;
}

/** Brand mark: an ascending chevron within a structural frame. */
export function BrandMark({ size = 34, tone = "light" }: { size?: number; tone?: "light" | "dark" }) {
  const fg = tone === "light" ? "#F7F5F0" : "#101A2C";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="3" fill={tone === "light" ? "#101A2C" : "#F7F5F0"} />
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="3" stroke="#C6A66B" strokeOpacity="0.5" strokeWidth="1" fill="none" />
      <path d="M20 8.5 30.5 31h-5.2L20 19.2 14.7 31H9.5z" fill="#C6A66B" />
      <path d={fg ? "M13 31h14" : ""} stroke="#C6A66B" strokeOpacity="0.45" strokeWidth="1" />
    </svg>
  );
}
