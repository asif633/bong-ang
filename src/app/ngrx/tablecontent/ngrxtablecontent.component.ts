import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TableServiceNew } from '../../shared/appmodels/table.service-new';
import { AppServiceNew } from '../../shared/appmodels/app.service-new';
import { Table } from '../../shared/appmodels/table.model';
import { App } from '../../shared/appmodels/app.model';

@Component({
    selector: 'app-ngrxtablecontent',
    templateUrl: './ngrxtablecontent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxTableContentComponent implements OnInit{
    
    tables$: Observable<Table[]>;
    selTable: Table;
    selApp: App;

    constructor(private tableService: TableServiceNew, private appService: AppServiceNew){

    }

    ngOnInit(){
        this.tables$ = this.tableService.getAllFromStore();
        this.tableService.getSelectedFromStore().subscribe(res => this.selTable = res);
        this.addOrUpdateTable = false;
        this.appService.getSelectedFromStore().subscribe(res => this.selApp = res);
    }

    addOrUpdateTable: boolean;

    addOrUpdateTableEvent(event: boolean){
        this.addOrUpdateTable = event;
        if(this.addOrUpdateTable == true){
            this.selTable = this.tableService.initialize();
        }
    }

    addTable(table: Table){
        this.tableService.dispatchAdd(table);
        this.addOrUpdateTable = false;
        this.selTable = null;
        this.selApp.tables.push(table);
        this.appService.getSelectedFromStore().subscribe(res => console.log(res))
    }

    updateTable(table: Table){
        this.tableService.dispatchUpdate(table);
        this.selTable = null;
        this.appService.getSelectedFromStore().subscribe(res => console.log(res))
    }

    deleteTable(table: Table){
        this.tableService.dispatchDelete(table);
        this.selTable = null;
        this.appService.getSelectedFromStore().subscribe(res => console.log(res))
    }

    selectTable(table: Table){
        this.tableService.dispatchSelectOne(table);
        this.getSelectedTable().subscribe(res=> this.selTable = res);
    }

    deSelectTable(){
        this.tableService.dispatchSelectOne(null);
    }

    getSelectedTable(): Observable<Table>{
        return this.tableService.getSelectedFromStore();
    }

    getAllTables(): Observable<Table[]>{
        return this.tableService.getAllFromStore();
    }

}