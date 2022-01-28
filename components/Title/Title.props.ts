import {
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from "react";

type titleTypes = "auth" | "console";

export interface ITitle
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  variant: titleTypes;
}

export interface IPropsTitle extends ComponentPropsWithoutRef<"h1"> {
  children: ReactNode;
  variant: titleTypes;
}
