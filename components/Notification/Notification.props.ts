import { ComponentPropsWithoutRef } from "react";
import { nullableTypes } from "../../models";

export interface IPropsNotification extends ComponentPropsWithoutRef<"div"> {
  errorMessage: nullableTypes<string>;
}
