import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
  icon?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className,
  icon = true,
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 ease-out focus-visible:outline-offset-4 cursor-pointer";

  const variants = {
    primary: "bg-accent text-[#0a0a0a] hover:bg-foreground",
    secondary:
      "border border-border-strong text-foreground hover:border-accent hover:text-accent",
    ghost: "text-foreground hover:text-accent",
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={16}
          strokeWidth={2.5}
          className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={clsx(base, variants[variant], className)}>
      {content}
    </Link>
  );
}