import { ComponentPropsWithoutRef } from "react";
import { nullableTypes, StoreProps } from "../../models";

export interface IPropsNotification extends ComponentPropsWithoutRef<"div"> {
  errorMessage: nullableTypes<string>;
}
