import Home from "@pages/Home/Home";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe.only("home test case", () => {
  it("home matcher", async () => {
    userEvent.setup();
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const home_heading = screen.getByText(/utility/i);
    expect(home_heading).toBeInTheDocument();
  });
  it("link navigation", async () => {
    userEvent.setup();
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    // const nestedLinkBtn = screen.getByRole("link", { name: /nested file/i });
    // expect(nestedLinkBtn).toBeInTheDocument();

    // await act(async () => {
    //   await userEvent.click(nestedLinkBtn);
    // });

    // expect(screen.getByText(/nested file structure/i)).toBeInTheDocument();
  });
});
