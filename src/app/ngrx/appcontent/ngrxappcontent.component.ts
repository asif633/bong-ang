import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppServiceNew } from '../../shared/appmodels/app.service-new';
import { App } from '../../shared/appmodels/app.model';

@Component({
    selector: 'app-ngrxappcontent',
    templateUrl: './ngrxappcontent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxAppContentComponent implements OnInit{
    
    apps$: Observable<App[]>;
    selApp: App;

    constructor(private appService: AppServiceNew){

    }

    ngOnInit(){
        this.apps$ = this.appService.getAllFromStore();
        this.appService.getSelectedFromStore().subscribe(res => this.selApp = res);
        this.addOrUpdateApp = false;
    }

    addOrUpdateApp: boolean;

    addOrUpdateAppEvent(event: boolean){
        this.addOrUpdateApp = event;
        if(this.addOrUpdateApp == true){
            this.selApp = this.appService.initialize();
        }
    }

    addApp(app: App){
        this.appService.dispatchAdd(app);
        this.appService.dispatchSelectOne(app);
        this.addOrUpdateApp = false;
        this.selApp = null;
    }

    updateApp(app: App){
        this.appService.dispatchUpdate(app);
        this.selApp = null;
    }

    deleteApp(app: App){
        this.appService.dispatchDelete(app);
        this.selApp = null;
    }

    selectApp(app: App){
        this.appService.dispatchSelectOne(app);
        this.getSelectedApp().subscribe(res=> this.selApp = res);
    }

    deSelectApp(){
        this.appService.dispatchSelectOne(null);
    }

    getSelectedApp(): Observable<App>{
        return this.appService.getSelectedFromStore();
    }

    getAllApps(): Observable<App[]>{
        return this.appService.getAllFromStore();
    }

}