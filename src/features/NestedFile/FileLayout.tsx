import type { FILe_TYPE, FilesStructure } from "types/nestedFile";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleRight, FaAngleUp, FaTrash } from "react-icons/fa";
import { FiFilePlus, FiFolderPlus } from "react-icons/fi";
import { FcFile, FcFolder, FcOpenedFolder } from "react-icons/fc";
import { VscCollapseAll } from "react-icons/vsc";
import styles from "./FileLayout.module.scss";

type Props = {
  media: FilesStructure;
  selectedFile: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<string>>;
  addNewFileType: FILe_TYPE | null;
  setAddNewFileType: React.Dispatch<React.SetStateAction<FILe_TYPE | null>>;
  handleInsert: (folderId: string, name: string, type: FILe_TYPE) => void;
  handleUpdate: (fileId: string, newName: string) => void;
  handleRemove: (fileId: string) => void;
  handleExpand: (fileId: string, expand?: boolean) => void;
  handleCollapseAll: () => void;
};

const FileLayout = ({
  media,
  setSelectedFile,
  selectedFile,
  addNewFileType,
  setAddNewFileType,
  handleInsert,
  handleUpdate,
  handleRemove,
  handleExpand,
  handleCollapseAll,
}: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>(media.name); //existing file name when editing
  const [newFileName, setNewFileName] = useState<string>(""); //name of new file to add
  const fileContainerRef = useRef<HTMLDivElement>(null);

  const onActionBtnClick = (btnType: FILe_TYPE) => {
    handleExpand(selectedFile, true);
    setAddNewFileType(btnType);
  };

  const handleAddNewFile = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (newFileName && addNewFileType) {
      if (e.key === "Enter") {
        handleInsert(media.id, newFileName, addNewFileType);
        setEdit(false);
        setNewFileName("");
        setAddNewFileType(null);
      }
    }
  };
  const handleEditFileName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (fileName) {
      if (e.key === "Enter") {
        handleUpdate(media.id, fileName);
        setEdit(false);
      }
    }
  };

  useEffect(() => {
    const checkClick = (e: MouseEvent | TouchEvent) => {
      if (
        fileContainerRef.current &&
        !fileContainerRef.current.contains(e.target as Node)
      ) {
        setSelectedFile("1");
      }
    };
    window.addEventListener("click", checkClick);
    return () => window.removeEventListener("click", checkClick);
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${styles["fileLayout"]}`}
    >
      {/* Root Folder */}
      {media.id === "1" && (
        <>
          {/* root-head */}
          <div className={styles["root-file"]}>
            <div className={styles["heading"]}>
              <span onClick={() => handleExpand(media.id)}>
                {media.expand ? <FaAngleUp /> : <FaAngleDown />}
              </span>
              <h1>{media.name}</h1>
            </div>
            {/* action button */}
            <div className={styles["action-buttons"]}>
              <span onClick={() => onActionBtnClick("file")}>
                <FiFilePlus />
              </span>
              <span onClick={() => onActionBtnClick("folder")}>
                <FiFolderPlus />
              </span>
              <span onClick={handleCollapseAll}>
                <VscCollapseAll />
              </span>
            </div>
          </div>
          {/* root new file input */}
          {addNewFileType && selectedFile === media.id && (
            <div className={styles["root-new-file-input"]}>
              <span>
                {addNewFileType === "folder" ? <FcFolder /> : <FcFile />}
              </span>
              <input
                type="text"
                autoFocus
                value={newFileName}
                onChange={(e) => {
                  setNewFileName(e.target.value);
                }}
                onBlur={() => {
                  setAddNewFileType(null);
                  setNewFileName("");
                }}
                onKeyUp={handleAddNewFile}
              />
            </div>
          )}
        </>
      )}

      {/* not root */}
      {media.id !== "1" && (
        <>
          <div
            className={`${styles["file"]} ${media.type === "file" && "ml-4"}  `}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onDoubleClick={() => setEdit(true)}
            onClick={() => {
              if (media.type === "folder") {
                setSelectedFile(media.id);
              }
            }}
          >
            {/* names */}
            <div className={styles["file-wrap"]}>
              {/* expand and file-icon */}
              <div className={styles["file-icons"]}>
                {media.type === "folder" && (
                  <span onClick={() => handleExpand(media.id)}>
                    {media.expand ? <FaAngleDown /> : <FaAngleRight />}
                  </span>
                )}
                <span>
                  {media.type === "folder" ? (
                    media.expand ? (
                      <FcOpenedFolder />
                    ) : (
                      <FcFolder />
                    )
                  ) : (
                    <FcFile />
                  )}
                </span>
              </div>

              {/* edit input or name */}
              {edit ? (
                <input
                  type="text"
                  value={fileName}
                  autoFocus
                  onChange={(e) => setFileName(e.target.value)}
                  onBlur={() => {
                    setEdit(false);
                    setFileName(media.name);
                  }}
                  onKeyUp={handleEditFileName}
                  className={styles["edit-input"]}
                />
              ) : (
                <h1>{media.name}</h1>
              )}
            </div>

            {/* expand and collapse button */}
            {hover && !edit && (
              <span
                className={styles["remove-btn"]}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(media.id);
                }}
              >
                <FaTrash />
              </span>
            )}
          </div>

          {/* new file input */}
          {addNewFileType && selectedFile === media.id && (
            <div className={styles["new-file-wrapper"]}>
              <span className={styles["file-icon"]}>
                {addNewFileType === "folder" ? <FcFolder /> : <FcFile />}
              </span>
              <input
                type="text"
                autoFocus
                value={newFileName}
                onChange={(e) => {
                  setNewFileName(e.target.value);
                }}
                onBlur={() => {
                  setAddNewFileType(null);
                  setNewFileName("");
                }}
                onKeyUp={handleAddNewFile}
              />
            </div>
          )}
        </>
      )}

      <div className={`${media.id !== "1" && "ml-4"} `}>
        {media.expand &&
          media?.subItems?.map((subItem) => (
            <FileLayout
              key={subItem.id + media.type}
              media={subItem}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              addNewFileType={addNewFileType}
              setAddNewFileType={setAddNewFileType}
              handleInsert={handleInsert}
              handleUpdate={handleUpdate}
              handleRemove={handleRemove}
              handleExpand={handleExpand}
              handleCollapseAll={handleCollapseAll}
            />
          ))}
      </div>
    </div>
  );
};

export default FileLayout;
