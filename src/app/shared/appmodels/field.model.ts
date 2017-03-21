import { DataType } from './datatype.enum';
export interface Field{
    id: string;
    fieldName: string;
    type: string;
    min?: string;
    max?: string;
    pattern?: string;
    datatype: string;

}