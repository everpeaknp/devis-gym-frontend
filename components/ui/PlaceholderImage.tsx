import { ImageIcon } from "lucide-react";
import clsx from "clsx";

type PlaceholderImageProps = {
  label?: string;
  className?: string;
  ratio?: "square" | "portrait" | "landscape" | "wide";
};

const ratios: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

/**
 * Used anywhere real photography has not yet been supplied. Intentionally
 * styled so it reads as "content pending" rather than a broken image —
 * never a random stock photo.
 */
export default function PlaceholderImage({
  label = "Photo coming soon",
  className,
  ratio = "landscape",
}: PlaceholderImageProps) {
  return (
    <div
      className={clsx(
        "relative flex w-full items-center justify-center overflow-hidden border border-border bg-background-elevated",
        ratios[ratio],
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)",
          color: "var(--foreground)",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <ImageIcon size={28} strokeWidth={1.5} className="text-muted-dim" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-dim">
          {label}
        </span>
      </div>
    </div>
  );
}
