import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ActionReducer, Action, Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';

import { Table } from './table.model';
import { AppStore } from '../../app.store';

@Injectable()
export class TableServiceNew {

    constructor(private tablestore: Store<AppStore>) {
        this.tablestore.select('tablesNew');
    }

    initialize(): Table {
        return {id: UUID.UUID(), name: 'Demo', fields: []}; 
    }

    dispatchLoad(tables: Table[]) {
        this.tablestore.dispatch({type: ActionTypes.LOAD, payload: tables});
    }

    dispatchSelectOne(table: Table) {
        this.tablestore.dispatch({type: ActionTypes.SELECT, payload: table});
    }

    dispatchAdd(table: Table) {
        this.tablestore.dispatch({type: ActionTypes.ADD, payload: table});
    }

    dispatchUpdate(table: Table) {
        this.tablestore.dispatch({type: ActionTypes.UPDATE, payload: table});
    }

    dispatchDelete(table: Table) {
        this.tablestore.dispatch({type: ActionTypes.DELETE, payload: table});
    }

    getAllFromStore(): Observable<Table[]> {
        return this.tablestore.select('tablesNew');
    }

    getSelectedFromStore(): Observable<Table> {
        return this.tablestore.select('selectedTableNew');
    }

}

const ActionTypes = {
    LOAD: 'LOAD_TABLE',
    ADD: 'ADD_TABLE',
    UPDATE: 'UPDATE_TABLE',
    DELETE: 'DELETE_TABLE',
    SELECT: 'SELECT_TABLE'
};

export const tablesNew: ActionReducer<Table[]> = (state: Table[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD:
            return [...state, action.payload];
        case ActionTypes.LOAD:
            return action.payload;
        case ActionTypes.UPDATE:
            return state.map(item => {
                return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
            });
        case ActionTypes.DELETE:
            return state.filter(item => {
                return item.id !== action.payload.id;
            });
        default:
            return state;
    }

};

export const selectedTableNew: ActionReducer<Table> = (state: Table = null, action: Action) => {
    switch (action.type) {
        case ActionTypes.SELECT:
            return action.payload;
        default:
            return state;
    }
};