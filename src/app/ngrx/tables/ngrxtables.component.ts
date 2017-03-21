import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';
import { ITdDataTableSelectEvent } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { Table } from '../../shared/appmodels/table.model';

@Component({
  selector: 'app-ngrxtables',
  templateUrl: './ngrxtables.component.html'
})
export class NgrxTablesComponent implements OnInit {

  columns: ITdDataTableColumn[];
  @Input() data: Table[];

  ngOnInit() {
    this.columns = [
      { name: 'name',  label: 'Name' },
    ];
  }

  @Output() selectedTable = new EventEmitter<Table>();
  @Output() addUpdate = new EventEmitter<boolean>();

  selectEvent(event:ITdDataTableSelectEvent){
    if(event.selected){
      this.selectedTable.emit(event.row);
      this.addUpdate.emit(false);
    }
    else{
      this.selectedTable.emit(null);
    } 
  }

  addNew(){
    this.addUpdate.emit(true);
  }

}
