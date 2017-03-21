import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FieldService, selectedField } from '../../shared/appmodels/field.service';
import { Table } from '../../shared/appmodels/table.model';
import { ITdDataTableColumn, ITdDataTableSelectEvent } from '@covalent/core';
import { Field } from '../../shared/appmodels/field.model';
import { Observable } from 'rxjs/Observable';
import { TableService } from '../../shared/appmodels/table.service';

@Component({
  selector: 'app-firebase-fields',
  templateUrl: './firebase-fields.component.html',
  styleUrls: ['./firebase-fields.component.scss']
})
export class FirebaseFieldsComponent implements OnInit, OnChanges {

  @Input() selModel: Table;

  constructor(private fieldServ: FieldService, private tabServ: TableService) { }

  columns: ITdDataTableColumn[];
  models: Table[];
  data$: Observable<Field[]>;

  ngOnInit() {

    this.columns = [
      { name: 'fieldName',  label: 'Field' }
    ];

    //this.data$ = [];

    // this.fieldServ.getAll().subscribe(
    //   res => {
    //     this.data$ = res;
    //     if(this.selModel !== undefined){
    //       console.log(this.selModel.fields.length);
    //       this.data$ = this.selModel.fields;
    //     }
    //   });  
    //this.tabServ.getSingle().subscribe(res => this.data$ = res.fields);
  }
    
  selectedField: Field;
  add: boolean;

  selectEvent(event:ITdDataTableSelectEvent){
    if(event.selected){
      this.selectedField = event.row;
      this.fieldServ.dispatchSelect(this.selectedField);
    }
    else{
      this.selectedField = null;
    } 
  }

  ngOnChanges(changes) {
    if(this.selModel !== undefined){
      //this.data$ = this.selModel.fields;
      this.data$ = this.fieldServ.getAll(this.selModel);
    }
  }

  addNew(){
    this.selectedField = this.fieldServ.initializeField();
    this.fieldServ.dispatchAdd(this.selectedField);
    //this.data$ = this.selModel.fields;
  }

  getUpdatedModel(event){
    this.selModel = event;
    console.log(event.fields.length);
    //this.data$ = this.selModel.fields;
    //console.log(this.data$.length);
  }

}
