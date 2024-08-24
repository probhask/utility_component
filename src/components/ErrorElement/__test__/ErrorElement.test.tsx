import WidgetApp from "@container/WidgetApp";
import { WidgetAppContext } from "@context/WidgetAppContext";
import { render, screen } from "@testing-library/react";
import { mockWidgetList } from "@utils/MockRenderWithContext";
import { MemoryRouter } from "react-router-dom";
import { it, describe, vi } from "vitest";

const mockContextValue = {
  widgetList: mockWidgetList,
  handleAddNewWidget: vi.fn(),
  deleteWidget: vi.fn(),
  deleteCategory: vi.fn(),
  toggleHideUnHide: vi.fn(),
  handleSearch: vi.fn(),
};
describe("Error Element", () => {
  it("render Error Element", () => {
    render(
      <WidgetAppContext.Provider value={mockContextValue}>
        <MemoryRouter initialEntries={["/wrong-route"]}>
          <WidgetApp />
        </MemoryRouter>
      </WidgetAppContext.Provider>
    );
    screen.debug();
  });
});
