import { IBaseModel } from './base.model';

export class Author implements IBaseModel {
    id?: string;
    ref?: any;
    firstName: string;
    lastName: string;
    avatar: string;
}
