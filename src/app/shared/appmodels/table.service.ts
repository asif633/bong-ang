import { Injectable } from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Table } from './table.model';
import { AppStore } from '../../app.store';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TableService {

    constructor(private appstore: Store<AppStore>) { }
    
    initializeTable(): Table{
       return {id: UUID.UUID(), name: 'Demo', fields: []}; 
    }

    dispatchAdd(table: Table){
        this.appstore.dispatch({type: ActionTypes.ADD_Table, payload: table});
    }
    
    dispatchSelect(table: Table): Observable<Table>{
        this.appstore.dispatch({type: ActionTypes.SELECT_Table, payload: table});
        return this.appstore.select('selectedTable');
    }

    dispatchUpdate(table: Table){
        this.appstore.dispatch({type: ActionTypes.UPDATE_Table, payload: table});       
    }

    getAll(): Observable<Table[]>{
        return this.appstore.select('tables');       
    }

    getSingle(): Observable<Table>{
        return this.appstore.select('selectedTable');
    }

    loadTables(tables: Table[]){
        this.appstore.dispatch({type: ActionTypes.LOAD_Table, payload: tables});  
    }

    selectTable(table: Table){
        this.appstore.dispatch({type: ActionTypes.SELECT_Table, payload: table});  
    }
}

export const ActionTypes = {
     LOAD_Table: 'LOAD_Table',
     ADD_Table: 'ADD_Table',
     UPDATE_Table: 'UPDATE_Table',
     DELETE_Table: 'DELETE_Table',
     SELECT_Table: 'SELECT_Table'
}

export const tables: ActionReducer<Table[]> = (state: Table[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD_Table:
            return [...state, action.payload];
        case ActionTypes.LOAD_Table:
            return action.payload;
        case ActionTypes.UPDATE_Table:
            return state.map(item => {
                return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
            });
        case ActionTypes.DELETE_Table:
            return state.filter(item => {
                return item.id !== action.payload.id;
            });
        default:
            return state;
    }

};

export const selectedTable: ActionReducer<Table> = (state: Table = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.SELECT_Table:
      return action.payload;
    default:
      return state;
  }

}