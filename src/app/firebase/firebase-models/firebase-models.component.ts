import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';
import { ITdDataTableSelectEvent } from '@covalent/core';
import { Table } from '../../shared/appmodels/table.model';
import { TableService } from '../../shared/appmodels/table.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-firebase-models',
  templateUrl: './firebase-models.component.html',
  styleUrls: ['./firebase-models.component.scss']
})
export class FirebaseModelsComponent implements OnInit {

  public modelSelected: boolean;
  @Output() public widgetsEnable = new EventEmitter<boolean>();

  constructor(private tableServ: TableService) { }
  
  columns: ITdDataTableColumn[];
  models: Table[];
  data$: Observable<Table[]>;

  ngOnInit() {

    this.columns = [
      { name: 'name',  label: 'Model' }
    ];
    this.data$ = this.tableServ.getAll();
    this.modelSelected = false;
  }
    
  selectedModel: Table;
  add: boolean;

  selectEvent(event:ITdDataTableSelectEvent){
    if(event.selected){
      this.selectedModel = event.row;
      this.add = false;
      this.modelSelected = true;
      this.tableServ.dispatchSelect(this.selectedModel);
      this.widgetsEnable.emit(false);
    }
    else{
      this.selectedModel = null;
      this.modelSelected = false;    
    } 
  }

  addNew(){
    this.add = true;
    this.selectedModel = this.tableServ.initializeTable();
    this.tableServ.dispatchAdd(this.selectedModel);
    this.modelSelected = false; 
  }

}
