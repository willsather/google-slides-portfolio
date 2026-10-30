"use client";

import { Share2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import LogoIcon from "@/components/icons/logo";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    label: "File",
    items: ["New", "Open", "Make a copy", "Share", "Download", "Print"],
  },
  {
    label: "Edit",
    items: ["Undo", "Redo", "Cut", "Copy", "Paste", "Select all"],
  },
  {
    label: "View",
    items: ["Show ruler", "Show guides", "Show grid", "Full screen"],
  },
  {
    label: "Insert",
    items: ["Image", "Text box", "Shape", "Line", "Video"],
  },
  {
    label: "Format",
    items: ["Text", "Align", "Line spacing", "Lists", "Columns"],
  },
  {
    label: "Slide",
    items: ["New slide", "Duplicate", "Delete", "Skip", "Change background"],
  },
  {
    label: "Arrange",
    items: ["Order", "Align", "Center on page", "Rotate"],
  },
  {
    label: "Tools",
    items: ["Spelling", "Word count", "Preferences"],
  },
  {
    label: "Extensions",
    items: ["Add-ons", "Get add-ons", "Manage add-ons"],
  },
  {
    label: "Help",
    items: ["Documentation", "Keyboard shortcuts", "Report an issue"],
  },
];

export default function Navigation() {
  const router = useRouter();

  const [isStarred, setIsStarred] = useState(false);
  const [presentationName, setPresentationName] = useState(
    "Will Sather Portfolio",
  );

  async function copyShareLink() {
    try {
      const currentUrl = window.location.href;

      await navigator.clipboard.writeText(currentUrl);

      toast.success("Link Copied", {
        description: "The URL has been copied to your clipboard.",
      });
    } catch (error) {
      console.error("Failed to copy", error);

      toast.error("Copy Failed", {
        description: "Unable to copy the URL. Please try again.",
      });
    }
  }

  return (
    <div className="mt-2 flex items-center gap-4 border-b px-4">
      <div className="flex items-center gap-2">
        <LogoIcon className="size-10" />

        <div className="flex flex-col">
          <div className="flex">
            <input
              type="text"
              value={presentationName}
              placeholder="Untitled Presentation"
              onChange={(e) => setPresentationName(e.target.value)}
              className="rounded-sm border border-transparent bg-transparent px-1 py-0.5 text-gray-600 placeholder:text-gray-400 hover:border-gray-400 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />

            <Button
              variant="ghost"
              size="icon"
              className={`size-8 ${isStarred ? "text-yellow-400" : "text-gray-400"}`}
              onClick={() => {
                setIsStarred(!isStarred);
              }}
            >
              <Star
                className={`h-4 w-4 ${isStarred ? "fill-yellow-400" : "fill-none"}`}
              />
            </Button>

            <div className="grow" />
          </div>

          <div className="flex gap-0.5">
            {menuItems.map((menu) => (
              <div key={menu.label} className="group relative">
                <button
                  type="button"
                  className="hover:bg-accent rounded-sm px-3 py-1 text-xs"
                >
                  {menu.label}
                </button>
                <div className="absolute top-full left-0 z-50 hidden group-hover:block">
                  <div className="bg-popover mt-1 w-48 rounded-md border py-1 shadow-md">
                    {menu.items.map((item) => (
                      <button
                        type="button"
                        key={item}
                        className="hover:bg-accent block w-full px-4 py-2 text-left text-xs"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="my-1 ml-auto">
          <Button
            variant="outline"
            onClick={() => router.push("/present")}
            className="gap-2 rounded-2xl"
          >
            Slideshow
          </Button>
        </div>

        <Button
          variant="outline"
          className="gap-2 rounded-2xl bg-blue-300/50 hover:bg-blue-300/40"
          onClick={copyShareLink}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
