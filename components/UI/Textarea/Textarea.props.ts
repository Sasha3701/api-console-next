import {ComponentPropsWithoutRef, DetailedHTMLProps, HTMLAttributes} from 'react';

type textareaTypes = 'in' | 'out';

export interface ITextarea extends DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  variant?: textareaTypes;
  error: boolean;
}

export interface ILabel extends DetailedHTMLProps<HTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  error: boolean;
}

export interface IPropsTetxarea extends ComponentPropsWithoutRef<'textarea'> {
  label: string;
  variant?: textareaTypes;
  name: string;
  error?: boolean;
}
