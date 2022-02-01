import {ComponentPropsWithoutRef} from 'react';
import { typesPath } from '../../../models';

export interface IPropsLink extends ComponentPropsWithoutRef<'a'> {
    path: typesPath
}
