// @vitest-environment node

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/postcss";
import postcss from "postcss";
import { beforeAll, describe, expect, it } from "vitest";

let css: string;

beforeAll(async () => {
  const from = fileURLToPath(new URL("./globals.css", import.meta.url));
  const result = await postcss([tailwindcss({ optimize: false })]).process(
    await readFile(from, "utf8"),
    { from },
  );
  css = result.css;
});

describe("portfolio styles", () => {
  it("preserves the existing palette, custom radii, and font options", () => {
    expect(css).toContain("--color-blue-300: #93c5fd");
    expect(css).toContain("--color-yellow-400: #facc15");
    expect(css).toContain("border-radius: calc(var(--radius) - 4px)");
    expect(css).toContain("hsl(var(--primary))");
    for (const font of ["sans", "serif", "mono"])
      expect(css).toContain(`.font-${font}`);
  });

  it("keeps dropdown animations, shadows, and accessible focus outlines", () => {
    expect(css).toContain("@keyframes enter");
    expect(css).toContain("@keyframes exit");
    expect(css).toContain(".shadow-xs");
    expect(css).toContain(".shadow-sm");
    expect(css).toContain("outline: 2px solid transparent");
  });

  it("preserves hover menus on touch devices", () => {
    expect(css).toContain(".group-hover\\:block");
    expect(css).not.toContain("@media (hover: hover)");
  });
});
