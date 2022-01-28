import { ReactNode } from "react";

type mainTypes = "auth" | "console";

export interface IPropsMain {
  variant: mainTypes;
  children: ReactNode;
}
