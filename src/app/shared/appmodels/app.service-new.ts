import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ActionReducer, Action, Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';

import { App } from './app.model';
import { AppStore } from '../../app.store';

@Injectable()
export class AppServiceNew {

    constructor(private appstore: Store<AppStore>) {
        this.appstore.select('appsNew');
    }

    initialize(): App {
        return {id: UUID.UUID(), appName: 'firebase-angular2', type: 'firebase', cssFramework: 'material', theme: '',  tables: [], primaryColor: 'orange', primaryhue: '700', secondaryColor: 'blue', secondaryhue: '700'}; 
    }

    dispatchLoad(apps: App[]) {
        this.appstore.dispatch({type: ActionTypes.LOAD, payload: apps});
    }

    dispatchSelectOne(app: App) {
        this.appstore.dispatch({type: ActionTypes.SELECT, payload: app});
    }

    dispatchAdd(app: App) {
        this.appstore.dispatch({type: ActionTypes.ADD, payload: app});
    }

    dispatchUpdate(app: App) {
        this.appstore.dispatch({type: ActionTypes.UPDATE, payload: app});
    }

    dispatchDelete(app: App) {
        this.appstore.dispatch({type: ActionTypes.DELETE, payload: app});
    }

    getAllFromStore(): Observable<App[]> {
        return this.appstore.select('appsNew');
    }

    getSelectedFromStore(): Observable<App> {
        return this.appstore.select('selectedAppNew');
    }

}

const ActionTypes = {
    LOAD: 'LOAD_APP',
    ADD: 'ADD_APP',
    UPDATE: 'UPDATE_APP',
    DELETE: 'DELETE_APP',
    SELECT: 'SELECT_APP'
};

export const appsNew: ActionReducer<App[]> = (state: App[] = [], action: Action) => {
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

export const selectedAppNew: ActionReducer<App> = (state: App = null, action: Action) => {
    switch (action.type) {
        case ActionTypes.SELECT:
            return action.payload;
        default:
            return state;
    }
};