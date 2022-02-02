import { IColumn } from "../../models";

export interface IPropsTable {
  columns: IColumn[];
  data: Array<any>;
}
