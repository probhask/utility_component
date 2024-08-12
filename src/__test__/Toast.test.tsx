import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Toast from "@pages/Toast/Toast";
import userEvent from "@testing-library/user-event";
describe("toast file test case", () => {
  const renderComponent = () => {
    render(<Toast />);
    return {
      heading: screen.getByRole("heading", { name: /toast/i }),
      top_left_btn: screen.getByRole("button", { name: /top-left/i }),
      success_btn: screen.getByRole("button", { name: /success/i }),
      error_btn: screen.getByRole("button", { name: /error/i }),
    };
  };

  it("toast hading", async () => {
    const { heading } = renderComponent();
    expect(heading).toBeInTheDocument();
  });

  it("btn check", async () => {
    const { top_left_btn, success_btn, error_btn } = renderComponent();
    expect(top_left_btn).toBeInTheDocument();
    expect(success_btn).toBeInTheDocument();
    expect(error_btn).toBeInTheDocument();
  });
  it("success message", async () => {
    userEvent.setup();
    const { top_left_btn, success_btn } = renderComponent();

    await userEvent.click(top_left_btn);

    await userEvent.click(success_btn);
    const success_msg = screen.getByText(/task/i);
    console.log(success_msg.style.position);

    expect(success_msg).toBeTruthy();
  });
  it("error message", async () => {
    userEvent.setup();
    const { top_left_btn, error_btn } = renderComponent();

    await userEvent.click(top_left_btn);

    await userEvent.click(error_btn);
    const error_msg = screen.getByText(/fail/i);
    expect(error_msg).toBeInTheDocument();
  });
});
