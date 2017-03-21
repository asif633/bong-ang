import { Field } from './field.model';
import { Table } from './table.model';
import { ChildComponent } from './childcomponent.model';
export interface ComponentModel{
    name: string;
    modelInterface: Table;
    service: string;
    router: string;
    childs: ChildComponent[];
}