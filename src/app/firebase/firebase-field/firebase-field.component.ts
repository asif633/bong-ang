import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Table } from '../../shared/appmodels/table.model';
import { ServiceAllService } from '../../shared/appmodels/serviceall.service';
import { Field } from '../../shared/appmodels/field.model';
import { FieldService, fields } from '../../shared/appmodels/field.service';
import { TableService } from '../../shared/appmodels/table.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-firebase-field',
  templateUrl: './firebase-field.component.html',
  styleUrls: ['./firebase-field.component.scss']
})
export class FirebaseFieldComponent implements OnInit {
  
  selModel: Table;
  @Input() selField: Field;
  @Output() modelChanged = new EventEmitter<Table>();

  constructor(private fieldServ: FieldService, private tableServ: TableService) { }

  ngOnInit() {
    this.tableServ.getSingle().subscribe(res => this.selModel = res);
    this.types = ['string', 'boolean', 'number', 'date'];
  }
  
  types: string[];

  submit(){
    this.fieldServ.dispatchUpdate(this.selField);
    this.selModel.fields.push(this.selField);
    this.tableServ.dispatchUpdate(this.selModel);
    this.modelChanged.emit(this.selModel);
  }

}
