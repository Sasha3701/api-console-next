export type typesPath = "/" | "/auth";

export type nullableTypes<T> = T | null;

export enum enumPaths {
  "/auth" = "Authorization",
  "/" = "Console",
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