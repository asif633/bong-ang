import { Injectable } from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { App } from './app.model';
import { AppStore } from '../../app.store';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

    constructor(private appstore: Store<AppStore>) { }
    
    initializeApp(): App{
       return {id: UUID.UUID(), appName: 'firebase-angular2', type: 'firebase', cssFramework: 'material', theme: '',  tables: [], primaryColor: 'orange', primaryhue: '700', secondaryColor: 'blue', secondaryhue: '700'}; 
    }

    dispatchAdd(app: App){
        this.appstore.dispatch({type: ActionTypes.ADD_APP, payload: app});
        this.appstore.dispatch({type: ActionTypes.SELECT_APP, payload: app});
    }

    dispatchUpdate(app: App){
        this.appstore.dispatch({type: ActionTypes.UPDATE_APP, payload: app});
    }
    
    getOne(): Observable<App>{
        return this.appstore.select('selectedApp');
    }

    loadApp(apps: App[]){
        this.appstore.dispatch({type: ActionTypes.LOAD_APP, payload: apps});
    }

    selectApp(app: App){
        this.appstore.dispatch({type: ActionTypes.SELECT_APP, payload: app});
    }

}

export const ActionTypes = {
     LOAD_APP: 'LOAD_APP',
     ADD_APP: 'ADD_APP',
     UPDATE_APP: 'UPDATE_APP',
     DELETE_APP: 'DELETE_APP',
     SELECT_APP: 'SELECT_APP'
}

export const apps: ActionReducer<App[]> = (state: App[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD_APP:
            return [...state, action.payload];
        case ActionTypes.LOAD_APP:
            return action.payload;
        case ActionTypes.UPDATE_APP:
            return state.map(item => {
                return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
            });
        case ActionTypes.DELETE_APP:
            return state.filter(item => {
                return item.id !== action.payload.id;
            });
        default:
            return state;
    }

};

export const selectedApp: ActionReducer<App> = (state: App = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.SELECT_APP:
      return action.payload;
    default:
      return state;
  }

}