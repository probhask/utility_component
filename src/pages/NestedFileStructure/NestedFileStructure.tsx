import React, { useState } from "react";
import FileLayout from "@components/NestedFile/FileLayout";
import useFileMethod from "@components/NestedFile/hook/useFileMethod";
import type { FILe_TYPE, FilesStructure } from "types/nestedFile";
import styles from "./NestedFileStructure.module.scss";

const getFileList = (): FilesStructure => {
  const data = JSON.parse(localStorage?.getItem("nest-files") as string);

  if (data) {
    return data as FilesStructure;
  }
  const newData: FilesStructure = {
    id: "1",
    name: "Structure",
    type: "folder",
    expand: true,
    subItems: [],
  };
  localStorage.setItem("nest-files", JSON.stringify(newData));
  const setData = JSON.parse(localStorage.getItem("nest-files") as string);
  return setData;
};

const setFileList = (data: FilesStructure) => {
  localStorage.setItem("nest-files", JSON.stringify(data));
};

// sort files tree
const sortFileTree = (fileTree: FilesStructure) => {
  fileTree.subItems
    .sort((a, b) => a.name.localeCompare(b.name))
    .reverse()
    .sort((a, b) => a.type.localeCompare(b.type))
    .reverse();
  if (fileTree.subItems.length > 0) {
    fileTree.subItems.map((obj) => sortFileTree(obj));
  }

  return fileTree;

  // return { ...fileTree, subItems: sortedTree() };
};

const NestedFileStructure: React.FC = () => {
  const [mediaList, setMediaList] = useState<FilesStructure>(getFileList());
  const [selectedFile, setSelectedFile] = useState("1");
  const [addNewFileType, setAddNewFileType] = useState<FILe_TYPE | null>(null);

  // useMethod hook
  const { insert, updateName, remove, expandToggle, collapseAll } =
    useFileMethod();

  // functions
  const handleInsert = (folderId: string, name: string, type: FILe_TYPE) => {
    const updatedData = insert(mediaList, folderId, name, type);
    setFileList(sortFileTree(updatedData));
    setMediaList(sortFileTree(updatedData));
  };

  const handleUpdate = (fileId: string, newName: string) => {
    const updatedData = updateName(mediaList, fileId, newName);
    setFileList(sortFileTree(updatedData));
    setMediaList(sortFileTree(updatedData));
  };

  const handleRemove = (fileId: string) => {
    const updatedData = remove(mediaList, fileId);
    setSelectedFile("1");
    setFileList(sortFileTree({ ...updatedData }));
    setMediaList(sortFileTree({ ...updatedData }));
  };
  const handleExpand = (fileId: string, expand?: boolean) => {
    const updatedData = expandToggle(mediaList, fileId, expand);
    setFileList(sortFileTree({ ...updatedData }));
    setMediaList(sortFileTree({ ...updatedData }));
  };
  const handleCollapseAll = (): void => {
    const updatedData = collapseAll(mediaList);
    setFileList(sortFileTree(updatedData));
    setMediaList(sortFileTree(updatedData));
  };

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <h1 className="">Nested File Structure</h1>
        <h3>like VS Code</h3>
      </div>

      <div
        className={`${styles["file-tree-wrapper"]} ${
          !mediaList.expand && styles["collapsed-root-tree"]
        }`}
        onClick={() => setSelectedFile("1")}
      >
        <FileLayout
          key={mediaList.id + mediaList.type}
          media={mediaList}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
          addNewFileType={addNewFileType}
          setAddNewFileType={setAddNewFileType}
          handleInsert={handleInsert}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
          handleExpand={handleExpand}
          handleCollapseAll={handleCollapseAll}
        />
      </div>
    </section>
  );
};

export default NestedFileStructure;
