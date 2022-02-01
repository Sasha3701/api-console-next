import {ChangeEvent, DetailedHTMLProps, HTMLAttributes} from 'react';
import {nullableTypes} from '../../models';

export interface IWrapperConsole extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  widthIn: nullableTypes<number>;
  padSide: number;
}

export interface IPropsConsole {
  padSide?: number;
  minWidth?: number;
  errorInput: boolean;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
