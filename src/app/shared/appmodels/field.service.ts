import { Injectable } from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Field } from './field.model';
import { AppStore } from '../../app.store';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Observable';
import { Table } from './table.model';

@Injectable()
export class FieldService {

    constructor(private appstore: Store<AppStore>) { }
    

    initializeField(): Field{
       return {id: UUID.UUID(), fieldName: 'demo', type: '', min: '', max: '', pattern: '', datatype: ''};
    }

    dispatchAdd(field: Field){
        this.appstore.dispatch({type: ActionTypes.ADD_Field, payload: field});
    }
    
    dispatchSelect(field: Field): Observable<Field>{
        this.appstore.dispatch({type: ActionTypes.SELECT_Field, payload: field});
        return this.appstore.select('selectedField');
    }

    dispatchUpdate(field: Field){
        this.appstore.dispatch({type: ActionTypes.UPDATE_Field, payload: field});       
    }
    
    getAll(tab: Table): Observable<Field[]>{
        this.appstore.dispatch({type: ActionTypes.LOAD_Field, payload: tab.fields});
        return this.appstore.select('fields');
    }

    loadFields(fields: Field[]){
        this.appstore.dispatch({type: ActionTypes.LOAD_Field, payload: fields});
    }

    selectField(field: Field){
        this.appstore.dispatch({type: ActionTypes.SELECT_Field, payload: field});
    }
    
}

export const ActionTypes = {
     LOAD_Field: 'LOAD_Field',
     ADD_Field: 'ADD_Field',
     UPDATE_Field: 'UPDATE_Field',
     DELETE_Field: 'DELETE_Field',
     SELECT_Field: 'SELECT_Field'
}

export const fields: ActionReducer<Field[]> = (state: Field[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD_Field:
            return [...state, action.payload];
        case ActionTypes.LOAD_Field:
            return action.payload;
        case ActionTypes.UPDATE_Field:
            return state.map(item => {
                return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
            });
        case ActionTypes.DELETE_Field:
            return state.filter(item => {
                return item.id !== action.payload.id;
            });
        default:
            return state;
    }

};

export const selectedField: ActionReducer<Field> = (state: Field = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.SELECT_Field:
      return action.payload;
    default:
      return state;
  }

}