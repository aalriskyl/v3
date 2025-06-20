export type ListDataType = {
  id: string;
  name: string;
  no_account: string;
  parent_account: {
    id: string;
    name: string;
  } | null;
  status: boolean;
  type: string;
};

export type DetailDataType = {
  id: string;
  name: string;
  no_account: string;
  parent_account: {
    id: string;
    name: string;
  } | null;
  status: boolean;
  type: string;
};
