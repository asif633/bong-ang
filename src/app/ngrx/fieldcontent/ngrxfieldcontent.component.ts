import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FieldServiceNew } from '../../shared/appmodels/field.service-new';
import { TableServiceNew } from '../../shared/appmodels/table.service-new';
import { Field } from '../../shared/appmodels/field.model';
import { Table } from '../../shared/appmodels/table.model';

@Component({
    selector: 'app-ngrxfieldcontent',
    templateUrl: './ngrxfieldcontent.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxFieldContentComponent implements OnInit{
    
    fields$: Observable<Field[]>;
    selField: Field;
    tables$: Observable<Table[]>;
    selTable: Table;

    constructor(private fieldService: FieldServiceNew, private tableService: TableServiceNew){

    }

    ngOnInit(){
        this.fields$ = this.fieldService.getAllFromStore();
        this.fieldService.getSelectedFromStore().subscribe(res => this.selField = res);
        this.addOrUpdateField = false;
        this.tables$ = this.tableService.getAllFromStore();
    }

    onTableSelect(event){
        this.selTable = event;
    }

    addOrUpdateField: boolean;

    addOrUpdateFieldEvent(event: boolean){
        this.addOrUpdateField = event;
        if(this.addOrUpdateField == true){
            this.selField = this.fieldService.initialize();
        }
    }

    addField(field: Field){
        this.fieldService.dispatchAdd(field);
        this.addOrUpdateField = false;
        this.selField = null;
    }

    updateField(field: Field){
        this.fieldService.dispatchUpdate(field);
        this.selField = null;
    }

    deleteField(field: Field){
        this.fieldService.dispatchDelete(field);
        this.selField = null;
    }

    selectField(field: Field){
        this.fieldService.dispatchSelectOne(field);
        this.getSelectedField().subscribe(res=> this.selField = res);
    }

    deSelectField(){
        this.fieldService.dispatchSelectOne(null);
    }

    getSelectedField(): Observable<Field>{
        return this.fieldService.getSelectedFromStore();
    }

    getAllFields(): Observable<Field[]>{
        return this.fieldService.getAllFromStore();
    }

}