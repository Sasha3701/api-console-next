import { ComponentPropsWithoutRef, ReactNode } from "react";

type buttonTypes = "transparent" | "fill";

export interface IPropsButton extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  variant?: buttonTypes;
  loading?: boolean;
}
