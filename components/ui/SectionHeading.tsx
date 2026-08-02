import clsx from "clsx";

type SectionHeadingProps = {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "reveal-heading relative",
        align === "center" && "text-center mx-auto",
        className
      )}
    >
      <div
        className={clsx(
          "flex items-start gap-4",
          align === "center" && "flex-col items-center gap-2"
        )}
      >
        {index && (
          <span className="font-display text-sm font-bold tracking-[0.2em] text-accent">
            {index}
          </span>
        )}
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            {eyebrow}
          </span>
        )}
      </div>
      <h2
        className={clsx(
          "font-display mt-3 text-balance font-extrabold uppercase leading-[0.95] tracking-tight text-foreground",
          "text-[clamp(2.25rem,6vw,4.5rem)]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-5 max-w-xl text-base leading-relaxed text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
