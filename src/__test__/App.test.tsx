import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "../App";
import routes from "@routes/routes";
import { MemoryRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "@pages/Home/Home";
import userEvent from "@testing-library/user-event";
import Toast from "@pages/Toast/Toast";
import NestedFileStructure from "@pages/NestedFileStructure/NestedFileStructure";

it("first matcher", async () => {
  render(<App />);

  // const heading = screen.getByText(/hell/i);
  // expect(heading).toBeInTheDocument();
  expect(true).toBeTruthy();
});

describe("App Routing", () => {
  it("should render Home page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Verify if the Home component content is rendered
    expect(screen.getByText(/utility/i)).toBeInTheDocument();
  });
});

describe("Home Navigation", () => {
  it("should navigate to Toast page on click", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toast" element={<Toast />} />
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const toastLink = screen.getByText(/Toast Notification/i);
    await user.click(toastLink);

    expect(screen.getByText(/toast notification/i)).toBeInTheDocument();
    expect(screen.getByText(/select position/i)).toBeInTheDocument();
    expect(screen.getByText(/select type/i)).toBeInTheDocument();
  });

  it("should navigate to Nested File Structure page on click", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nested-file" element={<NestedFileStructure />} />
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const nestedFileLink = screen.getByText(/Nested File/i);
    await user.click(nestedFileLink);

    expect(screen.getByText(/Nested File Structure/i)).toBeInTheDocument();
  });
});
