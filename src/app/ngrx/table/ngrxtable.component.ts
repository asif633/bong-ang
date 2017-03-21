import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableServiceNew } from '../../shared/appmodels/table.service-new';
import { Table } from '../../shared/appmodels/table.model';

@Component({
  selector: 'app-ngrxtable',
  templateUrl: './ngrxtable.component.html'
})
export class NgrxTableComponent {

    @Input() addOrUpdate: boolean;
    @Input() selTable: Table;
    @Output() addSubmit = new EventEmitter<Table>();
    @Output() updateSubmit = new EventEmitter<Table>();
    @Output() deleteSubmit = new EventEmitter<Table>();

    save(){
      this.addSubmit.emit(this.selTable);
      //this.selTable = null;
    }

    update(){
      this.updateSubmit.emit(this.selTable);
      //this.selTable = null;
    }

    delete(){
      this.deleteSubmit.emit(this.selTable);
      //this.selTable = null;
    }
}
