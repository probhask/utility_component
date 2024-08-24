import { render, screen } from "@testing-library/react";
import App from "../../../App";
import { MemoryRouter } from "react-router-dom";
import { it, describe } from "vitest";

describe("Error Element", () => {
  it("render Error Element", () => {
    render(
      <MemoryRouter initialEntries={["/wrong-route"]}>
        <App />
      </MemoryRouter>
    );
    screen.debug();
  });
});
