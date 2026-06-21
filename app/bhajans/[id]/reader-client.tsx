"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bhajan, Paragraph } from "@/types/bhajans";
import { trans } from "@/lib/transliterate";
import { Download } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { isFavorite, toggleFavorite, } from "@/lib/favorites";

export default function ReaderClient({
  bhajan,
  paragraphs,
}: {
  bhajan: Bhajan;
  paragraphs: Paragraph[];
}) {
  const [index, setIndex] = useState(0);
  const [goTo, setGoTo] = useState("");
  const [favorite, setFavorite] = useState(false);

  const [startX, setStartX] = useState(0);
  const [fontSize, setFontSize] = useState(18);

  const [lang, setLang] = useState<"roman" | "kn">("kn");

  const total = paragraphs.length;

  useEffect(() => {
    setFavorite(isFavorite(bhajan.id));
  }, [bhajan.id]);

  function handleFavorite() {
    toggleFavorite(bhajan.id);
    setFavorite(isFavorite(bhajan.id));
  }

  function safeGoTo(n: number) {
    if (n < 1) return setIndex(0);
    if (n > total) return setIndex(total - 1);
    setIndex(n - 1);
  }

  function handleGo() {
    const num = parseInt(goTo);
    if (isNaN(num)) return;
    safeGoTo(num);
  }
  // 👉 SWIPE START
  function onTouchStart(e: React.TouchEvent) {
    setStartX(e.touches[0].clientX);
  }

  function onTouchEnd(e: React.TouchEvent) {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    // swipe left → next
    if (diff < -50) {
      setIndex((i) => Math.min(i + 1, total - 1));
    }

    // swipe right → prev
    if (diff > 50) {
      setIndex((i) => Math.max(i - 1, 0));
    }
  }
  // 👉 SWIPE END

  const text = paragraphs[index]?.text || "";

  function getText(text: string) {
    if (lang === "kn") return text;
    if (lang === "roman") return trans(text);

    return text;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">


      <div className="flex gap-1 justify-between">
        <div className="flex gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 text-2xl hover:scale-110 hover:bg-transparent border-0 focus:bg-transparent active:bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <Download className="rounded-full stroke-[1px] min-w-6 min-h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col items-center  gap-1 p-1 m-1">
              <a href={`/api/export/bhajan/txt/${bhajan.id}`}><Button variant="outline">Download TXT</Button></a>
              <a href={`/api/export/bhajan/docx/${bhajan.id}`}><Button variant="outline">Download Word</Button></a>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={handleFavorite}>{favorite ? "❤️" : "🤍"}</Button>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" onClick={() => setFontSize((s) => Math.max(14, s - 2))}>A-</Button>
          <Button variant="outline" onClick={() => setFontSize((s) => Math.min(32, s + 2))}>A+</Button>
          <Button variant="outline" onClick={() => setLang("roman")}>EN</Button>
          <Button variant="outline" onClick={() => setLang("kn")}>KN</Button>
        </div>
      </div>
      {/* TITLE */}
      <Card>

        <CardHeader><CardTitle className="text-2xl">{bhajan.title}</CardTitle></CardHeader>

        {bhajan.mainText && (
          <CardContent className="leading-relaxed whitespace-pre-line" style={{ fontSize: `${fontSize}px` }}>
            {getText(bhajan.mainText)}
          </CardContent>
        )}
      </Card>

      {/* TOP CONTROLS */}
      {total > 1 && (
        <Card>
          <CardContent className="flex gap-2 items-center  justify-between">

            <Button variant="outline" onClick={() => setIndex((i) => (i - 1 + total) % total)}>◀ Prev</Button>

            <div className="flex gap-1">
              <Input className="w-24" placeholder="Go to para #" value={goTo} onChange={(e) => setGoTo(e.target.value)} />
              <Button variant="outline" onClick={handleGo}>Go</Button>
            </div>
            <Button variant="outline" onClick={() => setIndex((i) => (i + 1) % total)}>Next ▶</Button>

          </CardContent>
        </Card>
      )}

      {/* PARAGRAPH (SWIPE ENABLED AREA) */}
      <Card
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="min-h-[250px] select-none"
      >
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground text-center">
            Paragraph {index + 1} / {total}
          </CardTitle>
        </CardHeader>

        <CardContent
          className="leading-relaxed whitespace-pre-line"
          style={{ fontSize: `${fontSize}px` }}
        >
          {getText(paragraphs[index]?.text || "")}
        </CardContent>
      </Card>

      {/* BOTTOM NAV */}
      {total > 1 && (
        <Card>
          <CardContent className="flex justify-between">

            <Button variant="outline" onClick={() => setIndex((i) => (i - 1 + total) % total)}>◀ Prev</Button>
            <Button variant="outline" onClick={() => setFontSize(18)}>Reset</Button>
            <Button variant="outline" onClick={() => setIndex((i) => (i + 1) % total)}>Next ▶</Button>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
