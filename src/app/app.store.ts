import { App } from './shared/appmodels/app.model';
import { Table } from './shared/appmodels/table.model';
import { Field } from './shared/appmodels/field.model';

export interface AppStore {
  
  apps: App[];
  selectedApp: App;
  tables: Table[];
  selectedTable: Table;
  fields: Field[];
  selectedField: Field;
  appsNew: App[];
  selectedAppNew: App;
  
}