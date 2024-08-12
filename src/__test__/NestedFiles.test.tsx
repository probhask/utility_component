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
      expand: false,
      subItems: [
        {
          id: "111",
          name: "aa.txt",
          type: "file",
          expand: false,
          subItems: [],
        },
      ],
    },
    { id: "12", name: "b.txt", type: "file", expand: false, subItems: [] },
    {
      id: "13",
      name: "c",
      type: "folder",
      expand: false,
      subItems: [
        {
          id: "131",
          name: "ca.txt",
          type: "file",
          expand: false,
          subItems: [],
        },
      ],
    },
  ],
};

describe("nested file structure test cases", () => {
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
  it("add file btn", async () => {
    const { addFileBtn } = renderFunction();

    await userEvent.click(addFileBtn);

    expect(screen.getByPlaceholderText(/add new/i)).toBeInTheDocument();
  });
});

describe("File layout comp", () => {
  const renderFileLayout = () => {
    render(
      <FileLayout
        addNewFileType={null}
        handleCollapseAll={vi.fn()}
        handleExpand={vi.fn()}
        handleInsert={vi.fn()}
        handleRemove={vi.fn()}
        handleUpdate={vi.fn()}
        selectedFile="11"
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

    const testFile = screen.getByText(/a/i);
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
    const fileNode = screen.getByTitle(/file wrapper 11/i);

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

  //TODO::Complete test this delete node functionality
  it("delete node button functionality", async () => {
    userEvent.setup();
    const { screen } = renderFileLayout();
    const fileNode = screen.getByTitle(/file wrapper 11/i);

    await userEvent.hover(fileNode);
    // console.log(fileNode);

    const removeBtn = screen.getByTitle(/remove file 11/i);
    expect(removeBtn).toBeInTheDocument();

    fireEvent.click(removeBtn);
    expect(screen.getByText("a")).toBeInTheDocument();

    console.log(screen.queryAllByTitle(/file wrapper/i).map((e) => e.title));
  });
});

describe("useFile hook", () => {
  it("insert method test case", async () => {
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
  it("edit method check", async () => {
    const { updateName } = useFileMethod();

    const insertResult = updateName(mediaObj, "11", "testEditName");

    const isNameUpdated = insertResult.subItems[0];
    expect(isNameUpdated).toBeDefined();
    expect(isNameUpdated?.name).toBe("testEditName");
    expect(isNameUpdated?.type).toBe("folder");
  });
});
