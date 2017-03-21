import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ActionReducer, Action, Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';

import { Field } from './field.model';
import { AppStore } from '../../app.store';

@Injectable()
export class FieldServiceNew {

    constructor(private fieldstore: Store<AppStore>) {
        this.fieldstore.select('fieldsNew');
    }

    initialize(): Field {
        return {id: UUID.UUID(), fieldName: 'demo', type: '', min: '', max: '', pattern: '', datatype: ''}; 
    }

    dispatchLoad(fields: Field[]) {
        this.fieldstore.dispatch({type: ActionTypes.LOAD, payload: fields});
    }

    dispatchSelectOne(field: Field) {
        this.fieldstore.dispatch({type: ActionTypes.SELECT, payload: field});
    }

    dispatchAdd(field: Field) {
        this.fieldstore.dispatch({type: ActionTypes.ADD, payload: field});
    }

    dispatchUpdate(field: Field) {
        this.fieldstore.dispatch({type: ActionTypes.UPDATE, payload: field});
    }

    dispatchDelete(field: Field) {
        this.fieldstore.dispatch({type: ActionTypes.DELETE, payload: field});
    }

    getAllFromStore(): Observable<Field[]> {
        return this.fieldstore.select('fieldsNew');
    }

    getSelectedFromStore(): Observable<Field> {
        return this.fieldstore.select('selectedFieldNew');
    }

}

const ActionTypes = {
    LOAD: 'LOAD_FIELD',
    ADD: 'ADD_FIELD',
    UPDATE: 'UPDATE_FIELD',
    DELETE: 'DELETE_FIELD',
    SELECT: 'SELECT_FIELD'
};

export const fieldsNew: ActionReducer<Field[]> = (state: Field[] = [], action: Action) => {
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

export const selectedFieldNew: ActionReducer<Field> = (state: Field = null, action: Action) => {
    switch (action.type) {
        case ActionTypes.SELECT:
            return action.payload;
        default:
            return state;
    }
};