import { Table } from './table.model';
export interface App{
    id: string;
    appName: string;
    type:string;
    cssFramework: string;
    theme: string;
    primaryColor?: string;
    primaryhue?: string;
    secondaryColor?: string;
    secondaryhue?: string;
    tables?: Table[];
}