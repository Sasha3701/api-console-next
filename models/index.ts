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
  date?: number;
}

export interface IColumn {
  Header: string;
  accessor: string;
}

export interface IOptionsStatic {
  responsive: boolean;
  plugins: Record<string, any>;
  scales?: Record<string, any>;
  bezierCurve?: boolean;
}

export interface IDatasetStatic {
  label?: string;
  data: number[];
  backgroundColor: string;
}

export interface IDataStatic {
  labels: string[];
  datasets: IDatasetStatic[];
}

export interface DateTimeFormatOptions {
  dateStyle?: "full" | "long" | "medium" | "short";
  timeStyle?: "full" | "long" | "medium" | "short";
  calendar?:
    | "buddhist"
    | "chinese"
    | " coptic"
    | "ethiopia"
    | "ethiopic"
    | "gregory"
    | " hebrew"
    | "indian"
    | "islamic"
    | "iso8601"
    | " japanese"
    | "persian"
    | "roc";
  numberingSystem?:
    | "arab"
    | "arabext"
    | " bali"
    | "beng"
    | "deva"
    | "fullwide"
    | " gujr"
    | "guru"
    | "hanidec"
    | "khmr"
    | " knda"
    | "laoo"
    | "latn"
    | "limb"
    | "mlym"
    | " mong"
    | "mymr"
    | "orya"
    | "tamldec"
    | " telu"
    | "thai"
    | "tibt";
  localeMatcher?: "best fit" | "lookup";
  timeZone?: string;
  hour12?: boolean;
  hourCycle?: "h11" | "h12" | "h23" | "h24";
  formatMatcher?: "best fit" | "basic";
  weekday?: "long" | "short" | "narrow";
  era?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  fractionalSecondDigits?: 0 | 1 | 2 | 3;
  timeZoneName?: "long" | "short";
}
