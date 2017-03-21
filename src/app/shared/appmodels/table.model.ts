import { Field } from './field.model';
export interface Table{
    id: string;
    name: string;
    nameLowercase?: string;
    fields: Field[];
}