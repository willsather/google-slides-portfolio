import { getByRole, queryByRole } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Slides from "@/app/slides";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  push.mockClear();
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});

describe("slides", () => {
  it("preserves social links and their brand icons", async () => {
    await act(async () => root.render(<Slides />));

    for (const name of ["GitHub", "LinkedIn", "Twitter"]) {
      const link = getByRole(container, "link", { name });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.querySelector("svg path")).not.toBeNull();
    }
  });

  it("navigates with the keyboard without going past either end", async () => {
    const user = userEvent.setup();
    await act(async () => root.render(<Slides />));
    await act(async () => user.keyboard("{ArrowLeft}"));
    expect(
      getByRole(container, "heading", { name: "Will Sather" }),
    ).toBeInTheDocument();

    await act(async () => user.keyboard("{ArrowRight}"));
    expect(
      getByRole(container, "heading", { name: "Personal Website" }),
    ).toBeInTheDocument();

    await act(async () => user.keyboard("{ArrowRight>10/}"));
    expect(
      getByRole(container, "heading", { name: "MN Civic Tech" }),
    ).toBeInTheDocument();
    await act(async () => user.keyboard("{Escape}"));
    expect(push).toHaveBeenCalledWith("/");
  });

  it("selects slides through the sidebar buttons", async () => {
    const user = userEvent.setup();
    await act(async () => root.render(<Slides />));
    await act(async () =>
      user.click(getByRole(container, "button", { name: /2\s*Website/ })),
    );
    expect(
      getByRole(container, "heading", { name: "Personal Website" }),
    ).toBeInTheDocument();
  });

  it("changes the slide font through the Radix menu", async () => {
    const user = userEvent.setup();
    await act(async () => root.render(<Slides />));
    await act(async () =>
      user.click(getByRole(container, "button", { name: "sans" })),
    );
    await act(async () =>
      user.click(getByRole(document.body, "menuitem", { name: "serif" })),
    );
    expect(
      getByRole(container, "button", { name: "serif" }),
    ).toBeInTheDocument();
    expect(container.querySelector(".font-serif")).not.toBeNull();
  });

  it("hides editing controls in presentation mode", async () => {
    await act(async () => root.render(<Slides present />));
    expect(
      queryByRole(container, "button", { name: "sans" }),
    ).not.toBeInTheDocument();
    expect(
      queryByRole(container, "button", { name: /2\s*Website/ }),
    ).not.toBeInTheDocument();
    expect(
      getByRole(container, "heading", { name: "Will Sather" }),
    ).toBeInTheDocument();
  });
});
