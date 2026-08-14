import logoUrl from "@/assets/botsync-logo.jpg";
import { cn } from "@/lib/utils";

export function Logo({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img
        src={logoUrl}
        alt="BotSync logo"
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        className="rounded-lg border border-border object-cover"
        style={{ width: size, height: size }}
      />
      <span className="font-display text-lg font-bold tracking-tight">
        Bot<span className="text-gradient">Sync</span>
      </span>
    </span>
  );
}
