import { ReactNode } from "react";

type mainTypes = "auth" | "console" | "history";

export interface IPropsMain {
  variant: mainTypes;
  children: ReactNode;
}
