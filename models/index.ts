import UserStore from "../store/userStore";

export type typesPath = "/" | "/auth" | "/history";

export type nullableTypes<T> = T | null;

export enum enumPaths {
  "/auth" = "Authorization",
  "/" = "Console",
  "/history" = "History",
}

export interface IUser {
  login: string;
  sublogin: string;
  passwd: string;
}

export interface IError {
  id: string;
  explain: string;
}

export interface IHistory {
  id: string;
  title: string;
  request: string;
  status: boolean;
  date: number;
}

export interface IColumn {
  Header: string;
  accessor: string;
}

export interface IOptionsStatic {
  responsive: boolean;
  plugins: Record<string, any>;
}

export interface IDatasetStatic {
  label: string;
  data: number[];
  backgroundColor: string;
}

export interface IDataStatic {
  labels: string[];
  datasets: IDatasetStatic[];
}