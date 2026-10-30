"use client";

import {
  ChevronDown,
  Circle,
  ImageIcon,
  Layout,
  Printer,
  Redo2,
  Type,
  Undo2,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const tailwindFonts = ["font-sans", "font-serif", "font-mono"];

export default function Toolbar({
  selectedFont,
  setSelectedFont,
}: {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
}) {
  return (
    <div className="m-2 flex items-center gap-2 rounded-xl border-b bg-gray-100 px-4">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Redo2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Printer className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <ZoomIn className="h-4 w-4" />
      </Button>

      <div className="bg-border mx-2 h-4 w-px" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 gap-1 text-xs uppercase">
            {selectedFont.replace("font-", "")}
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {tailwindFonts.map((font) => (
            <DropdownMenuItem
              key={font}
              onClick={() => setSelectedFont(font)}
              className={cn(font, "uppercase")}
            >
              {font.replace("font-", "")}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex rounded border">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Layout className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Type className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Circle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
