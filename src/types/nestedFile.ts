export type FILe_TYPE = "file" | "folder";
export type FilesStructure = {
  id: string;
  name: string;
  type: FILe_TYPE;
  expand?: boolean;
  subItems: FilesStructure[];
};
