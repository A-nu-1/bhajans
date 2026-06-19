"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <Button variant="ghost" onClick={() => setTheme("light")}>
        ☀️
      </Button>

      <Button variant="ghost" onClick={() => setTheme("dark")}>
        🌙
      </Button>
    </div>
  );
}