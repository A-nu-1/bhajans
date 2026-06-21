"use client";

import { Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const themes = [
    {
      name: "light",
      className: "bg-white border",
    },
    {
      name: "dark",
      className: "bg-black border",
    },
    {
      name: "sunset",
      className:
        "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400",
    },
    {
      name: "beach",
      className:
        "bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400",
    },
    {
      name: "peach",
      className:
        "bg-gradient-to-r from-pink-500 via-pink-400 to-orange-500",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost"  className="w-8 text-2xl hover:scale-110 hover:bg-transparent border-0 focus:bg-transparent active:bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
          🎨
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex gap-2 p-3">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setTheme(theme.name)}
            className={`h-4 w-6 rounded-full cursor-pointer transition-transform hover:scale-110 ${theme.className}`}
            title={theme.name}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}