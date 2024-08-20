import { it, expect, describe, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { FilesStructure } from "types/nestedFile";
import NestedFileStructure from "@pages/NestedFileStructure/NestedFileStructure";
import FileLayout from "@components/NestedFile/FileLayout";
import useFileMethod from "@components/NestedFile/hook/useFileMethod";

const mediaObj: FilesStructure = {
  id: "1",
  name: "Structure",
  type: "folder",
  expand: true,
  subItems: [
    {
      id: "11",
      name: "a",
      type: "folder",
      expand: true,
      subItems: [
        {
          id: "111",
          name: "aa.txt",
          type: "file",
          expand: true,
          subItems: [],
        },
      ],
    },
    { id: "12", name: "b.txt", type: "file", expand: true, subItems: [] },
    {
      id: "13",
      name: "c",
      type: "folder",
      expand: true,
      subItems: [
        {
          id: "131",
          name: "ca.txt",
          type: "file",
          expand: true,
          subItems: [],
        },
      ],
    },
  ],
};

describe("UI test cases", () => {
  const renderFunction = () => {
    render(<NestedFileStructure />);
    return {
      heading: screen.getByRole("heading", { name: /nested file/i }),
      addFileBtn: screen.getByTitle(/addfilebtn/i),
      addFolderBtn: screen.getByTitle(/addfolderbtn/i),
      collapseAllBtn: screen.getByTitle(/collapseallbtn/i),
    };
  };
  it("nestedFile heading", async () => {
    const { heading } = renderFunction();
    expect(heading).toBeInTheDocument();
  });

  it("action buttons ", async () => {
    userEvent.setup();
    const { addFileBtn, addFolderBtn, collapseAllBtn } = renderFunction();
    expect(addFileBtn).toBeInTheDocument();
    expect(addFolderBtn).toBeInTheDocument();
    expect(collapseAllBtn).toBeInTheDocument();
  });
});

describe("action button click functionality", () => {
  const renderFunction = () => {
    render(<NestedFileStructure />);
    return {
      addFileBtn: screen.getByTitle(/addfilebtn/i),
      addFolderBtn: screen.getByTitle(/addfolderbtn/i),
      collapseAllBtn: screen.getByTitle(/collapseallbtn/i),
    };
  };
  it("add file btn functionality", async () => {
    const { addFileBtn } = renderFunction();
    await userEvent.click(addFileBtn);
    expect(screen.getByPlaceholderText(/add new/i)).toBeInTheDocument();
  });
});

describe("File layout test case", () => {
  const mockHandleRemove = vi.fn();
  const renderFileLayout = () => {
    render(
      <FileLayout
        addNewFileType={null}
        handleCollapseAll={vi.fn()}
        handleExpand={vi.fn()}
        handleInsert={vi.fn()}
        handleRemove={mockHandleRemove}
        handleUpdate={vi.fn()}
        selectedFile=""
        setAddNewFileType={vi.fn()}
        setSelectedFile={vi.fn()}
        media={mediaObj}
      />
    );
    return { screen };
  };
  it("file name change", async () => {
    userEvent.setup();
    const { screen } = renderFileLayout();

    const testFile = screen.getByText("a");
    expect(testFile).toBeInTheDocument();

    await userEvent.dblClick(testFile);

    const editInputBox = screen.getByTitle(/edit name/i);
    expect(editInputBox).toBeInTheDocument();

    await userEvent.clear(editInputBox);
    await act(async () => {
      await userEvent.type(editInputBox, "pub[Key13]"); //type and enter
    });
    expect(testFile).not.toBeInTheDocument();
    expect(editInputBox).toHaveValue("pub");
    fireEvent.keyPress(editInputBox, { key: "enter", keyCode: 13 });

    // expect(screen.getByRole("heading", { name: "pub" })).toBeInTheDocument();
  });

  it("delete node button on hover", async () => {
    userEvent.setup();
    const { screen } = renderFileLayout();
    const fileNode = screen.getByTitle("file wrapper 11");

    await userEvent.hover(fileNode);
    const removeBtn = screen.getByTitle(/remove/i);
    expect(removeBtn).toBeInTheDocument();
  });
  it("delete node button not appear if not hovered", async () => {
    userEvent.setup();
    const { screen } = renderFileLayout();
    const removeBtn = screen.queryByTitle(/remove/i);
    expect(removeBtn).not.toBeInTheDocument();
  });

  //   it("delete node button functionality", async () => {
  //     renderFileLayout();

  //     const user = userEvent.setup();
  //     const fileNode = screen.getByTitle("file wrapper 11");
  //     await user.hover(fileNode);

  //     const removeBtn = screen.getByTitle(/remove file 11/i);
  //     expect(removeBtn).toBeInTheDocument();

  //     await user.click(removeBtn);
  //     // expect(mockHandleRemove).toHaveBeenCalledWith("11");

  //     expect(screen.queryByTitle("file wrapper 11")).toBeInTheDocument();
  //   });
});

describe("useFile hook methods functionality", () => {
  it("insert method ", async () => {
    const { insert } = useFileMethod();

    const result = insert(mediaObj, "11", "TestFolder", "folder");
    const insertFolder = result.subItems[0].subItems.find(
      (item) => item.name === "TestFolder" && item.type === "folder"
    );

    expect(insertFolder).toBeDefined();
    expect(insertFolder?.name).toBe("TestFolder");
    expect(insertFolder?.type).toBe("folder");
    expect(insertFolder?.subItems).toEqual([]);
    expect(insertFolder?.expand).toBe(false);
  });
  it("edit method ", async () => {
    const { updateName } = useFileMethod();

    const insertResult = updateName(mediaObj, "11", "testEditName");

    const isNameUpdated = insertResult.subItems[0];
    expect(isNameUpdated).toBeDefined();
    expect(isNameUpdated?.name).toBe("testEditName");
    expect(isNameUpdated?.type).toBe("folder");
  });
  it("remove method ", async () => {
    const { remove } = useFileMethod();
    const insertResult = remove(mediaObj, "11");

    const isNameUpdated = insertResult.subItems[0];
    expect(isNameUpdated?.id).not.toBe("11");
  });
  it("collapse all ", async () => {
    const { collapseAll } = useFileMethod();
    const insertResult = collapseAll(mediaObj);

    const iterateCheckExpand = (item: FilesStructure) => {
      if (item.id !== "1" && item.type !== "file" && item.expand === true) {
        console.log("inside log", item);
        return true;
      }
      if (item.subItems && item.subItems.length > 0) {
        item.subItems.forEach((subItem) => iterateCheckExpand(subItem));
      }
    };

    expect(iterateCheckExpand(insertResult)).toBeUndefined();
  });
});
