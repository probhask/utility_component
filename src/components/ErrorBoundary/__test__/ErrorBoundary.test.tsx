import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import ErrorBoundary from "../ErrorBoundary";

const ErrorFunc = () => {
  throw new Error("it crashed");
  return <div>oops</div>;
};

describe("Error boundary", () => {
  it("should render error boundary msg", () => {
    render(
      <ErrorBoundary>
        <ErrorFunc />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong./i)).toBeInTheDocument();
  });
});
