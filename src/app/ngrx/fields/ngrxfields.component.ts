import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';
import { ITdDataTableSelectEvent } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { Field } from '../../shared/appmodels/field.model';

@Component({
  selector: 'app-ngrxfields',
  templateUrl: './ngrxfields.component.html'
})
export class NgrxFieldsComponent implements OnInit {

  columns: ITdDataTableColumn[];
  @Input() data: Field[];

  ngOnInit() {
    this.columns = [
      { name: 'fieldName',  label: 'Name' },
    ];
  }

  @Output() selectedField = new EventEmitter<Field>();
  @Output() addUpdate = new EventEmitter<boolean>();

  selectEvent(event:ITdDataTableSelectEvent){
    if(event.selected){
      this.selectedField.emit(event.row);
      this.addUpdate.emit(false);
    }
    else{
      this.selectedField.emit(null);
    } 
  }

  addNew(){
    this.addUpdate.emit(true);
  }

}
