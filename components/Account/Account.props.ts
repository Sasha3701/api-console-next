import {ComponentPropsWithoutRef} from 'react';
import {nullableTypes} from '../../models';

export interface IPropsAccount extends ComponentPropsWithoutRef<'div'> {
  login: nullableTypes<string>;
  sublogin: nullableTypes<string>;
}
