"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Changer de thème"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/50 text-foreground transition-all duration-300 hover:bg-accent focus-premium",
        className
      )}
    >
      {mounted ? (
        <Sun
          className={cn(
            "h-4 w-4 transition-all duration-500",
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )}
        />
      ) : null}
      {mounted ? (
        <Moon
          className={cn(
            "absolute h-4 w-4 transition-all duration-500",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          )}
        />
      ) : null}
      {!mounted ? <Moon className="h-4 w-4 opacity-0" /> : null}
    </button>
  );
}
