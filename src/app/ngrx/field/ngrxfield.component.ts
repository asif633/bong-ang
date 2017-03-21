import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldServiceNew } from '../../shared/appmodels/field.service-new';
import { Field } from '../../shared/appmodels/field.model';

@Component({
  selector: 'app-ngrxfield',
  templateUrl: './ngrxfield.component.html'
})
export class NgrxFieldComponent {

    @Input() addOrUpdate: boolean;
    @Input() selField: Field;
    @Output() addSubmit = new EventEmitter<Field>();
    @Output() updateSubmit = new EventEmitter<Field>();
    @Output() deleteSubmit = new EventEmitter<Field>();

    save(){
      this.addSubmit.emit(this.selField);
      //this.selField = null;
    }

    update(){
      this.updateSubmit.emit(this.selField);
      //this.selField = null;
    }

    delete(){
      this.deleteSubmit.emit(this.selField);
      //this.selField = null;
    }
}
