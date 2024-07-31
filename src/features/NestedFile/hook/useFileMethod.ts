import { FILe_TYPE, FilesStructure } from "types/nestedFile";
import { v4 as uuidv4 } from "uuid";

const useFileMethod = () => {
  // insert
  const insert = (
    fileTree: FilesStructure,
    folderId: string,
    name: string,
    type: FILe_TYPE
  ): FilesStructure => {
    if (fileTree.id === folderId) {
      if (type === "folder") {
        fileTree.subItems?.push({
          id: uuidv4(),
          name,
          type,
          subItems: [],
          expand: false,
        });
      } else {
        fileTree.subItems?.push({ id: uuidv4(), name, type, subItems: [] });
      }
      return fileTree;
    }
    let latestNode: FilesStructure[] = [];
    latestNode = fileTree.subItems.map((tree) => {
      return insert(tree, folderId, name, type);
    });

    return { ...fileTree, subItems: latestNode };
  };

  // update name
  const updateName = (
    fileTree: FilesStructure,
    fileId: string,
    name: string
  ): FilesStructure => {
    if (fileTree.id === fileId) {
      fileTree.name = name;
      return fileTree;
    }

    fileTree.subItems.map((obj) => updateName(obj, fileId, name));
    return { ...fileTree };
  };

  const expandToggle = (
    fileTree: FilesStructure,
    folderId: string,
    expand?: boolean
  ): FilesStructure => {
    if (fileTree.id === folderId) {
      fileTree.expand = expand || !fileTree?.expand;
      return fileTree;
    }
    fileTree.subItems.map((obj) => {
      if (obj.type === "folder") {
        return expandToggle(obj, folderId, expand);
      }
    });
    return { ...fileTree };
  };

  const collapseAll = (fileTree: FilesStructure): FilesStructure => {
    if (fileTree.id !== "1" && fileTree.type === "folder") {
      fileTree.expand = false;
    }
    fileTree.subItems.map((obj) => collapseAll(obj));
    return { ...fileTree };
  };

  // delete name
  const remove = (fileTree: FilesStructure, fileId: string): FilesStructure => {
    for (let index = 0; index < fileTree.subItems.length; index++) {
      const currentFile = fileTree.subItems[index];
      if (fileTree.subItems[index].id === fileId) {
        fileTree.subItems.splice(index, 1);
        return fileTree;
      } else {
        remove(currentFile, fileId);
      }
    }
    return fileTree;
  };

  return { insert, updateName, remove, expandToggle, collapseAll };
};

export default useFileMethod;
